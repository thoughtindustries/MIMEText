'use strict';

var os = require('os');
var mime = require('mime-types');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var mime__namespace = /*#__PURE__*/_interopNamespaceDefault(mime);

class MIMETextError extends Error {
    name = '';
    description = '';
    constructor(message, description = '') {
        super(description);
        this.name = message;
        this.description = description;
    }
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var callBind$1 = {exports: {}};

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice$1 = Array.prototype.slice;
var toStr$2 = Object.prototype.toString;
var funcType = '[object Function]';

var implementation$4 = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr$2.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice$1.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice$1.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice$1.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

var implementation$3 = implementation$4;

var functionBind = Function.prototype.bind || implementation$3;

/* eslint complexity: [2, 18], max-statements: [2, 33] */
var shams$1 = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = shams$1;

var hasSymbols$2 = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

var test = {
	foo: {}
};

var $Object$1 = Object;

var hasProto$1 = function hasProto() {
	return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object$1);
};

var bind$1 = functionBind;

var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);

var undefined$1;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError$1 = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError$1();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols$1 = hasSymbols$2();
var hasProto = hasProto$1();

var getProto = Object.getPrototypeOf || (
	hasProto
		? function (x) { return x.__proto__; } // eslint-disable-line no-proto
		: null
);

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined$1 : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols$1 && getProto ? getProto([][Symbol.iterator]()) : undefined$1,
	'%AsyncFromSyncIteratorPrototype%': undefined$1,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined$1 : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined$1 : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols$1 && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
	'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$1 || !getProto ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$1 || !getProto ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols$1 && getProto ? getProto(''[Symbol.iterator]()) : undefined$1,
	'%Symbol%': hasSymbols$1 ? Symbol : undefined$1,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError$1,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = functionBind;
