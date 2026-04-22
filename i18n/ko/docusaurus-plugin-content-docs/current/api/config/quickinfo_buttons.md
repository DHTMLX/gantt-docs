---
sidebar_label: quickinfo_buttons
title: quickinfo_buttons config
description: "팝업 작업 세부 정보 폼에 표시되는 버튼 세트를 보유합니다."
---

# quickinfo_buttons

### Description

@short: 팝업 작업의 세부 정보 양식에 위치한 버튼들의 모음을 저장합니다

@signature: quickinfo_buttons: any[]

### Example

~~~jsx
gantt.config.quickinfo_buttons=["icon_delete","icon_edit","advanced_details_button"];
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");

gantt.$click.buttons.advanced_details_button=function(id){
    gantt.message("These are advanced details");
    return false; //기본 동작을 차단합니다.
};
~~~

**기본 값:** ["icon_delete","icon_edit"]

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
이 옵션은 **Quick Info** 확장에 정의되어 있으므로, [quick_info](guides/extensions-list.md#quick-info) 플러그인을 활성화해야 합니다.
:::

### Related API
- api/other/click.md
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [확장 기능 전체 목록](guides/extensions-list.md#quickinfo)

