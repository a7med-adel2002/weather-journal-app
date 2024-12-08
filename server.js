// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

//setting up project environment
const bodyParser = require("body-parser");
const cors = require("cors");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3030;

// Test Server
app.listen(port, function () {
  console.log(`Server is Working Well on Port:${port}`);
});

//GET Route I: Server Side
app.get("/all", getData);
function getData(req, res) {
  console.log("GET is working");
  res.send(projectData);
}

//POST Route
app.post("/addZip", addZip);

function addZip(req, res) {
  console.log(req.body);
  projectData = {
    temp: req.body.temp,
    // date: req.body.date,
    // content: req.body.content,
  };
  console.log("POST is working");
  res.send(projectData);
  console.log(projectData);
}
