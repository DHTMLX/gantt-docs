---
sidebar_label: date_grid
title: date_grid template
description: "그리드에서 날짜를 표시하는 열의 내용을 지정합니다(`Date` 값을 반환)."
---

# date_grid

### Description

@short: 그리드에서 날짜를 표시하는 열의 내용을 지정합니다(`Date` 값을 반환)

@signature: date_grid: (date: Date, task: Task, column: string) => string;

### Parameters

- `date` - (필수) *Date* - 포맷이 필요한 날짜
- `task` - (필수) *Task* - 작업 객체
- `column` - (필수) *string* - 템플릿을 호출한 열의 이름

### Returns
- `text` - (string) - Gantt 차트에 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.date_grid = function(date, task, column){
   if(task && gantt.isUnscheduledTask(task) && gantt.config.show_unscheduled){
        return gantt.templates.task_unscheduled_time(task);
       }else{
        return gantt.templates.grid_date_format(date);
   }
}
~~~

### Related samples
- [Gantt. 그리드에서 날짜가 표시되는 열의 형식 설정](https://snippet.dhtmlx.com/87j43fc3)

### Related API
- [date_grid](api/config/date_grid.md)
- [grid_date_format](api/template/grid_date_format.md)

### Related Guides
- [그리드의 템플릿](guides/table-templates.md)