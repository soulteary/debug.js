/**
 * debug.js
 *
 * @author  soulteary@qq.com
 *
 * @todo    1.模拟调试窗
 *          2.可选远程调试
 *          3.on error report
 *          4.origin track
 *          5.完善注册事件
 *
 * @example
 *
 *  - Global:
 *      var debug = window.Debug;
 *  - AMD/CMD Module:
 *      var debug = require('debug');
 *
 *          debug(5);   // set debug level
 *          debug('log'); // set debug level by words
 *          debug.method(argv);
 *
 * @debug_level:
 *
 *      disable (0) < log (5) < debug (4) < info (3) < warn (2) < error (1)
 *
 * @method_list:
 *
 *      - count
 *      - error
 *      - warn
 *      - info
 *      - debug
 *      - log
 *      - time
 *      - timeEnd
 *      - timeStamp
 *      - performance
 *
 */
/* global define, module, window */
(function (global, Debug) {
    'use strict';

    // init debug.js
    var instance = new Debug();
    // default disable all message.
    var level = 0;
    if (global.Debug && global.Debug.level) {
        level = global.Debug.level;
    }
    instance(level);

    if (typeof module === 'object' && typeof module.exports === 'object') {
        // exports for cmd
        module.exports = global.document ? instance: function (w) {
            if (!w || !w.document) {
                throw new Error('Debug.js requires a window with a document');
            }
            return instance;
        };
    } else if (typeof define === 'function' && (define.amd || window.seajs)) {
        // exports for amd && cmd(seajs)
        define('debug', [], function () {
            return instance;
        });
    } else {
        global.Debug = instance;
        return instance;
    }

}(typeof window !== 'undefined' ? window: this, function () {
    'use strict';

    // 默认调试等级为禁用一切输出
    var globalLevel = 0;
    // 用户设置调试等级
    var userLevel = 0;
    // 保存当前示例过后的对象容器
    var debugCache = {};
    // 内部版本
    var version = '1.1.2';
    // Debug KEY
    var DEBUG_KEY = 'xDebug';
    // debug handle
    var debugHandle = {};

    var Debug = function (params) {
        return new Debug.fn.init(params);
    };

    Debug.fn = Debug.prototype = {
        version     : version,
        constructor : Debug
    };

    // extend, minify from jquery
    Debug.extend = Debug.fn.extend = function () {
        var options;
        var name;
        var src;
        var copy;
        var target = this;

        // Only deal with non-null/undefined values
        if ((options = arguments[0]) !== null) {
            // Extend the base object
            for (name in options) {
                if (options.hasOwnProperty(name)) {
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
        }
        return target;
    };

    /**
     * 获得URL参数
     * @param url
     * @param key
     * @param defaultKey
     * @returns {*}
     */
    var getUrlParams = function (url, key, defaultKey) {

        defaultKey = defaultKey || undefined;

        var params = url.split('?')[1];

        if (!params) {
            return defaultKey;
        } else {
            // 过滤hash
            params = params.split('#')[0];
            if (!params) {
                return defaultKey;
            }
        }

        function type (obj) {
            return Object.prototype.toString.call(obj).toLowerCase().slice(8, -1);
        }

        var result = {}, resultLength = 0;
        params = params.split('&');
        for (var i = 0, j = params.length; i < j; i++) {
            var param = params[i].split('=');
            if (param.length !== 2) {
                param[1] = defaultKey;
            }

            var number = parseFloat(param[1]);
            if (!isNaN(number)) {
                param[1] = number;
            }

            if (result[param[0]] === null || result[param[0]] === defaultKey) {
                result[param[0]] = param[1];
            } else {
                if (type(result[param[0]]) === 'array') {
                    result[param[0]].push(param[1]);
                } else {
                    result[param[0]] = [result[param[0]]];
                    result[param[0]].push(param[1]);
                }
            }
            resultLength += 1;
        }

        if (resultLength) {
            if (key && result.hasOwnProperty(key)) {
                return result[key];
            } else {
                return result;
            }
        } else {
            return defaultKey;
        }
    };

    /**
     * 获得当前DEBUG模式
     * @returns {*}
     */
    var isDebugMode = function () {
        return getUrlParams(window.location.href, DEBUG_KEY);
    };

    /**
     * 外观模式提供调用
     * @type {Function}
     */
    var init = Debug.fn.init = function (params) {

        var _Debug = window.Debug;

        Debug.extend({
            noConflict : function () {
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
            case 2:
                Debug.extend(getInstance(params));
                Debug.extend(regHandle.apply(null, arguments[1]));
                break;
            default :
                // 暂定输入非单一参数且为数字，禁用输出
                Debug.extend(getInstance(0));
                return this;
        }

        return this;
    };
    init.prototype = Debug.fn;


    function regHandle (type, func) {
        return {
            on  : function (type, func) {
                debugHandle[type] = debugHandle[type] || [];
                debugHandle[type].push(func);
            },
            off : function (type, func) {
                if (!func) {
                    debugHandle[type] = [];
                } else {
                    var i = 0, j = debugHandle.length;
                    for (; i < j; i++) {
                        if (debugHandle[i] === func) {
                            debugHandle.splice(i, 1);
                        }
                    }
                }
            }
        }
    }


    /**
     * 过滤输入，获取实例方法
     * @param setLevel
     * @returns {*}
     */
    function getInstance (setLevel) {
        if (!(typeof setLevel === 'number' && setLevel >= 0 && setLevel <= 5)) {
            var alias = ['error', 'warn', 'info', 'debug', 'log'];
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

    /**
     * 创建debug对象缓存，以便提供模块加载信息打印以及通用打印的支持。
     * @param level
     * @returns {*}
     */
    function getDebug (level) {
        var debugMode = isDebugMode() || 'console';
        debugCache[debugMode] = debugCache[debugMode] || {};
        var win = window;
        var funcList = ['count', 'error', 'warn', 'info', 'debug', 'log', 'time', 'timeEnd'];
        var standIns = function () {return 404;};
        var consoleFunc = win.console || null;
        var performanceFunc = win.performance || null;

        switch (debugCache[debugMode][level]) {
            case 'box':
                // todo
                break;
            case 'console':
            /*jslint -W086:true */
            /*jslint -W086:false */
            default :
                debugCache[debugMode][level] = (function (win, level) {
                    var func = null;
                    var cache = {};
                    for (var i = 0, j = funcList.length; i < j; i++) {
                        /*jslint loopfunc:true */
                        (function (x, i) {
                            if (consoleFunc && consoleFunc[x]) {
                                cache[x] = function () {
                                    // set func by  debug level
                                    if (level >= i && level <= 5) {
                                        func = consoleFunc[x];
                                    } else {
                                        func = standIns;
                                    }
                                    return Function.prototype.apply.call(func, consoleFunc, arguments);
                                };
                                cache[x] = consoleFunc[x].bind(consoleFunc);
                            } else {
                                cache[x] = standIns;
                            }
                        })(funcList[i], i);
                    }
                    cache.timeStamp = function () {return +new Date();};
                    cache.performance = performanceFunc && performanceFunc.timing ? performanceFunc.timing: null;
                    return cache;
                }(window, level));
                break;
        }
        return debugCache[debugMode][level];
    }

    return Debug;
}));
