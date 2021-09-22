const path = require('path');
const methodOverride = require('method-override');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Mongo Connection Open")
    })
    .catch(err => {
        console.log("Mongo Connection Error")
        console.log(err)
    })
    
let port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on ${port}`))

app.use(express.static(__dirname +"/static"));

app.get('/', (req, res) => {
    res.sendFile(__dirname +"/static/index.html");
})
    
app.get('/confirmationPage', (req, res) => {
    res.sendFile(__dirname +"/static/confirmation.html");
})

app.get('/errorPage', (req, res) => {
    res.sendFile(__dirname +"/static/error.html");
})

app.get('/users', async (req, res) => {
    const Persons = await User.find({}, { firstName: 1, lastName: 1, Address1: 1, Address2: 1, City: 1, State: 1, Zip: 1, Country: 1, Date: 1, _id: 0 }).sort({Date:-1})
        .then(data => {
            console.log("Registered Users Below:");
            console.log(data);
            res.json(data);
        })
        .catch(err => {
            console.log("Error Reported")
            console.log(err)
            res.status(500).send('Internal Error');
          })
})

app.post('/', async (req, res) => {
    const newPerson = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        Address1: req.body.Address1,
        Address2: req.body.Address2,
        City: req.body.City,
        State: req.body.State,
        Zip: req.body.Zip,
        Country: req.body.Country,
        });
    await newPerson.save()
        .then(data => {
            console.log("New User Saved. Registered User Details:")
            console.log(data);
            res.redirect(`/confirmationPage`)
        })
        .catch(err => {
            console.log("Error Reported")
            console.log(err)
            if (err instanceof mongoose.Error.ValidationError) { 
                res.status(400).send('Parameter Validation Error');
                }
            else {
                res.status(500).send('Internal Error');
            }
        })
})