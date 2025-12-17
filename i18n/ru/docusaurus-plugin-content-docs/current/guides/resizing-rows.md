---
title: "Изменение размера строк в гриде"
sidebar_label: "Изменение размера строк в гриде"
---

Изменение размера строк в гриде
============================

Вы можете настраивать высоту отдельных строк в гриде.


Библиотека dhtmlxGantt предоставляет два способа управления высотой строки:

- Установить высоту строки и высоту полосы задачи для конкретного объекта задачи;
- Изменять размер строки, перетаскивая нижнюю границу строки грида.

:::info
Эта функция доступна начиная с версии 7.1.
:::

## Установка высоты строки {#settingtherowheight}
------------------------

Вы можете настроить высоту конкретной строки по необходимости.

:::note
В настоящее время индивидуальная высота строки не работает с [static background rendering](api/config/static_background.md).
:::

![row_height](/img/row_height.png)

Для этого переопределите свойства **row_height** и **bar_height** в объекте задачи внутри вашего набора данных: 

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

Кроме того, вы можете задать эти свойства динамически:

~~~js
gantt.getTask(11).row_height = 50;
gantt.getTask(11).bar_height = 25;
// повторно отрисовать Gantt для применения изменений
gantt.render();
~~~

Если атрибуты **row_height** и **bar_height** отсутствуют или пусты (что является значением по умолчанию), будут использованы значения из [gantt.config.row_height](api/config/row_height.md) и [gantt.config.bar_height](api/config/bar_height.md).

## Изменение размера строк с помощью drag and drop {#resizingrowsbydraganddrop}
---------------------------------

![resize_row](/img/resize_row.png)

Чтобы пользователи могли изменять размер строки, перетаскивая её нижнюю границу, включите опцию [gantt.config.resize_rows](api/config/resize_rows.md):

~~~js
gantt.config.resize_rows = true;
~~~


[Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)


Опция [gantt.config.min_task_grid_row_height](api/config/min_task_grid_row_height.md) позволяет задать минимальную высоту строки при изменении размера:

~~~js
gantt.config.min_task_grid_row_height = 45;
~~~

### События

Для управления изменением размера строки с помощью drag-and-drop доступны четыре события:

- [onBeforeRowResize](api/event/onbeforerowresize.md) - вызывается перед началом изменения размера строки пользователем
- [onRowResize](api/event/onrowresize.md) - вызывается во время перетаскивания границы строки для изменения размера
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md) - вызывается непосредственно перед завершением изменения размера строки
- [onAfterRowResize](api/event/onafterrowresize.md) - вызывается после завершения изменения размера строки

