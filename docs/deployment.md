# Deployment Guide

Navodila za namestitev FreeLance Center v produkcijsko okolje.

---

## 📋 Kazalo
- [Predpogoji](#predpogoji)
- [Priprava okolja](#priprava-okolja)
- [Build za produkcijo](#build-za-producijo)
- [Nginx konfiguracija](#nginx-konfiguracija)
- [Docker (priporočeno)](#docker-priporočeno)
- [SSL Certifikati](#ssl-certifikati)

---

## 🛠 Predpogoji

- **Node.js** >= 18.0.0 (priporočamo LTS verzijo)
- **npm** >= 9.0.0 ali **yarn** / **pnpm**
- **Git** za version control
- **Docker** & **Docker Compose** (opcijsko, a priporočeno)

---

## 🔧 Priprava okolja

1. **Kloniraj repozitorij**:
   ```bash
   git clone https://github.com/DanijelTech/FreeLance-Center.git
   cd FreeLance-Center
   ```

2. **Namesti odvisnosti**:
   ```bash
   npm install
   ```
   > Če so `node_modules` že vključeni v repo, preskoči to korak.

3. **Konfiguriraj okoljske spremenljivke**:
   ```bash
   cp .env.example .env
   nano .env  # ali uporabi svoj editor
   ```

   **Ključne spremembe za produkcijo:**
   ```env
   VITE_LM_STUDIO_URL=https://api.tvoj-studio.si/v1
   VITE_LM_MODEL=llama-3.1-70b
   VITE_LM_STUDIO_API_KEY=sk-prod-xxxxx
   VITE_HERMES_ENDPOINT=https://api.hermes-agent.si
   VITE_STRIPE_PUBLIC_KEY=pk_live_51ABC...
   VITE_API_URL=https://api.freelance-center.si/api
   ```

---

## 📦 Build za produkcijo

Zaženi build ukaz:

```bash
npm run build
```

To ustvari optimizirano verzijo aplikacije v mapi `dist/`.

### Optimizacije:
- **Minifikacija:** Koda je stisnjena za manjšo velikost
- **Tree-shaking:** Nepotrebne funkcije so odstranjene
- **Code splitting:** Koda se nalaga progresivno (lazy loading)

> ⚠️ **Pomembno:** `dist/` mapa mora biti servirana kot statična vsebina.

---

## 🌐 Nginx konfiguracija

Za produkcijski server priporočamo Nginx.

**Nginx konfiguracija (`/etc/nginx/sites-available/freelance-center`):**

```nginx
server {
    listen 80;
    server_name freelance-center.si www.freelance-center.si;

    root /var/www/freelance-center/dist;
    index index.html;

    # Gzip kompresija
    gzip on;
    gzip_types text/plain application/json application/javascript text/css;

    # Cache static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing support
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy za API klice
    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Aktivacija:**
```bash
sudo ln -s /etc/nginx/sites-available/freelance-center /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🐳 Docker (Priporočeno)

Če želiš kontejnerizirano rešitev:

**`Dockerfile`:**
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**`docker-compose.yml`:**
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - api
      - lm-studio

  api:
    image: node:18-alpine
    working_dir: /app
    command: npm start
    ports:
      - "3001:3001"

  lm-studio:
    image: ghcr.io/lmstudio-ai/lmstudio:latest
    ports:
      - "1234:1234"
    volumes:
      - ./models:/models
```

**Zagon:**
```bash
docker-compose up -d
```

---

## 🔒 SSL Certifikati (Let's Encrypt)

Za HTTPS povezavo uporabimo Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d freelance-center.si -d www.freelance-center.si
```

Certbot bo avtomatsko posodobil Nginx konfiguracijo in nastavil samodejno obnavljanje certifikatov.

---

## 📊 Monitoring & Logging

Priporočamo:
- **PM2** za upravljanje Node.js procesov
- **Sentry** za error tracking
- **Prometheus + Grafana** za metrike in alerte

---

*Zadnja posodobitev: 2026-10-01*
