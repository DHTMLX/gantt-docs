Keyboard Navigation Extension
==========================

Read details about the Keyboard navigation extension in the article desktop/keyboard_navigation.md. <br>
The *keyboardNavigation* object possesses the following API:

Methods
----------

- <span class=submethod>**focus (config): undefined**</span> - allows selecting any cell in the grid. Works only if the Grid already has the focus

    - **_config_** - (*object*) - the config object
        - **_id_** - (*number | string*) - the id of an edited task
        - **_column_** - (*string*) - the column name
        - **_type_** - (*string*) - type of the scope. Possible values: "gantt", "taskRow", "taskCell", "headerCell"


~~~js
gantt.ext.keyboardNavigation.focus({type:"taskCell",id:"taskId",column:"columnName"});
~~~

{{editor 	https://snippet.dhtmlx.com/v5ffah8w		Selecting a grid cell}}

- <span class=submethod>**getActiveNode (): boolean | undefined**</span> - allows obtaining information about the active cell

~~~js
var active_node = gantt.ext.keyboardNavigation.getActiveNode();
// -> {type: "taskCell", id: "10", column: "text"}
~~~

{{editor	https://snippet.dhtmlx.com/dznf7xjw		Getting the active cell}}

@todo: check and improve