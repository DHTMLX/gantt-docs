---
sidebar_label: 포커스
title: 포커스 메서드
description: "Gantt 차트에 포커스를 설정합니다"
---

# focus

### Description

@short: Gantt 차트에 포커스를 설정합니다

@signature: focus: () => void

### Example

~~~jsx
gantt.focus();
~~~

### Related samples
- [Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
이 메서드는 **keyboard_navigation** 확장에 정의되어 있으므로 [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) 플러그인을 활성화해야 합니다. [Keyboard Navigation](guides/keyboard-navigation.md) 문서에서 자세한 내용을 확인하세요.
:::


버전 4.1에서 추가됨

### Related API
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [키보드 내비게이션](guides/keyboard-navigation.md)

