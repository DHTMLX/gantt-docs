---
title: "Разделение задач"
sidebar_label: "Разделение задач"
---

# Разделение задач

:::note
Эта функция доступна только в версии PRO.
:::

Если у вас есть большая задача, которая не является непрерывной и может быть прервана, вы можете разделить её на несколько частей. Частей может быть столько, сколько необходимо.

На уровне данных такие задачи можно представить как сводную задачу (проект) с подзадачами, где каждая подзадача определяет изолированную часть основной задачи.

![Сводная задача](/img/split_task_inside.png)

Которую можно отобразить в одну строку, как единую задачу:

![Разделённая задача](/img/split_task.png)

Чтобы отобразить проект как разделённую задачу, нужно установить его свойство `render` в значение `split`:

~~~js
const tasks = [
    { id: 1, text: "Task #2", start_date: "03-04-2027 00:00", type: "project", render: "split" },
    { id: 2, text: "Stage #1", start_date: "03-04-2027 00:00", duration: 1, parent: 1 },
    { id: 3, text: "Stage #2", start_date: "05-04-2027 00:00", duration: 2, parent: 1 },
    { id: 4, text: "Stage #3", start_date: "08-04-2027 00:00", duration: 1, parent: 1 }
];
~~~ 

Задача "Task #2" разделена и отображается как набор задач: "Stage #1", "Stage #2" и "Stage #3", которые полностью интерактивны.

**Связанный пример**: [Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)

Чтобы показать разделённую задачу в обычном деревовидном режиме, т.е. как проект с подзадачами, достаточно изменить значение свойства `task.render` и повторно отрисовать Gantt:

~~~js
const task = gantt.getTask(1);

// повторная отрисовка задачи в режиме 'split'
task.render = "split";
gantt.render();

// повторная отрисовка задачи в обычном (деревном) режиме
task.render = "";
gantt.render();
~~~

Например, можно добавить элемент управления, сопоставленный со свойством `task.render`, в лайтбокс, чтобы динамически переключаться между разделённым и иерархическим представлениями. См. пример в разделе ниже.

### Динамическое переключение режима разделения

