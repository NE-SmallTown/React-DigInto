/** @license React vundefined
 * react-events-focus.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ReactEventsFocus = factory());
}(this, (function () { 'use strict';

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

var targetEventTypes = [{ name: 'focus', passive: true, capture: true }, { name: 'blur', passive: true, capture: true }];

function createFocusEvent(type, target) {
  return {
    target: target,
    type: type
  };
}

function dispatchFocusInEvents(context, props, state) {
  var target = state.focusTarget;
  if (props.onFocus) {
    var syntheticEvent = createFocusEvent('focus', target);
    context.dispatchEvent(syntheticEvent, props.onFocus, { discrete: true });
  }
  if (props.onFocusChange) {
    var listener = function () {
      props.onFocusChange(true);
    };
    var _syntheticEvent = createFocusEvent('focuschange', target);
    context.dispatchEvent(_syntheticEvent, listener, { discrete: true });
  }
}

function dispatchFocusOutEvents(context, props, state) {
  var target = state.focusTarget;
  if (props.onBlur) {
    var syntheticEvent = createFocusEvent('blur', target);
    context.dispatchEvent(syntheticEvent, props.onBlur, { discrete: true });
  }
  if (props.onFocusChange) {
    var listener = function () {
      props.onFocusChange(false);
    };
    var _syntheticEvent2 = createFocusEvent('focuschange', target);
    context.dispatchEvent(_syntheticEvent2, listener, { discrete: true });
  }
}

function unmountResponder(context, props, state) {
  if (state.isFocused) {
    dispatchFocusOutEvents(context, props, state);
  }
}

var FocusResponder = {
  targetEventTypes: targetEventTypes,
  createInitialState: function () {
    return {
      isFocused: false,
      focusTarget: null
    };
  },
  onEvent: function (event, context, props, state) {
    var type = event.type,
        target = event.target;


    if (props.disabled) {
      if (state.isFocused) {
        dispatchFocusOutEvents(context, props, state);
        state.isFocused = false;
        state.focusTarget = null;
      }
      return;
    }

    switch (type) {
      case 'focus':
        {
          if (!state.isFocused) {
            // Limit focus events to the direct child of the event component.
            // Browser focus is not expected to bubble.
            state.focusTarget = getEventCurrentTarget(event, context);
            if (state.focusTarget === target) {
              dispatchFocusInEvents(context, props, state);
              state.isFocused = true;
            }
          }
          break;
        }
      case 'blur':
        {
          if (state.isFocused) {
            dispatchFocusOutEvents(context, props, state);
            state.isFocused = false;
            state.focusTarget = null;
          }
          break;
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

var Focus = {
  $$typeof: REACT_EVENT_COMPONENT_TYPE,
  displayName: 'Focus',
  props: null,
  responder: FocusResponder
};

var Focus$1 = Object.freeze({
	default: Focus
});

var Focus$2 = ( Focus$1 && Focus ) || Focus$1;

var focus = Focus$2.default || Focus$2;

return focus;

})));
