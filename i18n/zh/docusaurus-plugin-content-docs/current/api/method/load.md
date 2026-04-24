---
sidebar_label: load
title: load method
description: "从外部源加载数据到甘特图中。"
---

# load

### Description

@short: 从外部数据源将数据加载到甘特图

@signature: load: (url: string, type?: string, callback?: GanttCallback) =\> any

### Parameters

- `url` - (required) *string* - 服务器端 URL（可能是一个静态文件或输出数据的服务器端脚本）
- `type` -	(optionaL) *string*	<i>('json', 'xml', 'oldxml')</i> - 数据类型。默认值 - <i>'json'</i>
- `callback`	-	(optionaL) *function* 	- 回调函数

### Returns
- `resultPromise` - (object) - 当 Ajax 请求完成时解析的 Promise 对象

### Example

~~~jsx
gantt.load("/data",function(){
    gantt.message("everything is ready");
});
//或者
gantt.load("/data").then(function(xhr){
    gantt.message("everything is ready");
});
//或者
gantt.load("data.json"); //加载JSON格式的数据
//或者
gantt.load("data.xml","xml"); //加载XML格式的数据（版本2.0及以上）
//或者
gantt.load("data.xml","xml", function(){ //提供回调函数 
    alert("数据已成功加载");
});
~~~

### Related samples
- [Backend storage using REST API](https://docs.dhtmlx.com/gantt/samples/01_initialization/04_save_rest.html)
- [Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)

### Details

此方法会触发 [onLoadStart](api/event/onloadstart.md) 和 [onLoadEnd](api/event/onloadend.md) 事件。

:::note
请注意，该方法在 Node.js 版本的 Gantt 中不可用。
:::

### Related API
- [parse](api/method/parse.md)
- [onLoadStart](api/event/onloadstart.md)
- [onLoadEnd](api/event/onloadend.md)
- [onAjaxError](api/event/onajaxerror.md)

### Related Guides
- [Supported Data Formats](guides/supported-data-formats.md)
- [Data Loading](guides/loading.md)
- [Server-Side Integration](guides/server-side.md)
- [Dynamic Loading (on demand)](guides/dynamic-loading.md)