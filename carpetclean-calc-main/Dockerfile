FROM node:21-alpine as build
WORKDIR /app

# restore
COPY package.json package-lock.json ./
RUN npm install

# build
COPY . .
RUN npm run build

# nginx
FROM nginx:1.25-alpine

COPY --from=build /app/dist/sim/browser /usr/share/nginx/html
COPY ./nginx.conf  /etc/nginx/conf.d/default.conf


EXPOSE 80 443
