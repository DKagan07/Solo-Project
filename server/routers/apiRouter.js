const express = require('express');
const medsController = require('../server/controllers/medsController.js');

const apiRouter = express.Router();

apiRouter.get('/', medsController,
(req, res) => {
    return res.status(200).json();
})

module.export = apiRouter;