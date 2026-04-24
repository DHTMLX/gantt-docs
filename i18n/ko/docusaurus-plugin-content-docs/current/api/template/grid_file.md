---
sidebar_label: grid_file
title: grid_file 템플릿
description: "트리 열의 자식 항목 아이콘을 지정합니다"
---

# grid_file

### Description

@short: 트리 열의 자식 항목 아이콘을 지정합니다

@signature: grid_file: (task: Task) =\> string;

### Parameters

- `task` - (필수) *Task* - 작업 객체

### Returns
- `text` - (string) - 간트 차트에 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.grid_file = function(item) {
    return "<div class='gantt_tree_icon gantt_file'></div>";
};
~~~

### Related Guides
- [그리드의 템플릿](guides/table-templates.md)
- [트리 열 구성](guides/tree-column.md)