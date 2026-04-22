---
title: "Перетаскивание задач вдоль временной шкалы"
sidebar_label: "Перетаскивание задач вдоль временной шкалы"
---

# Перетаскивание задач вдоль временной шкалы

Перетаскивание позволяет пользователям быстро изменять даты начала (окончания) задач, а также их продолжительность.
По умолчанию поддержка перетаскивания включена, и пользователь может перетаскивать задачу вдоль её строки на временной шкале.

Чтобы настроить поведение перетаскивания, используйте следующие события:

- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) - запретить перетаскивание конкретных задач
- [onTaskDrag](api/event/ontaskdrag.md) - ограничить область перетаскивания или применить другую логику при перетаскивании задачи
- [onAfterTaskDrag](api/event/onaftertaskdrag.md) - постобработать задачи после того, как они были перетащены на новое место

Рассмотрим типичные случаи, когда поведение перетаскивания по умолчанию требует настройки:

1. [Запрет перетаскивания отдельных задач](#denying-dragging-of-specific-tasks).
2. [Запрет перетаскивания задач за пределами конкретных дат](#denying-dragging-tasks-out-of-specific-dates).
3. [Перетаскивание дочерних задач вместе с родителем](#dragging-children-together-with-the-parent).
4. [Перетаскивание проектов с подзадачами](#draggingprojectswithsubtasks).
5. [Установка минимальной продолжительности задачи](#setting-minimal-task-duration).
6. [Автоскроллинг во время перетаскивания задач](#autoscrollduringtasksdragging).

## Запрет перетаскивания отдельных задач

Чтобы запретить перетаскивание конкретных задач, используйте событие [onBeforeTaskDrag](api/event/onbeforetaskdrag.md):

~~~js
gantt.attachEvent("onBeforeTaskDrag", (taskId, dragMode, event) => {
    if (gantt.getGlobalTaskIndex(taskId) % 2 === 0) {
        return false; // запрещает перетаскивание, если глобальный индекс задачи чётный
    }
    return true; // разрешает перетаскивание, если глобальный индекс задачи нечётный
});
~~~

## Запрет перетаскивания задач за пределами конкретных дат

Чтобы запретить перетаскивание задач за пределы конкретных дат, используйте событие [onTaskDrag](api/event/ontaskdrag.md).

<p style="margin-top: 20px; font-weight: bold;"> The onTaskDrag event: </p>

<ul style="margin-top:5px;">
  <li>Срабатывает каждый раз, когда пользователь выполняет перемещение мыши на территории временной шкалы: перемещает, изменяет размер задачи или изменяет прогресс задачи.</li>
  <li>Тип движения перетаскивания передаётся как второй аргумент - <b>mode</b>.</li>
  <li>Все доступные значения типа движения перетаскивания хранятся в свойстве [drag_mode](api/config/drag_mode.md).</li>
</ul>

<p style="margin-top: 20px; font-weight: bold;">Коротко, всё происходит в следующем порядке:</p>

<ol style="margin-top:5px;">
    <li>Пользователь выполняет движение.</li>
    <li>dhtmlxGantt пересчитывает дату задачи в соответствии с новым положением.</li>
    <li>dhtmlxGantt вызывает событие [onTaskDrag](api/event/ontaskdrag.md).</li>
    <li>dhtmlxGantt повторно отрисовывает задачу на диаграмме Ганта.<br><i>Так как событие [onTaskDrag](api/event/ontaskdrag.md) срабатывает после того, как dhtmlxGantt выполнит перерасчёт, вы можете задать любые пользовательские значения для перетаскиваемой задачи в обработчике события, не боясь, что эти значения будут перезаписаны. В результате задача будет отрисована в нужной позиции.</i></li>
</ol>

Предположим, что вы хотите запретить пользователям перетаскивать задачи за пределы интервала **"31 марта, 2028 - 11 апреля, 2028"**.

![custom_dnd](/img/custom_dnd.png)

 then, you can use the code as in:

~~~js
const leftLimit = new Date(2028, 2, 31);
const rightLimit = new Date(2028, 3, 12);
const millisecondsInDay = 24 * 60 * 60 * 1000;

gantt.attachEvent("onTaskDrag", (taskId, dragMode, task, originalTask) => {
    const dragModes = gantt.config.drag_mode;

    if (dragMode === dragModes.move || dragMode === dragModes.resize) {
        const taskDuration = originalTask.duration * millisecondsInDay;

        if (+task.end_date > +rightLimit) {
            task.end_date = new Date(rightLimit);
            if (dragMode === dragModes.move) {
                task.start_date = new Date(task.end_date - taskDuration);
            }
        }

        if (+task.start_date < +leftLimit) {
            task.start_date = new Date(leftLimit);
            if (dragMode === dragModes.move) {
                task.end_date = new Date(+task.start_date + taskDuration);
            }
        }
    }
});
~~~

## Перетаскивание дочерних задач вместе с родителем

Чтобы позволить перетаскивать дочерние задачи, когда пользователь перетаскивает задачу родителя, используйте событие [onTaskDrag](api/event/ontaskdrag.md) (см. выше в разделе denyding-dragging-tasks-out-of-specific-dates):

~~~js
gantt.attachEvent("onTaskDrag", (taskId, dragMode, task, originalTask) => {
    const dragModes = gantt.config.drag_mode;

    if (dragMode === dragModes.move) {
        const dateShift = task.start_date - originalTask.start_date;
        gantt.eachTask((child) => {
            child.start_date = new Date(+child.start_date + dateShift);
            child.end_date = new Date(+child.end_date + dateShift);
            gantt.refreshTask(child.id, true);
        }, taskId);
    }
});

// округление позиций дочерних элементов к масштабу
gantt.attachEvent("onAfterTaskDrag", (taskId, dragMode, event) => {
    const dragModes = gantt.config.drag_mode;

    if (dragMode === dragModes.move) {
        const ganttState = gantt.getState();
        gantt.eachTask((child) => {
            child.start_date = gantt.roundDate({
                date: child.start_date,
                unit: ganttState.scale_unit,
                step: ganttState.scale_step
            });
            child.end_date = gantt.calculateEndDate(
                child.start_date,
                child.duration,
                gantt.config.duration_unit
            );
            gantt.updateTask(child.id);
        }, taskId);
    }
});
~~~

**Связанный пример**: [Перетащить родительскую задачу вместе с её дочерними](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)

## Перетаскивание проектов с подзадачами {#draggingprojectswithsubtasks}

:::info
Эта функциональность доступна только в редакции Gantt PRO.
:::

Задачи типа [project type](api/config/types.md) по умолчанию не перетаскиваются.
Вы можете включить перетаскивание проектов с помощью конфигурации [drag_project](api/config/drag_project.md):

~~~js
gantt.config.drag_project = true;
~~~

**Связанный пример**: [Перетаскиваемые проекты](https://docs.dhtmlx.com/gantt/samples/08_api/19_draggable_projects.html)

## Перетаскивание зависимых задач совместно с независимыми задачами

Существует несколько способов реализации перемещения задач вместе с их зависимыми задачами.
О них можно узнать в отдельной статье [Перетаскивание задач вместе с зависимыми задачами](guides/dragging-dependent-tasks.md).

## Установка минимальной продолжительности задачи

Минимальная продолжительность задачи может быть задана с помощью настройки [min_duration](api/config/min_duration.md).

Эта опция задаёт минимальный размер задачи, который можно задать при изменении размера, и может использоваться для предотвращения установки нулевой продолжительности.

Значение устанавливается в миллисекундах:
~~~js
// 1 день
gantt.config.min_duration = 24 * 60 * 60 * 1000;

// ИЛИ

// 1 час
gantt.config.min_duration = 60 * 60 * 1000;
~~~

## Автоскроллинг во время перетаскивания задач {#autoscrollduringtasksdragging}

Если у вас большой набор данных в диаграмме Ганта, часто возникает необходимость перетащить задачу на новое дальнее место или связать задачи, расположенные на значительном расстоянии.

В этом случае функция автоскроллинга очень полезна. По умолчанию она включена, но управлять этим поведением можно через настройку
[autoscroll](api/config/autoscroll.md).

~~~js
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

Кроме того, вы можете настроить скорость автоскроллинга в миллисекундах с помощью соответствующей настройки - [autoscroll_speed](api/config/autoscroll_speed.md):

~~~js
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;

gantt.init("gantt_here");
~~~

## Отключение изменения размера конкретных задач

Если вы хотите запретить изменение размера для некоторых задач, можно сделать две вещи:

1. Удалить маркеры изменения размера задачи из интерфейса с помощью CSS.
Для этого нужно использовать шаблон **task_class**, чтобы добавить дополнительный CSS-класс нужным элементам и можно было определить их по селектору:

~~~js
gantt.templates.task_class = (startDate, endDate, task) => {
    if (task.no_resize) { // no_resize — это пользовательское свойство, используемое для демонстрации
        return "no_resize";
    }
    return "";
};
~~~

Затем можно скрыть маркеры изменения размера, используя следующий CSS:

~~~css
.no_resize .gantt_task_drag {
    display: none !important;
}
~~~

2. Предотвращение перетаскивания через код с использованием события [onBeforeTaskDrag](api/event/onbeforetaskdrag.md).
Возврат *false* из обработчика предотвратит изменение размера:

~~~js
gantt.attachEvent("onBeforeTaskDrag", (taskId, dragMode, event) => {
    if (dragMode === "resize" && gantt.getTask(taskId).no_resize) {
        return false;
    }
    return true;
});
~~~

## Какая сторона задачи изменяется при изменении размера

Режим ["resize"](api/event/onbeforetaskdrag.md) перетаскивания означает, что пользователь изменяет размер задачи либо с даты начала, либо с даты окончания.

Если нужно узнать, какая дата изменяется при изменении размера, можно использовать флаг **gantt.getState().drag_from_start**:

~~~js
gantt.attachEvent("onBeforeTaskDrag", (taskId, dragMode, event) => {
    if (dragMode === "resize") {
        if (gantt.getState().drag_from_start === true) {
            // изменение даты начала задачи
        } else {
            // изменение даты окончания задачи
        }
    }
    return true;
});
~~~

## Отключение изменения размера начала или конца даты задачи

Вы можете локализовать маркеры изменения размера с использованием следующих селекторов:

- `.gantt_task_drag[data-bind-property="start_date"]`
- `.gantt_task_drag[data-bind-property="end_date"]`

Следующий CSS можно использовать для отключения изменения размера начала задач:

~~~css
.gantt_task_drag[data-bind-property="start_date"] {
    display: none !important;
}
~~~

Аналогично, чтобы запретить изменение размера конца дат, сделайте так:

~~~css
.gantt_task_drag[data-bind-property="end_date"] {
    display: none !important;
}
~~~

Другой способ — использовать событие [onBeforeTaskDrag](api/event/onbeforetaskdrag.md).
Возврат *false* из обработчика предотвратит изменение размера:

~~~js
gantt.attachEvent("onBeforeTaskDrag", (taskId, dragMode, event) => {
    if (dragMode === "resize") {
        if (gantt.getState().drag_from_start === true) {
            return false;
        } else {
            // изменение конца даты задачи
        }
    }
    return true;
});
~~~