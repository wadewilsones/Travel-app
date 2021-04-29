
 
 async function actionS() {
    event.preventDefault();
    const city = document.getElementById('cityinput').value;
    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('return').value;

    if (city != '' && departureDate != ''  && returnDate != '') 
    {await postData("http://localhost:3100/Client", {
      city: city,
      departure: departureDate,
      returnDate: returnDate,
    });
   
    await callServer(`/Coordinates`);
    await callServer(`/Weather`);
    await callServer(`/Pictures`);
    const trip = await callServer(`/Trip`);
    console.log(trip);
    updateUI();
    } 
    else {console.log ("Invalid iput, try again!")}
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

async function updateUI() {
  const response = await fetch ("/Trip");
  const uData = await response.json();
  const pic = document.getElementById('pic');
  const weather = document.getElementById('weather');
  const cityoutput = document.getElementById('cityoutput'); 
  const outputdates = document.getElementById('outputdates'); 
  pic.innerHTML =  uData.webformatURL;
  weather.innerHTML = `Current temperature is: ${uData.temp}°, ${uData.description.toLowerCase()}`;
  cityoutput.innerHTML = `${uData.destination}, ${uData.countryName}`;
  outputdates.innerHTML = `Trip dates: ${uData.start} to ${uData.end}`;

}

