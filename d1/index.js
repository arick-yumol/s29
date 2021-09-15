const express = require('express');
// create an application using express
// This creates an express application and stores this as a constant called 'app'.
// app is our server
const app = express();
// for our application server to run, we need a port to listen to
const port = 3000;

// Setup for allowing the server to handle data from requests
// Allows your app to read json data
// Methods used from express.js are 'middleware'
// Middleware is a software that provides services outside of what's offered by the operating system
app.use(express.json());
// allows your app to read data from forms
// By default, information received from the url can only be received as a string or an array
// By applying the option of "extended:true" this allows us to receive information in other data types such as an object/boolean, etc., which we will use throughout our application
app.use(express.urlencoded({ extended: true }))



// We will create routes
// Express has methods corresponding to each HTTP method
// These routes expect to receive a GET request at the base URI '/'
// "http://localhost:3000/"
app.get('/', (req, res) => {
	// res.send uses the express JS module's method instead to send a response back to the client
	res.send(`Hello World`);
})

app.get('/hello', (req, res) => {
	res.send(`Hello from the /hello endpoint!`);
})

// Post method
app.post('/hello', (req, res) => {
	res.send(`Hello there ${req.body.firstName} ${req.body.lastName}!`);
})

// for /signup
// mock database
let users = [];

app.post('/signup', (req, res) => {
	console.log(req.body);
	// if contents of the request body with the property "username" and "password" is not empty
	if (req.body.userName !== '' && req.body.password !== '') {
		// This will store the user object sent via POSTMAN to the users array
		users.push(req.body);
		// send response
		res.send(`User ${req.body.username} successfully registered!`);
	}
	else {
		res.send(`Please input BOTH username and password`);
	}
})

// update the password of a user that matches the information provided in the client/Postman
app.put('/change-password', (req, res) => {
	// create a for loop that will loop through the elements of the 'users' array
	let message;
	for (let i = 0; i < users.length; i++) {
		if (req.body.username == users[i].username) {
			// Changes the password of the user found by the loop into the password provided in the client/Postman
			users[i].password = req.body.password;

			// Changes the message to be sent back by the response

			message = `User ${req.body.username}'s password has been updated`
			// Breaks out of the loop once a user that matches the username provided in the client/Postman is found
			break;
		}
		else {
			message = "user does not exist"
		}
	}
	res.send(message)
})



// s29 Activity

// #1. Create a GET route that will access the "/home" route that will print out a simple message.
app.get('/home', (req, res) => {		//outputs a simple message when the URI is sent
	res.send(`Welcome to the home page`);	
})


// #3. Create a GET route that will access the "/users" route that will retrieve all the users in the mock database.
app.get('/users', (req, res) => {		//retrieves all users that has signed up
	res.send(users);					//gets the array of objects from /signup
})


// #5. Create a DELETE route that will access the "/delete-user" route to remove a user from the mock database.
app.delete('/delete-user', (req, res) => {		//not yet working
	let message;
	for (let i = 0; i < users.length; i++) {
		if (req.body.username == users[i].username) {
			
			// users[i].username = req.body.username;
			users.splice(i, 1);

			message = `User ${req.body.username} has been deleted.`
			
			break;
		}
		else {
			message = "User does not exist and cannot be deleted"
		}
	}
	
})


app.listen(port, () => console.log(`Server is running at port ${port}`))