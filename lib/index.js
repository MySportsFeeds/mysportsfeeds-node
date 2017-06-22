var API_v1_0 = require('./api_v1_0.js');

// Private Vars
var apiVersion = "1.0";
var storeType = "file";
var storeLocation = "results/";
var apiInstance = null;

// Private Functions
function __verifyVersion(version) {
    if ( version != '1.0' ) {
        throw new Error("Unrecognized version specified.  Supported versions are: '1.0'");
    }
}

function __verifyStore(storeType, storeLocation) {
    if ( storeType && storeType != 'file' ) {
        throw new Error("Unrecognized storage type specified.  Supported values are: None,'file'");
    }

    if ( storeType && storeType == 'file' ) {
        if ( !storeLocation ) {
            throw newError("Must specify a location for stored data.");
        }
    }
}

// Public Functions
var MySportsFeeds = function(apiVers = "1.0", verb = true, storeT = "file", storeL = "results/") {
    __verifyVersion(apiVers);
    __verifyStore(storeT, storeL);

    apiVersion = apiVers;
    verbose = verb;
    storeType = storeT;
    storeLocation = storeL;

    // Instantiate an instance of the appropriate API depending on version
    if ( apiVersion == '1.0' ) {
        apiInstance = new API_v1_0(verbose, storeType,
        	storeLocation);
    }
};

MySportsFeeds.prototype.authenticate = function(username, password) {
    if ( !apiInstance.supportsBasicAuth() ) {
        throw new Error("BASIC authentication not supported for version " + apiVersion);
    }

    apiInstance.setAuthCredentials(username, password);
};

MySportsFeeds.prototype.getData = function(league, season, feed, format, params) {
	return apiInstance.getData(league, season, feed, format, params);
};

exports = module.exports = MySportsFeeds;
