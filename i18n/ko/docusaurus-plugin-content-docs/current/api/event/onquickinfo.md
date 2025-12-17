---
sidebar_label: onQuickInfo
title: onQuickInfo event
description: "팝업 편집 폼이 표시될 때 트리거됩니다."
---

# onQuickInfo

### Description

@short: 팝업 편집 폼이 표시될 때 트리거됩니다.

@signature: onQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (required) *string | number* - 작업 ID

### Example

~~~jsx
gantt.attachEvent("onQuickInfo",function(taskId){  
    // 여기에 코드 작성  
});
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 이 이벤트는 **Quick Info** 확장의 일부이므로, [quick_info](guides/extensions-list.md#quickinfo) 플러그인을 반드시 활성화하세요. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [확장 기능 전체 목록](guides/extensions-list.md#quickinfo)

