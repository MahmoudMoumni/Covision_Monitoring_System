const express = require('express');
const router =  express.Router();
const bodyParser = require('body-parser').json();
var path = require('path');
var multer = require('multer');
const fs = require('fs');
const processController=require('../controllers/processController');

// Retrieve all sites 
router.get('/all',processController.getListProcess);
router.post('/create',processController.createProcess);




module.exports = router;