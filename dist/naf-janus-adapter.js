/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/debug/src/debug.js":
/*!*****************************************!*\
  !*** ./node_modules/debug/src/debug.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "./node_modules/minijanus/minijanus.js":
/*!*********************************************!*\
  !*** ./node_modules/minijanus/minijanus.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Represents a handle to a single Janus plugin on a Janus session. Each WebRTC connection to the Janus server will be
 * associated with a single handle. Once attached to the server, this handle will be given a unique ID which should be
 * used to associate it with future signalling messages.
 *
 * See https://janus.conf.meetecho.com/docs/rest.html#handles.
 **/
function JanusPluginHandle(session) {
  this.session = session;
  this.id = undefined;
}

/** Attaches this handle to the Janus server and sets its ID. **/
JanusPluginHandle.prototype.attach = function(plugin) {
  var payload = { plugin: plugin, "force-bundle": true, "force-rtcp-mux": true };
  return this.session.send("attach", payload).then(resp => {
    this.id = resp.data.id;
    return resp;
  });
};

/** Detaches this handle. **/
JanusPluginHandle.prototype.detach = function() {
  return this.send("detach");
};

/** Registers a callback to be fired upon the reception of any incoming Janus signals for this plugin handle with the
 * `janus` attribute equal to `ev`.
 **/
JanusPluginHandle.prototype.on = function(ev, callback) {
  return this.session.on(ev, signal => {
    if (signal.sender == this.id) {
      callback(signal);
    }
  });
};

/**
 * Sends a signal associated with this handle. Signals should be JSON-serializable objects. Returns a promise that will
 * be resolved or rejected when a response to this signal is received, or when no response is received within the
 * session timeout.
 **/
JanusPluginHandle.prototype.send = function(type, signal) {
  return this.session.send(type, Object.assign({ handle_id: this.id }, signal));
};

/** Sends a plugin-specific message associated with this handle. **/
JanusPluginHandle.prototype.sendMessage = function(body) {
  return this.send("message", { body: body });
};

/** Sends a JSEP offer or answer associated with this handle. **/
JanusPluginHandle.prototype.sendJsep = function(jsep) {
  return this.send("message", { body: {}, jsep: jsep });
};

/** Sends an ICE trickle candidate associated with this handle. **/
JanusPluginHandle.prototype.sendTrickle = function(candidate) {
  return this.send("trickle", { candidate: candidate });
};

/**
 * Represents a Janus session -- a Janus context from within which you can open multiple handles and connections. Once
 * created, this session will be given a unique ID which should be used to associate it with future signalling messages.
 *
 * See https://janus.conf.meetecho.com/docs/rest.html#sessions.
 **/
function JanusSession(output, options) {
  this.output = output;
  this.id = undefined;
  this.nextTxId = 0;
  this.txns = {};
  this.eventHandlers = {};
  this.options = Object.assign({
    verbose: false,
    timeoutMs: 10000,
    keepaliveMs: 30000
  }, options);
}

/** Creates this session on the Janus server and sets its ID. **/
JanusSession.prototype.create = function() {
  return this.send("create").then(resp => {
    this.id = resp.data.id;
    return resp;
  });
};

/**
 * Destroys this session. Note that upon destruction, Janus will also close the signalling transport (if applicable) and
 * any open WebRTC connections.
 **/
JanusSession.prototype.destroy = function() {
  return this.send("destroy").then((resp) => {
    this.dispose();
    return resp;
  });
};

/**
 * Disposes of this session in a way such that no further incoming signalling messages will be processed.
 * Outstanding transactions will be rejected.
 **/
JanusSession.prototype.dispose = function() {
  this._killKeepalive();
  this.eventHandlers = {};
  for (var txId in this.txns) {
    if (this.txns.hasOwnProperty(txId)) {
      var txn = this.txns[txId];
      clearTimeout(txn.timeout);
      txn.reject(new Error("Janus session was disposed."));
      delete this.txns[txId];
    }
  }
};

/**
 * Whether this signal represents an error, and the associated promise (if any) should be rejected.
 * Users should override this to handle any custom plugin-specific error conventions.
 **/
JanusSession.prototype.isError = function(signal) {
  return signal.janus === "error";
};

/** Registers a callback to be fired upon the reception of any incoming Janus signals for this session with the
 * `janus` attribute equal to `ev`.
 **/
JanusSession.prototype.on = function(ev, callback) {
  var handlers = this.eventHandlers[ev];
  if (handlers == null) {
    handlers = this.eventHandlers[ev] = [];
  }
  handlers.push(callback);
};

/**
 * Callback for receiving JSON signalling messages pertinent to this session. If the signals are responses to previously
 * sent signals, the promises for the outgoing signals will be resolved or rejected appropriately with this signal as an
 * argument.
 *
 * External callers should call this function every time a new signal arrives on the transport; for example, in a
 * WebSocket's `message` event, or when a new datum shows up in an HTTP long-polling response.
 **/
JanusSession.prototype.receive = function(signal) {
  if (this.options.verbose) {
    this._logIncoming(signal);
  }
  if (signal.session_id != this.id) {
    console.warn("Incorrect session ID received in Janus signalling message: was " + signal.session_id + ", expected " + this.id + ".");
  }

  var responseType = signal.janus;
  var handlers = this.eventHandlers[responseType];
  if (handlers != null) {
    for (var i = 0; i < handlers.length; i++) {
      handlers[i](signal);
    }
  }

  if (signal.transaction != null) {
    var txn = this.txns[signal.transaction];
    if (txn == null) {
      // this is a response to a transaction that wasn't caused via JanusSession.send, or a plugin replied twice to a
      // single request, or the session was disposed, or something else that isn't under our purview; that's fine
      return;
    }

    if (responseType === "ack" && txn.type == "message") {
      // this is an ack of an asynchronously-processed plugin request, we should wait to resolve the promise until the
      // actual response comes in
      return;
    }

    clearTimeout(txn.timeout);

    delete this.txns[signal.transaction];
    (this.isError(signal) ? txn.reject : txn.resolve)(signal);
  }
};

/**
 * Sends a signal associated with this session, beginning a new transaction. Returns a promise that will be resolved or
 * rejected when a response is received in the same transaction, or when no response is received within the session
 * timeout.
 **/
JanusSession.prototype.send = function(type, signal) {
  signal = Object.assign({ transaction: (this.nextTxId++).toString() }, signal);
  return new Promise((resolve, reject) => {
    var timeout = null;
    if (this.options.timeoutMs) {
      timeout = setTimeout(() => {
        delete this.txns[signal.transaction];
        reject(new Error("Signalling transaction with txid " + signal.transaction + " timed out."));
      }, this.options.timeoutMs);
    }
    this.txns[signal.transaction] = { resolve: resolve, reject: reject, timeout: timeout, type: type };
    this._transmit(type, signal);
  });
};

JanusSession.prototype._transmit = function(type, signal) {
  signal = Object.assign({ janus: type }, signal);

  if (this.id != null) { // this.id is undefined in the special case when we're sending the session create message
    signal = Object.assign({ session_id: this.id }, signal);
  }

  if (this.options.verbose) {
    this._logOutgoing(signal);
  }

  this.output(JSON.stringify(signal));
  this._resetKeepalive();
};

JanusSession.prototype._logOutgoing = function(signal) {
  var kind = signal.janus;
  if (kind === "message" && signal.jsep) {
    kind = signal.jsep.type;
  }
  var message = "> Outgoing Janus " + (kind || "signal") + " (#" + signal.transaction + "): ";
  console.debug("%c" + message, "color: #040", signal);
};

JanusSession.prototype._logIncoming = function(signal) {
  var kind = signal.janus;
  var message = signal.transaction ?
      "< Incoming Janus " + (kind || "signal") + " (#" + signal.transaction + "): " :
      "< Incoming Janus " + (kind || "signal") + ": ";
  console.debug("%c" + message, "color: #004", signal);
};

JanusSession.prototype._sendKeepalive = function() {
  return this.send("keepalive");
};

JanusSession.prototype._killKeepalive = function() {
  clearTimeout(this.keepaliveTimeout);
};

JanusSession.prototype._resetKeepalive = function() {
  this._killKeepalive();
  if (this.options.keepaliveMs) {
    this.keepaliveTimeout = setTimeout(() => {
      this._sendKeepalive().catch(e => console.error("Error received from keepalive: ", e));
    }, this.options.keepaliveMs);
  }
};

module.exports = {
  JanusPluginHandle,
  JanusSession
};


/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/sdp/sdp.js":
/*!*********************************!*\
  !*** ./node_modules/sdp/sdp.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 /* eslint-env node */


// SDP helpers.
var SDPUtils = {};

// Generate an alphanumeric identifier for cname or mids.
// TODO: use UUIDs instead? https://gist.github.com/jed/982883
SDPUtils.generateIdentifier = function() {
  return Math.random().toString(36).substr(2, 10);
};

// The RTCP CNAME used by all peerconnections from the same JS.
SDPUtils.localCName = SDPUtils.generateIdentifier();

// Splits SDP into lines, dealing with both CRLF and LF.
SDPUtils.splitLines = function(blob) {
  return blob.trim().split('\n').map(function(line) {
    return line.trim();
  });
};
// Splits SDP into sessionpart and mediasections. Ensures CRLF.
SDPUtils.splitSections = function(blob) {
  var parts = blob.split('\nm=');
  return parts.map(function(part, index) {
    return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
  });
};

// returns the session description.
SDPUtils.getDescription = function(blob) {
  var sections = SDPUtils.splitSections(blob);
  return sections && sections[0];
};

// returns the individual media sections.
SDPUtils.getMediaSections = function(blob) {
  var sections = SDPUtils.splitSections(blob);
  sections.shift();
  return sections;
};

// Returns lines that start with a certain prefix.
SDPUtils.matchPrefix = function(blob, prefix) {
  return SDPUtils.splitLines(blob).filter(function(line) {
    return line.indexOf(prefix) === 0;
  });
};

// Parses an ICE candidate line. Sample input:
// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
// rport 55996"
SDPUtils.parseCandidate = function(line) {
  var parts;
  // Parse both variants.
  if (line.indexOf('a=candidate:') === 0) {
    parts = line.substring(12).split(' ');
  } else {
    parts = line.substring(10).split(' ');
  }

  var candidate = {
    foundation: parts[0],
    component: parseInt(parts[1], 10),
    protocol: parts[2].toLowerCase(),
    priority: parseInt(parts[3], 10),
    ip: parts[4],
    port: parseInt(parts[5], 10),
    // skip parts[6] == 'typ'
    type: parts[7]
  };

  for (var i = 8; i < parts.length; i += 2) {
    switch (parts[i]) {
      case 'raddr':
        candidate.relatedAddress = parts[i + 1];
        break;
      case 'rport':
        candidate.relatedPort = parseInt(parts[i + 1], 10);
        break;
      case 'tcptype':
        candidate.tcpType = parts[i + 1];
        break;
      case 'ufrag':
        candidate.ufrag = parts[i + 1]; // for backward compability.
        candidate.usernameFragment = parts[i + 1];
        break;
      default: // extension handling, in particular ufrag
        candidate[parts[i]] = parts[i + 1];
        break;
    }
  }
  return candidate;
};

// Translates a candidate object into SDP candidate attribute.
SDPUtils.writeCandidate = function(candidate) {
  var sdp = [];
  sdp.push(candidate.foundation);
  sdp.push(candidate.component);
  sdp.push(candidate.protocol.toUpperCase());
  sdp.push(candidate.priority);
  sdp.push(candidate.ip);
  sdp.push(candidate.port);

  var type = candidate.type;
  sdp.push('typ');
  sdp.push(type);
  if (type !== 'host' && candidate.relatedAddress &&
      candidate.relatedPort) {
    sdp.push('raddr');
    sdp.push(candidate.relatedAddress);
    sdp.push('rport');
    sdp.push(candidate.relatedPort);
  }
  if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
    sdp.push('tcptype');
    sdp.push(candidate.tcpType);
  }
  if (candidate.usernameFragment || candidate.ufrag) {
    sdp.push('ufrag');
    sdp.push(candidate.usernameFragment || candidate.ufrag);
  }
  return 'candidate:' + sdp.join(' ');
};

// Parses an ice-options line, returns an array of option tags.
// a=ice-options:foo bar
SDPUtils.parseIceOptions = function(line) {
  return line.substr(14).split(' ');
}

// Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
// a=rtpmap:111 opus/48000/2
SDPUtils.parseRtpMap = function(line) {
  var parts = line.substr(9).split(' ');
  var parsed = {
    payloadType: parseInt(parts.shift(), 10) // was: id
  };

  parts = parts[0].split('/');

  parsed.name = parts[0];
  parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
  parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
  // legacy alias, got renamed back to channels in ORTC.
  parsed.numChannels = parsed.channels;
  return parsed;
};

// Generate an a=rtpmap line from RTCRtpCodecCapability or
// RTCRtpCodecParameters.
SDPUtils.writeRtpMap = function(codec) {
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  var channels = codec.channels || codec.numChannels || 1;
  return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
      (channels !== 1 ? '/' + channels : '') + '\r\n';
};

// Parses an a=extmap line (headerextension from RFC 5285). Sample input:
// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
SDPUtils.parseExtmap = function(line) {
  var parts = line.substr(9).split(' ');
  return {
    id: parseInt(parts[0], 10),
    direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
    uri: parts[1]
  };
};

// Generates a=extmap line from RTCRtpHeaderExtensionParameters or
// RTCRtpHeaderExtension.
SDPUtils.writeExtmap = function(headerExtension) {
  return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
      (headerExtension.direction && headerExtension.direction !== 'sendrecv'
          ? '/' + headerExtension.direction
          : '') +
      ' ' + headerExtension.uri + '\r\n';
};

// Parses an ftmp line, returns dictionary. Sample input:
// a=fmtp:96 vbr=on;cng=on
// Also deals with vbr=on; cng=on
SDPUtils.parseFmtp = function(line) {
  var parsed = {};
  var kv;
  var parts = line.substr(line.indexOf(' ') + 1).split(';');
  for (var j = 0; j < parts.length; j++) {
    kv = parts[j].trim().split('=');
    parsed[kv[0].trim()] = kv[1];
  }
  return parsed;
};

// Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeFmtp = function(codec) {
  var line = '';
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  if (codec.parameters && Object.keys(codec.parameters).length) {
    var params = [];
    Object.keys(codec.parameters).forEach(function(param) {
      if (codec.parameters[param]) {
        params.push(param + '=' + codec.parameters[param]);
      } else {
        params.push(param);
      }
    });
    line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
  }
  return line;
};

// Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
// a=rtcp-fb:98 nack rpsi
SDPUtils.parseRtcpFb = function(line) {
  var parts = line.substr(line.indexOf(' ') + 1).split(' ');
  return {
    type: parts.shift(),
    parameter: parts.join(' ')
  };
};
// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeRtcpFb = function(codec) {
  var lines = '';
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
    // FIXME: special handling for trr-int?
    codec.rtcpFeedback.forEach(function(fb) {
      lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
      (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
          '\r\n';
    });
  }
  return lines;
};

// Parses an RFC 5576 ssrc media attribute. Sample input:
// a=ssrc:3735928559 cname:something
SDPUtils.parseSsrcMedia = function(line) {
  var sp = line.indexOf(' ');
  var parts = {
    ssrc: parseInt(line.substr(7, sp - 7), 10)
  };
  var colon = line.indexOf(':', sp);
  if (colon > -1) {
    parts.attribute = line.substr(sp + 1, colon - sp - 1);
    parts.value = line.substr(colon + 1);
  } else {
    parts.attribute = line.substr(sp + 1);
  }
  return parts;
};

// Extracts the MID (RFC 5888) from a media section.
// returns the MID or undefined if no mid line was found.
SDPUtils.getMid = function(mediaSection) {
  var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
  if (mid) {
    return mid.substr(6);
  }
}

SDPUtils.parseFingerprint = function(line) {
  var parts = line.substr(14).split(' ');
  return {
    algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
    value: parts[1]
  };
};

// Extracts DTLS parameters from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the fingerprint line as input. See also getIceParameters.
SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
  var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
      'a=fingerprint:');
  // Note: a=setup line is ignored since we use the 'auto' role.
  // Note2: 'algorithm' is not case sensitive except in Edge.
  return {
    role: 'auto',
    fingerprints: lines.map(SDPUtils.parseFingerprint)
  };
};

// Serializes DTLS parameters to SDP.
SDPUtils.writeDtlsParameters = function(params, setupType) {
  var sdp = 'a=setup:' + setupType + '\r\n';
  params.fingerprints.forEach(function(fp) {
    sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
  });
  return sdp;
};
// Parses ICE information from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the ice-ufrag and ice-pwd lines as input.
SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
  var lines = SDPUtils.splitLines(mediaSection);
  // Search in session part, too.
  lines = lines.concat(SDPUtils.splitLines(sessionpart));
  var iceParameters = {
    usernameFragment: lines.filter(function(line) {
      return line.indexOf('a=ice-ufrag:') === 0;
    })[0].substr(12),
    password: lines.filter(function(line) {
      return line.indexOf('a=ice-pwd:') === 0;
    })[0].substr(10)
  };
  return iceParameters;
};

// Serializes ICE parameters to SDP.
SDPUtils.writeIceParameters = function(params) {
  return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
      'a=ice-pwd:' + params.password + '\r\n';
};

// Parses the SDP media section and returns RTCRtpParameters.
SDPUtils.parseRtpParameters = function(mediaSection) {
  var description = {
    codecs: [],
    headerExtensions: [],
    fecMechanisms: [],
    rtcp: []
  };
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');
  for (var i = 3; i < mline.length; i++) { // find all codecs from mline[3..]
    var pt = mline[i];
    var rtpmapline = SDPUtils.matchPrefix(
        mediaSection, 'a=rtpmap:' + pt + ' ')[0];
    if (rtpmapline) {
      var codec = SDPUtils.parseRtpMap(rtpmapline);
      var fmtps = SDPUtils.matchPrefix(
          mediaSection, 'a=fmtp:' + pt + ' ');
      // Only the first a=fmtp:<pt> is considered.
      codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
      codec.rtcpFeedback = SDPUtils.matchPrefix(
          mediaSection, 'a=rtcp-fb:' + pt + ' ')
        .map(SDPUtils.parseRtcpFb);
      description.codecs.push(codec);
      // parse FEC mechanisms from rtpmap lines.
      switch (codec.name.toUpperCase()) {
        case 'RED':
        case 'ULPFEC':
          description.fecMechanisms.push(codec.name.toUpperCase());
          break;
        default: // only RED and ULPFEC are recognized as FEC mechanisms.
          break;
      }
    }
  }
  SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
    description.headerExtensions.push(SDPUtils.parseExtmap(line));
  });
  // FIXME: parse rtcp.
  return description;
};

// Generates parts of the SDP media section describing the capabilities /
// parameters.
SDPUtils.writeRtpDescription = function(kind, caps) {
  var sdp = '';

  // Build the mline.
  sdp += 'm=' + kind + ' ';
  sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
  sdp += ' UDP/TLS/RTP/SAVPF ';
  sdp += caps.codecs.map(function(codec) {
    if (codec.preferredPayloadType !== undefined) {
      return codec.preferredPayloadType;
    }
    return codec.payloadType;
  }).join(' ') + '\r\n';

  sdp += 'c=IN IP4 0.0.0.0\r\n';
  sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

  // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
  caps.codecs.forEach(function(codec) {
    sdp += SDPUtils.writeRtpMap(codec);
    sdp += SDPUtils.writeFmtp(codec);
    sdp += SDPUtils.writeRtcpFb(codec);
  });
  var maxptime = 0;
  caps.codecs.forEach(function(codec) {
    if (codec.maxptime > maxptime) {
      maxptime = codec.maxptime;
    }
  });
  if (maxptime > 0) {
    sdp += 'a=maxptime:' + maxptime + '\r\n';
  }
  sdp += 'a=rtcp-mux\r\n';

  if (caps.headerExtensions) {
    caps.headerExtensions.forEach(function(extension) {
      sdp += SDPUtils.writeExtmap(extension);
    });
  }
  // FIXME: write fecMechanisms.
  return sdp;
};

// Parses the SDP media section and returns an array of
// RTCRtpEncodingParameters.
SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
  var encodingParameters = [];
  var description = SDPUtils.parseRtpParameters(mediaSection);
  var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
  var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

  // filter a=ssrc:... cname:, ignore PlanB-msid
  var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
  .map(function(line) {
    return SDPUtils.parseSsrcMedia(line);
  })
  .filter(function(parts) {
    return parts.attribute === 'cname';
  });
  var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
  var secondarySsrc;

  var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
  .map(function(line) {
    var parts = line.substr(17).split(' ');
    return parts.map(function(part) {
      return parseInt(part, 10);
    });
  });
  if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
    secondarySsrc = flows[0][1];
  }

  description.codecs.forEach(function(codec) {
    if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
      var encParam = {
        ssrc: primarySsrc,
        codecPayloadType: parseInt(codec.parameters.apt, 10),
      };
      if (primarySsrc && secondarySsrc) {
        encParam.rtx = {ssrc: secondarySsrc};
      }
      encodingParameters.push(encParam);
      if (hasRed) {
        encParam = JSON.parse(JSON.stringify(encParam));
        encParam.fec = {
          ssrc: secondarySsrc,
          mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
        };
        encodingParameters.push(encParam);
      }
    }
  });
  if (encodingParameters.length === 0 && primarySsrc) {
    encodingParameters.push({
      ssrc: primarySsrc
    });
  }

  // we support both b=AS and b=TIAS but interpret AS as TIAS.
  var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
  if (bandwidth.length) {
    if (bandwidth[0].indexOf('b=TIAS:') === 0) {
      bandwidth = parseInt(bandwidth[0].substr(7), 10);
    } else if (bandwidth[0].indexOf('b=AS:') === 0) {
      // use formula from JSEP to convert b=AS to TIAS value.
      bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95
          - (50 * 40 * 8);
    } else {
      bandwidth = undefined;
    }
    encodingParameters.forEach(function(params) {
      params.maxBitrate = bandwidth;
    });
  }
  return encodingParameters;
};

// parses http://draft.ortc.org/#rtcrtcpparameters*
SDPUtils.parseRtcpParameters = function(mediaSection) {
  var rtcpParameters = {};

  var cname;
  // Gets the first SSRC. Note that with RTX there might be multiple
  // SSRCs.
  var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
      .map(function(line) {
        return SDPUtils.parseSsrcMedia(line);
      })
      .filter(function(obj) {
        return obj.attribute === 'cname';
      })[0];
  if (remoteSsrc) {
    rtcpParameters.cname = remoteSsrc.value;
    rtcpParameters.ssrc = remoteSsrc.ssrc;
  }

  // Edge uses the compound attribute instead of reducedSize
  // compound is !reducedSize
  var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
  rtcpParameters.reducedSize = rsize.length > 0;
  rtcpParameters.compound = rsize.length === 0;

  // parses the rtcp-mux attrіbute.
  // Note that Edge does not support unmuxed RTCP.
  var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
  rtcpParameters.mux = mux.length > 0;

  return rtcpParameters;
};

// parses either a=msid: or a=ssrc:... msid lines and returns
// the id of the MediaStream and MediaStreamTrack.
SDPUtils.parseMsid = function(mediaSection) {
  var parts;
  var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
  if (spec.length === 1) {
    parts = spec[0].substr(7).split(' ');
    return {stream: parts[0], track: parts[1]};
  }
  var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
  .map(function(line) {
    return SDPUtils.parseSsrcMedia(line);
  })
  .filter(function(parts) {
    return parts.attribute === 'msid';
  });
  if (planB.length > 0) {
    parts = planB[0].value.split(' ');
    return {stream: parts[0], track: parts[1]};
  }
};

// Generate a session ID for SDP.
// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
// recommends using a cryptographically random +ve 64-bit value
// but right now this should be acceptable and within the right range
SDPUtils.generateSessionId = function() {
  return Math.random().toString().substr(2, 21);
};

// Write boilder plate for start of SDP
// sessId argument is optional - if not supplied it will
// be generated randomly
// sessVersion is optional and defaults to 2
SDPUtils.writeSessionBoilerplate = function(sessId, sessVer) {
  var sessionId;
  var version = sessVer !== undefined ? sessVer : 2;
  if (sessId) {
    sessionId = sessId;
  } else {
    sessionId = SDPUtils.generateSessionId();
  }
  // FIXME: sess-id should be an NTP timestamp.
  return 'v=0\r\n' +
      'o=thisisadapterortc ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' +
      's=-\r\n' +
      't=0 0\r\n';
};

SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
  var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

  // Map ICE parameters (ufrag, pwd) to SDP.
  sdp += SDPUtils.writeIceParameters(
      transceiver.iceGatherer.getLocalParameters());

  // Map DTLS parameters to SDP.
  sdp += SDPUtils.writeDtlsParameters(
      transceiver.dtlsTransport.getLocalParameters(),
      type === 'offer' ? 'actpass' : 'active');

  sdp += 'a=mid:' + transceiver.mid + '\r\n';

  if (transceiver.direction) {
    sdp += 'a=' + transceiver.direction + '\r\n';
  } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
    sdp += 'a=sendrecv\r\n';
  } else if (transceiver.rtpSender) {
    sdp += 'a=sendonly\r\n';
  } else if (transceiver.rtpReceiver) {
    sdp += 'a=recvonly\r\n';
  } else {
    sdp += 'a=inactive\r\n';
  }

  if (transceiver.rtpSender) {
    // spec.
    var msid = 'msid:' + stream.id + ' ' +
        transceiver.rtpSender.track.id + '\r\n';
    sdp += 'a=' + msid;

    // for Chrome.
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
        ' ' + msid;
    if (transceiver.sendEncodingParameters[0].rtx) {
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
          ' ' + msid;
      sdp += 'a=ssrc-group:FID ' +
          transceiver.sendEncodingParameters[0].ssrc + ' ' +
          transceiver.sendEncodingParameters[0].rtx.ssrc +
          '\r\n';
    }
  }
  // FIXME: this should be written by writeRtpDescription.
  sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
      ' cname:' + SDPUtils.localCName + '\r\n';
  if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
        ' cname:' + SDPUtils.localCName + '\r\n';
  }
  return sdp;
};

// Gets the direction from the mediaSection or the sessionpart.
SDPUtils.getDirection = function(mediaSection, sessionpart) {
  // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
  var lines = SDPUtils.splitLines(mediaSection);
  for (var i = 0; i < lines.length; i++) {
    switch (lines[i]) {
      case 'a=sendrecv':
      case 'a=sendonly':
      case 'a=recvonly':
      case 'a=inactive':
        return lines[i].substr(2);
      default:
        // FIXME: What should happen here?
    }
  }
  if (sessionpart) {
    return SDPUtils.getDirection(sessionpart);
  }
  return 'sendrecv';
};

SDPUtils.getKind = function(mediaSection) {
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');
  return mline[0].substr(2);
};

SDPUtils.isRejected = function(mediaSection) {
  return mediaSection.split(' ', 2)[1] === '0';
};

SDPUtils.parseMLine = function(mediaSection) {
  var lines = SDPUtils.splitLines(mediaSection);
  var parts = lines[0].substr(2).split(' ');
  return {
    kind: parts[0],
    port: parseInt(parts[1], 10),
    protocol: parts[2],
    fmt: parts.slice(3).join(' ')
  };
};

SDPUtils.parseOLine = function(mediaSection) {
  var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
  var parts = line.substr(2).split(' ');
  return {
    username: parts[0],
    sessionId: parts[1],
    sessionVersion: parseInt(parts[2], 10),
    netType: parts[3],
    addressType: parts[4],
    address: parts[5],
  };
}

