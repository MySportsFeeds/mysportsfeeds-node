var os = require('os');
var Q = require('q');
var rp = require('request-promise');
var fs = require('fs');
var util = require('util');
var libVersion = require('../package.json').version;

// Private Functions
function __verifyFeedName(feed) {
  if (!feed) {
    return false;
  }

  return this.validFeeds.includes(feed);
}

function __verifyFormat(format) {
  // Only JSON format supported
  if (!format || format !== 'json') {
    return false;
  }

  return true;
}

function __makeOutputFilename(league, season, feed, format, params) {
  var filename = `${feed}-${league}-${season}`;

  const keys = Object.keys(params);

  if (keys.includes("gameid")) {
    filename += `-${params["gameid"]}`;
  }

  if (keys.includes("fordate")) {
    filename += `-${params["fordate"]}`;
  }

  if (keys.includes("game")) {
    filename += `-${params["game"]}`;
  }

  if (keys.includes("date")) {
    filename += `-${params["date"]}`;
  }

  if (keys.includes("week")) {
    filename += `-${params["week"]}`;
  }

  filename += `.${format}`;

  return filename;
}

function __saveFeed(response, league, season, feed, format, params) {
  var storeOutput = null;

  // Save to memory regardless of selected method
  if (format == "json") {
    storeOutput = response;
  } else if (format == "xml") {
    throw new Error("XML feed format not supported in this version.");
  } else if (format == "csv") {
    throw new Error("CSV feed format not supported in this version.");
  }

  if (this.storeType == "file") {
    if (!fs.existsSync(this.storeLocation)) {
      fs.mkdirSync(this.storeLocation);
    }

    var filename = __makeOutputFilename.call(this, league, season, feed, format, params);

    if (format == "json") {  // This is JSON
      fs.writeFileSync(this.storeLocation + filename, JSON.stringify(storeOutput));
    } else {
      throw new Error("Could not interpret feed output format.");
    }

    if (this.verbose) {
      console.log(`File saved as '${this.storeLocation}${filename}'.`);
    }
  }
}

// Public Functions
var API_v1_0 = function (v, storeT, storeL) {
  this.platform = util.format('%s-%s%s', os.arch(), os.platform(), os.release());
  this.options = {
    method: 'GET',
    uri: '',
    json: true,
    resolveWithFullResponse: true,
    gzip: true,
    headers: {
      'Authorization': '',
      'User-Agent': util.format('MySportsFeeds-Node/%s (%s)', libVersion, this.platform)
    },
    qs: {},
    transform: function (body) {
      // console.log("response = '" + util.inspect(body, {depth: null}) + "'");

      return body;
    }
  };
  this.auth = null;
  this.baseUrl = null;

  this.verbose = v;
  this.storeType = storeT;
  this.storeLocation = storeL;
  this.baseUrl = "https://api.mysportsfeeds.com/v1.0/pull";

  this.validFeeds = [
    'cumulative_player_stats',
    'full_game_schedule',
    'daily_game_schedule',
    'daily_player_stats',
    'game_boxscore',
    'game_playbyplay',
    'scoreboard',
    'roster_players',
    'game_startinglineup',
    'player_gamelogs',
    'team_gamelogs',
    'active_players',
    'overall_team_standings',
    'conference_team_standings',
    'division_team_standings',
    'playoff_team_standings',
    'player_injuries',
    'latest_updates',
    'daily_dfs',
    'current_season',
  ];
};

// Indicate this version does support BASIC auth
API_v1_0.prototype.supportsBasicAuth = function () {
  return true;
};

// Establish BASIC auth credentials
API_v1_0.prototype.setAuthCredentials = function (apikey, password) {
  this.auth = {
    username: apikey,
    password: password
  };

  this.options.headers.Authorization = util.format('Basic %s',
    new Buffer.from(apikey + ":" + password).toString('base64'));
};

API_v1_0.prototype.__determineUrl = function (league, season, feed, format, params) {
  if (feed == "current_season") {
    return `${this.baseUrl}/${league}/${feed}.${format}`;
  } else {
    return `${this.baseUrl}/${league}/${season}/${feed}.${format}`;
  }
};

API_v1_0.prototype.getData = function (league, season, feed, format, params = {}) {
  if (!this.auth) {
    throw new Error("You must authenticate() before making requests.");
  }

  // Add force=false parameter (helps prevent unnecessary bandwidth use)
  if (!Object.keys(params).includes("force")) {
    params['force'] = 'false';
  }

  if (!__verifyFeedName.call(this, feed)) {
    throw new Error(`Unknown feed '${feed}'.  Known values are: [${this.validFeeds}]`);
  }

  if (!__verifyFormat.call(this, format)) {
    throw new Error(`Unsupported format '${format}'.`);
  }

  var url = this.__determineUrl(league, season, feed, format, params);

  if (this.verbose) {
    console.log(`Making API request to '${url}'.`);
    console.log("  with headers:");
    console.log(this.options.headers);
    console.log(" and params:");
    console.log(params);
  }

  var deferred = Q.defer();
  this.options.uri = util.format(url);
  this.options.qs = params;

  // Make the request
  rp(this.options).then(function (body) {
    var data = body;

    if (this.storeType) {
      __saveFeed.call(this, data, league, season, feed, format, params);
    }

    if (format == "json") {
      data = body;
    } else if (format == "xml") {
      throw new Error("XML feed format not supported in this version.");
    } else if (format == "csv") {
      throw new Error("CSV feed format not supported in this version.");
    }

    deferred.resolve(data);
  }.bind(this))
    .catch(function (err) {
      if (this.verbose) {
        console.log(`err = '${util.inspect(err, { depth: null })}'`);
      }

      if (err.statusCode == 304) { // Content hasn't changed, read from local file
        if (this.verbose) {
          console.log("Data hasn't changed since last call.");
        }

        var filename = __makeOutputFilename.call(this, league, season, feed, format, params);

        const file_path = this.storeLocation + filename;

        let exists = fs.existsSync(file_path);

        if (!exists) {
          throw new Error("Local copy does not exist, set 'force' param to true to get latest");
        }

        let data = fs.readFileSync(file_path);

        if (format == "json") {
          data = JSON.parse(data);
        } else if (format == "xml") {
          throw new Error("XML feed format not supported in this version.");
        } else if (format == "csv") {
          throw new Error("CSV feed format not supported in this version.");
        }

        deferred.resolve(data);
      } else {
        throw new Error(`API call failed with error: ${err.statusCode}`);
      }
    }.bind(this));

  return deferred.promise;
};

exports = module.exports = API_v1_0;
