const express = require('express');
const router =  express.Router();
const bodyParser = require('body-parser').json();
var path = require('path');
var multer = require('multer');
const fs = require('fs');
const notificationController=require('../controllers/notificationController');

// Retrieve all sites 
router.get('/all',notificationController.getListNotification);
router.post('/create',notificationController.createNotification);
router.put('/update',notificationController.updateNotification);
router.post('/send',notificationController.sendNotification);



module.exports = router;