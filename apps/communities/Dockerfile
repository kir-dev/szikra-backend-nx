FROM docker.io/node:lts-alpine

WORKDIR /app

RUN addgroup --system communities && \
          adduser --system -G communities communities

COPY dist/apps/communities communities
RUN chown -R communities:communities .

RUN yarn install --production --frozen-lockfile --cwd communities

CMD [ "node", "communities/main.js" ]
