---
sidebar_label: onExpand
title: onExpand event
description: "간트가 전체 화면 모드로 전환될 때 트리거됩니다."
---

# onExpand

### Description

@short: 간트가 전체 화면 모드로 전환될 때 트리거됩니다.

@signature: onExpand: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onExpand", function (){
    // 여기에 사용자 정의 로직을 작성하세요
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
 이 이벤트는 **fullscreen** 확장 기능에서 제공되므로, [gantt.plugins](api/method/plugins.md) 메서드를 통해 [fullscreen](guides/extensions-list.md#fullscreen) 플러그인을 활성화해야 합니다. 자세한 내용은 [전체 화면 모드](guides/fullscreen-mode.md) 문서를 참고하세요. 
:::

### Related API
- [onCollapse](api/event/oncollapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [전체 화면 모드](guides/fullscreen-mode.md)

