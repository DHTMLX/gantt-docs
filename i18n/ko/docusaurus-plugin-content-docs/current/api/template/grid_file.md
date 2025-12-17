---
sidebar_label: grid_file
title: grid_file template
description: "트리 컬럼 내 자식 항목의 아이콘을 정의합니다."
---

# grid_file

### Description

@short: 트리 컬럼 내 자식 항목의 아이콘을 정의합니다.

@signature: grid_file: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - 작업 객체

### Returns
- ` text` - (string) - 간트 차트에 표시될 html 텍스트

### Example

~~~jsx
gantt.templates.grid_file = function(item) {
    return "<div class='gantt_tree_icon gantt_file'></div>";
};
~~~

### Related Guides
- [그리드의 템플릿](guides/table-templates.md)
- [트리 컬럼 구성하기](guides/tree-column.md)
