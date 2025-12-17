---
title: "Автоматическое планирование"
sidebar_label: "Автоматическое планирование"
---

Автоматическое планирование
===================

:::info
Эта функция доступна только в редакции PRO.
:::

Библиотека включает расширение **auto_scheduling**, которое позволяет Gantt автоматически планировать задачи на основе их связей.

![auto_scheduling](/img/auto_scheduling.png)

Например, рассмотрим две задачи, связанные зависимостью, при которой вторая задача начинается сразу после окончания первой. Если расписание первой задачи изменится, автоматическое планирование обновит дату начала второй задачи соответствующим образом. Это помогает поддерживать график проекта, определяя связи между задачами без необходимости вручную корректировать даты каждой задачи.

## Как использовать {#howtouse}
--------------

Чтобы активировать автоматическое планирование, включите плагин [auto_scheduling](guides/extensions-list.md#autoscheduling) с помощью метода [gantt.plugins](api/method/plugins.md):

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

Затем установите свойство **auto_scheduling** в *true*:

~~~js
gantt.config.auto_scheduling = true;
~~~


[Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)


Даже при включённом автоматическом планировании задачи можно планировать вручную, если это необходимо.

## Прямое и обратное планирование {#forwardbackwardplanning}
------------------

### Стратегии планирования проекта

Планирование задач может осуществляться двумя способами: прямое и обратное планирование. Это зависит от определённых настроек конфигурации:

- [schedule_from_end](api/config/schedule_from_end.md) - (*boolean*) определяет тип стратегии планирования
- [project_start](api/config/project_start.md) - (*Date*) задаёт дату начала проекта; используется в качестве даты начала задачи при прямом планировании, по умолчанию *null*
- [project_end](api/config/project_end.md) - (*Date*) задаёт дату окончания проекта; используется в качестве времени задачи при обратном планировании, по умолчанию *null*

### Прямое планирование

Прямое планирование используется по умолчанию, при **gantt.config.schedule_from_end** со значением *false*.

~~~js
// прямое планирование активно
gantt.config.schedule_from_end = false;
~~~

В этом режиме задачи планируются начиная с даты начала проекта или самой ранней даты задачи, чтобы начать задачи как можно раньше, если не применяются другие ограничения.

Вы можете дополнительно определить дату начала проекта с помощью **gantt.config.project_start**:

~~~js
gantt.config.project_start = new Date(2019, 2, 1);
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


### Обратное планирование

Обратное планирование размещает задачи, начиная с даты окончания проекта. Чтобы его использовать, установите **gantt.config.schedule_from_end** в *true* и укажите дату окончания проекта через **gantt.config.project_end**:

~~~js
gantt.config.schedule_from_end = true;
gantt.config.project_end = new Date(2019, 4, 1);
~~~

В этом случае задачи планируются так, чтобы завершиться как можно позже, а последняя задача заканчивается в дату окончания проекта.


[Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)


## Временные ограничения для задач {#timeconstraintsfortasks}

dhtmlxGantt позволяет применять дополнительные временные ограничения к задачам.

:::note
Временные ограничения применяются только к задачам и [вехам](guides/milestones.md). Проекты не затрагиваются.
:::

### Добавление ограничений через лайтбокс

Ограничения можно задать через [**Constraint** control](guides/constraint.md) в лайтбоксе задачи.

![Встроенный выбор даты для ограничений](/img/inbuilt_constraint_datepicker.png)

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" }, /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

### Добавление ограничений через встроенные редакторы

Ограничения также можно указать с помощью отдельных колонок грида для типа и даты ограничения, используя встроенные редакторы.

![Столбцы ограничений](/img/constraints_columns.png)

Используйте имена столбцов **constraint_type** и **constraint_date** соответственно.

~~~js
const constraintTypeEditor = {
    type: "select", map_to: "constraint_type", options: [
        { key: "asap", label: gantt.locale.labels.asap },
        { key: "alap", label: gantt.locale.labels.alap },
        { key: "snet", label: gantt.locale.labels.snet },
        // more options
    ]
};

const constraintDateEditor = {
    type: "date",
    map_to: "constraint_date",
    min: new Date(2019, 0, 1),
    max: new Date(2020, 0, 1)
};

gantt.config.columns = [
    { // предыдущая колонка},
    {
        name:"constraint_type", align:"center", width:100, template:function (task){
            return gantt.locale.labels[gantt.getConstraintType(task)];
        }, resize: true, editor: constraintTypeEditor
    },
    {
        name:"constraint_date", align:"center", width:120, template:function (task) {
        // template logic
        },
        resize: true, editor: constraintDateEditor
    },
    { name: "add", width: 44 }
];
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


### Типы ограничений

Доступно несколько видов временных ограничений:

1. **Как можно раньше** - Для независимых задач с включённым режимом **strict** задача начинается с началом проекта. Без режима **strict** - с указанной даты. Для зависимых задач задача начинается сразу после завершения всех предшественников.

2. **Как можно позже** - Независимые задачи заканчиваются с окончанием проекта. Зависимые задачи заканчиваются с началом их непосредственного преемника.

Остальные ограничения применяются независимо от типа задачи:

3. **Начать не ранее чем** - задача начинается в указанную дату или позже.

4. **Начать не позднее чем** - задача начинается в указанную дату или раньше.

5. **Закончить не ранее чем** - задача завершается в указанную дату или позже.

6. **Закончить не позднее чем** - задача завершается в указанную дату или раньше.

7. **Должна начаться** - задача начинается строго в указанную дату.

8. **Должна закончиться** - задача завершается строго в указанную дату.

:::note
Независимые задачи - это задачи без каких-либо предшественников или преемников, то есть без связей или отношений, соединяющих их или их родительские задачи с другими.
:::

## Настройка лагов и опережений между задачами {#settinglagandleadtimesbetweentasks}
-----------------------------------------

Лаги и опережения позволяют задавать более сложные зависимости между задачами.

Лаг - это задержка после завершения предшественника до начала преемника. Опережение - это наложение, когда преемник начинается до окончания предшественника.

Существует два типа преемников:

- Задачи, начинающиеся до завершения предшественника (опережение). Например, опережение в 1 день означает, что преемник начнётся за день до окончания предшественника.

- Задачи, начинающиеся с задержкой после окончания предшественника (лаг). Например, лаг в 1 день означает, что преемник начнётся через день после завершения предшественника.

Значения лага и опережения задаются в свойстве **link.lag** объекта связи:

- лаг: положительное целое число
- опережение: отрицательное значение лага

По умолчанию у связей зависимостей лаг равен 0.

### Редактирование значений связи из интерфейса

В Gantt нет встроенного интерфейса для редактирования лага или других свойств связей, но вы можете реализовать это самостоятельно, следуя рекомендациям из
[соответствующей главы](guides/crud-dependency.md#editinglinkvaluesfromui).


**Related example:** [Edit-lag Popup](https://snippet.dhtmlx.com/2208ic0t)


## Отключение автопланирования для отдельных задач {#disablingautoschedulingforspecifictasks}
----------------------

Чтобы отключить автоматическое планирование для определённой задачи и планировать её вручную, установите для свойства **auto_scheduling** этой задачи значение *false*:

~~~js
var task = gantt.getTask(id);
task.auto_scheduling = false;
~~~

Кроме того, вы можете заблокировать автоматическое планирование для задачи через обработчик события [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md):

~~~js
gantt.attachEvent("onBeforeTaskAutoSchedule",function(task, start, link, predecessor){
    if(task.completed) {
        return false;
    }
    return true;
});
~~~

## Планирование завершённых задач {#schedulingcompletedtasks}
----------------------------

По умолчанию автоматическое планирование обрабатывает завершённые задачи (с прогрессом 1) так же, как и незавершённые.

Вы можете изменить это поведение, включив опцию [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md):

~~~js
gantt.config.auto_scheduling_use_progress = true;
 
gantt.init("gantt_here");
~~~

При включённой опции завершённые задачи исключаются из критического пути и автоматического планирования.

Подробнее смотрите на [странице API](api/config/auto_scheduling_use_progress.md).


## Обзор API {#apioverview}

Доступны следующие методы и свойства:

- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [autoSchedule](api/method/autoschedule.md)
- [isUnscheduledTask](api/method/isunscheduledtask.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [getConnectedGroup](api/method/getconnectedgroup.md)

### Активация

Включите автоматическое планирование, установив свойство [auto_scheduling](api/config/auto_scheduling.md) в true:

~~~js
gantt.config.auto_scheduling = true;
~~~

### Режим strict

По умолчанию задачи перепланируются только при нарушении ограничения новой датой. Чтобы всегда перепланировать задачи на максимально раннюю дату, включите свойство [auto_scheduling_strict](api/config/auto_scheduling_strict.md):

~~~js
gantt.config.auto_scheduling_strict = true;
~~~

:::note
Обратите внимание, что в версиях 6.1.0 - 7.1.3 эта настройка работает только при включённой опции [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md).
:::

### Первичное автопланирование

Свойство [auto_scheduling_initial](api/config/auto_scheduling_initial.md) определяет, будет ли автоматическое планирование запускаться при загрузке данных. По умолчанию - true:

~~~js
gantt.config.auto_scheduling_initial = true;
~~~

### Наследование ограничений проекта

Свойство [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md) определяет, наследуют ли задачи без указанного ограничения его от родительского проекта:

~~~js
gantt.config.auto_scheduling_project_constraint = true;
~~~

### Пересчёт проекта

Чтобы пересчитать расписание всего проекта, используйте метод [autoSchedule](api/method/autoschedule.md):

~~~js
gantt.autoSchedule();
~~~

Чтобы пересчитать начиная с определённой задачи, передайте её id в этот же метод:

~~~js
gantt.autoSchedule(taskId);
~~~

### Проверка, запланирована ли задача

Чтобы проверить, запланирована ли задача, используйте метод [isUnscheduledTask](api/method/isunscheduledtask.md) с объектом задачи:

~~~js
var isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### Обнаружение циклических ссылок

Чтобы найти все циклические ссылки в диаграмме, используйте метод [findCycles](api/method/findcycles.md):

~~~js
gantt.findCycles();
~~~

### Проверка, является ли связь циклической

Чтобы проверить, является ли связь циклической, используйте метод [isCircularLink](api/method/iscircularlink.md):

~~~js
var isCircular = gantt.isCircularLink(link);
~~~

### Получение связанных задач и связей

Чтобы получить список задач и связей, связанных с определённой задачей, используйте метод [getConnectedGroup](api/method/getconnectedgroup.md):

~~~js
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}
~~~


## Список событий {#thelistofevents}

Ниже приведён список доступных событий:

- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

~~~js
// перед началом автоматического планирования
gantt.attachEvent("onBeforeAutoSchedule",function(taskId){
    // ваша логика
    return true;
});

// после завершения автоматического планирования
gantt.attachEvent("onAfterAutoSchedule",function(taskId, updatedTasks){
    // ваша логика
});

// перед перепланированием конкретной задачи
gantt.attachEvent("onBeforeTaskAutoSchedule",function(task,start,link,predecessor){
    // ваша логика
    return true;
});

// после перепланирования конкретной задачи
gantt.attachEvent("onAfterTaskAutoSchedule",function(task,start,link,predecessor){
    // ваша логика
});

// если обнаружена циклическая ссылка и автопланирование не может быть выполнено
gantt.attachEvent("onCircularLinkError",function(link, group){
    // ваша логика
});

// если найдены циклические связи во время автопланирования
gantt.attachEvent("onAutoScheduleCircularLink",function(groups){
    // ваша логика
});
~~~

## Совместимость версий {#versioncompatibility}

Когда дата задачи изменяется перетаскиванием мышью или через lightbox, задача автоматически получает один из двух типов ограничений: либо **начать не ранее+%start date%**, либо **закончить не позднее+%end date%**, в зависимости от выбранного подхода к планированию.

Это означает, что задача не будет запланирована раньше более поздней даты, установленной через пользовательский интерфейс. Такое поведение может быть неожиданным для пользователей, не знакомых с ограничениями, особенно учитывая, что по умолчанию ограничения не отображаются на диаграмме.

Чтобы показать ограничения, вы можете включить их отображение с помощью метода [addTaskLayer](api/method/addtasklayer.md).


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


Это поведение отличается от логики авто-планирования в Gantt-версиях до **v6.1** и считается корректным, так как соответствует тому, как работает авто-планирование в MS Project.

Если вы предпочитаете прежнее поведение, вы можете вернуть авто-планирование до версии 6.1, отключив ограничения:

~~~js
gantt.config.auto_scheduling_compatibility = true;
~~~

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)

