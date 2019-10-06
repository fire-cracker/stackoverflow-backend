# A StackOverflow Backend Challenge

## Table of Contents

* [Project Overview](##Project-Overview)
* [Features](##Features)
* [Built with](##Built-with)
* [APP Link](##APP-link)
* [API Documentation](##API-Documentation)
* [API End Points](##API-End-Points)
* [Known Issues](##Known-issues) 
* [Getting Started](##Getting-Started)
* [Prerequisites](###Prerequisites)
* [Installation](###Installation)
* [Docker](##Docker)
* [Test](##Test)
* [Contributing](##contributing)
* [License](##License)

## Project Overview
**StackOverflow-Backend** is the backend implementation of a simple clone of Stackoverflow. It was built from scratch using `MongoDB` , `mongoosejs` , `JavaScript` and `Node.js`

## Features

- Users can register/login using website custom forms, or through facebook
- Users can ask questions
- Users can view questions.
- Users can upvote or downvote questions
- Users can answer questions
- Users can search for questions, answers and other users
- Users can subscribe to questions


## Built with
- `MongoDB`
- `mongoosejs`
- `JavaScript`
- `Node.js`
- `Express framework`


## APP Link

## API Documentation
POSTMAN API documentation  [here](https://documenter.getpostman.com/view/5148818/SVtR3qrp)

## API End Points
<table>
	<tr>
		<th>HTTPS</th>
		<th>ENDPOINT</th>
		<th>DESCRIPTION</th>
	</tr>
	<tr>
		<td>GET</td>
		<td>/</td> 
		<td>Default route</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/users</td> 
		<td>User Registration</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>users/login</td> 
		<td>Login User</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/users/facebook</td> 
		<td>Social login</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/questions</td> 
		<td>Create a question</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/questions/</td> 
		<td>Fetch all questions</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/questions/:questionId</td> 
		<td>Fetch the details of a particular question</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/questions/:questionId/upvote</td> 
		<td>Upvote a question</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/questions/:questionId/downvote</td> 
		<td>Downvote a question</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/questions/:questionId/answers</td> 
		<td>Answer a question</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/search</td> 
		<td>Search for questions, answers or users</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/questions/:questionId/subscribe</td> 
		<td>Subscribe to a question</td>
	</tr>
</table>  

 
## Known issues
Everything works as expected; However:
- This project is just a backend app, i.e. no frontend implementation.

## Getting started

### Prerequisites

In order to install and run this project locally, you would need to have the following installed on your local machine.

* [**Node JS**](https://nodejs.org/en/)
* [**Express**](https://expressjs.com/)
* [**MongoDB**](https://www.mongodb.com/download-center/community) or [**Mlab**](https://mlab.com/) if not interested in setting up database on device.

### Installation

* Clone this repository

```sh
	git clone https://github.com/oyedejipeace/stackoverflow-backend.git
```

* Navigate to the project directory

```sh
	cd stackoverflow-backend
```

* Run `npm install` or `yarn` to install the projects dependencies

* create a `.env` file and copy the contents of the `.env.sample` file into it and supply the values for each variable

```sh
	cp .env.sample .env
```
* Create a MongoDB database

* Run `npm run dev` to start the app in development
Once the server starts-up, you can query the api at `http://localhost:3001/` using the end points stated above.

## Docker

* Build image

`docker build -t stackoverflow-backend .`

* Run container
`docker run --rm -p 8000:80 stackoverflow-backend`

## Test
* Run `npm test` or `yarn test`

## Contributing
>  Feel free to 🍴 fork this repository

>  👯 Clone this repository to your local machine using `https://github.com/fire-cracker/stackoverflow-backend.git`

> Make Contributions

> 🔃 Create a new pull request using `https://github.com/oyedejipeace/stackoverflow-backend/compare`

## License
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

- **[MIT license](https://oyedejipeace.github.io/stackoverflow-backend/LICENSE.md)**
- Copyright 2018 © <a href="https://github.com/oyedejipeace/stackoverflow-backend" target="_blank">StackOverflow-Backend</a>