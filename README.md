# Virtual Whiteboard

Welcome to the Virtual Whiteboard, a service for posting, sharing and discussing virtual boards using text, images, videos and more.

The virtual whiteboard is a place for colleagues to gather around a shared set of content; text (markdown), images, video, etc.

## Overview

The virtual whiteboard consists of three main elements
- **Authentication**: A simple authentication server using a JWT-implementation (no time to implement SAML or OAuth...).
- **Teams and users**: A user and team management solution, helping users onboard, create a team and invite colleagues.
- **Virtual whiteboards**: A set of boards that is owned by teams and users that can be shared.

## Architecture

A Rest API is available for the client to consume. The API is responsible for the logic and persistance all three main elements described above. The client is responsible for presenting data and interacting with the user.

### API
The API is build on a node.js platform using the wonderfull Nest.js framework, which helps organize and structure the code (especially as we are under MASSIVE timepresure during this case). The API connects to a Postgres database for storing and persisting data.

### Client/App
The client is build on Next.js. Using Next.js we can quickly build a scalable solution - and even deploy as a static single-page-application.

### Cloud architecture

The complete service is deployed to the cloud. Due to the time-limitation, the API will not be made serverless - though it might be totally possible under other project constraints.
Instead, the API is hosted on Heroku, where we also host the Postgres database. The choice of cloud provider is mostly agnostic.

The client is hosted on a global CDN using Netlify.

## DevOps

This repo is organised as a mono-repo. It contains both the codebase for the API and the client.

When pushing to the `main` branch, the Virtual Whiteboard will automatically be deployed into the cloud. This is done automatically using Heroku CD and Netlify CD functionality.

## Quality assurance and testing

Not much thought has been put into automatic testing project (including CI) due to the time constraints. This is normally a BAD decision, as we normally need some mechanisms to validate that changes or modifications will not compromise the overall quality and availability of any services in the system.

## Development

For development, start by installing the required node modules in both the `api` and `app` directories, eg

```bash
$ cd api
$ yarn install
$ cd ../app
$ yarn install
```

To run the API server in development mode
```bash
$ cd api 
$ yarn start:dev
```

To run the client in development mode 
```bash 
$ cd app
$ yarn dev
```