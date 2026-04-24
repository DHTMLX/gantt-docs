---
title: "Автоматическое планирование" 
sidebar_label: "Автоматическое планирование" 
--- 

# Автоматическое планирование

:::info
Эта функциональность доступна только в PRO-версии.
:::

Библиотека предоставляет расширение **auto_scheduling**, которое позволяет Gantt автоматически планировать задачи в зависимости от зависимостей между ними.

![auto_scheduling](/img/auto_scheduling.png)

Например, у вас есть две задачи, связанные зависимостью: вторая задача начинается после окончания первой, и вам нужно изменить расписание первой задачи, переместив её на новую дату.

Автоматическое планирование обновляет дату начала второй задачи в соответствии с датой окончания первой задачи каждый раз, когда она изменяется. Эта функция позволяет генерировать и поддерживать расписание проекта, указывая зависимости между задачами, без необходимости вручную задавать даты каждой задачи.

## Как использовать

Чтобы использовать функциональность auto_scheduling, включите плагин [auto_scheduling](guides/extensions-list.md#autoscheduling) с помощью метода [gantt.plugins](api/method/plugins.md):

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

И установите свойство **enabled** в конфигурации **auto_scheduling** в значение *true*:

~~~js
gantt.config.auto_scheduling = {
    enabled: true
};
~~~

[Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

При включённом авто-распределении задачи можно по-прежнему планировать вручную.

## Прямое/обратное планирование {#forwardbackwardplanning}

### Стратегии планирования проектов

Существует две стратегии планирования задач в рамках проекта: прямое и обратное планирование. Они определяются комбинацией настроек конфигурации:

- [gantt.config.auto_scheduling.schedule_from_end](api/config/auto_scheduling.md#schedule_from_end) - (*boolean*) задаёт тип стратегии планирования
- [project_start](api/config/project_start.md) - (*Date*) дата начала проекта; по умолчанию используется в качестве даты начала задач, если применяется прямое планирование, *null* по умолчанию
- [project_end](api/config/project_end.md) - (*Date*) дата окончания проекта; по умолчанию используется как конечная дата задач, если применяется обратное планирование, *null* по умолчанию

### Прямое планирование

Прямое планирование задач используется по умолчанию, т.е. **gantt.config.auto_scheduling.schedule_from_end** устанавливается в *false*.

~~~js
// прямое планирование задач используется
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_from_end: false
};
~~~

В этом случае планирование задач реализуется с даты начала или с даты самой ранней задачи. Задачи планируются *как можно раньше*, если к ним не применяются другие ограничения.

Дату начала проекта можно опционально задать через конфигурацию **gantt.config.project_start**:

~~~js
gantt.config.project_start = new Date(2025, 2, 1);
~~~

[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Обратное планирование {#backwardscheduling}

Также возможно планировать задачи с конца проекта, т.е. применить обратное планирование. Для этого нужно установить свойство **gantt.config.auto_scheduling.schedule_from_end** в *true* и задать конечную дату проекта через конфигурацию **gantt.config.project_end**:

~~~js
gantt.config.project_end = new Date(2025, 10, 1);
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_from_end: true
};
~~~

В этом случае задачи планируются как можно позже. Последняя задача должна завершиться на конце проекта.

[Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

## Временные ограничения для задач {#timeconstraintsfortasks}

dhtmlxGantt предоставляет возможность устанавливать дополнительные временные ограничения для задач.

:::note
Временные ограничения применяются только к задачам и [milestones](guides/milestones.md). К проектам они не применяются.
::: 

### Установка ограничений через lightbox

Вы можете задать ограничения для задачи через элемент управления **Constraint** в lightbox задачи.

![Inbuilt datepicker for constraints](/img/inbuilt_constraint_datepicker.png)

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    { name: "constraint", type: "constraint" }, /*!*/
    { name: "time", type: "duration", map_to: "auto" }
];
~~~

### Установка ограничений через встроенные редакторы

Также можно [указать отдельные столбцы для типа ограничения и его даты в гриде](guides/specifying-columns.md#timeconstraintsfortasks) и использовать встроенные редакторы для определения ограничений для задач.

![Constraints columns](/img/constraints_columns.png)

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
    min: new Date(2025, 0, 1),
    max: new Date(2026, 0, 1)
};

gantt.config.columns = [
    { /* previous column */ },
    {
        name: "constraint_type", align: "center", width: 100,
        template: task => gantt.locale.labels[gantt.getConstraintType(task)],
        resize: true, editor: constraintTypeEditor
    },
    {
        name: "constraint_date", align: "center", width: 120, template: (task) => {
            // template logic
        },
        resize: true, editor: constraintDateEditor
    },
    { name: "add", width: 44 }
];
~~~

[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Типы ограничений

Существуют несколько типов временных ограничений:

1. **As soon as possible** - Если это ограничение задано для независимой задачи и включён режим strict, задача начинается в то же время, что и проект. Если режим strict отключён, задача начинается в указанную дату.

Если это ограничение задано для зависимой задачи, задача начинается сразу после окончания её предшествующих задач.

2. **As late as possible** - Если это ограничение задано для независимой задачи, задача завершается в то же время, что и проект. Если это ограничение задано для зависимой задачи, конец задачи совпадает с началом следующей за ней задачи.

Другие типы ограничений влияют на задачи вне зависимости от типа (зависимые или независимые):

3. **Start no earlier than** - задача должна начать в указанную дату или позже.

4. **Start no later than** - задача должна начать в указанную дату или раньше.

5. **Finish no earlier than** - задача должна закончиться в указанную дату или позже.

6. **Finish no later than** - задача должна закончиться в указанную дату или раньше.

7. **Must start on** - задача должна начать точно в указанную дату.

8. **Must finish on** - задача должна завершиться точно в указанную дату.

:::note
Под независимыми задачами здесь мы подразумеваем задачи, у которых нет ни successors, ни predecessors. Иными словами, это задачи, у которых нет связей/зависимостей с другими задачами или их родителями.
:::

## Установка задержек (lag) и опережения (lead) между задачами {#settinglagandleadtimesbetweentasks}

Lag и lead — это специальные значения, используемые для создания сложных отношений между задачами.

Lag — задержка между задачами, связанных зависимостью. Lead — перекрытие между задачами, связанных зависимостью.

Существуют два типа последующих задач:

- задача, которая может начаться до окончания своей предшествующей задачи (задача B начинается до того, как задача A закончится)

Напр., если задать lead равным 1 дню для зависимости, задача B начнется за один день до окончания задачи A;

- задача, которая не может начать до истечения некоторой задержки после завершения её предшественника (задача B начинается через некоторое время после того, как задача A завершилась)

Напр., если задать lag равным 1 дню для зависимости, задача B начнется через один день после окончания задачи A.

Значения lag и lead устанавливаются во внутреннем свойстве связи — **link.lag**:

- lag — любое целое положительное значение,
- lead — отрицательное значение лага.

По умолчанию предполагается, что значение lag для каждой связки равно 0.

### Редактирование значений связи в UI

Gantt не предоставляет встроенного UI для редактирования лага или любых других свойств связи. Однако вы можете реализовать это вручную, следуя рекомендациям из
[соответствующей главы](guides/crud-dependency.md#editing-link-values-from-ui).

**Связанный пример**  [Edit-lag Popup]

## Отключение авто-распределения для конкретных задач

Чтобы отключить авто-распределение для конкретной задачи и сделать её ручной, задайте свойство **auto_scheduling** объекта задачи значением *false*:

~~~js
const task = gantt.getTask(id);
task.auto_scheduling = false;
~~~

Вы также можете запретить авто-распределение конкретной задачи с помощью обработчика [onBeforeTaskAutoSchedule]:

~~~js
gantt.attachEvent("onBeforeTaskAutoSchedule", (task, start, link, predecessor) => {
    return !task.completed;
});
~~~

## Планирование выполненных задач

По умолчанию различий в том, как алгоритм авто-распределения обрабатывает завершённые задачи (задачи с прогрессом 1) и незавершённые задачи, нет.

Опционально можно включить конфигурацию [auto_scheduling.use_progress](api/config/auto_scheduling.md#use_progress), чтобы изменить это поведение:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    use_progress: true
};
 
gantt.init("gantt_here");
~~~

Когда конфигурация включена, завершённые задачи будут исключены из критического пути и авто-распределения.

Подробнее смотрите на [странице API](api/config/auto_scheduling_use_progress.md).

## Обзор API

Список доступных методов и свойств:

- [auto_scheduling](api/config/auto_scheduling.md)
- [project_start](api/config/project_start.md)
- [project_end](api/config/project_end.md)
- [autoSchedule](api/method/autoschedule.md)
- [isUnscheduledTask](api/method/isunscheduledtask.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [getConnectedGroup](api/method/getconnectedgroup.md)

### Активация

Чтобы включить авто-распределение в диаграмме Gantt, установите свойство **enabled** конфигурации **auto_scheduling** в значение *true*:

~~~js
gantt.config.auto_scheduling = {
    enabled: true
};
~~~

### Режим строгой привязки

По умолчанию задачи перераспределяются только в том случае, если новая дата нарушает ограничение. Чтобы всегда перераспределять задачи на максимально раннюю дату, используйте свойство [auto_scheduling.gap_behavior](api/config/auto_scheduling.md#gap_behavior):

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    gap_behavior: "compress"
};
~~~

:::note
Обратите внимание, что в версиях 6.1.0 — 7.1.3 конфигурация работает только тогда, когда включен вариант [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md).
:::

### Начальное авто-распределение

Свойство [auto_scheduling.schedule_on_parse](api/config/auto_scheduling.md#schedule_on_parse) задаёт, будет ли Gantt выполнять авто-распределение при загрузке данных. По умолчанию установлено в *true*:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_on_parse: true
};
~~~

### Наследование ограничения проекта

Свойство [auto_scheduling.project_constraint](api/config/auto_scheduling.md#project_constraint) определяет, должны ли задачи без указанного типа ограничения наследовать тип ограничения от родительского проекта:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    project_constraint: true
};
~~~

### Пересчёт расписания проекта

Чтобы пересчитать расписание всего проекта, используйте метод [autoSchedule](api/method/autoschedule.md):

~~~js
gantt.autoSchedule();
~~~

Если нужно пересчитать расписание, начиная с конкретной задачи, передайте её идентификатор как аргумент метода [autoSchedule](api/method/autoschedule.md):

~~~js
gantt.autoSchedule(taskId);
~~~

### Проверка того, что задача не запланирована

Если необходимо проверить, запланирована ли задача, используйте метод [isUnscheduledTask](api/method/isunscheduledtask.md) с объектом задачи в качестве аргумента:

~~~js
const isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### Поиск круговых зависимостей

Чтобы найти все круговые ссылки в диаграмме, воспользуйтесь методом [findCycles](api/method/findcycles.md):

~~~js
gantt.findCycles();
~~~

### Проверка и на циклическую связь

Если нужно проверить, является ли связь циклической, применяйте метод [isCircularLink](api/method/iscircularlink.md):

~~~js
const isCircular = gantt.isCircularLink(link);
~~~

### Получение связанных задач и связей

Чтобы получить список задач и связей, с которыми связана задача, используйте метод [getConnectedGroup](api/method/getconnectedgroup.md):

~~~js
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}
~~~

## Список событий

Ниже приведён список доступных событий:

- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

~~~js
// до начала авто-распределения
gantt.attachEvent("onBeforeAutoSchedule", (taskId) => {
    // любая пользовательская логика
    return true;
});

// после завершения авто-распределения
gantt.attachEvent("onAfterAutoSchedule", (taskId, updatedTasks) => {
    // любая пользовательская логика
});

// до перераспределения конкретной задачи
gantt.attachEvent("onBeforeTaskAutoSchedule", (task, start, link, predecessor) => {
    // любая пользовательская логика
    return true;
});

// после перераспределения конкретной задачи
gantt.attachEvent("onAfterTaskAutoSchedule", (task, start, link, predecessor) => {
    // любая пользовательская логика
});

// если обнаружена циклическая ссылка и авто-распределение невозможно
gantt.attachEvent("onCircularLinkError", (link, group) => {
    // любая пользовательская логика
});

// если во время авто-распределения найдены циклические связи
gantt.attachEvent("onAutoScheduleCircularLink", (groups) => {
    // любая пользовательская логика
});
~~~

## Совместимость версий

Когда пользователь перемещает дату задачи мышью или через lightbox, задача автоматически получает один из двух типов ограничений: либо **start no earlier than+%start date%**, либо **finish no later than+%end date%**, в зависимости от выбранной стратегии планирования.

Таким образом задача не будет запланирована на максимально раннюю дату, если позже была задана дата через UI. Это может ввести в заблуждение неподготовленного пользователя, особенно потому что ограничения по умолчанию не отображаются на диаграмме.

Начиная с **v9.1** можно включить отображение ограничений с помощью свойства [auto_scheduling.show_constraints](api/config/auto_scheduling.md#show_constraints). Более старые версии требуют использования метода [addTasklayer](api/method/addtasklayer.md) для добавления ограничений на диаграмму.

[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

Это поведение отличается от логики авто-распределения Gantt до версии **v6.1** и считается правильным, поскольку так же работает авто-планирование в MS Project.

Если это не то, чего вы хотите, можно вернуться к пред-6.1 авто-распределению, отключив ограничения одним из следующих способов:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false
};
~~~

### Связанный API
- [auto_scheduling](api/config/auto_scheduling.md)