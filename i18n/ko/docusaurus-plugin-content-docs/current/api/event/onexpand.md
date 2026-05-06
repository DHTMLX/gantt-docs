---
sidebar_label: onExpand
title: onExpand event
description: "간트가 전체 화면으로 확장될 때 발생합니다"
---

# onExpand

### Description

@short: 간트가 전체 화면으로 확장될 때 발생합니다

@signature: onExpand: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onExpand", function (){
    // 여기에 코드 작성
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

:::note
이 이벤트는 **fullscreen** 확장 기능에서 정의되므로 [fullscreen](guides/extensions-list.md#fullscreen) 플러그인을 [gantt.plugins](api/method/plugins.md) 메서드를 사용하여 활성화해야 합니다. 자세한 내용은 [Full Screen Mode](guides/fullscreen-mode.md) 문서를 참조하십시오.
:::

### Related API
- [onCollapse](api/event/oncollapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Full Screen Mode](guides/fullscreen-mode.md)