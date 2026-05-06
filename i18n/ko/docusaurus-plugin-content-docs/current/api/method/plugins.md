---
sidebar_label: plugins
title: plugins method
description: "지정된 확장 기능을 활성화합니다."
---

# plugins

### Description

@short: 지정된 확장을 활성화합니다

@signature: plugins: (ext?: GanttPlugins) => GanttPlugins

### Parameters

- `ext` - (선택적) *GanttPlugins* - 활성화되어야 하는 확장 이름들로 이루어진 객체

### Returns
- `activatedPlugins` - (GanttPlugins) - 활성화된 확장들의 객체

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
- The **export_api** 플러그인은 v8.0에서 플러그인 목록에 포함되었습니다. 이전 버전에서 내보내기(export) 서비스를 활성화하려면 페이지에 **https://export.dhtmlx.com/gantt/api.js** 파일을 포함해야 합니다. Migration 문서의 [Migration](migration.md#71---80) 항목을 확인하십시오.
- 7.0 버전에 추가되었습니다