(function (global, factory) {
    'use strict';
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = global.document ? factory(global, true) : function (w) {
            if (!w.document) {
                throw new Error('Debug.js requires a window with a document');
            }
            return factory(w);
        };
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    'use strict';
    var globalLevel = 0;
    var userLevel = 0;
    var debugCache = {};
    var version = '0.0.1', Debug = function (params) {
            return new Debug.fn.init(params);
        };
    Debug.fn = Debug.prototype = {
        Debug: version,
        constructor: Debug
    };
    Debug.extend = Debug.fn.extend = function () {
        var options, name, src, copy, target = this;
        if ((options = arguments[0]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (target === copy) {
                    continue;
                }
                if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
        return target;
    };
    var init = Debug.fn.init = function (params) {
        var _Debug = window.Debug;
        Debug.extend({
            noConflict: function () {
                if (window.Debug === Debug) {
                    window.Debug = _Debug;
                }
                return Debug;
            }
        });
        switch (arguments.length) {
        case 1:
            Debug.extend(instance(params));
            break;
        default:
            Debug.extend(instance(0));
            return this;
        }
        return this;
    };
    init.prototype = Debug.fn;
    function instance(setLevel) {
        if (!(typeof setLevel === 'number' && setLevel >= 0 && setLevel <= 5)) {
            setLevel = 0;
        }
        userLevel = setLevel;
        return getDebug(userLevel || globalLevel);
    }
    function isFogy() {
        return navigator.appName.indexOf('Internet Explorer') > -1 && (navigator.appVersion.indexOf('MSIE 9') == -1 && navigator.appVersion.indexOf('MSIE 1') == -1);
    }
    function getDebug(level) {
        if (!debugCache[level]) {
            debugCache[level] = function (w, level) {
                var c = w.console || null, p = w.performance || null, v = function () {
                    }, d = {}, f = [
                        'count',
                        'error',
                        'warn',
                        'info',
                        'debug',
                        'log',
                        'time',
                        'timeEnd'
                    ];
                for (var i = 0, j = f.length; i < j; i++) {
                    (function (x, i) {
                        d[x] = c && c[x] ? function () {
                            level >= i && level <= 5 && (isFogy() ? Function.prototype.call.call(c[x], c, Array.prototype.slice.call(arguments)) : c[x].apply(c, arguments));
                        } : v;
                    }(f[i], i));
                }
                d['timeStamp'] = function () {
                    return +new Date();
                };
                d['performance'] = p && p.timing ? p.timing : null;
                return d;
            }(window, level);
        }
        return debugCache[level];
    }
    if (typeof define === 'function' && define.amd) {
        define('debug', [], function () {
            return Debug;
        });
    }
    if (typeof noGlobal === 'undefined') {
        window.Debug = Debug;
    }
    return Debug;
}));