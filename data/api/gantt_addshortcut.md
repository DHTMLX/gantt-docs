addShortcut
=============


@todo:
	check 

@short:
	adds a new keyboard shortcut 

@params:
- shortcut		string			the key name or the name of keys combination for shortcut 
- handler		function		the handler of the shortcut call
- scope			object			the element to which the shortcut will be attached




@example:
var keyScope = gantt.config.keyboard_navigation_scopes;

gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},keyScope.taskCell);

@template:	api_method
@descr:
added in version 4.1

The shortcut syntax is described in the [Accessibility](desktop/accessibility.md#shortcut_syntax) article. 

In case the third parameter is not set, the handler will be attached to the gantt object.

@relatedapi:
api/gantt_keyboard_navigation_config.md
api/gantt_keyboard_navigation_cells_config.md
api/gantt_keyboard_navigation_scopes_config.md
api/gantt_focus.md
api/gantt_removeshortcut.md


@related:
desktop/accessibility.md#keyboardnavigation

@relatedsample:
02_extensions/16_keyboard_navigation.html
02_extensions/17_keyboard_navigation_cell.html
