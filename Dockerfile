FROM node:22-alpine AS builder

WORKDIR /app

COPY client/package.json client/yarn.lock /app/

RUN yarn --forzen-lockfile

COPY client/ /app/

RUN yarn build


FROM node:22-alpine

WORKDIR /app

COPY server/package.json server/yarn.lock /app/

RUN yarn --forzen-lockfile

COPY server/ /app/

COPY --from=builder /app/dist /app/dist

ENV PORT=5000

CMD [ "yarn", "start" ]