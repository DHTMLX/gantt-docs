--- 
sidebar_label: templates
title: 템플릿 구성
description: "간트 차트에서 날짜, 제목, 툴팁의 포맷 템플릿을 정의합니다"
---

# templates

### Description

@short: 간트 차트에서 날짜, 제목, 툴팁의 포맷 템플릿을 정의합니다

@signature: templates: GanttTemplates

### Example

~~~jsx
//테이블의 'Start Time' 열에서 날짜 형식을 지정합니다
gantt.templates.date_grid = function(date){
    return gantt.date.str_to_date(gantt.config.date_grid);
};
~~~

### Details

**templates** 객체의 속성은 루트 API 페이지의 별도 챕터인 "Gantt API: Templates"에서 설명됩니다.