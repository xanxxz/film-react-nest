FROM node:20-bullseye AS builder
WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

RUN npm install --platform=linux --arch=x64 @rollup/rollup-linux-x64-gnu --no-save || true

COPY frontend/ ./
RUN npm run build

FROM nginx:1.27-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
COPY backend/public /usr/share/nginx/html/content

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
