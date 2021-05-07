
document.addEventListener("DOMContentLoaded", function ready(){
document.getElementById('sub-btn').addEventListener ("click",  actionS);
 async function actionS(e) {
    e.preventDefault();
    const city = document.getElementById('cityinput').value;
    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('return').value;

 // Checking input values

    if (city != '' && departureDate != ''  && returnDate != '') 
    
     // Set up the trip duration
    { let startDate = new Date(departureDate);
      let endDate = new Date(returnDate);
      let tripDuration = (parseInt((endDate.getTime()-startDate.getTime())/(24*3600*1000)));
      console.log(tripDuration)
      
      await postData("http://localhost:3100/Client", {
      city: city,
      departure: departureDate,
      returnDate: returnDate,
      tripDuration: tripDuration
    });
      await callServer(`/Coordinates`);
      await callServer(`/Weather`);
      await callServer(`/Pictures`);
      const trip = await callServer(`/Trip`);
      console.log(trip);
      
      //Predicted or current weather data
      console.log ("Departure date is " + startDate);
      let today = new Date();
      console.log ("Today is " + today);
      let weekdates = parseInt((startDate.getTime() - today.getTime())/(24*3600*1000));
      console.log ("Days before leaving:" + weekdates)
      if (weekdates < 7)
      {updateUIcurrent()}
      else{updateUiPredicted()}

     }
    else { alert ("Invalid iput, try again!")
      console.log ("Invalid iput, try again!")}
    }
  })

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

async function updateUIcurrent() {
  const response = await fetch ("/Trip");
  const uData = await response.json();
  const weather = document.getElementById('weather');
  const pic = document.getElementById('pic');
  const cityoutput = document.getElementById('cityoutput'); 
  const outputdates = document.getElementById('outputdates'); 
  pic.src = uData.image;
  weather.innerHTML = `<span style= "font-size:18px">Current temperature:</span> <br/> <span style= "font-size:96px; line-height:1;"> ${uData.tempcurrent}°</span><br/><span style= "font-size:24px; line-height:0.2;margin-bottom:20px;"> ${uData.description.toLowerCase()}</span>`;
  cityoutput.innerHTML = `<span style= "font-size:18px">Destination:</span><br/>${uData.destination}, ${uData.countryName}`;
  outputdates.innerHTML =`<span style= "font-size:18px">Trip Duration:</span><br/> <span style= "font-size:72px;line-height:1"> ${uData.tripDuration} days</span><br/><span style= "font-size:24px"> ${uData.start} - ${uData.end}</span>`;

}

async function updateUiPredicted() {
  const response = await fetch ("/Trip");
  const uData = await response.json();
  const weather = document.getElementById('weather');
  const pic = document.getElementById('pic');
  const cityoutput = document.getElementById('cityoutput'); 
  const outputdates = document.getElementById('outputdates'); 
  pic.src = uData.image;
  weather.innerHTML = `<span style= "font-size:18px">Predicted temperature: </span> <br/> <span style= "font-size:96px;line-height:1">${uData.tempPredicted}°</span><br/><span style= "font-size:24px; line-height:0.2; margin-bottom:20px;"> ${uData.description.toLowerCase()}</span>`;
  cityoutput.innerHTML = `<span style= "font-size:18px">Destination:</span><br/>${uData.destination}, ${uData.countryName}`;
  outputdates.innerHTML = `<span style= "font-size:18px">Trip Duration:</span><br/><span style= "font-size:72px;line-height:1"> ${uData.tripDuration}  days</span><br/><span style= "font-size:24px">${uData.start} - ${uData.end}</span>`;

}

 


//Export functions

export { 
 
  callServer,
  updateUIcurrent,
  updateUiPredicted

}
