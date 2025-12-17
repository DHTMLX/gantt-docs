---
sidebar_label: scale_cell_class
title: scale_cell_class template
description: "定义将分配给时间线区域时间刻度中单元格的CSS类"
---

# scale_cell_class

### Description

@short: 定义将分配给时间线区域时间刻度中单元格的CSS类

@signature: scale_cell_class: (date: Date) =\> string | void;

### Parameters

- `date` - (required) *Date* - 表示单元格对应的具体日期

### Returns
- ` text` - (string | void) - 要应用于相关项的CSS类

### Example

~~~jsx
<style>
.weekend{ background: #f4f7f4 !important;}
</style>
~~~
~~~js
gantt.templates.scale_cell_class = function(date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend";
    }
};
~~~

### Related samples
- [Highlighting weekends](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)

### Details

在使用[工作时间计算](guides/working-time.md)时，可以依赖 [isWorkTime](api/method/isworktime.md)，而不是使用固定值:

~~~js
gantt.config.work_time = true;

gantt.templates.scale_cell_class = function(date){
       if(!gantt.isWorkTime(date))
          return true;
};
~~~

如果通过[gantt.config.scales](api/config/scales.md)属性设置了多个刻度，此模板仅影响第一个刻度。要为其他刻度中的单元格分配CSS类，请在[gantt.config.scales](api/config/scales.md)配置中使用 **css** 属性:

~~~js
gantt.config.scales = [
    { unit: "month", step: 1, date: "%F" },
    { unit: "week", step: 1, date: "%W" },
    {
        unit: "day", step: 1, date: "%d", css: function (date) { /*!*/
            if (!gantt.isWorkTime({ date: date })) { /*!*/
                return "weekend"; /*!*/
            } /*!*/
        } /*!*/
    },
];
~~~

### Related API
- [scale_row_class](api/template/scale_row_class.md)
- [timeline_cell_class](api/template/timeline_cell_class.md)

### Related Guides
- [时间线区域的模板](guides/timeline-templates.md)
- [在时间刻度中隐藏时间单位](guides/custom-scale.md)
- [高亮显示时间段](guides/highlighting-time-slots.md)
- [工作时间计算](guides/working-time.md)
- [设置时间刻度](guides/configuring-time-scale.md)