// Expose public methods.
if (true) {
  module.exports = SDPUtils;
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mj = __webpack_require__(/*! minijanus */ "./node_modules/minijanus/minijanus.js");
var sdpUtils = __webpack_require__(/*! sdp */ "./node_modules/sdp/sdp.js");
var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("naf-janus-adapter:debug");
var warn = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("naf-janus-adapter:warn");
var error = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("naf-janus-adapter:error");
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

function debounce(fn) {
  var curr = Promise.resolve();
  return function () {
    var args = Array.prototype.slice.call(arguments);
    curr = curr.then(_ => fn.apply(this, args));
  };
}

function randomUint() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

function untilDataChannelOpen(dataChannel) {
  return new Promise((resolve, reject) => {
    if (dataChannel.readyState === "open") {
      resolve();
    } else {
      let resolver, rejector;

      const clear = () => {
        dataChannel.removeEventListener("open", resolver);
        dataChannel.removeEventListener("error", rejector);
      };

      resolver = () => {
        clear();
        resolve();
      };
      rejector = () => {
        clear();
        reject();
      };

      dataChannel.addEventListener("open", resolver);
      dataChannel.addEventListener("error", rejector);
    }
  });
}

const isH264VideoSupported = (() => {
  const video = document.createElement("video");
  return video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') !== "";
})();

const OPUS_PARAMETERS = {
  // indicates that we want to enable DTX to elide silence packets
  usedtx: 1,
  // indicates that we prefer to receive mono audio (important for voip profile)
  stereo: 0,
  // indicates that we prefer to send mono audio (important for voip profile)
  "sprop-stereo": 0
};

const PEER_CONNECTION_CONFIG = {
  iceServers: [{ urls: "stun:stun1.l.google.com:19302" }, { urls: "stun:stun2.l.google.com:19302" }]
};

const WS_NORMAL_CLOSURE = 1000;

class JanusAdapter {
  constructor() {
    this.room = null;
    // We expect the consumer to set a client id before connecting.
    this.clientId = null;
    this.joinToken = null;

    this.serverUrl = null;
    this.webRtcOptions = {};
    this.ws = null;
    this.session = null;
    this.reliableTransport = "datachannel";
    this.unreliableTransport = "datachannel";

    // In the event the server restarts and all clients lose connection, reconnect with
    // some random jitter added to prevent simultaneous reconnection requests.
    this.initialReconnectionDelay = 1000 * Math.random();
    this.reconnectionDelay = this.initialReconnectionDelay;
    this.reconnectionTimeout = null;
    this.maxReconnectionAttempts = 10;
    this.reconnectionAttempts = 0;

    this.publisher = null;
    this.occupants = {};
    this.leftOccupants = new Set();
    this.mediaStreams = {};
    this.localMediaStream = null;
    this.pendingMediaRequests = new Map();

    this.blockedClients = new Map();
    this.frozenUpdates = new Map();

    this.timeOffsets = [];
    this.serverTimeRequests = 0;
    this.avgTimeOffset = 0;

    this.onWebsocketOpen = this.onWebsocketOpen.bind(this);
    this.onWebsocketClose = this.onWebsocketClose.bind(this);
    this.onWebsocketMessage = this.onWebsocketMessage.bind(this);
    this.onDataChannelMessage = this.onDataChannelMessage.bind(this);
    this.onData = this.onData.bind(this);
  }

  setServerUrl(url) {
    this.serverUrl = url;
  }

  setApp(app) {}

  setRoom(roomName) {
    this.room = roomName;
  }

  setJoinToken(joinToken) {
    this.joinToken = joinToken;
  }

  setClientId(clientId) {
    this.clientId = clientId;
  }

  setWebRtcOptions(options) {
    this.webRtcOptions = options;
  }

  setServerConnectListeners(successListener, failureListener) {
    this.connectSuccess = successListener;
    this.connectFailure = failureListener;
  }

  setRoomOccupantListener(occupantListener) {
    this.onOccupantsChanged = occupantListener;
  }

  setDataChannelListeners(openListener, closedListener, messageListener) {
    this.onOccupantConnected = openListener;
    this.onOccupantDisconnected = closedListener;
    this.onOccupantMessage = messageListener;
  }

  setReconnectionListeners(reconnectingListener, reconnectedListener, reconnectionErrorListener) {
    // onReconnecting is called with the number of milliseconds until the next reconnection attempt
    this.onReconnecting = reconnectingListener;
    // onReconnected is called when the connection has been reestablished
    this.onReconnected = reconnectedListener;
    // onReconnectionError is called with an error when maxReconnectionAttempts has been reached
    this.onReconnectionError = reconnectionErrorListener;
  }

  connect() {
    debug(`connecting to ${this.serverUrl}`);

    const websocketConnection = new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.serverUrl, "janus-protocol");

      this.session = new mj.JanusSession(this.ws.send.bind(this.ws), {
        verbose: false,
        timeoutMs: 60000,
        keepaliveMs: 40000
      });

      let onOpen;

      const onError = () => {
        reject(error);
      };

      this.ws.addEventListener("close", this.onWebsocketClose);
      this.ws.addEventListener("message", this.onWebsocketMessage);

      onOpen = () => {
        this.ws.removeEventListener("open", onOpen);
        this.ws.removeEventListener("error", onError);
        this.onWebsocketOpen().then(resolve).catch(reject);
      };

      this.ws.addEventListener("open", onOpen);
    });

    return Promise.all([websocketConnection, this.updateTimeOffset()]);
  }

  disconnect() {
    debug(`disconnecting`);

    clearTimeout(this.reconnectionTimeout);

    this.removeAllOccupants();

    if (this.publisher) {
      // Close the publisher peer connection. Which also detaches the plugin handle.
      this.publisher.conn.close();
      this.publisher = null;
    }

    if (this.session) {
      this.session.dispose();
      this.session = null;
    }

    if (this.ws) {
      this.ws.removeEventListener("open", this.onWebsocketOpen);
      this.ws.removeEventListener("close", this.onWebsocketClose);
      this.ws.removeEventListener("message", this.onWebsocketMessage);
      this.ws.close();
      this.ws = null;
    }
  }

  isDisconnected() {
    return this.ws === null;
  }

  onWebsocketOpen() {
    var _this = this;

    return _asyncToGenerator(function* () {
      // Create the Janus Session
      yield _this.session.create();

      // Attach the SFU Plugin and create a RTCPeerConnection for the publisher.
      // The publisher sends audio and opens two bidirectional data channels.
      // One reliable datachannel and one unreliable.
      _this.publisher = yield _this.createPublisher();

      // Call the naf connectSuccess callback before we start receiving WebRTC messages.
      _this.connectSuccess(_this.clientId);

      for (let i = 0; i < _this.publisher.initialOccupants.length; i++) {
        yield _this.addOccupant(_this.publisher.initialOccupants[i]);
      }
    })();
  }

  onWebsocketClose(event) {
    // The connection was closed successfully. Don't try to reconnect.
    if (event.code === WS_NORMAL_CLOSURE) {
      return;
    }

    if (this.onReconnecting) {
      this.onReconnecting(this.reconnectionDelay);
    }

    this.reconnectionTimeout = setTimeout(() => this.reconnect(), this.reconnectionDelay);
  }

  reconnect() {
    // Dispose of all networked entities and other resources tied to the session.
    this.disconnect();

    this.connect().then(() => {
      this.reconnectionDelay = this.initialReconnectionDelay;
      this.reconnectionAttempts = 0;

      if (this.onReconnected) {
        this.onReconnected();
      }
    }).catch(error => {
      this.reconnectionDelay += 1000;
      this.reconnectionAttempts++;

      if (this.reconnectionAttempts > this.maxReconnectionAttempts && this.onReconnectionError) {
        return this.onReconnectionError(new Error("Connection could not be reestablished, exceeded maximum number of reconnection attempts."));
      }

      if (this.onReconnecting) {
        this.onReconnecting(this.reconnectionDelay);
      }

      this.reconnectionTimeout = setTimeout(() => this.reconnect(), this.reconnectionDelay);
    });
  }

  onWebsocketMessage(event) {
    this.session.receive(JSON.parse(event.data));
  }

  addOccupant(occupantId) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      var subscriber = yield _this2.createSubscriber(occupantId);

      if (!subscriber) return;

      _this2.occupants[occupantId] = subscriber;

      _this2.setMediaStream(occupantId, subscriber.mediaStream);

      // Call the Networked AFrame callbacks for the new occupant.
      _this2.onOccupantConnected(occupantId);
      _this2.onOccupantsChanged(_this2.occupants);

      return subscriber;
    })();
  }

  removeAllOccupants() {
    for (const occupantId of Object.getOwnPropertyNames(this.occupants)) {
      this.removeOccupant(occupantId);
    }
  }

  removeOccupant(occupantId) {
    this.leftOccupants.add(occupantId);

    if (this.occupants[occupantId]) {
      // Close the subscriber peer connection. Which also detaches the plugin handle.
      if (this.occupants[occupantId]) {
        this.occupants[occupantId].conn.close();
        delete this.occupants[occupantId];
      }

      if (this.mediaStreams[occupantId]) {
        delete this.mediaStreams[occupantId];
      }

      if (this.pendingMediaRequests.has(occupantId)) {
        const msg = "The user disconnected before the media stream was resolved.";
        this.pendingMediaRequests.get(occupantId).audio.reject(msg);
        this.pendingMediaRequests.get(occupantId).video.reject(msg);
        this.pendingMediaRequests.delete(occupantId);
      }

      // Call the Networked AFrame callbacks for the removed occupant.
      this.onOccupantDisconnected(occupantId);
      this.onOccupantsChanged(this.occupants);
    }
  }

  associate(conn, handle) {
    conn.addEventListener("icecandidate", ev => {
      handle.sendTrickle(ev.candidate || null).catch(e => error("Error trickling ICE: %o", e));
    });

    // we have to debounce these because janus gets angry if you send it a new SDP before
    // it's finished processing an existing SDP. in actuality, it seems like this is maybe
    // too liberal and we need to wait some amount of time after an offer before sending another,
    // but we don't currently know any good way of detecting exactly how long :(
    conn.addEventListener("negotiationneeded", debounce(ev => {
      debug("Sending new offer for handle: %o", handle);
      var offer = conn.createOffer().then(this.configurePublisherSdp).then(this.fixSafariIceUFrag);
      var local = offer.then(o => conn.setLocalDescription(o));
      var remote = offer;

      remote = remote.then(this.fixSafariIceUFrag).then(j => handle.sendJsep(j)).then(r => conn.setRemoteDescription(r.jsep));
      return Promise.all([local, remote]).catch(e => error("Error negotiating offer: %o", e));
    }));
    handle.on("event", debounce(ev => {
      var jsep = ev.jsep;
      if (jsep && jsep.type == "offer") {
        debug("Accepting new offer for handle: %o", handle);
        var answer = conn.setRemoteDescription(this.configureSubscriberSdp(jsep)).then(_ => conn.createAnswer()).then(this.fixSafariIceUFrag);
        var local = answer.then(a => conn.setLocalDescription(a));
        var remote = answer.then(j => handle.sendJsep(j));
        return Promise.all([local, remote]).catch(e => error("Error negotiating answer: %o", e));
      } else {
        // some other kind of event, nothing to do
        return null;
      }
    }));
  }

  createPublisher() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      var handle = new mj.JanusPluginHandle(_this3.session);
      var conn = new RTCPeerConnection(PEER_CONNECTION_CONFIG);

      debug("pub waiting for sfu");
      yield handle.attach("janus.plugin.sfu");

      _this3.associate(conn, handle);

      debug("pub waiting for data channels & webrtcup");
      var webrtcup = new Promise(function (resolve) {
        return handle.on("webrtcup", resolve);
      });

      // Unreliable datachannel: sending and receiving component updates.
      // Reliable datachannel: sending and recieving entity instantiations.
      var reliableChannel = conn.createDataChannel("reliable", { ordered: true });
      var unreliableChannel = conn.createDataChannel("unreliable", {
        ordered: false,
        maxRetransmits: 0
      });

      reliableChannel.addEventListener("message", function (e) {
        return _this3.onDataChannelMessage(e, "janus-reliable");
      });
      unreliableChannel.addEventListener("message", function (e) {
        return _this3.onDataChannelMessage(e, "janus-unreliable");
      });

      yield webrtcup;
      yield untilDataChannelOpen(reliableChannel);
      yield untilDataChannelOpen(unreliableChannel);

      // doing this here is sort of a hack around chrome renegotiation weirdness --
      // if we do it prior to webrtcup, chrome on gear VR will sometimes put a
      // renegotiation offer in flight while the first offer was still being
      // processed by janus. we should find some more principled way to figure out
      // when janus is done in the future.
      if (_this3.localMediaStream) {
        _this3.localMediaStream.getTracks().forEach(function (track) {
          conn.addTrack(track, _this3.localMediaStream);
        });
      }

      // Handle all of the join and leave events.
      handle.on("event", function (ev) {
        var data = ev.plugindata.data;
        if (data.event == "join" && data.room_id == _this3.room) {
          _this3.addOccupant(data.user_id);
        } else if (data.event == "leave" && data.room_id == _this3.room) {
          _this3.removeOccupant(data.user_id);
        } else if (data.event == "blocked") {
          document.body.dispatchEvent(new CustomEvent("blocked", { detail: { clientId: data.by } }));
        } else if (data.event == "unblocked") {
          document.body.dispatchEvent(new CustomEvent("unblocked", { detail: { clientId: data.by } }));
        } else if (data.event === "data") {
          _this3.onData(JSON.parse(data.body), "janus-event");
        }
      });

      debug("pub waiting for join");

      // Send join message to janus. Listen for join/leave messages. Automatically subscribe to all users' WebRTC data.
      var message = yield _this3.sendJoin(handle, {
        notifications: true,
        data: true
      });

      if (!message.plugindata.data.success) {
        const err = message.plugindata.data.error;
        console.error(err);
        throw err;
      }

      var initialOccupants = message.plugindata.data.response.users[_this3.room] || [];

      debug("publisher ready");
      return {
        handle,
        initialOccupants,
        reliableChannel,
        unreliableChannel,
        conn
      };
    })();
  }

  configurePublisherSdp(jsep) {
    jsep.sdp = jsep.sdp.replace(/a=fmtp:(109|111).*\r\n/g, (line, pt) => {
      const parameters = Object.assign(sdpUtils.parseFmtp(line), OPUS_PARAMETERS);
      return sdpUtils.writeFmtp({ payloadType: pt, parameters: parameters });
    });
    return jsep;
  }

  configureSubscriberSdp(jsep) {
    // todo: consider cleaning up these hacks to use sdputils
    if (!isH264VideoSupported) {
      if (navigator.userAgent.indexOf("HeadlessChrome") !== -1) {
        // HeadlessChrome (e.g. puppeteer) doesn't support webrtc video streams, so we remove those lines from the SDP.
        jsep.sdp = jsep.sdp.replace(/m=video[^]*m=/, "m=");
      }
    }

    // TODO: Hack to get video working on Chrome for Android. https://groups.google.com/forum/#!topic/mozilla.dev.media/Ye29vuMTpo8
    if (navigator.userAgent.indexOf("Android") === -1) {
      jsep.sdp = jsep.sdp.replace("a=rtcp-fb:107 goog-remb\r\n", "a=rtcp-fb:107 goog-remb\r\na=rtcp-fb:107 transport-cc\r\na=fmtp:107 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f\r\n");
    } else {
      jsep.sdp = jsep.sdp.replace("a=rtcp-fb:107 goog-remb\r\n", "a=rtcp-fb:107 goog-remb\r\na=rtcp-fb:107 transport-cc\r\na=fmtp:107 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42001f\r\n");
    }
    return jsep;
  }

  fixSafariIceUFrag(jsep) {
    return _asyncToGenerator(function* () {
      // Safari produces a \n instead of an \r\n for the ice-ufrag. See https://github.com/meetecho/janus-gateway/issues/1818
      jsep.sdp = jsep.sdp.replace(/[^\r]\na=ice-ufrag/g, "\r\na=ice-ufrag");
      return jsep;
    })();
  }

  createSubscriber(occupantId) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      if (_this4.leftOccupants.has(occupantId)) {
        console.warn(occupantId + ": cancelled occupant connection, occupant left before subscription negotation.");
        return null;
      }

      var handle = new mj.JanusPluginHandle(_this4.session);
      var conn = new RTCPeerConnection(PEER_CONNECTION_CONFIG);

      debug(occupantId + ": sub waiting for sfu");
      yield handle.attach("janus.plugin.sfu");

      _this4.associate(conn, handle);

      debug(occupantId + ": sub waiting for join");

      if (_this4.leftOccupants.has(occupantId)) {
        conn.close();
        console.warn(occupantId + ": cancelled occupant connection, occupant left after attach");
        return null;
      }

      // Send join message to janus. Don't listen for join/leave messages. Subscribe to the occupant's media.
      // Janus should send us an offer for this occupant's media in response to this.
      const resp = yield _this4.sendJoin(handle, { media: occupantId });

      if (_this4.leftOccupants.has(occupantId)) {
        conn.close();
        console.warn(occupantId + ": cancelled occupant connection, occupant left after join");
        return null;
      }

      debug(occupantId + ": sub waiting for webrtcup");

      yield new Promise(function (resolve) {
        const interval = setInterval(function () {
          if (_this4.leftOccupants.has(occupantId)) {
            clearInterval(interval);
            resolve();
          }
        }, 1000);

        handle.on("webrtcup", function () {
          clearInterval(interval);
          resolve();
        });
      });

      if (_this4.leftOccupants.has(occupantId)) {
        conn.close();
        console.warn(occupantId + ": cancel occupant connection, occupant left during or after webrtcup");
        return null;
      }

      if (isSafari && !_this4._iOSHackDelayedInitialPeer) {
        // HACK: the first peer on Safari during page load can fail to work if we don't
        // wait some time before continuing here. See: https://github.com/mozilla/hubs/pull/1692
        yield new Promise(function (resolve) {
          return setTimeout(resolve, 3000);
        });
        _this4._iOSHackDelayedInitialPeer = true;
      }

      var mediaStream = new MediaStream();
      var receivers = conn.getReceivers();
      receivers.forEach(function (receiver) {
        if (receiver.track) {
          mediaStream.addTrack(receiver.track);
        }
      });
      if (mediaStream.getTracks().length === 0) {
        mediaStream = null;
      }

      debug(occupantId + ": subscriber ready");
      return {
        handle,
        mediaStream,
        conn
      };
    })();
  }

  sendJoin(handle, subscribe) {
    return handle.sendMessage({
      kind: "join",
      room_id: this.room,
      user_id: this.clientId,
      subscribe,
      token: this.joinToken
    });
  }

  toggleFreeze() {
    if (this.frozen) {
      this.unfreeze();
    } else {
      this.freeze();
    }
  }

  freeze() {
    this.frozen = true;
  }

  unfreeze() {
    this.frozen = false;
    this.flushPendingUpdates();
  }

  dataForUpdateMultiMessage(networkId, message) {
    // "d" is an array of entity datas, where each item in the array represents a unique entity and contains
    // metadata for the entity, and an array of components that have been updated on the entity.
    // This method finds the data corresponding to the given networkId.
    for (let i = 0, l = message.data.d.length; i < l; i++) {
      const data = message.data.d[i];

      if (data.networkId === networkId) {
        return data;
      }
    }

    return null;
  }

  getPendingData(networkId, message) {
    if (!message) return null;

    let data = message.dataType === "um" ? this.dataForUpdateMultiMessage(networkId, message) : message.data;

    // Ignore messages relating to users who have disconnected since freezing, their entities
    // will have aleady been removed by NAF.
    // Note that delete messages have no "owner" so we have to check for that as well.
    if (data.owner && !this.occupants[data.owner]) return null;

    // Ignore messages from users that we may have blocked while frozen.
    if (data.owner && this.blockedClients.has(data.owner)) return null;

    return data;
  }

  // Used externally
  getPendingDataForNetworkId(networkId) {
    return this.getPendingData(networkId, this.frozenUpdates.get(networkId));
  }

  flushPendingUpdates() {
    for (const [networkId, message] of this.frozenUpdates) {
      let data = this.getPendingData(networkId, message);
      if (!data) continue;

      // Override the data type on "um" messages types, since we extract entity updates from "um" messages into
      // individual frozenUpdates in storeSingleMessage.
      const dataType = message.dataType === "um" ? "u" : message.dataType;

      this.onOccupantMessage(null, dataType, data, message.source);
    }
    this.frozenUpdates.clear();
  }

  storeMessage(message) {
    if (message.dataType === "um") {
      // UpdateMulti
      for (let i = 0, l = message.data.d.length; i < l; i++) {
        this.storeSingleMessage(message, i);
      }
    } else {
      this.storeSingleMessage(message);
    }
  }

  storeSingleMessage(message, index) {
    const data = index !== undefined ? message.data.d[index] : message.data;
    const dataType = message.dataType;
    const source = message.source;

    const networkId = data.networkId;

    if (!this.frozenUpdates.has(networkId)) {
      this.frozenUpdates.set(networkId, message);
    } else {
      const storedMessage = this.frozenUpdates.get(networkId);
      const storedData = storedMessage.dataType === "um" ? this.dataForUpdateMultiMessage(networkId, storedMessage) : storedMessage.data;

      // Avoid updating components if the entity data received did not come from the current owner.
      const isOutdatedMessage = data.lastOwnerTime < storedData.lastOwnerTime;
      const isContemporaneousMessage = data.lastOwnerTime === storedData.lastOwnerTime;
      if (isOutdatedMessage || isContemporaneousMessage && storedData.owner > data.owner) {
        return;
      }

      if (dataType === "r") {
        const createdWhileFrozen = storedData && storedData.isFirstSync;
        if (createdWhileFrozen) {
          // If the entity was created and deleted while frozen, don't bother conveying anything to the consumer.
          this.frozenUpdates.delete(networkId);
        } else {
          // Delete messages override any other messages for this entity
          this.frozenUpdates.set(networkId, message);
        }
      } else {
        // merge in component updates
        if (storedData.components && data.components) {
          Object.assign(storedData.components, data.components);
        }
      }
    }
  }

  onDataChannelMessage(e, source) {
    this.onData(JSON.parse(e.data), source);
  }

  onData(message, source) {
    if (debug.enabled) {
      debug(`DC in: ${message}`);
    }

    if (!message.dataType) return;

    message.source = source;

    if (this.frozen) {
      this.storeMessage(message);
    } else {
      this.onOccupantMessage(null, message.dataType, message.data, message.source);
    }
  }

  shouldStartConnectionTo(client) {
    return true;
  }

  startStreamConnection(client) {}

  closeStreamConnection(client) {}

  getConnectStatus(clientId) {
    return this.occupants[clientId] ? NAF.adapters.IS_CONNECTED : NAF.adapters.NOT_CONNECTED;
  }

  updateTimeOffset() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      if (_this5.isDisconnected()) return;

      const clientSentTime = Date.now();

      const res = yield fetch(document.location.href, {
        method: "HEAD",
        cache: "no-cache"
      });

      const precision = 1000;
      const serverReceivedTime = new Date(res.headers.get("Date")).getTime() + precision / 2;
      const clientReceivedTime = Date.now();
      const serverTime = serverReceivedTime + (clientReceivedTime - clientSentTime) / 2;
      const timeOffset = serverTime - clientReceivedTime;

      _this5.serverTimeRequests++;

      if (_this5.serverTimeRequests <= 10) {
        _this5.timeOffsets.push(timeOffset);
      } else {
        _this5.timeOffsets[_this5.serverTimeRequests % 10] = timeOffset;
      }

      _this5.avgTimeOffset = _this5.timeOffsets.reduce(function (acc, offset) {
        return acc += offset;
      }, 0) / _this5.timeOffsets.length;

      if (_this5.serverTimeRequests > 10) {
        debug(`new server time offset: ${_this5.avgTimeOffset}ms`);
        setTimeout(function () {
          return _this5.updateTimeOffset();
        }, 5 * 60 * 1000); // Sync clock every 5 minutes.
      } else {
        _this5.updateTimeOffset();
      }
    })();
  }

  getServerTime() {
    return Date.now() + this.avgTimeOffset;
  }

  getMediaStream(clientId, type = "audio") {
    if (this.mediaStreams[clientId]) {
      debug(`Already had ${type} for ${clientId}`);
      return Promise.resolve(this.mediaStreams[clientId][type]);
    } else {
      debug(`Waiting on ${type} for ${clientId}`);
      if (!this.pendingMediaRequests.has(clientId)) {
        this.pendingMediaRequests.set(clientId, {});

        const audioPromise = new Promise((resolve, reject) => {
          this.pendingMediaRequests.get(clientId).audio = { resolve, reject };
        });
        const videoPromise = new Promise((resolve, reject) => {
          this.pendingMediaRequests.get(clientId).video = { resolve, reject };
        });

        this.pendingMediaRequests.get(clientId).audio.promise = audioPromise;
        this.pendingMediaRequests.get(clientId).video.promise = videoPromise;
      }
      return this.pendingMediaRequests.get(clientId)[type].promise;
    }
  }

  setMediaStream(clientId, stream) {
    // Safari doesn't like it when you use single a mixed media stream where one of the tracks is inactive, so we
    // split the tracks into two streams.
    const audioStream = new MediaStream();
    stream.getAudioTracks().forEach(track => audioStream.addTrack(track));
    const videoStream = new MediaStream();
    stream.getVideoTracks().forEach(track => videoStream.addTrack(track));

    this.mediaStreams[clientId] = { audio: audioStream, video: videoStream };

    // Resolve the promise for the user's media stream if it exists.
    if (this.pendingMediaRequests.has(clientId)) {
      this.pendingMediaRequests.get(clientId).audio.resolve(audioStream);
      this.pendingMediaRequests.get(clientId).video.resolve(videoStream);
    }
  }

  setLocalMediaStream(stream) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      // our job here is to make sure the connection winds up with RTP senders sending the stuff in this stream,
      // and not the stuff that isn't in this stream. strategy is to replace existing tracks if we can, add tracks
      // that we can't replace, and disable tracks that don't exist anymore.

      // note that we don't ever remove a track from the stream -- since Janus doesn't support Unified Plan, we absolutely
      // can't wind up with a SDP that has >1 audio or >1 video tracks, even if one of them is inactive (what you get if
      // you remove a track from an existing stream.)
      if (_this6.publisher && _this6.publisher.conn) {
        const existingSenders = _this6.publisher.conn.getSenders();
        const newSenders = [];
        const tracks = stream.getTracks();

        for (let i = 0; i < tracks.length; i++) {
          const t = tracks[i];
          const sender = existingSenders.find(function (s) {
            return s.track != null && s.track.kind == t.kind;
          });

          if (sender != null) {
            if (sender.replaceTrack) {
              yield sender.replaceTrack(t);

              // Workaround https://bugzilla.mozilla.org/show_bug.cgi?id=1576771
              if (t.kind === "video" && t.enabled && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                t.enabled = false;
                setTimeout(function () {
                  return t.enabled = true;
                }, 1000);
              }
            } else {
              // Fallback for browsers that don't support replaceTrack. At this time of this writing
              // most browsers support it, and testing this code path seems to not work properly
              // in Chrome anymore.
              stream.removeTrack(sender.track);
              stream.addTrack(t);
            }
            newSenders.push(sender);
          } else {
            newSenders.push(_this6.publisher.conn.addTrack(t, stream));
          }
        }
        existingSenders.forEach(function (s) {
          if (!newSenders.includes(s)) {
            s.track.enabled = false;
          }
        });
      }
      _this6.localMediaStream = stream;
      _this6.setMediaStream(_this6.clientId, stream);
    })();
  }

  enableMicrophone(enabled) {
    if (this.publisher && this.publisher.conn) {
      this.publisher.conn.getSenders().forEach(s => {
        if (s.track.kind == "audio") {
          s.track.enabled = enabled;
        }
      });
    }
  }

  sendData(clientId, dataType, data) {
    if (!this.publisher) {
      console.warn("sendData called without a publisher");
    } else {
      switch (this.unreliableTransport) {
        case "websocket":
          this.publisher.handle.sendMessage({ kind: "data", body: JSON.stringify({ dataType, data }), whom: clientId });
          break;
        case "datachannel":
          this.publisher.unreliableChannel.send(JSON.stringify({ clientId, dataType, data }));
          break;
        default:
          this.unreliableTransport(clientId, dataType, data);
          break;
      }
    }
  }

  sendDataGuaranteed(clientId, dataType, data) {
    if (!this.publisher) {
      console.warn("sendDataGuaranteed called without a publisher");
    } else {
      switch (this.reliableTransport) {
        case "websocket":
          this.publisher.handle.sendMessage({ kind: "data", body: JSON.stringify({ dataType, data }), whom: clientId });
          break;
        case "datachannel":
          this.publisher.reliableChannel.send(JSON.stringify({ clientId, dataType, data }));
          break;
        default:
          this.reliableTransport(clientId, dataType, data);
          break;
      }
    }
  }

  broadcastData(dataType, data) {
    if (!this.publisher) {
      console.warn("broadcastData called without a publisher");
    } else {
      switch (this.unreliableTransport) {
        case "websocket":
          this.publisher.handle.sendMessage({ kind: "data", body: JSON.stringify({ dataType, data }) });
          break;
        case "datachannel":
          this.publisher.unreliableChannel.send(JSON.stringify({ dataType, data }));
          break;
        default:
          this.unreliableTransport(undefined, dataType, data);
          break;
      }
    }
  }

  broadcastDataGuaranteed(dataType, data) {
    if (!this.publisher) {
      console.warn("broadcastDataGuaranteed called without a publisher");
    } else {
      switch (this.reliableTransport) {
        case "websocket":
          this.publisher.handle.sendMessage({ kind: "data", body: JSON.stringify({ dataType, data }) });
          break;
        case "datachannel":
          this.publisher.reliableChannel.send(JSON.stringify({ dataType, data }));
          break;
        default:
          this.reliableTransport(undefined, dataType, data);
          break;
      }
    }
  }

  kick(clientId, permsToken) {
    return this.publisher.handle.sendMessage({ kind: "kick", room_id: this.room, user_id: clientId, token: permsToken }).then(() => {
      document.body.dispatchEvent(new CustomEvent("kicked", { detail: { clientId: clientId } }));
    });
  }

  block(clientId) {
    return this.publisher.handle.sendMessage({ kind: "block", whom: clientId }).then(() => {
      this.blockedClients.set(clientId, true);
      document.body.dispatchEvent(new CustomEvent("blocked", { detail: { clientId: clientId } }));
    });
  }

  unblock(clientId) {
    return this.publisher.handle.sendMessage({ kind: "unblock", whom: clientId }).then(() => {
      this.blockedClients.delete(clientId);
      document.body.dispatchEvent(new CustomEvent("unblocked", { detail: { clientId: clientId } }));
    });
  }
}

NAF.adapters.register("janus", JanusAdapter);

