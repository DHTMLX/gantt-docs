--- 
sidebar_label: click_drag
title: настройка click_drag
description: "Включает продвинутый drag-n-drop"
---

# click_drag

### Description

@short: Включает продвинутый drag-n-drop

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

**Значение по умолчанию:** \{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" \}

### Details

:::note
Эта конфигурация определяется в расширении **click_drag**, поэтому необходимо активировать плагин [click_drag](guides/extensions-list.md#advanced-drag-n-drop) с помощью метода [gantt.plugins](api/method/plugins.md). Подробности смотрите в статье [Создание/Выбор задач с DnD](guides/advanced-dnd.md).
:::

Объект **click_drag** включает следующие свойства:

- **className** - (*string*) устанавливает пользовательский CSS класс для выбранного элемента
- **viewPort** - (*HTMLElement*) элемент, к которому прикрепляется событие и который выделяется
- **useRequestAnimationFrame** - (*boolean*) определяет, используется ли requestAnimationFrame во время отрисовки
- **callback** - (*function*) - функция, которая будет вызвана при отпускании кнопки мыши. Принимает 6 параметров:
    - **startPoint** - (*object*) — объект типа: 
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 
  где absolute - координаты левого верхнего угла документа, а relative - координаты левого верхнего элемента, используемого как viewPort 
    - **endPoint** - (*object*) объект типа: 
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 
  где absolute - координаты левого верхнего угла документа, а relative - координаты левого верхнего элемента, используемого как viewPort
     - **startDate** - (*Date*) дата, которая соответствует начальной точке
    - **endDate** - (*Date*) дата, которая соответствует конечной точке
    - **tasksBetweenDates** - (*array*) массив задач между точками начала и конца
    - **tasksInRows** - (*array*) массив задач, выбранных между начальной и конечной координатами по вертикали
- **singleRow** - (*boolean*) true, чтобы добавлять выделение только в одну строку, равную высоте задачи
- **ignore** - (*string*) CSS-селектор. Перетаскивание не будет активировано для элементов, которые соответствуют селектору
- **useKey** - (*string|boolean*) если свойство указано, перетаскивание будет активировано только при нажатии указанного модификатора. Поддерживаемые значения: "ctrlKey", "shiftKey", "metaKey", "altKey"

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    ignore: ".gantt_task_line, .gantt_marker_content, .gantt_task_link",
    useKey: "ctrlKey"
};
~~~

- **render** - (*function*) функция, создающая элемент, отображаемый во время перетаскивания. Принимает два параметра:
    - **startPoint** - (*object*) — объект типа:
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 
  где absolute - координаты левого верхнего угла документа, а relative - координаты левого верхнего элемента, используемого как viewPort 
    - **endPoint** - (*object*) объект типа: 
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 
  где absolute - координаты левого верхнего угла документа, а relative - координаты левого верхнего элемента, используемого как viewPort

Вот пример использования функции **render**:

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
- [Создание/Выбор задач с DnD](guides/advanced-dnd.md)