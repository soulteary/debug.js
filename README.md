## 项目说明

[![Build Status](https://travis-ci.org/soulteary/debug.js.svg?branch=master)](https://travis-ci.org/soulteary/debug.js)

我们常常会在项目中使用```console.X```方法来进行输出，或者简单的将```console```对象下的接口进行封装改写，以防出错。但是避免出错只是需求的下限而已。

如果可以设置调试信息输出的等级，那么开发会不会更方便一些呢。

之后计划添加一些输出控制，诸如输出信息气泡提示/浏览器插件联动/错误信息自动联动js error tracer上报。

## 调试信息输出等级

调试信息输出等级设定为6级，范围是0~6，0为禁用所有输出，1为仅输出错误信息，2为可输出warn和error类型的信息：

```
    disable (0) < log (5) < debug (4) < info (3) < warn (2) < error (1)
```

## 使用方法

一般使用这个，我们会有三种形式，一种为页面引用后作为全局对象使用：

    - 全局使用（直接引用，全局对象）

```
var debug = Debug;

    debug(5);
    //你也可以这样使用
    debug('log');

    debug.log('i want to say...');
```


一种为在AMD或者CMD模块中进行使用：

```
var debug = require('debug');

    debug([setLevel, 1,2,3,4,5,words]);

    debug.method // 'count', 'error', 'warn', 'info', 'debug', 'log', 'time', 'timeEnd', 'timeStamp', 'performance'

```

如果你想关闭调试，可以这样：

```
    debug(0);
    // 或者使用一个不存在的调试等级，如`off`/`disable`
    debug('off');
```