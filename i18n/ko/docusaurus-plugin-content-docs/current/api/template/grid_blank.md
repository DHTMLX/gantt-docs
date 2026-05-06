---
sidebar_label: grid_blank
title: grid_blank 템플릿
description: "트리 열의 자식 아이템의 레이블 앞에 삽입되는 사용자 정의 컨텐츠를 지정합니다"
---

# grid_blank

### Description

@short: 트리 열의 자식 아이템의 레이블 앞에 삽입되는 사용자 정의 컨텐츠를 지정합니다

@signature: grid_blank: (task: Task) => string;

### Parameters

- `task` - (필수) *Task* - 작업 객체

### Returns
- ` text` - (string) - gantt에서 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.grid_blank = function(item) {
    return "<div class='gantt_tree_icon gantt_blank'></div>";
};
~~~

### Related Guides
- [그리드의 템플릿](guides/table-templates.md)
- [트리 컬럼 구성하기](guides/tree-column.md)
