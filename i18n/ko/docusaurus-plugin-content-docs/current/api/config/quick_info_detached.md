---
sidebar_label: quick_info_detached
title: quick_info_detached config
description: "작업 양식이 화면의 왼쪽 또는 오른쪽에서 나타날지, 또는 선택한 작업 근처에서 나타날지 정의합니다"
---

# quick_info_detached

### Description

@short: 화면의 왼쪽/오른쪽에서 나타나거나 선택된 작업 근처에서 나타날지 정의합니다

@signature: quick_info_detached: boolean

### Example

~~~jsx
gantt.config.quick_info_detached = false;

gantt.init("gantt_here");
~~~

**기본 값:** true (선택된 이벤트 근처에 이벤트 양식이 표시됩니다)

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 이 옵션은 **Quick Info** 확장의 일부이므로, 반드시 [quick_info](guides/extensions-list.md#quickinfo) 플러그인을 활성화해야 합니다. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [확장 기능 전체 목록](guides/extensions-list.md#quickinfo)

