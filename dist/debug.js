(function (global, Debug) {
    'use strict';
    var instance = new Debug();
    instance(0);
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = global.document ? instance : function (w) {
            if (!w || !w.document) {
                throw new Error('Debug.js requires a window with a document');
            }
            return instance;
        }();
    } else if (typeof define === 'function' && (define.amd || window.seajs)) {
        define('debug', [], function () {
            return instance;
        });
    } else {
        global.Debug = instance;
        return instance;
    }
}(typeof window !== 'undefined' ? window : this, function () {
    'use strict';
    var globalLevel = 0;
    var userLevel = 0;
    var debugCache = {};
    var version = '1.1.0';
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
            Debug.extend(getInstance(params));
            break;
        default:
            Debug.extend(getInstance(0));
            return this;
        }
        return this;
    };
    init.prototype = Debug.fn;
    function getInstance(setLevel) {
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
            debugCache[level] = function (win, level) {
                var console = win.console || null;
                var performance = win.performance || null;
                var standIns = function () {
                    return 404;
                };
                var func = null;
                var cache = {};
                var funcList = [
                    'count',
                    'error',
                    'warn',
                    'info',
                    'debug',
                    'log',
                    'time',
                    'timeEnd'
                ];
                for (var i = 0, j = funcList.length; i < j; i++) {
                    (function (x, i) {
                        cache[x] = console && console[x] ? function () {
                            func = level >= i && level <= 5 ? console[x] : standIns;
                            return isFogy() ? Function.prototype.call.call(func, console, Array.prototype.slice.call(arguments)) : func.apply(console, arguments);
                        } : standIns;
                    }(funcList[i], i));
                }
                cache.timeStamp = function () {
                    return +new Date();
                };
                cache.performance = performance && performance.timing ? performance.timing : null;
                return cache;
            }(window, level);
        }
        return debugCache[level];
    }
    return Debug;
}));