const medsDB = require('../server/models/models.js');
const fetch = require('node-fetch');
const fs = require('fs');

const medsController = {};


medsController.getMeds = async (req, res, next) => {
    try {
        const { medName } = req.params

        const data = await fetch(`https://api.fda.gov/drug/ndc.json?search=brand_name:${medName}&limit=1`)
        const medData = await data.json()

        res.locals.medData = medData

        //have a create db in a separate piece of middleware
        // medsDB.create(JSON.stringify(medData))
        // const dbData = fs.appendFileSync('../meds.json', JSON.stringify(medData))
        // console.log('appended file!, ', dbData);

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


medsController.addToDB = async (req, res, next) => {
    //deconstructing data from res.locals.medData to eventually store in a database
    const { generic_name, brand_name, pharm_class } = res.locals.medData.results[0];
    const { strength } = res.locals.medData.results[0].active_ingredients[0]
    const route = medData.results[0].route[0];

    
}


module.exports = medsController;