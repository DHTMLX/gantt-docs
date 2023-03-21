Inline Editing in Grid
======================

dhtmlxGantt provides two options for editing the content:

- with the help of the [Lightbox](desktop/default_edit_form.md) edit form
- by using inline editors in the Grid area

Inline editing lets you make any changes right through the grid: create and update tasks, set connections between them, define the start and end dates, or modify the duration - all via the built-in editors.

![Inline grid editing](desktop/inline_grid_editing.png)

To enable inline editing, you need to:

- specify the list of editors configurations and use the **map_to** property of an editor object to map the necessary editor to a grid column

~~~js
var textEditor = {type: "text", map_to: "text"};
var dateEditor = {type: "date", map_to: "start_date", min: new Date(2018, 0, 1), 
	max: new Date(2019, 0, 1)};
var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};
~~~

- in the column configuration use the **editor** property to define the editor that should be used in the column

~~~js
gantt.config.columns = [
	{name: "text", tree: true, width: '*', resize: true, editor: textEditor},
	{name: "start_date", align: "center", resize: true, editor: dateEditor},
	{name: "duration", align: "center", editor: durationEditor},
	{name: "add", width: 44}
];
~~~

{{sample  07_grid/11_inline_edit_basic.html}}

{{note Read details about the *inlineEditors* object API in the desktop/inline_editors_ext.md article.}}

You can take a look at the video guide that shows how to implement inline editing in the grid.

<iframe width="704" height="400" src="https://www.youtube.com/embed/0rIPrC0GtME" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Types of editors
------------------

The inline editors are stored in the api/gantt_editor_types_config.md configuration object.

There are several predefined inline editors:

- **text** editor - for editing text columns, e.g. task name
- **number** editor - for editing number columns, e.g. task duration, order, etc.
- **date** editor - for editing date columns, e.g. start and end dates of the task
- **select** editor - for choosing an option from a list
- **predecessor** editor - for setting task-predecessor for the currently edited task. This editor gets the [WBS codes of tasks](desktop/specifying_columns.md#wbscode) to set connection with the predecessor task.

~~~js
var editors = {
	text: {type: "text", map_to: "text"},
	start_date: {type: "date", map_to: "start_date", min: new Date(2018, 0, 1), 
    	max: new Date(2019, 0, 1)},
	end_date: {type: "date", map_to: "end_date", min: new Date(2018, 0, 1), 
    	max: new Date(2019, 0, 1)},
	duration: {type: "number", map_to: "duration", min:0, max: 100},
	priority: {type:"select", map_to:"priority", options:gantt.serverList("priority")},
	predecessors: {type: "predecessor", map_to: "auto"}
};
~~~


<h3 id="dateslimits">Dates limits in the Date editor</h3>

Starting from v6.3, there are no default limits to minimal and maximal input values of **date** inline editors.

In case you want the dates visible on the time scale to limit the minimal and maximal values of the **date** inline editor (unless custom min/max values are provided), you can specify dynamic **min/max** values:

~~~js
const dateEditor = {type: "date", map_to: "start_date", 
    min: function(taskId){
      return gantt.getState().min_date
    },
    max: function( taskId ){
      return gantt.getState().max_date
    }
};
~~~

<h3 id="inclusiveenddate">Editor for inclusive end dates</h3>

If you are using the [format for inclusive end dates](api/gantt_task_end_date_template.md) of tasks and want to make it work correctly with inline editing in the grid, you have to create a special editor for editing inclusive end dates of tasks, as in:

~~~js
// inclusive editor for end dates
// use the default editor, but override the set_value/get_value methods
var dateEditor = gantt.config.editor_types.date;
gantt.config.editor_types.end_date = gantt.mixin({
   set_value: function(value, id, column, node){
        var correctedValue = gantt.date.add(value, -1, "day");
        return dateEditor.set_value.apply(this, [correctedValue, id, column, node]);
   },
   get_value: function(id, column, node) {
        var selectedValue = dateEditor.get_value.apply(this, [id, column, node]);
        return gantt.date.add(selectedValue, 1, "day");
   },
}, dateEditor);

var textEditor = {type: "text", map_to: "text"};
var startDateEditor = {type: "date", map_to: "start_date"};
var endDateEditor = {type: "end_date", map_to: "end_date"};
var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};

