const http = require("http")
const fs = require("fs")
const path = require("path")

const FILES = {
    ".js": "twitter-search.js",
    ".css": "twitter-search.css"
}

const requestHandler = (request, response) => {
    console.log(`Request received to: ${request.url}`)
    const fileName = FILES[path.extname(request.url)] || "index.html"
    const contentType = `text/${path.extname(request.url).replace(".", "") || "html"}`
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(fs.readFileSync(`./${fileName}`), "utf-8")
}

const server = http.createServer(requestHandler)

server.listen(3000)