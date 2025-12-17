---
sidebar_label: getTaskPosition
title: getTaskPosition method
description: "определяет позицию и размер DOM-элемента задачи внутри области timeline."
---

# getTaskPosition

### Description

@short: Определяет позицию и размер DOM-элемента задачи внутри области timeline.

@signature: getTaskPosition: (task: Task, from?: Date, to?: Date) =\> any

### Parameters

- `task` - (required) *Task* - объект задачи
- `from` - (optional) *Date* - опционально, дата начала для элемента
- `to` - (optional) *Date* - опционально, дата окончания для элемента

### Returns
- ` object` - (object) - объект, описывающий размер и позицию

### Example

~~~jsx
// добавление отображения baseline
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

Этот метод возвращает объект со следующими свойствами:

- **left** - CSS-свойство left в пикселях
- **top** - CSS-свойство top в пикселях
- **height** - CSS-высота элемента бара в пикселях (задается либо конфигурацией [bar_height](api/config/bar_height.md), либо свойством *task.bar_height*)
- **rowHeight** - CSS-высота строки задачи в пикселях (задается либо конфигурацией [row_height](api/config/row_height.md), либо свойством *task.row_height*) (добавлено в версии v7.1)
- **width** - CSS-ширина в пикселях (основана на периоде между датами начала и окончания задачи или на опциональных датах 'from' и 'to', если они заданы)

Если передать только один аргумент, метод использует **task.start_date** и **task.end_date** для вычисления **width** и **left**. Если указаны второй и третий аргументы, будут использованы именно эти даты.

Учтите, что метод всегда учитывает как дату, так и время, независимо от настроек time scale. Например, эти два вызова:

~~~js
gantt.getTaskPosition(task, new Date(2019, 3, 19, 1, 0), new Date(2019, 3, 19, 1, 0)); 
// и
gantt.getTaskPosition(task, new Date(2019, 3, 19, 1, 0), new Date(2019, 3, 19, 5, 0)); 
~~~

вернут блоки разного размера, вне зависимости от того, используется ли шкала *hour*, *day*, *month* или *year*.

