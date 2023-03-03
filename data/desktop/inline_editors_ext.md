Inline Editors Extension
========================

Read details about the Inline editors extension in the article desktop/inline_editing.md. <br> The *inlineEditors* object possesses the following API:

##Methods

###Actions:

- <span class=submethod>**startEdit (taskId, columnName): undefined**</span> - opens an editor in the specified task/cell, sets the mapped value and puts browser focus on the editor
    - **_taskId_** - (*number | string*) - the task ID
    - **_columnName_** - (*string*) - the column name
- <span class=submethod>**show (taskId, columnName): undefined**</span> - opens an empty editor in specified task/cell
    - **_taskId_** - (*number | string*) - the task ID
    - **_columnName_** - (*string*) - the column name
- <span class=submethod>**setValue (): undefined**</span> - populates an opened editor with values from the task
- <span class=submethod>**save (): undefined**</span> - saves changes and hides an editor
- <span class=submethod>**hide (): undefined**</span> - hides an editor without saving changes
- <span class=submethod>**focus (): undefined**</span> - puts browser focus on the editor 
- <span class=submethod>**getState (): object**</span> - gets the state object {id: taskId, columnName: columnName, placeholder: HTMLElement}
- <span class=submethod>**getValue (): string**</span> - gets the current value of the editor

###State: 

- <span class=submethod>**isChanged (): boolean**</span> - checks whether the current value of the editor differs from the initial value
- <span class=submethod>**isVisible (): boolean**</span> - checks whether the editor is opened

###Events:

- <span class=submethod>**attachEvent (name, handler): boolean**</span> - attaches an event handler to inlineEditors object
    - **_name_** - (*string*) - the name of the event handler
    - **_handler_** - (*Function*) - the function that will be called when the event fires
- <span class=submethod>**detachEvent (id): undefined**</span> - detaches a handler from an event (which was attached before by the attachEvent() method) 
    - **_id_** - (*string*) - the id of the attached event handler


###Navigation:

- <span class=submethod>**editNextCell (canChangeRow): undefined**</span> - saves the current editor and moves editor to the next cell 
    - **_canChangeRow?_**  - (*boolean*) - the parameter specifies whether it can move the editor to the first cell of the next row after the last cell of the current one
- <span class=submethod>**editNextRow (skipReadonly): undefined**</span> - saves the current editor and opens an editor in the same cell of the task below
    - **_skipReadonly?_**  - (*boolean*) - the parameter specifies whether it can skip the read-only task and open an editor in the cell of the first editable task. The default *false* state of the parameter closes the editor if the next task is read-only.
- <span class=submethod>**editPrevCell (canChangeRow): undefined**</span> - saves the current editor and moves editor to the previous cell 
    - **_canChangeRow?_**  - (*boolean*) - the parameter specifies whether it can move editor to the last cell of the row above after reaching the first cell of the current row
- <span class=submethod>**editPrevRow (skipReadonly): undefined**</span> - saves the current editor and opens an editor in the same cell of the task above
    - **_skipReadonly?_**  - (*boolean*) - the parameter specifies whether it can skip the read-only task and open an editor in the cell of the first editable task. The default *false* state of the parameter closes the editor if the previous task is read-only.
- <span class=submethod>**getFirstCell (): string**</span> - gets the name of the first editable column in the grid
- <span class=submethod>**getLastCell (): string**</span> - gets the name of the last editable column in the grid
- <span class=submethod>**getNextCell (direction): string | null**</span> - returns the name of the next editable column
    - **_direction_**  - (*number*) - the parameter specifies in which direction it should iterate the following cell. `1` - right, `-1` - left.


###Helpers:

- <span class=submethod>**locateCell (node): object | null**</span> - checks whether a provided DOM element is a task cell object and returns an editor state object, if it is so: {id: taskId, columnName: columnName}
    - **_node_** - (*HTMLElement*) - the HTML element


###Mouse/Keyboard mapping:

- <span class=submethod>**setMapping (mapping): undefined**</span> - sets a mapping object
    - **_mapping_** - (*object*) - an object with the mapping configuration:
        - **_init_** - (*Function*) - the method to initialize mapping
        - **_onShow_** - (*Function*) - the method that will be called when the inline editor is opened
        - **_onHide_** - (*Function*) - the method that will be called when the inline editor is closed
        - **_destroy_** - (*Function*) - the method to destroy mapping
- <span class=submethod>**getMapping (): object**</span> - returns a currently applied mapping object


##Events

### <span class=eventname>onBeforeEditStart</span>

Arguments:
<span class=eventarguments>

- **_state_** - (*object*) - the editor state object
	- **_id_** - (*number | string*) - the id of an edited task
	- **_columnName_** - (*string*) - the column name
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onBeforeEditStart", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
   return true;
});
~~~

### <span class=eventname>onEditStart</span>

Arguments:
<span class=eventarguments>

- **_state_** - (*object*) - the editor state object
	- **_id_** - (*number | string*) - the id of an edited task
	- **_columnName_** - (*string*) - the column name
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditStart", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~

### <span class=eventname>onBeforeSave</span>

fires when an editor is about to close and save changes

Arguments:
<span class=eventarguments>

- **_state_** - (*object*) - the editor state object
	- **_id_** - (*number | string*) - the id of an edited task
	- **_columnName_** - (*string*) - the column name
	- **_oldValue_** - (*any*) - the initial value of the editor
	- **_newValue_** - (*any*) - the current value of the editor, can be modified
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onBeforeSave", function(state){
   console.log(state);
   // -> { id: itemId, 
   //      columnName: columnName, 
   //      oldValue: value, 
   //      newValue: value
   //    };
   return true;
});
~~~

### <span class=eventname>onSave</span>

fires after a task has been updated from the editor

Arguments:
<span class=eventarguments>

- **_state_** - (*object*) - the editor state object
	- **_id_** - (*number | string*) - the id of an edited task
	- **_columnName_** - (*string*) - the column name
	- **_oldValue_** - (*any*) - the initial value of the editor
	- **_newValue_** - (*any*) - the current value of the editor
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onSave", function(state){
   console.log(state);
   // -> { id: itemId, 
   //      columnName: columnName, 
   //      oldValue: value, 
   //      newValue: value
   //    };
});
~~~

### <span class=eventname>onEditEnd</span>

fires after an inline editor has been hidden


Arguments:
<span class=eventarguments>

- **_state_** - (*object*) - the editor state object
	- **_id_** - (*number | string*) - the id of an edited task
	- **_columnName_** - (*string*) - the column name
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditEnd", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~
