var API_v1_0 = require('./API_v1_0');
var util = require('util');

// Public Functions
var API_v1_1 = function(v, storeT, storeL) {
  API_v1_0.apply(this, arguments);

  this.baseUrl = "https://api.mysportsfeeds.com/v1.1/pull";
}

util.inherits(API_v1_1, API_v1_0);

exports = module.exports = API_v1_1;
