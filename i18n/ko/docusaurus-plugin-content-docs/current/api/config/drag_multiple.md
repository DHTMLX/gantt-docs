---
sidebar_label: drag_multiple
title: drag_multiple 설정
description: "여러 개의 선택된 작업을 한꺼번에 드래그할 수 있도록 합니다"
---

# drag_multiple

### Description

@short: 한 번에 여러 선택된 작업을 드래그할 수 있도록 합니다

@signature: drag_multiple: boolean

### Example

~~~jsx
gantt.config.drag_multiple = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

여러 개의 작업을 선택한 상태에서 선택되지 않은 작업을 이동하기 시작하면, 선택되지 않은 작업만 이동합니다.

프로젝트의 드래그 앤 드롭을 활성화하려면 [drag_project](api/config/drag_project.md) 설정을 *true*로 설정하십시오.

~~~js
gantt.config.drag_project = true;
~~~

### Related API
- [drag_project](api/config/drag_project.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#multitaskselectionanddragndrop)