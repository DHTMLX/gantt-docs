---
sidebar_label: collapse
title: collapse method
description: "간트 뷰를 전체 화면 모드에서 일반 모드로 전환합니다."
---

# collapse

### Description

@short: 간트 뷰를 전체 화면 모드에서 일반 모드로 전환합니다.

@signature: collapse: () =\> void

### Example

~~~jsx
gantt.collapse();
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
 이 메서드는 **fullscreen** 확장 기능에서 제공되므로, [gantt.plugins](api/method/plugins.md) 메서드를 사용하여 [fullscreen](guides/extensions-list.md#fullscreen) 플러그인을 반드시 활성화해야 합니다. 자세한 내용은 [전체 화면 모드](guides/fullscreen-mode.md) 문서를 참고하세요. 
:::

### Related API
- [expand](api/method/expand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

### Related Guides
- [전체 화면 모드](guides/fullscreen-mode.md)

