async-event
===========

Simple async event handling and interception.

Install
-------

`npm install --save async-event`

Usage
-----

*Requires a promise implementation to be global*

```javascript
var AsyncEvent = require('async-event');

var user = { id: 123 };
var event = new AsyncEvent(user);

myPubSub.publish('my-event', event);

event
  .then(function() {
    console.log('Passed async validation!');
  })
  .catch(function() {
    console.log('Failed async validation :(');
  });

// Some other listener

myPubSub.subscribe('my-event', function(event) {
  event.intercept(function(user) {
    return fetch('/user/123/validate', {
      method: 'POST',
      body: JSON.stringify(user)
    });
  })
});
```

API
---
<a name="AsyncEvent"></a>
## AsyncEvent(value, promise) ⇒ <code>AsyncEvent</code>
The constructor.

| Param   | Type                 | Description                  |                                                          
| --------| ---------------------| ---------------------------- |
| value   | <code>any</code>     | The initial value            |
| promise | <code>Promise</code> | An optional starting promise |

<a name="intercept"></a>
## intercept(handler) ⇒ <code>void</code>
A function that can perform a sync or async task. Handlers are executed in serial order.

| Param   | Type                  | Description            |                                                          
| --------| --------------------- | ---------------------- |
| handler | <code>Function</code> | The intercept function |

<a name="getValue"></a>
## getValue() ⇒ <code>any</code>
Gets the initial value the event initialized with.

<a name="then"></a>
## then(fn) ⇒ <code>Promise</code>
Delegates to the internal Promise. Subscribes to the chain at that point in time. This
will not add to the chain. This can be used to perform a task that you would want to happen
in parallel.

| Param   | Type                  | Description          |                                                          
| --------| --------------------- | -------------------- |
| fn      | <code>Function</code> | The promise function |

<a name="catch"></a>
## catch(fn) ⇒ <code>Promise</code>
Same as `then` except the catch equivalent.

| Param   | Type                  | Description          |                                                          
| --------| --------------------- | -------------------- |
| fn      | <code>Function</code> | The promise function |