module.exports = JanusAdapter;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21pbmlqYW51cy9taW5pamFudXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NkcC9zZHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1qIiwicmVxdWlyZSIsInNkcFV0aWxzIiwiZGVidWciLCJ3YXJuIiwiZXJyb3IiLCJpc1NhZmFyaSIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJkZWJvdW5jZSIsImZuIiwiY3VyciIsIlByb21pc2UiLCJyZXNvbHZlIiwiYXJncyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwidGhlbiIsIl8iLCJhcHBseSIsInJhbmRvbVVpbnQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJOdW1iZXIiLCJNQVhfU0FGRV9JTlRFR0VSIiwidW50aWxEYXRhQ2hhbm5lbE9wZW4iLCJkYXRhQ2hhbm5lbCIsInJlamVjdCIsInJlYWR5U3RhdGUiLCJyZXNvbHZlciIsInJlamVjdG9yIiwiY2xlYXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImlzSDI2NFZpZGVvU3VwcG9ydGVkIiwidmlkZW8iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjYW5QbGF5VHlwZSIsIk9QVVNfUEFSQU1FVEVSUyIsInVzZWR0eCIsInN0ZXJlbyIsIlBFRVJfQ09OTkVDVElPTl9DT05GSUciLCJpY2VTZXJ2ZXJzIiwidXJscyIsIldTX05PUk1BTF9DTE9TVVJFIiwiSmFudXNBZGFwdGVyIiwiY29uc3RydWN0b3IiLCJyb29tIiwiY2xpZW50SWQiLCJqb2luVG9rZW4iLCJzZXJ2ZXJVcmwiLCJ3ZWJSdGNPcHRpb25zIiwid3MiLCJzZXNzaW9uIiwicmVsaWFibGVUcmFuc3BvcnQiLCJ1bnJlbGlhYmxlVHJhbnNwb3J0IiwiaW5pdGlhbFJlY29ubmVjdGlvbkRlbGF5IiwicmVjb25uZWN0aW9uRGVsYXkiLCJyZWNvbm5lY3Rpb25UaW1lb3V0IiwibWF4UmVjb25uZWN0aW9uQXR0ZW1wdHMiLCJyZWNvbm5lY3Rpb25BdHRlbXB0cyIsInB1Ymxpc2hlciIsIm9jY3VwYW50cyIsImxlZnRPY2N1cGFudHMiLCJTZXQiLCJtZWRpYVN0cmVhbXMiLCJsb2NhbE1lZGlhU3RyZWFtIiwicGVuZGluZ01lZGlhUmVxdWVzdHMiLCJNYXAiLCJibG9ja2VkQ2xpZW50cyIsImZyb3plblVwZGF0ZXMiLCJ0aW1lT2Zmc2V0cyIsInNlcnZlclRpbWVSZXF1ZXN0cyIsImF2Z1RpbWVPZmZzZXQiLCJvbldlYnNvY2tldE9wZW4iLCJiaW5kIiwib25XZWJzb2NrZXRDbG9zZSIsIm9uV2Vic29ja2V0TWVzc2FnZSIsIm9uRGF0YUNoYW5uZWxNZXNzYWdlIiwib25EYXRhIiwic2V0U2VydmVyVXJsIiwidXJsIiwic2V0QXBwIiwiYXBwIiwic2V0Um9vbSIsInJvb21OYW1lIiwic2V0Sm9pblRva2VuIiwic2V0Q2xpZW50SWQiLCJzZXRXZWJSdGNPcHRpb25zIiwib3B0aW9ucyIsInNldFNlcnZlckNvbm5lY3RMaXN0ZW5lcnMiLCJzdWNjZXNzTGlzdGVuZXIiLCJmYWlsdXJlTGlzdGVuZXIiLCJjb25uZWN0U3VjY2VzcyIsImNvbm5lY3RGYWlsdXJlIiwic2V0Um9vbU9jY3VwYW50TGlzdGVuZXIiLCJvY2N1cGFudExpc3RlbmVyIiwib25PY2N1cGFudHNDaGFuZ2VkIiwic2V0RGF0YUNoYW5uZWxMaXN0ZW5lcnMiLCJvcGVuTGlzdGVuZXIiLCJjbG9zZWRMaXN0ZW5lciIsIm1lc3NhZ2VMaXN0ZW5lciIsIm9uT2NjdXBhbnRDb25uZWN0ZWQiLCJvbk9jY3VwYW50RGlzY29ubmVjdGVkIiwib25PY2N1cGFudE1lc3NhZ2UiLCJzZXRSZWNvbm5lY3Rpb25MaXN0ZW5lcnMiLCJyZWNvbm5lY3RpbmdMaXN0ZW5lciIsInJlY29ubmVjdGVkTGlzdGVuZXIiLCJyZWNvbm5lY3Rpb25FcnJvckxpc3RlbmVyIiwib25SZWNvbm5lY3RpbmciLCJvblJlY29ubmVjdGVkIiwib25SZWNvbm5lY3Rpb25FcnJvciIsImNvbm5lY3QiLCJ3ZWJzb2NrZXRDb25uZWN0aW9uIiwiV2ViU29ja2V0IiwiSmFudXNTZXNzaW9uIiwic2VuZCIsInZlcmJvc2UiLCJ0aW1lb3V0TXMiLCJrZWVwYWxpdmVNcyIsIm9uT3BlbiIsIm9uRXJyb3IiLCJjYXRjaCIsImFsbCIsInVwZGF0ZVRpbWVPZmZzZXQiLCJkaXNjb25uZWN0IiwiY2xlYXJUaW1lb3V0IiwicmVtb3ZlQWxsT2NjdXBhbnRzIiwiY29ubiIsImNsb3NlIiwiZGlzcG9zZSIsImlzRGlzY29ubmVjdGVkIiwiY3JlYXRlIiwiY3JlYXRlUHVibGlzaGVyIiwiaSIsImluaXRpYWxPY2N1cGFudHMiLCJsZW5ndGgiLCJhZGRPY2N1cGFudCIsImV2ZW50IiwiY29kZSIsInNldFRpbWVvdXQiLCJyZWNvbm5lY3QiLCJFcnJvciIsInJlY2VpdmUiLCJKU09OIiwicGFyc2UiLCJkYXRhIiwib2NjdXBhbnRJZCIsInN1YnNjcmliZXIiLCJjcmVhdGVTdWJzY3JpYmVyIiwic2V0TWVkaWFTdHJlYW0iLCJtZWRpYVN0cmVhbSIsIk9iamVjdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJyZW1vdmVPY2N1cGFudCIsImFkZCIsImhhcyIsIm1zZyIsImdldCIsImF1ZGlvIiwiZGVsZXRlIiwiYXNzb2NpYXRlIiwiaGFuZGxlIiwiZXYiLCJzZW5kVHJpY2tsZSIsImNhbmRpZGF0ZSIsImUiLCJvZmZlciIsImNyZWF0ZU9mZmVyIiwiY29uZmlndXJlUHVibGlzaGVyU2RwIiwiZml4U2FmYXJpSWNlVUZyYWciLCJsb2NhbCIsIm8iLCJzZXRMb2NhbERlc2NyaXB0aW9uIiwicmVtb3RlIiwiaiIsInNlbmRKc2VwIiwiciIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwianNlcCIsIm9uIiwidHlwZSIsImFuc3dlciIsImNvbmZpZ3VyZVN1YnNjcmliZXJTZHAiLCJjcmVhdGVBbnN3ZXIiLCJhIiwiSmFudXNQbHVnaW5IYW5kbGUiLCJSVENQZWVyQ29ubmVjdGlvbiIsImF0dGFjaCIsIndlYnJ0Y3VwIiwicmVsaWFibGVDaGFubmVsIiwiY3JlYXRlRGF0YUNoYW5uZWwiLCJvcmRlcmVkIiwidW5yZWxpYWJsZUNoYW5uZWwiLCJtYXhSZXRyYW5zbWl0cyIsImdldFRyYWNrcyIsImZvckVhY2giLCJhZGRUcmFjayIsInRyYWNrIiwicGx1Z2luZGF0YSIsInJvb21faWQiLCJ1c2VyX2lkIiwiYm9keSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImJ5IiwibWVzc2FnZSIsInNlbmRKb2luIiwibm90aWZpY2F0aW9ucyIsInN1Y2Nlc3MiLCJlcnIiLCJjb25zb2xlIiwicmVzcG9uc2UiLCJ1c2VycyIsInNkcCIsInJlcGxhY2UiLCJsaW5lIiwicHQiLCJwYXJhbWV0ZXJzIiwiYXNzaWduIiwicGFyc2VGbXRwIiwid3JpdGVGbXRwIiwicGF5bG9hZFR5cGUiLCJpbmRleE9mIiwicmVzcCIsIm1lZGlhIiwiaW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJfaU9TSGFja0RlbGF5ZWRJbml0aWFsUGVlciIsIk1lZGlhU3RyZWFtIiwicmVjZWl2ZXJzIiwiZ2V0UmVjZWl2ZXJzIiwicmVjZWl2ZXIiLCJzdWJzY3JpYmUiLCJzZW5kTWVzc2FnZSIsImtpbmQiLCJ0b2tlbiIsInRvZ2dsZUZyZWV6ZSIsImZyb3plbiIsInVuZnJlZXplIiwiZnJlZXplIiwiZmx1c2hQZW5kaW5nVXBkYXRlcyIsImRhdGFGb3JVcGRhdGVNdWx0aU1lc3NhZ2UiLCJuZXR3b3JrSWQiLCJsIiwiZCIsImdldFBlbmRpbmdEYXRhIiwiZGF0YVR5cGUiLCJvd25lciIsImdldFBlbmRpbmdEYXRhRm9yTmV0d29ya0lkIiwic291cmNlIiwic3RvcmVNZXNzYWdlIiwic3RvcmVTaW5nbGVNZXNzYWdlIiwiaW5kZXgiLCJ1bmRlZmluZWQiLCJzZXQiLCJzdG9yZWRNZXNzYWdlIiwic3RvcmVkRGF0YSIsImlzT3V0ZGF0ZWRNZXNzYWdlIiwibGFzdE93bmVyVGltZSIsImlzQ29udGVtcG9yYW5lb3VzTWVzc2FnZSIsImNyZWF0ZWRXaGlsZUZyb3plbiIsImlzRmlyc3RTeW5jIiwiY29tcG9uZW50cyIsImVuYWJsZWQiLCJzaG91bGRTdGFydENvbm5lY3Rpb25UbyIsImNsaWVudCIsInN0YXJ0U3RyZWFtQ29ubmVjdGlvbiIsImNsb3NlU3RyZWFtQ29ubmVjdGlvbiIsImdldENvbm5lY3RTdGF0dXMiLCJOQUYiLCJhZGFwdGVycyIsIklTX0NPTk5FQ1RFRCIsIk5PVF9DT05ORUNURUQiLCJjbGllbnRTZW50VGltZSIsIkRhdGUiLCJub3ciLCJyZXMiLCJmZXRjaCIsImxvY2F0aW9uIiwiaHJlZiIsIm1ldGhvZCIsImNhY2hlIiwicHJlY2lzaW9uIiwic2VydmVyUmVjZWl2ZWRUaW1lIiwiaGVhZGVycyIsImdldFRpbWUiLCJjbGllbnRSZWNlaXZlZFRpbWUiLCJzZXJ2ZXJUaW1lIiwidGltZU9mZnNldCIsInB1c2giLCJyZWR1Y2UiLCJhY2MiLCJvZmZzZXQiLCJnZXRTZXJ2ZXJUaW1lIiwiZ2V0TWVkaWFTdHJlYW0iLCJhdWRpb1Byb21pc2UiLCJ2aWRlb1Byb21pc2UiLCJwcm9taXNlIiwic3RyZWFtIiwiYXVkaW9TdHJlYW0iLCJnZXRBdWRpb1RyYWNrcyIsInZpZGVvU3RyZWFtIiwiZ2V0VmlkZW9UcmFja3MiLCJzZXRMb2NhbE1lZGlhU3RyZWFtIiwiZXhpc3RpbmdTZW5kZXJzIiwiZ2V0U2VuZGVycyIsIm5ld1NlbmRlcnMiLCJ0cmFja3MiLCJ0Iiwic2VuZGVyIiwiZmluZCIsInMiLCJyZXBsYWNlVHJhY2siLCJ0b0xvd2VyQ2FzZSIsInJlbW92ZVRyYWNrIiwiaW5jbHVkZXMiLCJlbmFibGVNaWNyb3Bob25lIiwic2VuZERhdGEiLCJzdHJpbmdpZnkiLCJ3aG9tIiwic2VuZERhdGFHdWFyYW50ZWVkIiwiYnJvYWRjYXN0RGF0YSIsImJyb2FkY2FzdERhdGFHdWFyYW50ZWVkIiwia2ljayIsInBlcm1zVG9rZW4iLCJibG9jayIsInVuYmxvY2siLCJyZWdpc3RlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7OztBQ2pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLFNBQVM7QUFDdEIsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsYUFBYSw4QkFBOEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsU0FBUztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxTQUFTO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELHFCQUFxQjtBQUNyRTs7QUFFQTtBQUNBO0FBQ0EsK0JBQStCLGFBQWE7QUFDNUM7O0FBRUE7QUFDQTtBQUNBLCtCQUErQixTQUFTLGNBQWM7QUFDdEQ7O0FBRUE7QUFDQTtBQUNBLCtCQUErQix1QkFBdUI7QUFDdEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRkFBK0Y7QUFDL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUdBQXFHO0FBQ3JHO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsNENBQTRDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLHFDQUFxQztBQUNyQztBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLDBCQUEwQixjQUFjOztBQUV4Qyx3QkFBd0I7QUFDeEIsNEJBQTRCLHNCQUFzQjtBQUNsRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzVQQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLE9BQU87QUFDbEIsWUFBWSxNQUFNO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZKQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQjtBQUNwQiwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pELGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTCxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0IsT0FBTztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtB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QU4sRUFBZ0I7QUFDZCxXQUFPLEtBQUthLFNBQUwsQ0FBZXFHLE1BQWYsQ0FBc0IwRSxXQUF0QixDQUFrQyxFQUFFQyxNQUFNLE9BQVIsRUFBaUJxRixNQUFNbFIsUUFBdkIsRUFBbEMsRUFBcUVqQyxJQUFyRSxDQUEwRSxNQUFNO0FBQ3JGLFdBQUtzRCxjQUFMLENBQW9CNEwsR0FBcEIsQ0FBd0JqTixRQUF4QixFQUFrQyxJQUFsQztBQUNBYixlQUFTdUssSUFBVCxDQUFjQyxhQUFkLENBQTRCLElBQUlDLFdBQUosQ0FBZ0IsU0FBaEIsRUFBMkIsRUFBRUMsUUFBUSxFQUFFN0osVUFBVUEsUUFBWixFQUFWLEVBQTNCLENBQTVCO0FBQ0QsS0FITSxDQUFQO0FBSUQ7O0FBRUR5UixVQUFRelIsUUFBUixFQUFrQjtBQUNoQixXQUFPLEtBQUthLFNBQUwsQ0FBZXFHLE1BQWYsQ0FBc0IwRSxXQUF0QixDQUFrQyxFQUFFQyxNQUFNLFNBQVIsRUFBbUJxRixNQUFNbFIsUUFBekIsRUFBbEMsRUFBdUVqQyxJQUF2RSxDQUE0RSxNQUFNO0FBQ3ZGLFdBQUtzRCxjQUFMLENBQW9CMkYsTUFBcEIsQ0FBMkJoSCxRQUEzQjtBQUNBYixlQUFTdUssSUFBVCxDQUFjQyxhQUFkLENBQTRCLElBQUlDLFdBQUosQ0FBZ0IsV0FBaEIsRUFBNkIsRUFBRUMsUUFBUSxFQUFFN0osVUFBVUEsUUFBWixFQUFWLEVBQTdCLENBQTVCO0FBQ0QsS0FITSxDQUFQO0FBSUQ7QUEvM0JnQjs7QUFrNEJuQmdPLElBQUlDLFFBQUosQ0FBYXlELFFBQWIsQ0FBc0IsT0FBdEIsRUFBK0I3UixZQUEvQjs7QUFFQThSLE9BQU9DLE9BQVAsR0FBaUIvUixZQUFqQixDIiwiZmlsZSI6Im5hZi1qYW51cy1hZGFwdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kZWJ1ZycpO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWVcbiAgICAgICAgICAgICAgICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbFxuICAgICAgICAgICAgICAgICAgOiBsb2NhbHN0b3JhZ2UoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG4gICcjMDAwMENDJywgJyMwMDAwRkYnLCAnIzAwMzNDQycsICcjMDAzM0ZGJywgJyMwMDY2Q0MnLCAnIzAwNjZGRicsICcjMDA5OUNDJyxcbiAgJyMwMDk5RkYnLCAnIzAwQ0MwMCcsICcjMDBDQzMzJywgJyMwMENDNjYnLCAnIzAwQ0M5OScsICcjMDBDQ0NDJywgJyMwMENDRkYnLFxuICAnIzMzMDBDQycsICcjMzMwMEZGJywgJyMzMzMzQ0MnLCAnIzMzMzNGRicsICcjMzM2NkNDJywgJyMzMzY2RkYnLCAnIzMzOTlDQycsXG4gICcjMzM5OUZGJywgJyMzM0NDMDAnLCAnIzMzQ0MzMycsICcjMzNDQzY2JywgJyMzM0NDOTknLCAnIzMzQ0NDQycsICcjMzNDQ0ZGJyxcbiAgJyM2NjAwQ0MnLCAnIzY2MDBGRicsICcjNjYzM0NDJywgJyM2NjMzRkYnLCAnIzY2Q0MwMCcsICcjNjZDQzMzJywgJyM5OTAwQ0MnLFxuICAnIzk5MDBGRicsICcjOTkzM0NDJywgJyM5OTMzRkYnLCAnIzk5Q0MwMCcsICcjOTlDQzMzJywgJyNDQzAwMDAnLCAnI0NDMDAzMycsXG4gICcjQ0MwMDY2JywgJyNDQzAwOTknLCAnI0NDMDBDQycsICcjQ0MwMEZGJywgJyNDQzMzMDAnLCAnI0NDMzMzMycsICcjQ0MzMzY2JyxcbiAgJyNDQzMzOTknLCAnI0NDMzNDQycsICcjQ0MzM0ZGJywgJyNDQzY2MDAnLCAnI0NDNjYzMycsICcjQ0M5OTAwJywgJyNDQzk5MzMnLFxuICAnI0NDQ0MwMCcsICcjQ0NDQzMzJywgJyNGRjAwMDAnLCAnI0ZGMDAzMycsICcjRkYwMDY2JywgJyNGRjAwOTknLCAnI0ZGMDBDQycsXG4gICcjRkYwMEZGJywgJyNGRjMzMDAnLCAnI0ZGMzMzMycsICcjRkYzMzY2JywgJyNGRjMzOTknLCAnI0ZGMzNDQycsICcjRkYzM0ZGJyxcbiAgJyNGRjY2MDAnLCAnI0ZGNjYzMycsICcjRkY5OTAwJywgJyNGRjk5MzMnLCAnI0ZGQ0MwMCcsICcjRkZDQzMzJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgYW5kIEVkZ2UgZG8gbm90IHN1cHBvcnQgY29sb3JzLlxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goLyhlZGdlfHRyaWRlbnQpXFwvKFxcZCspLykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBpcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuICAvLyBkb2N1bWVudCBpcyB1bmRlZmluZWQgaW4gcmVhY3QtbmF0aXZlOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL3B1bGwvMTYzMlxuICByZXR1cm4gKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuV2Via2l0QXBwZWFyYW5jZSkgfHxcbiAgICAvLyBpcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG4gICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS5maXJlYnVnIHx8ICh3aW5kb3cuY29uc29sZS5leGNlcHRpb24gJiYgd2luZG93LmNvbnNvbGUudGFibGUpKSkgfHxcbiAgICAvLyBpcyBmaXJlZm94ID49IHYzMT9cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSAmJiBwYXJzZUludChSZWdFeHAuJDEsIDEwKSA+PSAzMSkgfHxcbiAgICAvLyBkb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbih2KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyLm1lc3NhZ2U7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcbiAgdmFyIHVzZUNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXG4gIGFyZ3NbMF0gPSAodXNlQ29sb3JzID8gJyVjJyA6ICcnKVxuICAgICsgdGhpcy5uYW1lc3BhY2VcbiAgICArICh1c2VDb2xvcnMgPyAnICVjJyA6ICcgJylcbiAgICArIGFyZ3NbMF1cbiAgICArICh1c2VDb2xvcnMgPyAnJWMgJyA6ICcgJylcbiAgICArICcrJyArIGV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuICBpZiAoIXVzZUNvbG9ycykgcmV0dXJuO1xuXG4gIHZhciBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcbiAgYXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0JylcblxuICAvLyB0aGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuICAvLyBhcmd1bWVudHMgcGFzc2VkIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlICVjLCBzbyB3ZSBuZWVkIHRvXG4gIC8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGFzdEMgPSAwO1xuICBhcmdzWzBdLnJlcGxhY2UoLyVbYS16QS1aJV0vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICBpZiAoJyUlJyA9PT0gbWF0Y2gpIHJldHVybjtcbiAgICBpbmRleCsrO1xuICAgIGlmICgnJWMnID09PSBtYXRjaCkge1xuICAgICAgLy8gd2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG4gICAgICAvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuICAgICAgbGFzdEMgPSBpbmRleDtcbiAgICB9XG4gIH0pO1xuXG4gIGFyZ3Muc3BsaWNlKGxhc3RDLCAwLCBjKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGBjb25zb2xlLmxvZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUubG9nYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBsb2coKSB7XG4gIC8vIHRoaXMgaGFja2VyeSBpcyByZXF1aXJlZCBmb3IgSUU4LzksIHdoZXJlXG4gIC8vIHRoZSBgY29uc29sZS5sb2dgIGZ1bmN0aW9uIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG4gIHJldHVybiAnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbnNvbGVcbiAgICAmJiBjb25zb2xlLmxvZ1xuICAgICYmIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUubG9nLCBjb25zb2xlLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcbiAgdHJ5IHtcbiAgICBpZiAobnVsbCA9PSBuYW1lc3BhY2VzKSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLmRlYnVnID0gbmFtZXNwYWNlcztcbiAgICB9XG4gIH0gY2F0Y2goZSkge31cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuICB2YXIgcjtcbiAgdHJ5IHtcbiAgICByID0gZXhwb3J0cy5zdG9yYWdlLmRlYnVnO1xuICB9IGNhdGNoKGUpIHt9XG5cbiAgLy8gSWYgZGVidWcgaXNuJ3Qgc2V0IGluIExTLCBhbmQgd2UncmUgaW4gRWxlY3Ryb24sIHRyeSB0byBsb2FkICRERUJVR1xuICBpZiAoIXIgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICdlbnYnIGluIHByb2Nlc3MpIHtcbiAgICByID0gcHJvY2Vzcy5lbnYuREVCVUc7XG4gIH1cblxuICByZXR1cm4gcjtcbn1cblxuLyoqXG4gKiBFbmFibGUgbmFtZXNwYWNlcyBsaXN0ZWQgaW4gYGxvY2FsU3RvcmFnZS5kZWJ1Z2AgaW5pdGlhbGx5LlxuICovXG5cbmV4cG9ydHMuZW5hYmxlKGxvYWQoKSk7XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICB9IGNhdGNoIChlKSB7fVxufVxuIiwiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWdbJ2RlZmF1bHQnXSA9IGNyZWF0ZURlYnVnO1xuZXhwb3J0cy5jb2VyY2UgPSBjb2VyY2U7XG5leHBvcnRzLmRpc2FibGUgPSBkaXNhYmxlO1xuZXhwb3J0cy5lbmFibGUgPSBlbmFibGU7XG5leHBvcnRzLmVuYWJsZWQgPSBlbmFibGVkO1xuZXhwb3J0cy5odW1hbml6ZSA9IHJlcXVpcmUoJ21zJyk7XG5cbi8qKlxuICogQWN0aXZlIGBkZWJ1Z2AgaW5zdGFuY2VzLlxuICovXG5leHBvcnRzLmluc3RhbmNlcyA9IFtdO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4vKipcbiAqIFNlbGVjdCBhIGNvbG9yLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG4gIHZhciBoYXNoID0gMCwgaTtcblxuICBmb3IgKGkgaW4gbmFtZXNwYWNlKSB7XG4gICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblxuICB2YXIgcHJldlRpbWU7XG5cbiAgZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgLy8gZGlzYWJsZWQ/XG4gICAgaWYgKCFkZWJ1Zy5lbmFibGVkKSByZXR1cm47XG5cbiAgICB2YXIgc2VsZiA9IGRlYnVnO1xuXG4gICAgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbiAgICB2YXIgY3VyciA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG4gICAgc2VsZi5kaWZmID0gbXM7XG4gICAgc2VsZi5wcmV2ID0gcHJldlRpbWU7XG4gICAgc2VsZi5jdXJyID0gY3VycjtcbiAgICBwcmV2VGltZSA9IGN1cnI7XG5cbiAgICAvLyB0dXJuIHRoZSBgYXJndW1lbnRzYCBpbnRvIGEgcHJvcGVyIEFycmF5XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGFyZ3NbMF0gPSBleHBvcnRzLmNvZXJjZShhcmdzWzBdKTtcblxuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGFyZ3NbMF0pIHtcbiAgICAgIC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG4gICAgICBhcmdzLnVuc2hpZnQoJyVPJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCBmdW5jdGlvbihtYXRjaCwgZm9ybWF0KSB7XG4gICAgICAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG4gICAgICBpZiAobWF0Y2ggPT09ICclJScpIHJldHVybiBtYXRjaDtcbiAgICAgIGluZGV4Kys7XG4gICAgICB2YXIgZm9ybWF0dGVyID0gZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZvcm1hdHRlcikge1xuICAgICAgICB2YXIgdmFsID0gYXJnc1tpbmRleF07XG4gICAgICAgIG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuICAgICAgICAvLyBub3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG4gICAgICAgIGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaW5kZXgtLTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcblxuICAgIC8vIGFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG4gICAgZXhwb3J0cy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cbiAgICB2YXIgbG9nRm4gPSBkZWJ1Zy5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuXG4gIGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgZGVidWcuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpO1xuICBkZWJ1Zy51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICBkZWJ1Zy5jb2xvciA9IHNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG4gIGRlYnVnLmRlc3Ryb3kgPSBkZXN0cm95O1xuXG4gIC8vIGVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZXhwb3J0cy5pbml0KSB7XG4gICAgZXhwb3J0cy5pbml0KGRlYnVnKTtcbiAgfVxuXG4gIGV4cG9ydHMuaW5zdGFuY2VzLnB1c2goZGVidWcpO1xuXG4gIHJldHVybiBkZWJ1Zztcbn1cblxuZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gIHZhciBpbmRleCA9IGV4cG9ydHMuaW5zdGFuY2VzLmluZGV4T2YodGhpcyk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBleHBvcnRzLmluc3RhbmNlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgZXhwb3J0cy5zYXZlKG5hbWVzcGFjZXMpO1xuXG4gIGV4cG9ydHMubmFtZXMgPSBbXTtcbiAgZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4gIHZhciBpO1xuICB2YXIgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuICB2YXIgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghc3BsaXRbaV0pIGNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgIGV4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgZXhwb3J0cy5pbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBleHBvcnRzLmluc3RhbmNlc1tpXTtcbiAgICBpbnN0YW5jZS5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKGluc3RhbmNlLm5hbWVzcGFjZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIGV4cG9ydHMuZW5hYmxlKCcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICBpZiAobmFtZVtuYW1lLmxlbmd0aCAtIDFdID09PSAnKicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICByZXR1cm4gdmFsO1xufVxuIiwiLyoqXG4gKiBSZXByZXNlbnRzIGEgaGFuZGxlIHRvIGEgc2luZ2xlIEphbnVzIHBsdWdpbiBvbiBhIEphbnVzIHNlc3Npb24uIEVhY2ggV2ViUlRDIGNvbm5lY3Rpb24gdG8gdGhlIEphbnVzIHNlcnZlciB3aWxsIGJlXG4gKiBhc3NvY2lhdGVkIHdpdGggYSBzaW5nbGUgaGFuZGxlLiBPbmNlIGF0dGFjaGVkIHRvIHRoZSBzZXJ2ZXIsIHRoaXMgaGFuZGxlIHdpbGwgYmUgZ2l2ZW4gYSB1bmlxdWUgSUQgd2hpY2ggc2hvdWxkIGJlXG4gKiB1c2VkIHRvIGFzc29jaWF0ZSBpdCB3aXRoIGZ1dHVyZSBzaWduYWxsaW5nIG1lc3NhZ2VzLlxuICpcbiAqIFNlZSBodHRwczovL2phbnVzLmNvbmYubWVldGVjaG8uY29tL2RvY3MvcmVzdC5odG1sI2hhbmRsZXMuXG4gKiovXG5mdW5jdGlvbiBKYW51c1BsdWdpbkhhbmRsZShzZXNzaW9uKSB7XG4gIHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XG4gIHRoaXMuaWQgPSB1bmRlZmluZWQ7XG59XG5cbi8qKiBBdHRhY2hlcyB0aGlzIGhhbmRsZSB0byB0aGUgSmFudXMgc2VydmVyIGFuZCBzZXRzIGl0cyBJRC4gKiovXG5KYW51c1BsdWdpbkhhbmRsZS5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24ocGx1Z2luKSB7XG4gIHZhciBwYXlsb2FkID0geyBwbHVnaW46IHBsdWdpbiwgXCJmb3JjZS1idW5kbGVcIjogdHJ1ZSwgXCJmb3JjZS1ydGNwLW11eFwiOiB0cnVlIH07XG4gIHJldHVybiB0aGlzLnNlc3Npb24uc2VuZChcImF0dGFjaFwiLCBwYXlsb2FkKS50aGVuKHJlc3AgPT4ge1xuICAgIHRoaXMuaWQgPSByZXNwLmRhdGEuaWQ7XG4gICAgcmV0dXJuIHJlc3A7XG4gIH0pO1xufTtcblxuLyoqIERldGFjaGVzIHRoaXMgaGFuZGxlLiAqKi9cbkphbnVzUGx1Z2luSGFuZGxlLnByb3RvdHlwZS5kZXRhY2ggPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc2VuZChcImRldGFjaFwiKTtcbn07XG5cbi8qKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0byBiZSBmaXJlZCB1cG9uIHRoZSByZWNlcHRpb24gb2YgYW55IGluY29taW5nIEphbnVzIHNpZ25hbHMgZm9yIHRoaXMgcGx1Z2luIGhhbmRsZSB3aXRoIHRoZVxuICogYGphbnVzYCBhdHRyaWJ1dGUgZXF1YWwgdG8gYGV2YC5cbiAqKi9cbkphbnVzUGx1Z2luSGFuZGxlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKGV2LCBjYWxsYmFjaykge1xuICByZXR1cm4gdGhpcy5zZXNzaW9uLm9uKGV2LCBzaWduYWwgPT4ge1xuICAgIGlmIChzaWduYWwuc2VuZGVyID09IHRoaXMuaWQpIHtcbiAgICAgIGNhbGxiYWNrKHNpZ25hbCk7XG4gICAgfVxuICB9KTtcbn07XG5cbi8qKlxuICogU2VuZHMgYSBzaWduYWwgYXNzb2NpYXRlZCB3aXRoIHRoaXMgaGFuZGxlLiBTaWduYWxzIHNob3VsZCBiZSBKU09OLXNlcmlhbGl6YWJsZSBvYmplY3RzLiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGxcbiAqIGJlIHJlc29sdmVkIG9yIHJlamVjdGVkIHdoZW4gYSByZXNwb25zZSB0byB0aGlzIHNpZ25hbCBpcyByZWNlaXZlZCwgb3Igd2hlbiBubyByZXNwb25zZSBpcyByZWNlaXZlZCB3aXRoaW4gdGhlXG4gKiBzZXNzaW9uIHRpbWVvdXQuXG4gKiovXG5KYW51c1BsdWdpbkhhbmRsZS5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKHR5cGUsIHNpZ25hbCkge1xuICByZXR1cm4gdGhpcy5zZXNzaW9uLnNlbmQodHlwZSwgT2JqZWN0LmFzc2lnbih7IGhhbmRsZV9pZDogdGhpcy5pZCB9LCBzaWduYWwpKTtcbn07XG5cbi8qKiBTZW5kcyBhIHBsdWdpbi1zcGVjaWZpYyBtZXNzYWdlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGhhbmRsZS4gKiovXG5KYW51c1BsdWdpbkhhbmRsZS5wcm90b3R5cGUuc2VuZE1lc3NhZ2UgPSBmdW5jdGlvbihib2R5KSB7XG4gIHJldHVybiB0aGlzLnNlbmQoXCJtZXNzYWdlXCIsIHsgYm9keTogYm9keSB9KTtcbn07XG5cbi8qKiBTZW5kcyBhIEpTRVAgb2ZmZXIgb3IgYW5zd2VyIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGhhbmRsZS4gKiovXG5KYW51c1BsdWdpbkhhbmRsZS5wcm90b3R5cGUuc2VuZEpzZXAgPSBmdW5jdGlvbihqc2VwKSB7XG4gIHJldHVybiB0aGlzLnNlbmQoXCJtZXNzYWdlXCIsIHsgYm9keToge30sIGpzZXA6IGpzZXAgfSk7XG59O1xuXG4vKiogU2VuZHMgYW4gSUNFIHRyaWNrbGUgY2FuZGlkYXRlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGhhbmRsZS4gKiovXG5KYW51c1BsdWdpbkhhbmRsZS5wcm90b3R5cGUuc2VuZFRyaWNrbGUgPSBmdW5jdGlvbihjYW5kaWRhdGUpIHtcbiAgcmV0dXJuIHRoaXMuc2VuZChcInRyaWNrbGVcIiwgeyBjYW5kaWRhdGU6IGNhbmRpZGF0ZSB9KTtcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIEphbnVzIHNlc3Npb24gLS0gYSBKYW51cyBjb250ZXh0IGZyb20gd2l0aGluIHdoaWNoIHlvdSBjYW4gb3BlbiBtdWx0aXBsZSBoYW5kbGVzIGFuZCBjb25uZWN0aW9ucy4gT25jZVxuICogY3JlYXRlZCwgdGhpcyBzZXNzaW9uIHdpbGwgYmUgZ2l2ZW4gYSB1bmlxdWUgSUQgd2hpY2ggc2hvdWxkIGJlIHVzZWQgdG8gYXNzb2NpYXRlIGl0IHdpdGggZnV0dXJlIHNpZ25hbGxpbmcgbWVzc2FnZXMuXG4gKlxuICogU2VlIGh0dHBzOi8vamFudXMuY29uZi5tZWV0ZWNoby5jb20vZG9jcy9yZXN0Lmh0bWwjc2Vzc2lvbnMuXG4gKiovXG5mdW5jdGlvbiBKYW51c1Nlc3Npb24ob3V0cHV0LCBvcHRpb25zKSB7XG4gIHRoaXMub3V0cHV0ID0gb3V0cHV0O1xuICB0aGlzLmlkID0gdW5kZWZpbmVkO1xuICB0aGlzLm5leHRUeElkID0gMDtcbiAgdGhpcy50eG5zID0ge307XG4gIHRoaXMuZXZlbnRIYW5kbGVycyA9IHt9O1xuICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICB2ZXJib3NlOiBmYWxzZSxcbiAgICB0aW1lb3V0TXM6IDEwMDAwLFxuICAgIGtlZXBhbGl2ZU1zOiAzMDAwMFxuICB9LCBvcHRpb25zKTtcbn1cblxuLyoqIENyZWF0ZXMgdGhpcyBzZXNzaW9uIG9uIHRoZSBKYW51cyBzZXJ2ZXIgYW5kIHNldHMgaXRzIElELiAqKi9cbkphbnVzU2Vzc2lvbi5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnNlbmQoXCJjcmVhdGVcIikudGhlbihyZXNwID0+IHtcbiAgICB0aGlzLmlkID0gcmVzcC5kYXRhLmlkO1xuICAgIHJldHVybiByZXNwO1xuICB9KTtcbn07XG5cbi8qKlxuICogRGVzdHJveXMgdGhpcyBzZXNzaW9uLiBOb3RlIHRoYXQgdXBvbiBkZXN0cnVjdGlvbiwgSmFudXMgd2lsbCBhbHNvIGNsb3NlIHRoZSBzaWduYWxsaW5nIHRyYW5zcG9ydCAoaWYgYXBwbGljYWJsZSkgYW5kXG4gKiBhbnkgb3BlbiBXZWJSVEMgY29ubmVjdGlvbnMuXG4gKiovXG5KYW51c1Nlc3Npb24ucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc2VuZChcImRlc3Ryb3lcIikudGhlbigocmVzcCkgPT4ge1xuICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgIHJldHVybiByZXNwO1xuICB9KTtcbn07XG5cbi8qKlxuICogRGlzcG9zZXMgb2YgdGhpcyBzZXNzaW9uIGluIGEgd2F5IHN1Y2ggdGhhdCBubyBmdXJ0aGVyIGluY29taW5nIHNpZ25hbGxpbmcgbWVzc2FnZXMgd2lsbCBiZSBwcm9jZXNzZWQuXG4gKiBPdXRzdGFuZGluZyB0cmFuc2FjdGlvbnMgd2lsbCBiZSByZWplY3RlZC5cbiAqKi9cbkphbnVzU2Vzc2lvbi5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9raWxsS2VlcGFsaXZlKCk7XG4gIHRoaXMuZXZlbnRIYW5kbGVycyA9IHt9O1xuICBmb3IgKHZhciB0eElkIGluIHRoaXMudHhucykge1xuICAgIGlmICh0aGlzLnR4bnMuaGFzT3duUHJvcGVydHkodHhJZCkpIHtcbiAgICAgIHZhciB0eG4gPSB0aGlzLnR4bnNbdHhJZF07XG4gICAgICBjbGVhclRpbWVvdXQodHhuLnRpbWVvdXQpO1xuICAgICAgdHhuLnJlamVjdChuZXcgRXJyb3IoXCJKYW51cyBzZXNzaW9uIHdhcyBkaXNwb3NlZC5cIikpO1xuICAgICAgZGVsZXRlIHRoaXMudHhuc1t0eElkXTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogV2hldGhlciB0aGlzIHNpZ25hbCByZXByZXNlbnRzIGFuIGVycm9yLCBhbmQgdGhlIGFzc29jaWF0ZWQgcHJvbWlzZSAoaWYgYW55KSBzaG91bGQgYmUgcmVqZWN0ZWQuXG4gKiBVc2VycyBzaG91bGQgb3ZlcnJpZGUgdGhpcyB0byBoYW5kbGUgYW55IGN1c3RvbSBwbHVnaW4tc3BlY2lmaWMgZXJyb3IgY29udmVudGlvbnMuXG4gKiovXG5KYW51c1Nlc3Npb24ucHJvdG90eXBlLmlzRXJyb3IgPSBmdW5jdGlvbihzaWduYWwpIHtcbiAgcmV0dXJuIHNpZ25hbC5qYW51cyA9PT0gXCJlcnJvclwiO1xufTtcblxuLyoqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIGZpcmVkIHVwb24gdGhlIHJlY2VwdGlvbiBvZiBhbnkgaW5jb21pbmcgSmFudXMgc2lnbmFscyBmb3IgdGhpcyBzZXNzaW9uIHdpdGggdGhlXG4gKiBgamFudXNgIGF0dHJpYnV0ZSBlcXVhbCB0byBgZXZgLlxuICoqL1xuSmFudXNTZXNzaW9uLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKGV2LCBjYWxsYmFjaykge1xuICB2YXIgaGFuZGxlcnMgPSB0aGlzLmV2ZW50SGFuZGxlcnNbZXZdO1xuICBpZiAoaGFuZGxlcnMgPT0gbnVsbCkge1xuICAgIGhhbmRsZXJzID0gdGhpcy5ldmVudEhhbmRsZXJzW2V2XSA9IFtdO1xuICB9XG4gIGhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgcmVjZWl2aW5nIEpTT04gc2lnbmFsbGluZyBtZXNzYWdlcyBwZXJ0aW5lbnQgdG8gdGhpcyBzZXNzaW9uLiBJZiB0aGUgc2lnbmFscyBhcmUgcmVzcG9uc2VzIHRvIHByZXZpb3VzbHlcbiAqIHNlbnQgc2lnbmFscywgdGhlIHByb21pc2VzIGZvciB0aGUgb3V0Z29pbmcgc2lnbmFscyB3aWxsIGJlIHJlc29sdmVkIG9yIHJlamVjdGVkIGFwcHJvcHJpYXRlbHkgd2l0aCB0aGlzIHNpZ25hbCBhcyBhblxuICogYXJndW1lbnQuXG4gKlxuICogRXh0ZXJuYWwgY2FsbGVycyBzaG91bGQgY2FsbCB0aGlzIGZ1bmN0aW9uIGV2ZXJ5IHRpbWUgYSBuZXcgc2lnbmFsIGFycml2ZXMgb24gdGhlIHRyYW5zcG9ydDsgZm9yIGV4YW1wbGUsIGluIGFcbiAqIFdlYlNvY2tldCdzIGBtZXNzYWdlYCBldmVudCwgb3Igd2hlbiBhIG5ldyBkYXR1bSBzaG93cyB1cCBpbiBhbiBIVFRQIGxvbmctcG9sbGluZyByZXNwb25zZS5cbiAqKi9cbkphbnVzU2Vzc2lvbi5wcm90b3R5cGUucmVjZWl2ZSA9IGZ1bmN0aW9uKHNpZ25hbCkge1xuICBpZiAodGhpcy5vcHRpb25zLnZlcmJvc2UpIHtcbiAgICB0aGlzLl9sb2dJbmNvbWluZyhzaWduYWwpO1xuICB9XG4gIGlmIChzaWduYWwuc2Vzc2lvbl9pZCAhPSB0aGlzLmlkKSB7XG4gICAgY29uc29sZS53YXJuKFwiSW5jb3JyZWN0IHNlc3Npb24gSUQgcmVjZWl2ZWQgaW4gSmFudXMgc2lnbmFsbGluZyBtZXNzYWdlOiB3YXMgXCIgKyBzaWduYWwuc2Vzc2lvbl9pZCArIFwiLCBleHBlY3RlZCBcIiArIHRoaXMuaWQgKyBcIi5cIik7XG4gIH1cblxuICB2YXIgcmVzcG9uc2VUeXBlID0gc2lnbmFsLmphbnVzO1xuICB2YXIgaGFuZGxlcnMgPSB0aGlzLmV2ZW50SGFuZGxlcnNbcmVzcG9uc2VUeXBlXTtcbiAgaWYgKGhhbmRsZXJzICE9IG51bGwpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBoYW5kbGVyc1tpXShzaWduYWwpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzaWduYWwudHJhbnNhY3Rpb24gIT0gbnVsbCkge1xuICAgIHZhciB0eG4gPSB0aGlzLnR4bnNbc2lnbmFsLnRyYW5zYWN0aW9uXTtcbiAgICBpZiAodHhuID09IG51bGwpIHtcbiAgICAgIC8vIHRoaXMgaXMgYSByZXNwb25zZSB0byBhIHRyYW5zYWN0aW9uIHRoYXQgd2Fzbid0IGNhdXNlZCB2aWEgSmFudXNTZXNzaW9uLnNlbmQsIG9yIGEgcGx1Z2luIHJlcGxpZWQgdHdpY2UgdG8gYVxuICAgICAgLy8gc2luZ2xlIHJlcXVlc3QsIG9yIHRoZSBzZXNzaW9uIHdhcyBkaXNwb3NlZCwgb3Igc29tZXRoaW5nIGVsc2UgdGhhdCBpc24ndCB1bmRlciBvdXIgcHVydmlldzsgdGhhdCdzIGZpbmVcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocmVzcG9uc2VUeXBlID09PSBcImFja1wiICYmIHR4bi50eXBlID09IFwibWVzc2FnZVwiKSB7XG4gICAgICAvLyB0aGlzIGlzIGFuIGFjayBvZiBhbiBhc3luY2hyb25vdXNseS1wcm9jZXNzZWQgcGx1Z2luIHJlcXVlc3QsIHdlIHNob3VsZCB3YWl0IHRvIHJlc29sdmUgdGhlIHByb21pc2UgdW50aWwgdGhlXG4gICAgICAvLyBhY3R1YWwgcmVzcG9uc2UgY29tZXMgaW5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjbGVhclRpbWVvdXQodHhuLnRpbWVvdXQpO1xuXG4gICAgZGVsZXRlIHRoaXMudHhuc1tzaWduYWwudHJhbnNhY3Rpb25dO1xuICAgICh0aGlzLmlzRXJyb3Ioc2lnbmFsKSA/IHR4bi5yZWplY3QgOiB0eG4ucmVzb2x2ZSkoc2lnbmFsKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZW5kcyBhIHNpZ25hbCBhc3NvY2lhdGVkIHdpdGggdGhpcyBzZXNzaW9uLCBiZWdpbm5pbmcgYSBuZXcgdHJhbnNhY3Rpb24uIFJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZSByZXNvbHZlZCBvclxuICogcmVqZWN0ZWQgd2hlbiBhIHJlc3BvbnNlIGlzIHJlY2VpdmVkIGluIHRoZSBzYW1lIHRyYW5zYWN0aW9uLCBvciB3aGVuIG5vIHJlc3BvbnNlIGlzIHJlY2VpdmVkIHdpdGhpbiB0aGUgc2Vzc2lvblxuICogdGltZW91dC5cbiAqKi9cbkphbnVzU2Vzc2lvbi5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKHR5cGUsIHNpZ25hbCkge1xuICBzaWduYWwgPSBPYmplY3QuYXNzaWduKHsgdHJhbnNhY3Rpb246ICh0aGlzLm5leHRUeElkKyspLnRvU3RyaW5nKCkgfSwgc2lnbmFsKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB2YXIgdGltZW91dCA9IG51bGw7XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lb3V0TXMpIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZGVsZXRlIHRoaXMudHhuc1tzaWduYWwudHJhbnNhY3Rpb25dO1xuICAgICAgICByZWplY3QobmV3IEVycm9yKFwiU2lnbmFsbGluZyB0cmFuc2FjdGlvbiB3aXRoIHR4aWQgXCIgKyBzaWduYWwudHJhbnNhY3Rpb24gKyBcIiB0aW1lZCBvdXQuXCIpKTtcbiAgICAgIH0sIHRoaXMub3B0aW9ucy50aW1lb3V0TXMpO1xuICAgIH1cbiAgICB0aGlzLnR4bnNbc2lnbmFsLnRyYW5zYWN0aW9uXSA9IHsgcmVzb2x2ZTogcmVzb2x2ZSwgcmVqZWN0OiByZWplY3QsIHRpbWVvdXQ6IHRpbWVvdXQsIHR5cGU6IHR5cGUgfTtcbiAgICB0aGlzLl90cmFuc21pdCh0eXBlLCBzaWduYWwpO1xuICB9KTtcbn07XG5cbkphbnVzU2Vzc2lvbi5wcm90b3R5cGUuX3RyYW5zbWl0ID0gZnVuY3Rpb24odHlwZSwgc2lnbmFsKSB7XG4gIHNpZ25hbCA9IE9iamVjdC5hc3NpZ24oeyBqYW51czogdHlwZSB9LCBzaWduYWwpO1xuXG4gIGlmICh0aGlzLmlkICE9IG51bGwpIHsgLy8gdGhpcy5pZCBpcyB1bmRlZmluZWQgaW4gdGhlIHNwZWNpYWwgY2FzZSB3aGVuIHdlJ3JlIHNlbmRpbmcgdGhlIHNlc3Npb24gY3JlYXRlIG1lc3NhZ2VcbiAgICBzaWduYWwgPSBPYmplY3QuYXNzaWduKHsgc2Vzc2lvbl9pZDogdGhpcy5pZCB9LCBzaWduYWwpO1xuICB9XG5cbiAgaWYgKHRoaXMub3B0aW9ucy52ZXJib3NlKSB7XG4gICAgdGhpcy5fbG9nT3V0Z29pbmcoc2lnbmFsKTtcbiAgfVxuXG4gIHRoaXMub3V0cHV0KEpTT04uc3RyaW5naWZ5KHNpZ25hbCkpO1xuICB0aGlzLl9yZXNldEtlZXBhbGl2ZSgpO1xufTtcblxuSmFudXNTZXNzaW9uLnByb3RvdHlwZS5fbG9nT3V0Z29pbmcgPSBmdW5jdGlvbihzaWduYWwpIHtcbiAgdmFyIGtpbmQgPSBzaWduYWwuamFudXM7XG4gIGlmIChraW5kID09PSBcIm1lc3NhZ2VcIiAmJiBzaWduYWwuanNlcCkge1xuICAgIGtpbmQgPSBzaWduYWwuanNlcC50eXBlO1xuICB9XG4gIHZhciBtZXNzYWdlID0gXCI+IE91dGdvaW5nIEphbnVzIFwiICsgKGtpbmQgfHwgXCJzaWduYWxcIikgKyBcIiAoI1wiICsgc2lnbmFsLnRyYW5zYWN0aW9uICsgXCIpOiBcIjtcbiAgY29uc29sZS5kZWJ1ZyhcIiVjXCIgKyBtZXNzYWdlLCBcImNvbG9yOiAjMDQwXCIsIHNpZ25hbCk7XG59O1xuXG5KYW51c1Nlc3Npb24ucHJvdG90eXBlLl9sb2dJbmNvbWluZyA9IGZ1bmN0aW9uKHNpZ25hbCkge1xuICB2YXIga2luZCA9IHNpZ25hbC5qYW51cztcbiAgdmFyIG1lc3NhZ2UgPSBzaWduYWwudHJhbnNhY3Rpb24gP1xuICAgICAgXCI8IEluY29taW5nIEphbnVzIFwiICsgKGtpbmQgfHwgXCJzaWduYWxcIikgKyBcIiAoI1wiICsgc2lnbmFsLnRyYW5zYWN0aW9uICsgXCIpOiBcIiA6XG4gICAgICBcIjwgSW5jb21pbmcgSmFudXMgXCIgKyAoa2luZCB8fCBcInNpZ25hbFwiKSArIFwiOiBcIjtcbiAgY29uc29sZS5kZWJ1ZyhcIiVjXCIgKyBtZXNzYWdlLCBcImNvbG9yOiAjMDA0XCIsIHNpZ25hbCk7XG59O1xuXG5KYW51c1Nlc3Npb24ucHJvdG90eXBlLl9zZW5kS2VlcGFsaXZlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnNlbmQoXCJrZWVwYWxpdmVcIik7XG59O1xuXG5KYW51c1Nlc3Npb24ucHJvdG90eXBlLl9raWxsS2VlcGFsaXZlID0gZnVuY3Rpb24oKSB7XG4gIGNsZWFyVGltZW91dCh0aGlzLmtlZXBhbGl2ZVRpbWVvdXQpO1xufTtcblxuSmFudXNTZXNzaW9uLnByb3RvdHlwZS5fcmVzZXRLZWVwYWxpdmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fa2lsbEtlZXBhbGl2ZSgpO1xuICBpZiAodGhpcy5vcHRpb25zLmtlZXBhbGl2ZU1zKSB7XG4gICAgdGhpcy5rZWVwYWxpdmVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9zZW5kS2VlcGFsaXZlKCkuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKFwiRXJyb3IgcmVjZWl2ZWQgZnJvbSBrZWVwYWxpdmU6IFwiLCBlKSk7XG4gICAgfSwgdGhpcy5vcHRpb25zLmtlZXBhbGl2ZU1zKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEphbnVzUGx1Z2luSGFuZGxlLFxuICBKYW51c1Nlc3Npb25cbn07XG4iLCIvKipcbiAqIEhlbHBlcnMuXG4gKi9cblxudmFyIHMgPSAxMDAwO1xudmFyIG0gPSBzICogNjA7XG52YXIgaCA9IG0gKiA2MDtcbnZhciBkID0gaCAqIDI0O1xudmFyIHkgPSBkICogMzY1LjI1O1xuXG4vKipcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHRocm93cyB7RXJyb3J9IHRocm93IGFuIGVycm9yIGlmIHZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgbnVtYmVyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gcGFyc2UodmFsKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiBpc05hTih2YWwpID09PSBmYWxzZSkge1xuICAgIHJldHVybiBvcHRpb25zLmxvbmcgPyBmbXRMb25nKHZhbCkgOiBmbXRTaG9ydCh2YWwpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAndmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSB2YWxpZCBudW1iZXIuIHZhbD0nICtcbiAgICAgIEpTT04uc3RyaW5naWZ5KHZhbClcbiAgKTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGBzdHJgIGFuZCByZXR1cm4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHN0ci5sZW5ndGggPiAxMDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG1hdGNoID0gL14oKD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhcbiAgICBzdHJcbiAgKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICB2YXIgdHlwZSA9IChtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneXJzJzpcbiAgICBjYXNlICd5cic6XG4gICAgY2FzZSAneSc6XG4gICAgICByZXR1cm4gbiAqIHk7XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkJzpcbiAgICAgIHJldHVybiBuICogZDtcbiAgICBjYXNlICdob3Vycyc6XG4gICAgY2FzZSAnaG91cic6XG4gICAgY2FzZSAnaHJzJzpcbiAgICBjYXNlICdocic6XG4gICAgY2FzZSAnaCc6XG4gICAgICByZXR1cm4gbiAqIGg7XG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW5zJzpcbiAgICBjYXNlICdtaW4nOlxuICAgIGNhc2UgJ20nOlxuICAgICAgcmV0dXJuIG4gKiBtO1xuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjcyc6XG4gICAgY2FzZSAnc2VjJzpcbiAgICBjYXNlICdzJzpcbiAgICAgIHJldHVybiBuICogcztcbiAgICBjYXNlICdtaWxsaXNlY29uZHMnOlxuICAgIGNhc2UgJ21pbGxpc2Vjb25kJzpcbiAgICBjYXNlICdtc2Vjcyc6XG4gICAgY2FzZSAnbXNlYyc6XG4gICAgY2FzZSAnbXMnOlxuICAgICAgcmV0dXJuIG47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG9ydCBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRTaG9ydChtcykge1xuICBpZiAobXMgPj0gZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7XG4gIH1cbiAgaWYgKG1zID49IGgpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO1xuICB9XG4gIGlmIChtcyA+PSBtKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJztcbiAgfVxuICBpZiAobXMgPj0gcykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7XG4gIH1cbiAgcmV0dXJuIG1zICsgJ21zJztcbn1cblxuLyoqXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdExvbmcobXMpIHtcbiAgcmV0dXJuIHBsdXJhbChtcywgZCwgJ2RheScpIHx8XG4gICAgcGx1cmFsKG1zLCBoLCAnaG91cicpIHx8XG4gICAgcGx1cmFsKG1zLCBtLCAnbWludXRlJykgfHxcbiAgICBwbHVyYWwobXMsIHMsICdzZWNvbmQnKSB8fFxuICAgIG1zICsgJyBtcyc7XG59XG5cbi8qKlxuICogUGx1cmFsaXphdGlvbiBoZWxwZXIuXG4gKi9cblxuZnVuY3Rpb24gcGx1cmFsKG1zLCBuLCBuYW1lKSB7XG4gIGlmIChtcyA8IG4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKG1zIDwgbiAqIDEuNSkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKG1zIC8gbikgKyAnICcgKyBuYW1lO1xuICB9XG4gIHJldHVybiBNYXRoLmNlaWwobXMgLyBuKSArICcgJyArIG5hbWUgKyAncyc7XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBTRFAgaGVscGVycy5cbnZhciBTRFBVdGlscyA9IHt9O1xuXG4vLyBHZW5lcmF0ZSBhbiBhbHBoYW51bWVyaWMgaWRlbnRpZmllciBmb3IgY25hbWUgb3IgbWlkcy5cbi8vIFRPRE86IHVzZSBVVUlEcyBpbnN0ZWFkPyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzXG5TRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCAxMCk7XG59O1xuXG4vLyBUaGUgUlRDUCBDTkFNRSB1c2VkIGJ5IGFsbCBwZWVyY29ubmVjdGlvbnMgZnJvbSB0aGUgc2FtZSBKUy5cblNEUFV0aWxzLmxvY2FsQ05hbWUgPSBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcblxuLy8gU3BsaXRzIFNEUCBpbnRvIGxpbmVzLCBkZWFsaW5nIHdpdGggYm90aCBDUkxGIGFuZCBMRi5cblNEUFV0aWxzLnNwbGl0TGluZXMgPSBmdW5jdGlvbihibG9iKSB7XG4gIHJldHVybiBibG9iLnRyaW0oKS5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICByZXR1cm4gbGluZS50cmltKCk7XG4gIH0pO1xufTtcbi8vIFNwbGl0cyBTRFAgaW50byBzZXNzaW9ucGFydCBhbmQgbWVkaWFzZWN0aW9ucy4gRW5zdXJlcyBDUkxGLlxuU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyA9IGZ1bmN0aW9uKGJsb2IpIHtcbiAgdmFyIHBhcnRzID0gYmxvYi5zcGxpdCgnXFxubT0nKTtcbiAgcmV0dXJuIHBhcnRzLm1hcChmdW5jdGlvbihwYXJ0LCBpbmRleCkge1xuICAgIHJldHVybiAoaW5kZXggPiAwID8gJ209JyArIHBhcnQgOiBwYXJ0KS50cmltKCkgKyAnXFxyXFxuJztcbiAgfSk7XG59O1xuXG4vLyByZXR1cm5zIHRoZSBzZXNzaW9uIGRlc2NyaXB0aW9uLlxuU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24gPSBmdW5jdGlvbihibG9iKSB7XG4gIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoYmxvYik7XG4gIHJldHVybiBzZWN0aW9ucyAmJiBzZWN0aW9uc1swXTtcbn07XG5cbi8vIHJldHVybnMgdGhlIGluZGl2aWR1YWwgbWVkaWEgc2VjdGlvbnMuXG5TRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zID0gZnVuY3Rpb24oYmxvYikge1xuICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGJsb2IpO1xuICBzZWN0aW9ucy5zaGlmdCgpO1xuICByZXR1cm4gc2VjdGlvbnM7XG59O1xuXG4vLyBSZXR1cm5zIGxpbmVzIHRoYXQgc3RhcnQgd2l0aCBhIGNlcnRhaW4gcHJlZml4LlxuU0RQVXRpbHMubWF0Y2hQcmVmaXggPSBmdW5jdGlvbihibG9iLCBwcmVmaXgpIHtcbiAgcmV0dXJuIFNEUFV0aWxzLnNwbGl0TGluZXMoYmxvYikuZmlsdGVyKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICByZXR1cm4gbGluZS5pbmRleE9mKHByZWZpeCkgPT09IDA7XG4gIH0pO1xufTtcblxuLy8gUGFyc2VzIGFuIElDRSBjYW5kaWRhdGUgbGluZS4gU2FtcGxlIGlucHV0OlxuLy8gY2FuZGlkYXRlOjcwMjc4NjM1MCAyIHVkcCA0MTgxOTkwMiA4LjguOC44IDYwNzY5IHR5cCByZWxheSByYWRkciA4LjguOC44XG4vLyBycG9ydCA1NTk5NlwiXG5TRFBVdGlscy5wYXJzZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzO1xuICAvLyBQYXJzZSBib3RoIHZhcmlhbnRzLlxuICBpZiAobGluZS5pbmRleE9mKCdhPWNhbmRpZGF0ZTonKSA9PT0gMCkge1xuICAgIHBhcnRzID0gbGluZS5zdWJzdHJpbmcoMTIpLnNwbGl0KCcgJyk7XG4gIH0gZWxzZSB7XG4gICAgcGFydHMgPSBsaW5lLnN1YnN0cmluZygxMCkuc3BsaXQoJyAnKTtcbiAgfVxuXG4gIHZhciBjYW5kaWRhdGUgPSB7XG4gICAgZm91bmRhdGlvbjogcGFydHNbMF0sXG4gICAgY29tcG9uZW50OiBwYXJzZUludChwYXJ0c1sxXSwgMTApLFxuICAgIHByb3RvY29sOiBwYXJ0c1syXS50b0xvd2VyQ2FzZSgpLFxuICAgIHByaW9yaXR5OiBwYXJzZUludChwYXJ0c1szXSwgMTApLFxuICAgIGlwOiBwYXJ0c1s0XSxcbiAgICBwb3J0OiBwYXJzZUludChwYXJ0c1s1XSwgMTApLFxuICAgIC8vIHNraXAgcGFydHNbNl0gPT0gJ3R5cCdcbiAgICB0eXBlOiBwYXJ0c1s3XVxuICB9O1xuXG4gIGZvciAodmFyIGkgPSA4OyBpIDwgcGFydHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICBzd2l0Y2ggKHBhcnRzW2ldKSB7XG4gICAgICBjYXNlICdyYWRkcic6XG4gICAgICAgIGNhbmRpZGF0ZS5yZWxhdGVkQWRkcmVzcyA9IHBhcnRzW2kgKyAxXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdycG9ydCc6XG4gICAgICAgIGNhbmRpZGF0ZS5yZWxhdGVkUG9ydCA9IHBhcnNlSW50KHBhcnRzW2kgKyAxXSwgMTApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RjcHR5cGUnOlxuICAgICAgICBjYW5kaWRhdGUudGNwVHlwZSA9IHBhcnRzW2kgKyAxXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd1ZnJhZyc6XG4gICAgICAgIGNhbmRpZGF0ZS51ZnJhZyA9IHBhcnRzW2kgKyAxXTsgLy8gZm9yIGJhY2t3YXJkIGNvbXBhYmlsaXR5LlxuICAgICAgICBjYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCA9IHBhcnRzW2kgKyAxXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiAvLyBleHRlbnNpb24gaGFuZGxpbmcsIGluIHBhcnRpY3VsYXIgdWZyYWdcbiAgICAgICAgY2FuZGlkYXRlW3BhcnRzW2ldXSA9IHBhcnRzW2kgKyAxXTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBjYW5kaWRhdGU7XG59O1xuXG4vLyBUcmFuc2xhdGVzIGEgY2FuZGlkYXRlIG9iamVjdCBpbnRvIFNEUCBjYW5kaWRhdGUgYXR0cmlidXRlLlxuU0RQVXRpbHMud3JpdGVDYW5kaWRhdGUgPSBmdW5jdGlvbihjYW5kaWRhdGUpIHtcbiAgdmFyIHNkcCA9IFtdO1xuICBzZHAucHVzaChjYW5kaWRhdGUuZm91bmRhdGlvbik7XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5jb21wb25lbnQpO1xuICBzZHAucHVzaChjYW5kaWRhdGUucHJvdG9jb2wudG9VcHBlckNhc2UoKSk7XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5wcmlvcml0eSk7XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5pcCk7XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5wb3J0KTtcblxuICB2YXIgdHlwZSA9IGNhbmRpZGF0ZS50eXBlO1xuICBzZHAucHVzaCgndHlwJyk7XG4gIHNkcC5wdXNoKHR5cGUpO1xuICBpZiAodHlwZSAhPT0gJ2hvc3QnICYmIGNhbmRpZGF0ZS5yZWxhdGVkQWRkcmVzcyAmJlxuICAgICAgY2FuZGlkYXRlLnJlbGF0ZWRQb3J0KSB7XG4gICAgc2RwLnB1c2goJ3JhZGRyJyk7XG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnJlbGF0ZWRBZGRyZXNzKTtcbiAgICBzZHAucHVzaCgncnBvcnQnKTtcbiAgICBzZHAucHVzaChjYW5kaWRhdGUucmVsYXRlZFBvcnQpO1xuICB9XG4gIGlmIChjYW5kaWRhdGUudGNwVHlwZSAmJiBjYW5kaWRhdGUucHJvdG9jb2wudG9Mb3dlckNhc2UoKSA9PT0gJ3RjcCcpIHtcbiAgICBzZHAucHVzaCgndGNwdHlwZScpO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS50Y3BUeXBlKTtcbiAgfVxuICBpZiAoY2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnQgfHwgY2FuZGlkYXRlLnVmcmFnKSB7XG4gICAgc2RwLnB1c2goJ3VmcmFnJyk7XG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnQgfHwgY2FuZGlkYXRlLnVmcmFnKTtcbiAgfVxuICByZXR1cm4gJ2NhbmRpZGF0ZTonICsgc2RwLmpvaW4oJyAnKTtcbn07XG5cbi8vIFBhcnNlcyBhbiBpY2Utb3B0aW9ucyBsaW5lLCByZXR1cm5zIGFuIGFycmF5IG9mIG9wdGlvbiB0YWdzLlxuLy8gYT1pY2Utb3B0aW9uczpmb28gYmFyXG5TRFBVdGlscy5wYXJzZUljZU9wdGlvbnMgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHJldHVybiBsaW5lLnN1YnN0cigxNCkuc3BsaXQoJyAnKTtcbn1cblxuLy8gUGFyc2VzIGFuIHJ0cG1hcCBsaW5lLCByZXR1cm5zIFJUQ1J0cENvZGRlY1BhcmFtZXRlcnMuIFNhbXBsZSBpbnB1dDpcbi8vIGE9cnRwbWFwOjExMSBvcHVzLzQ4MDAwLzJcblNEUFV0aWxzLnBhcnNlUnRwTWFwID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cig5KS5zcGxpdCgnICcpO1xuICB2YXIgcGFyc2VkID0ge1xuICAgIHBheWxvYWRUeXBlOiBwYXJzZUludChwYXJ0cy5zaGlmdCgpLCAxMCkgLy8gd2FzOiBpZFxuICB9O1xuXG4gIHBhcnRzID0gcGFydHNbMF0uc3BsaXQoJy8nKTtcblxuICBwYXJzZWQubmFtZSA9IHBhcnRzWzBdO1xuICBwYXJzZWQuY2xvY2tSYXRlID0gcGFyc2VJbnQocGFydHNbMV0sIDEwKTsgLy8gd2FzOiBjbG9ja3JhdGVcbiAgcGFyc2VkLmNoYW5uZWxzID0gcGFydHMubGVuZ3RoID09PSAzID8gcGFyc2VJbnQocGFydHNbMl0sIDEwKSA6IDE7XG4gIC8vIGxlZ2FjeSBhbGlhcywgZ290IHJlbmFtZWQgYmFjayB0byBjaGFubmVscyBpbiBPUlRDLlxuICBwYXJzZWQubnVtQ2hhbm5lbHMgPSBwYXJzZWQuY2hhbm5lbHM7XG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG4vLyBHZW5lcmF0ZSBhbiBhPXJ0cG1hcCBsaW5lIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yXG4vLyBSVENSdHBDb2RlY1BhcmFtZXRlcnMuXG5TRFBVdGlscy53cml0ZVJ0cE1hcCA9IGZ1bmN0aW9uKGNvZGVjKSB7XG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xuICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHB0ID0gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XG4gIH1cbiAgdmFyIGNoYW5uZWxzID0gY29kZWMuY2hhbm5lbHMgfHwgY29kZWMubnVtQ2hhbm5lbHMgfHwgMTtcbiAgcmV0dXJuICdhPXJ0cG1hcDonICsgcHQgKyAnICcgKyBjb2RlYy5uYW1lICsgJy8nICsgY29kZWMuY2xvY2tSYXRlICtcbiAgICAgIChjaGFubmVscyAhPT0gMSA/ICcvJyArIGNoYW5uZWxzIDogJycpICsgJ1xcclxcbic7XG59O1xuXG4vLyBQYXJzZXMgYW4gYT1leHRtYXAgbGluZSAoaGVhZGVyZXh0ZW5zaW9uIGZyb20gUkZDIDUyODUpLiBTYW1wbGUgaW5wdXQ6XG4vLyBhPWV4dG1hcDoyIHVybjppZXRmOnBhcmFtczpydHAtaGRyZXh0OnRvZmZzZXRcbi8vIGE9ZXh0bWFwOjIvc2VuZG9ubHkgdXJuOmlldGY6cGFyYW1zOnJ0cC1oZHJleHQ6dG9mZnNldFxuU0RQVXRpbHMucGFyc2VFeHRtYXAgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDkpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAgaWQ6IHBhcnNlSW50KHBhcnRzWzBdLCAxMCksXG4gICAgZGlyZWN0aW9uOiBwYXJ0c1swXS5pbmRleE9mKCcvJykgPiAwID8gcGFydHNbMF0uc3BsaXQoJy8nKVsxXSA6ICdzZW5kcmVjdicsXG4gICAgdXJpOiBwYXJ0c1sxXVxuICB9O1xufTtcblxuLy8gR2VuZXJhdGVzIGE9ZXh0bWFwIGxpbmUgZnJvbSBSVENSdHBIZWFkZXJFeHRlbnNpb25QYXJhbWV0ZXJzIG9yXG4vLyBSVENSdHBIZWFkZXJFeHRlbnNpb24uXG5TRFBVdGlscy53cml0ZUV4dG1hcCA9IGZ1bmN0aW9uKGhlYWRlckV4dGVuc2lvbikge1xuICByZXR1cm4gJ2E9ZXh0bWFwOicgKyAoaGVhZGVyRXh0ZW5zaW9uLmlkIHx8IGhlYWRlckV4dGVuc2lvbi5wcmVmZXJyZWRJZCkgK1xuICAgICAgKGhlYWRlckV4dGVuc2lvbi5kaXJlY3Rpb24gJiYgaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvbiAhPT0gJ3NlbmRyZWN2J1xuICAgICAgICAgID8gJy8nICsgaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvblxuICAgICAgICAgIDogJycpICtcbiAgICAgICcgJyArIGhlYWRlckV4dGVuc2lvbi51cmkgKyAnXFxyXFxuJztcbn07XG5cbi8vIFBhcnNlcyBhbiBmdG1wIGxpbmUsIHJldHVybnMgZGljdGlvbmFyeS4gU2FtcGxlIGlucHV0OlxuLy8gYT1mbXRwOjk2IHZicj1vbjtjbmc9b25cbi8vIEFsc28gZGVhbHMgd2l0aCB2YnI9b247IGNuZz1vblxuU0RQVXRpbHMucGFyc2VGbXRwID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrdjtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIobGluZS5pbmRleE9mKCcgJykgKyAxKS5zcGxpdCgnOycpO1xuICBmb3IgKHZhciBqID0gMDsgaiA8IHBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAga3YgPSBwYXJ0c1tqXS50cmltKCkuc3BsaXQoJz0nKTtcbiAgICBwYXJzZWRba3ZbMF0udHJpbSgpXSA9IGt2WzFdO1xuICB9XG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG4vLyBHZW5lcmF0ZXMgYW4gYT1mdG1wIGxpbmUgZnJvbSBSVENSdHBDb2RlY0NhcGFiaWxpdHkgb3IgUlRDUnRwQ29kZWNQYXJhbWV0ZXJzLlxuU0RQVXRpbHMud3JpdGVGbXRwID0gZnVuY3Rpb24oY29kZWMpIHtcbiAgdmFyIGxpbmUgPSAnJztcbiAgdmFyIHB0ID0gY29kZWMucGF5bG9hZFR5cGU7XG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHQgPSBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcbiAgfVxuICBpZiAoY29kZWMucGFyYW1ldGVycyAmJiBPYmplY3Qua2V5cyhjb2RlYy5wYXJhbWV0ZXJzKS5sZW5ndGgpIHtcbiAgICB2YXIgcGFyYW1zID0gW107XG4gICAgT2JqZWN0LmtleXMoY29kZWMucGFyYW1ldGVycykuZm9yRWFjaChmdW5jdGlvbihwYXJhbSkge1xuICAgICAgaWYgKGNvZGVjLnBhcmFtZXRlcnNbcGFyYW1dKSB7XG4gICAgICAgIHBhcmFtcy5wdXNoKHBhcmFtICsgJz0nICsgY29kZWMucGFyYW1ldGVyc1twYXJhbV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zLnB1c2gocGFyYW0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGxpbmUgKz0gJ2E9Zm10cDonICsgcHQgKyAnICcgKyBwYXJhbXMuam9pbignOycpICsgJ1xcclxcbic7XG4gIH1cbiAgcmV0dXJuIGxpbmU7XG59O1xuXG4vLyBQYXJzZXMgYW4gcnRjcC1mYiBsaW5lLCByZXR1cm5zIFJUQ1BSdGNwRmVlZGJhY2sgb2JqZWN0LiBTYW1wbGUgaW5wdXQ6XG4vLyBhPXJ0Y3AtZmI6OTggbmFjayBycHNpXG5TRFBVdGlscy5wYXJzZVJ0Y3BGYiA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIobGluZS5pbmRleE9mKCcgJykgKyAxKS5zcGxpdCgnICcpO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IHBhcnRzLnNoaWZ0KCksXG4gICAgcGFyYW1ldGVyOiBwYXJ0cy5qb2luKCcgJylcbiAgfTtcbn07XG4vLyBHZW5lcmF0ZSBhPXJ0Y3AtZmIgbGluZXMgZnJvbSBSVENSdHBDb2RlY0NhcGFiaWxpdHkgb3IgUlRDUnRwQ29kZWNQYXJhbWV0ZXJzLlxuU0RQVXRpbHMud3JpdGVSdGNwRmIgPSBmdW5jdGlvbihjb2RlYykge1xuICB2YXIgbGluZXMgPSAnJztcbiAgdmFyIHB0ID0gY29kZWMucGF5bG9hZFR5cGU7XG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHQgPSBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcbiAgfVxuICBpZiAoY29kZWMucnRjcEZlZWRiYWNrICYmIGNvZGVjLnJ0Y3BGZWVkYmFjay5sZW5ndGgpIHtcbiAgICAvLyBGSVhNRTogc3BlY2lhbCBoYW5kbGluZyBmb3IgdHJyLWludD9cbiAgICBjb2RlYy5ydGNwRmVlZGJhY2suZm9yRWFjaChmdW5jdGlvbihmYikge1xuICAgICAgbGluZXMgKz0gJ2E9cnRjcC1mYjonICsgcHQgKyAnICcgKyBmYi50eXBlICtcbiAgICAgIChmYi5wYXJhbWV0ZXIgJiYgZmIucGFyYW1ldGVyLmxlbmd0aCA/ICcgJyArIGZiLnBhcmFtZXRlciA6ICcnKSArXG4gICAgICAgICAgJ1xcclxcbic7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGxpbmVzO1xufTtcblxuLy8gUGFyc2VzIGFuIFJGQyA1NTc2IHNzcmMgbWVkaWEgYXR0cmlidXRlLiBTYW1wbGUgaW5wdXQ6XG4vLyBhPXNzcmM6MzczNTkyODU1OSBjbmFtZTpzb21ldGhpbmdcblNEUFV0aWxzLnBhcnNlU3NyY01lZGlhID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgc3AgPSBsaW5lLmluZGV4T2YoJyAnKTtcbiAgdmFyIHBhcnRzID0ge1xuICAgIHNzcmM6IHBhcnNlSW50KGxpbmUuc3Vic3RyKDcsIHNwIC0gNyksIDEwKVxuICB9O1xuICB2YXIgY29sb24gPSBsaW5lLmluZGV4T2YoJzonLCBzcCk7XG4gIGlmIChjb2xvbiA+IC0xKSB7XG4gICAgcGFydHMuYXR0cmlidXRlID0gbGluZS5zdWJzdHIoc3AgKyAxLCBjb2xvbiAtIHNwIC0gMSk7XG4gICAgcGFydHMudmFsdWUgPSBsaW5lLnN1YnN0cihjb2xvbiArIDEpO1xuICB9IGVsc2Uge1xuICAgIHBhcnRzLmF0dHJpYnV0ZSA9IGxpbmUuc3Vic3RyKHNwICsgMSk7XG4gIH1cbiAgcmV0dXJuIHBhcnRzO1xufTtcblxuLy8gRXh0cmFjdHMgdGhlIE1JRCAoUkZDIDU4ODgpIGZyb20gYSBtZWRpYSBzZWN0aW9uLlxuLy8gcmV0dXJucyB0aGUgTUlEIG9yIHVuZGVmaW5lZCBpZiBubyBtaWQgbGluZSB3YXMgZm91bmQuXG5TRFBVdGlscy5nZXRNaWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIG1pZCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9bWlkOicpWzBdO1xuICBpZiAobWlkKSB7XG4gICAgcmV0dXJuIG1pZC5zdWJzdHIoNik7XG4gIH1cbn1cblxuU0RQVXRpbHMucGFyc2VGaW5nZXJwcmludCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoMTQpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAgYWxnb3JpdGhtOiBwYXJ0c1swXS50b0xvd2VyQ2FzZSgpLCAvLyBhbGdvcml0aG0gaXMgY2FzZS1zZW5zaXRpdmUgaW4gRWRnZS5cbiAgICB2YWx1ZTogcGFydHNbMV1cbiAgfTtcbn07XG5cbi8vIEV4dHJhY3RzIERUTFMgcGFyYW1ldGVycyBmcm9tIFNEUCBtZWRpYSBzZWN0aW9uIG9yIHNlc3Npb25wYXJ0LlxuLy8gRklYTUU6IGZvciBjb25zaXN0ZW5jeSB3aXRoIG90aGVyIGZ1bmN0aW9ucyB0aGlzIHNob3VsZCBvbmx5XG4vLyAgIGdldCB0aGUgZmluZ2VycHJpbnQgbGluZSBhcyBpbnB1dC4gU2VlIGFsc28gZ2V0SWNlUGFyYW1ldGVycy5cblNEUFV0aWxzLmdldER0bHNQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xuICB2YXIgbGluZXMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24gKyBzZXNzaW9ucGFydCxcbiAgICAgICdhPWZpbmdlcnByaW50OicpO1xuICAvLyBOb3RlOiBhPXNldHVwIGxpbmUgaXMgaWdub3JlZCBzaW5jZSB3ZSB1c2UgdGhlICdhdXRvJyByb2xlLlxuICAvLyBOb3RlMjogJ2FsZ29yaXRobScgaXMgbm90IGNhc2Ugc2Vuc2l0aXZlIGV4Y2VwdCBpbiBFZGdlLlxuICByZXR1cm4ge1xuICAgIHJvbGU6ICdhdXRvJyxcbiAgICBmaW5nZXJwcmludHM6IGxpbmVzLm1hcChTRFBVdGlscy5wYXJzZUZpbmdlcnByaW50KVxuICB9O1xufTtcblxuLy8gU2VyaWFsaXplcyBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxuU0RQVXRpbHMud3JpdGVEdGxzUGFyYW1ldGVycyA9IGZ1bmN0aW9uKHBhcmFtcywgc2V0dXBUeXBlKSB7XG4gIHZhciBzZHAgPSAnYT1zZXR1cDonICsgc2V0dXBUeXBlICsgJ1xcclxcbic7XG4gIHBhcmFtcy5maW5nZXJwcmludHMuZm9yRWFjaChmdW5jdGlvbihmcCkge1xuICAgIHNkcCArPSAnYT1maW5nZXJwcmludDonICsgZnAuYWxnb3JpdGhtICsgJyAnICsgZnAudmFsdWUgKyAnXFxyXFxuJztcbiAgfSk7XG4gIHJldHVybiBzZHA7XG59O1xuLy8gUGFyc2VzIElDRSBpbmZvcm1hdGlvbiBmcm9tIFNEUCBtZWRpYSBzZWN0aW9uIG9yIHNlc3Npb25wYXJ0LlxuLy8gRklYTUU6IGZvciBjb25zaXN0ZW5jeSB3aXRoIG90aGVyIGZ1bmN0aW9ucyB0aGlzIHNob3VsZCBvbmx5XG4vLyAgIGdldCB0aGUgaWNlLXVmcmFnIGFuZCBpY2UtcHdkIGxpbmVzIGFzIGlucHV0LlxuU0RQVXRpbHMuZ2V0SWNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpIHtcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICAvLyBTZWFyY2ggaW4gc2Vzc2lvbiBwYXJ0LCB0b28uXG4gIGxpbmVzID0gbGluZXMuY29uY2F0KFNEUFV0aWxzLnNwbGl0TGluZXMoc2Vzc2lvbnBhcnQpKTtcbiAgdmFyIGljZVBhcmFtZXRlcnMgPSB7XG4gICAgdXNlcm5hbWVGcmFnbWVudDogbGluZXMuZmlsdGVyKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHJldHVybiBsaW5lLmluZGV4T2YoJ2E9aWNlLXVmcmFnOicpID09PSAwO1xuICAgIH0pWzBdLnN1YnN0cigxMiksXG4gICAgcGFzc3dvcmQ6IGxpbmVzLmZpbHRlcihmdW5jdGlvbihsaW5lKSB7XG4gICAgICByZXR1cm4gbGluZS5pbmRleE9mKCdhPWljZS1wd2Q6JykgPT09IDA7XG4gICAgfSlbMF0uc3Vic3RyKDEwKVxuICB9O1xuICByZXR1cm4gaWNlUGFyYW1ldGVycztcbn07XG5cbi8vIFNlcmlhbGl6ZXMgSUNFIHBhcmFtZXRlcnMgdG8gU0RQLlxuU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIHJldHVybiAnYT1pY2UtdWZyYWc6JyArIHBhcmFtcy51c2VybmFtZUZyYWdtZW50ICsgJ1xcclxcbicgK1xuICAgICAgJ2E9aWNlLXB3ZDonICsgcGFyYW1zLnBhc3N3b3JkICsgJ1xcclxcbic7XG59O1xuXG4vLyBQYXJzZXMgdGhlIFNEUCBtZWRpYSBzZWN0aW9uIGFuZCByZXR1cm5zIFJUQ1J0cFBhcmFtZXRlcnMuXG5TRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGRlc2NyaXB0aW9uID0ge1xuICAgIGNvZGVjczogW10sXG4gICAgaGVhZGVyRXh0ZW5zaW9uczogW10sXG4gICAgZmVjTWVjaGFuaXNtczogW10sXG4gICAgcnRjcDogW11cbiAgfTtcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICB2YXIgbWxpbmUgPSBsaW5lc1swXS5zcGxpdCgnICcpO1xuICBmb3IgKHZhciBpID0gMzsgaSA8IG1saW5lLmxlbmd0aDsgaSsrKSB7IC8vIGZpbmQgYWxsIGNvZGVjcyBmcm9tIG1saW5lWzMuLl1cbiAgICB2YXIgcHQgPSBtbGluZVtpXTtcbiAgICB2YXIgcnRwbWFwbGluZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KFxuICAgICAgICBtZWRpYVNlY3Rpb24sICdhPXJ0cG1hcDonICsgcHQgKyAnICcpWzBdO1xuICAgIGlmIChydHBtYXBsaW5lKSB7XG4gICAgICB2YXIgY29kZWMgPSBTRFBVdGlscy5wYXJzZVJ0cE1hcChydHBtYXBsaW5lKTtcbiAgICAgIHZhciBmbXRwcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KFxuICAgICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9Zm10cDonICsgcHQgKyAnICcpO1xuICAgICAgLy8gT25seSB0aGUgZmlyc3QgYT1mbXRwOjxwdD4gaXMgY29uc2lkZXJlZC5cbiAgICAgIGNvZGVjLnBhcmFtZXRlcnMgPSBmbXRwcy5sZW5ndGggPyBTRFBVdGlscy5wYXJzZUZtdHAoZm10cHNbMF0pIDoge307XG4gICAgICBjb2RlYy5ydGNwRmVlZGJhY2sgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcbiAgICAgICAgICBtZWRpYVNlY3Rpb24sICdhPXJ0Y3AtZmI6JyArIHB0ICsgJyAnKVxuICAgICAgICAubWFwKFNEUFV0aWxzLnBhcnNlUnRjcEZiKTtcbiAgICAgIGRlc2NyaXB0aW9uLmNvZGVjcy5wdXNoKGNvZGVjKTtcbiAgICAgIC8vIHBhcnNlIEZFQyBtZWNoYW5pc21zIGZyb20gcnRwbWFwIGxpbmVzLlxuICAgICAgc3dpdGNoIChjb2RlYy5uYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgY2FzZSAnUkVEJzpcbiAgICAgICAgY2FzZSAnVUxQRkVDJzpcbiAgICAgICAgICBkZXNjcmlwdGlvbi5mZWNNZWNoYW5pc21zLnB1c2goY29kZWMubmFtZS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDogLy8gb25seSBSRUQgYW5kIFVMUEZFQyBhcmUgcmVjb2duaXplZCBhcyBGRUMgbWVjaGFuaXNtcy5cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1leHRtYXA6JykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgZGVzY3JpcHRpb24uaGVhZGVyRXh0ZW5zaW9ucy5wdXNoKFNEUFV0aWxzLnBhcnNlRXh0bWFwKGxpbmUpKTtcbiAgfSk7XG4gIC8vIEZJWE1FOiBwYXJzZSBydGNwLlxuICByZXR1cm4gZGVzY3JpcHRpb247XG59O1xuXG4vLyBHZW5lcmF0ZXMgcGFydHMgb2YgdGhlIFNEUCBtZWRpYSBzZWN0aW9uIGRlc2NyaWJpbmcgdGhlIGNhcGFiaWxpdGllcyAvXG4vLyBwYXJhbWV0ZXJzLlxuU0RQVXRpbHMud3JpdGVSdHBEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGtpbmQsIGNhcHMpIHtcbiAgdmFyIHNkcCA9ICcnO1xuXG4gIC8vIEJ1aWxkIHRoZSBtbGluZS5cbiAgc2RwICs9ICdtPScgKyBraW5kICsgJyAnO1xuICBzZHAgKz0gY2Fwcy5jb2RlY3MubGVuZ3RoID4gMCA/ICc5JyA6ICcwJzsgLy8gcmVqZWN0IGlmIG5vIGNvZGVjcy5cbiAgc2RwICs9ICcgVURQL1RMUy9SVFAvU0FWUEYgJztcbiAgc2RwICs9IGNhcHMuY29kZWNzLm1hcChmdW5jdGlvbihjb2RlYykge1xuICAgIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XG4gICAgfVxuICAgIHJldHVybiBjb2RlYy5wYXlsb2FkVHlwZTtcbiAgfSkuam9pbignICcpICsgJ1xcclxcbic7XG5cbiAgc2RwICs9ICdjPUlOIElQNCAwLjAuMC4wXFxyXFxuJztcbiAgc2RwICs9ICdhPXJ0Y3A6OSBJTiBJUDQgMC4wLjAuMFxcclxcbic7XG5cbiAgLy8gQWRkIGE9cnRwbWFwIGxpbmVzIGZvciBlYWNoIGNvZGVjLiBBbHNvIGZtdHAgYW5kIHJ0Y3AtZmIuXG4gIGNhcHMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVSdHBNYXAoY29kZWMpO1xuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZUZtdHAoY29kZWMpO1xuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZVJ0Y3BGYihjb2RlYyk7XG4gIH0pO1xuICB2YXIgbWF4cHRpbWUgPSAwO1xuICBjYXBzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgaWYgKGNvZGVjLm1heHB0aW1lID4gbWF4cHRpbWUpIHtcbiAgICAgIG1heHB0aW1lID0gY29kZWMubWF4cHRpbWU7XG4gICAgfVxuICB9KTtcbiAgaWYgKG1heHB0aW1lID4gMCkge1xuICAgIHNkcCArPSAnYT1tYXhwdGltZTonICsgbWF4cHRpbWUgKyAnXFxyXFxuJztcbiAgfVxuICBzZHAgKz0gJ2E9cnRjcC1tdXhcXHJcXG4nO1xuXG4gIGlmIChjYXBzLmhlYWRlckV4dGVuc2lvbnMpIHtcbiAgICBjYXBzLmhlYWRlckV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihleHRlbnNpb24pIHtcbiAgICAgIHNkcCArPSBTRFBVdGlscy53cml0ZUV4dG1hcChleHRlbnNpb24pO1xuICAgIH0pO1xuICB9XG4gIC8vIEZJWE1FOiB3cml0ZSBmZWNNZWNoYW5pc21zLlxuICByZXR1cm4gc2RwO1xufTtcblxuLy8gUGFyc2VzIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBhbmQgcmV0dXJucyBhbiBhcnJheSBvZlxuLy8gUlRDUnRwRW5jb2RpbmdQYXJhbWV0ZXJzLlxuU0RQVXRpbHMucGFyc2VSdHBFbmNvZGluZ1BhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGVuY29kaW5nUGFyYW1ldGVycyA9IFtdO1xuICB2YXIgZGVzY3JpcHRpb24gPSBTRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcbiAgdmFyIGhhc1JlZCA9IGRlc2NyaXB0aW9uLmZlY01lY2hhbmlzbXMuaW5kZXhPZignUkVEJykgIT09IC0xO1xuICB2YXIgaGFzVWxwZmVjID0gZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5pbmRleE9mKCdVTFBGRUMnKSAhPT0gLTE7XG5cbiAgLy8gZmlsdGVyIGE9c3NyYzouLi4gY25hbWU6LCBpZ25vcmUgUGxhbkItbXNpZFxuICB2YXIgc3NyY3MgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcbiAgLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlU3NyY01lZGlhKGxpbmUpO1xuICB9KVxuICAuZmlsdGVyKGZ1bmN0aW9uKHBhcnRzKSB7XG4gICAgcmV0dXJuIHBhcnRzLmF0dHJpYnV0ZSA9PT0gJ2NuYW1lJztcbiAgfSk7XG4gIHZhciBwcmltYXJ5U3NyYyA9IHNzcmNzLmxlbmd0aCA+IDAgJiYgc3NyY3NbMF0uc3NyYztcbiAgdmFyIHNlY29uZGFyeVNzcmM7XG5cbiAgdmFyIGZsb3dzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjLWdyb3VwOkZJRCcpXG4gIC5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDE3KS5zcGxpdCgnICcpO1xuICAgIHJldHVybiBwYXJ0cy5tYXAoZnVuY3Rpb24ocGFydCkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHBhcnQsIDEwKTtcbiAgICB9KTtcbiAgfSk7XG4gIGlmIChmbG93cy5sZW5ndGggPiAwICYmIGZsb3dzWzBdLmxlbmd0aCA+IDEgJiYgZmxvd3NbMF1bMF0gPT09IHByaW1hcnlTc3JjKSB7XG4gICAgc2Vjb25kYXJ5U3NyYyA9IGZsb3dzWzBdWzFdO1xuICB9XG5cbiAgZGVzY3JpcHRpb24uY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcbiAgICBpZiAoY29kZWMubmFtZS50b1VwcGVyQ2FzZSgpID09PSAnUlRYJyAmJiBjb2RlYy5wYXJhbWV0ZXJzLmFwdCkge1xuICAgICAgdmFyIGVuY1BhcmFtID0ge1xuICAgICAgICBzc3JjOiBwcmltYXJ5U3NyYyxcbiAgICAgICAgY29kZWNQYXlsb2FkVHlwZTogcGFyc2VJbnQoY29kZWMucGFyYW1ldGVycy5hcHQsIDEwKSxcbiAgICAgIH07XG4gICAgICBpZiAocHJpbWFyeVNzcmMgJiYgc2Vjb25kYXJ5U3NyYykge1xuICAgICAgICBlbmNQYXJhbS5ydHggPSB7c3NyYzogc2Vjb25kYXJ5U3NyY307XG4gICAgICB9XG4gICAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaChlbmNQYXJhbSk7XG4gICAgICBpZiAoaGFzUmVkKSB7XG4gICAgICAgIGVuY1BhcmFtID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShlbmNQYXJhbSkpO1xuICAgICAgICBlbmNQYXJhbS5mZWMgPSB7XG4gICAgICAgICAgc3NyYzogc2Vjb25kYXJ5U3NyYyxcbiAgICAgICAgICBtZWNoYW5pc206IGhhc1VscGZlYyA/ICdyZWQrdWxwZmVjJyA6ICdyZWQnXG4gICAgICAgIH07XG4gICAgICAgIGVuY29kaW5nUGFyYW1ldGVycy5wdXNoKGVuY1BhcmFtKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBpZiAoZW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCA9PT0gMCAmJiBwcmltYXJ5U3NyYykge1xuICAgIGVuY29kaW5nUGFyYW1ldGVycy5wdXNoKHtcbiAgICAgIHNzcmM6IHByaW1hcnlTc3JjXG4gICAgfSk7XG4gIH1cblxuICAvLyB3ZSBzdXBwb3J0IGJvdGggYj1BUyBhbmQgYj1USUFTIGJ1dCBpbnRlcnByZXQgQVMgYXMgVElBUy5cbiAgdmFyIGJhbmR3aWR0aCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2I9Jyk7XG4gIGlmIChiYW5kd2lkdGgubGVuZ3RoKSB7XG4gICAgaWYgKGJhbmR3aWR0aFswXS5pbmRleE9mKCdiPVRJQVM6JykgPT09IDApIHtcbiAgICAgIGJhbmR3aWR0aCA9IHBhcnNlSW50KGJhbmR3aWR0aFswXS5zdWJzdHIoNyksIDEwKTtcbiAgICB9IGVsc2UgaWYgKGJhbmR3aWR0aFswXS5pbmRleE9mKCdiPUFTOicpID09PSAwKSB7XG4gICAgICAvLyB1c2UgZm9ybXVsYSBmcm9tIEpTRVAgdG8gY29udmVydCBiPUFTIHRvIFRJQVMgdmFsdWUuXG4gICAgICBiYW5kd2lkdGggPSBwYXJzZUludChiYW5kd2lkdGhbMF0uc3Vic3RyKDUpLCAxMCkgKiAxMDAwICogMC45NVxuICAgICAgICAgIC0gKDUwICogNDAgKiA4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFuZHdpZHRoID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBlbmNvZGluZ1BhcmFtZXRlcnMuZm9yRWFjaChmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgIHBhcmFtcy5tYXhCaXRyYXRlID0gYmFuZHdpZHRoO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBlbmNvZGluZ1BhcmFtZXRlcnM7XG59O1xuXG4vLyBwYXJzZXMgaHR0cDovL2RyYWZ0Lm9ydGMub3JnLyNydGNydGNwcGFyYW1ldGVycypcblNEUFV0aWxzLnBhcnNlUnRjcFBhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIHJ0Y3BQYXJhbWV0ZXJzID0ge307XG5cbiAgdmFyIGNuYW1lO1xuICAvLyBHZXRzIHRoZSBmaXJzdCBTU1JDLiBOb3RlIHRoYXQgd2l0aCBSVFggdGhlcmUgbWlnaHQgYmUgbXVsdGlwbGVcbiAgLy8gU1NSQ3MuXG4gIHZhciByZW1vdGVTc3JjID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjOicpXG4gICAgICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlU3NyY01lZGlhKGxpbmUpO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmouYXR0cmlidXRlID09PSAnY25hbWUnO1xuICAgICAgfSlbMF07XG4gIGlmIChyZW1vdGVTc3JjKSB7XG4gICAgcnRjcFBhcmFtZXRlcnMuY25hbWUgPSByZW1vdGVTc3JjLnZhbHVlO1xuICAgIHJ0Y3BQYXJhbWV0ZXJzLnNzcmMgPSByZW1vdGVTc3JjLnNzcmM7XG4gIH1cblxuICAvLyBFZGdlIHVzZXMgdGhlIGNvbXBvdW5kIGF0dHJpYnV0ZSBpbnN0ZWFkIG9mIHJlZHVjZWRTaXplXG4gIC8vIGNvbXBvdW5kIGlzICFyZWR1Y2VkU2l6ZVxuICB2YXIgcnNpemUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXJ0Y3AtcnNpemUnKTtcbiAgcnRjcFBhcmFtZXRlcnMucmVkdWNlZFNpemUgPSByc2l6ZS5sZW5ndGggPiAwO1xuICBydGNwUGFyYW1ldGVycy5jb21wb3VuZCA9IHJzaXplLmxlbmd0aCA9PT0gMDtcblxuICAvLyBwYXJzZXMgdGhlIHJ0Y3AtbXV4IGF0dHLRlmJ1dGUuXG4gIC8vIE5vdGUgdGhhdCBFZGdlIGRvZXMgbm90IHN1cHBvcnQgdW5tdXhlZCBSVENQLlxuICB2YXIgbXV4ID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1ydGNwLW11eCcpO1xuICBydGNwUGFyYW1ldGVycy5tdXggPSBtdXgubGVuZ3RoID4gMDtcblxuICByZXR1cm4gcnRjcFBhcmFtZXRlcnM7XG59O1xuXG4vLyBwYXJzZXMgZWl0aGVyIGE9bXNpZDogb3IgYT1zc3JjOi4uLiBtc2lkIGxpbmVzIGFuZCByZXR1cm5zXG4vLyB0aGUgaWQgb2YgdGhlIE1lZGlhU3RyZWFtIGFuZCBNZWRpYVN0cmVhbVRyYWNrLlxuU0RQVXRpbHMucGFyc2VNc2lkID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBwYXJ0cztcbiAgdmFyIHNwZWMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPW1zaWQ6Jyk7XG4gIGlmIChzcGVjLmxlbmd0aCA9PT0gMSkge1xuICAgIHBhcnRzID0gc3BlY1swXS5zdWJzdHIoNykuc3BsaXQoJyAnKTtcbiAgICByZXR1cm4ge3N0cmVhbTogcGFydHNbMF0sIHRyYWNrOiBwYXJ0c1sxXX07XG4gIH1cbiAgdmFyIHBsYW5CID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjOicpXG4gIC5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgIHJldHVybiBTRFBVdGlscy5wYXJzZVNzcmNNZWRpYShsaW5lKTtcbiAgfSlcbiAgLmZpbHRlcihmdW5jdGlvbihwYXJ0cykge1xuICAgIHJldHVybiBwYXJ0cy5hdHRyaWJ1dGUgPT09ICdtc2lkJztcbiAgfSk7XG4gIGlmIChwbGFuQi5sZW5ndGggPiAwKSB7XG4gICAgcGFydHMgPSBwbGFuQlswXS52YWx1ZS5zcGxpdCgnICcpO1xuICAgIHJldHVybiB7c3RyZWFtOiBwYXJ0c1swXSwgdHJhY2s6IHBhcnRzWzFdfTtcbiAgfVxufTtcblxuLy8gR2VuZXJhdGUgYSBzZXNzaW9uIElEIGZvciBTRFAuXG4vLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvZHJhZnQtaWV0Zi1ydGN3ZWItanNlcC0yMCNzZWN0aW9uLTUuMi4xXG4vLyByZWNvbW1lbmRzIHVzaW5nIGEgY3J5cHRvZ3JhcGhpY2FsbHkgcmFuZG9tICt2ZSA2NC1iaXQgdmFsdWVcbi8vIGJ1dCByaWdodCBub3cgdGhpcyBzaG91bGQgYmUgYWNjZXB0YWJsZSBhbmQgd2l0aGluIHRoZSByaWdodCByYW5nZVxuU0RQVXRpbHMuZ2VuZXJhdGVTZXNzaW9uSWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHIoMiwgMjEpO1xufTtcblxuLy8gV3JpdGUgYm9pbGRlciBwbGF0ZSBmb3Igc3RhcnQgb2YgU0RQXG4vLyBzZXNzSWQgYXJndW1lbnQgaXMgb3B0aW9uYWwgLSBpZiBub3Qgc3VwcGxpZWQgaXQgd2lsbFxuLy8gYmUgZ2VuZXJhdGVkIHJhbmRvbWx5XG4vLyBzZXNzVmVyc2lvbiBpcyBvcHRpb25hbCBhbmQgZGVmYXVsdHMgdG8gMlxuU0RQVXRpbHMud3JpdGVTZXNzaW9uQm9pbGVycGxhdGUgPSBmdW5jdGlvbihzZXNzSWQsIHNlc3NWZXIpIHtcbiAgdmFyIHNlc3Npb25JZDtcbiAgdmFyIHZlcnNpb24gPSBzZXNzVmVyICE9PSB1bmRlZmluZWQgPyBzZXNzVmVyIDogMjtcbiAgaWYgKHNlc3NJZCkge1xuICAgIHNlc3Npb25JZCA9IHNlc3NJZDtcbiAgfSBlbHNlIHtcbiAgICBzZXNzaW9uSWQgPSBTRFBVdGlscy5nZW5lcmF0ZVNlc3Npb25JZCgpO1xuICB9XG4gIC8vIEZJWE1FOiBzZXNzLWlkIHNob3VsZCBiZSBhbiBOVFAgdGltZXN0YW1wLlxuICByZXR1cm4gJ3Y9MFxcclxcbicgK1xuICAgICAgJ289dGhpc2lzYWRhcHRlcm9ydGMgJyArIHNlc3Npb25JZCArICcgJyArIHZlcnNpb24gKyAnIElOIElQNCAxMjcuMC4wLjFcXHJcXG4nICtcbiAgICAgICdzPS1cXHJcXG4nICtcbiAgICAgICd0PTAgMFxcclxcbic7XG59O1xuXG5TRFBVdGlscy53cml0ZU1lZGlhU2VjdGlvbiA9IGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBjYXBzLCB0eXBlLCBzdHJlYW0pIHtcbiAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlUnRwRGVzY3JpcHRpb24odHJhbnNjZWl2ZXIua2luZCwgY2Fwcyk7XG5cbiAgLy8gTWFwIElDRSBwYXJhbWV0ZXJzICh1ZnJhZywgcHdkKSB0byBTRFAuXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUljZVBhcmFtZXRlcnMoXG4gICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbFBhcmFtZXRlcnMoKSk7XG5cbiAgLy8gTWFwIERUTFMgcGFyYW1ldGVycyB0byBTRFAuXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzKFxuICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5nZXRMb2NhbFBhcmFtZXRlcnMoKSxcbiAgICAgIHR5cGUgPT09ICdvZmZlcicgPyAnYWN0cGFzcycgOiAnYWN0aXZlJyk7XG5cbiAgc2RwICs9ICdhPW1pZDonICsgdHJhbnNjZWl2ZXIubWlkICsgJ1xcclxcbic7XG5cbiAgaWYgKHRyYW5zY2VpdmVyLmRpcmVjdGlvbikge1xuICAgIHNkcCArPSAnYT0nICsgdHJhbnNjZWl2ZXIuZGlyZWN0aW9uICsgJ1xcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XG4gICAgc2RwICs9ICdhPXNlbmRyZWN2XFxyXFxuJztcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICBzZHAgKz0gJ2E9c2VuZG9ubHlcXHJcXG4nO1xuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XG4gICAgc2RwICs9ICdhPXJlY3Zvbmx5XFxyXFxuJztcbiAgfSBlbHNlIHtcbiAgICBzZHAgKz0gJ2E9aW5hY3RpdmVcXHJcXG4nO1xuICB9XG5cbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgIC8vIHNwZWMuXG4gICAgdmFyIG1zaWQgPSAnbXNpZDonICsgc3RyZWFtLmlkICsgJyAnICtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnRyYWNrLmlkICsgJ1xcclxcbic7XG4gICAgc2RwICs9ICdhPScgKyBtc2lkO1xuXG4gICAgLy8gZm9yIENocm9tZS5cbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcbiAgICAgICAgJyAnICsgbXNpZDtcbiAgICBpZiAodHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgICAnICcgKyBtc2lkO1xuICAgICAgc2RwICs9ICdhPXNzcmMtZ3JvdXA6RklEICcgK1xuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArICcgJyArXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICAgJ1xcclxcbic7XG4gICAgfVxuICB9XG4gIC8vIEZJWE1FOiB0aGlzIHNob3VsZCBiZSB3cml0dGVuIGJ5IHdyaXRlUnRwRGVzY3JpcHRpb24uXG4gIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xuICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XG4gIH1cbiAgcmV0dXJuIHNkcDtcbn07XG5cbi8vIEdldHMgdGhlIGRpcmVjdGlvbiBmcm9tIHRoZSBtZWRpYVNlY3Rpb24gb3IgdGhlIHNlc3Npb25wYXJ0LlxuU0RQVXRpbHMuZ2V0RGlyZWN0aW9uID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xuICAvLyBMb29rIGZvciBzZW5kcmVjdiwgc2VuZG9ubHksIHJlY3Zvbmx5LCBpbmFjdGl2ZSwgZGVmYXVsdCB0byBzZW5kcmVjdi5cbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgc3dpdGNoIChsaW5lc1tpXSkge1xuICAgICAgY2FzZSAnYT1zZW5kcmVjdic6XG4gICAgICBjYXNlICdhPXNlbmRvbmx5JzpcbiAgICAgIGNhc2UgJ2E9cmVjdm9ubHknOlxuICAgICAgY2FzZSAnYT1pbmFjdGl2ZSc6XG4gICAgICAgIHJldHVybiBsaW5lc1tpXS5zdWJzdHIoMik7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBGSVhNRTogV2hhdCBzaG91bGQgaGFwcGVuIGhlcmU/XG4gICAgfVxuICB9XG4gIGlmIChzZXNzaW9ucGFydCkge1xuICAgIHJldHVybiBTRFBVdGlscy5nZXREaXJlY3Rpb24oc2Vzc2lvbnBhcnQpO1xuICB9XG4gIHJldHVybiAnc2VuZHJlY3YnO1xufTtcblxuU0RQVXRpbHMuZ2V0S2luZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gIHZhciBtbGluZSA9IGxpbmVzWzBdLnNwbGl0KCcgJyk7XG4gIHJldHVybiBtbGluZVswXS5zdWJzdHIoMik7XG59O1xuXG5TRFBVdGlscy5pc1JlamVjdGVkID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHJldHVybiBtZWRpYVNlY3Rpb24uc3BsaXQoJyAnLCAyKVsxXSA9PT0gJzAnO1xufTtcblxuU0RQVXRpbHMucGFyc2VNTGluZSA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gIHZhciBwYXJ0cyA9IGxpbmVzWzBdLnN1YnN0cigyKS5zcGxpdCgnICcpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IHBhcnRzWzBdLFxuICAgIHBvcnQ6IHBhcnNlSW50KHBhcnRzWzFdLCAxMCksXG4gICAgcHJvdG9jb2w6IHBhcnRzWzJdLFxuICAgIGZtdDogcGFydHMuc2xpY2UoMykuam9pbignICcpXG4gIH07XG59O1xuXG5TRFBVdGlscy5wYXJzZU9MaW5lID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBsaW5lID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnbz0nKVswXTtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoMikuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICB1c2VybmFtZTogcGFydHNbMF0sXG4gICAgc2Vzc2lvbklkOiBwYXJ0c1sxXSxcbiAgICBzZXNzaW9uVmVyc2lvbjogcGFyc2VJbnQocGFydHNbMl0sIDEwKSxcbiAgICBuZXRUeXBlOiBwYXJ0c1szXSxcbiAgICBhZGRyZXNzVHlwZTogcGFydHNbNF0sXG4gICAgYWRkcmVzczogcGFydHNbNV0sXG4gIH07XG59XG5cbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jykge1xuICBtb2R1bGUuZXhwb3J0cyA9IFNEUFV0aWxzO1xufVxuIiwidmFyIG1qID0gcmVxdWlyZShcIm1pbmlqYW51c1wiKTtcclxudmFyIHNkcFV0aWxzID0gcmVxdWlyZShcInNkcFwiKTtcclxudmFyIGRlYnVnID0gcmVxdWlyZShcImRlYnVnXCIpKFwibmFmLWphbnVzLWFkYXB0ZXI6ZGVidWdcIik7XHJcbnZhciB3YXJuID0gcmVxdWlyZShcImRlYnVnXCIpKFwibmFmLWphbnVzLWFkYXB0ZXI6d2FyblwiKTtcclxudmFyIGVycm9yID0gcmVxdWlyZShcImRlYnVnXCIpKFwibmFmLWphbnVzLWFkYXB0ZXI6ZXJyb3JcIik7XHJcbnZhciBpc1NhZmFyaSA9IC9eKCg/IWNocm9tZXxhbmRyb2lkKS4pKnNhZmFyaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcblxyXG5mdW5jdGlvbiBkZWJvdW5jZShmbikge1xyXG4gIHZhciBjdXJyID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgY3VyciA9IGN1cnIudGhlbihfID0+IGZuLmFwcGx5KHRoaXMsIGFyZ3MpKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiByYW5kb21VaW50KCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVudGlsRGF0YUNoYW5uZWxPcGVuKGRhdGFDaGFubmVsKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGlmIChkYXRhQ2hhbm5lbC5yZWFkeVN0YXRlID09PSBcIm9wZW5cIikge1xyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgcmVzb2x2ZXIsIHJlamVjdG9yO1xyXG5cclxuICAgICAgY29uc3QgY2xlYXIgPSAoKSA9PiB7XHJcbiAgICAgICAgZGF0YUNoYW5uZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgcmVzb2x2ZXIpO1xyXG4gICAgICAgIGRhdGFDaGFubmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCByZWplY3Rvcik7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXNvbHZlciA9ICgpID0+IHtcclxuICAgICAgICBjbGVhcigpO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfTtcclxuICAgICAgcmVqZWN0b3IgPSAoKSA9PiB7XHJcbiAgICAgICAgY2xlYXIoKTtcclxuICAgICAgICByZWplY3QoKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGRhdGFDaGFubmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsIHJlc29sdmVyKTtcclxuICAgICAgZGF0YUNoYW5uZWwuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIHJlamVjdG9yKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuY29uc3QgaXNIMjY0VmlkZW9TdXBwb3J0ZWQgPSAoKCkgPT4ge1xyXG4gIGNvbnN0IHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpO1xyXG4gIHJldHVybiB2aWRlby5jYW5QbGF5VHlwZSgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSwgbXA0YS40MC4yXCInKSAhPT0gXCJcIjtcclxufSkoKTtcclxuXHJcbmNvbnN0IE9QVVNfUEFSQU1FVEVSUyA9IHtcclxuICAvLyBpbmRpY2F0ZXMgdGhhdCB3ZSB3YW50IHRvIGVuYWJsZSBEVFggdG8gZWxpZGUgc2lsZW5jZSBwYWNrZXRzXHJcbiAgdXNlZHR4OiAxLFxyXG4gIC8vIGluZGljYXRlcyB0aGF0IHdlIHByZWZlciB0byByZWNlaXZlIG1vbm8gYXVkaW8gKGltcG9ydGFudCBmb3Igdm9pcCBwcm9maWxlKVxyXG4gIHN0ZXJlbzogMCxcclxuICAvLyBpbmRpY2F0ZXMgdGhhdCB3ZSBwcmVmZXIgdG8gc2VuZCBtb25vIGF1ZGlvIChpbXBvcnRhbnQgZm9yIHZvaXAgcHJvZmlsZSlcclxuICBcInNwcm9wLXN0ZXJlb1wiOiAwXHJcbn07XHJcblxyXG5jb25zdCBQRUVSX0NPTk5FQ1RJT05fQ09ORklHID0ge1xyXG4gIGljZVNlcnZlcnM6IFt7IHVybHM6IFwic3R1bjpzdHVuMS5sLmdvb2dsZS5jb206MTkzMDJcIiB9LCB7IHVybHM6IFwic3R1bjpzdHVuMi5sLmdvb2dsZS5jb206MTkzMDJcIiB9XVxyXG59O1xyXG5cclxuY29uc3QgV1NfTk9STUFMX0NMT1NVUkUgPSAxMDAwO1xyXG5cclxuY2xhc3MgSmFudXNBZGFwdGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucm9vbSA9IG51bGw7XHJcbiAgICAvLyBXZSBleHBlY3QgdGhlIGNvbnN1bWVyIHRvIHNldCBhIGNsaWVudCBpZCBiZWZvcmUgY29ubmVjdGluZy5cclxuICAgIHRoaXMuY2xpZW50SWQgPSBudWxsO1xyXG4gICAgdGhpcy5qb2luVG9rZW4gPSBudWxsO1xyXG5cclxuICAgIHRoaXMuc2VydmVyVXJsID0gbnVsbDtcclxuICAgIHRoaXMud2ViUnRjT3B0aW9ucyA9IHt9O1xyXG4gICAgdGhpcy53cyA9IG51bGw7XHJcbiAgICB0aGlzLnNlc3Npb24gPSBudWxsO1xyXG4gICAgdGhpcy5yZWxpYWJsZVRyYW5zcG9ydCA9IFwiZGF0YWNoYW5uZWxcIjtcclxuICAgIHRoaXMudW5yZWxpYWJsZVRyYW5zcG9ydCA9IFwiZGF0YWNoYW5uZWxcIjtcclxuXHJcbiAgICAvLyBJbiB0aGUgZXZlbnQgdGhlIHNlcnZlciByZXN0YXJ0cyBhbmQgYWxsIGNsaWVudHMgbG9zZSBjb25uZWN0aW9uLCByZWNvbm5lY3Qgd2l0aFxyXG4gICAgLy8gc29tZSByYW5kb20gaml0dGVyIGFkZGVkIHRvIHByZXZlbnQgc2ltdWx0YW5lb3VzIHJlY29ubmVjdGlvbiByZXF1ZXN0cy5cclxuICAgIHRoaXMuaW5pdGlhbFJlY29ubmVjdGlvbkRlbGF5ID0gMTAwMCAqIE1hdGgucmFuZG9tKCk7XHJcbiAgICB0aGlzLnJlY29ubmVjdGlvbkRlbGF5ID0gdGhpcy5pbml0aWFsUmVjb25uZWN0aW9uRGVsYXk7XHJcbiAgICB0aGlzLnJlY29ubmVjdGlvblRpbWVvdXQgPSBudWxsO1xyXG4gICAgdGhpcy5tYXhSZWNvbm5lY3Rpb25BdHRlbXB0cyA9IDEwO1xyXG4gICAgdGhpcy5yZWNvbm5lY3Rpb25BdHRlbXB0cyA9IDA7XHJcblxyXG4gICAgdGhpcy5wdWJsaXNoZXIgPSBudWxsO1xyXG4gICAgdGhpcy5vY2N1cGFudHMgPSB7fTtcclxuICAgIHRoaXMubGVmdE9jY3VwYW50cyA9IG5ldyBTZXQoKTtcclxuICAgIHRoaXMubWVkaWFTdHJlYW1zID0ge307XHJcbiAgICB0aGlzLmxvY2FsTWVkaWFTdHJlYW0gPSBudWxsO1xyXG4gICAgdGhpcy5wZW5kaW5nTWVkaWFSZXF1ZXN0cyA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICB0aGlzLmJsb2NrZWRDbGllbnRzID0gbmV3IE1hcCgpO1xyXG4gICAgdGhpcy5mcm96ZW5VcGRhdGVzID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIHRoaXMudGltZU9mZnNldHMgPSBbXTtcclxuICAgIHRoaXMuc2VydmVyVGltZVJlcXVlc3RzID0gMDtcclxuICAgIHRoaXMuYXZnVGltZU9mZnNldCA9IDA7XHJcblxyXG4gICAgdGhpcy5vbldlYnNvY2tldE9wZW4gPSB0aGlzLm9uV2Vic29ja2V0T3Blbi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vbldlYnNvY2tldENsb3NlID0gdGhpcy5vbldlYnNvY2tldENsb3NlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uV2Vic29ja2V0TWVzc2FnZSA9IHRoaXMub25XZWJzb2NrZXRNZXNzYWdlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uRGF0YUNoYW5uZWxNZXNzYWdlID0gdGhpcy5vbkRhdGFDaGFubmVsTWVzc2FnZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vbkRhdGEgPSB0aGlzLm9uRGF0YS5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VydmVyVXJsKHVybCkge1xyXG4gICAgdGhpcy5zZXJ2ZXJVcmwgPSB1cmw7XHJcbiAgfVxyXG5cclxuICBzZXRBcHAoYXBwKSB7fVxyXG5cclxuICBzZXRSb29tKHJvb21OYW1lKSB7XHJcbiAgICB0aGlzLnJvb20gPSByb29tTmFtZTtcclxuICB9XHJcblxyXG4gIHNldEpvaW5Ub2tlbihqb2luVG9rZW4pIHtcclxuICAgIHRoaXMuam9pblRva2VuID0gam9pblRva2VuO1xyXG4gIH1cclxuXHJcbiAgc2V0Q2xpZW50SWQoY2xpZW50SWQpIHtcclxuICAgIHRoaXMuY2xpZW50SWQgPSBjbGllbnRJZDtcclxuICB9XHJcblxyXG4gIHNldFdlYlJ0Y09wdGlvbnMob3B0aW9ucykge1xyXG4gICAgdGhpcy53ZWJSdGNPcHRpb25zID0gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIHNldFNlcnZlckNvbm5lY3RMaXN0ZW5lcnMoc3VjY2Vzc0xpc3RlbmVyLCBmYWlsdXJlTGlzdGVuZXIpIHtcclxuICAgIHRoaXMuY29ubmVjdFN1Y2Nlc3MgPSBzdWNjZXNzTGlzdGVuZXI7XHJcbiAgICB0aGlzLmNvbm5lY3RGYWlsdXJlID0gZmFpbHVyZUxpc3RlbmVyO1xyXG4gIH1cclxuXHJcbiAgc2V0Um9vbU9jY3VwYW50TGlzdGVuZXIob2NjdXBhbnRMaXN0ZW5lcikge1xyXG4gICAgdGhpcy5vbk9jY3VwYW50c0NoYW5nZWQgPSBvY2N1cGFudExpc3RlbmVyO1xyXG4gIH1cclxuXHJcbiAgc2V0RGF0YUNoYW5uZWxMaXN0ZW5lcnMob3Blbkxpc3RlbmVyLCBjbG9zZWRMaXN0ZW5lciwgbWVzc2FnZUxpc3RlbmVyKSB7XHJcbiAgICB0aGlzLm9uT2NjdXBhbnRDb25uZWN0ZWQgPSBvcGVuTGlzdGVuZXI7XHJcbiAgICB0aGlzLm9uT2NjdXBhbnREaXNjb25uZWN0ZWQgPSBjbG9zZWRMaXN0ZW5lcjtcclxuICAgIHRoaXMub25PY2N1cGFudE1lc3NhZ2UgPSBtZXNzYWdlTGlzdGVuZXI7XHJcbiAgfVxyXG5cclxuICBzZXRSZWNvbm5lY3Rpb25MaXN0ZW5lcnMocmVjb25uZWN0aW5nTGlzdGVuZXIsIHJlY29ubmVjdGVkTGlzdGVuZXIsIHJlY29ubmVjdGlvbkVycm9yTGlzdGVuZXIpIHtcclxuICAgIC8vIG9uUmVjb25uZWN0aW5nIGlzIGNhbGxlZCB3aXRoIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHVudGlsIHRoZSBuZXh0IHJlY29ubmVjdGlvbiBhdHRlbXB0XHJcbiAgICB0aGlzLm9uUmVjb25uZWN0aW5nID0gcmVjb25uZWN0aW5nTGlzdGVuZXI7XHJcbiAgICAvLyBvblJlY29ubmVjdGVkIGlzIGNhbGxlZCB3aGVuIHRoZSBjb25uZWN0aW9uIGhhcyBiZWVuIHJlZXN0YWJsaXNoZWRcclxuICAgIHRoaXMub25SZWNvbm5lY3RlZCA9IHJlY29ubmVjdGVkTGlzdGVuZXI7XHJcbiAgICAvLyBvblJlY29ubmVjdGlvbkVycm9yIGlzIGNhbGxlZCB3aXRoIGFuIGVycm9yIHdoZW4gbWF4UmVjb25uZWN0aW9uQXR0ZW1wdHMgaGFzIGJlZW4gcmVhY2hlZFxyXG4gICAgdGhpcy5vblJlY29ubmVjdGlvbkVycm9yID0gcmVjb25uZWN0aW9uRXJyb3JMaXN0ZW5lcjtcclxuICB9XHJcblxyXG4gIGNvbm5lY3QoKSB7XHJcbiAgICBkZWJ1ZyhgY29ubmVjdGluZyB0byAke3RoaXMuc2VydmVyVXJsfWApO1xyXG5cclxuICAgIGNvbnN0IHdlYnNvY2tldENvbm5lY3Rpb24gPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KHRoaXMuc2VydmVyVXJsLCBcImphbnVzLXByb3RvY29sXCIpO1xyXG5cclxuICAgICAgdGhpcy5zZXNzaW9uID0gbmV3IG1qLkphbnVzU2Vzc2lvbih0aGlzLndzLnNlbmQuYmluZCh0aGlzLndzKSx7XHJcbiAgICAgICAgdmVyYm9zZTogZmFsc2UsXHJcbiAgICAgICAgdGltZW91dE1zOiA2MDAwMCxcclxuICAgICAgICBrZWVwYWxpdmVNczogNDAwMDBcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBsZXQgb25PcGVuO1xyXG5cclxuICAgICAgY29uc3Qgb25FcnJvciA9ICgpID0+IHtcclxuICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy53cy5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwgdGhpcy5vbldlYnNvY2tldENsb3NlKTtcclxuICAgICAgdGhpcy53cy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB0aGlzLm9uV2Vic29ja2V0TWVzc2FnZSk7XHJcblxyXG4gICAgICBvbk9wZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy53cy5yZW1vdmVFdmVudExpc3RlbmVyKFwib3BlblwiLCBvbk9wZW4pO1xyXG4gICAgICAgIHRoaXMud3MucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIG9uRXJyb3IpO1xyXG4gICAgICAgIHRoaXMub25XZWJzb2NrZXRPcGVuKClcclxuICAgICAgICAgIC50aGVuKHJlc29sdmUpXHJcbiAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgb25PcGVuKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBQcm9taXNlLmFsbChbd2Vic29ja2V0Q29ubmVjdGlvbiwgdGhpcy51cGRhdGVUaW1lT2Zmc2V0KCldKTtcclxuICB9XHJcblxyXG4gIGRpc2Nvbm5lY3QoKSB7XHJcbiAgICBkZWJ1ZyhgZGlzY29ubmVjdGluZ2ApO1xyXG5cclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlY29ubmVjdGlvblRpbWVvdXQpO1xyXG5cclxuICAgIHRoaXMucmVtb3ZlQWxsT2NjdXBhbnRzKCk7XHJcblxyXG4gICAgaWYgKHRoaXMucHVibGlzaGVyKSB7XHJcbiAgICAgIC8vIENsb3NlIHRoZSBwdWJsaXNoZXIgcGVlciBjb25uZWN0aW9uLiBXaGljaCBhbHNvIGRldGFjaGVzIHRoZSBwbHVnaW4gaGFuZGxlLlxyXG4gICAgICB0aGlzLnB1Ymxpc2hlci5jb25uLmNsb3NlKCk7XHJcbiAgICAgIHRoaXMucHVibGlzaGVyID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zZXNzaW9uKSB7XHJcbiAgICAgIHRoaXMuc2Vzc2lvbi5kaXNwb3NlKCk7XHJcbiAgICAgIHRoaXMuc2Vzc2lvbiA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMud3MpIHtcclxuICAgICAgdGhpcy53cy5yZW1vdmVFdmVudExpc3RlbmVyKFwib3BlblwiLCB0aGlzLm9uV2Vic29ja2V0T3Blbik7XHJcbiAgICAgIHRoaXMud3MucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsIHRoaXMub25XZWJzb2NrZXRDbG9zZSk7XHJcbiAgICAgIHRoaXMud3MucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5vbldlYnNvY2tldE1lc3NhZ2UpO1xyXG4gICAgICB0aGlzLndzLmNsb3NlKCk7XHJcbiAgICAgIHRoaXMud3MgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNEaXNjb25uZWN0ZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy53cyA9PT0gbnVsbDtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uV2Vic29ja2V0T3BlbigpIHtcclxuICAgIC8vIENyZWF0ZSB0aGUgSmFudXMgU2Vzc2lvblxyXG4gICAgYXdhaXQgdGhpcy5zZXNzaW9uLmNyZWF0ZSgpO1xyXG5cclxuICAgIC8vIEF0dGFjaCB0aGUgU0ZVIFBsdWdpbiBhbmQgY3JlYXRlIGEgUlRDUGVlckNvbm5lY3Rpb24gZm9yIHRoZSBwdWJsaXNoZXIuXHJcbiAgICAvLyBUaGUgcHVibGlzaGVyIHNlbmRzIGF1ZGlvIGFuZCBvcGVucyB0d28gYmlkaXJlY3Rpb25hbCBkYXRhIGNoYW5uZWxzLlxyXG4gICAgLy8gT25lIHJlbGlhYmxlIGRhdGFjaGFubmVsIGFuZCBvbmUgdW5yZWxpYWJsZS5cclxuICAgIHRoaXMucHVibGlzaGVyID0gYXdhaXQgdGhpcy5jcmVhdGVQdWJsaXNoZXIoKTtcclxuXHJcbiAgICAvLyBDYWxsIHRoZSBuYWYgY29ubmVjdFN1Y2Nlc3MgY2FsbGJhY2sgYmVmb3JlIHdlIHN0YXJ0IHJlY2VpdmluZyBXZWJSVEMgbWVzc2FnZXMuXHJcbiAgICB0aGlzLmNvbm5lY3RTdWNjZXNzKHRoaXMuY2xpZW50SWQpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wdWJsaXNoZXIuaW5pdGlhbE9jY3VwYW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBhd2FpdCB0aGlzLmFkZE9jY3VwYW50KHRoaXMucHVibGlzaGVyLmluaXRpYWxPY2N1cGFudHNbaV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25XZWJzb2NrZXRDbG9zZShldmVudCkge1xyXG4gICAgLy8gVGhlIGNvbm5lY3Rpb24gd2FzIGNsb3NlZCBzdWNjZXNzZnVsbHkuIERvbid0IHRyeSB0byByZWNvbm5lY3QuXHJcbiAgICBpZiAoZXZlbnQuY29kZSA9PT0gV1NfTk9STUFMX0NMT1NVUkUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9uUmVjb25uZWN0aW5nKSB7XHJcbiAgICAgIHRoaXMub25SZWNvbm5lY3RpbmcodGhpcy5yZWNvbm5lY3Rpb25EZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZWNvbm5lY3Rpb25UaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlY29ubmVjdCgpLCB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KTtcclxuICB9XHJcblxyXG4gIHJlY29ubmVjdCgpIHtcclxuICAgIC8vIERpc3Bvc2Ugb2YgYWxsIG5ldHdvcmtlZCBlbnRpdGllcyBhbmQgb3RoZXIgcmVzb3VyY2VzIHRpZWQgdG8gdGhlIHNlc3Npb24uXHJcbiAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcclxuXHJcbiAgICB0aGlzLmNvbm5lY3QoKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheSA9IHRoaXMuaW5pdGlhbFJlY29ubmVjdGlvbkRlbGF5O1xyXG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMgPSAwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vblJlY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICB0aGlzLm9uUmVjb25uZWN0ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheSArPSAxMDAwO1xyXG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMrKztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMgPiB0aGlzLm1heFJlY29ubmVjdGlvbkF0dGVtcHRzICYmIHRoaXMub25SZWNvbm5lY3Rpb25FcnJvcikge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMub25SZWNvbm5lY3Rpb25FcnJvcihcclxuICAgICAgICAgICAgbmV3IEVycm9yKFwiQ29ubmVjdGlvbiBjb3VsZCBub3QgYmUgcmVlc3RhYmxpc2hlZCwgZXhjZWVkZWQgbWF4aW11bSBudW1iZXIgb2YgcmVjb25uZWN0aW9uIGF0dGVtcHRzLlwiKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uUmVjb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICB0aGlzLm9uUmVjb25uZWN0aW5nKHRoaXMucmVjb25uZWN0aW9uRGVsYXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25UaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlY29ubmVjdCgpLCB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbldlYnNvY2tldE1lc3NhZ2UoZXZlbnQpIHtcclxuICAgIHRoaXMuc2Vzc2lvbi5yZWNlaXZlKEpTT04ucGFyc2UoZXZlbnQuZGF0YSkpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgYWRkT2NjdXBhbnQob2NjdXBhbnRJZCkge1xyXG4gICAgdmFyIHN1YnNjcmliZXIgPSBhd2FpdCB0aGlzLmNyZWF0ZVN1YnNjcmliZXIob2NjdXBhbnRJZCk7XHJcblxyXG4gICAgaWYgKCFzdWJzY3JpYmVyKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5vY2N1cGFudHNbb2NjdXBhbnRJZF0gPSBzdWJzY3JpYmVyO1xyXG5cclxuICAgIHRoaXMuc2V0TWVkaWFTdHJlYW0ob2NjdXBhbnRJZCwgc3Vic2NyaWJlci5tZWRpYVN0cmVhbSk7XHJcblxyXG4gICAgLy8gQ2FsbCB0aGUgTmV0d29ya2VkIEFGcmFtZSBjYWxsYmFja3MgZm9yIHRoZSBuZXcgb2NjdXBhbnQuXHJcbiAgICB0aGlzLm9uT2NjdXBhbnRDb25uZWN0ZWQob2NjdXBhbnRJZCk7XHJcbiAgICB0aGlzLm9uT2NjdXBhbnRzQ2hhbmdlZCh0aGlzLm9jY3VwYW50cyk7XHJcblxyXG4gICAgcmV0dXJuIHN1YnNjcmliZXI7XHJcbiAgfVxyXG5cclxuICByZW1vdmVBbGxPY2N1cGFudHMoKSB7XHJcbiAgICBmb3IgKGNvbnN0IG9jY3VwYW50SWQgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5vY2N1cGFudHMpKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlT2NjdXBhbnQob2NjdXBhbnRJZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVPY2N1cGFudChvY2N1cGFudElkKSB7XHJcbiAgICB0aGlzLmxlZnRPY2N1cGFudHMuYWRkKG9jY3VwYW50SWQpO1xyXG5cclxuICAgIGlmICh0aGlzLm9jY3VwYW50c1tvY2N1cGFudElkXSkge1xyXG4gICAgICAvLyBDbG9zZSB0aGUgc3Vic2NyaWJlciBwZWVyIGNvbm5lY3Rpb24uIFdoaWNoIGFsc28gZGV0YWNoZXMgdGhlIHBsdWdpbiBoYW5kbGUuXHJcbiAgICAgIGlmICh0aGlzLm9jY3VwYW50c1tvY2N1cGFudElkXSkge1xyXG4gICAgICAgIHRoaXMub2NjdXBhbnRzW29jY3VwYW50SWRdLmNvbm4uY2xvc2UoKTtcclxuICAgICAgICBkZWxldGUgdGhpcy5vY2N1cGFudHNbb2NjdXBhbnRJZF07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLm1lZGlhU3RyZWFtc1tvY2N1cGFudElkXSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1lZGlhU3RyZWFtc1tvY2N1cGFudElkXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMucGVuZGluZ01lZGlhUmVxdWVzdHMuaGFzKG9jY3VwYW50SWQpKSB7XHJcbiAgICAgICAgY29uc3QgbXNnID0gXCJUaGUgdXNlciBkaXNjb25uZWN0ZWQgYmVmb3JlIHRoZSBtZWRpYSBzdHJlYW0gd2FzIHJlc29sdmVkLlwiO1xyXG4gICAgICAgIHRoaXMucGVuZGluZ01lZGlhUmVxdWVzdHMuZ2V0KG9jY3VwYW50SWQpLmF1ZGlvLnJlamVjdChtc2cpO1xyXG4gICAgICAgIHRoaXMucGVuZGluZ01lZGlhUmVxdWVzdHMuZ2V0KG9jY3VwYW50SWQpLnZpZGVvLnJlamVjdChtc2cpO1xyXG4gICAgICAgIHRoaXMucGVuZGluZ01lZGlhUmVxdWVzdHMuZGVsZXRlKG9jY3VwYW50SWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDYWxsIHRoZSBOZXR3b3JrZWQgQUZyYW1lIGNhbGxiYWNrcyBmb3IgdGhlIHJlbW92ZWQgb2NjdXBhbnQuXHJcbiAgICAgIHRoaXMub25PY2N1cGFudERpc2Nvbm5lY3RlZChvY2N1cGFudElkKTtcclxuICAgICAgdGhpcy5vbk9jY3VwYW50c0NoYW5nZWQodGhpcy5vY2N1cGFudHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXNzb2NpYXRlKGNvbm4sIGhhbmRsZSkge1xyXG4gICAgY29ubi5hZGRFdmVudExpc3RlbmVyKFwiaWNlY2FuZGlkYXRlXCIsIGV2ID0+IHtcclxuICAgICAgaGFuZGxlLnNlbmRUcmlja2xlKGV2LmNhbmRpZGF0ZSB8fCBudWxsKS5jYXRjaChlID0+IGVycm9yKFwiRXJyb3IgdHJpY2tsaW5nIElDRTogJW9cIiwgZSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gd2UgaGF2ZSB0byBkZWJvdW5jZSB0aGVzZSBiZWNhdXNlIGphbnVzIGdldHMgYW5ncnkgaWYgeW91IHNlbmQgaXQgYSBuZXcgU0RQIGJlZm9yZVxyXG4gICAgLy8gaXQncyBmaW5pc2hlZCBwcm9jZXNzaW5nIGFuIGV4aXN0aW5nIFNEUC4gaW4gYWN0dWFsaXR5LCBpdCBzZWVtcyBsaWtlIHRoaXMgaXMgbWF5YmVcclxuICAgIC8vIHRvbyBsaWJlcmFsIGFuZCB3ZSBuZWVkIHRvIHdhaXQgc29tZSBhbW91bnQgb2YgdGltZSBhZnRlciBhbiBvZmZlciBiZWZvcmUgc2VuZGluZyBhbm90aGVyLFxyXG4gICAgLy8gYnV0IHdlIGRvbid0IGN1cnJlbnRseSBrbm93IGFueSBnb29kIHdheSBvZiBkZXRlY3RpbmcgZXhhY3RseSBob3cgbG9uZyA6KFxyXG4gICAgY29ubi5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBcIm5lZ290aWF0aW9ubmVlZGVkXCIsXHJcbiAgICAgIGRlYm91bmNlKGV2ID0+IHtcclxuICAgICAgICBkZWJ1ZyhcIlNlbmRpbmcgbmV3IG9mZmVyIGZvciBoYW5kbGU6ICVvXCIsIGhhbmRsZSk7XHJcbiAgICAgICAgdmFyIG9mZmVyID0gY29ubi5jcmVhdGVPZmZlcigpLnRoZW4odGhpcy5jb25maWd1cmVQdWJsaXNoZXJTZHApLnRoZW4odGhpcy5maXhTYWZhcmlJY2VVRnJhZyk7XHJcbiAgICAgICAgdmFyIGxvY2FsID0gb2ZmZXIudGhlbihvID0+IGNvbm4uc2V0TG9jYWxEZXNjcmlwdGlvbihvKSk7XHJcbiAgICAgICAgdmFyIHJlbW90ZSA9IG9mZmVyO1xyXG5cclxuICAgICAgICByZW1vdGUgPSByZW1vdGVcclxuICAgICAgICAgIC50aGVuKHRoaXMuZml4U2FmYXJpSWNlVUZyYWcpXHJcbiAgICAgICAgICAudGhlbihqID0+IGhhbmRsZS5zZW5kSnNlcChqKSlcclxuICAgICAgICAgIC50aGVuKHIgPT4gY29ubi5zZXRSZW1vdGVEZXNjcmlwdGlvbihyLmpzZXApKTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvY2FsLCByZW1vdGVdKS5jYXRjaChlID0+IGVycm9yKFwiRXJyb3IgbmVnb3RpYXRpbmcgb2ZmZXI6ICVvXCIsIGUpKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgICBoYW5kbGUub24oXHJcbiAgICAgIFwiZXZlbnRcIixcclxuICAgICAgZGVib3VuY2UoZXYgPT4ge1xyXG4gICAgICAgIHZhciBqc2VwID0gZXYuanNlcDtcclxuICAgICAgICBpZiAoanNlcCAmJiBqc2VwLnR5cGUgPT0gXCJvZmZlclwiKSB7XHJcbiAgICAgICAgICBkZWJ1ZyhcIkFjY2VwdGluZyBuZXcgb2ZmZXIgZm9yIGhhbmRsZTogJW9cIiwgaGFuZGxlKTtcclxuICAgICAgICAgIHZhciBhbnN3ZXIgPSBjb25uXHJcbiAgICAgICAgICAgIC5zZXRSZW1vdGVEZXNjcmlwdGlvbih0aGlzLmNvbmZpZ3VyZVN1YnNjcmliZXJTZHAoanNlcCkpXHJcbiAgICAgICAgICAgIC50aGVuKF8gPT4gY29ubi5jcmVhdGVBbnN3ZXIoKSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5maXhTYWZhcmlJY2VVRnJhZyk7XHJcbiAgICAgICAgICB2YXIgbG9jYWwgPSBhbnN3ZXIudGhlbihhID0+IGNvbm4uc2V0TG9jYWxEZXNjcmlwdGlvbihhKSk7XHJcbiAgICAgICAgICB2YXIgcmVtb3RlID0gYW5zd2VyLnRoZW4oaiA9PiBoYW5kbGUuc2VuZEpzZXAoaikpO1xyXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb2NhbCwgcmVtb3RlXSkuY2F0Y2goZSA9PiBlcnJvcihcIkVycm9yIG5lZ290aWF0aW5nIGFuc3dlcjogJW9cIiwgZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBzb21lIG90aGVyIGtpbmQgb2YgZXZlbnQsIG5vdGhpbmcgdG8gZG9cclxuICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBjcmVhdGVQdWJsaXNoZXIoKSB7XHJcbiAgICB2YXIgaGFuZGxlID0gbmV3IG1qLkphbnVzUGx1Z2luSGFuZGxlKHRoaXMuc2Vzc2lvbik7XHJcbiAgICB2YXIgY29ubiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihQRUVSX0NPTk5FQ1RJT05fQ09ORklHKTtcclxuXHJcbiAgICBkZWJ1ZyhcInB1YiB3YWl0aW5nIGZvciBzZnVcIik7XHJcbiAgICBhd2FpdCBoYW5kbGUuYXR0YWNoKFwiamFudXMucGx1Z2luLnNmdVwiKTtcclxuXHJcbiAgICB0aGlzLmFzc29jaWF0ZShjb25uLCBoYW5kbGUpO1xyXG5cclxuICAgIGRlYnVnKFwicHViIHdhaXRpbmcgZm9yIGRhdGEgY2hhbm5lbHMgJiB3ZWJydGN1cFwiKTtcclxuICAgIHZhciB3ZWJydGN1cCA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gaGFuZGxlLm9uKFwid2VicnRjdXBcIiwgcmVzb2x2ZSkpO1xyXG5cclxuICAgIC8vIFVucmVsaWFibGUgZGF0YWNoYW5uZWw6IHNlbmRpbmcgYW5kIHJlY2VpdmluZyBjb21wb25lbnQgdXBkYXRlcy5cclxuICAgIC8vIFJlbGlhYmxlIGRhdGFjaGFubmVsOiBzZW5kaW5nIGFuZCByZWNpZXZpbmcgZW50aXR5IGluc3RhbnRpYXRpb25zLlxyXG4gICAgdmFyIHJlbGlhYmxlQ2hhbm5lbCA9IGNvbm4uY3JlYXRlRGF0YUNoYW5uZWwoXCJyZWxpYWJsZVwiLCB7IG9yZGVyZWQ6IHRydWUgfSk7XHJcbiAgICB2YXIgdW5yZWxpYWJsZUNoYW5uZWwgPSBjb25uLmNyZWF0ZURhdGFDaGFubmVsKFwidW5yZWxpYWJsZVwiLCB7XHJcbiAgICAgIG9yZGVyZWQ6IGZhbHNlLFxyXG4gICAgICBtYXhSZXRyYW5zbWl0czogMFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmVsaWFibGVDaGFubmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGUgPT4gdGhpcy5vbkRhdGFDaGFubmVsTWVzc2FnZShlLCBcImphbnVzLXJlbGlhYmxlXCIpKTtcclxuICAgIHVucmVsaWFibGVDaGFubmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGUgPT4gdGhpcy5vbkRhdGFDaGFubmVsTWVzc2FnZShlLCBcImphbnVzLXVucmVsaWFibGVcIikpO1xyXG5cclxuICAgIGF3YWl0IHdlYnJ0Y3VwO1xyXG4gICAgYXdhaXQgdW50aWxEYXRhQ2hhbm5lbE9wZW4ocmVsaWFibGVDaGFubmVsKTtcclxuICAgIGF3YWl0IHVudGlsRGF0YUNoYW5uZWxPcGVuKHVucmVsaWFibGVDaGFubmVsKTtcclxuXHJcbiAgICAvLyBkb2luZyB0aGlzIGhlcmUgaXMgc29ydCBvZiBhIGhhY2sgYXJvdW5kIGNocm9tZSByZW5lZ290aWF0aW9uIHdlaXJkbmVzcyAtLVxyXG4gICAgLy8gaWYgd2UgZG8gaXQgcHJpb3IgdG8gd2VicnRjdXAsIGNocm9tZSBvbiBnZWFyIFZSIHdpbGwgc29tZXRpbWVzIHB1dCBhXHJcbiAgICAvLyByZW5lZ290aWF0aW9uIG9mZmVyIGluIGZsaWdodCB3aGlsZSB0aGUgZmlyc3Qgb2ZmZXIgd2FzIHN0aWxsIGJlaW5nXHJcbiAgICAvLyBwcm9jZXNzZWQgYnkgamFudXMuIHdlIHNob3VsZCBmaW5kIHNvbWUgbW9yZSBwcmluY2lwbGVkIHdheSB0byBmaWd1cmUgb3V0XHJcbiAgICAvLyB3aGVuIGphbnVzIGlzIGRvbmUgaW4gdGhlIGZ1dHVyZS5cclxuICAgIGlmICh0aGlzLmxvY2FsTWVkaWFTdHJlYW0pIHtcclxuICAgICAgdGhpcy5sb2NhbE1lZGlhU3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2godHJhY2sgPT4ge1xyXG4gICAgICAgIGNvbm4uYWRkVHJhY2sodHJhY2ssIHRoaXMubG9jYWxNZWRpYVN0cmVhbSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhhbmRsZSBhbGwgb2YgdGhlIGpvaW4gYW5kIGxlYXZlIGV2ZW50cy5cclxuICAgIGhhbmRsZS5vbihcImV2ZW50XCIsIGV2ID0+IHtcclxuICAgICAgdmFyIGRhdGEgPSBldi5wbHVnaW5kYXRhLmRhdGE7XHJcbiAgICAgIGlmIChkYXRhLmV2ZW50ID09IFwiam9pblwiICYmIGRhdGEucm9vbV9pZCA9PSB0aGlzLnJvb20pIHtcclxuICAgICAgICB0aGlzLmFkZE9jY3VwYW50KGRhdGEudXNlcl9pZCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5ldmVudCA9PSBcImxlYXZlXCIgJiYgZGF0YS5yb29tX2lkID09IHRoaXMucm9vbSkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlT2NjdXBhbnQoZGF0YS51c2VyX2lkKTtcclxuICAgICAgfSBlbHNlIGlmIChkYXRhLmV2ZW50ID09IFwiYmxvY2tlZFwiKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcImJsb2NrZWRcIiwgeyBkZXRhaWw6IHsgY2xpZW50SWQ6IGRhdGEuYnkgfSB9KSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5ldmVudCA9PSBcInVuYmxvY2tlZFwiKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcInVuYmxvY2tlZFwiLCB7IGRldGFpbDogeyBjbGllbnRJZDogZGF0YS5ieSB9IH0pKTtcclxuICAgICAgfSBlbHNlIGlmIChkYXRhLmV2ZW50ID09PSBcImRhdGFcIikge1xyXG4gICAgICAgIHRoaXMub25EYXRhKEpTT04ucGFyc2UoZGF0YS5ib2R5KSwgXCJqYW51cy1ldmVudFwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZGVidWcoXCJwdWIgd2FpdGluZyBmb3Igam9pblwiKTtcclxuXHJcbiAgICAvLyBTZW5kIGpvaW4gbWVzc2FnZSB0byBqYW51cy4gTGlzdGVuIGZvciBqb2luL2xlYXZlIG1lc3NhZ2VzLiBBdXRvbWF0aWNhbGx5IHN1YnNjcmliZSB0byBhbGwgdXNlcnMnIFdlYlJUQyBkYXRhLlxyXG4gICAgdmFyIG1lc3NhZ2UgPSBhd2FpdCB0aGlzLnNlbmRKb2luKGhhbmRsZSwge1xyXG4gICAgICBub3RpZmljYXRpb25zOiB0cnVlLFxyXG4gICAgICBkYXRhOiB0cnVlXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIW1lc3NhZ2UucGx1Z2luZGF0YS5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgY29uc3QgZXJyID0gbWVzc2FnZS5wbHVnaW5kYXRhLmRhdGEuZXJyb3I7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgdGhyb3cgZXJyO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpbml0aWFsT2NjdXBhbnRzID0gbWVzc2FnZS5wbHVnaW5kYXRhLmRhdGEucmVzcG9uc2UudXNlcnNbdGhpcy5yb29tXSB8fCBbXTtcclxuXHJcbiAgICBkZWJ1ZyhcInB1Ymxpc2hlciByZWFkeVwiKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGhhbmRsZSxcclxuICAgICAgaW5pdGlhbE9jY3VwYW50cyxcclxuICAgICAgcmVsaWFibGVDaGFubmVsLFxyXG4gICAgICB1bnJlbGlhYmxlQ2hhbm5lbCxcclxuICAgICAgY29ublxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZVB1Ymxpc2hlclNkcChqc2VwKSB7XHJcbiAgICBqc2VwLnNkcCA9IGpzZXAuc2RwLnJlcGxhY2UoL2E9Zm10cDooMTA5fDExMSkuKlxcclxcbi9nLCAobGluZSwgcHQpID0+IHtcclxuICAgICAgY29uc3QgcGFyYW1ldGVycyA9IE9iamVjdC5hc3NpZ24oc2RwVXRpbHMucGFyc2VGbXRwKGxpbmUpLCBPUFVTX1BBUkFNRVRFUlMpO1xyXG4gICAgICByZXR1cm4gc2RwVXRpbHMud3JpdGVGbXRwKHsgcGF5bG9hZFR5cGU6IHB0LCBwYXJhbWV0ZXJzOiBwYXJhbWV0ZXJzIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ganNlcDtcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZVN1YnNjcmliZXJTZHAoanNlcCkge1xyXG4gICAgLy8gdG9kbzogY29uc2lkZXIgY2xlYW5pbmcgdXAgdGhlc2UgaGFja3MgdG8gdXNlIHNkcHV0aWxzXHJcbiAgICBpZiAoIWlzSDI2NFZpZGVvU3VwcG9ydGVkKSB7XHJcbiAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJIZWFkbGVzc0Nocm9tZVwiKSAhPT0gLTEpIHtcclxuICAgICAgICAvLyBIZWFkbGVzc0Nocm9tZSAoZS5nLiBwdXBwZXRlZXIpIGRvZXNuJ3Qgc3VwcG9ydCB3ZWJydGMgdmlkZW8gc3RyZWFtcywgc28gd2UgcmVtb3ZlIHRob3NlIGxpbmVzIGZyb20gdGhlIFNEUC5cclxuICAgICAgICBqc2VwLnNkcCA9IGpzZXAuc2RwLnJlcGxhY2UoL209dmlkZW9bXl0qbT0vLCBcIm09XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogSGFjayB0byBnZXQgdmlkZW8gd29ya2luZyBvbiBDaHJvbWUgZm9yIEFuZHJvaWQuIGh0dHBzOi8vZ3JvdXBzLmdvb2dsZS5jb20vZm9ydW0vIyF0b3BpYy9tb3ppbGxhLmRldi5tZWRpYS9ZZTI5dnVNVHBvOFxyXG4gICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkFuZHJvaWRcIikgPT09IC0xKSB7XHJcbiAgICAgIGpzZXAuc2RwID0ganNlcC5zZHAucmVwbGFjZShcclxuICAgICAgICBcImE9cnRjcC1mYjoxMDcgZ29vZy1yZW1iXFxyXFxuXCIsXHJcbiAgICAgICAgXCJhPXJ0Y3AtZmI6MTA3IGdvb2ctcmVtYlxcclxcbmE9cnRjcC1mYjoxMDcgdHJhbnNwb3J0LWNjXFxyXFxuYT1mbXRwOjEwNyBsZXZlbC1hc3ltbWV0cnktYWxsb3dlZD0xO3BhY2tldGl6YXRpb24tbW9kZT0xO3Byb2ZpbGUtbGV2ZWwtaWQ9NDJlMDFmXFxyXFxuXCJcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGpzZXAuc2RwID0ganNlcC5zZHAucmVwbGFjZShcclxuICAgICAgICBcImE9cnRjcC1mYjoxMDcgZ29vZy1yZW1iXFxyXFxuXCIsXHJcbiAgICAgICAgXCJhPXJ0Y3AtZmI6MTA3IGdvb2ctcmVtYlxcclxcbmE9cnRjcC1mYjoxMDcgdHJhbnNwb3J0LWNjXFxyXFxuYT1mbXRwOjEwNyBsZXZlbC1hc3ltbWV0cnktYWxsb3dlZD0xO3BhY2tldGl6YXRpb24tbW9kZT0xO3Byb2ZpbGUtbGV2ZWwtaWQ9NDIwMDFmXFxyXFxuXCJcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBqc2VwO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZml4U2FmYXJpSWNlVUZyYWcoanNlcCkge1xyXG4gICAgLy8gU2FmYXJpIHByb2R1Y2VzIGEgXFxuIGluc3RlYWQgb2YgYW4gXFxyXFxuIGZvciB0aGUgaWNlLXVmcmFnLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21lZXRlY2hvL2phbnVzLWdhdGV3YXkvaXNzdWVzLzE4MThcclxuICAgIGpzZXAuc2RwID0ganNlcC5zZHAucmVwbGFjZSgvW15cXHJdXFxuYT1pY2UtdWZyYWcvZywgXCJcXHJcXG5hPWljZS11ZnJhZ1wiKTtcclxuICAgIHJldHVybiBqc2VwXHJcbiAgfVxyXG5cclxuICBhc3luYyBjcmVhdGVTdWJzY3JpYmVyKG9jY3VwYW50SWQpIHtcclxuICAgIGlmICh0aGlzLmxlZnRPY2N1cGFudHMuaGFzKG9jY3VwYW50SWQpKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihvY2N1cGFudElkICsgXCI6IGNhbmNlbGxlZCBvY2N1cGFudCBjb25uZWN0aW9uLCBvY2N1cGFudCBsZWZ0IGJlZm9yZSBzdWJzY3JpcHRpb24gbmVnb3RhdGlvbi5cIik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBoYW5kbGUgPSBuZXcgbWouSmFudXNQbHVnaW5IYW5kbGUodGhpcy5zZXNzaW9uKTtcclxuICAgIHZhciBjb25uID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKFBFRVJfQ09OTkVDVElPTl9DT05GSUcpO1xyXG5cclxuICAgIGRlYnVnKG9jY3VwYW50SWQgKyBcIjogc3ViIHdhaXRpbmcgZm9yIHNmdVwiKTtcclxuICAgIGF3YWl0IGhhbmRsZS5hdHRhY2goXCJqYW51cy5wbHVnaW4uc2Z1XCIpO1xyXG5cclxuICAgIHRoaXMuYXNzb2NpYXRlKGNvbm4sIGhhbmRsZSk7XHJcblxyXG4gICAgZGVidWcob2NjdXBhbnRJZCArIFwiOiBzdWIgd2FpdGluZyBmb3Igam9pblwiKTtcclxuXHJcbiAgICBpZiAodGhpcy5sZWZ0T2NjdXBhbnRzLmhhcyhvY2N1cGFudElkKSkge1xyXG4gICAgICBjb25uLmNsb3NlKCk7XHJcbiAgICAgIGNvbnNvbGUud2FybihvY2N1cGFudElkICsgXCI6IGNhbmNlbGxlZCBvY2N1cGFudCBjb25uZWN0aW9uLCBvY2N1cGFudCBsZWZ0IGFmdGVyIGF0dGFjaFwiKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2VuZCBqb2luIG1lc3NhZ2UgdG8gamFudXMuIERvbid0IGxpc3RlbiBmb3Igam9pbi9sZWF2ZSBtZXNzYWdlcy4gU3Vic2NyaWJlIHRvIHRoZSBvY2N1cGFudCdzIG1lZGlhLlxyXG4gICAgLy8gSmFudXMgc2hvdWxkIHNlbmQgdXMgYW4gb2ZmZXIgZm9yIHRoaXMgb2NjdXBhbnQncyBtZWRpYSBpbiByZXNwb25zZSB0byB0aGlzLlxyXG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMuc2VuZEpvaW4oaGFuZGxlLCB7IG1lZGlhOiBvY2N1cGFudElkIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLmxlZnRPY2N1cGFudHMuaGFzKG9jY3VwYW50SWQpKSB7XHJcbiAgICAgIGNvbm4uY2xvc2UoKTtcclxuICAgICAgY29uc29sZS53YXJuKG9jY3VwYW50SWQgKyBcIjogY2FuY2VsbGVkIG9jY3VwYW50IGNvbm5lY3Rpb24sIG9jY3VwYW50IGxlZnQgYWZ0ZXIgam9pblwiKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZGVidWcob2NjdXBhbnRJZCArIFwiOiBzdWIgd2FpdGluZyBmb3Igd2VicnRjdXBcIik7XHJcblxyXG4gICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmxlZnRPY2N1cGFudHMuaGFzKG9jY3VwYW50SWQpKSB7XHJcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgICAgaGFuZGxlLm9uKFwid2VicnRjdXBcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5sZWZ0T2NjdXBhbnRzLmhhcyhvY2N1cGFudElkKSkge1xyXG4gICAgICBjb25uLmNsb3NlKCk7XHJcbiAgICAgIGNvbnNvbGUud2FybihvY2N1cGFudElkICsgXCI6IGNhbmNlbCBvY2N1cGFudCBjb25uZWN0aW9uLCBvY2N1cGFudCBsZWZ0IGR1cmluZyBvciBhZnRlciB3ZWJydGN1cFwiKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzU2FmYXJpICYmICF0aGlzLl9pT1NIYWNrRGVsYXllZEluaXRpYWxQZWVyKSB7XHJcbiAgICAgIC8vIEhBQ0s6IHRoZSBmaXJzdCBwZWVyIG9uIFNhZmFyaSBkdXJpbmcgcGFnZSBsb2FkIGNhbiBmYWlsIHRvIHdvcmsgaWYgd2UgZG9uJ3RcclxuICAgICAgLy8gd2FpdCBzb21lIHRpbWUgYmVmb3JlIGNvbnRpbnVpbmcgaGVyZS4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9odWJzL3B1bGwvMTY5MlxyXG4gICAgICBhd2FpdCAobmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMzAwMCkpKTtcclxuICAgICAgdGhpcy5faU9TSGFja0RlbGF5ZWRJbml0aWFsUGVlciA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG1lZGlhU3RyZWFtID0gbmV3IE1lZGlhU3RyZWFtKCk7XHJcbiAgICB2YXIgcmVjZWl2ZXJzID0gY29ubi5nZXRSZWNlaXZlcnMoKTtcclxuICAgIHJlY2VpdmVycy5mb3JFYWNoKHJlY2VpdmVyID0+IHtcclxuICAgICAgaWYgKHJlY2VpdmVyLnRyYWNrKSB7XHJcbiAgICAgICAgbWVkaWFTdHJlYW0uYWRkVHJhY2socmVjZWl2ZXIudHJhY2spO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChtZWRpYVN0cmVhbS5nZXRUcmFja3MoKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgbWVkaWFTdHJlYW0gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlYnVnKG9jY3VwYW50SWQgKyBcIjogc3Vic2NyaWJlciByZWFkeVwiKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGhhbmRsZSxcclxuICAgICAgbWVkaWFTdHJlYW0sXHJcbiAgICAgIGNvbm5cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzZW5kSm9pbihoYW5kbGUsIHN1YnNjcmliZSkge1xyXG4gICAgcmV0dXJuIGhhbmRsZS5zZW5kTWVzc2FnZSh7XHJcbiAgICAgIGtpbmQ6IFwiam9pblwiLFxyXG4gICAgICByb29tX2lkOiB0aGlzLnJvb20sXHJcbiAgICAgIHVzZXJfaWQ6IHRoaXMuY2xpZW50SWQsXHJcbiAgICAgIHN1YnNjcmliZSxcclxuICAgICAgdG9rZW46IHRoaXMuam9pblRva2VuXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUZyZWV6ZSgpIHtcclxuICAgIGlmICh0aGlzLmZyb3plbikge1xyXG4gICAgICB0aGlzLnVuZnJlZXplKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZyZWV6ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnJlZXplKCkge1xyXG4gICAgdGhpcy5mcm96ZW4gPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgdW5mcmVlemUoKSB7XHJcbiAgICB0aGlzLmZyb3plbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5mbHVzaFBlbmRpbmdVcGRhdGVzKCk7XHJcbiAgfVxyXG5cclxuICBkYXRhRm9yVXBkYXRlTXVsdGlNZXNzYWdlKG5ldHdvcmtJZCwgbWVzc2FnZSkge1xyXG4gICAgLy8gXCJkXCIgaXMgYW4gYXJyYXkgb2YgZW50aXR5IGRhdGFzLCB3aGVyZSBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5IHJlcHJlc2VudHMgYSB1bmlxdWUgZW50aXR5IGFuZCBjb250YWluc1xyXG4gICAgLy8gbWV0YWRhdGEgZm9yIHRoZSBlbnRpdHksIGFuZCBhbiBhcnJheSBvZiBjb21wb25lbnRzIHRoYXQgaGF2ZSBiZWVuIHVwZGF0ZWQgb24gdGhlIGVudGl0eS5cclxuICAgIC8vIFRoaXMgbWV0aG9kIGZpbmRzIHRoZSBkYXRhIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGdpdmVuIG5ldHdvcmtJZC5cclxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gbWVzc2FnZS5kYXRhLmQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBtZXNzYWdlLmRhdGEuZFtpXTtcclxuXHJcbiAgICAgIGlmIChkYXRhLm5ldHdvcmtJZCA9PT0gbmV0d29ya0lkKSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGdldFBlbmRpbmdEYXRhKG5ldHdvcmtJZCwgbWVzc2FnZSkge1xyXG4gICAgaWYgKCFtZXNzYWdlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBsZXQgZGF0YSA9IG1lc3NhZ2UuZGF0YVR5cGUgPT09IFwidW1cIiA/IHRoaXMuZGF0YUZvclVwZGF0ZU11bHRpTWVzc2FnZShuZXR3b3JrSWQsIG1lc3NhZ2UpIDogbWVzc2FnZS5kYXRhO1xyXG5cclxuICAgIC8vIElnbm9yZSBtZXNzYWdlcyByZWxhdGluZyB0byB1c2VycyB3aG8gaGF2ZSBkaXNjb25uZWN0ZWQgc2luY2UgZnJlZXppbmcsIHRoZWlyIGVudGl0aWVzXHJcbiAgICAvLyB3aWxsIGhhdmUgYWxlYWR5IGJlZW4gcmVtb3ZlZCBieSBOQUYuXHJcbiAgICAvLyBOb3RlIHRoYXQgZGVsZXRlIG1lc3NhZ2VzIGhhdmUgbm8gXCJvd25lclwiIHNvIHdlIGhhdmUgdG8gY2hlY2sgZm9yIHRoYXQgYXMgd2VsbC5cclxuICAgIGlmIChkYXRhLm93bmVyICYmICF0aGlzLm9jY3VwYW50c1tkYXRhLm93bmVyXSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgLy8gSWdub3JlIG1lc3NhZ2VzIGZyb20gdXNlcnMgdGhhdCB3ZSBtYXkgaGF2ZSBibG9ja2VkIHdoaWxlIGZyb3plbi5cclxuICAgIGlmIChkYXRhLm93bmVyICYmIHRoaXMuYmxvY2tlZENsaWVudHMuaGFzKGRhdGEub3duZXIpKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICByZXR1cm4gZGF0YVxyXG4gIH1cclxuXHJcbiAgLy8gVXNlZCBleHRlcm5hbGx5XHJcbiAgZ2V0UGVuZGluZ0RhdGFGb3JOZXR3b3JrSWQobmV0d29ya0lkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRQZW5kaW5nRGF0YShuZXR3b3JrSWQsIHRoaXMuZnJvemVuVXBkYXRlcy5nZXQobmV0d29ya0lkKSk7XHJcbiAgfVxyXG5cclxuICBmbHVzaFBlbmRpbmdVcGRhdGVzKCkge1xyXG4gICAgZm9yIChjb25zdCBbbmV0d29ya0lkLCBtZXNzYWdlXSBvZiB0aGlzLmZyb3plblVwZGF0ZXMpIHtcclxuICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldFBlbmRpbmdEYXRhKG5ldHdvcmtJZCwgbWVzc2FnZSk7XHJcbiAgICAgIGlmICghZGF0YSkgY29udGludWU7XHJcblxyXG4gICAgICAvLyBPdmVycmlkZSB0aGUgZGF0YSB0eXBlIG9uIFwidW1cIiBtZXNzYWdlcyB0eXBlcywgc2luY2Ugd2UgZXh0cmFjdCBlbnRpdHkgdXBkYXRlcyBmcm9tIFwidW1cIiBtZXNzYWdlcyBpbnRvXHJcbiAgICAgIC8vIGluZGl2aWR1YWwgZnJvemVuVXBkYXRlcyBpbiBzdG9yZVNpbmdsZU1lc3NhZ2UuXHJcbiAgICAgIGNvbnN0IGRhdGFUeXBlID0gbWVzc2FnZS5kYXRhVHlwZSA9PT0gXCJ1bVwiID8gXCJ1XCIgOiBtZXNzYWdlLmRhdGFUeXBlO1xyXG5cclxuICAgICAgdGhpcy5vbk9jY3VwYW50TWVzc2FnZShudWxsLCBkYXRhVHlwZSwgZGF0YSwgbWVzc2FnZS5zb3VyY2UpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5mcm96ZW5VcGRhdGVzLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICBzdG9yZU1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgaWYgKG1lc3NhZ2UuZGF0YVR5cGUgPT09IFwidW1cIikgeyAvLyBVcGRhdGVNdWx0aVxyXG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IG1lc3NhZ2UuZGF0YS5kLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIHRoaXMuc3RvcmVTaW5nbGVNZXNzYWdlKG1lc3NhZ2UsIGkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN0b3JlU2luZ2xlTWVzc2FnZShtZXNzYWdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0b3JlU2luZ2xlTWVzc2FnZShtZXNzYWdlLCBpbmRleCkge1xyXG4gICAgY29uc3QgZGF0YSA9IGluZGV4ICE9PSB1bmRlZmluZWQgPyBtZXNzYWdlLmRhdGEuZFtpbmRleF0gOiBtZXNzYWdlLmRhdGE7XHJcbiAgICBjb25zdCBkYXRhVHlwZSA9IG1lc3NhZ2UuZGF0YVR5cGU7XHJcbiAgICBjb25zdCBzb3VyY2UgPSBtZXNzYWdlLnNvdXJjZTtcclxuXHJcbiAgICBjb25zdCBuZXR3b3JrSWQgPSBkYXRhLm5ldHdvcmtJZDtcclxuXHJcbiAgICBpZiAoIXRoaXMuZnJvemVuVXBkYXRlcy5oYXMobmV0d29ya0lkKSkge1xyXG4gICAgICB0aGlzLmZyb3plblVwZGF0ZXMuc2V0KG5ldHdvcmtJZCwgbWVzc2FnZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBzdG9yZWRNZXNzYWdlID0gdGhpcy5mcm96ZW5VcGRhdGVzLmdldChuZXR3b3JrSWQpO1xyXG4gICAgICBjb25zdCBzdG9yZWREYXRhID0gc3RvcmVkTWVzc2FnZS5kYXRhVHlwZSA9PT0gXCJ1bVwiID8gdGhpcy5kYXRhRm9yVXBkYXRlTXVsdGlNZXNzYWdlKG5ldHdvcmtJZCwgc3RvcmVkTWVzc2FnZSkgOiBzdG9yZWRNZXNzYWdlLmRhdGE7XHJcblxyXG4gICAgICAvLyBBdm9pZCB1cGRhdGluZyBjb21wb25lbnRzIGlmIHRoZSBlbnRpdHkgZGF0YSByZWNlaXZlZCBkaWQgbm90IGNvbWUgZnJvbSB0aGUgY3VycmVudCBvd25lci5cclxuICAgICAgY29uc3QgaXNPdXRkYXRlZE1lc3NhZ2UgPSBkYXRhLmxhc3RPd25lclRpbWUgPCBzdG9yZWREYXRhLmxhc3RPd25lclRpbWU7XHJcbiAgICAgIGNvbnN0IGlzQ29udGVtcG9yYW5lb3VzTWVzc2FnZSA9IGRhdGEubGFzdE93bmVyVGltZSA9PT0gc3RvcmVkRGF0YS5sYXN0T3duZXJUaW1lO1xyXG4gICAgICBpZiAoaXNPdXRkYXRlZE1lc3NhZ2UgfHwgKGlzQ29udGVtcG9yYW5lb3VzTWVzc2FnZSAmJiBzdG9yZWREYXRhLm93bmVyID4gZGF0YS5vd25lcikpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhVHlwZSA9PT0gXCJyXCIpIHtcclxuICAgICAgICBjb25zdCBjcmVhdGVkV2hpbGVGcm96ZW4gPSBzdG9yZWREYXRhICYmIHN0b3JlZERhdGEuaXNGaXJzdFN5bmM7XHJcbiAgICAgICAgaWYgKGNyZWF0ZWRXaGlsZUZyb3plbikge1xyXG4gICAgICAgICAgLy8gSWYgdGhlIGVudGl0eSB3YXMgY3JlYXRlZCBhbmQgZGVsZXRlZCB3aGlsZSBmcm96ZW4sIGRvbid0IGJvdGhlciBjb252ZXlpbmcgYW55dGhpbmcgdG8gdGhlIGNvbnN1bWVyLlxyXG4gICAgICAgICAgdGhpcy5mcm96ZW5VcGRhdGVzLmRlbGV0ZShuZXR3b3JrSWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBEZWxldGUgbWVzc2FnZXMgb3ZlcnJpZGUgYW55IG90aGVyIG1lc3NhZ2VzIGZvciB0aGlzIGVudGl0eVxyXG4gICAgICAgICAgdGhpcy5mcm96ZW5VcGRhdGVzLnNldChuZXR3b3JrSWQsIG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBtZXJnZSBpbiBjb21wb25lbnQgdXBkYXRlc1xyXG4gICAgICAgIGlmIChzdG9yZWREYXRhLmNvbXBvbmVudHMgJiYgZGF0YS5jb21wb25lbnRzKSB7XHJcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHN0b3JlZERhdGEuY29tcG9uZW50cywgZGF0YS5jb21wb25lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRGF0YUNoYW5uZWxNZXNzYWdlKGUsIHNvdXJjZSkge1xyXG4gICAgdGhpcy5vbkRhdGEoSlNPTi5wYXJzZShlLmRhdGEpLCBzb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgb25EYXRhKG1lc3NhZ2UsIHNvdXJjZSkge1xyXG4gICAgaWYgKGRlYnVnLmVuYWJsZWQpIHtcclxuICAgICAgZGVidWcoYERDIGluOiAke21lc3NhZ2V9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFtZXNzYWdlLmRhdGFUeXBlKSByZXR1cm47XHJcblxyXG4gICAgbWVzc2FnZS5zb3VyY2UgPSBzb3VyY2U7XHJcblxyXG4gICAgaWYgKHRoaXMuZnJvemVuKSB7XHJcbiAgICAgIHRoaXMuc3RvcmVNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vbk9jY3VwYW50TWVzc2FnZShudWxsLCBtZXNzYWdlLmRhdGFUeXBlLCBtZXNzYWdlLmRhdGEsIG1lc3NhZ2Uuc291cmNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNob3VsZFN0YXJ0Q29ubmVjdGlvblRvKGNsaWVudCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBzdGFydFN0cmVhbUNvbm5lY3Rpb24oY2xpZW50KSB7fVxyXG5cclxuICBjbG9zZVN0cmVhbUNvbm5lY3Rpb24oY2xpZW50KSB7fVxyXG5cclxuICBnZXRDb25uZWN0U3RhdHVzKGNsaWVudElkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5vY2N1cGFudHNbY2xpZW50SWRdID8gTkFGLmFkYXB0ZXJzLklTX0NPTk5FQ1RFRCA6IE5BRi5hZGFwdGVycy5OT1RfQ09OTkVDVEVEO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgdXBkYXRlVGltZU9mZnNldCgpIHtcclxuICAgIGlmICh0aGlzLmlzRGlzY29ubmVjdGVkKCkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBjbGllbnRTZW50VGltZSA9IERhdGUubm93KCk7XHJcblxyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goZG9jdW1lbnQubG9jYXRpb24uaHJlZiwge1xyXG4gICAgICBtZXRob2Q6IFwiSEVBRFwiLFxyXG4gICAgICBjYWNoZTogXCJuby1jYWNoZVwiXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBwcmVjaXNpb24gPSAxMDAwO1xyXG4gICAgY29uc3Qgc2VydmVyUmVjZWl2ZWRUaW1lID0gbmV3IERhdGUocmVzLmhlYWRlcnMuZ2V0KFwiRGF0ZVwiKSkuZ2V0VGltZSgpICsgcHJlY2lzaW9uIC8gMjtcclxuICAgIGNvbnN0IGNsaWVudFJlY2VpdmVkVGltZSA9IERhdGUubm93KCk7XHJcbiAgICBjb25zdCBzZXJ2ZXJUaW1lID0gc2VydmVyUmVjZWl2ZWRUaW1lICsgKGNsaWVudFJlY2VpdmVkVGltZSAtIGNsaWVudFNlbnRUaW1lKSAvIDI7XHJcbiAgICBjb25zdCB0aW1lT2Zmc2V0ID0gc2VydmVyVGltZSAtIGNsaWVudFJlY2VpdmVkVGltZTtcclxuXHJcbiAgICB0aGlzLnNlcnZlclRpbWVSZXF1ZXN0cysrO1xyXG5cclxuICAgIGlmICh0aGlzLnNlcnZlclRpbWVSZXF1ZXN0cyA8PSAxMCkge1xyXG4gICAgICB0aGlzLnRpbWVPZmZzZXRzLnB1c2godGltZU9mZnNldCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRpbWVPZmZzZXRzW3RoaXMuc2VydmVyVGltZVJlcXVlc3RzICUgMTBdID0gdGltZU9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmF2Z1RpbWVPZmZzZXQgPSB0aGlzLnRpbWVPZmZzZXRzLnJlZHVjZSgoYWNjLCBvZmZzZXQpID0+IChhY2MgKz0gb2Zmc2V0KSwgMCkgLyB0aGlzLnRpbWVPZmZzZXRzLmxlbmd0aDtcclxuXHJcbiAgICBpZiAodGhpcy5zZXJ2ZXJUaW1lUmVxdWVzdHMgPiAxMCkge1xyXG4gICAgICBkZWJ1ZyhgbmV3IHNlcnZlciB0aW1lIG9mZnNldDogJHt0aGlzLmF2Z1RpbWVPZmZzZXR9bXNgKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZVRpbWVPZmZzZXQoKSwgNSAqIDYwICogMTAwMCk7IC8vIFN5bmMgY2xvY2sgZXZlcnkgNSBtaW51dGVzLlxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy51cGRhdGVUaW1lT2Zmc2V0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRTZXJ2ZXJUaW1lKCkge1xyXG4gICAgcmV0dXJuIERhdGUubm93KCkgKyB0aGlzLmF2Z1RpbWVPZmZzZXQ7XHJcbiAgfVxyXG5cclxuICBnZXRNZWRpYVN0cmVhbShjbGllbnRJZCwgdHlwZSA9IFwiYXVkaW9cIikge1xyXG4gICAgaWYgKHRoaXMubWVkaWFTdHJlYW1zW2NsaWVudElkXSkge1xyXG4gICAgICBkZWJ1ZyhgQWxyZWFkeSBoYWQgJHt0eXBlfSBmb3IgJHtjbGllbnRJZH1gKTtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLm1lZGlhU3RyZWFtc1tjbGllbnRJZF1bdHlwZV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGVidWcoYFdhaXRpbmcgb24gJHt0eXBlfSBmb3IgJHtjbGllbnRJZH1gKTtcclxuICAgICAgaWYgKCF0aGlzLnBlbmRpbmdNZWRpYVJlcXVlc3RzLmhhcyhjbGllbnRJZCkpIHtcclxuICAgICAgICB0aGlzLnBlbmRpbmdNZWRpYVJlcXVlc3RzLnNldChjbGllbnRJZCwge30pO1xyXG5cclxuICAgICAgICBjb25zdCBhdWRpb1Byb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnBlbmRpbmdNZWRpYVJlcXVlc3RzLmdldChjbGllbnRJZCkuYXVkaW8gPSB7IHJlc29sdmUsIHJlamVjdCB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHZpZGVvUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgIHRoaXMucGVuZGluZ01lZGlhUmVxdWVzdHMuZ2V0KGNsaWVudElkKS52aWRlbyA9IHsgcmVzb2x2ZSwgcmVqZWN0IH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucGVuZGluZ01lZGlhUmVxdWVzdHMuZ2V0KGNsaWVudElkKS5hdWRpby5wcm9taXNlID0gYXVkaW9Qcm9taXNlO1xyXG4gICAgICAgIHRoaXMucGVuZGluZ01lZGlhUmVxdWVzdHMuZ2V0KGNsaWVudElkKS52aWRlby5wcm9taXNlID0gdmlkZW9Qcm9taXNlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLnBlbmRpbmdNZWRpYVJlcXVlc3RzLmdldChjbGllbnRJZClbdHlwZV0ucHJvbWlzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldE1lZGlhU3RyZWFtKGNsaWVudElkLCBzdHJlYW0pIHtcclxuICAgIC8vIFNhZmFyaSBkb2Vzbid0IGxpa2UgaXQgd2hlbiB5b3UgdXNlIHNpbmdsZSBhIG1peGVkIG1lZGlhIHN0cmVhbSB3aGVyZSBvbmUgb2YgdGhlIHRyYWNrcyBpcyBpbmFjdGl2ZSwgc28gd2VcclxuICAgIC8vIHNwbGl0IHRoZSB0cmFja3MgaW50byB0d28gc3RyZWFtcy5cclxuICAgIGNvbnN0IGF1ZGlvU3RyZWFtID0gbmV3IE1lZGlhU3RyZWFtKCk7XHJcbiAgICBzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5mb3JFYWNoKHRyYWNrID0+IGF1ZGlvU3RyZWFtLmFkZFRyYWNrKHRyYWNrKSk7XHJcbiAgICBjb25zdCB2aWRlb1N0cmVhbSA9IG5ldyBNZWRpYVN0cmVhbSgpO1xyXG4gICAgc3RyZWFtLmdldFZpZGVvVHJhY2tzKCkuZm9yRWFjaCh0cmFjayA9PiB2aWRlb1N0cmVhbS5hZGRUcmFjayh0cmFjaykpO1xyXG5cclxuICAgIHRoaXMubWVkaWFTdHJlYW1zW2NsaWVudElkXSA9IHsgYXVkaW86IGF1ZGlvU3RyZWFtLCB2aWRlbzogdmlkZW9TdHJlYW0gfTtcclxuXHJcbiAgICAvLyBSZXNvbHZlIHRoZSBwcm9taXNlIGZvciB0aGUgdXNlcidzIG1lZGlhIHN0cmVhbSBpZiBpdCBleGlzdHMuXHJcbiAgICBpZiAodGhpcy5wZW5kaW5nTWVkaWFSZXF1ZXN0cy5oYXMoY2xpZW50SWQpKSB7XHJcbiAgICAgIHRoaXMucGVuZGluZ01lZGlhUmVxdWVzdHMuZ2V0KGNsaWVudElkKS5hdWRpby5yZXNvbHZlKGF1ZGlvU3RyZWFtKTtcclxuICAgICAgdGhpcy5wZW5kaW5nTWVkaWFSZXF1ZXN0cy5nZXQoY2xpZW50SWQpLnZpZGVvLnJlc29sdmUodmlkZW9TdHJlYW0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2V0TG9jYWxNZWRpYVN0cmVhbShzdHJlYW0pIHtcclxuICAgIC8vIG91ciBqb2IgaGVyZSBpcyB0byBtYWtlIHN1cmUgdGhlIGNvbm5lY3Rpb24gd2luZHMgdXAgd2l0aCBSVFAgc2VuZGVycyBzZW5kaW5nIHRoZSBzdHVmZiBpbiB0aGlzIHN0cmVhbSxcclxuICAgIC8vIGFuZCBub3QgdGhlIHN0dWZmIHRoYXQgaXNuJ3QgaW4gdGhpcyBzdHJlYW0uIHN0cmF0ZWd5IGlzIHRvIHJlcGxhY2UgZXhpc3RpbmcgdHJhY2tzIGlmIHdlIGNhbiwgYWRkIHRyYWNrc1xyXG4gICAgLy8gdGhhdCB3ZSBjYW4ndCByZXBsYWNlLCBhbmQgZGlzYWJsZSB0cmFja3MgdGhhdCBkb24ndCBleGlzdCBhbnltb3JlLlxyXG5cclxuICAgIC8vIG5vdGUgdGhhdCB3ZSBkb24ndCBldmVyIHJlbW92ZSBhIHRyYWNrIGZyb20gdGhlIHN0cmVhbSAtLSBzaW5jZSBKYW51cyBkb2Vzbid0IHN1cHBvcnQgVW5pZmllZCBQbGFuLCB3ZSBhYnNvbHV0ZWx5XHJcbiAgICAvLyBjYW4ndCB3aW5kIHVwIHdpdGggYSBTRFAgdGhhdCBoYXMgPjEgYXVkaW8gb3IgPjEgdmlkZW8gdHJhY2tzLCBldmVuIGlmIG9uZSBvZiB0aGVtIGlzIGluYWN0aXZlICh3aGF0IHlvdSBnZXQgaWZcclxuICAgIC8vIHlvdSByZW1vdmUgYSB0cmFjayBmcm9tIGFuIGV4aXN0aW5nIHN0cmVhbS4pXHJcbiAgICBpZiAodGhpcy5wdWJsaXNoZXIgJiYgdGhpcy5wdWJsaXNoZXIuY29ubikge1xyXG4gICAgICBjb25zdCBleGlzdGluZ1NlbmRlcnMgPSB0aGlzLnB1Ymxpc2hlci5jb25uLmdldFNlbmRlcnMoKTtcclxuICAgICAgY29uc3QgbmV3U2VuZGVycyA9IFtdO1xyXG4gICAgICBjb25zdCB0cmFja3MgPSBzdHJlYW0uZ2V0VHJhY2tzKCk7XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHQgPSB0cmFja3NbaV07XHJcbiAgICAgICAgY29uc3Qgc2VuZGVyID0gZXhpc3RpbmdTZW5kZXJzLmZpbmQocyA9PiBzLnRyYWNrICE9IG51bGwgJiYgcy50cmFjay5raW5kID09IHQua2luZCk7XHJcblxyXG4gICAgICAgIGlmIChzZW5kZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgaWYgKHNlbmRlci5yZXBsYWNlVHJhY2spIHtcclxuICAgICAgICAgICAgYXdhaXQgc2VuZGVyLnJlcGxhY2VUcmFjayh0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFdvcmthcm91bmQgaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU3Njc3MVxyXG4gICAgICAgICAgICBpZiAodC5raW5kID09PSBcInZpZGVvXCIgJiYgdC5lbmFibGVkICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdmaXJlZm94JykgPiAtMSkge1xyXG4gICAgICAgICAgICAgIHQuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdC5lbmFibGVkID0gdHJ1ZSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEZhbGxiYWNrIGZvciBicm93c2VycyB0aGF0IGRvbid0IHN1cHBvcnQgcmVwbGFjZVRyYWNrLiBBdCB0aGlzIHRpbWUgb2YgdGhpcyB3cml0aW5nXHJcbiAgICAgICAgICAgIC8vIG1vc3QgYnJvd3NlcnMgc3VwcG9ydCBpdCwgYW5kIHRlc3RpbmcgdGhpcyBjb2RlIHBhdGggc2VlbXMgdG8gbm90IHdvcmsgcHJvcGVybHlcclxuICAgICAgICAgICAgLy8gaW4gQ2hyb21lIGFueW1vcmUuXHJcbiAgICAgICAgICAgIHN0cmVhbS5yZW1vdmVUcmFjayhzZW5kZXIudHJhY2spO1xyXG4gICAgICAgICAgICBzdHJlYW0uYWRkVHJhY2sodCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBuZXdTZW5kZXJzLnB1c2goc2VuZGVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmV3U2VuZGVycy5wdXNoKHRoaXMucHVibGlzaGVyLmNvbm4uYWRkVHJhY2sodCwgc3RyZWFtKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGV4aXN0aW5nU2VuZGVycy5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICAgIGlmICghbmV3U2VuZGVycy5pbmNsdWRlcyhzKSkge1xyXG4gICAgICAgICAgcy50cmFjay5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMubG9jYWxNZWRpYVN0cmVhbSA9IHN0cmVhbTtcclxuICAgIHRoaXMuc2V0TWVkaWFTdHJlYW0odGhpcy5jbGllbnRJZCwgc3RyZWFtKTtcclxuICB9XHJcblxyXG4gIGVuYWJsZU1pY3JvcGhvbmUoZW5hYmxlZCkge1xyXG4gICAgaWYgKHRoaXMucHVibGlzaGVyICYmIHRoaXMucHVibGlzaGVyLmNvbm4pIHtcclxuICAgICAgdGhpcy5wdWJsaXNoZXIuY29ubi5nZXRTZW5kZXJzKCkuZm9yRWFjaChzID0+IHtcclxuICAgICAgICBpZiAocy50cmFjay5raW5kID09IFwiYXVkaW9cIikge1xyXG4gICAgICAgICAgcy50cmFjay5lbmFibGVkID0gZW5hYmxlZDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VuZERhdGEoY2xpZW50SWQsIGRhdGFUeXBlLCBkYXRhKSB7XHJcbiAgICBpZiAoIXRoaXMucHVibGlzaGVyKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihcInNlbmREYXRhIGNhbGxlZCB3aXRob3V0IGEgcHVibGlzaGVyXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dpdGNoICh0aGlzLnVucmVsaWFibGVUcmFuc3BvcnQpIHtcclxuICAgICAgICBjYXNlIFwid2Vic29ja2V0XCI6XHJcbiAgICAgICAgICB0aGlzLnB1Ymxpc2hlci5oYW5kbGUuc2VuZE1lc3NhZ2UoeyBraW5kOiBcImRhdGFcIiwgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBkYXRhVHlwZSwgZGF0YSB9KSwgd2hvbTogY2xpZW50SWQgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZGF0YWNoYW5uZWxcIjpcclxuICAgICAgICAgIHRoaXMucHVibGlzaGVyLnVucmVsaWFibGVDaGFubmVsLnNlbmQoSlNPTi5zdHJpbmdpZnkoeyBjbGllbnRJZCwgZGF0YVR5cGUsIGRhdGEgfSkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHRoaXMudW5yZWxpYWJsZVRyYW5zcG9ydChjbGllbnRJZCwgZGF0YVR5cGUsIGRhdGEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlbmREYXRhR3VhcmFudGVlZChjbGllbnRJZCwgZGF0YVR5cGUsIGRhdGEpIHtcclxuICAgIGlmICghdGhpcy5wdWJsaXNoZXIpIHtcclxuICAgICAgY29uc29sZS53YXJuKFwic2VuZERhdGFHdWFyYW50ZWVkIGNhbGxlZCB3aXRob3V0IGEgcHVibGlzaGVyXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dpdGNoICh0aGlzLnJlbGlhYmxlVHJhbnNwb3J0KSB7XHJcbiAgICAgICAgY2FzZSBcIndlYnNvY2tldFwiOlxyXG4gICAgICAgICAgdGhpcy5wdWJsaXNoZXIuaGFuZGxlLnNlbmRNZXNzYWdlKHsga2luZDogXCJkYXRhXCIsIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZGF0YVR5cGUsIGRhdGEgfSksIHdob206IGNsaWVudElkIH0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImRhdGFjaGFubmVsXCI6XHJcbiAgICAgICAgICB0aGlzLnB1Ymxpc2hlci5yZWxpYWJsZUNoYW5uZWwuc2VuZChKU09OLnN0cmluZ2lmeSh7IGNsaWVudElkLCBkYXRhVHlwZSwgZGF0YSB9KSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgdGhpcy5yZWxpYWJsZVRyYW5zcG9ydChjbGllbnRJZCwgZGF0YVR5cGUsIGRhdGEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJyb2FkY2FzdERhdGEoZGF0YVR5cGUsIGRhdGEpIHtcclxuICAgIGlmICghdGhpcy5wdWJsaXNoZXIpIHtcclxuICAgICAgY29uc29sZS53YXJuKFwiYnJvYWRjYXN0RGF0YSBjYWxsZWQgd2l0aG91dCBhIHB1Ymxpc2hlclwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3aXRjaCAodGhpcy51bnJlbGlhYmxlVHJhbnNwb3J0KSB7XHJcbiAgICAgICAgY2FzZSBcIndlYnNvY2tldFwiOlxyXG4gICAgICAgICAgdGhpcy5wdWJsaXNoZXIuaGFuZGxlLnNlbmRNZXNzYWdlKHsga2luZDogXCJkYXRhXCIsIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZGF0YVR5cGUsIGRhdGEgfSkgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZGF0YWNoYW5uZWxcIjpcclxuICAgICAgICAgIHRoaXMucHVibGlzaGVyLnVucmVsaWFibGVDaGFubmVsLnNlbmQoSlNPTi5zdHJpbmdpZnkoeyBkYXRhVHlwZSwgZGF0YSB9KSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgdGhpcy51bnJlbGlhYmxlVHJhbnNwb3J0KHVuZGVmaW5lZCwgZGF0YVR5cGUsIGRhdGEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJyb2FkY2FzdERhdGFHdWFyYW50ZWVkKGRhdGFUeXBlLCBkYXRhKSB7XHJcbiAgICBpZiAoIXRoaXMucHVibGlzaGVyKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihcImJyb2FkY2FzdERhdGFHdWFyYW50ZWVkIGNhbGxlZCB3aXRob3V0IGEgcHVibGlzaGVyXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dpdGNoICh0aGlzLnJlbGlhYmxlVHJhbnNwb3J0KSB7XHJcbiAgICAgICAgY2FzZSBcIndlYnNvY2tldFwiOlxyXG4gICAgICAgICAgdGhpcy5wdWJsaXNoZXIuaGFuZGxlLnNlbmRNZXNzYWdlKHsga2luZDogXCJkYXRhXCIsIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZGF0YVR5cGUsIGRhdGEgfSkgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZGF0YWNoYW5uZWxcIjpcclxuICAgICAgICAgIHRoaXMucHVibGlzaGVyLnJlbGlhYmxlQ2hhbm5lbC5zZW5kKEpTT04uc3RyaW5naWZ5KHsgZGF0YVR5cGUsIGRhdGEgfSkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHRoaXMucmVsaWFibGVUcmFuc3BvcnQodW5kZWZpbmVkLCBkYXRhVHlwZSwgZGF0YSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAga2ljayhjbGllbnRJZCwgcGVybXNUb2tlbikge1xyXG4gICAgcmV0dXJuIHRoaXMucHVibGlzaGVyLmhhbmRsZS5zZW5kTWVzc2FnZSh7IGtpbmQ6IFwia2lja1wiLCByb29tX2lkOiB0aGlzLnJvb20sIHVzZXJfaWQ6IGNsaWVudElkLCB0b2tlbjogcGVybXNUb2tlbiB9KS50aGVuKCgpID0+IHtcclxuICAgICAgZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcImtpY2tlZFwiLCB7IGRldGFpbDogeyBjbGllbnRJZDogY2xpZW50SWQgfSB9KSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGJsb2NrKGNsaWVudElkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wdWJsaXNoZXIuaGFuZGxlLnNlbmRNZXNzYWdlKHsga2luZDogXCJibG9ja1wiLCB3aG9tOiBjbGllbnRJZCB9KS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5ibG9ja2VkQ2xpZW50cy5zZXQoY2xpZW50SWQsIHRydWUpO1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiYmxvY2tlZFwiLCB7IGRldGFpbDogeyBjbGllbnRJZDogY2xpZW50SWQgfSB9KSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVuYmxvY2soY2xpZW50SWQpIHtcclxuICAgIHJldHVybiB0aGlzLnB1Ymxpc2hlci5oYW5kbGUuc2VuZE1lc3NhZ2UoeyBraW5kOiBcInVuYmxvY2tcIiwgd2hvbTogY2xpZW50SWQgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMuYmxvY2tlZENsaWVudHMuZGVsZXRlKGNsaWVudElkKTtcclxuICAgICAgZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcInVuYmxvY2tlZFwiLCB7IGRldGFpbDogeyBjbGllbnRJZDogY2xpZW50SWQgfSB9KSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbk5BRi5hZGFwdGVycy5yZWdpc3RlcihcImphbnVzXCIsIEphbnVzQWRhcHRlcik7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEphbnVzQWRhcHRlcjtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==