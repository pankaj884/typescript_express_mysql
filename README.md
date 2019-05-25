# App Platform

The backend is made from scratch. Whole stack in [TypeScript](https://www.typescriptlang.org).

This project uses the [MEAN stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)):
* [**S**equelize.js](http://www.mongoosejs.com) ([MySQL](https://www.MySQL.com)): database
* [**E**xpress.js](http://expressjs.com): backend framework
* [**N**ode.js](https://nodejs.org): runtime environment

Other tools and technologies used:
* [JSON Web Token](https://jwt.io): user authentication
* [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js): password encryption

## Prerequisites
1. Install [Node.js](https://nodejs.org) and [MySQL](https://www.MySQL.com)
3. From project root folder install all the dependencies: `npm i`

## Run
Make sure you create a `.env` file and copy what is on `.env.example`. It would be different for different environments.
### Development mode
`npm run dev`: [concurrently](https://github.com/kimmobrunfeldt/concurrently) execute MySQL, TypeScript compiler and Express server.

`node dist/server/app.js`

### Production mode
`npm run prod`: run the project with a production bundle and AOT compilation listening at [localhost:3000](http://localhost:3000) 

`node dist/server/app.js`
