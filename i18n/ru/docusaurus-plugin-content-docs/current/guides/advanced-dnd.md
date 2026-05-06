---
title: "Создание/Выбор задач с помощью DnD"
sidebar_label: "Создание/Выбор задач с помощью DnD"
---

# Создание/Выбор задач с помощью DnD

Библиотека dhtmlxGantt предоставляет расширение, которое включает расширенный функционал перетаскивания (drag-n-drop) при работе с задачами на временной шкале.

В целом расширение **click_drag** позволяет:

- [создание задач с помощью перетаскивания](#creating-tasks-with-drag-n-drop)
- [установку времени для задач без расписания с помощью перетаскивания](#setting-time-for-unscheduled-tasks)
- [выбор задач с помощью перетаскивания](#selecting-tasks-with-drag-n-drop)
- [создание частей разбитых задач с помощью перетаскивания](#creating-parts-of-split-tasks) (PRO версия)

:::note
Чтобы начать использование расширения, включите плагин [click_drag](guides/extensions-list.md#advanced-drag-n-drop) с помощью метода [gantt.plugins](api/method/plugins.md).
:::

Чтобы включить продвинутое перетаскивание, задайте конфигурационную опцию [click_drag](api/config/click_drag.md) и укажите необходимые свойства из приведённого ниже списка внутри её объекта: 

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- **className** -  (*string*) устанавливает пользовательский CSS‑класс для выбранного элемента
- **render** -  (*function*) функция, создающая элемент, отображаемый во время перетаскивания. Принимает два параметра: 
    - **startPoint** - (*object*) объект типа:


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  где absolute — координаты левого верхнего угла документа, а relative — координаты левого верхнего элемента, используемого в качестве viewport 
    - **endPoint** - (*object*) объект типа: 


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  где absolute — координаты левого верхнего угла документа, а relative — координаты левого верхнего элемента, используемого в качестве viewport 
- **viewPort** - (*HTMLElement*) элемент, к которому привязаны события и который используется для выбора
- **useRequestAnimationFrame** - (*boolean*) определяет, используется ли requestAnimationFrame во время отрисовки
- **callback** - (*function*) функция, которая будет вызываться при отпускании кнопки мыши. Принимает 6 параметров:
    - **startPoint** - (*object*) объект типа: 


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  где absolute — координаты левого верхнего угла документа, а relative — координаты левого верхнего элемента, используемого в качестве viewport 
    - **endPoint** - (*object*) объект типа: 


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  где absolute — координаты левого верхнего угла документа, а relative — координаты левого верхнего элемента, используемого в качестве viewport 
     - **startDate** - (*Date*) дата, соответствующая начальному пункту
    - **endDate** - (*Date*) дата, соответствующая конечному пункту
    - **tasksBetweenDates** - (*array*) массив задач между начальными и конечными датами
    - **tasksInRows** - (*array*) массив задач, выбранных по вертикали между начальными и конечными координатами
- **singleRow** - (*boolean*) true для выделения только в одной строке, равной высоте задачи

Вы можете привязать следующие события к элементу области просмотра временной шкалы (по умолчанию gantt.$task_data — часть временной шкалы с полосами задач):

- **onBeforeDrag** - срабатывает после нажатия кнопки мыши перед началом перетаскивания
- **onDrag** - срабатывает каждый раз после начала перетаскивания, но перед отпусканием кнопки мыши
- **onBeforeDragEnd** - срабатывает после отпускания кнопки мыши, но перед тем, как удалённый отображаемый элемент будет удалён и будут найдены задачи, попадающие под выбор
- **onDragEnd** - срабатывает после удаления отрисованного элемента и нахождения задач, попадающих под выбор, но до вызова функции обратного вызова (если указана)

~~~js
gantt.$task_data.attachEvent("onBeforeDrag", function (coords) {
    gantt.message("onBeforeDrag event");
});
~~~

**Связанный пример** [Attaching event handlers for the "click_drag" extension](https://snippet.dhtmlx.com/l13f1cxl)

:::note
Обратите внимание, что обработчики событий можно добавлять только для существующего элемента. Поэтому следует добавлять обработчики после инициализации Gantt, иначе они не будут работать, поскольку элементы ещё не созданы.
:::

## Создание задач с помощью перетаскивания

Вы можете создавать задачи с помощью перетаскивания прямо на временной шкале, щёлкнув в пустом месте, чтобы задать начальную дату задачи, и перетащив вправо, чтобы задать её продолжительность.

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};

gantt.init("gantt_here");
gantt.parse(tasks);
function onDragEnd(startPoint,endPoint,startDate,endDate,tasksBetweenDates,tasksInRow){
    if (tasksInRow.length === 1) {
        var parent = tasksInRow[0];
        gantt.createTask({
            text:"Подзадача из " + parent.text,
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        }, parent.id);
    } else if (tasksInRow.length === 0) {
        gantt.createTask({
            text:"Новая задача",
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        });
    }
}
~~~

[Create new tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/24_click_drag.html)

## Установка времени для задач без расписания

Расширение **click_drag** позволяет задавать время для [задач без расписания](guides/unscheduled-tasks.md) с помощью перетаскивания.

## Выбор задач с помощью перетаскивания

Возможен выбор задач с помощью перетаскивания в нескольких режимах: по датам, по строкам или в пределах ограничений.

~~~js
gantt.config.multiselect = true;
gantt.config.click_drag = {
    callback: onDragEnd
};

gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;
gantt.init("gantt_here");
gantt.parse(tasks);
function onDragEnd(startPoint,endPoint,startDate,endDate,tasksBetweenDates,tasksInRows){
    var mode = document.querySelector("input[name="selectMode]:checked"").value;
        switch(mode) {
            case "1":
                unselectTasks();
                tasksBetweenDates.forEach(function(item) {
                    gantt.selectTask(item.id);
                });
            break;
            case "2":
                unselectTasks();
                tasksInRows.forEach(function(item) {
                    gantt.selectTask(item.id);
                });
            break;
            case "3":
                unselectTasks();
                for (var i="0;" i<tasksBetweenDates.length; i++) {
                    for (var j="0;" j<tasksInRows.length; j++) {
                        if (tasksBetweenDates[i] === tasksInRows[j]) {
                            gantt.selectTask(tasksBetweenDates[i].id);
                        }
                    }
                }
            break;
            return;
        }
}
~~~

[Select multiple tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/25_click_drag_select_by_drag.html)

## Создание частей разбитых задач

:::info
Эта функциональность доступна только в PRO-Edition.
:::
Вы также можете создавать части [разбитых задач](guides/split-tasks.md) с помощью перетаскивания.

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
}

gantt.init("gantt_here");
gantt.parse(tasks);
function onDragEnd(startPoint,endPoint,startDate,endDate,tasksBetweenDates,tasksInRow){
    if (tasksInRow.length === 1) {
        var currentTask = tasksInRow[0];
        if (currentTask.type === "project") {
            currentTask.render = "split";
            gantt.addTask({
                text:"Подзадача из " + currentTask.text,
                start_date: gantt.roundDate(startDate),
                end_date: gantt.roundDate(endDate)
            }, currentTask.id);
        } else {
            var projectName = "новый Project " + currentTask.text;
            var newProject = gantt.addTask({
                text: projectName,
                render: "split",
                type: "project",
            }, currentTask.parent);
            gantt.moveTask(
                newProject,
                gantt.getTaskIndex(currentTask.id),
                gantt.getParent(currentTask.id)
            );
            gantt.moveTask(currentTask.id, 0, newProject);
            gantt.calculateTaskLevel(currentTask)

            var newTask = gantt.addTask({
                text:"Подзадача из " + projectName,
                start_date: gantt.roundDate(startDate),
                end_date: gantt.roundDate(endDate)
            }, newProject);
            gantt.calculateTaskLevel(newTask);
        }
    } else if (tasksInRow.length === 0) {
        gantt.createTask({
            text:"Новая задача",
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        });
    }
}
~~~

[Create split tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/23_click_drag_splittask.html)