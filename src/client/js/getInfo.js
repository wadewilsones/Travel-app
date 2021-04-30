
 // Create an async onclick function

 async function actionS() {
    event.preventDefault();
    const city = document.getElementById('cityinput').value;
    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('return').value;

 

 // Checking input values

    if (city != '' && departureDate != ''  && returnDate != '') 
    
    {await postData("http://localhost:3100/Client", {
      city: city,
      departure: departureDate,
      returnDate: returnDate,
    });
    

   // Getting data from server

    await callServer(`/Coordinates`);
    await callServer(`/Weather`);
    await callServer(`/Pictures`);
    const trip = await callServer(`/Trip`);
    console.log(trip);
    updateUI(); }
    else {console.log ("Invalid iput, try again!")}
    //Set up dates duration

    let startDate = new Date(departureDate);
    let endDate = new Date(returnDate);
    let tripDuration = ("Days in a trip: " + parseInt((endDate.getTime()-startDate.getTime())/(24*3600*1000)));
    console.log(tripDuration)
    return tripDuration;
  } 

 async function postData(url, data = {}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
 }

 const callServer = async(url) => {
  const asyncParams = {
    method: 'GET',
    mode: 'cors',
    headers: {'Content-Type': 'application/json;charset=utf-8'}
  };

    const res = await fetch(url, asyncParams);
      try{
        const data = await res.json();
        return data;
      } 
      catch {
        console.log(`Error: ${res.statusText}`)
      }
}

//Add a function for displaying Trip data

async function updateUI() {
  const response = await fetch ("/Trip");
  const uData = await response.json();
  const weather = document.getElementById('weather');
  const pic = document.getElementById('pic');
  const cityoutput = document.getElementById('cityoutput'); 
  const outputdates = document.getElementById('outputdates'); 
  pic.src = uData.image;
  weather.innerHTML = `Current temperature is: ${uData.temp}°, ${uData.description.toLowerCase()}`;
  cityoutput.innerHTML = `${uData.destination}, ${uData.countryName}`;
  outputdates.innerHTML = `Trip dates: ${uData.start} to ${uData.end}, ${tripDuration}`;

}

//Get duration of the trip

//function tripDuration(){

 

