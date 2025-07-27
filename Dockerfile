FROM node:20-alpine AS assets
WORKDIR /srv/app

RUN corepack enable

COPY package.json yarn.lock ./
COPY .yarn/ .yarn/
COPY .yarnrc.yml .yarnrc.yml
COPY .pnp.* ./

RUN yarn install --immutable
COPY . .
RUN yarn run encore production

FROM composer:2 AS vendors
WORKDIR /srv/app

COPY composer.json composer.lock ./
RUN composer install \
    --no-dev --prefer-dist \
    --no-scripts --no-interaction \
    --apcu-autoloader \
    --optimize-autoloader

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

RUN mkdir -p var/cache var/log && \
    chown -R www-data:www-data var

COPY entrypoint.sh /srv/app/entrypoint.sh
RUN chmod +x /srv/app/entrypoint.sh

RUN mkdir -p /export && cp -r /srv/app /export/app

USER www-data
CMD ["/srv/app/entrypoint.sh"]
