const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const cors = require('cors');


app.use (bodyParser.urlencoded ({extended:false}));
app.use (bodyParser.json());
app.use (cors());
app.use (express.static('../../src/client'));


//Set up a server

const port = 3100;
const server = app.listen (port, listening);
function listening () {
    console.log ('Server is running on localhost:' + port)
}


//Set up API links

const baseGeoUrl = 'api.geonames.org/searchJSON?';
const username = 'wadewilso'; // hide later
const geoPar = "&maxRows=1";

//Set up get/post routes

let projectData = {};

app.get ("/coordinates", function getData(req,res) {
    res.send ('')}
)

app.post ('/info', addData);
 async function addData (req,res) {
    const data = req.body;
    let projectData = data;
    const geoApi = await fetch (baseGeoUrl+place.value+username+geoPar, {method:'POST'})
    try {
        const geoData = await geoApi.json();
        projectData['long'] = geoData.geonames[0].lng;
    }
    catch (error) {console.log('Error', error)}
 }
