---
sidebar_label: click_drag
title: click_drag config
description: "включает расширенное drag-n-drop"
---

# click_drag

### Description

@short: Включает расширенное drag-n-drop

@signature: click_drag: undefined | ClickDrag

### Example

~~~jsx
gantt.config.click_drag = {
    callback: function(
        startPosition,
        endPosition,
        startDate,
        endDate,
        tasksBetween,
        rowsBetween
    ){
        var parentId = gantt.config.root_id;
        if(rowsBetween.length){
            parentId = rowsBetween[0].id;
        }

        gantt.createTask({
            text: "New task",
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        }, parentId);

    },
    singleRow: true
};
~~~

**Default value:** \{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" \}

### Details

:::note
 Эта конфигурация является частью расширения **click_drag**, поэтому убедитесь, что вы включили плагин [click_drag](guides/extensions-list.md#advanceddragndrop) через метод [gantt.plugins](api/method/plugins.md). Для подробностей смотрите статью [Создание/Выделение задач с помощью DnD](guides/advanced-dnd.md). 
:::

Расширение **click_drag** предоставляет следующие возможности:

- создание задач с помощью drag-and-drop
- установка времени для незапланированных задач через drag-and-drop
- выделение задач с помощью drag-and-drop
- создание частей разделённых задач через drag-and-drop (PRO версия)

Объект **gantt.config.click_drag** имеет следующие свойства:

- **className** -  (*string*) задаёт пользовательский CSS класс для выделенного элемента
- **viewPort** - (*HTMLElement*) определяет элемент, к которому прикрепляются события и в котором происходит выделение
- **useRequestAnimationFrame** - (*boolean*) указывает, используется ли requestAnimationFrame при рендеринге
- **callback** - (*function*) вызывается при отпускании кнопки мыши. Получает 6 параметров:
    - **startPoint** - (*object*) объект следующей структуры: <br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, <br>
  где absolute - координаты относительно левого верхнего угла документа, а relative - координаты относительно элемента viewPort
    - **endPoint** - (*object*) в том же формате, что и startPoint
     - **startDate** - (*Date*) дата, соответствующая позиции начала drag
    - **endDate** - (*Date*) дата, соответствующая позиции конца drag
    - **tasksBetweenDates** - (*array*) задачи, найденные между startDate и endDate
    - **tasksInRows** - (*array*) задачи, выделенные между начальной и конечной вертикальными координатами
- **singleRow** - (*boolean*) если true, выделение ограничивается одной строкой по высоте задачи
- **ignore** - (*string*) CSS селектор элементов, для которых drag-and-drop отключён
- **useKey** - (*string|boolean*) если задано, drag-and-drop активируется только при зажатой указанной клавише-модификаторе. Поддерживаемые ключи: "ctrlKey", "shiftKey", "metaKey", "altKey"

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    ignore: ".gantt_task_line, .gantt_marker_content, .gantt_task_link",
    useKey: "ctrlKey"
};
~~~

- **render** - (*function*) создаёт элемент, отображаемый во время перетаскивания. Принимает два аргумента:
    - **startPoint** - (*object*) структура:<br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, <br>
  координаты absolute и relative описаны выше
    - **endPoint** - (*object*) в том же формате, что и startPoint

Пример реализации функции **render**:

~~~js
var node;
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true,
    render: function(start, end){
        if(!(node && node.parentNode)){
            node = document.createElement("div");
        }
        var left = Math.min(start.relative.left, end.relative.left);

        node.style.top = (start.relative.top - gantt.config.row_height) + "px";
        node.style.left = left + "px";
        node.style.width = Math.abs(start.relative.left - end.relative.left) + "px";
        node.style.height = gantt.config.row_height + "px";
        node.style.position = "absolute";
        return node;
    }
};
~~~

### Related Guides
- [Создание/Выделение задач с помощью DnD](guides/advanced-dnd.md)

