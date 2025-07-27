IMAGE = tinyboar/pocket-grimoire
TAG = latest
CONTAINER = pocket-grimoire

.PHONY: build push pull run run-dev clean

build:
	docker build -t $(IMAGE):$(TAG) .

push:
	docker push $(IMAGE):$(TAG)

pull:
	docker pull $(IMAGE):$(TAG)

# Подключение к БД внутри докер-сети (из docker-compose)
run:
	docker run --rm --network pocket-grimoire_internal -p 8080:80 \
		-e DATABASE_URL="postgresql://symfony:symfony@db:5432/app?serverVersion=15" \
		--name $(CONTAINER) \
		$(IMAGE):$(TAG)

# Подключение к БД на хосте через host.docker.internal (если доступно)
run-dev:
	docker run --rm -p 8080:80 \
		-e DATABASE_URL="postgresql://symfony:symfony@host.docker.internal:5432/app?serverVersion=15" \
		--name $(CONTAINER) \
		$(IMAGE):$(TAG)

clean:
	docker rm -f $(CONTAINER) || true
	docker volume prune -f
	docker image rm $(IMAGE):$(TAG) || true
