# Welcome to portal-rawdatastore-ui! #

# Introduction #

_template-js-reactjs_ is part of my [Project Template Collection](https://github.com/krausb?tab=repositories).
It is a stateless and [React.JS](https://reactjs.org/) based Web UI which examples a data API access.

# Run #

## Prepare ##

To be able to do anything with this project you have to prepare the workspace first. This can
be done by executing the [install.sh](./install.sh) script:

```bash
$> chmod +rx install.sh
$> ./install.sh
```

This will install all required node.js modules locally.

## Run Modes ##

There are two major modes the web app can be run: _development_ and _production_ mode.

### Development ###

To run the web app in development mode just do:

```bash
$> npm start
```

### Production ###

> requires docker-compose >= 3.x

For running the web app in production mode it is recommended to use the [Dockerfile](./Dockerfile)
to build a runnable [Node.JS](https://nodejs.org/en/) docker image being able to serve the web
app with [ExpressJS](https://expressjs.com/). This can be done in combination with the enclosed
[docker-compose.yml](./docker-compose.yml) file:

```bash
$> docker-compose build
```

To run the web app in production mode:

```bash
$> docker-compose up -d
```

The application exposes its ports to 8080 by default.
