
FROM node:20 AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build


FROM node:20

WORKDIR /app
COPY --from=build /app .

RUN npm install --omit=dev

CMD ["node", "dist/server.js"]
