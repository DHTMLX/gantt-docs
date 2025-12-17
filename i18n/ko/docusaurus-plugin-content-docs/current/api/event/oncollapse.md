---
sidebar_label: onCollapse
title: onCollapse event
description: "간트 뷰가 전체 화면 모드에서 일반 모드로 전환될 때 발생합니다."
---

# onCollapse

### Description

@short: 간트 뷰가 전체 화면 모드에서 일반 모드로 전환될 때 발생합니다.

@signature: onCollapse: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onCollapse", function (){
    // 여기에 커스텀 로직 작성
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
 이 이벤트는 **fullscreen** 확장의 일부이므로, [gantt.plugins](api/method/plugins.md) 메서드를 사용하여 [fullscreen](guides/extensions-list.md#fullscreen) 플러그인을 반드시 활성화해야 합니다. 자세한 내용은 [전체 화면 모드](guides/fullscreen-mode.md) 문서를 참고하세요. 
:::

### Related API
- [onExpand](api/event/onexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [전체 화면 모드](guides/fullscreen-mode.md)

