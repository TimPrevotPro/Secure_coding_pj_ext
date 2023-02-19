FROM node:lts

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN node -v
RUN npm install

EXPOSE 8080
