---
title: "Дополнительные элементы на временной шкале"
sidebar_label: "Дополнительные элементы на временной шкале"
---

Дополнительные элементы на временной шкале
==========================================

:::info
Эта функция доступна только в PRO-версии
:::

По умолчанию dhtmlxGantt отображает элементы временной шкалы слоями в следующем порядке:

1. Грид временной шкалы
2. Связи
3. Задачи
4. Дополнительные элементы

В Gantt входят встроенные элементы, такие как базовые планы (baselines), крайние сроки (deadlines) и ограничения по времени (constraints). Помимо стандартных дополнительных элементов, вы также можете [создавать пользовательские элементы в виде дополнительных слоев](guides/baselines.md).

Базовые планы (Baselines)
-------------------------

Базовые планы играют важную роль в инструментах управления проектами, таких как диаграммы Ганта, позволяя сравнивать запланированные сроки с фактическим ходом выполнения. API Gantt предоставляет встроенную поддержку базовых планов, что облегчает работу с этой важной функцией.

![Встроенные базовые планы](/img/inbuilt_baselines.png)


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


### Настройка базовых планов

Если стандартные параметры базовых планов не подходят для вашего проекта, их можно отключить с помощью опции конфигурации [baselines](api/config/baselines.md).

~~~js
gantt.config.baselines = false;
~~~

После отключения вы можете настроить отображение базовых планов одним из следующих способов:

1. Использование объекта конфигурации **gantt.config.baselines**

Этот объект позволяет настраивать отображение базовых планов, если он задан как объект. Он включает следующие свойства:

- **datastore** (*string*) - имя хранилища данных для записи базовых планов. Подробнее см. метод `getDatastore`.
- **render_mode** (*boolean | string*) - управляет отображением базовых планов:
    - `false` - базовые планы скрыты.
    - `"taskRow"` - базовые планы отображаются в той же строке, что и полоса задачи.
    - `"separateRow"` - базовые планы показываются в отдельной подстроке, увеличивая высоту строки задачи.
    - `"individualRow"` - каждый базовый план отображается в собственной подстроке под задачей.
- **dataprocessor_baselines** (*boolean*) - указывает, обновляются ли базовые планы через DataProcessor индивидуально.
- **row_height** (*number*) - высота подстроки для базовых планов; актуально только для `render_mode` `"separateRow"` или `"individualRow"`.
- **bar_height** (*number*) - высота полосы базового плана.

Пример:

~~~js
gantt.config.baselines = {
  datastore: "baselines",
  render_mode: false,
  dataprocessor_baselines: false,
  row_height: 16,
  bar_height: 8
};
gantt.init("gantt_here");
~~~

Если вы динамически изменяете настройки отображения **gantt.config.baselines**, рекомендуется использовать метод [adjustTaskHeightForBaselines](api/method/adjusttaskheightforbaselines.md) для корректного отображения базовых планов.

~~~js
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task); /*!*/
gantt.render();
~~~

2. [Создание пользовательского элемента базового плана](guides/baselines.md) для добавления во временную шкалу.

### Загрузка базовых планов вместе с задачами

Базовые планы можно загружать вместе с задачами следующим образом:

~~~js
gantt.parse({
  tasks: [
    {
      id: 2,
      start_date: "2025-04-04 00:00:00",
      duration: 2,
      text: "Task #1",
      progress: 0.5,
      parent: 0,
      open: true,
      end_date: "2025-04-06 00:00:00",
    },
    // Дополнительные задачи...
  ],
  links: [],
  baselines: [ /*!*/
    { /*!*/
      id: 2, /*!*/
      task_id: 2, /*!*/
      start_date: "2025-04-03 00:00:00", /*!*/
      duration: 2, /*!*/
      end_date: "2025-04-05 00:00:00", /*!*/
    }, /*!*/
    // Дополнительные базовые планы... /*!*/
  ], /*!*/
});
~~~

После загрузки Gantt автоматически отобразит базовые планы на временной шкале без дополнительной настройки.

### Получение базовых планов задачи

Вы можете получить базовые планы для конкретной задачи с помощью метода [getTaskBaselines](api/method/gettaskbaselines.md).

~~~js
gantt.getTaskBaselines(5);
~~~

Метод возвращает массив объектов базовых планов, связанных с задачей из хранилища данных.

