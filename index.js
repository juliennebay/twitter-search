const http = require("http")
const fs = require("fs")
const path = require("path")

const FILES = {
    ".js": "twitter-search.js",
    ".css": "twitter-search.css"
}

const requestHandler = (request, response) => {
    console.log(`Request received to: ${request.url}`)
    let contentType
    let responseContent

    if (request.url.includes("/search")){
        contentType = "text"
        responseContent = "search results"
    }else {
        const fileName = FILES[path.extname(request.url)] || "index.html"
        contentType = `text/${path.extname(request.url).replace(".", "") || "html"}`
        responseContent = fs.readFileSync(`./${fileName}`)
    }

    response.writeHead(200, { 'Content-Type': contentType });
    response.end(responseContent, "utf-8")
}

const server = http.createServer(requestHandler)

server.listen(3000)