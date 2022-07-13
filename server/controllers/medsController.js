const medsDB = require('../server/models/models.js');

const medsController = {};


medsController.getMeds = async (req, res, next) => {

    //******/
        //this fetch request was moved to the front end, but might still need this for the back end
    //******/
    
    // const { medName } = req.body;
    // const medData = await fetch(`https://api.fda.gov/drug/ndc.json?search=generic_name:${medName}&limit=1`)

    //****************************************************/ 
    //want below information stored in db under the user as well as showed on the front end in each med card

    //getting generic_name and brand_name (string) and pharm_class (array);
    const { generic_name, brand_name, pharm_class } = medData.results;

    //getting dose (array)
    const { strength } = medData.results.active_ingredients
    //****************************************************/
}


module.export = medsController;