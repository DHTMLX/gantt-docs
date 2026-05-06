---
sidebar_label: keyboard_navigation_cells
title: keyboard_navigation_cells config
description: "셀 단위로 키보드 네비게이션을 활성화합니다"
---

# keyboard_navigation_cells

### Description

@short: 셀 단위로 키보드 네비게이션 활성화

@signature: keyboard_navigation_cells: boolean

### Example

~~~jsx
gantt.config.keyboard_navigation_cells = true;
~~~ 

**기본값:** false

### Related samples
- [Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
이 옵션은 **keyboard_navigation** 확장에 정의되어 있으므로 [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) 플러그인을 활성화해야 합니다. 자세한 내용은 [Keyboard Navigation](guides/keyboard-navigation.md) 문서를 참조하세요.
:::

버전 4.1에서 추가되었습니다

### Related API
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [Keyboard Navigation](guides/keyboard-navigation.md)