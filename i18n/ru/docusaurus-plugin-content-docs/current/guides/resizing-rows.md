---
title: "Изменение размера строк в гриде"
sidebar_label: "Изменение размера строк в гриде"
---

# Изменение размера строк в грид

Существует возможность изменить высоту отдельных строк в грид.

Библиотека dhtmlxGantt предоставляет 2 способа управления высотой строк:

- Установка одновременно высоты строки и высоты панели задач для необходимого объекта задачи;
- Перетаскиванием нижнего края строки грид.

:::note
Функциональность доступна в версиях 7.1 и выше.
:::

## Установка высоты строки

Вы можете настроить высоту конкретной строки в соответствии с вашими потребностями.

:::note
Индивидуальная высота строки в настоящее время не совместима с [static background rendering](api/config/static_background.md).
:::

![row_height](/img/row_height.png)

Для этого нужно переопределить свойства **row_height** и **bar_height** объекта задачи в наборе данных: 

**Указание типа задачи в наборе данных**
~~~js
gantt.parse({
    data: [
        { id: 11, text: "Project #1", type: "project", progress: 0.6, open: true, 
            row_height: 70, bar_height: 60 }, /*!*/
        { id: 12, text: "Task #1", start_date: "03-04-2018", duration: "5", 
            parent: "11", progress: 1, open: true },
        { id: 13, text: "Task #2", start_date: "03-04-2018", type: "project", 
            parent: "11", progress: 0.5, open: true }
    ],
    links: []
});
~~~

или можно реализовать это динамически:

~~~js
gantt.getTask(11).row_height = 50;
gantt.getTask(11).bar_height = 25;
// перерасчет Gantt для применения изменений
gantt.render();
~~~

В случае, если атрибуты **row_height** и **bar_height** объекта задачи не указаны или пусты (состояние по умолчанию), будут использоваться значения [gantt.config.row_height](api/config/row_height.md) и [gantt.config.bar_height](api/config/bar_height.md).

## Изменение размера строк перетаскиванием

![resize_row](/img/resize_row.png)

Чтобы предоставить пользователю возможность изменять размер строки в гриде путем перетаскивания нижнего края строки, установите параметр [gantt.config.resize_rows](api/config/resize_rows.md) в значение *true*:

~~~js
gantt.config.resize_rows = true;
~~~


[Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)


Опция [gantt.config.min_task_grid_row_height](api/config/min_task_grid_row_height.md) позволяет определить минимальную высоту строки, которая может быть задана для задачи во время изменения размера:

~~~js
gantt.config.min_task_grid_row_height = 45;
~~~

### События

Существует 4 события, которые можно использовать для управления поведением изменения размера строки при перетаскивании:

- [onBeforeRowResize](api/event/onbeforerowresize.md) - срабатывает перед тем, как пользователь начнет изменять высоту строки перетаскиванием
- [onRowResize](api/event/onrowresize.md) - срабатывает во время перетаскивания границы строки для изменения высоты
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md) - срабатывает перед завершением изменения высоты строки
- [onAfterRowResize](api/event/onafterrowresize.md) - срабатывает после завершения изменения высоты строки