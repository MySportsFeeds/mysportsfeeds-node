const API_v1_0 = require('./API_v1_0.js');
const API_v1_1 = require('./API_v1_1.js');
const API_v1_2 = require('./API_v1_2.js');
const API_v2_0 = require('./API_v2_0.js');
const API_v2_1 = require('./API_v2_1.js');

const versions = ['1.0', '1.1', '1.2', '2.0', '2.1'];

// Private Functions
function __verifyVersion(version) {
    if (!versions.includes(version)) {
        throw new Error(`Unrecognized version specified.  Supported versions are: '${versions.join("', '")}'`);
    }
}

function __verifyStore(storeType, storeLocation) {
    if (storeType && storeType != 'file') {
        throw new Error("Unrecognized storage type specified.  Supported values are: None,'file'");
    }

    if (storeType && storeType == 'file') {
        if (!storeLocation) {
            throw newError("Must specify a location for stored data.");
        }
    }
}

// Public Functions
var MySportsFeeds = function (apiVers = "1.2", verb = true, storeT = "file", storeL = "results/") {
    __verifyVersion.call(this, apiVers);
    __verifyStore.call(this, storeT, storeL);

    this.apiVersion = apiVers;
    this.verbose = verb;
    this.storeType = storeT;
    this.storeLocation = storeL;

    // Instantiate an instance of the appropriate API depending on version
    if (this.apiVersion == '1.0') {
        this.apiInstance = new API_v1_0(this.verbose, this.storeType,
            this.storeLocation);
    }

    if (this.apiVersion == '1.1') {
        this.apiInstance = new API_v1_1(this.verbose, this.storeType,
            this.storeLocation);
    }

    if (this.apiVersion == '1.2') {
        this.apiInstance = new API_v1_2(this.verbose, this.storeType,
            this.storeLocation);
    }

    if (this.apiVersion == '2.0') {
        this.apiInstance = new API_v2_0(this.verbose, this.storeType,
            this.storeLocation);
    }

    if (this.apiVersion == '2.1') {
        this.apiInstance = new API_v2_1(
            this.verbose,
            this.storeType,
            this.storeLocation
        );
    }
};

MySportsFeeds.prototype.authenticate = function (apikey, password) {
    if (!this.apiInstance.supportsBasicAuth()) {
        throw new Error(`BASIC authentication not supported for version ${this.apiVersion}`);
    }

    this.apiInstance.setAuthCredentials(apikey, password);
};

MySportsFeeds.prototype.getData = function (league, season, feed, format, params) {
    return this.apiInstance.getData(league, season, feed, format, params);
};

exports = module.exports = MySportsFeeds;
