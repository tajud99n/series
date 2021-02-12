const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Init express
const app = express();

app.disable("x-powered-by");

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// handle errors
app.all("/*", (req, res) => {
    
});

app.use((err, req, res) => {
    
});


module.exports = { app };
