---
sidebar_label: grid_indent
title: grid_indent 템플릿
description: "브랜치에서 자식 아이템의 들여쓰기를 지정합니다(트리 열에서)"
---

# grid_indent

### Description

@short: 트리 열에서 브랜치의 자식 아이템 들여쓰기 지정

@signature: grid_indent: (task: Task) => string;

### Parameters

- `task` - (필수) *Task* - 작업 객체

### Returns
- ` text` - (문자열) - Gantt 차트에 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.grid_indent = function(item) {
    return "<div class='gantt_tree_indent'></div>";
};
~~~

### Related Guides
- [트리 열 구성하기](guides/tree-column.md)
- [그리드 템플릿](guides/table-templates.md)