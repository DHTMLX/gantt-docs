---
sidebar_label: hideQuickInfo
title: hideQuickInfo method
description: "현재 열려 있는 경우 팝업 작업 폼을 숨깁니다"
---

# hideQuickInfo

### Description

@short: 현재 열려 있는 경우 팝업 작업 폼을 숨깁니다

@signature: hideQuickInfo: () =\> void

### Example

~~~jsx
gantt.showQuickInfo(5);
...
gantt.hideQuickInfo();
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 이 메서드는 **Quick Info** 확장 기능의 일부이므로, [quick_info](guides/extensions-list.md#quickinfo) 플러그인이 활성화되어 있는지 확인하세요. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [확장 기능 전체 목록](guides/extensions-list.md#quickinfo)

