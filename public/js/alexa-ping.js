const submitPingHandler = (e) => {
  e.preventDefault();

  const pingText = document.getElementById('pingText');
  const pingTextValue = pingText.value;
  const options = {
    method: 'POST',
    body: JSON.stringify({ pingTextValue }),
    headers: new Headers({ 'Content-Type': 'application/json' })
  }

  const divPingErrors = document.getElementById('divPingErrors');

  fetch('/alexa/ping', options)
      .then(response => { return response.json(); } )
      .then(result => { 
          pingText.value = result.reversedPingText;
      })
      .catch(err => {
          divPingErrors.innerHTML = "Error: " + err;
      })
}

const submitPromiseHandler = (e) => {
  e.preventDefault();

  const pingText = document.getElementById('pingText');
  const pingTextValue = pingText.value;
  const options = {
    method: 'POST',
    body: JSON.stringify({ pingTextValue }),
    headers: new Headers({ 'Content-Type': 'application/json' })
  }

  const divPingErrors = document.getElementById('divPingErrors');

  fetch('/alexa/pinkypromise', options)
    .then(response => { return response.json(); } )
    .then(result => { 
      pingText.value = result.response;
    })
    .catch(err => {
      divPingErrors.innerHTML = "Error: " + err;
    });

  console.log("SubmitPromiseHandler is done. pingText is: " + pingTextValue);
}
  
document.getElementById('submitPing').addEventListener('click', submitPingHandler);
document.getElementById('submitPromise').addEventListener('click', submitPromiseHandler);