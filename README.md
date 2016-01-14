# Sprinkles UI

A portable, customizable set of UI components

**Table Of Contents**

- [Quickstart](#quickstart)
- [Continuous Integration](#continuous-integration)
- [Testing](#testing)

## Quickstart

Install dependencies

```sh
$ npm install
```

Start The UI Harness

```sh
$ npm start
```

Go to http://localhost:3030

## Continuous Integration

All tests are run inside of docker containers on Jenkins to ensure a consistent testing environment. They run on every push to the repo.

## Testing

It's recommended that you run the tests locally inside of docker locally before pushing.

**Install Docker**

https://www.docker.com/docker-toolbox

**Build The Docker Image**

```bash
$ docker build -t signalco/sprinkles-ui:latest .
```

**Run The Tests Inside The Docker Image**

```bash
$ docker run -it signalco/sprinkles-ui:latest npm test
```
