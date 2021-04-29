const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const cors = require('cors');
const fetch = require('node-fetch');
const { response } = require('express');


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

const baseGeoUrl = 'http://api.geonames.org/searchJSON?';
const username = 'wadewilso'; // hide later
const geoP = "&maxRows=1";

const baseWeatherUrl = 'https://api.weatherbit.io/v2.0/current?';
const apiK = '5a6a216b84a546b88c3ee16e59c33dd0';// hide later




//Set up get/post routes



//app.get ("/", function getData(req,res) {
 //   res.send ('dist/index.html');
//})
let tripData = {};

app.post ("/Client", postClientData) 
async function postClientData(req,res) {
    let clientData = req.body;
    let newClientData = {
        destination: clientData.city,
        start: clientData.departure,
        end: clientData.returnDate
    }
    tripData = newClientData;
    res.send(tripData);
}

app.get ('/Coordinates', getData);
async function getData (req,res) {

    console.log('GET geonamesData');
    
    const geoURL = `${baseGeoUrl}&q=${tripData.destination}&username=${username}${geoP}`; 
    console.log("This is GEO url: " + geoURL);
    fetch(geoURL)
    .then (res => res.json())
    .then (response => {
        try{
            console.log('Information from GeoNames')
            console.log(response);
            tripData['long'] = response.geonames[0].lng;
            tripData['lat'] = response.geonames[0].lat;
            tripData['name'] =response.geonames[0].name; 
            tripData['adminName'] = response.geonames[0].adminName1;
            tripData['countryName'] = response.geonames[0].countryName;
            tripData['code'] = response.geonames[0].countryCode;
            res.send(response);
        }
        catch (e) {
            console.log("Error: ", e);
          }
        })
}


 app.get ("/Weather", getWeather);

 function getWeather (req,res) {
     const lng = tripData.long;
     const lat = tripData.lat;
    console.log ('Getting Weather')
    const weatherURL = `${baseWeatherUrl}&lat=${lat}&lon=${lng}&key=${apiK}`;
    console.log(`This is URL for weather API: ${weatherURL}`);
    fetch (weatherURL)
    .then (res => res.json())
    .then (response => {
       
            const data = response.data;
            tripData.temp = data.temp;
            tripData.city = data.city_name;
            tripData.clouds = data.clouds;
            res.send(response);
            console.log(response);
        console.log ( tripData.city)
    })}





