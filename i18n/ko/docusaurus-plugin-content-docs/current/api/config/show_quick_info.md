---
sidebar_label: show_quick_info
title: show_quick_info config
description: "'quick_info' 확장 기능을 켜거나 끕니다 (작업 세부 정보를 보여주는 팝업)"
---

# show_quick_info

### Description

@short: 'quick_info' 확장 기능을 켜거나 끕니다 (작업 세부 정보를 보여주는 팝업)

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
- ['Quick Info' 확장(터치 지원)의 템플릿](guides/touch-templates.md)
