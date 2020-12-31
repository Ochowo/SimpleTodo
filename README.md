# SimpleTodo

[![CircleCI](https://circleci.com/gh/Ochowo/SimpleTodo.svg?style=shield)](https://circleci.com/gh/Ochowo/simpleTodo)
[![Coverage Status](https://coveralls.io/repos/github/Ochowo/SimpleTodo/badge.svg?branch=ch-add-circleci-config)](https://coveralls.io/github/Ochowo/SimpleTodo?branch=ch-add-circleci-config)

A Simple Todo App

##### Required Features
 * Users can create an account and log in. 
 * Users can create a **todo** record.
 * Users can edit their **todo** records.
 * Users can view their **todo** records.
 * Users can delete their **todo** records.
 * Users can send email invitationto users to join the app.
 
##### Technologies Used
* NodeJs
* Express
* JWT
* Mongodb
* RabbitMQ
* JWT
* Nodemailer

##### Testing tools
* Jest.
* CircleCi
* Coveralls

##### Getting Started
* nstall NodeJS and Mongodb on your computer
* Clone this repository using git clone https://github.com/Ochowo/SimpleTodo.git
* Run npm install to install all dependencies
* Create and configure .env using .env.example as a guide
* Run npm start:dev to run app 
* Navigate to localhost:3000 in browser to access the application
* Run test with `npm test`

##### Available Endpoints
* `/api/v1/auth/signup` - signup
* `/api/v1/auth/login` - login
* `/api/v1/todos` - create todo
* `/api/v1/todo` - get todo
* `/api/v1/todos/:id` - get single todo
* `/api/v1/todos/:id` -  edit todo
* `/api/v1/todos/:id` -  delete todo
* `/api/v1/send` - send invitation email

##### Testing with Postman
* Install postman as shown [here]: https://www.getpostman.com/
* Navigate to `http://localhost:3000/` in Postman to access the application
* Use available endpoints to access app

