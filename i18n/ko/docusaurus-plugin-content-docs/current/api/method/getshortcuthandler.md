---
sidebar_label: getShortcutHandler
title: getShortcutHandler method
description: "키 내비게이션 단축키에 대한 핸들러 함수를 가져옵니다."
---

# getShortcutHandler

### Description

@short: 키 내비게이션 단축키에 대한 핸들러 함수를 가져옵니다.

@signature: getShortcutHandler: (shortcut: string, scope: string) =\> GanttCallback

### Parameters

- `shortcut` - (required) *string* - 단축키를 정의하는 키 또는 키 조합 ([shortcut syntax](guides/keyboard-navigation.md#shortcutsyntax))
- `scope` - (required) *string* - 핸들러가 연결된 컨텍스트 요소 이름 ([list of scopes](guides/keyboard-navigation.md#scopes))

### Returns
- ` shortcut_handler` - (function) - 단축키를 처리하도록 할당된 함수

### Example

~~~jsx
gantt.addShortcut("shift+w", function(e){ 
    const task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},"taskRow");

gantt.getShortcutHandler("shift+w", "taskRow")
~~~

### Related samples
- [Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
 이 메서드는 **keyboard_navigation** 확장의 일부이므로, [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) 플러그인을 활성화해야 합니다. 자세한 내용은 [키보드 내비게이션](guides/keyboard-navigation.md) 문서를 참조하세요. 
:::


버전 4.2에 추가됨

### Related API
- [addShortcut](api/method/addshortcut.md)
- [removeShortcut](api/method/removeshortcut.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [키보드 내비게이션](guides/keyboard-navigation.md)

