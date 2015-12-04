# heapdump-interval

## Example

by default **heapdump-interval** will write a heapdump file every 6 hours to
`/var/heapdump/<appname>/<ISO Date>.heapdump` if `/etc/<appname>/heapdump` exists.

```javascript
var heapdumpInterval = require('heapdump-interval');

heapdumpInterval({
  appname: 'some-app'
})
.on('dump', function (filename) {
  console.log('Heap dump saved to', filename);
});
```

Custom options are available.

```javascript
var heapdumpInterval = require('heapdump-interval');

heapdumpInterval({
  ifExists: '/etc/myapp/heapdump',
  heapDir: '/Volumes/heapdumps',
  interval: 600000 // every 10 minutes
})
.on('dump', function (filename) {
  console.log('Heap dump saved to', filename);
});
```
