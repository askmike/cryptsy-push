var Cryptsy = require('./cryptsy');

// pass in a market to watch
var cryptsy = new Cryptsy(1);
// or multiple
// var cryptsy2 = new Cryptsy([10, 11, 12]);

// or after instantiation
  // as an array
cryptsy.subscribe([2, 3]);
  // as a number
cryptsy.subscribe(4);

cryptsy.on('trade', function(trade) {
  console.log('new trade:', trade);
});