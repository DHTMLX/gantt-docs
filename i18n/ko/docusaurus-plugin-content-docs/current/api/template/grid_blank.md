---
sidebar_label: grid_blank
title: grid_blank template
description: "트리 컬럼의 자식 항목 라벨 앞에 표시되는 사용자 정의 콘텐츠를 정의합니다."
---

# grid_blank

### Description

@short: 트리 컬럼의 자식 항목 라벨 앞에 표시되는 사용자 정의 콘텐츠를 정의합니다.

@signature: grid_blank: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - 작업 객체

### Returns
- ` text` - (string) - gantt에 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.grid_blank = function(item) {
    return "<div class='gantt_tree_icon gantt_blank'></div>";
};
~~~

### Related Guides
- [그리드의 템플릿](guides/table-templates.md)
- [트리 컬럼 구성하기](guides/tree-column.md)
