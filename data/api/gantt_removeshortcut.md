removeShortcut
=============


@todo:
	check 

@short:
	removes a keyboard shortcut

@params:

- shortcut		string			the key name or the name of keys combination for shortcut
- scope			object			the element to which the shortcut is attached



@example:
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},keyScope.taskCell);

gantt.removeShortcut("shift+w",keyScope.taskCell);

@template:	api_method
@descr:
added in version 4.1

The shortcut syntax is described in the [Accessibility](desktop/accessibility.md#shortcut_syntax) article. 

To remove shortcut from the gantt object, pass the gantt scope as the second parameter:

~~~js
gantt.removeShortcut("shift+w",keyScope.gantt);
~~~

@relatedapi:
api/gantt_keyboard_navigation_config.md
api/gantt_keyboard_navigation_cells_config.md
api/gantt_keyboard_navigation_scopes_config.md
api/gantt_addshortcut.md
api/gantt_focus.md

@related:
desktop/accessibility.md#keyboardnavigation

@relatedsample:
02_extensions/16_keyboard_navigation.html
02_extensions/17_keyboard_navigation_cell.html
