---
sidebar_label: grid_folder
title: grid_folder 템플릿
description: "트리 열에서 상위 항목의 아이콘을 지정합니다"
---

# grid_folder

### 설명

@short: 트리 열의 상위 아이콘을 지정합니다

@signature: grid_folder: (task: Task) => string;

### 매개변수

- `task` - (필수) *Task* - 태스크 객체

### 반환값
- ` text` - (string) - gantt에 렌더링될 HTML 텍스트

### 예제

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
