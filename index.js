const express = require('express');
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const path = require("path");
const Parrot = require('./models/parrot');

const app = express(),
            bodyParser = require("body-parser");
dotenv.config();
const MONGOURL = process.env.MONGO_URL;

var store = new MongoDBStore({
    uri: MONGOURL,
    collection: 'sessions'
  });

app.use(bodyParser.json());
app.use(express.static(
    path.join(__dirname,"./dist")));
    
/*app.use(session({
    secret: 'some secret',
    cookie: {maxAge: 1000*60*60*24},
    store:store,
    resave:false,
    saveUninitialized: false  
}));*/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.listen(8080, () => {
    console.log('server listening on port 8080')
    
})

mongoose.connect(MONGOURL).then(()=> {
    console.log("DB connected");
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
  });

  app.get('/shop', (req,res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
  });

  app.get('/product/:id', (req,res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
  });

  app.get('/checkout', (req,res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
  });

app.get("/getCatalog", async (req,res,next) => {
    let response = await Parrot.find().exec();
    res.json(response);
},)

app.post("/add2Cart", async (req,res,next) => {
    let entry = new Parrot({
        id: req.body.id,
        name:req.body.name,
        quantity:req.body.value,
        price:req.body.price,
        max: req.body.quantity
    })
    try {
        await entry.save()
        
        res.json("Saved");
        
    } catch(error) {
        console.log(error)
        res.json(error)
    }
    
},)