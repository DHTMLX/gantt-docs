---
sidebar_label: removeShortcut
title: removeShortcut method
description: "키보드 단축키를 제거합니다"
---

# removeShortcut

### Description

@short: 키보드 단축키를 제거합니다

@signature: removeShortcut: (shortcut: string, scope: string) =\> void

### Parameters

- `shortcut` - (required) *string* - 단축키의 키 이름 또는 키 조합 이름 ([shortcut syntax](guides/keyboard-navigation.md#shortcutsyntax))
- `scope` - (required) *string* - 단축키가 연결된 요소 ([list of scopes](guides/keyboard-navigation.md#scopes))

### Example

~~~jsx
// 단축키 추가
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
}, "taskRow");

// 단축키 제거
gantt.removeShortcut("shift+w", "taskRow");
~~~

### Related samples
- [Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
 이 메서드는 **keyboard_navigation** 확장의 일부이므로, [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) 플러그인을 활성화해야 합니다. 자세한 내용은 [키보드 내비게이션](guides/keyboard-navigation.md) 문서를 참조하세요. 
:::


버전 4.1에서 추가됨

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [키보드 내비게이션](guides/keyboard-navigation.md)

