const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use (bodyParser.urlencoded ({extended:false}));
app.use (bodyParser.json());
app.use (cors());
app.use('/', express.static('../../dist'));

//Set up a server

const port = 3100;
const server = app.listen (port, listening);
function listening () {
    console.log ('Server is running on localhost:' + port)
}

// Server Test 
app.get('/test', function(req, res) {
    res.json({
      status : 200
    })
  })

//Set up API links

const baseGeoUrl = 'http://api.geonames.org/searchJSON?';
const username = process.env.GeoKey;
const geoP = "&maxRows=1";


const apiK =  process.env.weatherKey;

const basePixabayURL = "https://pixabay.com/api/";
const apiPix =  process.env.PixApiy;

app.get('/', function (req, res) {
    res.send('dist/index.html');
});

// Creation of a project's information holder
let tripData = {};

app.post ("/Client", postClientData) 
async function postClientData(req,res) {
    let clientData = req.body;
    let newClientData = {
        destination: clientData.city,
        start: clientData.departure,
        end: clientData.returnDate,
        tripDuration: clientData.tripDuration
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
const baseWeatherUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
async function getWeather (req,res) {
     const lng = tripData.long;
     const lat = tripData.lat;
    console.log ('Getting Weather')
    const weatherURL = `${baseWeatherUrl}&lat=${lat}&lon=${lng}&key=${apiK}`;
    console.log(`This is URL for weather API: ${weatherURL}`);
    try {
        const response = await fetch(weatherURL);
        
        if (!response.ok) {
            console.log(`Error connecting to Weatherbit API. Response status ${response.status}`);
            res.send(null);
        }
        const weatherbitData = await response.json();
        tripData['datetime'] = weatherbitData.data[0].datetime;
        tripData['icon'] = weatherbitData.data[0].weather.icon;
        tripData['description'] = weatherbitData.data[0].weather.description;
        tripData['tempcurrent'] = weatherbitData.data[0].temp;
        tripData['tempPredicted'] = weatherbitData.data[15].temp;
        res.send(weatherbitData);
        console.log(weatherbitData);
        // If failed connection to API, return null
    } catch (error) {
        console.log(`Error connecting to server: ${error}`);
        res.send(null);
    }    
        
    }

app.get ("/Pictures", getPictures);
async function getPictures(req,res){
    console.log('GET pictures');
    const picURL = `${basePixabayURL}?key=${apiPix}&q=${tripData.destination}&image_type=photo&orientation=horizontal`;
    console.log(`This is URL for pic API: ${picURL}`);
    fetch(picURL)
    .then (res => res.json())
    .then (response => {
        const data = response.hits;
        tripData.image = data[1].webformatURL;
        console.log (tripData.image);
        res.send (tripData);

    })

}

app.get ("/Trip", getFullData)
 
function getFullData(req,res) {
    console.log (tripData);
    res.send (tripData);
}

module.exports = app;