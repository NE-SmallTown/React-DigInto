/** @license React vundefined
 * react-events-hover.development.js
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
	(global.ReactEventsHover = factory());
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

var DEFAULT_HOVER_END_DELAY_MS = 0;
var DEFAULT_HOVER_START_DELAY_MS = 0;

var targetEventTypes = ['pointerover', 'pointermove', 'pointerout', 'pointercancel'];

// If PointerEvents is not supported (e.g., Safari), also listen to touch and mouse events.
if (typeof window !== 'undefined' && window.PointerEvent === undefined) {
  targetEventTypes.push('touchstart', 'mouseover', 'mousemove', 'mouseout');
}

function createHoverEvent(type, target) {
  return {
    target: target,
    type: type
  };
}

function dispatchHoverChangeEvent(context, props, state) {
  var bool = state.isActiveHovered;
  var listener = function () {
    props.onHoverChange(bool);
  };
  var syntheticEvent = createHoverEvent('hoverchange', state.hoverTarget);
  context.dispatchEvent(syntheticEvent, listener, { discrete: true });
}

function dispatchHoverStartEvents(event, context, props, state) {
  var target = state.hoverTarget;
  if (event !== null) {
    var nativeEvent = event.nativeEvent;

    if (context.isTargetDirectlyWithinEventComponent(nativeEvent.relatedTarget)) {
      return;
    }
  }

  state.isHovered = true;

  if (state.hoverEndTimeout !== null) {
    context.clearTimeout(state.hoverEndTimeout);
    state.hoverEndTimeout = null;
  }

  var activate = function () {
    state.isActiveHovered = true;

    if (props.onHoverStart) {
      var syntheticEvent = createHoverEvent('hoverstart', target);
      context.dispatchEvent(syntheticEvent, props.onHoverStart, {
        discrete: true
      });
    }
    if (props.onHoverChange) {
      dispatchHoverChangeEvent(context, props, state);
    }
  };

  if (!state.isActiveHovered) {
    var _delayHoverStart = calculateDelayMS(props.delayHoverStart, 0, DEFAULT_HOVER_START_DELAY_MS);
    if (_delayHoverStart > 0) {
      state.hoverStartTimeout = context.setTimeout(function () {
        state.hoverStartTimeout = null;
        activate();
      }, _delayHoverStart);
    } else {
      activate();
    }
  }
}

function dispatchHoverEndEvents(event, context, props, state) {
  var target = state.hoverTarget;
  if (event !== null) {
    var nativeEvent = event.nativeEvent;

    if (context.isTargetDirectlyWithinEventComponent(nativeEvent.relatedTarget)) {
      return;
    }
  }

  state.isHovered = false;

  if (state.hoverStartTimeout !== null) {
    context.clearTimeout(state.hoverStartTimeout);
    state.hoverStartTimeout = null;
  }

  var deactivate = function () {
    state.isActiveHovered = false;

    if (props.onHoverEnd) {
      var syntheticEvent = createHoverEvent('hoverend', target);
      context.dispatchEvent(syntheticEvent, props.onHoverEnd, { discrete: true });
    }
    if (props.onHoverChange) {
      dispatchHoverChangeEvent(context, props, state);
    }

    state.isOverTouchHitTarget = false;
    state.hoverTarget = null;
    state.ignoreEmulatedMouseEvents = false;
    state.isTouched = false;
  };

  if (state.isActiveHovered) {
    var _delayHoverEnd = calculateDelayMS(props.delayHoverEnd, 0, DEFAULT_HOVER_END_DELAY_MS);
    if (_delayHoverEnd > 0) {
      state.hoverEndTimeout = context.setTimeout(function () {
        deactivate();
      }, _delayHoverEnd);
    } else {
      deactivate();
    }
  }
}

function calculateDelayMS(delay) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var maybeNumber = delay == null ? null : delay;
  return Math.max(min, maybeNumber != null ? maybeNumber : fallback);
}

function unmountResponder(context, props, state) {
  if (state.isHovered) {
    dispatchHoverEndEvents(null, context, props, state);
  }
}

function isEmulatedMouseEvent(event, state) {
  var type = event.type;

  return state.ignoreEmulatedMouseEvents && (type === 'mousemove' || type === 'mouseover' || type === 'mouseout');
}

var HoverResponder = {
  targetEventTypes: targetEventTypes,
  createInitialState: function () {
    return {
      isActiveHovered: false,
      isHovered: false,
      isOverTouchHitTarget: false,
      isTouched: false,
      hoverStartTimeout: null,
      hoverEndTimeout: null,
      ignoreEmulatedMouseEvents: false
    };
  },

  stopLocalPropagation: true,
  onEvent: function (event, context, props, state) {
    var type = event.type;


    if (props.disabled) {
      if (state.isHovered) {
        dispatchHoverEndEvents(event, context, props, state);
        state.ignoreEmulatedMouseEvents = false;
      }
      if (state.isTouched) {
        state.isTouched = false;
      }
      return;
    }
    var pointerType = getEventPointerType(event);

    switch (type) {
      // START
      case 'pointerover':
      case 'mouseover':
      case 'touchstart':
        {
          if (!state.isHovered) {
            // Prevent hover events for touch
            if (state.isTouched || pointerType === 'touch') {
              state.isTouched = true;
              return;
            }

            // Prevent hover events for emulated events
            if (isEmulatedMouseEvent(event, state)) {
              return;
            }

            if (isEventPositionWithinTouchHitTarget(event, context)) {
              state.isOverTouchHitTarget = true;
              return;
            }
            state.hoverTarget = getEventCurrentTarget(event, context);
            state.ignoreEmulatedMouseEvents = true;
            dispatchHoverStartEvents(event, context, props, state);
          }
          return;
        }

      // MOVE
      case 'pointermove':
      case 'mousemove':
        {
          if (state.isHovered && !isEmulatedMouseEvent(event, state)) {
            if (state.isHovered) {
              if (state.isOverTouchHitTarget) {
                // If we were moving over the TouchHitTarget and have now moved
                // over the Responder target
                if (!isEventPositionWithinTouchHitTarget(event, context)) {
                  dispatchHoverStartEvents(event, context, props, state);
                  state.isOverTouchHitTarget = false;
                }
              } else {
                // If we were moving over the Responder target and have now moved
                // over the TouchHitTarget
                if (isEventPositionWithinTouchHitTarget(event, context)) {
                  dispatchHoverEndEvents(event, context, props, state);
                  state.isOverTouchHitTarget = true;
                } else {
                  if (props.onHoverMove && state.hoverTarget !== null) {
                    var syntheticEvent = createHoverEvent('hovermove', state.hoverTarget);
                    context.dispatchEvent(syntheticEvent, props.onHoverMove, {
                      discrete: false
                    });
                  }
                }
              }
            }
          }
          return;
        }

      // END
      case 'pointerout':
      case 'pointercancel':
      case 'mouseout':
      case 'touchcancel':
      case 'touchend':
        {
          if (state.isHovered) {
            dispatchHoverEndEvents(event, context, props, state);
            state.ignoreEmulatedMouseEvents = false;
          }
          if (state.isTouched) {
            state.isTouched = false;
          }
          return;
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

var Hover = {
  $$typeof: REACT_EVENT_COMPONENT_TYPE,
  displayName: 'Hover',
  props: null,
  responder: HoverResponder
};

var Hover$1 = Object.freeze({
	default: Hover
});

var Hover$2 = ( Hover$1 && Hover ) || Hover$1;

var hover = Hover$2.default || Hover$2;

return hover;

})));
