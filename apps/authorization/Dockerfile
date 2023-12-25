FROM docker.io/node:lts-alpine

WORKDIR /app

RUN addgroup --system authorization && \
          adduser --system -G authorization authorization

COPY dist/apps/authorization authorization
RUN chown -R authorization:authorization .

RUN yarn install --production --frozen-lockfile --cwd authorization

CMD [ "node", "authorization/main.js" ]
