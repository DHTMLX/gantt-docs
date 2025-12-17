---
sidebar_label: scale_cell_class
title: scale_cell_class template
description: "определяет CSS класс, который будет назначен ячейкам в шкале времени области timeline"
---

# scale_cell_class

### Description

@short: Определяет CSS класс, который будет назначен ячейкам в шкале времени области timeline

@signature: scale_cell_class: (date: Date) =\> string | void;

### Parameters

- `date` - (required) *Date* - конкретная дата, представленная ячейкой

### Returns
- ` text` - (string | void) - CSS класс, который будет применён к соответствующему элементу

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

При использовании [расчёта рабочего времени](guides/working-time.md) можно опираться на [isWorkTime](api/method/isworktime.md) вместо использования фиксированных значений:

~~~js
gantt.config.work_time = true;

gantt.templates.scale_cell_class = function(date){
       if(!gantt.isWorkTime(date))
          return true;
};
~~~

Если установлено несколько шкал через свойство [gantt.config.scales](api/config/scales.md), этот шаблон влияет только на первую шкалу. Чтобы назначить CSS классы ячейкам в других шкалах, используйте атрибут **css** внутри конфигурации [gantt.config.scales](api/config/scales.md):

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
- [Шаблоны области временной шкалы](guides/timeline-templates.md)
- [Скрытие временных единиц на шкале](guides/custom-scale.md)
- [Выделение временных слотов](guides/highlighting-time-slots.md)
- [Расчёт рабочего времени](guides/working-time.md)
- [Настройка шкалы](guides/configuring-time-scale.md#styling)

