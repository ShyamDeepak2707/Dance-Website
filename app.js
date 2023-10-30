const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const port = 80;


// Mongoose Configuration
main().catch(err => console.error(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}


// Mongo Schema

const contactSchema = new mongoose.Schema({
    name: String,
    gender: String,
    email: String,
    phone: Number
});

const Contact = mongoose.model('Contact', contactSchema);

// Express Specific Configurarion
app.use('/static', express.static('static'));
app.use(express.urlencoded());

// htlm Specific Configuration
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'templates'));
app.engine('html', require('ejs').renderFile);

// END POINTS
app.get('/', (req, res) => {
    res.status(200).render('index.html');
});

app.get('/contact', (req, res) => {
    res.status(200).render('contact.html');
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item was successfully saved");
    }).then(() => {
        res.status(200).render('contact.html');
    })
        .catch(() => {
            res.status(400).send('An error occured while saving')
        });

    // res.status(200).render('contact.pug');
});

// Starting Server
app.listen(port, () => {
    console.log(`Your app is running on: http://localhost`);
});