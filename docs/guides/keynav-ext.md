---
title: "Keyboard Navigation Extension"
sidebar_label: "Keyboard Navigation Extension"
---

# Keyboard Navigation Extension

Read details about the Keyboard navigation extension in the article [Keyboard Navigation](guides/keyboard-navigation.md). 


The *keyboardNavigation* object possesses the following API:

## Methods

- <span class="submethod">**focus (config): void**</span> - allows selecting any cell in the grid. Works only if the Grid already has the focus

    - **_config_** - (*object*) - the config object
        - **_id_** - (*number | string*) - the id of an edited task
        - **_column_** - (*string*) - the column name
        - **_type_** - (*string*) - type of the scope. Possible values: "gantt", "taskRow", "taskCell", "headerCell"


~~~js
gantt.ext.keyboardNavigation.focus({type:"taskCell",id:"taskId",column:"columnName"});
~~~

**Related sample** [Selecting a grid cell](https://snippet.dhtmlx.com/v5ffah8w)

- <span class="submethod">**getActiveNode (): boolean | void**</span> - allows obtaining information about the active cell

~~~js
var active_node = gantt.ext.keyboardNavigation.getActiveNode();
// -> {type: "taskCell", id: "10", column: "text"}
~~~

**Related sample** [Getting the active cell](https://snippet.dhtmlx.com/dznf7xjw)
