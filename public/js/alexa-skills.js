const refreshEskomStatusHandler = (e) => {
    if (e) {
        e.preventDefault();
    }
    
    getEskomStatus();
  };
  
function getEskomStatus() {
    const options = {
        method: 'GET',
        // body: JSON.stringify({ 'municipality' : 10243 }),
        headers: new Headers({ "Accept": "application/json", 'Content-Type': 'application/json' })
      }
    
    const eskomStatusIcon = document.getElementById('eskomStatusIcon');
    
    fetch('/alexa/get-eskom-status', options)
    .then(response => { return response.json(); } )
    .then(result => { 
        console.log(result);
        
        if (result.status == -1) {
            setTimeout(getEskomStatus(), 3000);
        }

        if (result.status > 1) {
            eskomStatusIcon.innerHTML = '<img src="https://img.icons8.com/emoji/96/000000/angry-face.png">';
        } else if (result.status == 0) {
            eskomStatusIcon.innerHTML = '<img src="https://img.icons8.com/color/96/000000/happy.png">';
        } else {
            eskomStatusIcon.innerHTML = '<img src="https://img.icons8.com/officel/80/000000/neutral-emoticon.png">';
        }

        return result;
    })
    .catch(err => {
        eskomStatusIcon.innerHTML = '<img src="https://img.icons8.com/break">';
    })
}

var el = document.getElementById('eskomStatus');
el.onclick = refreshEskomStatusHandler;
$(document).ready(function(){
    getEskomStatus();
});
  