~~~js
[
    {
        task_id: 5,
        id: 1, 
        duration: 2, 
        start_date: "03-04-2019 00:00", 
        end_date: "05-04-2019 00:00"
    },
    {
        task_id: 5,
        id: 2, 
        duration: 1, 
        start_date: "06-04-2019 00:00", 
        end_date: "07-04-2019 00:00"
    }
]
~~~

### Базовые планы в лайтбоксе

Базовые планы можно управлять напрямую через элемент управления лайтбоксом, добавляя, редактируя и удаляя их в деталях задачи.

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
  { name: "time", type: "duration", map_to: "auto" },
  { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
];
~~~

![Лайтбокс для базовых планов](/img/baselines_lightbox.png)

### Режимы отображения базовых планов

Существует три способа отображения базовых планов, которые выбираются через опцию **gantt.config.baselines.render_mode**:

- В одной строке с задачей ("taskRow")

Базовые планы отображаются непосредственно рядом с полосами задач:

~~~js
gantt.config.baselines.render_mode = "taskRow";
~~~

![Режим task row](/img/baselines_task_row.png)

- В отдельной подстроке под задачей ("separateRow")

Все базовые планы отображаются в одной подстроке под каждой задачей:

~~~js
gantt.config.baselines.render_mode = "separateRow";
~~~

![Режим subrow](/img/baselines_subrow.png)

- В индивидуальной подстроке ("individualRow")

Каждый базовый план отображается в собственной подстроке для более наглядного отображения:

~~~js
gantt.config.baselines.render_mode = "individualRow";
~~~

![Режим individual row](/img/baselines_individual_row.png)

### Настройка текста базового плана

Чтобы добавить пользовательский текст внутрь элементов базового плана, используйте шаблон [baseline_text](api/template/baseline_text.md):

~~~js
gantt.templates.baseline_text = function(task, baseline, index) {
    return "Baseline #" + (index + 1);
};
~~~

Крайние сроки и ограничения
--------------------------

Контроль крайних сроков и ограничений задач - ключ к успешной реализации проекта. DHTMLX Gantt включает встроенные визуальные элементы для крайних сроков и ограничений, что улучшает управление временной шкалой проекта.

![Крайние сроки](/img/deadlines.png)


[Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


### Визуализация крайних сроков

Gantt поддерживает поле **task.deadline**. Если оно установлено, на диаграмме появляется визуальный маркер для отслеживания крайних сроков.

~~~js
gantt.parse({
  data: [
    {
      id: 1,
      text: "Task with Deadline",
      start_date: "2025-04-04",
      duration: 5,
      deadline: new Date(2025, 3, 10), // April 10, 2025 /*!*/
    },
    // Дополнительные задачи...
  ],
});
~~~

### Настройка крайних сроков

Если стандартная функция крайних сроков не подходит для вашего случая, вы можете отключить её с помощью опции [deadlines](api/config/deadlines.md).

~~~js
gantt.config.deadlines = false;
~~~

После отключения вы можете настроить отображение крайних сроков, [создав собственный элемент для крайних сроков](guides/baselines.md) и добавив его на временную шкалу.

Параметр **gantt.config.deadlines** управляет отображением элементов крайних сроков. Если включено, Gantt проверяет свойство **task.deadline**, и если оно содержит корректную дату, маркер крайнего срока появляется на временной шкале.

### Ограничения задач (#taskconstraints)

Начиная с версии 9.0, когда включено [автоматическое планирование](guides/auto-scheduling.md) и оно работает в режиме Constraint (при [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md), установленном в *false*), Gantt автоматически отображает даты ограничений на диаграмме.

~~~js
gantt.parse({
  data: [
    { 
      id: 1, 
      text: "Task #1", 
      start_date: "2025-04-04", 
      duration: 4, 
      constraint_date: "2025-04-04", 
      constraint_type: "snet", 
      parent: 0
    },
    // Дополнительные задачи
  ]
})
~~~

Вы можете управлять отображением ограничений с помощью опции `show_constraints` в конфиге [auto_scheduling](api/config/auto_scheduling.md). По умолчанию ограничения отображаются, но их можно скрыть, установив `show_constraints` в `false`:

~~~js
gantt.config.auto_scheduling = {
  enabled: true,
  show_constraints: false
};
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

