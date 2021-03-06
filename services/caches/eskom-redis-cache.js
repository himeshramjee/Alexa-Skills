// TODO: Evaluate other packages, there are many. This should also not run within the same container as the application so split it out.

const EskomService = require('../eskom-service');
var redis = require("redis");
// var sys = require("sys");

const client = redis.createClient('redis://redis:6379', {
    retry_strategy: function(options) {
      if (options.error && options.error.code === "ECONNREFUSED") {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new Error("The server refused the connection");
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error("Retry time exhausted");
      }
      if (options.attempt > 10) {
        // End reconnecting with built in error
        return undefined;
      }
      // reconnect after
      return Math.min(options.attempt * 100, 3000);
    },
  });

client.on("error", function(error) {
    console.error(error);
  });

  /*
// Close the connection
setTimeout( function () {
    client.close();
}, 1000);
*/

exports.getEskomStatus = function () {
    // FIXME: Cache keys should be abstracted and mastered in central model. The magical string is also referenced in the eskom-service.js file.
    console.log("2-Cache: Getting cached status...");
    const cachedStatus = getCacheItem("eskom.status");
    console.log("\t 2-Cache: Cached status is: " + cachedStatus);

    if (!cachedStatus) {
      // No cached status, refresh the cache
      console.log("\t 2-Cache: No cached status. Refreshing cache...");
      let temp = EskomService.getStatus();
      console.log("\t 2-Cache: Returning immediate value: " + temp);
      return temp;
    } else {
      console.log("\t 2-Cache: Returning cached status: " + cachedStatus);
      return cachedStatus;
    }
}

exports.updateCacheItem = function(key, value) {
  console.log("4-Cache: Updating cached status with new value...");
  client.set(key, value, function (err, status) {
      if (err) throw err;

      console.log("\t 4-Cache: Cache updated. Key=" + key + ", Value= " + value + ".");
    });
  console.log("\t 4-Cache: Returning no value.");
}

getCacheItem = function (key) {
    client.exists(key, function (err, status) {
        if (err) throw err;

        if (!status) {
            // TODO: Ideally we'd return a 202 Accept with a timeout value for how long to wait before attempting a read again
            return -1;
        }
      });

    client.get(key, function (err, value) {
        if (err) throw err;

        console.log("\t (Cache Internal call) Cache item retrieved. Key=" + key + ", Value= " + value + ".");
        return value;
      });
}
