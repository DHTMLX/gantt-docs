---
title: "Создание/Выделение задач с помощью DnD"
sidebar_label: "Создание/Выделение задач с помощью DnD"
---

# Создание/Выделение задач с помощью DnD

Библиотека dhtmlxGantt предоставляет расширение, которое добавляет расширенные возможности drag-and-drop для управления задачами на временной шкале.

Вкратце, расширение **click_drag** поддерживает:

- [создание задач с помощью drag-and-drop](#creatingtaskswithdragndrop)
- [установку времени для незапланированных задач с помощью перетаскивания](#settingtimeforunscheduledtasks)
- [выделение задач с помощью drag-and-drop](#selectingtaskswithdragndrop)
- [создание частей разделённых задач с помощью drag-and-drop](#creatingpartsofsplittasks) (PRO версия)

:::note
Чтобы начать использовать расширение, включите плагин [click_drag](guides/extensions-list.md#advanceddragndrop) с помощью метода [gantt.plugins](api/method/plugins.md).
:::

Чтобы включить расширенный drag-and-drop, настройте опцию [click_drag](api/config/click_drag.md) и укажите необходимые свойства из приведённого ниже списка внутри объекта:

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- **className** -  (*string*) добавляет пользовательский CSS-класс к выбранному элементу
- **render** - (*function*) функция, создающая элемент, отображаемый во время перетаскивания. Принимает два параметра: 
    - **startPoint** - (*object*) - объект со структурой:


    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 


  где absolute - координаты относительно верхнего левого угла документа, а relative - относительно верхнего левого угла элемента viewPort 
    - **endPoint** - (*object*) аналогично startPoint:


    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 


  с absolute и relative координатами, как описано выше 
- **viewPort** - (*HTMLElement*) элемент, к которому привязываются события и происходит выделение
- **useRequestAnimationFrame** - (*boolean*) указывает, использовать ли requestAnimationFrame при рендеринге
- **callback** - (*function*) вызывается при отпускании кнопки мыши. Принимает 6 параметров:
    - **startPoint** - (*object*) с той же структурой, что описано выше
    - **endPoint** - (*object*) с той же структурой, что описано выше
     - **startDate** - (*Date*) дата, соответствующая началу перетаскивания
    - **endDate** - (*Date*) дата, соответствующая окончанию перетаскивания
    - **tasksBetweenDates** - (*array*) задачи, попадающие в диапазон между начальной и конечной датой
    - **tasksInRows** - (*array*) задачи, выделенные по вертикали между начальной и конечной координатой
- **singleRow** - (*boolean*) если true, выделение ограничено одной строкой, соответствующей высоте задачи

Вы можете привязать следующие события к элементу временной шкалы (по умолчанию gantt.$task_data, который содержит бары задач):

- **onBeforeDrag** - срабатывает после нажатия кнопки мыши, но до начала перетаскивания
- **onDrag** - вызывается многократно после начала перетаскивания, но до отпускания кнопки мыши
- **onBeforeDragEnd** - срабатывает после отпускания кнопки мыши, но до удаления перетаскиваемого элемента и определения выделенных задач
- **onDragEnd** - срабатывает после удаления перетаскиваемого элемента и поиска выделенных задач, но до вызова callback-функции (если она задана)

~~~js
gantt.$task_data.attachEvent("onBeforeDrag", function (coords) {
    gantt.message("onBeforeDrag event");
});
~~~


**Related example:** [Добавление обработчиков событий для расширения "click_drag"](https://snippet.dhtmlx.com/l13f1cxl)


:::note
Имейте в виду, что обработчики событий можно добавлять только к уже существующим элементам. Поэтому добавляйте обработчики после инициализации Gantt, иначе они не будут работать, так как элементы ещё не созданы.
:::

## Создание задач с помощью drag-n-drop

Задачи можно создавать прямо на временной шкале: кликните по пустому месту для установки даты начала, затем потяните вправо для задания длительности.

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
            text:"Subtask of " + parent.text,
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        }, parent.id);
    } else if (tasksInRow.length === 0) {
        gantt.createTask({
            text:"New task",
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        });
    }
}
~~~


[Create new tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/24_click_drag.html)


## Установка времени для незапланированных задач

Расширение **click_drag** также позволяет задавать временные интервалы для [незапланированных задач](guides/unscheduled-tasks.md) с помощью перетаскивания.

## Выделение задач с помощью drag-n-drop

Выделение задач с помощью drag-and-drop поддерживается в нескольких режимах: по датам, по строкам или внутри выделенной области.

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


## Создание частей разделённых задач

Drag-and-drop также можно использовать для создания частей [разделённых задач](guides/split-tasks.md).

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
                text:"Subtask of " + currentTask.text,
                start_date: gantt.roundDate(startDate),
                end_date: gantt.roundDate(endDate)
            }, currentTask.id);
        } else {
            var projectName = "new Project " + currentTask.text;
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
                text:"Subtask of " + projectName,
                start_date: gantt.roundDate(startDate),
                end_date: gantt.roundDate(endDate)
            }, newProject);
            gantt.calculateTaskLevel(newTask);
        }
    } else if (tasksInRow.length === 0) {
        gantt.createTask({
            text:"New task",
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        });
    }
}
~~~


[Create split tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/23_click_drag_splittask.html)

