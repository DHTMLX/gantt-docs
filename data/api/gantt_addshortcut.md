addShortcut
=============

@short:
	adds a new keyboard shortcut 

@params:
- shortcut		string			the key name or the name of keys combination for a shortcut (<a href="desktop/keyboard_navigation.md#shortcutsyntax">shortcut syntax</a>)
- handler		function		the handler of the shortcut call
* scope 		string			the name of the context element to attach the handler function to (<a href="desktop/keyboard_navigation.md#scopes">list of scopes</a>)


@example:
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},"taskRow");

@template:	api_method
@descr:

{{note This method is defined in the **keyboard_navigation** extension, so you need to activate the [keyboard_navigation](desktop/extensions_list.md#keyboardnavigation) plugin. Read the details in the desktop/keyboard_navigation.md article.}}


added in version 4.1

In case the third parameter is not set, the handler will be attached to the gantt scope.

@relatedapi:
api/gantt_getshortcuthandler.md
api/gantt_removeshortcut.md
api/gantt_keyboard_navigation_config.md
api/gantt_keyboard_navigation_cells_config.md
api/gantt_focus.md



@related:
desktop/keyboard_navigation.md

@relatedsample:
02_extensions/16_keyboard_navigation.html
02_extensions/17_keyboard_navigation_cell.html
