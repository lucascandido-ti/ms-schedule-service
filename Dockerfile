FROM node:20

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

USER node

WORKDIR /home/node

RUN npm install --global pnpm

WORKDIR /home/node/app

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY --chown=node:node . .

COPY --chown=node:node ./src/settings.json.template ./src/settings.json

RUN pnpm run build

EXPOSE 3333

CMD [ "node", "dist/main.js" ]

