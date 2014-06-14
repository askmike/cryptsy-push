var Pusher = require('pusher-node-client').PusherClient;
var bindAll = require('lodash.bindall');

var Cryptsy = function(market) {
  bindAll(this);

  this.client = new Pusher({
    key: 'cb65d0a7a72cd94adf1f',
    appId: '',
    secret: ''
  });

  this.queue = [];
  this.connected = false;

  if(market)
    this.subscribe(market);

  this.client.on('connect', this._subscribeQueue);
  this.client.connect();
}

var util = require('util');
var EventEmitter = require('events').EventEmitter;
util.inherits(Cryptsy, EventEmitter);

// subscribe if connected, else queue until
// we are connected
Cryptsy.prototype.subscribe = function(market) {

  // if array, recurse
  if(market instanceof Array)
    return market.forEach(this.subscribe);

  var chanName = 'trade.' + market;

  if(this.connected)
    this._subscribe(chanName);
  else
    this.queue.push(chanName);
};

Cryptsy.prototype._subscribeQueue = function() {
  this.connected = true;
  this.queue.forEach(this._subscribe);
  this.queue = [];
}

Cryptsy.prototype._subscribe = function(market) {
  this.client.subscribe(market)
    .on('message', this.handle);
}

Cryptsy.prototype.handle = function(e) {
  this.emit('trade', e);
};

module.exports = Cryptsy;
