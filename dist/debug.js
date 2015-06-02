(function (global, Debug) {
    'use strict';
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = global.document ? new Debug() : function (w) {
            if (!w || !w.document) {
                throw new Error('Debug.js requires a window with a document');
            }
            return new Debug();
        }();
    } else if (typeof define === 'function' && (define.amd || window.seajs)) {
        define('debug', [], function () {
            return new Debug();
        });
    } else {
        var debug = new Debug();
        global.Debug = debug;
        return debug;
    }
}(typeof window !== 'undefined' ? window : this, function () {
    'use strict';
    var globalLevel = 0;
    var userLevel = 0;
    var debugCache = {};
    var version = '0.0.1';
    var Debug = function (params) {
        return new Debug.fn.init(params);
    };
    Debug.fn = Debug.prototype = {
        Debug: version,
        constructor: Debug
    };
    Debug.extend = Debug.fn.extend = function () {
        var options;
        var name;
        var src;
        var copy;
        var target = this;
        if ((options = arguments[0]) !== null) {
            for (name in options) {
                if (options.hasOwnProperty(name)) {
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
            var alias = [
                'error',
                'warn',
                'info',
                'debug',
                'log'
            ];
            for (var i = 0, j = alias.length; i < j; i++) {
                if (alias[i] === setLevel) {
                    setLevel = i + 1;
                    break;
                }
            }
            setLevel = setLevel || 0;
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
                var c = w.console || null;
                var p = w.performance || null;
                var v = function () {
                    return 404;
                };
                var k = null;
                var d = {};
                var f = [
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
                            k = level >= i && level <= 5 ? c[x] : v;
                            return isFogy() ? Function.prototype.call.call(k, c, Array.prototype.slice.call(arguments)) : k.apply(c, arguments);
                        } : v;
                    }(f[i], i));
                }
                d.timeStamp = function () {
                    return +new Date();
                };
                d.performance = p && p.timing ? p.timing : null;
                return d;
            }(window, level);
        }
        return debugCache[level];
    }
    return Debug;
}));