---
sidebar_label: grid_indent
title: grid_indent template
description: "트리 컬럼 내에서 브랜치의 자식 항목 들여쓰기를 제어합니다."
---

# grid_indent

### Description

@short: 트리 컬럼 내에서 브랜치의 자식 항목 들여쓰기를 제어합니다.

@signature: grid_indent: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - 작업 객체

### Returns
- ` text` - (string) - gantt에 표시될 HTML 텍스트

### Example

~~~jsx
gantt.templates.grid_indent = function(item) {
    return "<div class='gantt_tree_indent'></div>";
};
~~~

### Related Guides
- [트리 컬럼 구성하기](guides/tree-column.md)
- [그리드의 템플릿](guides/table-templates.md)
