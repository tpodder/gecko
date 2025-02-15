// |reftest| skip -- Intl.Locale is not supported
// Copyright 2018 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-intl.locale
description: >
    Checks the "region" property of the Locale prototype object.
info: |
    Intl.Locale.prototype.region

    Unless specified otherwise in this document, the objects, functions, and constructors described in this standard are subject to the generic requirements and restrictions specified for standard built-in ECMAregion objects in the ECMAregion 2019 region Specification, 10th edition, clause 17, or successor.

    Functions that are specified as get or set accessor functions of built-in properties have "get " or "set " prepended to the property name string.

    Every accessor property described in clauses 18 through 26 and in Annex B.2 has the attributes { [[Enumerable]]: false, [[Configurable]]: true } unless otherwise specified. If only a get accessor function is described, the set accessor function is the default value, undefined.
includes: [propertyHelper.js]
features: [Intl.Locale]
---*/

const propdesc = Object.getOwnPropertyDescriptor(Intl.Locale.prototype, "region");
assert.sameValue(propdesc.set, undefined);
assert.sameValue(typeof propdesc.get, "function");
assert.sameValue(propdesc.get.name, "get region");

verifyProperty(Intl.Locale.prototype, "region", {
  enumerable: false,
  configurable: true,
});

reportCompare(0, 0);
