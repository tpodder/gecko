// |reftest| skip-if(!this.hasOwnProperty('Atomics')) -- Atomics is not enabled unconditionally
// Copyright (C) 2018 Amal Hussein. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-atomics.wait
description: >
  Throws a TypeError if typedArray arg is not an Int32Array
info: |
  Atomics.wait( typedArray, index, value, timeout )

  1.Let buffer be ? ValidateSharedIntegerTypedArray(typedArray, true).
    ...
      5.If onlyInt32 is true, then
        If typeName is not "Int32Array", throw a TypeError exception.
features: [Atomics, Float32Array, Float64Array, Int8Array, TypedArray, Uint16Array, Uint8Array, Uint8ClampedArray]
---*/

var poisoned = {
  valueOf: function() {
    throw new Test262Error("should not evaluate this code");
  }
};

assert.throws(TypeError, function() {
  Atomics.wait(new Float64Array(), poisoned, poisoned, poisoned);
}, 'Float64Array');

assert.throws(TypeError, function() {
  Atomics.wait(new Float32Array(), poisoned, poisoned, poisoned);
}, 'Float32Array');

assert.throws(TypeError, function() {
  Atomics.wait(new Int16Array(), poisoned, poisoned, poisoned);
}, 'Int16Array');

assert.throws(TypeError, function() {
  Atomics.wait(new Int8Array(), poisoned, poisoned, poisoned);
}, 'Int8Array');

assert.throws(TypeError, function() {
  Atomics.wait(new Uint32Array(),  poisoned, poisoned, poisoned);
}, 'Uint32Array');

assert.throws(TypeError, function() {
  Atomics.wait(new Uint16Array(), poisoned, poisoned, poisoned);
}, 'Uint16Array');

assert.throws(TypeError, function() {
  Atomics.wait(new Uint8Array(), poisoned, poisoned, poisoned);
}, 'Uint8Array');

assert.throws(TypeError, function() {
  Atomics.wait(new Uint8ClampedArray(), poisoned, poisoned, poisoned);
}, 'Uint8ClampedArray');

reportCompare(0, 0);
