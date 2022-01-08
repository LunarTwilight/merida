# merida
simple error/warn color highlighting for node

## usage
```js
require('merida').init();

console.error('this is an error');
console.warn('this is a warning');
```

or

```js
const { error, warn } = require('merida');

error('this is an error');
warn('this is a warning');
```