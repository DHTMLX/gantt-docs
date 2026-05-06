---
sidebar_label: addShortcut
title: addShortcut 메서드
description: "새 키보드 단축키를 추가합니다"
---

# addShortcut

### Description

@short: 새 키보드 단축키를 추가합니다

@signature: addShortcut: (shortcut: string, handler: GanttCallback, scope?: string) =\> void

### Parameters

- `shortcut` - (필수) *string* - 단축키의 키 이름 또는 키 조합의 이름 [shortcut 구문](guides/keyboard-navigation.md#shortcutsyntax)
- `handler` - (필수) *function* - 단축키 호출의 핸들러

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
이 메서드는 **keyboard_navigation** 확장에 정의되어 있으므로 [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) 플러그인을 활성화해야 합니다. 자세한 내용은 [Keyboard Navigation](guides/keyboard-navigation.md) 문서를 참조하십시오. 
:::

버전 4.1에서 추가됨

세 번째 매개변수가 설정되지 않은 경우 핸들러가 gantt 스코프에 연결됩니다.

### Related API
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [키보드 내비게이션](guides/keyboard-navigation.md)

