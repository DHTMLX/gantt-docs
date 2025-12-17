---
sidebar_label: keyboard_navigation_cells
title: keyboard_navigation_cells config
description: "개별 셀 단위로 키보드 네비게이션을 허용합니다"
---

# keyboard_navigation_cells

### Description

@short: 개별 셀 단위로 키보드 네비게이션을 허용합니다

@signature: keyboard_navigation_cells: boolean

### Example

~~~jsx
gantt.config.keyboard_navigation_cells = true;
~~~

**Default value:** false

### Related samples
- [Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
 이 설정은 **keyboard_navigation** 확장의 일부이므로, 먼저 [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) 플러그인을 활성화해야 합니다. 자세한 내용은 [키보드 내비게이션](guides/keyboard-navigation.md) 가이드를 참고하세요. 
:::

버전 4.1에서 추가됨

### Related API
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [키보드 내비게이션](guides/keyboard-navigation.md)

