---
sidebar_label: onAfterQuickInfo
title: onAfterQuickInfo event
description: "팝업 편집 양식이 닫힌 후에 발생합니다"
---

# onAfterQuickInfo

### Description

@short: 팝업 편집 양식이 닫힌 후에 발생합니다

@signature: onAfterQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (필수) *string | number* - 작업 ID

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
이벤트는 **Quick Info** 확장에 정의되어 있으므로 [quick_info](guides/extensions-list.md#quick-info) 플러그인을 활성화해야 합니다.
:::


버전 4.1에 추가됨

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#quick-info)