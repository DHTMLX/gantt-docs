---
sidebar_label: groupBy
title: groupBy method
description: "基于特定任务属性组织任务"
---

# groupBy
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 基于特定任务属性组织任务

@signature: groupBy: (config: GroupConfig | boolean) =\> void

### Parameters

- `config` - (required) *GroupConfig | boolean* -       分组配置对象，或设置为 false 以取消分组

### Example

~~~jsx
// 单层分组
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
    ],
    group_id: "key",
    group_text: "label",
    save_tree_structure: true
});

// 多层分组
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
        // 嵌套分组
        {key:1, label: "Give High Attention", "priority":0},
        {key:2, label: "Resolve Immediately", "priority":0},
        {key:3, label: "Keep For Next Release", "priority":5}
    ],
    group_id: "key",
    group_text: "label"
});

// 使用预定义集合
gantt.serverList("priority", [
    {key:1, label: "High"},
    {key:2, label: "Normal"},
    {key:3, label: "Low"}
]);
gantt.groupBy({
    groups: gantt.serverList("priority"),
    relation_property: "priority",
    group_id: "key",
    group_text: "label"
});

// 取消分组
gantt.groupBy(false);
~~~

### Related samples
- [Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)

### Details

:::note
 此方法属于 **grouping** 扩展，因此必须启用 [grouping](guides/extensions-list.md#renwufenzu) 插件。更多详情请参见 [任务分组](guides/grouping.md) 文章。 
:::

分组配置对象包含以下属性:

- **relation_property** - (*string*) - 用于分组的任务属性。
- **groups** - (*СollectionItem[]*) - 分组（汇总）项数组。每个项应包含由 **group_id** 和 **group_text** 指定的属性（默认是 *key* 和 *label*）。
- **group_id?** - (*string*) - 可选，分组的标识符。默认值为 'key'。
- **group_text?** - (*string*) - 可选，分组的标签。默认值为 'label'。
- **delimiter?** - (*string*) - 可选，用于自动为拥有多个资源的任务创建分组。默认值为 ","。
- **default_group_label?** - (*string*) - 可选，默认分组的标签。默认值为 'None'。
- **save_tree_structure?** - (*boolean*) - 可选，决定 Gantt 是否在分组内保持原始树状结构。如果省略或设置为 *false*，任务将以扁平列表显示。

请注意:

- 每个分组对象必须至少包含两个属性:一个 id 和一个文本标签，分别由 'group_id' 和 'group_text' 定义。默认情况下，这两个属性分别是 *key* 和 *label*。你可以使用除 "id" 以外的其他名称，只要它们存在于分组数组中即可。  
:::note
 不能使用 "id" 属性，因为 Gantt 会创建虚拟分组任务，并向它们插入 'group_id' 和 'group_text' 属性。这意味着默认情况下，分组任务将拥有 'key' 和 'value' 属性。由于每个任务已经有一个 'id' 属性，改变这些默认 id 可能会破坏树结构。 
:::
- 原始的 'project' 任务不会在分组模式下显示，但仍可通过 API 访问。
- 分组项作为 'project' 类型任务添加，并设置了 'readonly' 标志。它们可以通过 '$virtual' 属性识别，并可像普通任务一样处理:

~~~js
gantt.templates.task_class=function(start, end, task){
  if(task.$virtual)
    return "summary-bar";
};
~~~

- 默认分组包含未分配到其他分组的任务。它排除具有以 <i>string|number</i> 形式指定的 **relation_property** 的任务。<br>
 :::note
sample [Save tree structure when grouping tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html) 
:::

### Related Guides
- [任务分组](guides/grouping.md)

### Change log
- **save_tree_structure** 选项在 v8.0 中引入
