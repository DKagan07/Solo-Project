const express = require('express');
const app = express();
const path = require('path');
const PORT = 4321

const mongoose = require('mongoose');
const MONGO_URI: 'mongodb+srv://Kagan07:Sailing49er@cluster0.9nqml.mongodb.net/?retryWrites=true&w=majority'

//require routers


//json parse and static files



//route handlers




//catch all route handler
app.use((req, res) => {return res.sendStatus(404);})


//global error handler




//start server
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
}); //listens on port 4321  -> http://localhost:4321;

//fetch not currently supported on most recent version of node