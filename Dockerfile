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

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD /wait && npm start