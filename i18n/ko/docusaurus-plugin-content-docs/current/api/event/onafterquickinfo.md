---
sidebar_label: onAfterQuickInfo
title: onAfterQuickInfo event
description: "팝업 편집 폼이 닫힌 후에 트리거됩니다"
---

# onAfterQuickInfo

### Description

@short: 팝업 편집 폼이 닫힌 후에 트리거됩니다

@signature: onAfterQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (required) *string | number* - 작업의 ID

### Example

~~~jsx
gantt.attachEvent("onAfterQuickInfo",function(taskId){
    // 여기에 코드 작성
});
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 이 이벤트는 **Quick Info** 확장의 일부이므로, [quick_info](guides/extensions-list.md#quickinfo) 플러그인이 활성화되어 있는지 확인하세요. 
:::


버전 4.1에 추가됨

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [확장 기능 전체 목록](guides/extensions-list.md#quickinfo)

