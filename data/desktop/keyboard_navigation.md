Keyboard Navigation
========================

You can get access to gantt and its elements via keys or keys' combinations. This article will give you all the necessary information on the peculiarities of keyboard navigation with gantt, including
focus behavior, usage of ready shortcuts and creation of custom ones.

##Focus behavior during keyboard navigation

###Focus on Gantt

When the Tab key is pressed, Gantt gets focus the same as any usual element. 
After that to navigate Gantt, you can use the arrow keys and other ones. 
When the Tab key is pressed for the second time, the focus leaves gantt and is moved to some other place on the page.

###Focus on a modal window

When a modal window (a lightbox, a confirm window) opens, the focus moves from the gantt to this window and 
navigation happens inside of it as in a simple form. When the window is closed, focus goes back to the gantt.

To return focus back to gantt, you need to use the api/gantt_focus.md method. When the gantt gets focus again, it places the focus on the active element inside, 
or on the first row, or on the latest selected element.

The default navigation actions in a modal window are as follows:

- Enter - confirm and close
- Escape - close without any changes

If the focus is set on some button of the form, pressing Space or Enter
will call pressing the button under focus and not the action.

##Enabling the functionality

In order to use keyboard navigation in the Gantt chart, you need to include the **ext/dhtmlxgantt_keyboard_navigation.js** extension on the page. 
There are two variants of keyboard navigation available:

- navigation by task rows

To enable it, set the api/gantt_keyboard_navigation_config.md property to true.

- navigation by task cells  

To use this type of navigation, set the api/gantt_keyboard_navigation_cells_config.md property to true.

##Scopes

An action called on a key click depends on the context. It means that different actions can be attached to different elements (scopes). 
There are the following context elements (scopes) in the Gantt chart:

- **"gantt"** - The whole gantt
- **"taskRow"** - A row with a task
- **"taskCell"** - A cell of the row with a task
- **"headerCell"** - A cell of the header

If one and the same shortcut is attached to several scopes, the more specific shortcut will trigger. It means that if the same shortcut is attached 
to gantt and to its element, the shortcut attached to an element will be called rather than the shortcut attached to the whole gantt. 

###Adding a shortcut

To create a new keyboard shortcut, you need to use the api/gantt_addshortcut.md method and pass three parameters to it:

- shortcut - (string) a new shortcut key or keys' combination name
- handler - (function) a handler function that will be called on the shortcut call 
- scope - (string) the name of the context element to attach the handler function to

~~~js
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},"taskRow");
~~~

###Removing a shortcut

To remove a shortcut from the scope, you need to use the api/gantt_removeshortcut.md method. The method takes two parameters:

- shortcut - (string) the name of the key or the keys' combination for shortcut 
- scope - (string) the name of the context element to which the shortcut is attached

~~~js
gantt.removeShortcut("shift+w","taskRow");
~~~

##Shortcut syntax

A keyboard shortcut can consist of the following keys or key combinations:

- a modifier key + a character key (“ctrl+a”);
- a modifier key + a non-character key (“ctrl+space”);
- a character key (“a”);
- a non-character key (“space”)

There can be several key combinations for one action. In this case, all the combinations are listed with comma delimiter: “ctrl+a, ctrl+space”.

###The list of supported keys to use in shortcuts

- modifier keys: **shift**, **alt**, **ctrl**, **meta**;
- non-character keys: **backspace**, **tab**, **enter**, **esc**, **space**, **up**, **down**, **left**, **right**, **home**, **end**, **pageup**, **pagedown**, **delete**,
**insert**, **plus**, **f1-f12**.

##Existing shortcuts 

There is a set of ready shortcuts that you can use to navigate the gantt chart:

###General keyboard shortcuts:

- **Tab** - set focus on the gantt
- **Alt+Up/Down** - scroll gantt vertically
- **Alt+Left/Right** - scroll gantt horizontally
- **Ctrl+Enter** - create a new task
- **Ctrl+Z** - undo the action
- **Ctrl+R** - redo the action

###Shortcuts for Header Cells

- **Left/Right Arrow Keys** - navigate over header cells
- **Home/End** - navigate to the first/last column
- **Down** - move to the rows with tasks
- **Space/Enter** - click on the header (for example, for sorting)


###Shortcuts for Task Rows

- **Up/Down** - navigate through rows
- **PageDown/PageUp** - navigate to the first/last task
- **Space** - select a task
- **Ctrl+Enter** - create a new task
- **Delete** - remove the selected task
- **Enter** - open the lightbox
- **Ctrl+Left/Right** - expand/collapse the tree 

{{sample 02_extensions/16_keyboard_navigation.html}}

###Shortcuts for Task Cells

- **Up/Down/Left/Right Arrow Keys** - navigate over Task cells
- **PageDown/PageUp** - navigate to the first/last cell in a column
- **Home/End** - navigate to the first/last cell in a column
- **Space** - select a task
- **Ctrl+Enter** - create a new task
- **Delete** - remove the selected task
- **Enter** - open the lightbox
- **Ctrl+Left/Right** - expand/collapse the tree

{{sample 02_extensions/17_keyboard_navigation_cell.html}}

