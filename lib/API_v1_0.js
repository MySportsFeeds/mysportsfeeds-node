var os = require('os');
var Q = require('q');
var rp = require('request-promise');
var fs = require('fs');
var util = require('util');
var xml2json = require('./xml2json.js');

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
var auth = null;
var baseUrl = "https://www.mysportsfeeds.com/api/feed/pull";
var verbose = false;
var storeType = null;
var storeLocation = null;
var validFeeds = [];

// Private Functions
function __verifyFeedName(feed) {
  var isValid = false;

  validFeeds.forEach(function(value) {
    if ( value == feed ) {
      isValid = true;
    }
  });

  return isValid;
}

function __verifyFormat(format) {
  var isValid = false;

  if ( format != 'json' && format != 'xml' && format != 'csv' ) {
    isValid = false;
  }

  return isValid;
}

function __leagueOnlyUrl(league, feed, format, params) {
  return baseUrl + '/' + league + '/' + feed + '.' + format;
}

function __leagueAndSeasonUrl(league, season, feed, format, params) {
  return baseUrl + '/' + league + '/' + season + '/' + feed + '.' + format;
}

function __makeOutputFilename(league, season, feed, format, params) {
  var filename = feed + '-' + league + '-' + season;

  if (Object.keys(params).includes("gameid") ) {
    filename += "-" + params["gameid"];
  }

  if ( Object.keys(params).includes("fordate") ) {
    filename += "-" + params["fordate"];
  }

  filename += "." + format;

  return filename;
}

function __parseXml(xmlStr) {
  var dom = null;

  if ( window.DOMParser ) {
    try { 
       dom = (new DOMParser()).parseFromString(xmlStr, "text/xml"); 
    } catch (e) {
      dom = null;
    }
  } else if ( window.ActiveXObject ) {
    try {
      dom = new ActiveXObject('Microsoft.XMLDOM');
      dom.async = false;

      if ( !dom.loadXML(xml) ) { // parse error ..
        throw new Error(dom.parseError.reason + dom.parseError.srcText);
      }
    } catch (e) {
      dom = null;
    }
  } else {
    throw new Error("cannot parse xml string!");
  }

  return dom;
}

function __saveFeed(response, league, season, feed, format, params) {
  var storeOutput = null;
  var filename = "";

  // Save to memory regardless of selected method
  if ( format == "json" ) {
    storeOutput = JSON.parse(response);
  } else if ( format == "xml" ) {
    storeOutput = eval(xml2json(__parseXml(response)));
  } else if ( format == "csv" ) {
    throw new Error("CSV feed format not supported.");
  }

  if ( storeType == "file" ) {
    if ( !fs.existsSync(storeLocation) ) {
      fs.mkdir(storeLocation);
    }

    filename = __makeOutputFilename(league, season, feed, format, params);

    if ( format == "json" ) {  // This is JSON
      fs.writeFileSync(filename, JSON.stringify(storeOutput));
    } else if ( format == "xml" ) {  // This is xml
      fs.writeFileSync(filename, JSON.stringify(storeOutput));
    } else {
      throw new Error("Could not interpret feed output format.");
    }
  }
}

// Public Functions
function API_v1_0(v, storeT, storeL) {
  verbose = v;
  storeType = storeT;
  storeLocation = storeL;

  validFeeds = [
      'current_season',
      'cumulative_player_stats',
      'full_game_schedule',
      'daily_game_schedule',
      'daily_player_stats',
      'game_playbyplay',
      'game_boxscore',
      'scoreboard',
      'player_gamelogs',
      'team_gamelogs',
      'roster_players',
      'game_startinglineup',
      'active_players',
      'player_injuries',
      'latest_updates',
      'daily_dfs'
  ];
}

// Indicate this version does support BASIC auth
API_v1_0.prototype.supportsBasicAuth = function() {
  return true;
};

// Establish BASIC auth credentials
API_v1_0.prototype.setAuthCredentials = function(username, password) {
  auth = {
    username: username,
    password: password
  };

	options.headers.Authorization = util.format('Basic %s',
      new Buffer(username + ":" + password).toString('base64'));
};

API_v1_0.prototype.getData = function(league, season, feed, format, params) {
  if ( !auth ) {
    throw new Error("You must authenticate() before making requests.");
  }

  // add force=false parameter (helps prevent unnecessary bandwidth use)
  if ( !Object.keys(params).includes("force") ) {
    params['force'] = 'false';
  }

  if ( !__verifyFeedName(feed) ) {
    throw new Error("Unknown feed '" + feed + "'.");

  if ( !__verifyFormat(format) ) {
    throw new Error("Unsupported format '" + output_format + "'.");
  }

  var url = "";

  if ( feed == 'current_season' ) {
    url = __leagueOnlyUrl(league, feed, output_format, params);
  } else {
    url = __leagueAndSeasonUrl(league, season, feed, output_format, params);
  }

  if ( verbose ) {
    console.log("Making API request to '" + url + "'.";
    console.log("  with headers:");
    console.log(options.headers);
    console.log(" and params:");
    console.log(params);
  }

  var deferred = Q.defer();
  options.uri = util.format(url);
  options.qs = params;

  // Make the request
  rp(options).then(function(response) {
    var data = response.body;

    if ( response.statusCode == 200 ) { // Success!
      if ( storeType ) {
        __saveFeed(data, league, season, feed, format, params);
      }

      if ( format == "json" ) {
        data = JSON.parse(data);
      } else if ( format == "xml" ) {
        data = eval(xml2json(__parseXml(data)));
      } else if ( format == "csv" ) {
        throw new Error("CSV feed format not supported.");
      }
    } else if ( response.statusCode == 304 ) { // Content hasn't changed, read from local file
      if ( verbose ) {
        console.log("Data hasn't changed since last call.");
      }

      var filename = __makeOutputFilename(league, season, feed, output_format, params);

      fs.readFile(storeLocation + filename, function(err, data) {
        if ( format == "json" ) {
          data = JSON.parse(data);
        } else if ( format == "xml" ) {
          data = eval(xml2json(__parseXml(data)));
        } else if ( format == "csv" ) {
          throw new Error("CSV feed format not supported.");
        }
      });
    } else {
      throw new Error("API call failed with error: " + response.statusCode);
    }

    deferred.resolve(data);
  });

  return deferred.promise;
};

module.exports = API_v1_0;
