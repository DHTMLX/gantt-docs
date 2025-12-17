---
sidebar_label: quickinfo_buttons
title: quickinfo_buttons config
description: "팝업 작업 세부 정보 폼에 표시되는 버튼 세트를 보유합니다."
---

# quickinfo_buttons

### Description

@short: 팝업 작업 세부 정보 폼에 표시되는 버튼 세트를 보유합니다.

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

**Default value:** ["icon_delete","icon_edit"]

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 이 옵션은 **Quick Info** 확장 기능의 일부이므로, [quick_info](guides/extensions-list.md#quickinfo) 플러그인이 활성화되어 있는지 확인하세요. 
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

