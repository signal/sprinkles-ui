# Sprinkles UI

A portable, customizable set of UI components

**Table Of Contents**

- [Quickstart](#quickstart)
- [Continuous Integration](#continuous-integration)
- [Testing](#testing)
- [Style Guide](#style-guide)
- [Useful Resources](#useful-resources)

## Quickstart

Install NVM

Go to https://github.com/creationix/nvm#install-script and install nvm

Install Node 5.X

```sh
$ nvm install 5.9.0
```

Use Node 5.x

```sh
$ nvm use 5.9.0
```

Clone Sprinkles UI

```sh
$ git clone git@gitlab01dv2.thebrighttag.com:dev/sprinkles-ui.git
```

Change Directory To Sprinkles UI

```sh
$ cd sprinkles-ui
```

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

## Style Guide

**CSS**

Within CSS rules, please make sure all the selectors are in alphabetical order. There's one exception, for 'height' and 'width', place these at the end and put 'height' before 'width'.

## Useful Resources

http://ricostacruz.com/cheatsheets/react.html



