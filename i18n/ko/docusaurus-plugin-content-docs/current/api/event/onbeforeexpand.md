---
sidebar_label: onBeforeExpand
title: onBeforeExpand event
description: "간트가 전체 화면 모드로 전환되기 직전에 발생합니다."
---

# onBeforeExpand

### Description

@short: 간트가 전체 화면 모드로 전환되기 직전에 발생합니다.

@signature: onBeforeExpand: () =\> boolean;

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 취소될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeExpand",function(){
    // 여기에 사용자 정의 로직을 추가하세요    
    return true;
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 이후 동작이 중단됩니다.

:::note
 이 이벤트는 **fullscreen** 확장 기능에 속하므로, 반드시 [gantt.plugins](api/method/plugins.md) 메서드를 통해 [fullscreen](guides/extensions-list.md#fullscreen) 플러그인을 활성화해야 합니다. 자세한 내용은 [전체 화면 모드](guides/fullscreen-mode.md) 문서를 참고하세요. 
:::

### Related API
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [전체 화면 모드](guides/fullscreen-mode.md)

