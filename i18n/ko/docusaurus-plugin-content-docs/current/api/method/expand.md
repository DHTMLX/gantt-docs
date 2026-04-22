---
sidebar_label: expand
title: expand 메서드
description: "간트 차트를 전체 화면 모드로 확장"
---

# expand

### Description

@short: 간트 차트를 전체 화면 모드로 확장

@signature: expand: () => void

### Example

~~~jsx
gantt.expand();
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
이 메서드는 **fullscreen** 확장 기능에 정의되어 있으므로 [fullscreen](guides/extensions-list.md#fullscreen) 플러그인을 [gantt.plugins](api/method/plugins.md) 메서드를 사용해 활성화해야 합니다. 자세한 내용은 [Full Screen Mode](guides/fullscreen-mode.md) 문서를 참고하세요.
:::

### Related API
- [collapse](api/method/collapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

### Related Guides
- [전체 화면 모드](guides/fullscreen-mode.md)

