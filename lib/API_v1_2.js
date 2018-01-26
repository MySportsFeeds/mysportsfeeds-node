var API_v1_1 = require('./API_v1_1');
var util = require('util');

// Public Functions
var API_v1_2 = function(v, storeT, storeL) {
  API_v1_1.apply(this, arguments);

  this.baseUrl = "https://api.mysportsfeeds.com/v1.2/pull";
}

util.inherits(API_v1_2, API_v1_1);

exports = module.exports = API_v1_2;
