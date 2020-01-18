FROM node:12.14.0-alpine3.9

RUN apk --no-cache add --virtual builds-deps build-base python

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
COPY .env /usr/src/app/

COPY . /usr/src/app/

RUN npm install

EXPOSE 4000

CMD [ "npm", "run", "start"]