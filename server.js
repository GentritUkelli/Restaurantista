//Node modules HTTP
const http = require("http");
// fs=filesystem
const fs = require("fs");
// path module
const path = require("path");
const { URLSearchParams } = require("url");

// create server
const server = http.createServer((req, res) => {
  if (req.method === `POST`) {
    if (req.url === `/submit-form.js`) {
      let body = ``;

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const formData = new URLSearchParams(body);
        const email = formData.get("email");
        const newsletter = formData.get("newsletter") === `on`;

        // Perform validation
        if (!isValidEmail(email)) {
          res.writeHead(400);
          res.end("Invalid email address");
        } else {
          res.writeHead(200);
          res.end("From submitted successfully");
        }
      });
    }
  } else {
    let filePath = `.` + req.url;
    if (filePath === "./") {
      filePath = "./index.html";
    }

    const extname = path.extname(filePath);
    let contentFilePath = `text/html`; 

    switch(extname) {
      case `.css`:
          contentType =  `text/css`;
          break;
      case `.js`:
        contentType = `text/js`;
        break;
    }

    fs.readFileSync(filePath, (error, content) => {
      if (error) {
        if(error.code === 'ENOENT'){
          res.writeHead(404);
          res.end(`404 File not found:`);
        } else{
          res.writeHead(500);
          res.end(`500 Internal Server Error`);
        }
      }else{
        res.writeHead(200, {"Content-Type": contentType});
        res.end(content, "utf-8");
      }
    });
  }
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function isValidEmail(email){
  var emailRegex = /\S+@\.\S+/;
  return emailRegex.test(email);
}