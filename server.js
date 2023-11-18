const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    if (req.url === "/submit-form.js") {
      let body = "";

      // Read the data from the request
      req.on("data", (chunk) => {
        body += chunk;
      });

      // Process the data once it has been fully received
      req.on("end", () => {
        // Parse the form data
        const formData = new URLSearchParams(body);
        const email = formData.get("email");
        const newsletter = formData.get("newsletter") === "on";

        // Perform validation
        if (!isValidEmail(email)) {
          res.writeHead(400);
          res.end("Invalid email address");
        } else {
          // Return a response to the client
          res.writeHead(200);
          res.end("Form submitted successfully");
        }
      });
    }
  } else {
    let filePath = "." + req.url;
    if (filePath === "./") {
      filePath = "index.html";
    }

    const extname = path.extname(filePath);
    let contentType = "text/html";

    switch (extname) {
      case ".css":
        contentType = "text/css";
        break;
      case ".js":
        contentType = "text/javascript";
        break;
    }

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === "ENOENT") {
          res.writeHead(404);
          res.end("404 Not Found");
        } else {
          res.writeHead(500);
          res.end("500 Internal Server Error");
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
      }
    });
  }
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Email validation function
function isValidEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}