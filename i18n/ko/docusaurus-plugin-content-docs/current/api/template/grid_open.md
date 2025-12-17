---
sidebar_label: grid_open
title: grid_open template
description: "트리 컬럼에서 열기/닫기 표시 아이콘을 지정합니다"
---

# grid_open

### Description

@short: 트리 컬럼에서 열기/닫기 표시 아이콘을 지정합니다

@signature: grid_open: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - 작업 객체

### Returns
- ` text` - (string) - 간트에 표시될 HTML 텍스트

### Example

~~~jsx
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~

### Related Guides
- [트리 컬럼 구성하기](guides/tree-column.md)
- [그리드의 템플릿](guides/table-templates.md)