Вы можете настроить лайтбокс так, чтобы он позволял переключать режим разделения для задачи вкл/выкл. Для этого можно добавить новый раздел с флажком в лайтбокс, изменив параметры конфигурации для типов задач проекта — [`gantt.config.lightbox.project_sections`](guides/task-types.md#specificlightboxpertasktype) и добавить подпись для нового раздела:

~~~js
gantt.locale.labels.section_split = "Display";
gantt.config.lightbox.project_sections = [
    { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
    {
        name: "split",
        type: "checkbox",
        map_to: "render",
        options: [
            { key: "split", label: "Split Task" }
        ]
    },
    { name: "time", type: "duration", readonly: true, map_to: "auto" }
];
~~~

Результат будет выглядеть так:

![Split task checkbox](/img/split_task_checkbox.png)

Когда флажок снят, разделённая задача отображается как проект с подзадачами.

**Связанный пример**: [Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)

## Проверка, разделена ли задача

Вы можете проверить, является ли задача разделённой, с помощью метода [`isSplitTask()`](api/method/issplittask.md). Он принимает объект задачи в качестве аргумента и возвращает `true`, если задача разделена.

~~~js
const task = gantt.getTask(1);

if (gantt.isSplitTask(task)) {
    // ...
}
~~~

## Разворачивание/сворачивание разделённых задач {#expandingcollapsingsplittasks}

Если вы хотите разворачивать/сворачивать разделённую задачу прямо из интерфейса грида, существует специальная настройка, которая вам поможет. Она называется [`open_split_tasks`](api/config/open_split_tasks.md) и принимает логическое значение, чтобы сделать разделённую задачу разворачиваемой и наоборот.

~~~js
gantt.config.open_split_tasks = true;
~~~

![Expanding split task](/img/expand_split_task.png)

## Расположение подзадач, разделённых по каждому дочернему элементу

По умолчанию разделённые подзадачи отображаются встроенно на строке родителя, когда родительская строка свернута, и перемещаются на подстроки, когда родительская строка разворачивается.
Вы можете управлять этим поведением для каждого дочернего элемента с помощью свойства `split_placement` объекта задачи, используя необходимый режим разделения задач в зависимости от состояния строки родителя:

- когда родительская строка свернута:
    - `split_placement: "auto" (default)` - подзадача отображается на строке родителя
    - `split_placement: "inline"` - подзадача отображается на строке родителя
    - `split_placement: "subrow"` - подзадача не видна
- когда родительская строка развёрнута:
    - `split_placement: "auto" (default)` - подзадача отображается как подстрока
    - `split_placement: "inline"` - подзадача отображается на строке родителя
    - `split_placement: "subrow"` - подзадача отображается как подстрока

~~~js
const tasks = [
    // родительская строка развёрнута при отрисовке
    { id: 10, text: "Creative Production", start_date: "01-04-2027", render: "split", duration: 35, parent: 1 },
    // подзадача отображается на строке родителя
    { id: 11, text: "Photo Shoot", start_date: "03-04-2027", split_placement: "inline", duration: 3, parent: 10 },
    // подзадача отображается как подстрока
    { id: 12, text: "Video Editing", start_date: "08-04-2027", split_placement: "subrow", duration: 10, parent: 10 },
    // подзадача отображается на строке родителя (по умолчанию)
    { id: 13, text: "Copywriting", start_date: "04-04-2027", duration: 7, parent: 10 }
];
~~~

**Связанный пример**: [Per-child placement of split subtasks](https://docs.dhtmlx.com/gantt/samples/04_customization/26_custom_child_split_tasks.html)

## Фильтрация разделённых задач

Чтобы отфильтровать подзадачи разделённой задачи, отображаемой на диаграмме Gantt, применяйте событие [`onBeforeSplitTaskDisplay`](api/event/onbeforesplittaskdisplay.md) и возвращайте:

- true, для подзадачи, которую хотите отобразить
- false, для подзадачи, которую не следует отображать

~~~js
gantt.attachEvent("onBeforeSplitTaskDisplay", (id, task, parent) => {
    if (task.duration < 3) {
        return false;
    }
    return true;
});
~~~

## Стилизация

Разделённые задачи определяются как подзадачи родительского элемента, а светло-зеленая полоса на заднем плане является полосой этого элемента-родителя, на которую применяются дополнительные стили.

Когда разделённые задачи свернуты и отображаются в одной строке, светло-зелёная полоса родителя по-прежнему отображается на той же позиции, но с изменённой непрозрачностью и значениями z-index.

![](/img/split_task_style.png)

**Связанный пример**: [Expand and collapse split tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/21_open_split_task.html)

Вы можете изменить цвет полосы родителя так же, как вы стилизуете все полосы в [таймлайне](guides/css-overview.md#styling-timeline) или полностью скрыть её через CSS:

~~~css
.gantt_task_line.gantt_split_parent {
    display: none;
}
~~~

**Связанный пример**: [Hide transparent parent bar of the split tasks](https://snippet.dhtmlx.com/svgo5vfn)

Когда у вас есть только одна разделённая задача, сводная задача (`type="project"`) становится невидимой, потому что она полностью перекрывается разделённой задачей. Если разделённых подзадач нет, сводная задача имеет дату и продолжительность по умолчанию.

### Стилизация отдельных разделённых задач

Начиная с версии 8.0, разделённые задачи попадают в функции-шаблоны с свойством `task.$rendered_at`, которое содержит id строки, на которой разделённая задача отображается. Таким образом, чтобы стилизовать конкретные разделённые задачи в зависимости от строки, на которую они отображаются, можно использовать шаблон [`task_class`](api/template/task_class.md):

~~~js
gantt.templates.task_class = (startDate, endDate, task) => {
    if (task.$rendered_at) {
        if (gantt.calculateTaskLevel(gantt.getTask(task.$rendered_at)) === 1) {
            return "phase-level-split-task";
        }
    }
    return "";
};
~~~