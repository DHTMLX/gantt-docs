---
sidebar_label: horizontal_scroll_key
title: horizontal_scroll_key 구성
description: "Shift|Alt|Meta 키 + 마우스 휠 움직임으로 수평 스크롤을 활성화/비활성화합니다"
---

# horizontal_scroll_key

### Description

@short: Shift, Alt, 또는 Meta 키와 마우스 휠을 함께 사용할 때 수평 스크롤이 발생하는지를 제어합니다.

@signature: horizontal_scroll_key: string | boolean

### Example

~~~jsx
gantt.config.horizontal_scroll_key = "altKey";
~~~

**기본값:** "shiftKey"

### Related Guides
- [키보드 내비게이션](guides/keyboard-navigation.md#builtinshortcutforhorizontaltimelinescrolling)

### Change log
- v6.3에서 추가됨