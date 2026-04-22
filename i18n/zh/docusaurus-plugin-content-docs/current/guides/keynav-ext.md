---
title: "键盘导航扩展"
sidebar_label: "键盘导航扩展"
---

# 键盘导航扩展

请参阅文章 [键盘导航](guides/keyboard-navigation.md) 了解关于键盘导航扩展的详细信息。

The *keyboardNavigation* 对象具备以下 API：

## 方法

- <span class="submethod">**focus (config): void**</span> - 允许在网格中选择任意单元格。仅当 Grid 已获得焦点时才起作用

    - **_config_** - (*object*) - 配置对象
        - **_id_** - (*number | string*) - 编辑任务的 id
        - **_column_** - (*string*) - 列名
        - **_type_** - (*string*) - 范围类型。可选值： "gantt", "taskRow", "taskCell", "headerCell"

~~~js
gantt.ext.keyboardNavigation.focus({type:"taskCell",id:"taskId",column:"columnName"});
~~~

**相关示例** [选择网格单元格](https://snippet.dhtmlx.com/v5ffah8w)

- <span class="submethod">**getActiveNode (): boolean | void**</span> - 允许获取活动单元格的信息

~~~js
var active_node = gantt.ext.keyboardNavigation.getActiveNode();
// -> {type: "taskCell", id: "10", column: "text"}
~~~

**相关示例** [获取活动单元格](https://snippet.dhtmlx.com/dznf7xjw)