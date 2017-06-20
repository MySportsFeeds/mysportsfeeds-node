var os = require('os');
var util = require('util');
var rp = require('request-promise');

var libVersion = require('../package.json').version;
var api_v1_0 = require('./api_v1_0.js');

// Private Vars
var platform = util.format('%s-%s%s', os.arch(), os.platform(), os.release());
var options = {
  method: 'GET',
  uri: '',
  json: true,
  resolveWithFullResponse: true,
  headers: {
    'Authorization': '',
    'Accept-Encoding': 'gzip',
    'User-Agent': util.format('MySportsFeeds-Node/%s (%s)', libVersion, platform)
  },
  qs: {}
};

function MySportsFeeds(apiVersion, verbose) {
};

MySportsFeeds.prototype.authenticate = function(username, password) {
	options.headers.Authorization = util.format('Basic %s', base64_encode(username + ":" + password));
};

MySportsFeeds.prototype.getData = function(league, season, feed, format, params) {
	
};

module.exports = MySportsFeeds;
