---
sidebar_label: task_end_date
title: task_end_date template
description: "라이트박스에서 작업(task)의 종료 날짜가 어떻게 표시될지 제어합니다."
---

# task_end_date

### Description

@short: 라이트박스에서 작업(task)의 종료 날짜가 어떻게 표시될지 제어합니다.

@signature: task_end_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 포맷팅이 필요한 날짜

### Returns
- ` text` - (string) - gantt에서 표시될 html 텍스트

### Example

~~~jsx
gantt.templates.task_end_date = function(date){
   return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};
~~~

### Details

## 종료 날짜를 포함하는 형식 조정하기

이 템플릿을 재정의하여 gantt에서 작업 종료 날짜가 어떻게 표시될지 수정할 수 있습니다. 예를 들어, 작업 기간에 종료 날짜를 포함시키는 방식으로 변경할 수 있습니다.

예를 들어, 2020년 4월 2일에 시작하여 하루 동안 지속되는 작업이 있다고 가정해 봅시다.

기본적으로 종료 날짜는 2020년 4월 3일(`03-04-2020 00:00:00`)로 표시됩니다:

- [라이브 데모: 기본 형식](https://snippet.dhtmlx.com/5/24f73d6ec)

![task_end_date_template_default](/img/task_end_date_template_default.png)

종료 날짜 표시를 2020년 4월 2일로 변경할 수도 있습니다:

- [라이브 데모: 종료 날짜 포함 형식](https://snippet.dhtmlx.com/t1k1rwo7)

![task_end_date_template](/img/task_end_date_template.png)

이를 위해 **columns** 설정을 다음과 같이 오버라이드합니다:

~~~js

gantt.config.columns = [
  {name: "wbs", label: "#", width: 60, align: "center", template: gantt.getWBSCode},
  {name: "text", label: "Name", tree: true, width: 200, resize: true},
  {name: "start_date", label: "Start", width:80, align: "center", resize: true},
  {name: "end_date", label: "Finish", width:80, align: "center", resize: true},    
  {name:"add"}
];
gantt.templates.task_end_date = function(date){
   return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};

var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
   if(column === "end_date"){
     return gridDateToStr(new Date(date.valueOf() - 1)); 
   }else{
     return gridDateToStr(date); 
   }
}
gantt.init("gantt_here");

~~~

종료 날짜 포맷팅에 관한 추가 정보는 [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates) 문서를 참고하세요.

### Related API
- [task_date](api/config/task_date.md)
- [task_date](api/template/task_date.md)
- [grid_date_format](api/template/grid_date_format.md)

### Related Guides
- [라이트박스의 템플릿](guides/lightbox-templates.md)
- [데이터 로딩](guides/loading.md#taskenddatedisplayampinclusiveenddates)

