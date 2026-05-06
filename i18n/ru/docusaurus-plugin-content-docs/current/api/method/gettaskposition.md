---
sidebar_label: getTaskPosition
title: getTaskPosition method
description: "вычисляет положение и размер DOM-элемента задачи во временной шкале"
---

# getTaskPosition

### Description

@short: Вычисляет положение и размер DOM-элемента задачи во временной шкале

@signature: getTaskPosition: (task: Task, from?: Date, to?: Date) => any

### Parameters

- `task` - (required) *Task* - сам объект задачи
- `from` - (optional) *Date* - начальная дата элемента
- `to` - (optional) *Date* - конечная дата элемента

### Returns
- `object` - (object) - объект, описывающий размер

### Example

~~~jsx
// добавление отображения базовой линии
gantt.addTaskLayer(function draw_planned(task) {
    if (task.planned_start && task.planned_end) {
        const sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end); /*!*/
        const el = document.createElement('div');
        el.className = 'baseline';
        el.style.left = sizes.left + 'px';
        el.style.top = sizes.top + 'px';
        el.style.width = sizes.width + 'px';
        el.style.height= sizes.height + 'px';
        return el;
    }
    return false;
});
~~~

### Related samples
- [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

The method returns an object with the following properties:

- **left** - положение CSS left в пикселях
- **top** - положение CSS top в пикселях
- **height** - высота CSS у элемента полосы в пикселях (определяется либо настройкой [bar_height](api/config/bar_height.md) или свойством *task.bar_height* объекта задачи)
- **rowHeight** - высота CSS строки задачи в пикселях (определяется либо настройкой [row_height](api/config/row_height.md) или свойством *task.row_height* объекта задачи) (добавлено в v7.1)
- **width** - ширина CSS в пикселях (определяется периодом между датами начала и конца задачи или значениями дат 'from', 'to', если они заданы)

Если передано только одно значение аргумента, метод будет использовать **task.start_date**/**task.end_date** для вычисления значений **width** и **left**. Иначе будут использованы значения дат из вторых и третих аргументов.

Обратите внимание, что метод всегда использует обе части даты и времени предоставленных дат, независимо от настроек масштаба времени. Это означает, что два вызова приведенной ниже функции:

~~~js
gantt.getTaskPosition(task, new Date(2019, 3, 19, 1, 0), new Date(2019, 3, 19, 1, 0)); 
// и
gantt.getTaskPosition(task, new Date(2019, 3, 19, 1, 0), new Date(2019, 3, 19, 5, 0)); 
~~~

вернут боксы разного размера, не только в масштабе *hour*, но и в масштабах *day/month/year*.