gantt.config.columns = [
    {name: "text", label: "Name", tree: true, width: 200, editor: textEditor, 
        resize: true},
    {name: "duration", label: "Duration", width:80, align: "center", 
        editor: durationEditor, resize: true},
    {name: "start_date", label: "Start", width:140, align: "center", 
        editor: startDateEditor, resize: true},
    {name: "end_date", label: "Finish", width:140, align: "center", 
        editor: endDateEditor, resize: true}
];

// change lightbox and grid templates to display dates of tasks in an inclusive format
gantt.templates.task_end_date = function(date){
    return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};


var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
    if(column === "end_date"){
        return gridDateToStr(new Date(date.valueOf() - 1)); 
    }else{
        return gridDateToStr(date); 
    }
}
~~~

{{editor	https://snippet.dhtmlx.com/5/b9a3d78bc	Inclusive end date editor}}

For more details on formatting end dates, see the [Task end date display & Inclusive end dates](desktop/loading.md#taskenddatedisplayampinclusiveenddates) article.

<h3 id="linkformatter">Formatting values of the Predecessor editor</h3>

{{pronote This functionality is available in the PRO edition only.}}

Starting from v6.3 Gantt allows specifying types of links as well as lag/lead values directly from inline editor. 

In order to do so, you need to use the [Link Formatter](desktop/formatters_ext.md#linkformatter) module and provide an instance of the *LinksFormatter* into the **predecessor** editor:

~~~js
var formatter = gantt.ext.formatters.durationFormatter({
    enter: "day", 
    store: "day", 
    format: "auto"
});
var linksFormatter = gantt.ext.formatters.linkFormatter({durationFormatter: formatter});
 
var editors = {
    text: {type: "text", map_to: "text"},
    start_date: {type: "date", map_to: "start_date", 
                min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)},
    end_date: {type: "date", map_to: "end_date", 
                min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)},
    duration: {type: "duration", map_to: "duration", 
                min:0, max: 100, formatter: formatter},
    priority: {type: "select", map_to: "priority", 
                options:gantt.serverList("priority")},
    predecessors: {type: "predecessor", map_to: "auto", formatter: linksFormatter} /*!*/
};
 
gantt.config.columns = [
    {name: "wbs", label: "#", width: 60, align: "center", template: gantt.getWBSCode},
    {name: "text", label: "Name", tree: true, width: 200, editor: editors.text, 
        resize: true},
    {name: "start_date", label: "Start", width:80, align: "center", 
      editor: editors.start_date, resize: true},
    {name: "predecessors", label: "Predecessors",width:80, align: "left", 
      editor: editors.predecessors, resize: true, template: function(task){
            var links = task.$target;
            var labels = [];
            for(var i = 0; i < links.length; i++){
                var link = gantt.getLink(links[i]);
                labels.push(linksFormatter.format(link)); /*!*/
            }
            return labels.join(", ")
        }},
    {name:"add"}
];
~~~

{{sample 07_grid/12_inline_edit_key_nav.html}}

The section below provides you with code samples for the following custom editors:

- [Simple numeric input](desktop/inline_editing.md#custominlineeditor)
- [JQuery Datepicker input](desktop/inline_editing.md#jquery_datepicker)

Custom inline editor
-----------------------

You can also specify a custom inline editor. For this, you need to create a new editor object in the following way:

~~~js
gantt.config.editor_types.custom_editor = {
  show: function (id, column, config, placeholder) {
    // called when input is displayed, put html markup of the editor into placeholder 
    // and initialize your editor if needed:
    var html = "<div><input type='text' name='" + column.name + "'></div>";
   	placeholder.innerHTML = html;
  },
  hide: function () {
    // called when input is hidden 
    // destroy any complex editors or detach event listeners from here
  },
  
  set_value: function (value, id, column, node) {
    // set input value
  },
  
  get_value: function (id, column, node) {
    // return input value
  },
  
  is_changed: function (value, id, column, node) {
    //called before save/close. Return true if new value differs from the original one
    //returning true will trigger saving changes, returning false will skip saving 
  },
  
  is_valid: function (value, id, column, node) {
    // validate, changes will be discarded if the method returns false
    return true/false;
  },

  save: function (id, column, node) {
     // only for inputs with map_to:auto. complex save behavior goes here
  },
  focus: function (node) {
  }
}
~~~

There are some key points to remember in order to implement a reusable editor:

- As a rule, **`get_value`** does not modify the task object. The method only returns the current value of the inline editor. If the value is deemed valid, Gantt will automatically update the related task with this value.
- Use the **`map_to`** configuration option of the editor to specify which property of the task should be updated by the editor, but don't hardcode it into the editor. This way allows you to reuse the editor for different columns.
- Unless you use a complex javascript widget, you don't need to specify any logic in the **`hide`** function, so you can leave it empty. Otherwise, use this method to call a destructor or to clean up any of event handlers you've attached when displaying the editor.
- Make sure to implement the **`is_changed`** and **`is_valid`** functions: 
  - If **`is_changed`** always returns *true*, the editor will trigger the update (which can be sent to the backend) each time the editor is closed. This method should return *true* only if the input value was actually changed in comparison to the initial state; 
  - **`is_valid`** is used for preventing input of invalid values.
- If you're implementing an editor that makes something more complex than writing a value to a property of a task - a good example is the built-in [predecessor editor](desktop/inline_editing.md#typesofeditors) - you need to implement a required logic in the **`save`** function and specify the **`map_to`** option of the input to *"auto"*. In this case, the gantt won't modify the task object, but instead will call the **`save`** function when it's time to apply the changes made to the editor.

Here is an example of the implementation of a simple number input.
Note, that the **`hide`** method can be an empty function, and the **`save`** method can be skipped completely.

~~~js
var getInput = function(node){
	return node.querySelector("input");
};

gantt.config.editor_types.simpleNumber = {
    show: function (id, column, config, placeholder) {
        var min = config.min || 0,
        max = config.max || 100;

        var html = "<div><input type='number' min='" + min + 
                      "' max='" + max + "' name='" + column.name + "'></div>";
        placeholder.innerHTML = html;
    },
    hide: function () {
      // can be empty since we don't have anything to clean up after the editor 
          // is detached
    },
    set_value: function (value, id, column, node) {
        getInput(node).value = value;
    },
    get_value: function (id, column, node) {
        return getInput(node).value || 0;
    },
    is_changed: function (value, id, column, node) {
        var currentValue = this.get_value(id, column, node);
        return Number(value) !== Number(currentValue);
    },
    is_valid: function (value, id, column, node) {
        return !isNaN(parseInt(value, 10));
    },
    focus: function (node) {
        var input = getInput(node);
        if (!input) {
            return;
        }
        if (input.focus) {
            input.focus();
        }

        if (input.select) {
          input.select();
        }
    }
};
~~~

After that, you can use the editor in the same way as built-in editors:

~~~js
var numberEditor = {type: "simpleNumber", map_to: "quantity", min:0, max: 50}; 

gantt.config.columns = [
    ...
    {name: "quantity", label: "Quantity", width: 80, editor: numberEditor, 
        resize: true},
    ...
];
~~~

Note, that we don't need to implement the **`hide`** method in this case, since Gantt detaches the DOM element of the editor automatically and there is nothing else that we need to clean up after the editor closes.

<h3 id="jquery_datepicker">editor.hide</h3>

You may need to add a **`hide`** logic if you use a complex widget inside an inline editor.

For example, let's consider the following implementation of the DatePicker input using the jQuery one.
In this case we need to destroy the date picker widget after it's detached from DOM.

Prerequisites:

~~~js
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
~~~

Editor:

~~~js
gantt.config.editor_types.custom_datepicker_editor = {
    show: function (id, column, config, placeholder) {
        placeholder.innerHTML = "<div><input type='text' id='datepicker' name='" + 
                                  column.name + "'></div>";
        $("#datepicker").datepicker({
            dateFormat: "yy-mm-dd",
            onSelect: function(dateStr){
                gantt.ext.inlineEditors.save()
            }
        });
    },
    hide: function (node) {
        $("#datepicker").datepicker( "destroy" );
    },

    set_value: function (value, id, column, node) {
        $("#datepicker").datepicker("setDate", value);
    },

    get_value: function (id, column, node) {
        return $("#datepicker").datepicker( "getDate" );
    },

    is_changed: function (value, id, column, node) {
        return (+$("#datepicker").datepicker( "getDate" ) !== +value);
    },
    is_valid: function (value, id, column, node) {
        return !(isNaN(+$("#datepicker").datepicker( "getDate" )))
    },
    save: function (id, column, node) {
    },
    focus: function (node) {
    }
};

let dateEditor = {
    type: "custom_datepicker_editor",
    map_to: "start_date"
};

gantt.config.columns = [
    {name: "text", tree: true, width: '*', resize: true},
    {name: "start_date", align: "center", resize: true, editor: dateEditor},
    {name: "duration", align: "center"},
    {name: "add", width: 44}
];
~~~

{{editor	https://plnkr.co/edit/U3vHJvleRBJ1Js0N?preview	Using jQuery Datepicker in the editor}}

### editor.save

You need to make use of the **`save`** function only when your editor needs to modify multiple properties of the task at once, or if you want it to modify objects different from tasks.

In this case, you can keep a proper implementation of **`get_value`** for the sake of built-in validation, but the gantt itself won't try to apply the value of the editor to the task and will call the **`save`** function instead.

After **`save`** is called, you need to interpret the input values and apply changes to the gantt with a custom code.
Gantt will call the [onSave](desktop/inline_editors_ext.md#events) event after the **`save`** method is completed, but won't call [gantt.updateTask](api/gantt_updatetask.md) for the modified row.

**Note!** The **`save`** method will be called only if you specify **`map_to:"auto"`** in the configuration of the editor:

~~~js
var editors = {
    ...
    predecessors: {type: "predecessor", map_to: "auto"}
};
~~~

A good example of such a control is a built-in predecessor editor. You can find its simplified implementation in the related sample:

{{editor	https://snippet.dhtmlx.com/5/bf98a4228	Built-in predecessor editor}}


Inline editing modes
-----------------------

###Basic inline editing 

This mode presupposes the use of a mouse pointer for setting focus on cells and hotkeys that allow navigating the cells: 

- Tab - to move focus to the next editor
- Shift+Tab - to return to the previous editor.

{{sample 07_grid/11_inline_edit_basic.html}}

###Keyboard navigation mode

In this mode keyboard is used both for navigating and editing grid cells with the help of the predefined keys or keys combinations.

- Enter - to open/close the editor
- Space bar - to open the editor
- Arrow keys - to navigate grid cells
- Shift+Right Arrow Key - to move a task right, i.e. to make a nested task, while the above task becomes a project
- Shift+Left Arrow Key - to turn a project into a simple task
- Shift+Up Arrow Key - to collapse a branch with tasks
- Shift+Down Arrow Key - to expand a branch with tasks
 
To enable keyboard navigation for editing, you need to:

- enable the **keyboard_navigation** plugin using the [gantt.plugins](api/gantt_plugins.md) method.

~~~js
gantt.plugins({
	keyboard_navigation: true
});
~~~

- enable [keyboard navigation](desktop/keyboard_navigation.md) and navigation by cells:

~~~js
gantt.config.keyboard_navigation = true;
gantt.config.keyboard_navigation_cells = true;
~~~

Additionally, you can activate a [placeholder row](api/gantt_placeholder_task_config.md), an empty row displayed at the end of the list of tasks. Your end user can edit it to add new tasks into gantt.

~~~js
gantt.config.placeholder_task = true;
~~~

Alternatively, if you want the focus to move to the placeholder task after adding of a new task, use the following configuration:

~~~js
gantt.config.placeholder_task = {
    focusOnCreate: true
};
~~~

If needed, you can also add [automatic detection of the types of tasks](api/gantt_auto_types_config.md):

~~~js
gantt.config.auto_types = true;
~~~


{{sample 07_grid/12_inline_edit_key_nav.html}}

###Custom inline editing

You can also provide custom keyboard mapping, i.e. describe the logic of editors opening by a user, specify handlers of editor-related events (opening, closing of editors, start and end of editing, etc.)
in a separate object and then pass this object to the special method that will apply your mapping scheme:

~~~js
var mapping = {
 init: function(inlineEditors){
  // inlineEditor module is initialized
  // add global listeners for starting/ending editing
 },

 onShow: function(inlineEditors, node){
  // the editor is displayed
 },

 onHide: function(inlineEditors, node){
  // the editor is hidden
  // clean the onShow changes if needed
 }
};

gantt.ext.inlineEditors.setMapping(mapping);
~~~

{{sample 07_grid/13_custom_mapping.html}}

### Custom mapping for placeholder task

Let's imagine that you use keyboard navigation, inline editors and a placeholder task in your gantt and consider two real-life scenarios.

**Scenario 1**. When you type the name for a new placeholder task and then press Tab, you expect Gantt to open the next cell for this task. Instead, Gantt moves focus to the new placeholder task below and doesn't open the inline editor.

**Scenario 2**. If you type the name for a new placeholder task and then click on the next cell, Gantt moves focus to the next placeholder task instead of moving it to the cell you've clicked on.

Custom mapping will help you to deal with the problems described above.  You just need to specify the logic of how the inline editor must handle the mouse and keyboard clicks. Check the example:

{{editor	https://snippet.dhtmlx.com/xcgiommu	Gantt. Custom mapping for placeholder task
}}

Validation of input values
-------------------------------

You can make mistakes while editing a cell in Grid. 

To avoid saving of incorrect values you need to validate the input values before closing an editor. It can be implemented in one of two ways:

-	via  the **is_valid** method  of the [custom editor object](desktop/inline_editing.md#custominlineeditor)
-	via the **onBeforeSave** event of  the [inlineEditors object](desktop/inline_editors_ext.md)  

Let’s consider behavior of the editor when validation is enabled.

For example, you have opened the editor in a Grid cell via a mouse pointer. The following approach will be applied for your further action: 

- Pressing Escape after editing a cell will close the editor without saving any changes. 
- Pressing Enter will confirm and close the editor if the value is valid, otherwise the input value will be discarded.
- Pressing Tab or using a mouse pointer while editing a cell will save the valid value and move focus to another cell, whereas the invalid value will be reset and the editor will be closed. 


{{note For information about how to perform validation on the client side or on the server side, see the desktop/validation.md article.}}

###Preventing editor from closing

When validation of editors is enabled Gantt does not save incorrect input values but resets them and closes the editor. So you need to open the cell and to change the values again. 

A good way for preventing the editor from closing is to pop up an alert box that gives a user the opportunity to fix the incorrect value. For this purpose you need to use custom keyboard mapping, as in:

~~~js
function editAnotherCell(inlineEditors){
  var value = inlineEditors.getValue();
  if(confirm(`does '${value}' look ok to you?`)){
    inlineEditors.save();
  }
}

var mapping = {
  init: function(inlineEditors){
    gantt.attachEvent("onTaskClick", function (id, e) {
      var cell = inlineEditors.locateCell(e.target);
      if (cell && inlineEditors.getEditorConfig(cell.columnName)) {
        if (inlineEditors.isVisible()) edit_another_cell(inlineEditors)
        else inlineEditors.startEdit(cell.id, cell.columnName);
        return false;
      }
      return true;
    });
    gantt.attachEvent("onEmptyClick", function () {
      inlineEditors.hide();
      return true;
    });
  },

  onShow: function(inlineEditors, node){

    node.onkeydown = function (e) {
      e = e || window.event;
      if(e.defaultPrevented){
        return;
      }

      var keyboard = gantt.constants.KEY_CODES;

      var shouldPrevent = true;
      switch (e.keyCode) {
        case gantt.keys.edit_save:
          var value = inlineEditors.getValue();
          if(confirm(`does '${value}' look ok to you?`)){
            inlineEditors.save();
          }
          
          break;
        case gantt.keys.edit_cancel:
          inlineEditors.hide();
          break;
        case keyboard.TAB:
          if(e.shiftKey){
            if (inlineEditors.isVisible()) editAnotherCell(inlineEditors)
            else inlineEditors.editPrevCell(true);
          }else{
            if (inlineEditors.isVisible()) editAnotherCell(inlineEditors)
            else inlineEditors.editNextCell(true);
          }
          break;
        default:
          shouldPrevent = false;
          break;
      }

      if(shouldPrevent){
        e.preventDefault();
      }
    };
  },

  onHide: function(inlineEditors, node){}
};

gantt.ext.inlineEditors.setMapping(mapping);

gantt.init("gantt_here");
~~~

{{editor	https://snippet.dhtmlx.com/5/5da351260	Custom keyboard mapping}}

Opening editor with one click
------------------------------

In the single selection mode, Gantt opens the inline editor after you click on a task.  

In the [multi selection](desktop/multiselection.md) mode, after you click on an unselected task, Gantt will select it, and will open the inline editor only after the second click. 
If you want Gantt to open the inline editor after the first click, enable the [inline_editors_multiselect_open](api/gantt_inline_editors_multiselect_open_config.md) config.

~~~js
gantt.plugins({
  multiselect: true
});

...

gantt.config.inline_editors_multiselect_open = true;
~~~

