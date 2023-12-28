FROM docker.io/node:lts-alpine

ARG SERVICE_NAME=roles

WORKDIR /app

RUN addgroup --system ${SERVICE_NAME} && \
          adduser --system -G ${SERVICE_NAME} ${SERVICE_NAME}

COPY dist/apps/${SERVICE_NAME} .
COPY prisma ./prisma
RUN chown -R ${SERVICE_NAME}:${SERVICE_NAME} .

RUN yarn install --production --frozen-lockfile
RUN yarn prisma generate

CMD ["node", "main.js"]
