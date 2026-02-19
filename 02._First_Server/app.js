// import express
const express = require('express');
// instantiate express
const app = express();

app.use(express.json());

// one-liner version:
// const app = require('express')();



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/xss', (req, res) => {
    res.sendFile(__dirname + '/xss.html');
});


// task create a new route called snowstorms, it should respond with a warning
app.get('/snowstorms', (req, res) => {
    res.send({ data: "Snowstorm is coming." });
});

// Question: how can we send data in a GET request?

// path variable
app.get('/cars/:carModel/:year', (req, res) => {
    console.log(req.params);
    res.send({ data: `
        Your ${req.params.carModel} is very nice.
        Is it from the year ${req.params.year}?
    `});
});

// query string / query parameters
// ?parametername=value&parametertwo=valuetwo
app.get('/bag', (req, res) => {
    res.send({ data: req.query });
});


app.get("/proxy", (req, res) => {
    /* assignment
        Make a request to https://www.google.com/ and serve the page to the client
        This is called a proxy.
        You already have all the knowledge you need to solve this task
    */
/*    fetch('https://www.google.com/')
   .then((response) => response.text())
   .then((result) => {
    res.send(result);
   }); */

    fetch("https://www.google.com/")
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
        const decoder = new TextDecoder("ISO-8859-1");
        const text = decoder.decode(buffer);
        res.send(text);
    });
 
});

app.post('/dinosaurs', (req, res) => {
    console.log(req.body);

    res.send({ data: req.body });
});

// assignment: create a POST route with the endpoint /energydrinks that adds energy drinks to an array




app.listen(8080);
