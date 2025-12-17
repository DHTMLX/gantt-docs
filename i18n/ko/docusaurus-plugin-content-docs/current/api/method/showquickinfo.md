---
sidebar_label: showQuickInfo
title: showQuickInfo method
description: "주어진 작업에 대해 팝업 작업 폼을 엽니다"
---

# showQuickInfo

### Description

@short: 주어진 작업에 대해 팝업 작업 폼을 엽니다

@signature: showQuickInfo: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -     작업의 고유 식별자

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

window.setTimeout(function(){
    gantt.showQuickInfo(10);    
},1);
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 이 메서드는 **Quick Info** 확장 기능에서 제공되므로, [quick_info](guides/extensions-list.md#quickinfo) 플러그인이 활성화되어 있는지 확인하세요. 
:::

### Related API
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [확장 기능 전체 목록](guides/extensions-list.md#quickinfo)

