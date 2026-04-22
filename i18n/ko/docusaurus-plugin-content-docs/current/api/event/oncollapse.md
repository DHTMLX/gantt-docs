---
sidebar_label: onCollapse
title: onCollapse event
description: "간트 차트가 전체 화면 모드에서 일반 모드로 돌아올 때 발생합니다"
---

# onCollapse

### Description

@short: 간트 차트가 전체 화면 모드에서 일반 모드로 돌아올 때 발생합니다

@signature: onCollapse: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onCollapse", function (){
    // 여기에 코드 작성
});
~~~

### Related samples
- [전체 화면](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
이벤트는 **fullscreen** 확장에서 정의되어 있으므로, [fullscreen](guides/extensions-list.md#fullscreen) 플러그인을 [gantt.plugins](api/method/plugins.md) 메서드를 사용해 활성화해야 합니다. 자세한 내용은 [Full Screen Mode](guides/fullscreen-mode.md) 문서를 참조하세요.
:::

### Related API
- [onExpand](api/event/onexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Full Screen Mode](guides/fullscreen-mode.md)