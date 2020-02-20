var API_v1_2 = require('./API_v1_2');
var util = require('util');

// Public Functions
var API_v2_0 = function (v, storeT, storeL) {
  API_v1_2.apply(this, arguments);

  this.baseUrl = "https://api.mysportsfeeds.com/v2.0/pull";

  this.feeds = {
    seasonal_games: {
      season: true,
      endpoint: 'games',
    },
    daily_games: {
      season: true,
      path: [{ key: 'date', value: 'date' }],
      endpoint: 'games',
    },
    weekly_games: {
      season: true,
      path: [{ key: 'week', value: 'week' }],
      endpoint: 'games',
    },
    seasonal_player_gamelogs: {
      season: true,
      endpoint: 'player_gamelogs',
    },
    daily_player_gamelogs: {
      season: true,
      path: [{ key: 'date', value: 'date' }],
      endpoint: 'player_gamelogs',
    },
    weekly_player_gamelogs: {
      season: true,
      path: [{ key: 'week', value: 'week' }],
      endpoint: 'player_gamelogs',
    },
    seasonal_team_gamelogs: {
      season: true,
      endpoint: 'team_gamelogs',
    },
    daily_team_gamelogs: {
      season: true,
      path: [{ key: 'date', value: 'date' }],
      endpoint: 'team_gamelogs',
    },
    weekly_team_gamelogs: {
      season: true,
      path: [{ key: 'week', value: 'week' }],
      endpoint: 'team_gamelogs',
    },
    game_boxscore: {
      season: true,
      path: [{ key: 'game', value: 'games' }],
      endpoint: 'boxscore',
    },
    game_playbyplay: {
      season: true,
      path: [{ key: 'game', value: 'games' }],
      endpoint: 'playbyplay',
    },
    game_lineup: {
      season: true,
      path: [{ key: 'game', value: 'games' }],
      endpoint: 'lineup',
    },
    current_season: {
      season: false,
      endpoint: 'current_season',
    },
    player_injuries: {
      season: false,
      endpoint: 'injuries',
    },
    latest_updates: {
      season: true,
      endpoint: 'latest_updates',
    },
    seasonal_team_stats: {
      season: true,
      endpoint: 'team_stats_totals',
    },
    seasonal_player_stats: {
      season: true,
      endpoint: 'player_stats_totals',
    },
    seasonal_venues: {
      season: true,
      endpoint: 'venues',
    },
    players: {
      season: false,
      endpoint: 'players',
    },
    seasonal_standings: {
      season: true,
      endpoint: 'standings',
    },
    seasonal_odds_gamelines: {
      season: true,
      endpoint: 'odds_gamelines',
    },
    daily_odds_gamelines: {
      season: true,
      path: [{ key: 'date', value: 'date' }],
      endpoint: 'odds_gamelines',
    },
    weekly_odds_gamelines: {
      season: true,
      path: [{ key: 'week', value: 'week' }],
      endpoint: 'odds_gamelines',
    },
    odds_futures: {
      season: true,
      path: [{ key: 'date', value: 'date' }],
      endpoint: 'odds_futures',
    },
    daily_dfs: {
      season: true,
      path: [{ key: 'date', value: 'date' }],
      endpoint: 'dfs',
    },
    weekly_dfs: {
      season: true,
      path: [{ key: 'week', value: 'week' }],
      endpoint: 'dfs',
    },
    seasonal_dfs: {
      season: true,
      endpoint: 'dfs',
    },
  };

  this.validFeeds = Object.keys(this.feeds);
};

util.inherits(API_v2_0, API_v1_2);

API_v2_0.prototype.__determineUrl = function (league, season, feed, format, params) {
  const settings = this.feeds[feed];

  if (settings.season && !season) {
    throw new Error('You must specify a season for this request.');
  }

  let season_route = '';
  if (settings.season && season) {
    season_route = `${season}/`;
  }

  let extra_path = '';
  if (settings.path) {
    settings.path.forEach(path => {
      if (!Object.keys(params).includes(path.key)) {
        throw new Error(
          `You must specify a '${path.key}' param for this request.`
        );
      } else if (!params[path.key]) {
        throw new Error(
          `'${path.key}' param can not be empty.`
        );
      } else {
        extra_path += `${path.value}/${params[path.key]}/`;
        // delete params[path.key];
      }
    });
  }

  return `${this.baseUrl}/${league}/${season_route}${extra_path}${settings.endpoint}.${format}`;
};

exports = module.exports = API_v2_0;
