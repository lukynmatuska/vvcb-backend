# vvcb-backend

> An awesome project based on Ts.ED framework

See [Ts.ED](https://tsed.io) project for more information.

## Build setup

> **Important!** Ts.ED requires Node >= 10, Express >= 4 and TypeScript >= 3.

```batch
# install dependencies
$ npm install

# serve
$ npm run start

# build for production
$ npm run build
$ npm run start:prod
```

## Docker compose
- Copy `docker-compose.sample.yml` to `docker-compose.yml`
- Edit ENV variables in `docker-compose.yml`
- Copy `mongo-init.sample.js` to `mongo-init.js`
- Edit database credentials in `mongo-init.js`
- Start containers with ```docker-compose up -d```