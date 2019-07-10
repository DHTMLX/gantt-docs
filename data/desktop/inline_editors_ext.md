Inline Editors Extension
========================

The *inlineEditors* object possesses the following API:

##Methods

###Actions:

- **startEdit(taskId,columnName)** - opens an editor in the specified task/cell, sets the mapped value and puts browser focus on the editor
- **show(taskId,columnName)** - opens an empty editor in specified task/cell
- **setValue()** - populates an opened editor with values from the task
- **save()** - saves changes and hides an editor
- **hide()** - hides an editor without saving changes
- **focus()** - puts browser focus on the editor 
- **getState()** - gets the state object {id: taskId, columnName: columnName}
- **getValue()** - gets the current value of the editor

###State: 

- **isChanged()** - checks whether the current value of the editor differs from the initial value
- **isVisible()** - checks whether the editor is opened

###Events:

- **attachEvent(name,handler)** - attaches an event handler to inlineEditors object
- **detachEvent(id)** - detaches a handler from an event (which was attached before by the attachEvent() method) 

###Navigation:

- **editNextCell(canChangeRow)** - saves the current editor and moves editor to the next cell 
	- `canChangeRow` parameter specifies whether it can move the editor to the first cell of the next row after the last cell of the current one
- **editNextRow()** - saves the current editor and opens an editor in the same cell of the task below
- **editPrevCell(canChangeRow)** - saves the current editor and moves editor to the previous cell 
	- `canChangeRow` parameter specifies whether it can move editor to the last cell of the row above after reaching the first cell of the current row
- **editPrevRow()** - saves the current editor and opens an editor in the same cell of the task above
- **getFirstCell()** - gets the name of the first editable column in the grid
- **getLastCell()** - gets the name of the last editable column in the grid
- **getNextCell(direction)** - returns the name of the next editable column

###Helpers:

- **locateCell(node)** - checks whether a provided DOM element is a task cell object and returns an editor state object, if it is so: {id: taskId, columnName: columnName}

###Mouse/Keyboard mapping:

- **setMapping(mapping)** - sets a mapping object
- **getMapping()** - returns a currently applied mapping object

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
    