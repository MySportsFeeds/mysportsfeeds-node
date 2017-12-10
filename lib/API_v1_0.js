var os = require('os');
var Q = require('q');
var rp = require('request-promise');
var fs = require('fs');
var util = require('util');
var libVersion = require('../package.json').version;

// Private Vars
var platform = util.format('%s-%s%s', os.arch(), os.platform(), os.release());
var options = {
  method: 'GET',
  uri: '',
  json: true,
  resolveWithFullResponse: true,
  gzip: true,
  headers: {
    'Authorization': '',
    'User-Agent': util.format('MySportsFeeds-Node/%s (%s)', libVersion, platform)
  },
  qs: {},
  transform: function(body) {
    // console.log("response = '" + util.inspect(body, {depth: null}) + "'");

    return body;
  }
};
var auth = null;
var baseUrl = "https://api.mysportsfeeds.com/v1.1/pull";
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
  var isValid = true;

  // Only JSON format supported
  if ( format != 'json' ) {
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

  if ( Object.keys(params).includes("gameid") ) {
    filename += "-" + params["gameid"];
  }

  if ( Object.keys(params).includes("fordate") ) {
    filename += "-" + params["fordate"];
  }

  filename += "." + format;

  return filename;
}

function __saveFeed(response, league, season, feed, format, params) {
  var storeOutput = null;

  // Save to memory regardless of selected method
  if ( format == "json" ) {
    storeOutput = response;
  } else if ( format == "xml" ) {
    throw new Error("XML feed format not supported in this version.");
  } else if ( format == "csv" ) {
    throw new Error("CSV feed format not supported in this version.");
  }

  if ( storeType == "file" ) {
    if ( !fs.existsSync(storeLocation) ) {
      fs.mkdir(storeLocation);
    }

    var filename = __makeOutputFilename(league, season, feed, format, params);

    if ( format == "json" ) {  // This is JSON
      fs.writeFileSync(storeLocation + filename, JSON.stringify(storeOutput));
    } else {
      throw new Error("Could not interpret feed output format.");
    }

    if ( verbose ) {
      console.log("File saved as '" + storeLocation + filename + "'.");
    }
  }
}

// Public Functions
var API_v1_0 = function(v, storeT, storeL) {
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
      'daily_dfs',
      'overall_team_standings',
      'division_team_standings',
      'conference_team_standings',
      'playoff_team_standings'
  ];
};

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

  // Add force=false parameter (helps prevent unnecessary bandwidth use)
  if ( !Object.keys(params).includes("force") ) {
    // params['force'] = 'false';
  }

  if ( !__verifyFeedName(feed) ) {
    throw new Error("Unknown feed '" + feed + "'.");
  }

  if ( !__verifyFormat(format) ) {
    throw new Error("Unsupported format '" + format + "'.");
  }

  var url = "";

  if ( feed == 'current_season' ) {
    url = __leagueOnlyUrl(league, feed, format, params);
  } else {
    url = __leagueAndSeasonUrl(league, season, feed, format, params);
  }

  if ( verbose ) {
    console.log("Making API request to '" + url + "'.");
    console.log("  with headers:");
    console.log(options.headers);
    console.log(" and params:");
    console.log(params);
  }

  var deferred = Q.defer();
  options.uri = util.format(url);
  options.qs = params;

  // Make the request
  rp(options).then(function(body) {
    var data = body;

    if ( storeType ) {
      __saveFeed(data, league, season, feed, format, params);
    }

    if ( format == "json" ) {
      data = body;
    } else if ( format == "xml" ) {
      throw new Error("XML feed format not supported in this version.");
    } else if ( format == "csv" ) {
      throw new Error("CSV feed format not supported in this version.");
    }

    deferred.resolve(data);
  })
  .catch(function(err) {
    if ( verbose ) {
      console.log("err = '" + util.inspect(err, {depth: null}) + "'");
    }

    if ( err.statusCode == 304 ) { // Content hasn't changed, read from local file
      if ( verbose ) {
        console.log("Data hasn't changed since last call.");
      }

      var filename = __makeOutputFilename(league, season, feed, format, params);

      var data = fs.readFileSync(storeLocation + filename);

      if ( format == "json" ) {
        data = JSON.parse(data);
      } else if ( format == "xml" ) {
        throw new Error("XML feed format not supported in this version.");
      } else if ( format == "csv" ) {
        throw new Error("CSV feed format not supported in this version.");
      }

      deferred.resolve(data);
    } else {
      throw new Error("API call failed with error: " + err.statusCode);
    }
  });

  return deferred.promise;
};

exports = module.exports = API_v1_0;
