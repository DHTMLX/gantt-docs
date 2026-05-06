--- 
sidebar_label: scale_cell_class
title: Шаблон scale_cell_class
description: "указывается CSS-класс, который будет применяться к ячейкам временной шкалы панели таймлайна"
---

# scale_cell_class

### Description

@short: Указывает CSS-класс, который будет применяться к ячейкам временной шкалы панели таймлайна

@signature: scale_cell_class: (date: Date) => string | void;

### Parameters

- `date` - (required) *Date* - дата ячейки

### Returns
- ` text` - (string | void) - CSS-класс для соответствующего элемента

### Example

~~~js
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
- [Выделение выходных](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)

### Details

Note that while using [work time calculations](guides/working-time.md), you can use [isWorkTime](api/method/isworktime.md) instead of hardcoded values:

~~~js
gantt.config.work_time = true;

gantt.templates.scale_cell_class = function(date){
       if(!gantt.isWorkTime(date))
          return true;
};
~~~

If you have specified several scales via the [gantt.config.scales](api/config/scales.md) property, the template will be applied only to the first scale. To specify the CSS class to the cells of any other scale, use the **css** attribute of the [gantt.config.scales](api/config/scales.md) property:

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
- [Шаблоны области таймлайна](guides/timeline-templates.md)
- [Скрытие временных единиц на шкале](guides/custom-scale.md)
- [Выделение временных слотов](guides/highlighting-time-slots.md)
- [Расчет рабочего времени](guides/working-time.md)
- [Настройка шкалы](guides/configuring-time-scale.md#styling)