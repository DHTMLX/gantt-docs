---
sidebar_label: drag_multiple
title: drag_multiple config
description: "여러 개의 선택된 작업을 동시에 드래그할 수 있도록 허용합니다"
---

# drag_multiple

### Description

@short: 여러 개의 선택된 작업을 동시에 드래그할 수 있도록 허용합니다

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

여러 작업이 선택된 상태에서, 선택에 포함되지 않은 작업을 드래그하면 해당 작업 하나만 이동합니다.

프로젝트 단위로 드래그 앤 드롭을 활성화하려면 [drag_project](api/config/drag_project.md) 설정을 *true*로 지정하세요.

~~~js
gantt.config.drag_project = true;
~~~

### Related API
- [drag_project](api/config/drag_project.md)

### Related Guides
- [멀티 태스크 선택](guides/multiselection.md#multitaskselectionanddragndrop)

