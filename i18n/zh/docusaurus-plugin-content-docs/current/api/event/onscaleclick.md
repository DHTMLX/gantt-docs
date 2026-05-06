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

- `e` - (必填) 事件对象 - 原生事件对象
- `date` - (必填) 日期 - 被点击单元格的日期

### Example

~~~jsx
gantt.attachEvent("onScaleClick", function (e, date) {
    // 在这里插入您的自定义逻辑 
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