---
sidebar_label: onScaleClick
title: onScaleClick event
description: "当用户点击时间刻度中的单元格时触发"
---

# onScaleClick

### Description

@short: 当用户点击时间刻度中的单元格时触发

@signature: onScaleClick: (e: Event, date: Date) =\> void;

### Parameters

- `e` - (required) *Event* - 一个原生事件对象
- `date` - (required) *Date* - 对应于被点击单元格的日期

### Example

~~~jsx
gantt.attachEvent("onScaleClick", function (e, date) {
    //你的自定义代码
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
