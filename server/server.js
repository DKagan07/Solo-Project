const express = require('express');
const app = express();

const path = require('path');
const PORT = 4321;
const fs = require('fs');


//require routers
const medApiRouter = require('./routers/medApiRouter.js')


//json parse and static files
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, '../client')));

if (process.env.NODE_ENV === 'production') {
    app.use('/dist', express.static(path.resolve(__dirname, '../dist'))) //gets production server showing
}


//route handlers

app.use('/', medApiRouter)



//catch all route handler
app.use((req, res) => {
    console.log('Catch all route handler!');
    return res.sendStatus(403);
})


//global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });


//start server
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
}); //listens on port 4321  -> http://localhost:4321;



//!!!!!!!!!!!!fetch not currently supported on most recent version of node!!!!!!!!!!!!!!!!!!!!!!!!!
    //dealt with npm install node-fetch@2.3.0