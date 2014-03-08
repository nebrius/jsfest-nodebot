var five = require('johnny-five'),
    board = new five.Board({
      repl: false
    });

var LEFT_FORWARD = 180;
var LEFT_FORWARD_SLOW = 92.5;
var RIGHT_FORWARD = 0;
var RIGHT_FORWARD_SLOW = 87.5;
var LEFT_REVERSE = 0;
var LEFT_REVERSE_SLOW = 87.5;
var RIGHT_REVERSE = 180;
var RIGHT_REVERSE_SLOW = 92.5;
var CLAW_OPEN = 80;
var CLAW_CLOSED = 100;

board.on('ready', function() {

  var leftServo = new five.Servo({
    pin: 11,
    type: 'continuous'
  });

  var rightServo = new five.Servo({
    pin: 10,
    type: 'continuous'
  });

  var clawServo = new five.Servo(12);

  leftServo.stop();
  rightServo.stop();
  clawServo.to(CLAW_OPEN);

  var control = require('./control');
  control.on('move', function (direction) {
    console.log('moving: ' + direction);
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
      rightServo.to(RIGHT_FORWARD_SLOW);
      break;
    case 'right':
      leftServo.to(LEFT_FORWARD);
      rightServo.to(RIGHT_REVERSE);
      break;
    case 'downright':
      leftServo.to(LEFT_REVERSE);
      rightServo.to(RIGHT_REVERSE_SLOW);
      break;
    case 'down':
      leftServo.to(LEFT_REVERSE);
      rightServo.to(RIGHT_REVERSE);
      break;
    case 'downleft':
      leftServo.to(LEFT_REVERSE_SLOW);
      rightServo.to(RIGHT_REVERSE);
      break;
    case 'left':
      leftServo.to(LEFT_REVERSE);
      rightServo.to(RIGHT_FORWARD);
      break;
    case 'upleft':
      leftServo.to(LEFT_FORWARD_SLOW);
      rightServo.to(RIGHT_FORWARD);
      break;
    }
  });

  control.on('close', function() {
    console.log('closing');
    clawServo.to(CLAW_CLOSED);
  });

  control.on('open', function() {
    console.log('opening');
    clawServo.to(CLAW_OPEN);
  });

  console.log('ready!');

});