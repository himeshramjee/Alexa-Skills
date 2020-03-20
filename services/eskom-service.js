const EskomLoadSheddingAPI = require('eskom-loadshedding-api');
const StatusAPI = EskomLoadSheddingAPI.Status;
const SearchAPI = EskomLoadSheddingAPI.Search;
const RedisCache = require('./caches/eskom-redis-cache');

exports.getStatus = function () {
    let loadSheddingStatus = -1;
    console.log("3-Service: Calling service for status...");
    /*
    await StatusAPI.getStatus()
        .then((status) => {
            console.log('Current status: ', status);
            return status;
        });
    */

    /*
    return new Promise((resolve, reject) => {
        try {
            loadSheddingStatus = StatusAPI.getStatus();
            resolve(loadSheddingStatus);
        } catch (err) {
            console.log(err);
            reject("Call to Status API failed. Error: " + err);
        }
    });
    */

    StatusAPI.getStatus()
        .then(result => {
            loadSheddingStatus = result;
            // FIXME: Cache keys should be abstracted and mastered in central model (even just an enum)
            console.log("\t 3-Service: Updating cache key ('eskom.status = " + result + "')")
            RedisCache.updateCacheItem("eskom.status", result);
            return result;
        });
    
    console.log("\t 3-Service: Returning immediate value: " + loadSheddingStatus);
    return loadSheddingStatus;
};

exports.getProvinces = function () {
    let provinces = [];
    let keys = Object.keys(EskomLoadSheddingAPI.Province);
    // TODO: Enum values should not be displayed in leet mode. :)
    keys.filter(key => !isNaN(Number(key))).map(key => provinces.push({ id : key, name : EskomLoadSheddingAPI.Province[key] }));

    return provinces;
}
  
exports.getMunicipalitiesForProvince = function (provinceID) {
    SearchAPI.getMunicipalities(provinceID)
        .then(municipalities => {
            return municipalities;
        });
}