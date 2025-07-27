# 📘 Pocket Grimoire (Dockerized)

A deploy-ready framework application using Docker Compose. Includes frontend (Webpack Encore), backend with Symfony, PostgreSQL, and Mailcatcher.

---

## 🚀 Quick Start (Local)

```bash
# Clone the repository
https://github.com/tinyboar/pocket-grimoire.git
cd pocket-grimoire

# Build and start
docker compose up --build
```

After startup:

* App: [http://localhost:8080](http://localhost:8080)
* Mail (Mailcatcher): [http://localhost:1080](http://localhost:1080)

---

## ⚙️ Services in docker-compose

| Service  | Purpose            |
| -------- | ------------------ |
| `app`    | Symfony + PHP 8.2  |
| `web`    | Nginx              |
| `db`     | PostgreSQL 15      |
| `mailer` | Mailcatcher (SMTP) |

---

## 🧱 Docker Build Stages

Project is built in three stages:

1. **assets** — Node/Yarn 4 + Encore for frontend build
2. **vendors** — Composer without dev dependencies
3. **runtime** — php-fpm, with vendor/ and public/build copied

---

## 🐳 Run from Docker Hub (No Source Required)

You can use the published image directly:

```bash
docker run -p 8080:80 tinyboar/pocket-grimoire:latest
```

> ⚠️ This assumes migrations, dependencies, and asset builds are already done inside the image.

---

## 📁 Ignored Folders

In `.dockerignore` and `.gitignore`:

```
.git
node_modules
vendor
var
.yarn/cache
```

---

## 🔑 Authentication

By default, login is not protected. Add a `.env.local` file with environment variables if needed.

---

## 🤝 Contact

**Author**: [tinyboar](https://hub.docker.com/u/tinyboar)

Docker Hub: [tinyboar/pocket-grimoire](https://hub.docker.com/r/tinyboar/pocket-grimoire)
