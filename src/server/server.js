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

const baseWeatherUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
const apiK = '5a6a216b84a546b88c3ee16e59c33dd0';// hide later




//Set up get/post routes

let projectData = {};

app.get ("/Data", function getData(req,res) {
    res.send (projectData);
}
)

app.post ('/Data', addData);
 async function addData (req,res) {
    const data = req.body;
    let projectData = data;
    console.log (projectData);
    const geoApi = await fetch (`${baseGeoUrl}&q=${data.city}&username=${username}${geoP}`, {method:'POST'})
    try {
        const geoData = await geoApi.json();
        projectData['long'] = geoData.geonames.lng;
        projectData['lat'] = geoData.geonames.lat;
        console.log('apiData ++++>', projectData)
        res.send(projectData)
    }
    catch (error) {console.log('Error', error)}
 }


 app.get ("/WeatherInfo", getWeather);

 async function getWeather (req,res) {
    const long = projectData.long;
    const lat = projectData.lat;
    console.log(`Request latitude is ${projectData.lat}`);
    console.log(`Request longitude is ${projectData.long}`);
    const weatherCall = `${baseWeatherUrl}&lat=${lat}&lon=${long}&key=${apiK}`;
    console.log(`Weatherbit URL is ${weatherCall}`);//hide later
    try {
        const responde = await fetch (weatherCall);
        if (!response.ok) {
            console.log(`Error. Response status ${response.status}`);
            res.send(null);
        }
        const weatherData = await responde.json();
        projectData['icon'] = weatherData.data[0].weather.icon;
        projectData['description'] = weatherData.data[0].weather.description;
        projectData['temp'] = weatherData.data[0].temp;
        res.send(weatherData);
        console.log(weatherData);
    }
    catch (error) {
        console.log(`Error connecting to server: ${error}`);
        res.send(null);
 }}
