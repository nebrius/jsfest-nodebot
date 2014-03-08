var five = require('johnny-five'),
    board = new five.Board();

var LEFT_FORWARD = 180;
var RIGHT_FORWARD = 0;
var LEFT_REVERSE = 0;
var RIGHT_REVERSE = 180;

board.on('ready', function() {

  var leftServo = new five.Servo({
    pin: 11,
    type: 'continuous'
  });

  var rightServo = new five.Servo({
    pin: 10,
    type: 'continuous'
  });

  var control = require('./control');
  control.on('move', function (direction) {
    switch(direction) {
    case 'none':
      leftServo.stop();
      rightServo.stop();
      break;
    case 'up':
      leftServo.to(LEFT_FORWARD);
      rightServo.to(RIGHT_FORWARD);
      break;
    case 'upright':
      leftServo.to(LEFT_FORWARD);
      rightServo.stop();
      break;
    case 'right':
      leftServo.to(LEFT_FORWARD);
      rightServo.to(RIGHT_REVERSE);
      break;
    case 'downright':
      leftServo.to(LEFT_REVERSE);
      rightServo.stop();
      break;
    case 'down':
      leftServo.to(LEFT_REVERSE);
      rightServo.to(RIGHT_REVERSE);
      break;
    case 'downleft':
      leftServo.stop();
      rightServo.to(RIGHT_REVERSE);
      break;
    case 'left':
      leftServo.to(LEFT_REVERSE);
      rightServo.to(RIGHT_FORWARD);
      break;
    case 'upleft':
      leftServo.stop();
      rightServo.to(RIGHT_FORWARD);
      break;
    }
  });

  console.log('ready!');

});