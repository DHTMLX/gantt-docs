---
sidebar_label: onBeforeCollapse
title: onBeforeCollapse event
description: "간트가 전체화면 모드를 종료하고 일반 뷰로 돌아가기 직전에 트리거됩니다."
---

# onBeforeCollapse

### Description

@short: 간트가 전체화면 모드를 종료하고 일반 뷰로 돌아가기 직전에 트리거됩니다.

@signature: onBeforeCollapse: () =\> boolean;

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 중단될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeCollapse",function(){
    // 여기에 사용자 정의 로직을 작성하세요    
    return true;
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 이후의 동작이 모두 중단됩니다.

:::note
 이 이벤트는 **fullscreen** 확장 기능의 일부이므로, [gantt.plugins](api/method/plugins.md) 메서드를 통해 [fullscreen](guides/extensions-list.md#fullscreen) 플러그인을 활성화해야 합니다. 자세한 내용은 [전체 화면 모드](guides/fullscreen-mode.md) 문서를 참고하세요. 
:::

### Related API
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [전체 화면 모드](guides/fullscreen-mode.md)

