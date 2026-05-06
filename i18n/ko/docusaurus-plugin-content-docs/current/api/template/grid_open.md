---
sidebar_label: grid_open
title: grid_open 템플릿
description: "트리 열의 열림/닫힘 기호 아이콘을 지정합니다"
---

# grid_open

### Description

@short: 트리 열의 열림/닫힘 기호 아이콘을 지정합니다

@signature: grid_open: (task: Task) =\> string;

### Parameters

- `task` - (필수) *Task* - 작업 객체

### Returns
- `text` - (string) - Gantt에 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~

### Related Guides
- [트리 열 구성](guides/tree-column.md)
- [그리드 템플릿](guides/table-templates.md)