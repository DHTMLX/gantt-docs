---
title: "键盘导航扩展"
sidebar_label: "键盘导航扩展"
---

# 键盘导航扩展


关于键盘导航扩展的更多信息，请参阅文章 [키보드 내비게이션](guides/keyboard-navigation.md)。


*keyboardNavigation* 对象提供以下 API:

## 方法


- <span class="submethod">**focus (config): void**</span> - 允许选择网格中的任意单元格。此方法仅在 Grid 已经获得焦点时有效。

    - **_config_** - (*object*) - 配置对象
        - **_id_** - (*number | string*) - 正在编辑的任务的 ID
        - **_column_** - (*string*) - 列名
        - **_type_** - (*string*) - 定义作用域类型。可选值包括:"gantt"、"taskRow"、"taskCell"、"headerCell"

~~~js
gantt.ext.keyboardNavigation.focus({type:"taskCell",id:"taskId",column:"columnName"});
~~~


**Related example:** [选择网格单元格](https://snippet.dhtmlx.com/v5ffah8w)


- <span class="submethod">**getActiveNode (): boolean | void**</span> - 获取当前活动单元格的信息

~~~js
var active_node = gantt.ext.keyboardNavigation.getActiveNode();
// -> {type: "taskCell", id: "10", column: "text"}
~~~


**Related example:** [获取活动单元格](https://snippet.dhtmlx.com/dznf7xjw)
