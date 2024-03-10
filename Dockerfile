# Use the official Node.js 18 Alpine image as the base image
FROM node:18-alpine as development

WORKDIR /home/node/back

RUN deluser --remove-home node \
  && addgroup -S node \
  && adduser -S -G node -u 999 node

RUN chown -R node:node ./

USER node

COPY package.json ./

RUN yarn install --only=development

COPY --chown=node:node . .

RUN yarn build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /home/node/back

COPY package.json ./

RUN yarn install --only=production

COPY --chown=node:node . .

COPY --from=development --chown=node:node /home/node/back/dist ./dist

CMD ["node", "dist/src/main"]
