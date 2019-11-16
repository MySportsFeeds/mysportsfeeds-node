var API_v1_2 = require('./API_v1_2');
var util = require('util');

// Public Functions
var API_v2_1 = function(v, storeT, storeL) {
  API_v1_2.apply(this, arguments);

  this.baseUrl = 'https://api.mysportsfeeds.com/v2.1/pull';

  this.feeds = {
    seasonal_games: {
      season: true,
      endpoint: 'games',
    },
    daily_games: {
      season: true,
      params: ['date'],
      endpoint: 'games',
    },
    daily_odds_gamelines: {
      season: true,
      params: ['date'],
      endpoint: 'odds_gamelines',
    },
    weekly_games: {
      season: true,
      params: ['week'],
      endpoint: 'games',
    },
    seasonal_dfs: {
      season: true,
      endpoint: 'dfs',
    },
    daily_dfs: {
      season: true,
      params: ['date'],
      endpoint: 'dfs',
    },
    weekly_dfs: {
      season: true,
      params: ['week'],
      endpoint: 'dfs',
    },
    seasonal_player_gamelogs: {
      season: true,
      endpoint: 'player_gamelogs',
    },
    daily_player_gamelogs: {
      season: true,
      params: ['date'],
      endpoint: 'player_gamelogs',
    },
    weekly_player_gamelogs: {
      season: true,
      params: ['week'],
      endpoint: 'player_gamelogs',
    },
    seasonal_team_gamelogs: {
      season: true,
      endpoint: 'team_gamelogs',
    },
    daily_team_gamelogs: {
      season: true,
      params: ['date'],
      endpoint: 'team_gamelogs',
    },
    weekly_team_gamelogs: {
      season: true,
      params: ['week'],
      endpoint: 'team_gamelogs',
    },
    game_boxscore: {
      season: true,
      params: ['game'],
      endpoint: 'boxscore',
    },
    game_playbyplay: {
      season: true,
      params: ['game'],
      endpoint: 'playbyplay',
    },
    game_lineup: {
      season: true,
      params: ['game'],
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
  };

  this.validFeeds = Object.keys(this.feeds);
};

util.inherits(API_v2_1, API_v1_2);

API_v2_1.prototype.__determineUrl = function(
  league,
  season,
  feed,
  format,
  params
) {
  const settings = this.feeds[feed];

  let season_route = '';
  if (settings.season && !season) {
    throw new Error('You must specify a season for this request.');
  } else {
    season_route = `${season}/`;
  }

  let extra_route = '';
  if (settings.params) {
    settings.params.forEach(param => {
      if (!Object.keys(params).includes(param)) {
        throw new Error(
          `You must specify a '${param}' param for this request.`
        );
      } else {
        extra_route += `${param}/${params[param]}/`;
      }
    });
  }

  return `${this.baseUrl}/${league}/${season_route}${extra_route}${settings.endpoint}.${format}`;
};

exports = module.exports = API_v2_1;
