# MERN Backend

A simple backend application built with:
- Node with Express
- MongoDB
- Jest
- Swagger UI Express

### API Documentation

Swagger link https://mern-be-smoky.vercel.app/api-docs/

![swagger](swagger.png)

## Getting Started

To get started, clone this repository and run `npm install` to install the dependencies. Then, run `node index.js` to start the development server.

To open swagger UI you can go to `http://localhost:3000/api-docs/`

### Testing

This applciation use Jest, implemented two kind of test:
- Unit test can be found in folder `tests/unit`
- Integration test can be found in folder `tests/integration`

To test run `npm test`

## Database

The database using MongoDB. Database name is `user`.

## Live Application

This application is deployed using Vercel and MongoDB Atlas.
To check live application try hit using `curl https://mern-be-smoky.vercel.app/user`
