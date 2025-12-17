---
sidebar_label: addShortcut
title: addShortcut method
description: "새로운 키보드 단축키를 추가합니다."
---

# addShortcut

### Description

@short: 새로운 키보드 단축키를 추가합니다.

@signature: addShortcut: (shortcut: string, handler: GanttCallback, scope?: string) =\> void

### Parameters

- `shortcut` - (required) *string* - 단축키에 사용되는 키 또는 키 조합 ([shortcut syntax](guides/keyboard-navigation.md#shortcutsyntax))
- `handler` - (required) *function* - 단축키가 실행될 때 호출되는 함수
- `scope` - (required) *string* - 선택 사항이며, 핸들러가 연결될 컨텍스트 요소를 지정합니다 ([list of scopes](guides/keyboard-navigation.md#scopes)); 기본값은 "gantt"입니다.

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
 이 메서드는 **keyboard_navigation** 확장의 일부이므로, [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) 플러그인이 활성화되어 있어야 합니다. 자세한 내용은 [키보드 내비게이션](guides/keyboard-navigation.md) 문서를 참조하세요. 
:::

버전 4.1에 추가됨

세 번째 파라미터가 생략되면 핸들러는 기본적으로 gantt scope에 연결됩니다.

### Related API
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [키보드 내비게이션](guides/keyboard-navigation.md)

