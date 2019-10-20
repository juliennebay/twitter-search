const http = require("http");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const FILES = {
  ".js": "twitter-search.js",
  ".css": "twitter-search.css"
};

const getCred = () => {
  const consumerKey = "ITrbDYY3mmlrZ5Adj56F2JSUl";
  const consumerSecret = "1IjSLBtOTl6y1ZGGNX42hhzg23Rr79Rd1LtpyoYscn3V7IrOT6";
  const bearerTokenCred = `${consumerKey}:${consumerSecret}`;
  const base64Encoded = Buffer.from(bearerTokenCred).toString("base64");
  return base64Encoded;
};

const requestHandler = (request, response) => {
  console.log(`Request received to: ${request.url}`);
  let contentType;
  let responseContent;

  if (request.url.includes("/search")) {
    contentType = "application/json";
    //const searchResults = require("./exampleSearchResult.json");
    //responseContent = JSON.stringify(searchResults);
    const authUrl = "https://api.twitter.com/oauth2/token";
    const authOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: `Basic ${getCred()}`
      },
      body: "grant_type=client_credentials"
    };
    fetch(authUrl, authOptions)
      .then(response => response.json())
      .then(result => {
        const accessToken = result.access_token;
        const searchUrl =
          "https://api.twitter.com/1.1/search/tweets.json?q=toronto";
        const searchOptions = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        };
        //the line below must include the word "return," so that it returns a promise
        // that allows us to chain with `.then` (which will return the search results)
        return fetch(searchUrl, searchOptions);
      })
      .then(searchResponse => searchResponse.json())
      .then(searchResult => {
        response.writeHead(200, { "Content-Type": contentType });
        response.end(JSON.stringify(searchResult), "utf-8");
      });
  } else {
    const fileName = FILES[path.extname(request.url)] || "index.html";
    contentType = `text/${path.extname(request.url).replace(".", "") ||
      "html"}`;
    responseContent = fs.readFileSync(`./${fileName}`);
    response.writeHead(200, { "Content-Type": contentType });
    response.end(responseContent, "utf-8");
  }
};

const server = http.createServer(requestHandler);

server.listen(3000);
