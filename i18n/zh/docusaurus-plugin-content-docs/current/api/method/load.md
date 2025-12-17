---
sidebar_label: load
title: load method
description: "从外部源加载数据到甘特图中。"
---

# load

### Description

@short: 从外部源加载数据到甘特图中。

@signature: load: (url: string, type?: string, callback?: GanttCallback) =\> any

### Parameters

- `url` - (required) *string* - 服务器端的URL（可以是静态文件或返回数据的服务器端脚本）。
- `type` - (optional) *string* - <i>('json', 'xml', 'oldxml')</i> 数据格式。默认值为 <i>'json'</i>。
- `callback` - (optional) *function* - 加载完成后调用的函数。

### Returns
- ` resultPromise` - (object) - 一个在AJAX请求完成时解析的promise对象。

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

请注意，该方法不支持Node.js版本的甘特图。
 
:::

### Related API
- [parse](api/method/parse.md)
- [onLoadStart](api/event/onloadstart.md)
- [onLoadEnd](api/event/onloadend.md)
- [onAjaxError](api/event/onajaxerror.md)

### Related Guides
- [支持的数据格式](guides/supported-data-formats.md)
- [数据加载](guides/loading.md)
- [服务器端集成](guides/server-side.md)
- [动态加载（按需加载）](guides/dynamic-loading.md)

