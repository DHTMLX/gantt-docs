---
sidebar_label: keyboard_navigation
title: keyboard_navigation config
description: "간트에서 keyboard_navigation을 활성화합니다."
---

# keyboard_navigation

### Description

@short: 간트에서 keyboard_navigation을 활성화합니다.

@signature: keyboard_navigation: boolean

### Example

~~~jsx
gantt.config.keyboard_navigation = true;
~~~

**Default value:** true

### Related samples
- [Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)

### Details

:::note
 이 설정은 **keyboard_navigation** 확장의 일부이므로, [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [키보드 내비게이션](guides/keyboard-navigation.md) 문서에서 확인할 수 있습니다. 
:::

added in version 4.1

### Related API
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [키보드 내비게이션](guides/keyboard-navigation.md)

