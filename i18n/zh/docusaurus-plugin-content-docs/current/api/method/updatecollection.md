---
sidebar_label: updateCollection
title: updateCollection 方法
description: "使用新选项更新指定的集合"
---

# updateCollection

### Description

@short: 使用新选项更新指定的集合

@signature: updateCollection: (collection: string | number, options: any[]) =\> boolean

### Parameters

- `collection` - (required) *string | number* -         要更新的集合的名称
- `options` - (required) *array* -         集合的新值

### Returns
- ` collection` - (boolean) - 如果更新成功返回 true；如果未找到该 collection 返回 false

### Example

~~~jsx
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", height:22, map_to:"priority", type:"select", /*!*/
        options:gantt.serverList("priorities", values_array)},     /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.updateCollection("priorities", new_values_array); /*!*/
~~~

### Details

- 该方法会触发 [onOptionsLoad](api/event/onoptionsload.md) 事件并重置 lightbox。
- 该集合可以通过 [serverList](api/method/serverlist.md) 方法创建。

### Examples

#### Select control

让我们假设你有如下 lightbox：

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", map_to:"priority", type:"select", 
        options:gantt.serverList("priorities")},  /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

通过这样的声明，可以通过名为 'priorities' 的列表，在 select 控件中更新选项。 
要更新 'priorities' 列表，可以使用：
~~~js
gantt.updateCollection("priorities", new_priorities_array);
~~~

### Related API
- [serverList](api/method/serverlist.md)
- [onOptionsLoad](api/event/onoptionsload.md)