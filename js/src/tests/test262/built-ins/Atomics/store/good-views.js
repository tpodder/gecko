// |reftest| skip-if(!this.hasOwnProperty('Atomics')||!this.hasOwnProperty('SharedArrayBuffer')) -- Atomics,SharedArrayBuffer is not enabled unconditionally
// Copyright (C) 2017 Mozilla Corporation.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-atomics.store
description: Test Atomics.store on arrays that allow atomic operations.
includes: [testAtomics.js, testTypedArray.js]
features: [ArrayBuffer, arrow-function, Atomics, DataView, for-of, let, SharedArrayBuffer, TypedArray]
---*/

var sab = new SharedArrayBuffer(1024);
var ab = new ArrayBuffer(16);
var views = intArrayConstructors.slice();

testWithTypedArrayConstructors(function(TA) {
  // Make it interesting - use non-zero byteOffsets and non-zero indexes.

  var view = new TA(sab, 32, 20);
  var control = new TA(ab, 0, 2);

  for (let val of [10, -5,
      12345,
      123456789,
      Math.PI,
      "33",
      {
        valueOf: () => 33
      },
      undefined
    ])
  {
    assert.sameValue(Atomics.store(view, 3, val), ToInteger(val),
      "Atomics.store returns its third argument (" + val + ") converted to Integer, not the input value nor the value that was stored");

    control[0] = val;
    assert.sameValue(view[3], control[0]);
  }

  // In-bounds boundary cases for indexing
  testWithAtomicsInBoundsIndices(function(IdxGen) {
    let Idx = IdxGen(view);
    view.fill(0);
    Atomics.store(view, Idx, 37);
    assert.sameValue(Atomics.load(view, Idx), 37);
  });
}, views);

function ToInteger(v) {
  v = +v;
  if (isNaN(v)) {
    return 0;
  }
  if (v == 0 || !isFinite(v)) {
    return v;
  }
  if (v < 0) {
    return -Math.floor(Math.abs(v));
  }
  return Math.floor(v);
}

reportCompare(0, 0);
