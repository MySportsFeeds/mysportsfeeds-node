var API_v1_2 = require("./API_v1_2");
var util = require("util");

// Public Functions
var API_v2_0 = function (v, storeT, storeL) {
  API_v1_2.apply(this, arguments);

  this.baseUrl = "https://api.mysportsfeeds.com/v2.0/pull";

  this.feeds = {
    seasonal_games: {
      endpoint: "games",
    },
    daily_games: {
      path: [{ key: "date", value: "date" }],
      endpoint: "games",
    },
    weekly_games: {
      path: [{ key: "week", value: "week" }],
      endpoint: "games",
    },
    seasonal_player_gamelogs: {
      endpoint: "player_gamelogs",
    },
    daily_player_gamelogs: {
      path: [{ key: "date", value: "date" }],
      endpoint: "player_gamelogs",
    },
    weekly_player_gamelogs: {
      path: [{ key: "week", value: "week" }],
      endpoint: "player_gamelogs",
    },
    seasonal_team_gamelogs: {
      endpoint: "team_gamelogs",
    },
    daily_team_gamelogs: {
      path: [{ key: "date", value: "date" }],
      endpoint: "team_gamelogs",
    },
    weekly_team_gamelogs: {
      path: [{ key: "week", value: "week" }],
      endpoint: "team_gamelogs",
    },
    game_boxscore: {
      path: [{ key: "game", value: "games" }],
      endpoint: "boxscore",
    },
    game_playbyplay: {
      path: [{ key: "game", value: "games" }],
      endpoint: "playbyplay",
    },
    game_lineup: {
      path: [{ key: "game", value: "games" }],
      endpoint: "lineup",
    },
    current_season: {
      bypass_season: true,
      endpoint: "current_season",
    },
    player_injuries: {
      bypass_season: true,
      endpoint: "injuries",
    },
    latest_updates: {
      endpoint: "latest_updates",
    },
    seasonal_team_stats: {
      endpoint: "team_stats_totals",
    },
    seasonal_player_stats: {
      endpoint: "player_stats_totals",
    },
    seasonal_venues: {
      endpoint: "venues",
    },
    players: {
      bypass_season: true,
      endpoint: "players",
    },
    seasonal_standings: {
      endpoint: "standings",
    },
    seasonal_odds_gamelines: {
      endpoint: "odds_gamelines",
    },
    daily_odds_gamelines: {
      path: [{ key: "date", value: "date" }],
      endpoint: "odds_gamelines",
    },
    weekly_odds_gamelines: {
      path: [{ key: "week", value: "week" }],
      endpoint: "odds_gamelines",
    },
    odds_futures: {
      path: [{ key: "date", value: "date" }],
      endpoint: "odds_futures",
    },
    daily_dfs: {
      path: [{ key: "date", value: "date" }],
      endpoint: "dfs",
    },
    weekly_dfs: {
      path: [{ key: "week", value: "week" }],
      endpoint: "dfs",
    },
    seasonal_dfs: {
      endpoint: "dfs",
    },
    injury_history: {
      season: false,
      endpoint: 'injury_history',
    },
  };

  this.validFeeds = Object.keys(this.feeds);
};

util.inherits(API_v2_0, API_v1_2);

API_v2_0.prototype.__determineUrl = function (
  league,
  season,
  feed,
  format,
  params
) {
  const settings = this.feeds[feed];
  let season_route = "";

  if (!settings.bypass_season) {
    if (!season) {
      throw new Error("You must specify a season for this request.");
    }

    season_route = `${season}/`;
  }

  let extra_path = "";
  if (settings.path) {
    settings.path.forEach((path) => {
      if (!Object.keys(params).includes(path.key)) {
        throw new Error(
          `You must specify a '${path.key}' param for this request.`
        );
      } else if (!params[path.key]) {
        throw new Error(`'${path.key}' param can not be empty.`);
      } else {
        extra_path += `${path.value}/${params[path.key]}/`;
        delete params[path.key];
      }
    });
  }

  return `${this.baseUrl}/${league}/${season_route}${extra_path}${settings.endpoint}.${format}`;
};

exports = module.exports = API_v2_0;
