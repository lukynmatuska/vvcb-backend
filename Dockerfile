FROM node:lts-alpine

RUN apk update

COPY . .

RUN npm install --location=global npm
RUN npm install
RUN npm run build

EXPOSE 8082
ENV PORT 8082
ENV NODE_ENV production

CMD npm run start:prod