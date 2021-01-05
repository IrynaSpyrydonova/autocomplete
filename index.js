// this is the main entry point for your full app
// it serves your frontend & provides access to your API

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const School = require('./models/School');


const api = require('./api/server');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.method + ': ' + req.path);
  next();
});

// Connection

mongoose.connect(process.env.MONGOBD_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false}, ()=> console.log('connected to database'));
mongoose.Promise = global.Promise;

app.use('/', express.static(__dirname + '/client/build/'))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

app.use('/api', api);

app.post('/schools', (req, res, next)=>{
  School.create(req.body).then((school)=>{
    res.send(school)
  }).catch(next);
})

// get all schools
app.get('/schools', (req, res, next)=>{
  School.find({}).then((school)=>{
    res.send(school)
  }).catch(next);
})


app.get('/closeschools', (req, res, next)=>{
        const longitude = parseFloat(req.query.lng);
        const latitude = parseFloat(req.query.lat);
        School.find({
          geometry: {
            $near : {
              $maxDistance: 100000,
              $geometry : {
                type : 'Point',
                coordinates:[longitude,latitude]
              }
            }
          }
        }).find((error,results)=>{
          if (error) console.log(error);
          res.send(results)
        });
})

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
