---
sidebar_label: addShortcut
title: addShortcut method
description: "fügt eine neue Tastenkombination hinzu"
---

# addShortcut

### Description

@short: Fügt eine neue Tastenkombination hinzu

@signature: addShortcut: (shortcut: string, handler: GanttCallback, scope?: string) =\> void

### Parameters

- `shortcut` - (required) *string* - die Taste oder Tastenkombination, die für die Tastenkombination verwendet wird (["Tastaturnavigation"](guides/keyboard-navigation.md))
- `handler` - (required) *function* - die Funktion, die ausgeführt wird, wenn die Tastenkombination ausgelöst wird
- `Element` - (required) *an,* - an das der Handler gebunden wird (["Liste der Scopes"](guides/keyboard-navigation.md#scopes)) standardmäßig "gantt"

### Example

~~~jsx
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},"taskRow");
~~~

### Related samples
- [Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
 Diese Methode ist Teil der **keyboard_navigation** Erweiterung, daher muss das [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) Plugin aktiviert sein. Für weitere Details siehe den Artikel ["Tastaturnavigation"](guides/keyboard-navigation.md). 
:::

Hinzugefügt in Version 4.1

Wenn der dritte Parameter weggelassen wird, wird der Handler standardmäßig an den gantt Scope gebunden.

### Related API
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- ["Tastaturnavigation"](guides/keyboard-navigation.md)

