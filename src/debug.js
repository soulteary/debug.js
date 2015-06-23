/**
 * debug.js
 *
 * @author  soulteary@qq.com
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
(function(global, Debug) {
    'use strict';

    // init debug.js
    var instance = new Debug();
    // default disable all message.
    instance(0);

    if (typeof module === 'object' && typeof module.exports === 'object') {
        // exports for cmd
        module.exports = global.document ? instance: function(w) {
            if (!w || !w.document) {
                throw new Error('Debug.js requires a window with a document');
            }
            return instance;
        };
    } else if (typeof define === 'function' && (define.amd || window.seajs)) {
        // exports for amd && cmd(seajs)
        define('debug', [], function() {
            return instance;
        });
    } else {
        global.Debug = instance;
        return instance;
    }

}(typeof window !== 'undefined' ? window: this, function() {
    'use strict';

    // 默认调试等级为禁用一切输出
    var globalLevel = 0;
    // 用户设置调试等级
    var userLevel = 0;
    // 保存当前示例过后的对象容器
    var debugCache = {};
    // 内部版本
    var version = '1.1.0';

    var Debug = function(params) {
        return new Debug.fn.init(params);
    };

    Debug.fn = Debug.prototype = {
        version     : version,
        constructor : Debug
    };

    // extend, minify from jquery
    Debug.extend = Debug.fn.extend = function() {
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
     * 外观模式提供调用
     * @type {Function}
     */
    var init = Debug.fn.init = function(params) {

        var _Debug = window.Debug;

        Debug.extend({
            noConflict : function() {
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
            default :
                // 暂定输入非单一参数且为数字，禁用输出
                Debug.extend(getInstance(0));
                return this;
        }

        return this;
    };
    init.prototype = Debug.fn;

    /**
     * 过滤输入，获取实例方法
     * @param setLevel
     * @returns {*}
     */
    function getInstance(setLevel) {
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
    function getDebug(level) {
        if (!debugCache[level]) {
            debugCache[level] = (function(win, level) {
                var console = win.console || null;
                var performance = win.performance || null;
                var standIns = function() {return 404;};
                var func = null;
                var cache = {};
                var funcList = ['count', 'error', 'warn', 'info', 'debug', 'log', 'time', 'timeEnd'];
                for (var i = 0, j = funcList.length; i < j; i++) {
                    /*jslint loopfunc:true */
                    (function(x, i) {
                        if (console && console[x]) {
                            cache[x] = function() {
                                // set func by  debug level
                                if (level >= i && level <= 5) {
                                    func = console[x];
                                } else {
                                    func = standIns;
                                }
                                return Function.prototype.apply.call(func, console, arguments);
                            };
                        } else {
                            cache[x] = standIns;
                        }
                    })(funcList[i], i);
                }
                cache.timeStamp = function() {return +new Date();};
                cache.performance = performance && performance.timing ? performance.timing: null;
                return cache;
            }(window, level));
        }
        return debugCache[level];
    }

    return Debug;
}));
