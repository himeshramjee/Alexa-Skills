const EskomLoadSheddingAPI = require('eskom-loadshedding-api');
const StatusAPI = EskomLoadSheddingAPI.Status;
const SearchAPI = EskomLoadSheddingAPI.Search;
const RedisCache = require('./caches/eskom-redis-cache');

exports.getStatus = function () {
    let loadSheddingStatus = -1;

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
            console.log("Setting eskom.status in cache with value '" + result + "'")
            RedisCache.updateCacheItem("eskom.status", result);
            return result;
        });
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