Keyboard Navigation
========================

You can get access to Gantt and its elements via keys or keys' combinations. This article will give you all the necessary information 
on the peculiarities of keyboard navigation with Gantt, including focus behavior, usage of ready shortcuts and creation of custom ones.


##Enabling the functionality

In order to use keyboard navigation in the Gantt chart, you need to enable the **keyboard_navigation** plugin using the [gantt.plugins](api/gantt_plugins.md) method.

~~~js
gantt.plugins({
	keyboard_navigation: true
});
~~~

The API of the **gantt.ext.keyboardNavigation** object is given in the article desktop/keynav_ext.md.

There are two variants of keyboard navigation available:

- navigation by task rows

To enable it, set the api/gantt_keyboard_navigation_config.md property to *true*.

- navigation by task cells  

To use this type of navigation, set the api/gantt_keyboard_navigation_cells_config.md property to *true*.


##Focus behavior during keyboard navigation

###Focus on Gantt

When the Tab key is pressed, Gantt gets focus the same as any usual element. 
After that to navigate Gantt, you can use the arrow keys and other ones. 

When the Tab key is pressed for the second time, the focus leaves Gantt and is moved to some other place on the page.

###Focus on a modal window

When a modal window (a lightbox, a confirm window) opens, the focus moves from Gantt to this window and 
navigation happens inside of it as in a simple form. When the window is closed, focus goes back to Gantt.

To return focus back to Gantt, you need to use the api/gantt_focus.md method. When Gantt gets focus again, it places the focus on the active element inside, 
or on the first row, or on the latest selected element.

The default navigation actions in a modal window are as follows:

- *Enter* - confirm and close
- *Escape* - close without any changes

If the focus is set on some button of the form, pressing *Space* or *Enter* will call pressing the button under focus and not the action.

<br>
{{note
When you specify focus on a grid cell/row and then click on a custom HTML element inside the Gantt, the focus will be returned to the grid cell/row.

From v7.1.13, you may add the *'no_keyboard_navigation'* class to the custom element in order that the focus not to be restored on the grid cell/row.
}}

##Scopes

An action called on a key click depends on the context. It means that different actions can be attached to different elements (scopes). 
There are the following context elements (scopes) in the Gantt chart:

- **"gantt"** - The whole gantt
- **"taskRow"** - A row with a task
- **"taskCell"** - A cell of the row with a task
- **"headerCell"** - A cell of the header

If one and the same shortcut is attached to several scopes, the more specific shortcut will trigger. It means that if the same shortcut is attached 
to Gantt and to its element, the shortcut attached to an element will be called rather than the shortcut attached to the whole Gantt. 

###Adding a shortcut

To create a new keyboard shortcut, you need to use the api/gantt_addshortcut.md method and pass three parameters to it:

- **shortcut** - (*string*) a new shortcut key or keys' combination name
- **handler** - (*function*) a handler function that will be called on the shortcut call 
- **scope** - (*string*) optional, the name of the context element to attach the handler function to; "gantt" by default

~~~js
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},"taskRow");
~~~

###Removing a shortcut

To remove a shortcut from the scope, you need to use the api/gantt_removeshortcut.md method. The method takes two parameters:

- **shortcut** - (*string*) the name of the key or the keys' combination for shortcut 
- **scope** - (*string*) the name of the context element to which the shortcut is attached

~~~js
gantt.removeShortcut("shift+w","taskRow");
~~~

###Getting a shortcut handler

You can get the handler of the keyboard shorcut with the help of the method api/gantt_getshortcuthandler.md. It takes two parameters:

- **shortcut** - (*string*) the name of the key or the keys' combination for shortcut 
- **scope** - (*string*) the name of the context element to which the shortcut is attached

~~~js
var shortcut_handler = gantt.getShortcutHandler("shift+w","taskRow");
~~~

The method returns a function, which presents the handler of the shortcut call. 

##Shortcut syntax

A keyboard shortcut can consist of the following keys or key combinations:

- a modifier key + a character key ("ctrl+a");
- a modifier key + a non-character key ("ctrl+space");
- a character key ("a");
- a non-character key ("space")

There can be several key combinations for one action. In this case, all the combinations are listed with comma delimiter: "ctrl+a, ctrl+space".

###The list of supported keys to use in shortcuts

- modifier keys: **shift**, **alt**, **ctrl**, **meta**;
- non-character keys: **backspace**, **tab**, **enter**, **esc**, **space**, **up**, **down**, **left**, **right**, **home**, **end**, **pageup**, **pagedown**, **delete**,
**insert**, **plus**, **f1-f12**.

##Existing shortcuts 

There is a set of ready shortcuts that you can use to navigate the Gantt chart:

###General keyboard shortcuts:

- **Tab** - set focus on Gantt
- **Alt+Up/Down** - scroll Gantt vertically
- **Alt+Left/Right** - scroll Gantt horizontally
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
- **Shift+Left/Right** - indent/outdent task 
- **Shift+Down/Up** - expand/collapse branch 

{{sample 02_extensions/16_keyboard_navigation.html}}

{{note
You can find an example of how to implement the ability to copy/paste tasks via the **Ctrl+C/Ctrl+V** combinations in the [related](desktop/how_to.md#howtocopyandpastetasks) article.
}}

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

Built-in Shortcut for Horizontal Timeline Scrolling
--------------------

Starting from the version 4.2, the Gantt chart provides a possibility to scroll the timeline horizontally by using the following combination:<br>

-> **Shift** key + **mouse wheel movement**. 

From version 6.3 you can either set the **Alt** or **Meta** key in the combination with mouse wheel instead of default **Shift** key via the [horizontal_scroll_key](api/gantt_horizontal_scroll_key_config.md) property:

~~~js
gantt.config.horizontal_scroll_key = "altKey";
~~~

or disable the horizontal scroll by setting the [horizontal_scroll_key](api/gantt_horizontal_scroll_key_config.md) property to *false*:

~~~js
gantt.config.horizontal_scroll_key = false;
~~~