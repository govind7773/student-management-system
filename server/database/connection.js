const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });


const DB = process.env.MONGO_URL;
// var DB = "mongodb://localhost:27017/user_management";
mongoose.connect(DB, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
    console.log("connection succesfully");
}).catch((e) => {
    console.log("no connection");

});
