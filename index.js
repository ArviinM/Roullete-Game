const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const {port} = require('./config.json');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req,res) =>{
    res.render('game');
});

app.listen(port, function(){
    console.log(`Server started 🚀 on port ${port}`);
});