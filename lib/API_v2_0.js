var API_v1_2 = require('./API_v1_2');
var util = require('util');

// Public Functions
var API_v2_0 = function(v, storeT, storeL) {
  API_v1_2.apply(this, arguments);

  this.baseUrl = "https://api.mysportsfeeds.com/v2.0/pull";

  this.validFeeds = [
	  'seasonal_games',
    'daily_games',
    'daily_odds_gamelines',
    'weekly_games',
    'seasonal_dfs',
    'daily_dfs',
    'weekly_dfs',
    'seasonal_player_gamelogs',
    'daily_player_gamelogs',
    'weekly_player_gamelogs',
    'seasonal_team_gamelogs',
    'daily_team_gamelogs',
    'weekly_team_gamelogs',
    'game_boxscore',
    'game_playbyplay',
    'game_lineup',
    'current_season',
    'player_injuries',
    'latest_updates',
    'seasonal_team_stats',
    'seasonal_player_stats',
    'seasonal_venues',
    'players',
    'seasonal_standings'
  ];
}

util.inherits(API_v2_0, API_v1_2);

API_v2_0.prototype.__determineUrl = function(league, season, feed, format, params) {
  if ( feed == "seasonal_games" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}

    return this.baseUrl + '/' + league + '/' + season + '/games.' + format;

  } else if ( feed == "daily_games" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}
    if ( !Object.keys(params).includes("date") ) {
      throw new Error("You must specify a 'date' param for this request.");
    }

    return this.baseUrl + '/' + league + '/' + season + '/date/' + params['date'] + '/games.' + format;

  } else if ( feed == "daily_odds_gamelines" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}
    if ( !Object.keys(params).includes("date") ) {
      throw new Error("You must specify a 'date' param for this request.");
    }

    return this.baseUrl + '/' + league + '/' + season + '/date/' + params['date'] + '/odds_gamelines.' + format;

  } else if ( feed == "weekly_games" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}
    if ( !Object.keys(params).includes("week") ) {
      throw new Error("You must specify a 'week' param for this request.");
    }

    return this.baseUrl + '/' + league + '/' + season + '/week/' + params['week'] + '/games.' + format;

  } else if ( feed == "seasonal_dfs" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}

    return this.baseUrl + '/' + league + '/' + season + '/dfs.' + format;

  } else if ( feed == "daily_dfs" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}
    if ( !Object.keys(params).includes("date") ) {
      throw new Error("You must specify a 'date' param for this request.");
    }

    return this.baseUrl + '/' + league + '/' + season + '/date/' + params['date'] + '/dfs.' + format;

  } else if ( feed == "weekly_dfs" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}
    if ( !Object.keys(params).includes("week") ) {
      throw new Error("You must specify a 'week' param for this request.");
    }

    return this.baseUrl + '/' + league + '/' + season + '/week/' + params['week'] + '/dfs.' + format;

  } else if ( feed == "seasonal_player_gamelogs" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}

    return this.baseUrl + '/' + league + '/' + season + '/player_gamelogs.' + format;

  } else if ( feed == "daily_player_gamelogs" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}
    if ( !Object.keys(params).includes("date") ) {
      throw new Error("You must specify a 'date' param for this request.");
    }

    return this.baseUrl + '/' + league + '/' + season + '/date/' + params['date'] + '/player_gamelogs.' + format;

  } else if ( feed == "weekly_player_gamelogs" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}
    if ( !Object.keys(params).includes("week") ) {
      throw new Error("You must specify a 'week' param for this request.");
    }

    return this.baseUrl + '/' + league + '/' + season + '/week/' + params['week'] + '/player_gamelogs.' + format;

  } else if ( feed == "seasonal_team_gamelogs" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}

    return this.baseUrl + '/' + league + '/' + season + '/team_gamelogs.' + format;

  } else if ( feed == "daily_team_gamelogs" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}
    if ( !Object.keys(params).includes("date") ) {
      throw new Error("You must specify a 'date' param for this request.");
    }

    return this.baseUrl + '/' + league + '/' + season + '/date/' + params['date'] + '/team_gamelogs.' + format;

  } else if ( feed == "weekly_team_gamelogs" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}
    if ( !Object.keys(params).includes("week") ) {
      throw new Error("You must specify a 'week' param for this request.");
    }

    return this.baseUrl + '/' + league + '/' + season + '/week/' + params['week'] + '/team_gamelogs.' + format;

  } else if ( feed == "game_boxscore" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}
    if ( !Object.keys(params).includes("game") ) {
      throw new Error("You must specify a 'game' param for this request.");
    }

    return this.baseUrl + '/' + league + '/' + season + '/games/' + params['game'] + '/boxscore.' + format;

  } else if ( feed == "game_playbyplay" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}
    if ( !Object.keys(params).includes("game") ) {
      throw new Error("You must specify a 'game' param for this request.");
    }

    return this.baseUrl + '/' + league + '/' + season + '/games/' + params['game'] + '/playbyplay.' + format;

  } else if ( feed == "game_lineup" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}
    if ( !Object.keys(params).includes("game") ) {
      throw new Error("You must specify a 'game' param for this request.");
    }

    return this.baseUrl + '/' + league + '/' + season + '/games/' + params['game'] + '/lineup.' + format;

  } else if ( feed == "current_season" ) {

    return this.baseUrl + '/' + league + '/current_season.' + format;

  } else if ( feed == "player_injuries" ) {

    return this.baseUrl + '/' + league + '/injuries.' + format;

  } else if ( feed == "latest_updates" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}

    return this.baseUrl + '/' + league + '/' + season + '/latest_updates.' + format;

  } else if ( feed == "seasonal_team_stats" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}

    return this.baseUrl + '/' + league + '/' + season + '/team_stats_totals.' + format;

  } else if ( feed == "seasonal_player_stats" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}

    return this.baseUrl + '/' + league + '/' + season + '/player_stats_totals.' + format;

  } else if ( feed == "seasonal_venues" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}

    return this.baseUrl + '/' + league + '/' + season + '/venues.' + format;

  } else if ( feed == "players" ) {

    return this.baseUrl + '/' + league + '/players.' + format;

  } else if ( feed == "seasonal_standings" ) {
    if ( !season ) {
	  throw new Error("You must specify a season for this request.");
	}

    return this.baseUrl + '/' + league + '/' + season + '/standings.' + format;

  } else {
	  throw new Error("Unrecognized feed '" + feed + "'.");
  }

}

exports = module.exports = API_v2_0;
