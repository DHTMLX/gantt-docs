---
sidebar_label: grid_folder
title: grid_folder template
description: "트리 컬럼의 상위 항목에 사용되는 아이콘을 정의합니다"
---

# grid_folder

### Description

@short: 트리 컬럼의 상위 항목에 사용되는 아이콘을 정의합니다

@signature: grid_folder: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - 작업 객체

### Returns
- ` text` - (string) - gantt에 렌더링될 html 텍스트

### Example

~~~jsx
gantt.templates.grid_folder = function(item) {
  return `<div 
   class='gantt_tree_icon gantt_folder_${(item.$open ? "open" : "closed")}'>
   </div>`;
};
~~~

### Related Guides
- [그리드의 템플릿](guides/table-templates.md)
- [트리 컬럼 구성하기](guides/tree-column.md)
