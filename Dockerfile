######################################################################
#                       ── 1. FRONT‑ASSETS ──                       #
######################################################################
FROM node:20-alpine AS assets
WORKDIR /srv/app

# 1) Включаем Corepack
RUN corepack enable

# 2) Копируем необходимые файлы для Yarn 4 PnP
COPY package.json yarn.lock ./
COPY .yarn/ .yarn/
COPY .yarnrc.yml .yarnrc.yml
COPY .pnp.* ./

# 3) Устанавливаем зависимости строго (PnP)
RUN yarn install --immutable

# 4) Копируем остальной исходный код
COPY . .

# 5) Сборка ассетов
RUN yarn run encore production


######################################################################
#                      ── 2. PHP‑DEPENDENCIES ──                    #
######################################################################
FROM composer:2 AS vendors
WORKDIR /srv/app

COPY composer.json composer.lock ./
RUN composer install \
    --no-dev --prefer-dist \
    --no-scripts --no-interaction \
    --apcu-autoloader

######################################################################
#                       ── 3. RUNTIME‑PHP ──                         #
######################################################################
FROM php:8.2-fpm-alpine
WORKDIR /srv/app

RUN apk add --no-cache git icu-dev zlib-dev postgresql-client libpq-dev \
 && docker-php-ext-install intl opcache pdo pdo_pgsql

ENV APP_ENV=prod \
    APP_SECRET="ChangeMe" \
    DATABASE_URL="postgresql://symfony:symfony@db:5432/app?serverVersion=15&charset=utf8"

COPY --from=vendors /srv/app/vendor        ./vendor
COPY --from=assets  /srv/app/public/build  ./public/build
COPY . .

RUN mkdir -p var && chown -R www-data:www-data var
RUN php bin/console cache:clear --no-warmup --no-interaction

USER www-data
CMD ["php-fpm"]
