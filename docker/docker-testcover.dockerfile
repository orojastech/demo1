FROM node:14.20-alpine3.16 AS builder

WORKDIR /app
COPY ./package.json /app/
RUN npm install

FROM node:14.20-alpine3.16 AS builderpj

RUN apk add wget
RUN apk add unzip
RUN apk add musl

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY ./ ./

FROM builderpj AS test
WORKDIR /app
RUN npm run test

FROM scratch as export-test-results
COPY --from=test /app/reports /app/test-report.xml ./

FROM builderpj AS finish
ENTRYPOINT npm -v

