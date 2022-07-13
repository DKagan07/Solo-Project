const medsDB = require('../server/models/models.js');

const medsController = {};


medsController.getMeds = async (req, res, next) => {

    //******/
        //this fetch request was moved to the front end, but might still need this for the back end
    //******/

    // const { medName } = req.body;
    // const medData = await fetch(`https://api.fda.gov/drug/ndc.json?search=generic_name:${medName}&limit=1`)

    const user = res.params.user

    const medDBfetch = await medDB.findOne({user: user})
    if (medDBfetch) {
        
    }
}


module.export = medsController;