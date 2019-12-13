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

<h3 id="dateslimits">Dates limits in date editor</h3>

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

<h3 id="linkformatter">Formatting values of the Predecessor editor</h3>

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
    {name: "text", label: "Name", tree: true, width: 200, editor: editors.text, resize: true},
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

###Custom inline editor

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
    // called before save/close. Return true if new value differs from the original one
    // returning true will trigger saving changes, returning false will skip saving 
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

- include the **ext/dhtmlxgantt_keyboard_navigation.js** extension on the page.

~~~js
<script src="./codebase/ext/dhtmlxgantt_keyboard_navigation.js"></script>
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


