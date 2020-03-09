const EskomLoadSheddingAPI = require('eskom-loadshedding-api');
const StageAPI = EskomLoadSheddingAPI.LoadsheddingStage;
const EskomService = require('../services/eskom-service')

let express = require('express');
let router = express.Router();

// ***********************************************************************************************
// FIXME: Decouple into models, controller and service classes
router.get('/', function(req, res) {
  try {
    res.render('alexa-skills', { provinces: getProvinces() });
  } catch (err) {
    // TODO: Anchoring until I think through this
  } finally {
    // TODO: Anchoring until I think through this
  }
});

router.get('/get-eskom-status', function(req, res) {
  let result = {};

  let loadSheddingStatus;

  let response = EskomService.getStatus();
  console.log("Result: " + response);
  loadSheddingStatus = response;

  console.log("loadSheddingStatus: " + loadSheddingStatus);
  result.status = loadSheddingStatus;
  if (loadSheddingStatus != StageAPI.UNKNOWN && loadSheddingStatus != StageAPI.NOT_LOADSHEDDING) {
    result.message = "Up to stage " + result.status;
  } else {
    if (loadSheddingStatus === StageAPI.NOT_LOADSHEDDING) {
      result.message = "Eskom is currently not load shedding.";
    } else {
      result.message = "Woops! Seems there isn't any load shedding information available. [Response: " + loadSheddingStatus + "]";
    }
  }

  console.log("Status: " + result.status + " -> " + result.message);
  res.status(200).json(result);
});

router.get('/list-municipalities/:provinceCode?', function(req, res) {
  let queryStringObject = req.query;
  console.log("Query string echo: " + queryStringObject);
  let provinceCode = EskomLoadSheddingAPI.Province.WESTERN_CAPE; // default is home/WC. Look into detecting this with some user location API
  if (req.params.provinceCode) {
    console.log("URL Path param province: " + req.params.provinceCode);
    provinceCode = req.params.provinceCode;
  }

  res.send("FIXME: Do service call");
  // res.status(200).json(EskomService.getMunicipalitiesForProvince(provinceCode));
});

router.get('/list-wc-municipalities', function(req, res) {
  res.status(200).json(EskomService.getMunicipalitiesForProvince(EskomLoadSheddingAPI.Province.WESTERN_CAPE));
});

router.get('/list-provinces', function(req, res) {
  res.status(200).json(EskomService.getProvinces());
});

module.exports = router;