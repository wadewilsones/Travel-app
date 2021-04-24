const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const cors = require('cors');


app.use (bodyParser.urlencoded ({extended:false}));
app.use (bodyParser.json());
app.use (cors());
app.use (express.static('../../src/client'));


//Set up a server

const port = 3000;
const server = app.listen (port, listening);
function listening () {
    console.log ('Server is running on localhost:' + port)
}

app.get (
    ('/', function (req,res){
        res.send ("hello world")
    }) 
)
