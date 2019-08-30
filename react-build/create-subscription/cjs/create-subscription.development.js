/** @license React vundefined
 * create-subscription.development.js
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

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

// Do not require this module directly! Use normal `invariant` calls with
// template literal strings. The messages will be converted to ReactError during
// build, and in production they will be minified.

// Do not require this module directly! Use normal `invariant` calls with
// template literal strings. The messages will be converted to ReactError during
// build, and in production they will be minified.
function ReactError(error) {
  error.name = 'Invariant Violation';
  return error;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */
var warningWithoutStack = function () {};

{
  warningWithoutStack = function (condition, format) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (format === undefined) {
      throw new Error('`warningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (args.length > 8) {
      // Check before the condition to catch violations early.
      throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
    }

    if (condition) {
      return;
    }

    if (typeof console !== 'undefined') {
      var argsWithFormat = args.map(function (item) {
        return '' + item;
      });
      argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
      // breaks IE9: https://github.com/facebook/react/issues/13610

      Function.prototype.apply.call(console.error, console, argsWithFormat);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      throw new Error(message);
    } catch (x) {}
  };
}

var warningWithoutStack$1 = warningWithoutStack;

function createSubscription(config) {
  var getCurrentValue = config.getCurrentValue,
      _subscribe = config.subscribe;
  !(typeof getCurrentValue === 'function') ? warningWithoutStack$1(false, 'Subscription must specify a getCurrentValue function') : void 0;
  !(typeof _subscribe === 'function') ? warningWithoutStack$1(false, 'Subscription must specify a subscribe function') : void 0;

  // Reference: https://gist.github.com/bvaughn/d569177d70b50b58bff69c3c4a5353f3
  var Subscription =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(Subscription, _React$Component);

    function Subscription() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this.state = {
        source: _this.props.source,
        value: _this.props.source != null ? getCurrentValue(_this.props.source) : undefined
      };
      _this._hasUnmounted = false;
      _this._unsubscribe = null;
      return _this;
    }

    Subscription.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.source !== prevState.source) {
        return {
          source: nextProps.source,
          value: nextProps.source != null ? getCurrentValue(nextProps.source) : undefined
        };
      }

      return null;
    };

    var _proto = Subscription.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this.subscribe();
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      if (this.state.source !== prevState.source) {
        this.unsubscribe();
        this.subscribe();
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.unsubscribe(); // Track mounted to avoid calling setState after unmounting
      // For source like Promises that can't be unsubscribed from.

      this._hasUnmounted = true;
    };

    _proto.render = function render() {
      return this.props.children(this.state.value);
    };

    _proto.subscribe = function subscribe() {
      var _this2 = this;

      var source = this.state.source;

      if (source != null) {
        var _callback = function (value) {
          if (_this2._hasUnmounted) {
            return;
          }

          _this2.setState(function (state) {
            // If the value is the same, skip the unnecessary state update.
            if (value === state.value) {
              return null;
            } // If this event belongs to an old or uncommitted data source, ignore it.


            if (source !== state.source) {
              return null;
            }

            return {
              value: value
            };
          });
        }; // Store the unsubscribe method for later (in case the subscribable prop changes).


        var unsubscribe = _subscribe(source, _callback);

        (function () {
          if (!(typeof unsubscribe === 'function')) {
            {
              throw ReactError(Error("A subscription must return an unsubscribe function."));
            }
          }
        })(); // It's safe to store unsubscribe on the instance because
        // We only read or write that property during the "commit" phase.


        this._unsubscribe = unsubscribe; // External values could change between render and mount,
        // In some cases it may be important to handle this case.

        var _value = getCurrentValue(this.props.source);

        if (_value !== this.state.value) {
          this.setState({
            value: _value
          });
        }
      }
    };

    _proto.unsubscribe = function unsubscribe() {
      if (typeof this._unsubscribe === 'function') {
        this._unsubscribe();
      }

      this._unsubscribe = null;
    };

    return Subscription;
  }(React.Component);

  return Subscription;
}

exports.createSubscription = createSubscription;
  })();
}
