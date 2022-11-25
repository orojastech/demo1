FROM node:14.20-alpine3.16 AS builder

WORKDIR /app
COPY ./package.json ./yarn.lock /app/
RUN yarn install

FROM node:14.20-alpine3.16 AS builderpj

RUN apk add wget
RUN apk add unzip
RUN apk add musl

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY ./ ./

FROM builderpj AS test
WORKDIR /app
RUN yarn test:cov

FROM scratch as export-test-results
WORKDIR /app
COPY --from=test /app .

FROM builderpj AS finish
ENTRYPOINT yarn version

