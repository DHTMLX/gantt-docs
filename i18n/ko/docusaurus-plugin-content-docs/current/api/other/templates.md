---
sidebar_label: templates
title: templates config
description: "간트 차트에서 날짜, 제목, tooltip의 포맷팅 templates를 설정합니다."
---

# templates

### Description

@short: 간트 차트에서 날짜, 제목, tooltip의 포맷팅 templates를 설정합니다.

@signature: templates: GanttTemplates

### Example

~~~jsx
//테이블의 'Start Time' 열에 날짜가 표시되는 방식을 정의합니다.
gantt.templates.date_grid = function(date){
    return gantt.date.str_to_date(gantt.config.date_grid);
};
~~~

### Details

**templates** 객체에 대한 자세한 내용은 메인 API 페이지의 전용 섹션에서 확인할 수 있습니다.<br> 
["Gantt API: Templates"](api/overview/templates-overview.md).
