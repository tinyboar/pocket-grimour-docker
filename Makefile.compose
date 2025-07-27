# make build      # Собрать образ
# make up         # Запустить проект
# make down       # Остановить проект и удалить тома
# make rebuild    # Полная пересборка
# make logs       # Смотреть логи
# make shell      # Зайти внутрь grimoire-контейнера
# make dbshell    # Подключиться к PostgreSQL
# make publish    # Запушить в Docker Hub


APP_NAME=tinyboar/pocket-grimoire
COMPOSE=docker compose

.PHONY: build rebuild up down logs prune shell dbshell publish

## Сборка контейнера
build:
	docker build -t $(APP_NAME) .

## Чистая сборка: удаляет образ, собирает заново
rebuild:
	$(MAKE) down
	docker rmi -f $(APP_NAME) || true
	$(MAKE) build

## Запуск проекта
up:
	$(COMPOSE) up -d

## Остановка проекта и удаление контейнеров
down:
	$(COMPOSE) down --volumes

## Просмотр логов
logs:
	$(COMPOSE) logs -f

## Очистка неиспользуемых томов и контейнеров
prune:
	docker system prune -f
	docker volume prune -f

## Открыть bash внутри PHP-контейнера
shell:
	docker exec -it grimoire sh

## Подключиться к базе PostgreSQL
dbshell:
	docker exec -it postgres psql -U symfony -d app

## Опубликовать образ в Docker Hub (нужен docker login)
publish:
	docker push $(APP_NAME)
