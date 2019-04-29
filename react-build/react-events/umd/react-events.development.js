/** @license React vundefined
 * react-events.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.ReactEvents = {})));
}(this, (function (exports) { 'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;















var REACT_EVENT_TARGET_TYPE = hasSymbol ? Symbol.for('react.event_target') : 0xead6;

// React event targets
var REACT_EVENT_TARGET_TOUCH_HIT = hasSymbol ? Symbol.for('react.event_target.touch_hit') : 0xead7;
var REACT_EVENT_FOCUS_TARGET = hasSymbol ? Symbol.for('react.event_target.focus') : 0xead8;
var REACT_EVENT_PRESS_TARGET = hasSymbol ? Symbol.for('react.event_target.press') : 0xead9;

var TouchHitTarget = {
  $$typeof: REACT_EVENT_TARGET_TYPE,
  type: REACT_EVENT_TARGET_TOUCH_HIT
};

var FocusTarget = {
  $$typeof: REACT_EVENT_TARGET_TYPE,
  type: REACT_EVENT_FOCUS_TARGET
};

var PressTarget = {
  $$typeof: REACT_EVENT_TARGET_TYPE,
  type: REACT_EVENT_PRESS_TARGET
};

exports.TouchHitTarget = TouchHitTarget;
exports.FocusTarget = FocusTarget;
exports.PressTarget = PressTarget;

Object.defineProperty(exports, '__esModule', { value: true });

})));
