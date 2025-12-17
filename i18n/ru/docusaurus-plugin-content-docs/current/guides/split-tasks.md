---
title: "Разделение задач"
sidebar_label: "Разделение задач"
---

Разделение задач
=================

:::info
Эта функция доступна только в редакции PRO.
:::

Если у вас есть большая задача, выполнение которой не является непрерывным и может быть приостановлено и возобновлено, вы можете разбить её на несколько частей. Количество частей не ограничено.

На уровне данных такие задачи представлены как сводная задача (проект) с подзадачами, где каждая подзадача соответствует отдельному сегменту основной задачи.

![Summary task](/img/split_task_inside.png)

Они могут отображаться в одной строке, выглядя как единая задача:

![Split task](/img/split_task.png)

Чтобы отобразить проект как разделённую задачу, установите для его свойства **render** значение *split*:

~~~js
{id: 1, text: "Task #2", start_date: "03-04-2018 00:00", type: "project", 
    render:"split", parent: 0},  /*!*/
{id: 2, text: "Task #2.1", start_date: "03-04-2018 00:00", duration: 1, 
    parent: 1},
{id: 3, text: "Task #2.2", start_date: "05-04-2018 00:00", duration: 2, 
    parent: 1},
{id: 4, text: "Task #2.3", start_date: "08-04-2018 00:00", duration: 1, 
    parent: 1}
~~~

Здесь "Task#2" разделена и отображается как задачи "Task#2.1", "Task#2.2" и "Task#2.3", каждая из которых остаётся полностью интерактивной.


[Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


Чтобы вернуться к обычному древовидному виду разделённой задачи, где она отображается как проект с подзадачами, просто измените свойство **task.render** и перерисуйте Gantt:

~~~js
// перерисовать задачу в режиме 'split'
task.render = "split";
gantt.render();

// перерисовать задачу в обычном (древовидном) режиме
task.render = "";
gantt.render();
~~~

Например, вы можете добавить элемент управления, связанный со свойством **task.render** внутри lightbox, чтобы динамически переключаться между разделённым и иерархическим представлением. Пример приведён ниже.


### Динамическое переключение режима split

Lightbox можно настроить так, чтобы вы могли включать или отключать режим split для задачи. Для этого добавьте новый раздел с чекбоксом в lightbox, обновив настройки для задач типа project - [**gantt.config.lightbox.project_sections**](guides/task-types.md#specificlightboxpertasktype) - и задайте метку для нового раздела:

~~~js
gantt.locale.labels.section_split = "Display";
gantt.config.lightbox.project_sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "split", type:"checkbox", map_to: "render", options:[
        {key:"split", label:"Split Task"}
    ]},
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~

В результате получится следующий интерфейс:

![Split task checkbox](/img/split_task_checkbox.png)

Если чекбокс не отмечен, разделённая задача будет отображаться как проект с подзадачами.


[Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


## Определение, является ли задача разделённой

Чтобы узнать, является ли задача разделённой, используйте метод [isSplitTask](api/method/issplittask.md). Он принимает объект задачи и возвращает true, если задача разделена.

~~~js
var task = gantt.getTask(1);
if(gantt.isSplitTask(task)){
  ...
}
~~~

## Разворачивание и сворачивание разделённых задач

Если вы хотите разворачивать или сворачивать разделённую задачу прямо из грида, для этого есть соответствующая опция конфигурации. Опция называется [open_split_tasks](api/config/open_split_tasks.md) и принимает булево значение для включения или отключения этого поведения.

~~~js
gantt.config.open_split_tasks = true;
~~~

![Expanding split task](/img/expand_split_task.png)

## Фильтрация разделённых задач

Чтобы фильтровать, какие подзадачи разделённой задачи отображаются на диаграмме Gantt, используйте событие [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md). Верните:

- *true* чтобы показать подзадачу
- *false* чтобы скрыть подзадачу

~~~js
gantt.attachEvent("onBeforeSplitTaskDisplay", function (id, task, parent) {
    if (task.duration < 3) {
        return false;
    }
    return true;
});
~~~

Стилизация
-------------------

Разделённые задачи являются подзадачами родительского элемента, а светло-зелёная полоса позади них представляет полосу родительского элемента с дополнительным стилем.

Когда разделённые задачи свернуты и показаны в одной строке, светло-зелёная полоса родителя остаётся на месте, но с изменённой прозрачностью и z-index.

![](/img/split_task_style.png)


[Expand and collapse split tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/21_open_split_task.html)


Вы можете настроить цвет полосы родительского элемента так же, как и любую другую полосу на [шкале времени](guides/css-overview.md#stylingtimeline), либо полностью скрыть её с помощью CSS:

~~~css
.gantt_task_line.gantt_split_parent {
    display: none;
}
~~~


Если существует только одна разделённая задача, сводный элемент (type=""project")" становится невидимым, так как полностью перекрывается разделённой задачей. Если нет ни одной разделённой подзадачи, сводный элемент использует значения даты и длительности по умолчанию.

### Стилизация отдельных разделённых задач

Начиная с версии 8.0, разделённые задачи содержат свойство *task.$rendered_at* в шаблонных функциях, которое содержит ID строки, в которой отображается разделённая задача. Это позволяет стилизовать отдельные разделённые задачи в зависимости от строки отображения с помощью шаблона [task_class](api/template/task_class.md):

~~~js
gantt.templates.task_class = function(start, end, task) {
    if(task.$rendered_at) {
        if(gantt.calculateTaskLevel(gantt.getTask(task.$rendered_at)) === 1) {
            return "phase-level-split-task";
        }
    }
    return "";
};
~~~

