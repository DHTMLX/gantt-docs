---
sidebar_label: expand
title: expand method
description: "간트 차트를 전체 화면 모드로 전환하여 화면 전체 공간을 차지하도록 합니다."
---

# expand

### Description

@short: 간트 차트를 전체 화면 모드로 전환하여 화면 전체 공간을 차지하도록 합니다.

@signature: expand: () =\> void

### Example

~~~jsx
gantt.expand();
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
 이 메서드는 **fullscreen** 확장의 일부로, [gantt.plugins](api/method/plugins.md) 메서드를 통해 [fullscreen](guides/extensions-list.md#fullscreen) 플러그인을 활성화해야 합니다. 자세한 내용은 [전체 화면 모드](guides/fullscreen-mode.md) 문서를 참고하세요. 
:::

### Related API
- [collapse](api/method/collapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

### Related Guides
- [전체 화면 모드](guides/fullscreen-mode.md)

