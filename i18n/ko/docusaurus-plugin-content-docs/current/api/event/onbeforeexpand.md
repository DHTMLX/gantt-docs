---
sidebar_label: onBeforeExpand
title: onBeforeExpand event
description: "gantt가 전체 화면으로 확장되기 전에 발생합니다"
---

# onBeforeExpand

### Description

@short: gantt가 전체 화면으로 확장되기 전에 발생합니다

@signature: onBeforeExpand: () =\> boolean;

### Returns
- ` result` - (boolean) - 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 여부를 결정합니다 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeExpand",function(){
    // 여기에 코드 작성   
    return true;
});
~~~

### Related samples
- [Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

### Details

이벤트는 차단 가능(blockable)합니다. *false*를 반환하면 추가 처리가 더 이상 진행되지 않습니다.

:::note
이벤트는 **fullscreen** 확장에 정의되어 있으므로 [fullscreen](guides/extensions-list.md#fullscreen) 플러그인을 [gantt.plugins](api/method/plugins.md) 메서드를 사용하여 활성화해야 합니다. 전체 화면 모드에 대한 자세한 내용은 [Full Screen Mode](guides/fullscreen-mode.md) 문서를 참조하십시오. 
:::

### Related API
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onCollapse](api/event/oncollapse.md)
- [onExpand](api/event/onexpand.md)
- [collapse](api/method/collapse.md)
- [expand](api/method/expand.md)

### Related Guides
- [Full Screen Mode](guides/fullscreen-mode.md)