const EskomLoadSheddingAPI = require('eskom-loadshedding-api');
const StatusAPI = EskomLoadSheddingAPI.Status;
const StageAPI = EskomLoadSheddingAPI.LoadsheddingStage;
const SearchAPI = EskomLoadSheddingAPI.Search;

var express = require('express');
var router = express.Router();

// TODO: If these route handlers become complex then these could (should even) be abstrated behind controller and service classes.
router.get('/', function(req, res) {
  res.render('alexa-skills');
});

router.get('/get-eskom-status', function(req, res) {
  var result = {};

  StatusAPI.getStatus()
    .then(loadSheddingStatus => {
      result.status = loadSheddingStatus;
      if (loadSheddingStatus != StageAPI.UNKNOWN && loadSheddingStatus != StageAPI.NOT_LOADSHEDDING) {
        result.message = "Up to stage " + result;
      } else {
        if (loadSheddingStatus === StageAPI.NOT_LOADSHEDDING) {
          result.message = "Eskom is currently not load shedding.";
        } else {
          result.message = "Woops! Seems there isn't any load shedding information available. [Response: " + loadSheddingStatus + "]";
        }
      }

      res.status(200).json(result);
    });
});

router.get('/list-wc-municipalities', function(req, res) {
  SearchAPI.getMunicipalities(EskomLoadSheddingAPI.Province.WESTERN_CAPE)
    .then(municipalities => {
      res.status(200).json(municipalities);
    });
});

router.post('/eskom/load-shedding-status?town=xxx', function(req, res, next) {
  console.log(req.body);
  console.log("TODO: Make API call");
  
  res.status(200); // .json({ responseJson });
});

module.exports = router;