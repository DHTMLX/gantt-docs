---
sidebar_label: onError
title: onError 事件
description: "在 [assert](api/method/assert.md) 接收到 'false' 值时触发，即断言失败时"
---

# onError

### Description

@short: 当 [assert](api/method/assert.md) 接收到 'false' 值时触发，即断言失败时

@signature: onError: (errorMessage: string) => boolean;

### Parameters

- `errorMessage` - (required) *string* - 来自 [assert](api/method/assert.md) 方法的错误信息字符串

### Returns
- ` result` - (boolean) - 定义事件的默认动作是否会被触发（<b>true</b>）还是取消（<b>false</b>）

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

事件是可阻塞的。返回 false 将阻止默认行为（在右上角的红色框中显示错误信息）

### Change log
- 在 4.0 版本中新增