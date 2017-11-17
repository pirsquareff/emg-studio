# EEG Studio

EEG Studio is a web-based application which facilitates labelling electroencephalography (EEG) record for later use. To that end, it provides handy tools so that you can effortlessly zoom, pan, and mark on-set ranges on any EEG plots.

## Table of Contents
- [Developing](#developing)
- [Documentation](#documentation)
- [License](#license)

## Developing

### Prerequisites

#### Docker

- [Docker Community Edition](https://www.docker.com/community-edition) `17.09.0-ce` or higher
- [Docker Compose](https://docs.docker.com/compose/install) `1.17.0` or higher

#### Frontend

- [Node.js](https://nodejs.org/) `8.9.1` or higher
- [Yarn](https://yarnpkg.com/en/docs/install) `1.3.2` or higher (as a `npm` replacement)

### Quickstart

1. Clone this repo using `git clone git@github.com:pirsquareff/eeg-studio.git`
2. Run `docker-compose up --build` within project's root directory. This will start backend service at `localhost:3002`.
2. Also run `yarn` within project's root directory to start frontend app which will be available at `localhost:3000`.

## Documentation

### React Boilerplate
- [The Hitchhikers Guide to `react-boilerplate`](docs/general/introduction.md): An introduction for newcomers to this boilerplate.
- [Overview](docs/general): A short overview of the included tools
- [Commands](docs/general/commands.md): Getting the most out of this boilerplate
- [Testing](docs/testing): How to work with the built-in test harness
- [Styling](docs/css): How to work with the CSS tooling
- [Your app](docs/js): Supercharging your app with Routing, Redux, simple
  asynchronicity helpers, etc.
- [Troubleshooting](docs/general/gotchas.md): Solutions to common problems faced by developers.

## License

This project is licensed under the MIT license, Copyright (c) 2017 Parinthorn Saithong. <br>
For more information see [`LICENSE.md`](LICENSE.md).

<br>
<hr>
<sub>Created by <a href="https://github.com/pirsquareff">Parinthorn Saithong</a> and maintained with ❤️.</sub>

