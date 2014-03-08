var five = require("johnny-five"),
    // or "./lib/johnny-five" when running from the source
    board = new five.Board();


var LEFT_FORWARD = 180;
var RIGHT_FORWARD = 0;
var LEFT_REVERSE = 0;
var RIGHT_REFERSE = 180;

board.on('ready', function() {

  var leftServo = new five.Servo({
    pin: 11,
    type: 'continuous'
  });

  var rightServo = new five.Servo({
    pin: 10,
    type: 'continuous'
  });

  leftServo.to(LEFT_FORWARD);
  rightServo.to(RIGHT_FORWARD);

  setTimeout(function () {
    leftServo.to(LEFT_REVERSE);
    rightServo.to(RIGHT_REFERSE);

    setTimeout(function () {
      leftServo.stop();
      rightServo.stop();
    }, 1000);
  }, 1000);

});