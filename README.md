# mysportsfeeds-node

MySportsFeeds NodeJS Wrapper brought to you by [@MySportsFeeds](https://twitter.com/MySportsFeeds).

Makes use of the [MySportsFeeds API](https://www.mysportsfeeds.com) - a flexible, developer-friendly Sports Data API.

Free for Non-Commercial Use.

##Install
    
    $ npm install mysportsfeeds-node

If you haven't signed up for API access, do so here [https://www.mysportsfeeds.com](https://www.mysportsfeeds.com/index.php/register/)

##Usage

Create main MySportsFeeds object with API version and verbosity as input parameters

For v1.x feed requests (free non-commercial access available):

    var MySportsFeeds = require("mysportsfeeds-node");

    var msf = new MySportsFeeds("1.2", true);

For v2.0 feed requests (donation required for non-commercial access):

    var MySportsFeeds = require("mysportsfeeds-node");

    var msf = new MySportsFeeds("2.0", true);

If you're using mysportsfeeds-node from a browser environment (like browserify), specify "null" as the 3rd argument to avoid attempts to save the results locally.

    var msf = new MySportsFeeds("1.2", true, null);

Authenticate for v1.x (uses your MySportsFeeds account password)

    msf.authenticate("<YOUR_API_KEY>", "<YOUR_ACCOUNT_PASSWORD>");

Authenticate for v2.0 (simply uses "MYSPORTSFEEDS" as the password)

    msf.authenticate("<YOUR_API_KEY>", "MYSPORTSFEEDS");

Start making requests, specifying: league, season, feed, format, and any other applicable params for the feed

Example (v1.x): Get all NBA 2016-2017 regular season gamelogs for Stephen Curry, in JSON format

```
    var data = msf.getData('nba', '2016-2017-regular', 'player_gamelogs', 'json', {player: 'stephen-curry'});
```

Example (v1.x): Get all NFL 2015-2016 regular season seasonal stats totals for all Dallas Cowboys players, in JSON format

```
    var data = msf.getData('nfl', '2015-2016-regular', 'cumulative_player_stats', 'json', {team: 'dallas-cowboys'});
```

Example (v1.x): Get full game schedule for the MLB 2016 playoff season, in JSON format

```
    var data = msf.getData( 'mlb', '2016-playoff', 'full_game_schedule', 'json', {});
```

Example (v2.0): Get all NBA 2016-2017 regular season gamelogs for Stephen Curry, in JSON format

```
    var data = msf.getData('nba', '2016-2017-regular', 'seasonal_player_gamelogs', 'json', {player: 'stephen-curry'});
```

Example (v2.0): Get full game schedule and scores for the MLB 2016 playoff season, in JSON format

```
    var data = msf.getData( 'mlb', '2016-playoff', 'seasonal_games', 'json', {});
```

That's it!  Returned data is also stored locally under "results/" by default, in appropriately named files.
