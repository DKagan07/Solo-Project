const express = require('express');
const medsController = require('../controllers/medsController.js');
const medApiRouter = express.Router();


medApiRouter.get('/:medName', medsController.getMeds, /*medsController.addToDB,*/
    (req, res) => {
        return res.status(200).json(res.locals.medData);
    }
)

module.exports = medApiRouter;