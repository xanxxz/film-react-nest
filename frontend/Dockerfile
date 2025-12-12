# Stage 1: сборка фронта на Debian
FROM node:20-bullseye AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm install --platform=linux --arch=x64 @rollup/rollup-linux-x64-gnu --no-save || true
RUN npm run build

# Stage 2: продакшен образ с Nginx (легкий)
FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
