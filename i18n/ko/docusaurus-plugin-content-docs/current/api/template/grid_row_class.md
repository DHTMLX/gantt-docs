---
sidebar_label: grid_row_class
title: grid_row_class template
description: "그리드 행에 할당되는 CSS 클래스를 정의합니다."
---

# grid_row_class

### Description

@short: 그리드 행에 할당되는 CSS 클래스를 정의합니다.

@signature: grid_row_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - 작업이 시작되도록 설정된 날짜
- `end` - (required) *Date* - 작업이 완료될 것으로 예상되는 날짜
- `task` - (required) *Task* - 작업 객체 자체

### Returns
- ` text` - (string | void) - 해당 항목에 적용할 CSS 클래스

### Example

~~~jsx
gantt.templates.grid_row_class = function(start, end, task){
    return "";
};
~~~

### Details

그리드와 타임라인 영역의 모든 홀수 행에는 **odd**라는 추가 CSS 클래스가 포함되어 있어, 교차 행 색상을 만드는 데 사용할 수 있습니다:

~~~css
.gantt_row.odd, .gantt_task_row.odd{
    background: silver;
}

.gantt_row, .gantt_task_row {
    background: white;
}
~~~

기본적으로 이 스타일은 짝수 행에만 적용됩니다. 홀수 행에 스타일을 적용하려면 CSS 규칙의 선택자에 **odd** 클래스를 추가해야 합니다. 따라서 모든 행에 동일한 색상을 적용하려면, 기본 CSS 규칙이 [더 높은 특이성을 가지며 우선 적용되기 때문에](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) '.odd' 클래스가 있는 선택자와 없는 선택자 모두에 대한 규칙을 포함해야 합니다.

~~~css
.gantt_row.odd, .gantt_task_row.odd,
.gantt_row, .gantt_task_row {
    background: white;
}
~~~

이 방법은 [grid_row_class](api/template/grid_row_class.md) 및 [task_row_class](api/template/task_row_class.md) 템플릿을 통해 할당된 사용자 정의 CSS 클래스에도 적용됩니다:


~~~js
gantt.templates.grid_row_class = function(start, end, task){
    return "wheat_color";
};
~~~
<br>

~~~css
.wheat_color,
.wheat_color.odd{
    background:wheat;
}
~~~

화면에서 홀수 행 대신 짝수 행이 강조 표시되는 것처럼 보일 수 있습니다. 하지만 [row indexes](api/method/gettaskindex.md)를 확인하면 스타일이 홀수 인덱스(1, 3, 5 등)를 가진 행에 적용된 것을 알 수 있습니다.

### Related Guides
- [그리드의 템플릿](guides/table-templates.md)

