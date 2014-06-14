# cryptsy-push

Nodejs Wrapper for the Cryptsy Pusher API.

## Howto

Install:

    npm install cryptsy-push

Use:

    var Cryptsy = require('cryptsy');

    var cryptsy = new Cryptsy(1); // market to watch
    cryptsy.on('trade', function(trade) {
      console.log('new trade:', trade);
    });

Checkout `cryptsy-push/example.js` for an example.