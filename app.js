var PubNub = require('pubnub');

var pubnub = new PubNub({
  publishKey: 'pub-c-b9b4ecf9-a07b-4176-a820-7adf6a20bb1d',
  subscribeKey: 'sub-c-91201a38-425d-11e7-b66e-0619f8945a4f'
});

// var arc = 3; //slow
var arc = 36; //fast

var time = 0;
var locked = false;

matrix.led('black').render();

matrix.service('fist').start().then(function() {
  if(!locked) {
    time = time + 1;
    matrix.led({color: 'blue', start: 0, arc: arc*time}).render();

    if(time === 360/arc) {
      locked = true;

      matrix.led('green').render();

      pubnub.publish({message: {button: 'right'}, channel: 'slider'}, function() {
        setTimeout(function() {
          time = 0;
          locked = false;
          matrix.led('black').render();
        }, 5000);
      });
    }
  }
});
