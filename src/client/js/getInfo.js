function actionS() {
 event.preventDefault();
 const place = document.getElementById('cityinput');
 const date = document.getElementById('date');
 if (place.value != '' && date.value != '') 
 {alert ('Im working!')} //type the async function
 else {console.log ("Try again!")}
 }
