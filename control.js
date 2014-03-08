var events = require('events');
var evt = module.exports = new events.EventEmitter();

var http = require('http');
var webpage = require('fs').readFileSync('./control.html').toString();
http.createServer(function (req, res) {
  var url = require('url').parse(req.url);
  var set = url.path.match(/^\/set\/(.*)$/);
  if (set) {
    console.log('move', set[1]);
    evt.emit('move', set[1]);
    res.end();
  } else if (url.path == '/close') {
    console.log('close');
    evt.emit('close');
    res.end();
  } else if (url.path == '/open') {
    console.log('open');
    evt.emit('open');
    res.end();
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(webpage);
  }
}).listen(8000, '127.0.0.1');
