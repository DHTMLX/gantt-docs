Inline Editors Extension
========================

Read details about the Inline editors extension in the article desktop/inline_editing.md. <br> The *inlineEditors* object possesses the following API:

##Methods

###Actions:

- <span class=submethod>**startEdit (taskId, columnName): undefined**</span> - opens an editor in the <b>specified</b> task/cell, sets the mapped value and puts browser focus on the editor
	- **taskId** - (*number | string*) - the task ID
	- **columnName** - (*string*) - the column name
- <span class=submethod>**show (taskId, columnName): undefined**</span> - opens an empty editor in specified task/cell
	- **taskId** - (*number | string*) - the task ID
	- **columnName** - (*string*) - the column name
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
	- **name** - (*string*) - the name of the event handler
	- **handler** - (*Function*) - the function that will be called when the event fires
- <span class=submethod>**detachEvent (id): undefined**</span> - detaches a handler from an event (which was attached before by the attachEvent() method) 
	- **id** - (*string*) - the id of the attached event handler


###Navigation:

- <span class=submethod>**editNextCell (canChangeRow): undefined**</span> - saves the current editor and moves editor to the next cell 
	- **canChangeRow**  - (*boolean | undefined*) - parameter specifies whether it can move the editor to the first cell of the next row after the last cell of the current one
- <span class=submethod>**editNextRow (skipReadonly): undefined**</span> - saves the current editor and opens an editor in the same cell of the task below
    - **skipReadonly**  - (*boolean | undefined*) - parameter specifies whether it can skip the read-only task and open an editor in the cell of the first editable task. The default *false* state of the parameter closes the editor if the next task is read-only.
- <span class=submethod>**editPrevCell (canChangeRow): undefined**</span> - saves the current editor and moves editor to the previous cell 
	- **canChangeRow**  - (*boolean | undefined*) - parameter specifies whether it can move editor to the last cell of the row above after reaching the first cell of the current row
- <span class=submethod>**editPrevRow (skipReadonly): undefined**</span> - saves the current editor and opens an editor in the same cell of the task above
    - **skipReadonly**  - (*boolean | undefined*) - parameter specifies whether it can skip the read-only task and open an editor in the cell of the first editable task. The default *false* state of the parameter closes the editor if the previous task is read-only.
- <span class=submethod>**getFirstCell (): string**</span> - gets the name of the first editable column in the grid
- <span class=submethod>**getLastCell (): string**</span> - gets the name of the last editable column in the grid
- <span class=submethod>**getNextCell (direction): string | null**</span> - returns the name of the next editable column
	- **direction**  - (*number*) - parameter specifies in which direction it should iterate the following cell. `1` - right, `-1` - left.


###Helpers:

- <span class=submethod>**locateCell (node): object | null**</span> - checks whether a provided DOM element is a task cell object and returns an editor state object, if it is so: {id: taskId, columnName: columnName}
	- **node** - (*HTMLElement*) - the HTML element


###Mouse/Keyboard mapping:

- <span class=submethod>**setMapping (mapping): undefined**</span> - sets a mapping object
	- **mapping** - (*object*) - the HTML an object with the mapping configuration
- <span class=submethod>**getMapping (): object**</span> - returns a currently applied mapping object
<span></span>


##Events

### onBeforeEditStart <br><br>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onBeforeEditStart", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
   return true;
});
~~~

Arguments:

- state - the editor state object
	- id - the id of an edited task
	- columnName - the column name

### onEditStart <br><br>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditStart", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~

Arguments:

- state - the editor state object
	- id - the id of an edited task
	- columnName - the column name

### onBeforeSave 

fires when an editor is about to close and save changes

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

Arguments:

- state - the editor state object
	- id - the id of an edited task
	- columnName - the column name
	- oldValue - the initial value of the editor
	- newValue - the current value of the editor, can be modified

### onSave 

fires after a task has been updated from the editor

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

Arguments:

- state - the editor state object
	- id - the id of an edited task
	- columnName - the column name
	- oldValue - the initial value of the editor
	- newValue - the current value of the editor

### onEditEnd 

fires after an inline editor has been hidden

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditEnd", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~

Arguments:

- state - the editor state object
	- id - the id of an edited task
	- columnName - the column name
