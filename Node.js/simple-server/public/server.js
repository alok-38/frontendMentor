const http = require("http");
const fs = require("fs");
const path = require("path");

http.createServer((req, res) => {
    // 1️⃣ Determine which file to serve
    let filePath = req.url === "/" ? "index.html" : req.url.slice(1);
    // removes the leading "/" from the URL

    // 2️⃣ Determine Content-Type based on extension
    const ext = path.extname(filePath);
    const types = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
    };
    const contentType = types[ext] || "text/plain";

    res.setHeader("Content-Type", contentType);

    // 3️⃣ Read the file and send it
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.end("File not found");
            return;
        }
        res.end(data);
    });
}).listen(3000);

console.log("Server running at http://localhost:3000");
