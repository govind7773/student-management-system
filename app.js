const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const bodyparser = require("body-parser");
require('./server/database/connection');
const controller = require('./server/controller/controlle');
const axios = require('axios');


dotenv.config({ path: 'config.env' });
const port = process.env.PORT || 3000;

const app = express();
app.use(morgan('tiny'));

app.use(bodyparser.urlencoded({ extended: true }));
// console.log(path.join(__dirname, '/public'));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, 'views'));
app.use("/public", express.static(path.join(__dirname, '/public')));



// creating APIs



app.use(express.json());


app.get('/', (req, res) => {
    axios.get('http://localhost:8000/api/users')
        .then(function (response) {
            // console.log(response.data);
            res.render('index', { users: response.data });
        }).catch(err => {
            res.send(err);
        })



});


app.post('/api/users', controller.create);
app.get('/api/users', controller.find);
app.put('/api/users/:id', controller.update);
app.delete('/api/users/:id', controller.delete);




app.get('/new_user', (req, res) => {
    res.render('new_user');

})

app.get('/update', (req, res) => {
    axios.get('http://localhost:8000/api/users', { params: { id: req.query.id } })
        .then(function (userdata) {
            res.render('update', { user: userdata.data });
        }).catch(err => {
            res.send(err);
        })


});







app.listen(port, () => {
    console.log(`server is running in port "${port}"`);
});