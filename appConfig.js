var filename = './config/config-api.json';
var fs = require('fs');



var getKeys = function () {

    if (fs.existsSync(filename)) {

        var configAPI = require(filename);
        var keys = {};

        keys.apiKey = configAPI.apiKey;
        keys.authDomain = configAPI.authDomain;
        keys.databaseURL = configAPI.databaseURL;
        keys.projectId = configAPI.projectId;
        keys.storageBucket = configAPI.storageBucket;
        keys.messagingSenderId = configAPI.messagingSenderId;

        return keys;

    } else {

        var keys = {};
        keys.consumer_key = process.env.CONSUMER_KEY;
        keys.consumer_secret = process.env.CONSUMER_SECRET;
        keys.access_token_key = process.env.ACCESS_TOKEN_KEY;
        keys.access_token_secret = process.env.ACCESS_TOKEN_SECRET;

        return keys;

    }


}

module.exports.getKeys = getKeys;
