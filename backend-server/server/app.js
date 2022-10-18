const express = require('express')
const app=express()
var bodyParser = require('body-parser');
const processRoutes=require('./routes/process.js')
const notificationRoutes=require('./routes/notification.js')
const db = require('./config/db.config');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors())
app.use(express.urlencoded());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

const port = process.env.PORT || 3002


app.use('/process',processRoutes);
app.use('/notification',notificationRoutes);


db.sequelize.sync({force:true})
    .then(result => {
        app.listen(port, err => {
          if (err) console.error(err)
          console.log(`App Listening on Port ${port}`)
        })
    })
    .catch(err => {
        console.log(err);
});


/*
app.listen(port, err => {
  if (err) console.error(err)
  console.log(`App Listening on Port ${port}`)
})
*/