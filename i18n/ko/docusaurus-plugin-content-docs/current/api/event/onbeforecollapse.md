---
sidebar_label: onBeforeCollapse
title: onBeforeCollapse 이벤트
description: "Gantt 차트가 전체 화면 모드를 종료하고 일반 모드로 돌아갑니다"
---

# onBeforeCollapse

### Description

@short: Gantt가 전체 화면 모드를 종료하고 일반 모드로 돌아갑니다

@signature: onBeforeCollapse: () =\> boolean;

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지(<b>true</b>) 아니면 취소될지(<b>false</b>)를 정의합니다

### Example

~~~jsx
gantt.attachEvent("onBeforeCollapse",function(){
    // 여기에 코드 작성
    return true;
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

이벤트는 차단 가능합니다. *false*를 반환하면 후속 처리가 취소됩니다.

:::note
이 이벤트는 **fullscreen** 확장에서 정의되어 있으므로, [fullscreen](guides/extensions-list.md#fullscreen) 플러그인을 [gantt.plugins](api/method/plugins.md) 메서드를 사용하여 활성화해야 합니다. 자세한 내용은 [Full Screen Mode](guides/fullscreen-mode.md) 문서를 참조하십시오.
::: 

### Related API
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [전체 화면 모드](guides/fullscreen-mode.md)

