---
sidebar_label: showQuickInfo
title: showQuickInfo 메서드
description: "지정된 작업의 팝업 작업 양식을 표시합니다"
---

# showQuickInfo

### Description

@short: 지정된 작업의 팝업 작업 양식을 표시합니다

@signature: showQuickInfo: (id: string | number) =\> void

### Parameters

- `id` - (필수) *문자열 | 숫자* -     작업 ID

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
참고 이 메서드는 **Quick Info** 확장에 정의되어 있으므로 [quick_info](guides/extensions-list.md#quick-info) 플러그인을 활성화해야 합니다.
:::

### Related API
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#quick-info)