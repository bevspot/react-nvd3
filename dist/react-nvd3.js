(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("d3"), require("nvd3"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "d3", "nvd3"], factory);
	else if(typeof exports === 'object')
		exports["NVD3Chart"] = factory(require("react"), require("d3"), require("nvd3"));
	else
		root["NVD3Chart"] = factory(root["React"], root["d3"], root["nv"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_58__, __WEBPACK_EXTERNAL_MODULE_59__, __WEBPACK_EXTERNAL_MODULE_61__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _keys = __webpack_require__(17);

	var _keys2 = _interopRequireDefault(_keys);

	var _typeof2 = __webpack_require__(21);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _getPrototypeOf = __webpack_require__(43);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(46);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(47);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(50);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(51);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(58);

	var _react2 = _interopRequireDefault(_react);

	var _d = __webpack_require__(59);

	var _d2 = _interopRequireDefault(_d);

	var _bevspotReactNvd = __webpack_require__(60);

	var _bevspotReactNvd2 = _interopRequireDefault(_bevspotReactNvd);

	var _utils = __webpack_require__(62);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SETTINGS = ['x', 'y', 'type', 'datum', 'configure', 'tooltip', 'legend'];
	var AXIS_NAMES = ['xAxis', 'yAxis', 'y1Axis', 'y2Axis', 'y3Axis', 'y4Axis', 'x2Axis', 'yAxis1'];
	var SIZE = ['width', 'height'];
	var MARGIN = 'margin';
	var LEGEND = 'legend';
	var TOOLTIP = 'tooltip';

	var NVD3Chart = function (_React$Component) {
	  (0, _inherits3.default)(NVD3Chart, _React$Component);

	  function NVD3Chart() {
	    (0, _classCallCheck3.default)(this, NVD3Chart);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NVD3Chart).apply(this, arguments));
	  }

	  (0, _createClass3.default)(NVD3Chart, [{
	    key: 'componentDidMount',


	    /**
	     * Instantiate a new chart setting
	     * a callback if exists
	     */
	    value: function componentDidMount() {
	      _bevspotReactNvd2.default.addGraph(this.renderChart.bind(this), this.props.renderEnd);
	    }

	    /**
	     * Update the chart after state is changed.
	     */

	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.renderChart();
	    }

	    /**
	     * Remove listeners
	     */

	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.resizeHandler.clear();
	    }

	    /**
	     * Creates a chart model and render it
	     */

	  }, {
	    key: 'renderChart',
	    value: function renderChart() {
	      // Margins are an special case. It needs to be
	      // passed to the margin function.
	      this.chart = this.chart || _bevspotReactNvd2.default.models[this.props.type]();

	      this.chart.x(this.getValueFunction(this.props.x, 'x')).y(this.getValueFunction(this.props.y, 'y')).margin(this.options(MARGIN, _utils.pick).margin || this.propsByPrefix('margin') || {}).options(this.options(SETTINGS.concat(AXIS_NAMES, SIZE, MARGIN), _utils.without));

	      // We need to set the axis, legend and tooltip components separatly
	      this.configureComponents(this.chart, this.options(AXIS_NAMES.concat(TOOLTIP, LEGEND)));

	      // hook for configuring the chart
	      !this.props.configure || this.props.configure(this.chart);

	      // Render chart using d3
	      _d2.default.select(this.refs.svg).datum(this.props.datum).call(this.chart);

	      // Update the chart if the window size change.
	      // Save resizeHandle to remove the resize listener later.
	      if (!this.resizeHandler) this.resizeHandler = _bevspotReactNvd2.default.utils.windowResize(this.chart.update);

	      return this.chart;
	    }

	    /**
	     * Configure components recursively
	     * @param {nvd3 chart} chart  A nvd3 chart instance
	     * @param {object} options    A key value object
	     */

	  }, {
	    key: 'configureComponents',
	    value: function configureComponents(chart, options) {
	      for (var optionName in options) {
	        var optionValue = options[optionName];
	        if (chart) {
	          if ((typeof optionValue === 'undefined' ? 'undefined' : (0, _typeof3.default)(optionValue)) === 'object' && !(optionValue instanceof Array)) {
	            this.configureComponents(chart[optionName], optionValue);
	          } else if (typeof chart[optionName] === 'function') {
	            chart[optionName](optionValue);
	          }
	        }
	      }
	    }

	    /**
	     * Filter options base on predicates
	     * @param {Array} keys          An array of keys to preserve or remove
	     * @param {Function} predicate  The function used to filter keys
	     */

	  }, {
	    key: 'options',
	    value: function options(keys, predicate) {
	      if (this.props.chartOptions) console.warn('chartOptions is deprecated use options instead');
	      // DEPRECATED: this.props.chartOptions
	      var opt = this.props.options || this.props.chartOptions || this.props;
	      predicate = predicate || _utils.pick;
	      return predicate(opt, keys);
	    }

	    /**
	     * Allow to use either a value or a function to
	     * @param  {[type]} v        Either a getter or a function name
	     * @param  {String} _default A default string used as getter
	     * @return {Function}        Returns a function to use as getter
	     */

	  }, {
	    key: 'getValueFunction',
	    value: function getValueFunction(v, _default) {
	      if (typeof v === 'function') return v;
	      return function (d) {
	        return typeof d[v] !== 'undefined' ? d[v] : d[_default];
	      };
	    }

	    /**
	     * Get properties using a prefix
	     * @param  {String} prefix
	     * @return {[type]} Return an object with wanted keys
	     * DEPRECATED: This was created only for margins and
	     * since we changed the api we don't need this anymore.
	     */

	  }, {
	    key: 'propsByPrefix',
	    value: function propsByPrefix(prefix) {
	      var _this2 = this;

	      console.warn('Set margin with prefixes is deprecated use an object instead');
	      prefix = prefix + '-';
	      return (0, _keys2.default)(this.props).reduce(function (memo, prop) {
	        if (prop.startsWith(prefix)) memo[prop.replace(prefix, '')] = _this2.props[prop];
	        return memo;
	      }, {});
	    }

	    /**
	     * Render function
	     * svg element needs to have height and width.
	     */

	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { ref: 'root', className: 'nv-chart' },
	        _react2.default.createElement('svg', (0, _extends3.default)({ ref: 'svg' }, (0, _utils.pick)(this.props, SIZE)))
	      );
	    }
	  }]);
	  return NVD3Chart;
	}(_react2.default.Component);

	// Babel 6 issue: http://stackoverflow.com/questions/33505992/babel-6-changes-how-it-exports-default


	exports.default = NVD3Chart;
	module.exports = NVD3Chart;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(2)["default"];

	exports["default"] = _Object$assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(7).Object.assign;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(5);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(10)});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , core      = __webpack_require__(7)
	  , ctx       = __webpack_require__(8)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(9);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(11)
	  , toObject = __webpack_require__(12)
	  , IObject  = __webpack_require__(14);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(16)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 11 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(13);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(15);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(18), __esModule: true };

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(19);
	module.exports = __webpack_require__(7).Object.keys;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(12);

	__webpack_require__(20)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(5)
	  , core    = __webpack_require__(7)
	  , fails   = __webpack_require__(16);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Symbol = __webpack_require__(22)["default"];

	exports["default"] = function (obj) {
	  return obj && obj.constructor === _Symbol ? "symbol" : typeof obj;
	};

	exports.__esModule = true;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(23), __esModule: true };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(24);
	__webpack_require__(42);
	module.exports = __webpack_require__(7).Symbol;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(11)
	  , global         = __webpack_require__(6)
	  , has            = __webpack_require__(25)
	  , DESCRIPTORS    = __webpack_require__(26)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(27)
	  , $fails         = __webpack_require__(16)
	  , shared         = __webpack_require__(30)
	  , setToStringTag = __webpack_require__(31)
	  , uid            = __webpack_require__(33)
	  , wks            = __webpack_require__(32)
	  , keyOf          = __webpack_require__(34)
	  , $names         = __webpack_require__(36)
	  , enumKeys       = __webpack_require__(37)
	  , isArray        = __webpack_require__(38)
	  , anObject       = __webpack_require__(39)
	  , toIObject      = __webpack_require__(35)
	  , createDesc     = __webpack_require__(29)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(41)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$export($export.G + $export.W, {Symbol: $Symbol});

	$export($export.S, 'Symbol', symbolStatics);

	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 25 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(16)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28);

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(11)
	  , createDesc = __webpack_require__(29);
	module.exports = __webpack_require__(26) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(11).setDesc
	  , has = __webpack_require__(25)
	  , TAG = __webpack_require__(32)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(30)('wks')
	  , uid    = __webpack_require__(33)
	  , Symbol = __webpack_require__(6).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(11)
	  , toIObject = __webpack_require__(35);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(14)
	  , defined = __webpack_require__(13);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(35)
	  , getNames  = __webpack_require__(11).getNames
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(11);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(15);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(40);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 42 */
/***/ function(module, exports) {

	

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(44), __esModule: true };

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(45);
	module.exports = __webpack_require__(7).Object.getPrototypeOf;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(12);

	__webpack_require__(20)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(48);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(49), __esModule: true };

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(11);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(21);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(52)["default"];

	var _Object$setPrototypeOf = __webpack_require__(54)["default"];

	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	exports.__esModule = true;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(53), __esModule: true };

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(11);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(55), __esModule: true };

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	module.exports = __webpack_require__(7).Object.setPrototypeOf;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(5);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(57).set});

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(11).getDesc
	  , isObject = __webpack_require__(40)
	  , anObject = __webpack_require__(39);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(8)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_58__;

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_59__;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	!function(t,e){ true?module.exports=e(__webpack_require__(58),__webpack_require__(59),__webpack_require__(61)):"function"==typeof define&&define.amd?define(["react","d3","nvd3"],e):"object"==typeof exports?exports.NVD3Chart=e(require("react"),require("d3"),require("nvd3")):t.NVD3Chart=e(t.React,t.d3,t.nv)}(this,function(t,e,n){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),u=r(o),i=n(17),c=r(i),s=n(21),f=r(s),a=n(43),p=r(a),l=n(46),d=r(l),y=n(47),h=r(y),v=n(50),g=r(v),b=n(51),m=r(b),x=n(58),_=r(x),O=n(59),w=r(O),j=n(60),S=r(j),P=n(61),M=["x","y","type","datum","configure","tooltip","legend"],k=["xAxis","yAxis","y1Axis","y2Axis","y3Axis","y4Axis","x2Axis","yAxis1"],E=["width","height"],D="margin",N="legend",A="tooltip",F=function(t){function e(){return(0,d["default"])(this,e),(0,g["default"])(this,(0,p["default"])(e).apply(this,arguments))}return(0,m["default"])(e,t),(0,h["default"])(e,[{key:"componentDidMount",value:function(){S["default"].addGraph(this.renderChart.bind(this),this.props.renderEnd)}},{key:"componentDidUpdate",value:function(){this.renderChart()}},{key:"componentWillUnmount",value:function(){this.resizeHandler.clear()}},{key:"renderChart",value:function(){return this.chart=this.chart||S["default"].models[this.props.type](),this.chart.x(this.getValueFunction(this.props.x,"x")).y(this.getValueFunction(this.props.y,"y")).margin(this.options(D,P.pick).margin||this.propsByPrefix("margin")||{}).options(this.options(M.concat(k,E,D),P.without)),this.configureComponents(this.chart,this.options(k.concat(A,N))),!this.props.configure||this.props.configure(this.chart),w["default"].select(this.refs.svg).datum(this.props.datum).call(this.chart),this.resizeHandler||(this.resizeHandler=S["default"].utils.windowResize(this.chart.update)),this.chart}},{key:"configureComponents",value:function(t,e){for(var n in e){var r=e[n];t&&("object"!==("undefined"==typeof r?"undefined":(0,f["default"])(r))||r instanceof Array?"function"==typeof t[n]&&t[n](r):this.configureComponents(t[n],r))}}},{key:"options",value:function(t,e){this.props.chartOptions&&console.warn("chartOptions is deprecated use options instead");var n=this.props.options||this.props.chartOptions||this.props;return(e=e||P.pick)(n,t)}},{key:"getValueFunction",value:function(t,e){return"function"==typeof t?t:function(n){return"undefined"!=typeof n[t]?n[t]:n[e]}}},{key:"propsByPrefix",value:function(t){var e=this;return console.warn("Set margin with prefixes is deprecated use an object instead"),t+="-",(0,c["default"])(this.props).reduce(function(n,r){return r.startsWith(t)&&(n[r.replace(t,"")]=e.props[r]),n},{})}},{key:"render",value:function(){return _["default"].createElement("div",{ref:"root",className:"nv-chart"},_["default"].createElement("svg",(0,u["default"])({ref:"svg"},(0,P.pick)(this.props,E))))}}]),e}(_["default"].Component);e["default"]=F,t.exports=F},function(t,e,n){"use strict";var r=n(2)["default"];e["default"]=r||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},e.__esModule=!0},function(t,e,n){t.exports={"default":n(3),__esModule:!0}},function(t,e,n){n(4),t.exports=n(7).Object.assign},function(t,e,n){var r=n(5);r(r.S+r.F,"Object",{assign:n(10)})},function(t,e,n){var r=n(6),o=n(7),u=n(8),i="prototype",c=function(t,e,n){var s,f,a,p=t&c.F,l=t&c.G,d=t&c.S,y=t&c.P,h=t&c.B,v=t&c.W,g=l?o:o[e]||(o[e]={}),b=l?r:d?r[e]:(r[e]||{})[i];l&&(n=e);for(s in n)f=!p&&b&&s in b,f&&s in g||(a=f?b[s]:n[s],g[s]=l&&"function"!=typeof b[s]?n[s]:h&&f?u(a,r):v&&b[s]==a?function(t){var e=function(e){return this instanceof t?new t(e):t(e)};return e[i]=t[i],e}(a):y&&"function"==typeof a?u(Function.call,a):a,y&&((g[i]||(g[i]={}))[s]=a))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,t.exports=c},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={version:"1.2.6"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(9);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(11),o=n(12),u=n(14);t.exports=n(16)(function(){var t=Object.assign,e={},n={},r=Symbol(),o="abcdefghijklmnopqrst";return e[r]=7,o.split("").forEach(function(t){n[t]=t}),7!=t({},e)[r]||Object.keys(t({},n)).join("")!=o})?function(t,e){for(var n=o(t),i=arguments,c=i.length,s=1,f=r.getKeys,a=r.getSymbols,p=r.isEnum;c>s;)for(var l,d=u(i[s++]),y=a?f(d).concat(a(d)):f(d),h=y.length,v=0;h>v;)p.call(d,l=y[v++])&&(n[l]=d[l]);return n}:Object.assign},function(t,e){var n=Object;t.exports={create:n.create,getProto:n.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:n.getOwnPropertyDescriptor,setDesc:n.defineProperty,setDescs:n.defineProperties,getKeys:n.keys,getNames:n.getOwnPropertyNames,getSymbols:n.getOwnPropertySymbols,each:[].forEach}},function(t,e,n){var r=n(13);t.exports=function(t){return Object(r(t))}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(15);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e,n){t.exports={"default":n(18),__esModule:!0}},function(t,e,n){n(19),t.exports=n(7).Object.keys},function(t,e,n){var r=n(12);n(20)("keys",function(t){return function(e){return t(r(e))}})},function(t,e,n){var r=n(5),o=n(7),u=n(16);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],i={};i[t]=e(n),r(r.S+r.F*u(function(){n(1)}),"Object",i)}},function(t,e,n){"use strict";var r=n(22)["default"];e["default"]=function(t){return t&&t.constructor===r?"symbol":typeof t},e.__esModule=!0},function(t,e,n){t.exports={"default":n(23),__esModule:!0}},function(t,e,n){n(24),n(42),t.exports=n(7).Symbol},function(t,e,n){"use strict";var r=n(11),o=n(6),u=n(25),i=n(26),c=n(5),s=n(27),f=n(16),a=n(30),p=n(31),l=n(33),d=n(32),y=n(34),h=n(36),v=n(37),g=n(38),b=n(39),m=n(35),x=n(29),_=r.getDesc,O=r.setDesc,w=r.create,j=h.get,S=o.Symbol,P=o.JSON,M=P&&P.stringify,k=!1,E=d("_hidden"),D=r.isEnum,N=a("symbol-registry"),A=a("symbols"),F="function"==typeof S,C=Object.prototype,T=i&&f(function(){return 7!=w(O({},"a",{get:function(){return O(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=_(C,e);r&&delete C[e],O(t,e,n),r&&t!==C&&O(C,e,r)}:O,q=function(t){var e=A[t]=w(S.prototype);return e._k=t,i&&k&&T(C,t,{configurable:!0,set:function(e){u(this,E)&&u(this[E],t)&&(this[E][t]=!1),T(this,t,x(1,e))}}),e},W=function(t){return"symbol"==typeof t},z=function(t,e,n){return n&&u(A,e)?(n.enumerable?(u(t,E)&&t[E][e]&&(t[E][e]=!1),n=w(n,{enumerable:x(0,!1)})):(u(t,E)||O(t,E,x(1,{})),t[E][e]=!0),T(t,e,n)):O(t,e,n)},V=function(t,e){b(t);for(var n,r=v(e=m(e)),o=0,u=r.length;u>o;)z(t,n=r[o++],e[n]);return t},B=function(t,e){return void 0===e?w(t):V(w(t),e)},G=function(t){var e=D.call(this,t);return e||!u(this,t)||!u(A,t)||u(this,E)&&this[E][t]?e:!0},I=function(t,e){var n=_(t=m(t),e);return!n||!u(A,e)||u(t,E)&&t[E][e]||(n.enumerable=!0),n},J=function(t){for(var e,n=j(m(t)),r=[],o=0;n.length>o;)u(A,e=n[o++])||e==E||r.push(e);return r},K=function(t){for(var e,n=j(m(t)),r=[],o=0;n.length>o;)u(A,e=n[o++])&&r.push(A[e]);return r},H=function(t){if(void 0!==t&&!W(t)){for(var e,n,r=[t],o=1,u=arguments;u.length>o;)r.push(u[o++]);return e=r[1],"function"==typeof e&&(n=e),(n||!g(e))&&(e=function(t,e){return n&&(e=n.call(this,t,e)),W(e)?void 0:e}),r[1]=e,M.apply(P,r)}},R=f(function(){var t=S();return"[null]"!=M([t])||"{}"!=M({a:t})||"{}"!=M(Object(t))});F||(S=function(){if(W(this))throw TypeError("Symbol is not a constructor");return q(l(arguments.length>0?arguments[0]:void 0))},s(S.prototype,"toString",function(){return this._k}),W=function(t){return t instanceof S},r.create=B,r.isEnum=G,r.getDesc=I,r.setDesc=z,r.setDescs=V,r.getNames=h.get=J,r.getSymbols=K,i&&!n(41)&&s(C,"propertyIsEnumerable",G,!0));var U={"for":function(t){return u(N,t+="")?N[t]:N[t]=S(t)},keyFor:function(t){return y(N,t)},useSetter:function(){k=!0},useSimple:function(){k=!1}};r.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),function(t){var e=d(t);U[t]=F?e:q(e)}),k=!0,c(c.G+c.W,{Symbol:S}),c(c.S,"Symbol",U),c(c.S+c.F*!F,"Object",{create:B,defineProperty:z,defineProperties:V,getOwnPropertyDescriptor:I,getOwnPropertyNames:J,getOwnPropertySymbols:K}),P&&c(c.S+c.F*(!F||R),"JSON",{stringify:H}),p(S,"Symbol"),p(Math,"Math",!0),p(o.JSON,"JSON",!0)},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){t.exports=!n(16)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){t.exports=n(28)},function(t,e,n){var r=n(11),o=n(29);t.exports=n(26)?function(t,e,n){return r.setDesc(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var r=n(6),o="__core-js_shared__",u=r[o]||(r[o]={});t.exports=function(t){return u[t]||(u[t]={})}},function(t,e,n){var r=n(11).setDesc,o=n(25),u=n(32)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,u)&&r(t,u,{configurable:!0,value:e})}},function(t,e,n){var r=n(30)("wks"),o=n(33),u=n(6).Symbol;t.exports=function(t){return r[t]||(r[t]=u&&u[t]||(u||o)("Symbol."+t))}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){var r=n(11),o=n(35);t.exports=function(t,e){for(var n,u=o(t),i=r.getKeys(u),c=i.length,s=0;c>s;)if(u[n=i[s++]]===e)return n}},function(t,e,n){var r=n(14),o=n(13);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(35),o=n(11).getNames,u={}.toString,i="object"==typeof window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return o(t)}catch(e){return i.slice()}};t.exports.get=function(t){return i&&"[object Window]"==u.call(t)?c(t):o(r(t))}},function(t,e,n){var r=n(11);t.exports=function(t){var e=r.getKeys(t),n=r.getSymbols;if(n)for(var o,u=n(t),i=r.isEnum,c=0;u.length>c;)i.call(t,o=u[c++])&&e.push(o);return e}},function(t,e,n){var r=n(15);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(40);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports=!0},function(t,e){},function(t,e,n){t.exports={"default":n(44),__esModule:!0}},function(t,e,n){n(45),t.exports=n(7).Object.getPrototypeOf},function(t,e,n){var r=n(12);n(20)("getPrototypeOf",function(t){return function(e){return t(r(e))}})},function(t,e){"use strict";e.__esModule=!0,e["default"]=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var o=n(48),u=r(o);e["default"]=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,u["default"])(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}()},function(t,e,n){t.exports={"default":n(49),__esModule:!0}},function(t,e,n){var r=n(11);t.exports=function(t,e,n){return r.setDesc(t,e,n)}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var o=n(21),u=r(o);e["default"]=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==("undefined"==typeof e?"undefined":(0,u["default"])(e))&&"function"!=typeof e?t:e}},function(t,e,n){"use strict";var r=n(52)["default"],o=n(54)["default"];e["default"]=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=r(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(o?o(t,e):t.__proto__=e)},e.__esModule=!0},function(t,e,n){t.exports={"default":n(53),__esModule:!0}},function(t,e,n){var r=n(11);t.exports=function(t,e){return r.create(t,e)}},function(t,e,n){t.exports={"default":n(55),__esModule:!0}},function(t,e,n){n(56),t.exports=n(7).Object.setPrototypeOf},function(t,e,n){var r=n(5);r(r.S,"Object",{setPrototypeOf:n(57).set})},function(t,e,n){var r=n(11).getDesc,o=n(40),u=n(39),i=function(t,e){if(u(t),!o(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,o){try{o=n(8)(Function.call,r(Object.prototype,"__proto__").set,2),o(t,[]),e=!(t instanceof Array)}catch(u){e=!0}return function(t,n){return i(t,n),e?t.__proto__=n:o(t,n),t}}({},!1):void 0),check:i}},function(e,n){e.exports=t},function(t,n){t.exports=e},function(t,e){t.exports=n},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){return t.indexOf(e)>=0}function u(t){return function(){return!t.apply(this,arguments)}}function i(t,e,n){for(var r={},o=(0,a["default"])(t),u=0,i=o.length;i>u;u++){var c=o[u],s=t[c];n(e,c)&&(r[c]=s)}return r}function c(t,e){return i(t,e,o)}function s(t,e){return i(t,e,u(o))}Object.defineProperty(e,"__esModule",{value:!0});var f=n(17),a=r(f);e.includes=o,e.negate=u,e.filterObject=i,e.pick=c,e.without=s}])});

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_61__;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(17);

	var _keys2 = _interopRequireDefault(_keys);

	exports.includes = includes;
	exports.negate = negate;
	exports.filterObject = filterObject;
	exports.pick = pick;
	exports.without = without;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function includes(array, item) {
	  return array.indexOf(item) >= 0;
	}

	function negate(f) {
	  return function () {
	    return !f.apply(this, arguments);
	  };
	}

	function filterObject(obj, keys, predicate) {
	  var result = {};
	  var ks = (0, _keys2.default)(obj);

	  for (var i = 0, l = ks.length; i < l; i++) {
	    var key = ks[i];
	    var value = obj[key];
	    if (predicate(keys, key)) result[key] = value;
	  };
	  return result;
	}

	function pick(obj, keys) {
	  return filterObject(obj, keys, includes);
	}

	function without(obj, keys) {
	  return filterObject(obj, keys, negate(includes));
	}

/***/ }
/******/ ])
});
;