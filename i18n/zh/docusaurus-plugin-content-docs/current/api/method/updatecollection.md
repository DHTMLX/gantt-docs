---
sidebar_label: updateCollection
title: updateCollection method
description: "使用新的选项更新指定的 collection"
---

# updateCollection

### Description

@short: 使用新的选项更新指定的 collection

@signature: updateCollection: (collection: string | number, options: any[]) =\> boolean

### Parameters

- `collection` - (required) *string | number* -         要更新的 collection 名称
- `options` - (required) *array* - collection 的新值数组

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

- 此方法会触发 [onOptionsLoad](api/event/onoptionsload.md) 事件并刷新 lightbox。 
- Collections 可以通过 [serverList](api/method/serverlist.md) 方法初始创建。

## 示例

## #Select 控件

假设 lightbox 配置如下:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", map_to:"priority", type:"select", 
        options:gantt.serverList("priorities")},  /*!*/ 
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

在此配置下，可以通过名为 'priorities' 的 collection 更新 select 控件中的选项。<br>
更新 'priorities' collection，只需调用:
~~~js
gantt.updateCollection("priorities", new_priorities_array);
~~~

### Related API
- [serverList](api/method/serverlist.md)
- [onOptionsLoad](api/event/onoptionsload.md)

