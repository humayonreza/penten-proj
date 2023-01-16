var http = require("http");
const fs = require("fs/promises");
//create a server object:
http
  .createServer(function (req, res) {
    res.write("Hello World!"); //write a response to the client

    async function example() {
      try {
        const content = "Some content!";
        await fs.writeFile("./test.txt", content);
      } catch (err) {
        console.log(err);
      }
    }
    example();

    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
console.log("Listening on port 8080");
