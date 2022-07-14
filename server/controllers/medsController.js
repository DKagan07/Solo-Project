// const medsDB = require('../server/models/models.js');
const fetch = require('node-fetch');
const fs = require('fs');

const medsController = {};


medsController.getMeds = async (req, res, next) => {
    try {
        const { medName } = req.params

        const data = await fetch(`https://api.fda.gov/drug/ndc.json?search=brand_name:${medName}&limit=1`)
        // console.log(data);
        const medData = await data.json()

        // console.log(medData)
        res.locals.medData = medData
        // fs.appendFile('meds.json', res.locals.medData)
        // .then(() => {
        return next()  
        
    }
    catch(err) {
        next({
            log: 'Error in fetching data!',
            err: {
                message: `${err} in medsController.getMeds middleware function`
            }
        })
    }
}


module.exports = medsController;