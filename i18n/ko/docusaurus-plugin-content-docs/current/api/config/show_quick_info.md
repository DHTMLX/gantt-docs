---
sidebar_label: show_quick_info
title: show_quick_info 구성
description: "활성화/비활성화 'quick_info' 확장(팝업 작업의 세부 양식)"
---

# show_quick_info

### Description

@short: 'quick_info' 확장을 활성화/비활성화합니다(팝업 작업의 세부 양식)

@signature: show_quick_info: boolean

### Example

~~~jsx
gantt.config.show_quick_info = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

:::note
 이 옵션은 **Quick Info** 확장 기능의 일부이므로, 먼저 [quick_info](guides/extensions-list.md#quickinfo) 플러그인을 활성화해야 합니다. 
:::

### Related Guides
- [Templates of the 'Quick Info' Extension (Touch Support)](guides/touch-templates.md)