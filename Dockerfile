FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN rm -rf node_modules && npm cache clean --force && npm install --force
COPY . .
RUN npm run build

FROM node:20

WORKDIR /app
COPY --from=build /app ./

RUN rm -rf node_modules && yarn cache clean && yarn install --force

# Adicione o .env aqui se não copiou antes
COPY --from=build /app/.env .env

EXPOSE 8080
CMD ["node", "dist/server.js"]
