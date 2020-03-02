var express = require('express');
var router = express.Router();

// TODO: If these becomes complex then these routes could (should even) be abstrated behind controller and service classes.
router.get('/', function(req, res) {
  res.render('alexa-lss');
});

router.post('/lss', function(req, res, next) {
  console.log(req.body);
  console.log("TODO: Make API call");
  
  res.status(200); // .json({ responseJson });
});

module.exports = router;