FROM node:18 AS builder
WORKDIR /app

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


FROM node:18 AS runtime
WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/build ./build

EXPOSE 3002

CMD ["serve", "-s", "build", "-l", "3002 "]
