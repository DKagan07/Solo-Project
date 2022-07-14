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
app.use('/dist', express.static(path.resolve(__dirname, '../dist'))) //gets production server showing

//route handlers


// app.use('/user', userRouter);

/*
IDEA:
instead of making the initial fetch a get request in the frontend, make it a post request, put it into the meds.json,
and then the response will be accessed from the front end to render onto page
*/



app.use('/', medApiRouter)


// (req, res) => {
//     const { generic_name, brand_name, pharm_class, strength, route, active_ingredients } = req.body;
//     res.locals.med = {
//         generic_name: generic_name,
//         brand_name: brand_name,
//         pharm_class: pharm_class,
//         strength: strength,
//         route: route,
//         active_ingredients: activeIngArr,
//     }
//     fs.appendFile('./meds.json', JSON.stringify(res.locals.med), (err) => {
//         if (err) {
//             return next ({
//                 log: 'Error in /meds post req to meds.js',
//                 message: {
//                     err: `${err} to move data to meds.json`,
//                 }
//             })
//         }
//     })
//     return res.status(200).json('med stored')
// }



//catch all route handler
app.use((req, res) => {return res.sendStatus(404);})


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