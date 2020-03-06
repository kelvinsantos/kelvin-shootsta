# Streaming Video Platform Service

## Development Build Setup

``` bash
# server
$ cd server
$ npm install
$ npm run start

# ui (react)
$ cd ui
$ npm install
$ npm run dev

# ui (vue)
$ cd ui-vue
$ npm install
$ npm run dev
```

## Production Build Setup

``` bash
# prerequisite
- docker
- docker-compose

# running the server for react
$ sh run-dockerize-server-react.sh

# running the server for vue
$ sh run-dockerize-server-vue.sh
```

## Running Unit Tests

``` bash
# running the test
$ cd server
$ npm run test
```

## Accessing the Platform

``` bash
# accessing api documentation
http://localhost:8080/
```

## Accessing API Documentation

``` bash
# accessing api documentation
http://localhost:8080/api-docs/
```