/** @license React vundefined
 * react-events-press.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';



if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;














var REACT_EVENT_COMPONENT_TYPE = hasSymbol ? Symbol.for('react.event_component') : 0xead5;


// React event targets

function getEventCurrentTarget(event, context) {
  var target = event.target;
  var currentTarget = target;
  while (currentTarget.parentNode && currentTarget.parentNode.nodeType === Node.ELEMENT_NODE && context.isTargetWithinEventComponent(currentTarget.parentNode)) {
    currentTarget = currentTarget.parentNode;
  }
  return currentTarget;
}

function getEventPointerType(event) {
  var nativeEvent = event.nativeEvent;
  var type = nativeEvent.type,
      pointerType = nativeEvent.pointerType;

  if (pointerType != null) {
    return pointerType;
  }
  if (type.indexOf('mouse') === 0) {
    return 'mouse';
  }
  if (type.indexOf('touch') === 0) {
    return 'touch';
  }
  if (type.indexOf('key') === 0) {
    return 'keyboard';
  }
  return '';
}

function isEventPositionWithinTouchHitTarget(event, context) {
  var nativeEvent = event.nativeEvent;
  var target = event.target;
  return context.isPositionWithinTouchHitTarget(target.ownerDocument, nativeEvent.x, nativeEvent.y);
}

var DEFAULT_PRESS_END_DELAY_MS = 0;
var DEFAULT_PRESS_START_DELAY_MS = 0;
var DEFAULT_LONG_PRESS_DELAY_MS = 500;
var DEFAULT_PRESS_RETENTION_OFFSET = {
  bottom: 20,
  top: 20,
  left: 20,
  right: 20
};

var targetEventTypes = [{ name: 'click', passive: false }, { name: 'keydown', passive: false }, { name: 'keypress', passive: false }, { name: 'contextmenu', passive: false }, 'pointerdown', 'pointercancel'];
var rootEventTypes = ['keyup', 'pointerup', 'pointermove', 'scroll'];

// If PointerEvents is not supported (e.g., Safari), also listen to touch and mouse events.
if (typeof window !== 'undefined' && window.PointerEvent === undefined) {
  targetEventTypes.push('touchstart', 'touchcancel', 'mousedown');
  rootEventTypes.push({ name: 'mouseup', passive: false }, 'touchmove', 'touchend', 'mousemove');
}

function createPressEvent(type, target, pointerType) {
  return {
    target: target,
    type: type,
    pointerType: pointerType
  };
}

function dispatchEvent(context, state, name, listener, options) {
  var target = state.pressTarget;
  var pointerType = state.pointerType;
  var syntheticEvent = createPressEvent(name, target, pointerType);
  context.dispatchEvent(syntheticEvent, listener, options || {
    discrete: true
  });
}

function dispatchPressChangeEvent(context, props, state) {
  var bool = state.isActivePressed;
  var listener = function () {
    props.onPressChange(bool);
  };
  dispatchEvent(context, state, 'presschange', listener);
}

function dispatchLongPressChangeEvent(context, props, state) {
  var bool = state.isLongPressed;
  var listener = function () {
    props.onLongPressChange(bool);
  };
  dispatchEvent(context, state, 'longpresschange', listener);
}

function activate(context, props, state) {
  var wasActivePressed = state.isActivePressed;
  state.isActivePressed = true;

  if (props.onPressStart) {
    dispatchEvent(context, state, 'pressstart', props.onPressStart);
  }
  if (!wasActivePressed && props.onPressChange) {
    dispatchPressChangeEvent(context, props, state);
  }
}

function deactivate(context, props, state) {
  var wasLongPressed = state.isLongPressed;
  state.isActivePressed = false;
  state.isLongPressed = false;

  if (props.onPressEnd) {
    dispatchEvent(context, state, 'pressend', props.onPressEnd);
  }
  if (props.onPressChange) {
    dispatchPressChangeEvent(context, props, state);
  }
  if (wasLongPressed && props.onLongPressChange) {
    dispatchLongPressChangeEvent(context, props, state);
  }
}

function dispatchPressStartEvents(context, props, state) {
  state.isPressed = true;

  if (state.pressEndTimeout !== null) {
    context.clearTimeout(state.pressEndTimeout);
    state.pressEndTimeout = null;
  }

  var dispatch = function () {
    state.isActivePressStart = true;
    activate(context, props, state);

    if ((props.onLongPress || props.onLongPressChange) && !state.isLongPressed) {
      var _delayLongPress = calculateDelayMS(props.delayLongPress, 10, DEFAULT_LONG_PRESS_DELAY_MS);
      state.longPressTimeout = context.setTimeout(function () {
        state.isLongPressed = true;
        state.longPressTimeout = null;
        if (props.onLongPress) {
          dispatchEvent(context, state, 'longpress', props.onLongPress);
        }
        if (props.onLongPressChange) {
          dispatchLongPressChangeEvent(context, props, state);
        }
      }, _delayLongPress);
    }
  };

  if (!state.isActivePressStart) {
    var _delayPressStart = calculateDelayMS(props.delayPressStart, 0, DEFAULT_PRESS_START_DELAY_MS);
    if (_delayPressStart > 0) {
      state.pressStartTimeout = context.setTimeout(function () {
        state.pressStartTimeout = null;
        dispatch();
      }, _delayPressStart);
    } else {
      dispatch();
    }
  }
}

function dispatchPressEndEvents(context, props, state) {
  var wasActivePressStart = state.isActivePressStart;
  var activationWasForced = false;

  state.isActivePressStart = false;
  state.isPressed = false;

  if (state.longPressTimeout !== null) {
    context.clearTimeout(state.longPressTimeout);
    state.longPressTimeout = null;
  }

  if (!wasActivePressStart && state.pressStartTimeout !== null) {
    context.clearTimeout(state.pressStartTimeout);
    state.pressStartTimeout = null;
    // don't activate if a press has moved beyond the responder region
    if (state.isPressWithinResponderRegion) {
      // if we haven't yet activated (due to delays), activate now
      activate(context, props, state);
      activationWasForced = true;
    }
  }

  if (state.isActivePressed) {
    var _delayPressEnd = calculateDelayMS(props.delayPressEnd,
    // if activation and deactivation occur during the same event there's no
    // time for visual user feedback therefore a small delay is added before
    // deactivating.
    activationWasForced ? 10 : 0, DEFAULT_PRESS_END_DELAY_MS);
    if (_delayPressEnd > 0) {
      state.pressEndTimeout = context.setTimeout(function () {
        state.pressEndTimeout = null;
        deactivate(context, props, state);
      }, _delayPressEnd);
    } else {
      deactivate(context, props, state);
    }
  }
}

function isAnchorTagElement(eventTarget) {
  return eventTarget.nodeName === 'A';
}

function isValidKeyPress(key) {
  // Accessibility for keyboards. Space and Enter only.
  return key === ' ' || key === 'Enter';
}

function calculateDelayMS(delay) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var maybeNumber = delay == null ? null : delay;
  return Math.max(min, maybeNumber != null ? maybeNumber : fallback);
}

// TODO: account for touch hit slop
function calculateResponderRegion(target, props) {
  var pressRetentionOffset = objectAssign({}, DEFAULT_PRESS_RETENTION_OFFSET, props.pressRetentionOffset);

  var clientRect = target.getBoundingClientRect();

  var bottom = clientRect.bottom;
  var left = clientRect.left;
  var right = clientRect.right;
  var top = clientRect.top;

  if (pressRetentionOffset) {
    if (pressRetentionOffset.bottom != null) {
      bottom += pressRetentionOffset.bottom;
    }
    if (pressRetentionOffset.left != null) {
      left -= pressRetentionOffset.left;
    }
    if (pressRetentionOffset.right != null) {
      right += pressRetentionOffset.right;
    }
    if (pressRetentionOffset.top != null) {
      top -= pressRetentionOffset.top;
    }
  }

  return {
    bottom: bottom,
    top: top,
    left: left,
    right: right
  };
}

function isPressWithinResponderRegion(nativeEvent, state) {
  var responderRegion = state.responderRegion;

  var event = nativeEvent;

  return responderRegion != null && event.pageX >= responderRegion.left && event.pageX <= responderRegion.right && event.pageY >= responderRegion.top && event.pageY <= responderRegion.bottom;
}

function unmountResponder(context, props, state) {
  if (state.isPressed) {
    dispatchPressEndEvents(context, props, state);
    context.removeRootEventTypes(rootEventTypes);
  }
}

function dispatchCancel(type, nativeEvent, context, props, state) {
  if (state.isPressed) {
    if (type === 'contextmenu' && props.preventDefault !== false) {
      nativeEvent.preventDefault();
    } else {
      state.ignoreEmulatedMouseEvents = false;
      dispatchPressEndEvents(context, props, state);
      context.removeRootEventTypes(rootEventTypes);
    }
  }
}

var PressResponder = {
  targetEventTypes: targetEventTypes,
  createInitialState: function () {
    return {
      didDispatchEvent: false,
      isActivePressed: false,
      isActivePressStart: false,
      isLongPressed: false,
      isPressed: false,
      isPressWithinResponderRegion: true,
      longPressTimeout: null,
      pointerType: '',
      pressEndTimeout: null,
      pressStartTimeout: null,
      pressTarget: null,
      responderRegion: null,
      ignoreEmulatedMouseEvents: false
    };
  },

  stopLocalPropagation: true,
  onEvent: function (event, context, props, state) {
    var target = event.target,
        type = event.type;


    if (props.disabled) {
      dispatchPressEndEvents(context, props, state);
      context.removeRootEventTypes(rootEventTypes);
      state.ignoreEmulatedMouseEvents = false;
      return;
    }
    var nativeEvent = event.nativeEvent;
    var pointerType = getEventPointerType(event);

    switch (type) {
      // START
      case 'pointerdown':
      case 'keydown':
      case 'keypress':
      case 'mousedown':
      case 'touchstart':
        {
          if (!state.isPressed) {
            if (type === 'pointerdown' || type === 'touchstart') {
              state.ignoreEmulatedMouseEvents = true;
            }

            // Ignore unrelated key events
            if (pointerType === 'keyboard') {
              if (!isValidKeyPress(nativeEvent.key)) {
                return;
              }
            }

            // Ignore emulated mouse events and mouse pressing on touch hit target
            // area
            if (type === 'mousedown') {
              if (state.ignoreEmulatedMouseEvents || isEventPositionWithinTouchHitTarget(event, context)) {
                return;
              }
            }

            // Ignore any device buttons except left-mouse and touch/pen contact
            if (nativeEvent.button > 0) {
              return;
            }

            state.pointerType = pointerType;
            state.pressTarget = target;
            state.isPressWithinResponderRegion = true;
            dispatchPressStartEvents(context, props, state);
            context.addRootEventTypes(target.ownerDocument, rootEventTypes);
          } else {
            // Prevent spacebar press from scrolling the window
            if (isValidKeyPress(nativeEvent.key) && nativeEvent.key === ' ') {
              nativeEvent.preventDefault();
            }
          }
          break;
        }

      // CANCEL
      case 'contextmenu':
        {
          dispatchCancel(type, nativeEvent, context, props, state);
          break;
        }

      case 'click':
        {
          if (isAnchorTagElement(target)) {
            var _ref = nativeEvent,
                ctrlKey = _ref.ctrlKey,
                metaKey = _ref.metaKey,
                shiftKey = _ref.shiftKey;
            // Check "open in new window/tab" and "open context menu" key modifiers

            var _preventDefault = props.preventDefault;
            if (_preventDefault !== false && !shiftKey && !metaKey && !ctrlKey) {
              nativeEvent.preventDefault();
            }
          }
          break;
        }
    }
  },
  onRootEvent: function (event, context, props, state) {
    var target = event.target,
        type = event.type;


    var nativeEvent = event.nativeEvent;
    var pointerType = getEventPointerType(event);

    switch (type) {
      // MOVE
      case 'pointermove':
      case 'mousemove':
      case 'touchmove':
        {
          if (state.isPressed) {
            // Ignore emulated events (pointermove will dispatch touch and mouse events)
            // Ignore pointermove events during a keyboard press
            if (state.pointerType !== pointerType) {
              return;
            }

            if (state.responderRegion == null) {
              state.responderRegion = calculateResponderRegion(getEventCurrentTarget(event, context), props);
            }
            if (isPressWithinResponderRegion(nativeEvent, state)) {
              state.isPressWithinResponderRegion = true;
              if (props.onPressMove) {
                dispatchEvent(context, state, 'pressmove', props.onPressMove, {
                  discrete: false
                });
              }
            } else {
              state.isPressWithinResponderRegion = false;
              dispatchPressEndEvents(context, props, state);
            }
          }
          break;
        }

      // END
      case 'pointerup':
      case 'keyup':
      case 'mouseup':
      case 'touchend':
        {
          if (state.isPressed) {
            // Ignore unrelated keyboard events
            if (pointerType === 'keyboard') {
              if (!isValidKeyPress(nativeEvent.key)) {
                return;
              }
            }

            var wasLongPressed = state.isLongPressed;
            dispatchPressEndEvents(context, props, state);

            if (state.pressTarget !== null && props.onPress) {
              if (context.isTargetWithinElement(target, state.pressTarget)) {
                if (!(wasLongPressed && props.onLongPressShouldCancelPress && props.onLongPressShouldCancelPress())) {
                  dispatchEvent(context, state, 'press', props.onPress);
                }
              }
            }
            context.removeRootEventTypes(rootEventTypes);
          } else if (type === 'mouseup' && state.ignoreEmulatedMouseEvents) {
            state.ignoreEmulatedMouseEvents = false;
          }
          break;
        }

      // CANCEL
      case 'pointercancel':
      case 'scroll':
      case 'touchcancel':
        {
          dispatchCancel(type, nativeEvent, context, props, state);
        }
    }
  },
  onUnmount: function (context, props, state) {
    unmountResponder(context, props, state);
  },
  onOwnershipChange: function (context, props, state) {
    unmountResponder(context, props, state);
  }
};

var Press = {
  $$typeof: REACT_EVENT_COMPONENT_TYPE,
  displayName: 'Press',
  props: null,
  responder: PressResponder
};

var Press$1 = Object.freeze({
	default: Press
});

var Press$2 = ( Press$1 && Press ) || Press$1;

var press = Press$2.default || Press$2;

module.exports = press;
  })();
}
