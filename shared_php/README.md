# 📘 Pocket Grimoire (Dockerized)

A Docker-ready framework application with Symfony backend, Webpack Encore frontend, PostgreSQL, and Mailcatcher.

> Based on the original project: [github.com/Skateside/pocket-grimoire](https://github.com/Skateside/pocket-grimoire)

---

## 🚀 Part 1: Run Locally via Docker Hub Image

> No need to clone the repo or build anything — just pull and run.

```bash
# Pull and run the latest image
docker pull tinyboar/pocket-grimoire:latest

docker run -p 8080:80 tinyboar/pocket-grimoire:latest
```

* App: [http://localhost:8080](http://localhost:8080)

> ⚠️ Note: This method assumes the image includes built assets and dependencies.

---

## 🛠️ Part 2: Clone and Build Manually

```bash
# Clone the repository
https://github.com/tinyboar/pocket-grimoire.git
cd pocket-grimoire

# Build and run
docker compose up --build
```

* App: [http://localhost:8080](http://localhost:8080)
* Mailcatcher: [http://localhost:1080](http://localhost:1080)

---

## ⚙️ Docker Compose Services

| Service  | Purpose            |
| -------- | ------------------ |
| `app`    | Symfony + PHP 8.2  |
| `web`    | Nginx              |
| `db`     | PostgreSQL 15      |
| `mailer` | Mailcatcher (SMTP) |

---

## 🧱 Dockerfile Structure

Multi-stage Docker build:

1. **assets** — Node + Yarn 4 + Encore for frontend build
2. **vendors** — Composer without dev dependencies
3. **runtime** — php-fpm with vendor/ and public/build copied in

---

## 📁 Ignored Folders

In `.gitignore` and `.dockerignore`:

```
.git
node_modules
vendor
var
.yarn/cache
```

---

## 🔐 Authorization

By default, login is disabled. Add a `.env.local` file to configure credentials if needed.

---

## 🤝 Contact

**Author**: [@tinyboar](https://t.me/tinyboar)  
**GitHub**: [tinyboar](https://github.com/tinyboar)  
**Docker Hub**: [tinyboar/pocket-grimoire](https://hub.docker.com/r/tinyboar/pocket-grimoire)
