const assert = require('assert');
const expect = require('chai').expect;
const nock = require('nock');
const mock = require('nodemock');

const MySportsFeeds = require('../../lib/index');

const version = '2.1';
const username = 'username';
const password = 'password';

nock.disableNetConnect();

const msf = new MySportsFeeds(version, true, null, null);

mock.named('auth').mock('authenticate').takes(username, password).returns(true);
// mock.named('save_file').mock('fs').takesAll().returns(true);

beforeEach(() => {
  msf.authenticate(username, password);
  nock('https://api.mysportsfeeds.com')
    .get(uri => uri.includes(`${version}/pull`))
    .reply(200, 'response');
});

const requiresSeason = data => {
  const obj = { ...data };

  it('requires a season', done => {
    obj.season = null;
    expect(() => {
      msf.getData(
        ...Object.values(obj)
      );
    }).to.throw('You must specify a season for this request.');
    done();
  });
};

const requiresFeed = data => {
  const obj = { ...data };

  it('requires a feed', done => {
    obj.feed = null;
    expect(() => {
      msf.getData(
        ...Object.values(obj)
      );
    }).to.throw("Unknown feed 'null'");
    done();
  });
};

const requiresDate = data => {
  const obj = JSON.parse(JSON.stringify(data));

  it('requires a date', done => {
    delete obj.params.date;
    expect(() => {
      msf.getData(
        ...Object.values(obj)
      );
    }).to.throw("You must specify a 'date' param for this request.");
    done();
  });

  it('date can not be empty', done => {
    obj.params.date = null;
    expect(() => {
      msf.getData(
        ...Object.values(obj)
      );
    }).to.throw("'date' param can not be empty.");
    done();
  });
};

const requiresGame = data => {
  const obj = JSON.parse(JSON.stringify(data));

  it('requires a game', done => {
    delete obj.params.game;
    expect(() => {
      msf.getData(
        ...Object.values(obj)
      );
    }).to.throw("You must specify a 'game' param for this request.");
    done();
  });

  it('game can not be empty', done => {
    obj.params.game = null;
    expect(() => {
      msf.getData(
        ...Object.values(obj)
      );
    }).to.throw("'game' param can not be empty.");
    done();
  });
};

const requiresWeek = data => {
  const obj = JSON.parse(JSON.stringify(data));

  it('requires a week', done => {
    delete obj.params.week;
    expect(() => {
      msf.getData(
        ...Object.values(obj)
      );
    }).to.throw("You must specify a 'week' param for this request.");
    done();
  });

  it('week can not be empty', done => {
    obj.params.week = null;
    expect(() => {
      msf.getData(
        ...Object.values(obj)
      );
    }).to.throw("'week' param can not be empty.");
    done();
  });
};

const successful = data => {
  it('calls the feed successfully', done => {
    msf.getData(
      ...Object.values(data)
    ).then(response => {
      assert.equal(response, 'response');
      done();
    });
  });
};

module.exports = {
  version,
  requiresSeason,
  requiresFeed,
  requiresDate,
  requiresGame,
  requiresWeek,
  successful
};