const helpers = require('./helpers');

describe('seasonal_games', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'seasonal_games',
    format: 'json'
  };
  const endpoint = 'games';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('daily_games', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'daily_games',
    format: 'json',
    params: { date: '20191231' }
  };
  const endpoint = 'games';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.requiresDate(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('weekly_games', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'weekly_games',
    format: 'json',
    params: { week: '1' }
  };
  const endpoint = 'games';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.requiresWeek(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('seasonal_player_gamelogs', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'seasonal_player_gamelogs',
    format: 'json',
  };
  const endpoint = 'player_gamelogs';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('daily_player_gamelogs', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'daily_player_gamelogs',
    format: 'json',
    params: { date: '20191231' }
  };
  const endpoint = 'player_gamelogs';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.requiresDate(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('weekly_player_gamelogs', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'weekly_player_gamelogs',
    format: 'json',
    params: { week: '1' }
  };
  const endpoint = 'player_gamelogs';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.requiresWeek(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('seasonal_team_gamelogs', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'seasonal_team_gamelogs',
    format: 'json',
  };
  const endpoint = 'team_gamelogs';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('daily_team_gamelogs', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'daily_team_gamelogs',
    format: 'json',
    params: { date: '20191231' }
  };
  const endpoint = 'team_gamelogs';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.requiresDate(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('weekly_team_gamelogs', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'weekly_team_gamelogs',
    format: 'json',
    params: { week: '1' }
  };
  const endpoint = 'team_gamelogs';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.requiresWeek(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('game_boxscore', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'game_boxscore',
    format: 'json',
    params: { game: '20191231-NYG-MIA' }
  };
  const endpoint = 'boxscore';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.requiresGame(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('game_playbyplay', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'game_playbyplay',
    format: 'json',
    params: { game: '20191231-NYG-MIA' }
  };
  const endpoint = 'playbyplay';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.requiresGame(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('game_lineup', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'game_lineup',
    format: 'json',
    params: { game: '20191231-NYG-MIA' }
  };
  const endpoint = 'lineup';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.requiresGame(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('current_season', () => {
  const data = {
    league: 'nfl',
    season: null,
    feed: 'current_season',
    format: 'json',
  };
  const endpoint = 'current_season';

  helpers.requiresFeed(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('player_injuries', () => {
  const data = {
    league: 'nfl',
    season: null,
    feed: 'player_injuries',
    format: 'json',
  };
  const endpoint = 'injuries';

  helpers.requiresFeed(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('latest_updates', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'latest_updates',
    format: 'json',
  };
  const endpoint = 'latest_updates';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('seasonal_team_stats', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'seasonal_team_stats',
    format: 'json',
  };
  const endpoint = 'team_stats_totals';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('seasonal_player_stats', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'seasonal_player_stats',
    format: 'json',
  };
  const endpoint = 'player_stats_totals';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('seasonal_venues', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'seasonal_venues',
    format: 'json',
  };
  const endpoint = 'venues';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('players', () => {
  const data = {
    league: 'nfl',
    season: null,
    feed: 'players',
    format: 'json',
  };
  const endpoint = 'players';

  helpers.requiresFeed(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('seasonal_standings', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'seasonal_standings',
    format: 'json',
  };
  const endpoint = 'standings';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('seasonal_odds_gamelines', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'seasonal_odds_gamelines',
    format: 'json',
  };
  const endpoint = 'odds_gamelines';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('daily_odds_gamelines', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'daily_odds_gamelines',
    format: 'json',
    params: { date: '20191231' }
  };
  const endpoint = 'odds_gamelines';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.requiresDate(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('weekly_odds_gamelines', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'weekly_odds_gamelines',
    format: 'json',
    params: { week: '1' }
  };
  const endpoint = 'odds_gamelines';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.requiresWeek(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('odds_futures', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'odds_futures',
    format: 'json',
    params: { date: '20191231' }
  };
  const endpoint = 'odds_futures';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.requiresDate(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('daily_dfs', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'daily_dfs',
    format: 'json',
    params: { date: '20191231' }
  };
  const endpoint = 'dfs';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.requiresDate(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('weekly_dfs', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'weekly_dfs',
    format: 'json',
    params: { week: '1' }
  };
  const endpoint = 'dfs';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.requiresWeek(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('seasonal_dfs', () => {
  const data = {
    league: 'nfl',
    season: '2019-regular',
    feed: 'seasonal_dfs',
    format: 'json',
  };
  const endpoint = 'dfs';

  helpers.requiresSeason(data, endpoint);
  helpers.requiresFeed(data, endpoint);
  helpers.successful(data, endpoint);
});

describe('injury_history', () => {
  const data = {
    league: 'nfl',
    season: null,
    feed: 'injury_history',
    format: 'json',
  };
  const endpoint = 'injury_history';

  helpers.requiresFeed(data, endpoint);
  helpers.successful(data, endpoint);
});