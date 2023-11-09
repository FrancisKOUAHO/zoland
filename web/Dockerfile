FROM node:18-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY . /app

RUN yarn build

EXPOSE 3000

ENV NODE_ENV development

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then yarn dev; else yarn start; fi"]