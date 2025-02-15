// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 9.5.6
description: >
    Throws a TypeError exception if handler is null.
---*/

var p = Proxy.revocable({}, {});

p.revoke();

assert.throws(TypeError, function() {
  Object.defineProperty(p.proxy, "foo", {
    configurable: true,
    enumerable: true
  });
});

reportCompare(0, 0);
