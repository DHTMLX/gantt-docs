---
sidebar_label: onScaleClick
title: onScaleClick event
description: "사용자가 타임 스케일 내 셀을 클릭할 때 트리거됩니다."
---

# onScaleClick

### Description

@short: 사용자가 타임 스케일 내 셀을 클릭할 때 트리거됩니다.

@signature: onScaleClick: (e: Event, date: Date) =\> void;

### Parameters

- `e` - (required) *Event* - 네이티브 이벤트 객체
- `date` - (required) *Date* - 클릭된 셀에 해당하는 날짜

### Example

~~~jsx
gantt.attachEvent("onScaleClick", function (e, date) {
    //여기에 사용자 정의 코드를 작성하세요
});
~~~

### Details

~~~js
let selected_column = null;

gantt.attachEvent("onScaleClick", function (e, date) {
    selected_column = date;
    const pos = gantt.getScrollState();
    gantt.render();
    gantt.scrollTo(pos.x, pos.y);
});

function is_selected_column (column_date){
    if(selected_column && column_date.valueOf() == selected_column.valueOf()){
        return true;
    }
    return false;
}
~~~
