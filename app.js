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

// Pug Specific Configuration
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'templates'));

// END POINTS
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
});

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item was successfully saved");
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