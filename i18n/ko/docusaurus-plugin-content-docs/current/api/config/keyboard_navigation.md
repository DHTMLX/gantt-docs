---
sidebar_label: keyboard_navigation
title: keyboard_navigation 구성
description: "Gantt에서 키보드 내비게이션을 활성화합니다."
---

# keyboard_navigation

### Description

@short: Gantt에서 키보드 내비게이션을 활성화합니다.

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
이 옵션은 **keyboard_navigation** 확장에 정의되어 있으므로 [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) 플러그인을 활성화해야 합니다. [Keyboard Navigation](guides/keyboard-navigation.md) 문서에서 자세한 내용을 확인하십시오.
:::

버전 4.1에서 추가되었습니다.

### Related API
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [Keyboard Navigation](guides/keyboard-navigation.md)