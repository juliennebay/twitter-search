# Twitter search
This app lets the users search for the latest tweets, using a search string. 

It has been deployed on Heroku: https://sheltered-chamber-27375.herokuapp.com/

# How it works
## Server
The server has 2 functions: 
1. Serve the html, css and JS files for the app.
2. Respond to requests at the path `/search` by first authenticating with the Twitter API, making the search request
and returning the result.
## Client
Allows the user to type in a search term, and make a search request to the server.

# How to run it locally
Start the server with `node index.js`. The server will start at port 3000. Navigate to http://localhost:3000 in the browser. 

# Screenshot
![screenshot](https://github.com/juliennebay/twitter-search/blob/master/screenshot.png)
