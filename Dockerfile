FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20

WORKDIR /app
COPY --from=build /app ./

RUN npm install --omit=dev

# Adicione o .env aqui se não copiou antes
COPY --from=build /app/.env .env

EXPOSE 8080
CMD ["node", "dist/server.js"]
