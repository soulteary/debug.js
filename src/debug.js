/**
 * simple debug helper
 * @author soulteary@qq.com
 * @example
 *
 *
 * @level:
 *      disable (0) < log (5) < debug (4) < info (3) < warn (2) < error (1)
 *
 *      var debug = require('debug');
 *          debug([setLevel, 1,2,3,4,5]);
 *          debug.method // 'count', 'error', 'warn', 'info', 'debug', 'log', 'time', 'timeEnd', 'timeStamp', 'performance'
 */

// inspire by jquery module factory
(function (global, factory) {
    'use strict';

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("Debug.js requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

}(typeof window !== "undefined" ? window : this, function (window, noGlobal, strundefined) {
    'use strict';

    // 默认调试等级为禁用一切输出
    var globalLevel = 0;
    // 用户设置调试等级
    var userLevel = 0;
    // 保存当前示例过后的对象容器
    var debugCache = {};
    // 内部版本
    var version = "0.0.1",

        Debug   = function (params) {
            return new Debug.fn.init(params);
        };


    Debug.fn = Debug.prototype = {
        Debug      : version,
        constructor: Debug
    };


    // extend, minify from jquery
    Debug.extend = Debug.fn.extend = function () {
        var options, name, src, copy,
            target = this;

        // Only deal with non-null/undefined values
        if ((options = arguments[0]) != null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];
                // Prevent never-ending loop
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

    /**
     * 外观模式提供调用
     * @type {Function}
     */
    var init = Debug.fn.init = function (params) {
        switch (arguments.length) {
            case 1:
                Debug.extend(instance(params));
                break;
            default :
                // 暂定输入非单一参数且为数字，禁用输出
                Debug.extend(instance(0));
                return this;
        }
        return this;
    };
    init.prototype = Debug.fn;


    /**
     * 过滤输入，生成实例方法
     * @param setLevel
     * @returns {*}
     */
    function instance (setLevel) {
        if (!(typeof setLevel === 'number' && setLevel >= 0 && setLevel <= 5)) {
            setLevel = 0;
        }
        userLevel = setLevel;
        return getDebug(userLevel || globalLevel);
    }


    /**
     * 检查是否为过时的浏览器
     * @returns {boolean}
     */
    function isFogy () {
        return (navigator.appName.indexOf("Internet Explorer") > -1) && (navigator.appVersion.indexOf("MSIE 9") == -1 && navigator.appVersion.indexOf("MSIE 1") == -1);
    }


    /**
     * 创建debug对象缓存，以便提供模块加载信息打印以及通用打印的支持。
     * @param level
     * @returns {*}
     */
    function getDebug (level) {
        if (!debugCache[level]) {
            debugCache[level] = (function (w, level) {
                var c = w.console || null, p = w.performance || null, v = function () {}, d = {}, f = ['count', 'error', 'warn', 'info', 'debug', 'log', 'time', 'timeEnd'];
                for (var i = 0, j = f.length; i < j; i++) {
                    (function (x, i) {d[x] = c && c[x] ? function () {level >= i && level <= 5 && (isFogy() ? Function.prototype.call.call(c[x], c, Array.prototype.slice.call(arguments)) : c[x].apply(c, arguments))} : v})(f[i], i);
                }
                d['timeStamp'] = function () {return +new Date;};
                d['performance'] = p && p.timing ? p.timing : null;
                return d;
            }(window, level));
        }
        return debugCache[level];
    }


    // exports for amd
    if (typeof define === "function" && define.amd) {
        define("debug", [], function () {
            return Debug;
        });
    }

    var _Debug = window.Debug;

    Debug.extend({
        noConflict: function () {
            if (window.Debug === Debug) {
                window.Debug = _Debug;
            }
            return Debug;
        }
    });

    if (typeof noGlobal === strundefined) {
        window.Debug = Debug;
    }

    return Debug;

}));