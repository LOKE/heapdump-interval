var heapdump = require('heapdump');
var fs = require('fs');
var resolve = require('path').resolve;
var EventEmitter = require('events').EventEmitter;

function heapdumpInterval(options) {
  var appname = options.appname;
  var ifExists = options.ifExists || resolve('/etc', appname, 'heapdump');
  var heapDir = options.heapDir || resolve('/var/heapdump', appname);
  var interval = options.interval || 6 * 60 * 60 * 1000; // 6 hour default
  var emitter = new EventEmitter();

  var stat = fs.statSync(heapDir)
  if (!stat.isDirectory()) throw new Error(heapDir + 'is not a directory');


  function dump() {
    fs.stat(ifExists, function (err, stat) {
      if (err) return;

      var filename = resolve(heapDir, (new Date()).toISOString() + '.heapsnapshot')

      heapdump.writeSnapshot(filename, function (err, filename) {
        if (err) {
          return emitter.emit('error', err);
        }
        emitter.emit('dump', filename);
      });
    })

  }

  setInterval(dump, interval).unref();

  return emitter;
}

module.exports = heapdumpInterval;
