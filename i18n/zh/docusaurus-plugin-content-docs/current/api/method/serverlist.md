---
sidebar_label: serverList
title: serverList method
description: "返回一个选项列表"
---

# serverList

### Description

@short: 返回一个选项列表

@signature: serverList: (list_name: string | number, options?: any[]) =\> any[]

### Parameters

- `list_name` - (required) *string | number* -         列表的名称
- `options` - (optional) *array* - 包含选项的数组

### Returns
- ` list` - (array) - 一个选项数组

### Example

~~~jsx
// 获取名为 'my_list' 的选项列表
var list = gantt.serverList("my_list"); 
...
// 创建并返回一个包含指定选项的列表
var list = gantt.serverList("options", [
    {key: 1, label: "John"},
    {key: 2, label: "Adam"},
    {key: 3, label: "Diane"}
]);
~~~

### Details

- 仅传入第一个参数时，方法返回匹配该名称的列表（如果存在）。
- 传入两个参数时，dhtmlxGantt 会创建一个具有指定名称和选项的列表。
如果同名列表已存在，其数据将被更新。
- [Lightbox select 控件](guides/select.md) 可以通过 *gantt.serverList* 自动填充。
当以两个参数调用时，dhtmlxGantt 会相应地创建或更新列表。

这种方式方便通过管理命名列表来更新类似 select 选项的集合。

~~~js
// 该配置允许从名为 'persons' 的列表加载选项
gantt.config.lightbox.sections=[   
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"persons", height:23, type:"select", 
    options:serverList("persons", persons_array), map_to:"section_id" }
]; 
~~~

### Related API
- [updateCollection](api/method/updatecollection.md)

