# Team 06
## Text Swap

* Deployment - The base URL to send all API requests is https://umasstextswap.herokuapp.com/ (Heroku Deployed Website)

* Semester: Spring 2022

* Team Members: 

Tyler Viarengo - https://github.com/borisshoes ,

Alan Zheng - https://github.com/alan3737,

Anushka Singh - https://github.com/anushkasingh16,

Helton Pongnon - https://github.com/HeltonP

## Overview

Text Swap is meant to be a platform that allows students to swap textbooks or buy them from other students. The goal of Text Swap is to allow students to stay on budget while also making sure that books are sourced more sustainably by college students.

The novelty of Text Swap lies in the fact that it is meant to be a college bookstore that tries to incorporate the ideas of borrowing and sharing amongst students.

It is also built exclusively for students and only allows them to log in and it also allows students to message each other to set up their textswaps.

## User Interface

Our UI is focused on some basic principles of user experience and design, primarily the following:

* Consistency: Making sure that our elements, colours, fonts, logo, and all the buttons were consistent in terms of design. Aditionally, we also wanted to be consistent in terms of functionaility and made sure to have each feature play out in a similar manner for the user.

* User Feedback: We focused on making sure that for every action a user perfomed they would get feedback from our webapp, in terms of either the express routes changing or in terms of notifications, alters, changing colours, etc. 

* Accesibility - We tried our best to add alternative text for screen readers, and made sure we worked with sans serif fonts, etc. The goal was to work with colors that wouldn't cause the user strain or flashing lights.

Some screenshots of our project are as follows:

### The flow of our website starts with with the **main page** as shown below:

<img src="https://github.com/anushkasingh16/team06/blob/781551953035a2485906535a3017950914ffc0a7/docs/screenshots/index.jpg">

### Once you are at the **main page**, the user can **sign in/log in** as shown below:

<img src="https://github.com/anushkasingh16/team06/blob/781551953035a2485906535a3017950914ffc0a7/docs/screenshots/login.jpg">

### After the user logs in/ signs up we take them to the **home page** as shown below:

<img src="https://github.com/anushkasingh16/team06/blob/781551953035a2485906535a3017950914ffc0a7/docs/screenshots/home.jpg">

## API Ref

The base URL to send all API requests is https://umasstextswap.herokuapp.com/ (Heroku Deployed Website)

Our API follows RESTful conventions and our current operations are performed using GET, POST and DELETE.

In the file './server/index.js', we lay out our server API endpoints and they are as follows:

GET operations:
* '/home' - Takes us to the Home Page after log in
* '/mybooks' - Shows us the listing of our books
* '/profile' - Shows us the current user's profile
* '/messenger' - Takes us to the user's message dashboard
* '/messenger/read' - Shows us the user's chats
* '/getBook' - Gets the specifics of a book

DELETE operations:
* '/deleteBook' - Deletes a book lsiting

POST operations:
* '/messenger/create' - Allows us to POST a new message
* '/existingUser' - For Login authentication 
* '/getUser' - For User Profile 
* '/registerNewUser' - For Sign Up
* '/loginRequest' - For validating Login from user database 
* '/storeBook' - Allows us to store new listing

## Database

We make use of MONGODB extensively. OUr goal was to have databases that are very simple to use and cohesive in their implementation. 

In our database, each collection is just an array of javascript objects that store data about either a message sent, a textbook listing or a user. The user database contains information like your email, and address, the message database contains all the messages sent between users, and the listings database holds information like the book's ISBN, author and title.

## URL Routes/Mappings

Endpoint Mapping
/ - Login Page
/home - Home Page after login
/mybooks - The Page for your textbooks
/profile - Info about your profile
/messenger - The Messenger page
/messenger/create - creates a new message
/messenger/read - gets all the messages between two users
/existingUser - checks if a user exists
/getUser - gets a user's database
/registerNewUser - creates a new user
/loginRequest - handles login
/createBook - makes a new listing
/getBook - gets a listing
/getAllBooks - gets all listings
/deleteBook - deletes a listing

## Authentication/Authorization

## Final Rubric

Our rubric to judge our work is as follows:
* 20 pts - Databases and use of MongoDB
* 10 pts - Authentication and Login and Final Deploymemt
* 15 pts - User Profile Set Up/Updation
* 15 pts - Creating Listings of Books
* 20 pts - Design of UI / Interactivity of website
* 20 pts - Express Routes

## Division of Labor

### Tyler Viarengo 

Milestone 1:

* Made all the wireframes
* Made the Textbook 'Card' Divs (Front End)
* Made the My Textbooks Page, New Textbook Forms 

Milestone 2:

* Made the layout and structure for the APIs and Endpoints
* Set up the code for Endpoints
* User Profile API
* Helped with Messenger API

Milestone 3 / Final:

* General layout of our databases
* Set up the MongoDB and collections
* Made the user creation code (not the authentication part)
* Fixed a lot of the profile database
* Made the profile page access the database and update front end
* Made the messenger database crud operations and general backend structure
* Walkthrough and edited the presentation video

### Anushka Singh 

Milestone 1:

* Created Main Page
* Created Sign Up
* Combined code from everyone's branches into a consistent UI + CSS formatting

Milestone 2:

* Sign Up/Login 
* Heroku Deployment and debugging Express routes
* Worked on Documentation
* UI cleanup and consistency debugging

Milestone 3 / Final:

* Created Presentation for Video Demo 
* Documentation for the milestone
* Deployment and final route checks for express
* Authorization and Sign Up

### Helton Pongnon 

Milestone 1:
* Worked on inital UI for messenger
* Worked on inital UI for profile pages

Milestone 2:
* Rendering Texts for Messenger UI
* Messenger API/associated HTML 

Milestone 3 / Final:
* 

## Conclusion

### Features We Are Proud Of
* Seeing all the textbooks available on the platform in one go, making it easier to see different versions of the same book, etc. 
* Having a way to message the students you are planning to swap books with! Communication is key and helps make this more college community friendly.
* Having a consistent and intuitive UI is key because we want this to be something you can tap into quickly while getting your assignments done too!

### Things To Improve
* Being able to send images through the messenger/adding your own images to the listing: so that others can see the conditions of your books!
* Having a smart search engine that can recommend you books based on what courses you are taking at a certain university. Say you’re taking CS 383, we’ll tell you that you might need Artificial Intelligence: A Modern Approach!
* 

### Final Thoughts

This project allowed us to learn the many sides of web dev while also allowing us to build something that would be helpful for other students, and was a way for us to see how every topic related to real life uses of web apps.