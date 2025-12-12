# ---------- Сборка фронтенда ----------
FROM node:20
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Внимание: мы не делаем nginx здесь.
# dist улетит в volume, который прочитает nginx
