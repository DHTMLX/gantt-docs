---
sidebar_label: plugins
title: plugins method
description: "지정된 확장 기능을 활성화합니다."
---

# plugins

### Description

@short: 지정된 확장 기능을 활성화합니다.

@signature: plugins: (ext?: GanttPlugins) =\> GanttPlugins

### Parameters

- `ext` - (optional) *GanttPlugins* - 활성화할 확장 기능들을 나열한 객체

### Returns
- ` activatedPlugins` - (GanttPlugins) - 활성화된 확장 기능들을 포함하는 객체

### Example

~~~jsx
gantt.plugins({
    quick_info: true,
    keyboard_navigation: true,
    undo: true
});
~~~

### Related Guides
- [확장 기능 전체 목록](guides/extensions-list.md)

### Change log
- v8.0부터, **export_api** plugin이 plugins 목록의 일부로 포함됩니다. 이전 버전에서는 **https://export.dhtmlx.com/gantt/api.js** 스크립트를 페이지에 추가해야 합니다. 자세한 내용은 [Migration](migration.md#71---80) 가이드를 참조하세요.
- v7.0에 도입됨
