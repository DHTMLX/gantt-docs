---
sidebar_label: onError
title: onError event
description: "当 assert 返回 'false' 值时触发，表示断言未通过。"
---

# onError

### Description

@short: 当 [assert](api/method/assert.md) 返回 'false' 值时触发，表示断言未通过。

@signature: onError: (errorMessage: string) =\> boolean;

### Parameters

- `errorMessage` - (required) *string* - 包含来自 [assert](api/method/assert.md) 方法的错误信息的字符串

### Returns
- ` result` - (boolean) - 决定事件默认行为是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onError", function(errorMessage){
    gantt.message({
        text:"Error"
    });
    return true;
});
~~~

### Details

此事件可以被阻止。返回 false 将停止默认行为，默认行为是在右上角以红色框显示错误信息。

### Change log
- 在版本 4.0 中添加

