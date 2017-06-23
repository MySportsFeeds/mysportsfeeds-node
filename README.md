# mysportsfeeds-node

MySportsFeeds NodeJS Wrapper brought to you by [@MySportsFeeds](https://twitter.com/MySportsFeeds).

Makes use of the [MySportsFeeds API](https://www.mysportsfeeds.com) - a flexible, developer-friendly Sports Data API.

Free for Non-Commercial Use.

##Install
    
    $ npm install mysportsfeeds-node

If you haven't signed up for API access, do so here [https://www.mysportsfeeds.com/index.php/register/](https://www.mysportsfeeds.com/index.php/register/)

##Usage

Create main MySportsFeeds object with API version and verbosity as input parameters

    var MySportsFeeds = require("mysportsfeeds-node");

    var msf = new MySportsFeeds("1.0", true);

If you're using mysportsfeeds-node from a browser environment (like browserify), specify "null" as the 3rd argument to omit steps to save the results locally.

    var msf = new MySportsFeeds("1.0", true, null);

Authenticate (v1.0 uses your MySportsFeeds account credentials)

    msf.authenticate("YOUR_USERNAME", "YOUR_PASSWORD");

Start making requests, specifying: league, season, feed, format, and any other applicable params for the feed

Get all NBA 2016-2017 regular season gamelogs for Stephen Curry, in JSON format

```
    var data = msf.getData('nba', '2016-2017-regular', 'player_gamelogs', 'json', {player: 'stephen-curry'});
```

Get all NFL 2015-2016 regular season seasonal stats totals for all Dallas Cowboys players, in JSON format

```
    var data = msf.getData('nfl', '2015-2016-regular', 'cumulative_player_stats', 'json', {team: 'dallas-cowboys'});
```

Get full game schedule for the MLB 2016 playoff season, in JSON format

```
    var data = msf.getData( 'mlb', '2016-playoff', 'full_game_schedule', 'json', {});
```

That's it!  Returned data is also stored locally under "results/" by default, in appropriately named files.
