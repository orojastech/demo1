FROM node:14.20-alpine3.16 AS builder

WORKDIR /app
COPY ./package.json /app/
RUN npm install

FROM node:14.20-alpine3.16 AS builderpj

RUN apk add wget
RUN apk add unzip
RUN apk add musl

WORKDIR /app
COPY --from=builder /node_modules ./node_modules
COPY ./ ./

FROM builderpj AS test
WORKDIR /app
RUN npm run test

FROM scratch as export-test-results
WORKDIR /app
COPY --from=test /app .

FROM builderpj AS finish
ENTRYPOINT npm -v