var hasOwn$1 = src;
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn$1(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn$1(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError$1('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

var getIntrinsic = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError$1('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError$1('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn$1(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError$1('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined$1;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn$1(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

(function (module) {

	var bind = functionBind;
	var GetIntrinsic = getIntrinsic;

	var $apply = GetIntrinsic('%Function.prototype.apply%');
	var $call = GetIntrinsic('%Function.prototype.call%');
	var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

	var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
	var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
	var $max = GetIntrinsic('%Math.max%');

	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
		} catch (e) {
			// IE 8 has a broken defineProperty
			$defineProperty = null;
		}
	}

	module.exports = function callBind(originalFunction) {
		var func = $reflectApply(bind, $call, arguments);
		if ($gOPD && $defineProperty) {
			var desc = $gOPD(func, 'length');
			if (desc.configurable) {
				// original length, plus the receiver, minus any additional arguments (after the receiver)
				$defineProperty(
					func,
					'length',
					{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
				);
			}
		}
		return func;
	};

	var applyBind = function applyBind() {
		return $reflectApply(bind, $apply, arguments);
	};

	if ($defineProperty) {
		$defineProperty(module.exports, 'apply', { value: applyBind });
	} else {
		module.exports.apply = applyBind;
	} 
} (callBind$1));

var callBindExports = callBind$1.exports;
var callBind = /*@__PURE__*/getDefaultExportFromCjs(callBindExports);

var CheckObjectCoercible;
var hasRequiredCheckObjectCoercible;

function requireCheckObjectCoercible () {
	if (hasRequiredCheckObjectCoercible) return CheckObjectCoercible;
	hasRequiredCheckObjectCoercible = 1;

	var GetIntrinsic = getIntrinsic;

	var $TypeError = GetIntrinsic('%TypeError%');

	// http://262.ecma-international.org/5.1/#sec-9.10

	CheckObjectCoercible = function CheckObjectCoercible(value, optMessage) {
		if (value == null) {
			throw new $TypeError(optMessage || ('Cannot call method on ' + value));
		}
		return value;
	};
	return CheckObjectCoercible;
}

var RequireObjectCoercible$1;
var hasRequiredRequireObjectCoercible;

function requireRequireObjectCoercible () {
	if (hasRequiredRequireObjectCoercible) return RequireObjectCoercible$1;
	hasRequiredRequireObjectCoercible = 1;

	RequireObjectCoercible$1 = requireCheckObjectCoercible();
	return RequireObjectCoercible$1;
}

var GetIntrinsic$3 = getIntrinsic;

var $Object = GetIntrinsic$3('%Object%');

var RequireObjectCoercible = requireRequireObjectCoercible();

// https://262.ecma-international.org/6.0/#sec-toobject

var ToObject$1 = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

var isPrimitive;
var hasRequiredIsPrimitive;

function requireIsPrimitive () {
	if (hasRequiredIsPrimitive) return isPrimitive;
	hasRequiredIsPrimitive = 1;

	isPrimitive = function isPrimitive(value) {
		return value === null || (typeof value !== 'function' && typeof value !== 'object');
	};
	return isPrimitive;
}

var isCallable;
var hasRequiredIsCallable;

function requireIsCallable () {
	if (hasRequiredIsCallable) return isCallable;
	hasRequiredIsCallable = 1;

	var fnToStr = Function.prototype.toString;
	var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
	var badArrayLike;
	var isCallableMarker;
	if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
		try {
			badArrayLike = Object.defineProperty({}, 'length', {
				get: function () {
					throw isCallableMarker;
				}
			});
			isCallableMarker = {};
			// eslint-disable-next-line no-throw-literal
			reflectApply(function () { throw 42; }, null, badArrayLike);
		} catch (_) {
			if (_ !== isCallableMarker) {
				reflectApply = null;
			}
		}
	} else {
		reflectApply = null;
	}

	var constructorRegex = /^\s*class\b/;
	var isES6ClassFn = function isES6ClassFunction(value) {
		try {
			var fnStr = fnToStr.call(value);
			return constructorRegex.test(fnStr);
		} catch (e) {
			return false; // not a function
		}
	};

	var tryFunctionObject = function tryFunctionToStr(value) {
		try {
			if (isES6ClassFn(value)) { return false; }
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var objectClass = '[object Object]';
	var fnClass = '[object Function]';
	var genClass = '[object GeneratorFunction]';
	var ddaClass = '[object HTMLAllCollection]'; // IE 11
	var ddaClass2 = '[object HTML document.all class]';
	var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
	var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

	var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

	var isDDA = function isDocumentDotAll() { return false; };
	if (typeof document === 'object') {
		// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
		var all = document.all;
		if (toStr.call(all) === toStr.call(document.all)) {
			isDDA = function isDocumentDotAll(value) {
				/* globals document: false */
				// in IE 6-8, typeof document.all is "object" and it's truthy
				if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
					try {
						var str = toStr.call(value);
						return (
							str === ddaClass
							|| str === ddaClass2
							|| str === ddaClass3 // opera 12.16
							|| str === objectClass // IE 6-8
						) && value('') == null; // eslint-disable-line eqeqeq
					} catch (e) { /**/ }
				}
				return false;
			};
		}
	}

	isCallable = reflectApply
		? function isCallable(value) {
			if (isDDA(value)) { return true; }
			if (!value) { return false; }
			if (typeof value !== 'function' && typeof value !== 'object') { return false; }
			try {
				reflectApply(value, null, badArrayLike);
			} catch (e) {
				if (e !== isCallableMarker) { return false; }
			}
			return !isES6ClassFn(value) && tryFunctionObject(value);
		}
		: function isCallable(value) {
			if (isDDA(value)) { return true; }
			if (!value) { return false; }
			if (typeof value !== 'function' && typeof value !== 'object') { return false; }
			if (hasToStringTag) { return tryFunctionObject(value); }
			if (isES6ClassFn(value)) { return false; }
			var strClass = toStr.call(value);
			if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
			return tryFunctionObject(value);
		};
	return isCallable;
}

var shams;
var hasRequiredShams;

function requireShams () {
	if (hasRequiredShams) return shams;
	hasRequiredShams = 1;

	var hasSymbols = shams$1;

	shams = function hasToStringTagShams() {
		return hasSymbols() && !!Symbol.toStringTag;
	};
	return shams;
}

var isDateObject;
var hasRequiredIsDateObject;

function requireIsDateObject () {
	if (hasRequiredIsDateObject) return isDateObject;
	hasRequiredIsDateObject = 1;

	var getDay = Date.prototype.getDay;
	var tryDateObject = function tryDateGetDayCall(value) {
		try {
			getDay.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};

	var toStr = Object.prototype.toString;
	var dateClass = '[object Date]';
	var hasToStringTag = requireShams()();

	isDateObject = function isDateObject(value) {
		if (typeof value !== 'object' || value === null) {
			return false;
		}
		return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
	};
	return isDateObject;
}

var isSymbol = {exports: {}};

var hasRequiredIsSymbol;

function requireIsSymbol () {
	if (hasRequiredIsSymbol) return isSymbol.exports;
	hasRequiredIsSymbol = 1;

	var toStr = Object.prototype.toString;
	var hasSymbols = hasSymbols$2();

	if (hasSymbols) {
		var symToStr = Symbol.prototype.toString;
		var symStringRegex = /^Symbol\(.*\)$/;
		var isSymbolObject = function isRealSymbolObject(value) {
			if (typeof value.valueOf() !== 'symbol') {
				return false;
			}
			return symStringRegex.test(symToStr.call(value));
		};

		isSymbol.exports = function isSymbol(value) {
			if (typeof value === 'symbol') {
				return true;
			}
			if (toStr.call(value) !== '[object Symbol]') {
				return false;
			}
			try {
				return isSymbolObject(value);
			} catch (e) {
				return false;
			}
		};
	} else {

		isSymbol.exports = function isSymbol(value) {
			// this environment does not support Symbols.
			return false ;
		};
	}
	return isSymbol.exports;
}

var es2015;
var hasRequiredEs2015;

function requireEs2015 () {
	if (hasRequiredEs2015) return es2015;
	hasRequiredEs2015 = 1;

	var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

	var isPrimitive = requireIsPrimitive();
	var isCallable = requireIsCallable();
	var isDate = requireIsDateObject();
	var isSymbol = requireIsSymbol();

	var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
		if (typeof O === 'undefined' || O === null) {
			throw new TypeError('Cannot call method on ' + O);
		}
		if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
			throw new TypeError('hint must be "string" or "number"');
		}
		var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
		var method, result, i;
		for (i = 0; i < methodNames.length; ++i) {
			method = O[methodNames[i]];
			if (isCallable(method)) {
				result = method.call(O);
				if (isPrimitive(result)) {
					return result;
				}
			}
		}
		throw new TypeError('No default value');
	};

	var GetMethod = function GetMethod(O, P) {
		var func = O[P];
		if (func !== null && typeof func !== 'undefined') {
			if (!isCallable(func)) {
				throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
			}
			return func;
		}
		return void 0;
	};

	// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
	es2015 = function ToPrimitive(input) {
		if (isPrimitive(input)) {
			return input;
		}
		var hint = 'default';
		if (arguments.length > 1) {
			if (arguments[1] === String) {
				hint = 'string';
			} else if (arguments[1] === Number) {
				hint = 'number';
			}
		}

		var exoticToPrim;
		if (hasSymbols) {
			if (Symbol.toPrimitive) {
				exoticToPrim = GetMethod(input, Symbol.toPrimitive);
			} else if (isSymbol(input)) {
				exoticToPrim = Symbol.prototype.valueOf;
			}
		}
		if (typeof exoticToPrim !== 'undefined') {
			var result = exoticToPrim.call(input, hint);
			if (isPrimitive(result)) {
				return result;
			}
			throw new TypeError('unable to convert exotic object to primitive');
		}
		if (hint === 'default' && (isDate(input) || isSymbol(input))) {
			hint = 'string';
		}
		return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
	};
	return es2015;
}

var ToPrimitive$1;
var hasRequiredToPrimitive;

function requireToPrimitive () {
	if (hasRequiredToPrimitive) return ToPrimitive$1;
	hasRequiredToPrimitive = 1;

	var toPrimitive = requireEs2015();

	// https://262.ecma-international.org/6.0/#sec-toprimitive

	ToPrimitive$1 = function ToPrimitive(input) {
		if (arguments.length > 1) {
			return toPrimitive(input, arguments[1]);
		}
		return toPrimitive(input);
	};
	return ToPrimitive$1;
}

var ToString$1;
var hasRequiredToString;

function requireToString () {
	if (hasRequiredToString) return ToString$1;
	hasRequiredToString = 1;

	var GetIntrinsic = getIntrinsic;

	var $String = GetIntrinsic('%String%');
	var $TypeError = GetIntrinsic('%TypeError%');

	// https://262.ecma-international.org/6.0/#sec-tostring

	ToString$1 = function ToString(argument) {
		if (typeof argument === 'symbol') {
			throw new $TypeError('Cannot convert a Symbol value to a string');
		}
		return $String(argument);
	};
	return ToString$1;
}

var GetIntrinsic$2 = getIntrinsic;

var $String = GetIntrinsic$2('%String%');

var ToPrimitive = requireToPrimitive();
var ToString = requireToString();

// https://262.ecma-international.org/6.0/#sec-topropertykey

var ToPropertyKey$1 = function ToPropertyKey(argument) {
	var key = ToPrimitive(argument, $String);
	return typeof key === 'symbol' ? key : ToString(key);
};

var IsPropertyKey$1;
var hasRequiredIsPropertyKey;

function requireIsPropertyKey () {
	if (hasRequiredIsPropertyKey) return IsPropertyKey$1;
	hasRequiredIsPropertyKey = 1;

	// https://262.ecma-international.org/6.0/#sec-ispropertykey

	IsPropertyKey$1 = function IsPropertyKey(argument) {
		return typeof argument === 'string' || typeof argument === 'symbol';
	};
	return IsPropertyKey$1;
}

var Type$2;
var hasRequiredType$1;

function requireType$1 () {
	if (hasRequiredType$1) return Type$2;
	hasRequiredType$1 = 1;

	// https://262.ecma-international.org/5.1/#sec-8

	Type$2 = function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	};
	return Type$2;
}

var Type$1;
var hasRequiredType;

function requireType () {
	if (hasRequiredType) return Type$1;
	hasRequiredType = 1;

	var ES5Type = requireType$1();

	// https://262.ecma-international.org/11.0/#sec-ecmascript-data-types-and-values

	Type$1 = function Type(x) {
		if (typeof x === 'symbol') {
			return 'Symbol';
		}
		if (typeof x === 'bigint') {
			return 'BigInt';
		}
		return ES5Type(x);
	};
	return Type$1;
}

var GetIntrinsic$1 = getIntrinsic;

var $TypeError = GetIntrinsic$1('%TypeError%');

var has = src;

var IsPropertyKey = requireIsPropertyKey();
var Type = requireType();

// https://262.ecma-international.org/6.0/#sec-hasownproperty

var HasOwnProperty$1 = function HasOwnProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	return has(O, P);
};

var ToObject = ToObject$1;
var ToPropertyKey = ToPropertyKey$1;
var HasOwnProperty = HasOwnProperty$1;

var implementation$2 = function hasOwn(O, P) {
	var obj = ToObject(O);
	var key = ToPropertyKey(P);
	return HasOwnProperty(obj, key);
};

var implementation$1 = implementation$2;

var polyfill = function getPolyfill() {
	return Object.hasOwn || implementation$1;
};

var getPolyfill = /*@__PURE__*/getDefaultExportFromCjs(polyfill);

var toStr$1 = Object.prototype.toString;

var isArguments = function isArguments(value) {
	var str = toStr$1.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr$1.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

var implementation;
var hasRequiredImplementation;

function requireImplementation () {
	if (hasRequiredImplementation) return implementation;
	hasRequiredImplementation = 1;

	var keysShim;
	if (!Object.keys) {
		// modified from https://github.com/es-shims/es5-shim
		var has = Object.prototype.hasOwnProperty;
		var toStr = Object.prototype.toString;
		var isArgs = isArguments; // eslint-disable-line global-require
		var isEnumerable = Object.prototype.propertyIsEnumerable;
		var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
		var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
		var dontEnums = [
			'toString',
			'toLocaleString',
			'valueOf',
			'hasOwnProperty',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'constructor'
		];
		var equalsConstructorPrototype = function (o) {
			var ctor = o.constructor;
			return ctor && ctor.prototype === o;
		};
		var excludedKeys = {
			$applicationCache: true,
			$console: true,
			$external: true,
			$frame: true,
			$frameElement: true,
			$frames: true,
			$innerHeight: true,
			$innerWidth: true,
			$onmozfullscreenchange: true,
			$onmozfullscreenerror: true,
			$outerHeight: true,
			$outerWidth: true,
			$pageXOffset: true,
			$pageYOffset: true,
			$parent: true,
			$scrollLeft: true,
			$scrollTop: true,
			$scrollX: true,
			$scrollY: true,
			$self: true,
			$webkitIndexedDB: true,
			$webkitStorageInfo: true,
			$window: true
		};
		var hasAutomationEqualityBug = (function () {
			/* global window */
			if (typeof window === 'undefined') { return false; }
			for (var k in window) {
				try {
					if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
						try {
							equalsConstructorPrototype(window[k]);
						} catch (e) {
							return true;
						}
					}
				} catch (e) {
					return true;
				}
			}
			return false;
		}());
		var equalsConstructorPrototypeIfNotBuggy = function (o) {
			/* global window */
			if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
				return equalsConstructorPrototype(o);
			}
			try {
				return equalsConstructorPrototype(o);
			} catch (e) {
				return false;
			}
		};

		keysShim = function keys(object) {
			var isObject = object !== null && typeof object === 'object';
			var isFunction = toStr.call(object) === '[object Function]';
			var isArguments = isArgs(object);
			var isString = isObject && toStr.call(object) === '[object String]';
			var theKeys = [];

			if (!isObject && !isFunction && !isArguments) {
				throw new TypeError('Object.keys called on a non-object');
			}

			var skipProto = hasProtoEnumBug && isFunction;
			if (isString && object.length > 0 && !has.call(object, 0)) {
				for (var i = 0; i < object.length; ++i) {
					theKeys.push(String(i));
				}
			}

			if (isArguments && object.length > 0) {
				for (var j = 0; j < object.length; ++j) {
					theKeys.push(String(j));
				}
			} else {
				for (var name in object) {
					if (!(skipProto && name === 'prototype') && has.call(object, name)) {
						theKeys.push(String(name));
					}
				}
			}

			if (hasDontEnumBug) {
				var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

				for (var k = 0; k < dontEnums.length; ++k) {
					if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
						theKeys.push(dontEnums[k]);
					}
				}
			}
			return theKeys;
		};
	}
	implementation = keysShim;
	return implementation;
}

