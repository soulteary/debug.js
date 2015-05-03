## 项目说明

[![Build Status](https://travis-ci.org/soulteary/debug.js.svg?branch=master)](https://travis-ci.org/soulteary/debug.js)

 *      disable (0) < log (5) < debug (4) < info (3) < warn (2) < error (1)


## 使用方法


- 全局使用（直接引用，全局对象）


```
var debug = Debug;

    debug(5);
    
    debug.log('i want to say...');
```


-  AMD模块使用

```
var debug = require('debug');

    debug([setLevel, 1,2,3,4,5]);

    debug.method // 'count', 'error', 'warn', 'info', 'debug', 'log', 'time', 'timeEnd', 'timeStamp', 'performance'

```

