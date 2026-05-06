---
sidebar_label: onScaleClick
title: onScaleClick 이벤트
description: "타임 스케일의 셀을 사용자가 클릭할 때 발생합니다"
---

# onScaleClick

### Description

@short: 타임 스케일의 셀을 사용자가 클릭할 때 발생합니다

@signature: onScaleClick: (e: Event, date: Date) =\> void;

### Parameters

- `e` - (required) *Event* - a native event object
- `date` - (required) *Date* - 클릭된 셀의 날짜

### Example

~~~jsx
gantt.attachEvent("onScaleClick", function (e, date) {
    // 여기에 코드 작성
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