var slice = Array.prototype.slice;
var isArgs = isArguments;

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : requireImplementation();

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

var objectKeys = keysShim;

var GetIntrinsic = getIntrinsic;

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasPropertyDescriptors$1 = function hasPropertyDescriptors() {
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
			return true;
		} catch (e) {
			// IE 8 has a broken defineProperty
			return false;
		}
	}
	return false;
};

hasPropertyDescriptors$1.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!hasPropertyDescriptors$1()) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

var hasPropertyDescriptors_1 = hasPropertyDescriptors$1;

var keys = objectKeys;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var hasPropertyDescriptors = hasPropertyDescriptors_1();

var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;

var defineProperty = function (object, name, value, predicate) {
	if (name in object) {
		if (predicate === true) {
			if (object[name] === value) {
				return;
			}
		} else if (!isFunction(predicate) || !predicate()) {
			return;
		}
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value; // eslint-disable-line no-param-reassign
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

var hasOwn = callBind(getPolyfill(), null);

class Mailbox {
    reSpecCompliantAddr = /(([^<>\r\n]+)\s)?<[^\r\n]+>/;
    name = '';
    addr = '';
    type = 'To';
    constructor(input, config = { type: 'To' }) {
        this.type = config.type;
        this.parse(input);
    }
    getAddrDomain() {
        return this.addr.includes('@') ? this.addr.split('@')[1] : '';
    }
    dump() {
        return this.name ? `"${this.name}" <${this.addr}>` : `<${this.addr}>`;
    }
    parse(input) {
        if (this.isMailboxAddrObject(input)) {
            this.addr = input.addr;
            if (typeof input.name === 'string')
                this.name = input.name;
            if (typeof input.type === 'string')
                this.type = input.type;
            return this;
        }
        if (this.isMailboxAddrText(input)) {
            const text = input.trim();
            if (text.slice(0, 1) == '<' && text.slice(-1) == '>') {
                this.addr = text.slice(1, -1);
                return this;
            }
            const arr = text.split(' <');
            arr[0] = /^("|')/.test(arr[0]) ? arr[0].slice(1) : arr[0];
            arr[0] = /("|')$/.test(arr[0]) ? arr[0].slice(0, -1) : arr[0];
            arr[1] = arr[1].slice(0, -1);
            this.name = arr[0];
            this.addr = arr[1];
            return this;
        }
        if (typeof input === 'string') {
            this.addr = input;
            return this;
        }
        throw new MIMETextError('MIMETEXT_INVALID_MAILBOX', 'Couldn\'t recognize the input.');
    }
    isMailboxAddrText(v) {
        return typeof v === 'string' && this.reSpecCompliantAddr.test(v);
    }
    isMailboxAddrObject(v) {
        return this.isObject(v) && hasOwn(v, 'addr');
    }
    isObject(v) {
        return (!!v) && (v.constructor === Object);
    }
}

/*
    Headers are based on: https://www.rfc-editor.org/rfc/rfc4021#section-2.1
    (Some are ignored as they can be added later or as a custom header.)
*/
class MIMEMessageHeader {
    envctx;
    fields = [
        {
            name: 'Date',
            generator: () => ((new Date()).toUTCString()).replace(/GMT|UTC/gi, '+0000')
        },
        {
            name: 'From',
            required: true,
            validate: (v) => this.validateMailboxSingle(v),
            dump: (v) => this.dumpMailboxSingle(v)
        },
        {
            name: 'Sender',
            validate: (v) => this.validateMailboxSingle(v),
            dump: (v) => this.dumpMailboxSingle(v)
        },
        {
            name: 'Reply-To',
            validate: (v) => this.validateMailboxSingle(v),
            dump: (v) => this.dumpMailboxSingle(v)
        },
        {
            name: 'To',
            validate: (v) => this.validateMailboxMulti(v),
            dump: (v) => this.dumpMailboxMulti(v)
        },
        {
            name: 'Cc',
            validate: (v) => this.validateMailboxMulti(v),
            dump: (v) => this.dumpMailboxMulti(v)
        },
        {
            name: 'Bcc',
            validate: (v) => this.validateMailboxMulti(v),
            dump: (v) => this.dumpMailboxMulti(v)
        },
        {
            name: 'Message-ID',
            generator: () => {
                const randomstr = Math.random().toString(36).slice(2);
                const from = this.fields.filter((obj) => obj.name === 'From')[0].value;
                const domain = from.getAddrDomain();
                return '<' + randomstr + '@' + domain + '>';
            }
        },
        {
            name: 'Subject',
            required: true,
            dump: (v) => {
                return typeof v === 'string' ? '=?utf-8?B?' + this.envctx.toBase64(v) + '?=' : '';
            }
        },
        {
            name: 'MIME-Version',
            generator: () => '1.0'
        }
    ];
    constructor(envctx) {
        this.envctx = envctx;
    }
    dump() {
        let lines = '';
        for (const field of this.fields) {
            if (field.disabled)
                continue;
            const isValueDefinedByUser = field.value !== undefined && field.value !== null;
            if (!isValueDefinedByUser && field.required) {
                throw new MIMETextError('MIMETEXT_MISSING_HEADER', `The "${field.name}" header is required.`);
            }
            if (!isValueDefinedByUser && typeof field.generator !== 'function')
                continue;
            if (!isValueDefinedByUser && typeof field.generator === 'function')
                field.value = field.generator();
            const strval = hasOwn(field, 'dump') && typeof field.dump === 'function'
                ? field.dump(field.value)
                : typeof field.value === 'string' ? field.value : '';
            lines += `${field.name}: ${strval}${this.envctx.eol}`;
        }
        return lines.slice(0, -1 * this.envctx.eol.length);
    }
    toObject() {
        return this.fields.reduce((memo, item) => {
            memo[item.name] = item.value;
            return memo;
        }, {});
    }
    get(name) {
        const fieldMatcher = (obj) => obj.name.toLowerCase() === name.toLowerCase();
        const ind = this.fields.findIndex(fieldMatcher);
        return ind !== -1 ? this.fields[ind].value : undefined;
    }
    set(name, value) {
        const fieldMatcher = (obj) => obj.name.toLowerCase() === name.toLowerCase();
        const isCustomHeader = !this.fields.some(fieldMatcher);
        if (!isCustomHeader) {
            const ind = this.fields.findIndex(fieldMatcher);
            const field = this.fields[ind];
            if (field.validate && !field.validate(value)) {
                throw new MIMETextError('MIMETEXT_INVALID_HEADER_VALUE', 'You specified an invalid value for the header ' + name);
            }
            this.fields[ind].value = value;
            return this.fields[ind];
        }
        return this.setCustom({
            name: name,
            value: value,
            custom: true,
            dump: (v) => typeof v === 'string' ? v : ''
        });
    }
    setCustom(obj) {
        if (this.isHeaderField(obj)) {
            if (typeof obj.value !== 'string') {
                throw new MIMETextError('MIMETEXT_INVALID_HEADER_FIELD', 'Custom header must have a value.');
            }
            this.fields.push(obj);
            return obj;
        }
        throw new MIMETextError('MIMETEXT_INVALID_HEADER_FIELD', 'You specified an invalid header field object.');
    }
    validateMailboxSingle(v) {
        return v instanceof Mailbox;
    }
    validateMailboxMulti(v) {
        return v instanceof Mailbox || this.isArrayOfMailboxes(v);
    }
    dumpMailboxMulti(v) {
        const dump = (item) => item.name.length === 0
            ? item.dump()
            : `=?utf-8?B?${this.envctx.toBase64(item.name)}?= <${item.addr}>`;
        return this.isArrayOfMailboxes(v) ? v.map(dump).join(`,${this.envctx.eol} `) : v instanceof Mailbox ? dump(v) : '';
    }
    dumpMailboxSingle(v) {
        const dump = (item) => item.name.length === 0
            ? item.dump()
            : `=?utf-8?B?${this.envctx.toBase64(item.name)}?= <${item.addr}>`;
        return v instanceof Mailbox ? dump(v) : '';
    }
    isHeaderField(v) {
        const validProps = ['name', 'value', 'dump', 'required', 'disabled', 'generator', 'custom'];
        if (this.isObject(v)) {
            const h = v;
            if (hasOwn(h, 'name') && typeof h.name === 'string' && h.name.length > 0) {
                if (!Object.keys(h).some((prop) => !validProps.includes(prop))) {
                    return true;
                }
            }
        }
        return false;
    }
    isObject(v) {
        return (!!v) && (v.constructor === Object);
    }
    isArrayOfMailboxes(v) {
        return this.isArray(v) && v.every((item) => item instanceof Mailbox);
    }
    isArray(v) {
        return (!!v) && (v.constructor === Array);
    }
}
class MIMEMessageContentHeader extends MIMEMessageHeader {
    fields = [
        {
            name: 'Content-ID'
        },
        {
            name: 'Content-Type'
        },
        {
            name: 'Content-Transfer-Encoding'
        },
        {
            name: 'Content-Disposition'
        }
    ];
    constructor(envctx) {
        super(envctx);
    }
}

class MIMEMessageContent {
    envctx;
    headers;
    data;
    constructor(envctx, data, headers = {}) {
        this.envctx = envctx;
        this.headers = new MIMEMessageContentHeader(this.envctx);
        this.data = data;
        this.setHeaders(headers);
    }
    dump() {
        const eol = this.envctx.eol;
        return this.headers.dump() + eol + eol + this.data;
    }
    isAttachment() {
        const disposition = this.headers.get('Content-Disposition');
        return typeof disposition === 'string' && disposition.includes('attachment');
    }
    isInlineAttachment() {
        const disposition = this.headers.get('Content-Disposition');
        return typeof disposition === 'string' && disposition.includes('inline');
    }
    setHeader(name, value) {
        this.headers.set(name, value);
        return name;
    }
    getHeader(name) {
        return this.headers.get(name);
    }
    setHeaders(obj) {
        return Object.keys(obj).map((prop) => this.setHeader(prop, obj[prop]));
    }
    getHeaders() {
        return this.headers.toObject();
    }
}

class MIMEMessage {
    envctx;
    headers;
    boundaries = { mixed: '', alt: '', related: '' };
    validTypes = ['text/html', 'text/plain'];
    validContentTransferEncodings = ['7bit', '8bit', 'binary', 'quoted-printable', 'base64'];
    messages = [];
    constructor(envctx) {
        this.envctx = envctx;
        this.headers = new MIMEMessageHeader(this.envctx);
        this.messages = [];
        this.generateBoundaries();
    }
    asRaw() {
        const eol = this.envctx.eol;
        const lines = this.headers.dump();
        const plaintext = this.getMessageByType('text/plain');
        const html = this.getMessageByType('text/html');
        const primaryMessage = html ? html : plaintext ? plaintext : undefined;
        if (primaryMessage === undefined) {
            throw new MIMETextError('MIMETEXT_MISSING_BODY', 'No content added to the message.');
        }
        const hasAttachments = this.hasAttachments();
        const hasInlineAttachments = this.hasInlineAttachments();
        const structure = hasInlineAttachments && hasAttachments ? 'mixed+related'
            : hasAttachments ? 'mixed'
                : hasInlineAttachments ? 'related'
                    : plaintext && html ? 'alternative'
                        : '';
        if (structure === 'mixed+related') {
            const attachments = this.getAttachments()
                .map((a) => '--' + this.boundaries.mixed + eol + a.dump() + eol + eol)
                .join('')
                .slice(0, -1 * eol.length);
            const inlineAttachments = this.getInlineAttachments()
                .map((a) => '--' + this.boundaries.related + eol + a.dump() + eol + eol)
                .join('')
                .slice(0, -1 * eol.length);
            return lines + eol
                + 'Content-Type: multipart/mixed; boundary=' + this.boundaries.mixed + eol
                + eol
                + '--' + this.boundaries.mixed + eol
                + 'Content-Type: multipart/related; boundary=' + this.boundaries.related + eol
                + eol
                + this.dumpTextContent(plaintext, html, this.boundaries.related) + eol
                + eol
                + inlineAttachments
                + '--' + this.boundaries.related + '--' + eol
                + attachments
                + '--' + this.boundaries.mixed + '--';
        }
        else if (structure === 'mixed') {
            const attachments = this.getAttachments()
                .map((a) => '--' + this.boundaries.mixed + eol + a.dump() + eol + eol)
                .join('')
                .slice(0, -1 * eol.length);
            return lines + eol
                + 'Content-Type: multipart/mixed; boundary=' + this.boundaries.mixed + eol
                + eol
                + this.dumpTextContent(plaintext, html, this.boundaries.mixed) + eol
                + (plaintext && html ? '' : eol)
                + attachments
                + '--' + this.boundaries.mixed + '--';
        }
        else if (structure === 'related') {
            const inlineAttachments = this.getInlineAttachments()
                .map((a) => '--' + this.boundaries.related + eol + a.dump() + eol + eol)
                .join('')
                .slice(0, -1 * eol.length);
            return lines + eol
                + 'Content-Type: multipart/related; boundary=' + this.boundaries.related + eol
                + eol
                + this.dumpTextContent(plaintext, html, this.boundaries.related) + eol
                + eol
                + inlineAttachments
                + '--' + this.boundaries.related + '--';
        }
        else if (structure === 'alternative') {
            return lines + eol
                + 'Content-Type: multipart/alternative; boundary=' + this.boundaries.alt + eol
                + eol
                + this.dumpTextContent(plaintext, html, this.boundaries.alt) + eol
                + eol
                + '--' + this.boundaries.alt + '--';
        }
        else {
            return lines + eol + primaryMessage.dump();
        }
    }
    asEncoded() {
        return this.envctx.toBase64WebSafe(this.asRaw());
    }
    dumpTextContent(plaintext, html, boundary) {
        const eol = this.envctx.eol;
        const primaryMessage = html ? html : plaintext;
        let data = '';
        if (plaintext && html && !this.hasInlineAttachments() && this.hasAttachments())
            data = '--' + boundary + eol
                + 'Content-Type: multipart/alternative; boundary=' + this.boundaries.alt + eol
                + eol
                + '--' + this.boundaries.alt + eol
                + plaintext.dump() + eol
                + eol
                + '--' + this.boundaries.alt + eol
                + html.dump() + eol
                + eol
                + '--' + this.boundaries.alt + '--';
        else if (plaintext && html && this.hasInlineAttachments())
            data = '--' + boundary + eol
                + html.dump();
        else if (plaintext && html)
            data = '--' + boundary + eol
                + plaintext.dump() + eol
                + eol
                + '--' + boundary + eol
                + html.dump();
        else
            data = '--' + boundary + eol
                + primaryMessage.dump();
        return data;
    }
    hasInlineAttachments() {
        return this.messages.some((msg) => msg.isInlineAttachment());
    }
    hasAttachments() {
        return this.messages.some((msg) => msg.isAttachment());
    }
    getAttachments() {
        const matcher = (msg) => msg.isAttachment();
        return this.messages.some(matcher) ? this.messages.filter(matcher) : [];
    }
    getInlineAttachments() {
        const matcher = (msg) => msg.isInlineAttachment();
        return this.messages.some(matcher) ? this.messages.filter(matcher) : [];
    }
    getMessageByType(type) {
        const matcher = (msg) => !msg.isAttachment() && !msg.isInlineAttachment() && (msg.getHeader('Content-Type') || '').includes(type);
        return this.messages.some(matcher) ? this.messages.filter(matcher)[0] : undefined;
    }
    addAttachment(opts) {
        if (!this.isObject(opts.headers))
            opts.headers = {};
        if (typeof opts.filename !== 'string') {
            throw new MIMETextError('MIMETEXT_MISSING_FILENAME', 'The property filename must exist while adding attachments.');
        }
        let type = opts.headers['Content-Type'] || opts.contentType || 'none';
        if (this.envctx.validateContentType(type) === false) {
            throw new MIMETextError('MIMETEXT_INVALID_MESSAGE_TYPE', `You specified an invalid content type "${type}".`);
        }
        const encoding = opts.headers['Content-Transfer-Encoding'] || opts.encoding || 'base64';
        if (!this.validContentTransferEncodings.includes(encoding)) {
            type = 'application/octet-stream';
        }
        const contentId = opts.headers['Content-ID'];
        if (typeof contentId === 'string' && contentId.length > 2 && contentId.slice(0, 1) !== '<' && contentId.slice(-1) !== '>') {
            opts.headers['Content-ID'] = '<' + opts.headers['Content-ID'] + '>';
        }
        const disposition = opts.inline ? 'inline' : 'attachment';
        opts.headers = Object.assign({}, opts.headers, {
            'Content-Type': `${type}; name="${opts.filename}"`,
            'Content-Transfer-Encoding': encoding,
            'Content-Disposition': `${disposition}; filename="${opts.filename}"`
        });
        return this._addMessage({ data: opts.data, headers: opts.headers });
    }
    addMessage(opts) {
        if (!this.isObject(opts.headers))
            opts.headers = {};
        let type = opts.headers['Content-Type'] || opts.contentType || 'none';
        if (!this.validTypes.includes(type)) {
            throw new MIMETextError('MIMETEXT_INVALID_MESSAGE_TYPE', `Valid content types are ${this.validTypes.join(', ')} but you specified "${type}".`);
        }
        const encoding = opts.headers['Content-Transfer-Encoding'] || opts.encoding || '7bit';
        if (!this.validContentTransferEncodings.includes(encoding)) {
            type = 'application/octet-stream';
        }
        const charset = opts.charset || 'UTF-8';
        opts.headers = Object.assign({}, opts.headers, {
            'Content-Type': `${type}; charset=${charset}`,
            'Content-Transfer-Encoding': encoding
        });
        return this._addMessage({ data: opts.data, headers: opts.headers });
    }
    _addMessage(opts) {
        const msg = new MIMEMessageContent(this.envctx, opts.data, opts.headers);
        this.messages.push(msg);
        return msg;
    }
    setSender(input, config = { type: 'From' }) {
        const mailbox = new Mailbox(input, config);
        this.setHeader('From', mailbox);
        return mailbox;
    }
    getSender() {
        return this.getHeader('From');
    }
    setRecipients(input, config = { type: 'To' }) {
        const arr = !this.isArray(input) ? [input] : input;
        const recs = arr.map((_input) => new Mailbox(_input, config));
        this.setHeader(config.type, recs);
        return recs;
    }
    getRecipients(config = { type: 'To' }) {
        return this.getHeader(config.type);
    }
    setRecipient(input) {
        return this.setRecipients(input, { type: 'To' });
    }
    setTo(input) {
        return this.setRecipients(input, { type: 'To' });
    }
    setCc(input) {
        return this.setRecipients(input, { type: 'Cc' });
    }
    setBcc(input) {
        return this.setRecipients(input, { type: 'Bcc' });
    }
    setSubject(value) {
        this.setHeader('subject', value);
        return value;
    }
    getSubject() {
        return this.getHeader('subject');
    }
    setHeader(name, value) {
        this.headers.set(name, value);
        return name;
    }
    getHeader(name) {
        return this.headers.get(name);
    }
    setHeaders(obj) {
        return Object.keys(obj).map((prop) => this.setHeader(prop, obj[prop]));
    }
    getHeaders() {
        return this.headers.toObject();
    }
    toBase64(v) {
        return this.envctx.toBase64(v);
    }
    toBase64WebSafe(v) {
        return this.envctx.toBase64WebSafe(v);
    }
    generateBoundaries() {
        this.boundaries = {
            mixed: Math.random().toString(36).slice(2),
            alt: Math.random().toString(36).slice(2),
            related: Math.random().toString(36).slice(2)
        };
    }
    isArray(v) {
        return (!!v) && (v.constructor === Array);
    }
    isObject(v) {
        return (!!v) && (v.constructor === Object);
    }
}

const envctx = {
    toBase64: function toBase64(data) {
        return Buffer.from(data).toString('base64');
    },
    toBase64WebSafe: function toBase64WebSafe(data) {
        return Buffer.from(data)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    },
    eol: os.EOL,
    validateContentType: (v) => {
        return mime__namespace.contentType(v);
    }
};
function createMimeMessage() {
    return new MIMEMessage(envctx);
}

exports.MIMEMessage = MIMEMessage;
exports.MIMEMessageContent = MIMEMessageContent;
exports.MIMEMessageHeader = MIMEMessageHeader;
exports.MIMETextError = MIMETextError;
exports.Mailbox = Mailbox;
exports.createMimeMessage = createMimeMessage;
