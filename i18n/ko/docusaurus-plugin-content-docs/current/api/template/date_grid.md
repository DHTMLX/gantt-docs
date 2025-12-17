---
sidebar_label: date_grid
title: date_grid template
description: "그리드 내에서 날짜(`Date` 값)를 표시하는 열에 표시되는 내용을 정의합니다."
---

# date_grid

### Description

@short: 그리드 내에서 날짜(`Date` 값)를 표시하는 열에 표시되는 내용을 정의합니다.

@signature: date_grid: string

### Parameters

- `date` - (required) *Date* - 포맷팅할 날짜 값
- `task` - (required) *Task* - 날짜와 관련된 작업 객체
- `column` - (required) *string* - 템플릿을 호출하는 열의 이름

### Returns
- ` text` - (string) - gantt에 표시될 html 텍스트

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
- [Gantt. 그리드 내 날짜가 포함된 열의 포맷 설정하기](https://snippet.dhtmlx.com/87j43fc3) 

### Related API
- [date_grid](api/config/date_grid.md)
- [grid_date_format](api/template/grid_date_format.md)

### Related Guides
- [그리드의 템플릿](guides/table-templates.md)

