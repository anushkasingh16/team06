# Milestone 2

## Team Name: Team 06 - Text Swap

### Application Name: Text Swap

### API Reference  

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


### Screenshots of our Front-End:

Users will have to sign up on the website to start making a profile. Only emails ending with umass.edu will be allowed to sign up so only students have access to the app. Other information included with a user's profile are the textbooks they are listing, their username, the total number of textbook swaps they have done as well as options to include their phone number and address to help conduct trades with people.

Textbooks that are listed will also have a profile that includes their ISBN, condition, title, edition and a picture of the book to ensure good condition. Our webpage will also have an algorithm to match people that are looking for a textbook with people that have the textbook they need as well as set up multiple swaps if necessary. The app will also include the ability to message other users once a match has been made so they can set up a time and place to swap, or share their address to ship textbooks to.

Additionally, if users are not swapping but only want to buy a book, we also have the option of letting them “split and share” with other users who are looking for the same book. If the user doesn’t have someone to split with, our application will connect them with other users who also want to split.

### The flow of our website starts with with the **main page** as shown below:

<img src="https://github.com/anushkasingh16/team06/blob/781551953035a2485906535a3017950914ffc0a7/docs/screenshots/index.jpg">

### Once you are at the **main page**, the user can **sign in/log in** as shown below:

<img src="https://github.com/anushkasingh16/team06/blob/781551953035a2485906535a3017950914ffc0a7/docs/screenshots/login.jpg">

### After the user logs in/ signs up we take them to the **home page** as shown below:

<img src="https://github.com/anushkasingh16/team06/blob/781551953035a2485906535a3017950914ffc0a7/docs/screenshots/home.jpg">

### At the **home page**, there are a few componets that build up our user interface. The features are listed as follows:

#### User Profile 
<img src="https://github.com/anushkasingh16/team06/blob/main/docs/wireframes/Wireframes-Profile.png">

#### Messages (For interacting with other users you want to sell/swap books with.)
<img src="https://github.com/anushkasingh16/team06/blob/781551953035a2485906535a3017950914ffc0a7/docs/screenshots/messages.jpg">


#### NewListing (Allows you to add new books to **MyTextbooks**.)
<img src="https://github.com/anushkasingh16/team06/blob/781551953035a2485906535a3017950914ffc0a7/docs/screenshots/newlisting.jpg">

<hr>

### Team Overview with Work Division

Tyler Viarengo - https://github.com/borisshoes
* Layout of APIs
* Server Webpage Endpoints
* User Profile API

Alan Zheng - https://github.com/alan3737
* CRUD operations for Textbook Listing 
* CRUD oeprations for Profiles

Anushka Singh - https://github.com/anushkasingh16
* Sign Up/Login 
* Heroku Deployment and debugging Express routes
* Documentation 

Helton Pongnon - https://github.com/HeltonP
* Rendering Texts for Messenger UI
* Messenger API/associated HTML 