var API_v2_0 = require('./API_v2_0');
var util = require('util');

// Public Functions
var API_v2_1 = function (v, storeT, storeL) {
  API_v2_0.apply(this, arguments);

  this.baseUrl = "https://api.mysportsfeeds.com/v2.1/pull";
};

util.inherits(API_v2_1, API_v2_0);

exports = module.exports = API_v2_1;
