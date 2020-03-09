let express = require('express');
let router = express.Router();
let pingService = require('../services/alexa-ping-service');

// ***********************************************************************************************
// FIXME: Decouple into models, controller and service classes
router.get('/ping', function(req, res) {
  try {
    // res.send("I am.")
    res.render("alexa-ping");
  } catch (err) {
    // TODO: Anchoring until I think through this
  } finally {
    // TODO: Anchoring until I think through this
  }
});

router.post('/ping', function(req, res, next) {
  const pingText = req.body.pingTextValue;
  const reversedPingText = pingText.split("").reverse().join("");
  
  res.status(200).json({ pingText, reversedPingText });
});

router.post('/pinkypromise', function(req, res, next) {
  const pingText = req.body.pingTextValue;
  let response = "Getting promise...";

  // pingService.doPromise(pingText).then(r => { console.log("Please respond: " + r); response = r; });
  response = pingService.doPromise(pingText);
  /*
  (async function() {
    let p = pingService.doPromise(pingText)
    .then (
      result => {
        // Success
        console.log("I swear with: " + result);
        return result;
      },
      error => {
        // Failure
        console.log("Beep bob, I broke with: " + error);
      }
    ).finally(() => {
      // console.log("Executing ping router finally. \n\tResponse is: " + response);
    });

    let r = await p;
    response = r;
    console.log("response is: " + response);
  })();
  */

  res.status(200).json({ pingText, response });
});

module.exports = router;