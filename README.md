# Sprinkles UI

A portable, customizable set of UI components

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Join the chat at https://gitter.im/sprinkles-ui/lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/sprinkles-ui/lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/signal/sprinkles-ui.svg?branch=master)](https://travis-ci.org/signal/sprinkles-ui)

**Table Of Contents**

- [What is Sprinkles](#what-is-sprinkles)
- [Why Sprinkles](#why-sprinkles?)
- [What is this project about](#what-is-this-project-about?)
- [Quickstart](#quickstart)
- [Continuous Integration](#continuous-integration)
- [Testing](#testing)
- [Style Guide](#style-guide)
- [Atom Config](#atom-config)
- [Additional Resources](#additional-resources)

## What is Sprinkles

Sprinkles is a reusable UI library created in React. These components are common to most sites and web apps. They are very extendable and theme-able.

## Why Sprinkles?

At Signal, we have a large number of web apps, both internal and external each having their own UI. We wanted to create a library of reusable components that each UI could implement and benefit from a unified look, feel, and function. Our components can be scattered throughout a site or web application and themed to match your particular design. It's easy to use and very customizable.

## What is this project about?

We wanted to create a foundational UI that would allow anyone to get a web app or site started quickly without needing to recreate commonly used elements like forms and validation. We invite you to read more about [our mission](./MISSION.md) and governance model. By using or contributing to our project, you agree to our [code of conduct](./CODEOFCONDUCT.md) and [license](./LICENSE.md).

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
$ git clone git@github.com:signal/sprinkles-ui.git
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

All tests are run locally when you push remote. A Travis CI build will then be kicked off. Please make sure it passes, no PRs will be accepted without a passing Travis CI build.

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

[Testing Practices](./TESTING.md)

## Style Guide

**CSS**

Within CSS rules, please make sure all the selectors are in alphabetical order. There's one exception, for 'height' and 'width', place these at the end and put 'height' before 'width'.

## Atom config

We suggest using Atom for its useful code style integrations that make working with our linters easy. Here are a list of suggested packages.

* [atom-beautify](https://atom.io/packages/atom-beautify)
* [es6-javascript](https://atom.io/packages/es6-javascript)
* [linter](https://atom.io/packages/linter)
* [linter-eslint](https://atom.io/packages/linter-eslint)
* [react](https://atom.io/packages/react)

## Additional Resources

If you have any questions, please email us at sprinkles-ui@signal.co

[React Cheatsheet](http://ricostacruz.com/cheatsheets/react.html)
