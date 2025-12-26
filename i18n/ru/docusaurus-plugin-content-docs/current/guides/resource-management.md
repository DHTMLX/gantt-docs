---
title: "Управление ресурсами"
sidebar_label: "Управление ресурсами"
---

# Управление ресурсами

:::info
Эта функция доступна только в редакции Gantt PRO.
:::

Gantt предоставляет предустановленные представления ресурсов для визуализации загрузки ресурсов, инструменты для детализации проекта по ресурсам с целью балансировки нагрузки, а также календари, адаптированные для заданий и ресурсов.

![resource_panel](/img/resource_panel.png)

:::note
Хотя сам Gantt не рассчитывает загрузку ресурсов и не предлагает встроенных методов для этого, он предоставляет публичный API, чтобы вы могли реализовать любую необходимую функциональность.
:::

## Панель представления ресурсов

dhtmlxGantt предлагает два предустановленных варианта компоновки для отображения загрузки ресурсов: диаграмма загрузки ресурсов и гистограмма ресурсов.

### Диаграмма загрузки ресурсов

Включает специализированные представления для грида и таймлайна: "resourceGrid" и "resourceTimeline".

![resource_panel](/img/resource_panel.png)

:::note
Для представлений "resourceGrid" (отображение колонок ресурсов вместо задач) и "resourceTimeline" необходимо предоставить отдельные [конфиги](guides/layout-config.md#configsandtemplatesofviews), а также [шаблоны](guides/layout-config.md#configsandtemplatesofviews) для настройки отображения назначений ресурсов в панели.
:::

~~~js
gantt.config.layout = {
    css: "gantt_container",
    rows: [
      {
        // компоновка для стандартного грида и таймлайна
        cols: [
          {view: "grid", group:"grids", scrollY: "scrollVer"},
          {resizer: true, width: 1},
          {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
          {view: "scrollbar", id: "scrollVer", group:"vertical"}
        ],
        gravity:2
      },
      { resizer: true, width: 1},
      {
        // компоновка для грида и таймлайна панели ресурсов
        config: resourceConfig, // конфиг для грида и таймлайна
        cols: [
          {view: "resourceGrid", group:"grids", width: 435, scrollY:"resourceVScroll"},
          {resizer: true, width: 1},
          {view: "resourceTimeline", scrollX: "scrollHor", scrollY:"resourceVScroll"},
          {view: "scrollbar", id: "resourceVScroll", group:"vertical"}
        ],
        gravity:1
       },
       {view: "scrollbar", id: "scrollHor"}
    ]
};
~~~


[Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)


После настройки *resourceGrid* ведет себя как стандартный грид, но доступен только для чтения. *resourceTimeline* использует те же параметры масштаба, что и стандартный таймлайн, и содержит два слоя:

- Фоновые строки, которые используют шаблоны из [task_row_class](api/template/task_row_class.md) и [timeline_cell_class](api/template/timeline_cell_class.md). Их можно настраивать на уровне компоновки.
- Слой ресурсов - уникальный для *resourceTimeline*, отображает блоки в ячейках, где у ресурсов есть назначенные задачи. Стиль и содержимое этих блоков можно настроить с помощью шаблонов [resource_cell_class](api/template/resource_cell_class.md) и [resource_cell_value](api/template/resource_cell_value.md):

~~~js
gantt.templates.resource_cell_value = function(start_date, end_date, resource, tasks,
    assignments){
    var html = "<div>" +  tasks.length * 8 + "h</div>";
        return html;
};
~~~


[Templates of the Resource diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)


### Гистограмма ресурсов

Это представление загрузки ресурсов включает "resourceGrid" и "resourceHistogram" для грида и таймлайна соответственно.

![Resource histogram](/img/resource_histogram.png)

:::note
Для представлений "resourceGrid" (отображение колонок ресурсов) и "resourceHistogram" необходимо предоставить отдельные [конфиги](guides/layout-config.md#configsandtemplatesofviews), а также [шаблоны](guides/layout-config.md#configsandtemplatesofviews) для настройки отображения назначений ресурсов.
:::


~~~js
gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            // компоновка для стандартного грида и таймлайна
            gravity: 2,
            cols: [
                {view: "grid", group:"grids", scrollY: "scrollVer"},
                {resizer: true, width: 1},
                {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
                {view: "scrollbar", id: "scrollVer", group:"vertical"}
            ]
        },
        { resizer: true, width: 1, next: "resources"},
        {
            // компоновка для грида и таймлайна панели ресурсов
            gravity:1,
            id: "resources",
            config: resourceConfig, // конфиг для грида и таймлайна
            templates: resourceTemplates, // шаблоны для грида и таймлайна
            cols: [
                { view: "resourceGrid", group:"grids", scrollY: "resourceVScroll" },
                { resizer: true, width: 1},
                { view: "resourceHistogram", capacity:24, scrollX: "scrollHor", 
                    scrollY: "resourceVScroll"},
                { view: "scrollbar", id: "resourceVScroll", group:"vertical"}
            ]
        },
        {view: "scrollbar", id: "scrollHor"}
    ]
};
~~~


[Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)


Как и в диаграмме загрузки ресурсов, *resourceGrid* ведет себя как стандартный грид, но доступен только для чтения. *resourceHistogram* предоставляет несколько дополнительных шаблонов:

- *histogram_cell_class* - CSS-класс, применяемый к ячейке панели ресурсов

~~~js
gantt.templates.histogram_cell_class="function(start_date,end_date,resource,tasks,"
    assignments){
    return "";
};
~~~

- *histogram_cell_label* - метка, отображаемая внутри ячейки

~~~js
gantt.templates.histogram_cell_label="function(start_date,end_date,resource,tasks,"
    assignments){
     return tasks.length * 8;
};
~~~

- *histogram_cell_allocated* - высота заполненной области в гистограмме, от 0 до *maxCapacity*.

~~~js
gantt.templates.histogram_cell_allocated="function(start_date,end_date,resource,tasks,"
    assignments){
     return tasks.length * 8;
};
~~~

- *histogram_cell_capacity* - высота линии, обозначающей доступную емкость ресурса, от -1 до *maxCapacity*. Значения ниже 0 скрывают линию.

~~~js
gantt.templates.histogram_cell_capacity="function(start_date,end_date,resource,tasks,"
    assignments){
     return 24;
};
~~~

**Понимание maxCapacity**

Каждая строка гистограммы представляет собой столбец диаграммы, где maxCapacity - это высота шкалы по оси Y. В примере ниже maxCapacity равен 24:

![maxCapacity](/img/maxcapacity.png)

Таким образом, если задать *histogram_cell_allocated* или *histogram_cell_capacity* значение 24, это будет соответствовать верхней границе строки.

По умолчанию **maxCapacity** равен 24 для каждого ресурса. Если возвращать значения выше 24 в *histogram_cell_capacity*, расчет будет корректным, но заполненная область в ячейках панели ресурсов может отображаться не так, как ожидается.

![filled_capacity](/img/filled_capacity.png)

Вы можете настроить **maxCapacity** глобально для всей гистограммы или индивидуально для каждого ресурса. Пример:


**Related example:** [Настройка maxCapacity](https://snippet.dhtmlx.com/glnqcsgq)


**maxCapacity** можно задать на уровне гистограммы:

~~~js
{ view: "resourceHistogram", capacity:24, scrollX: "scrollHor", 
    scrollY: "resourceVScroll"}
~~~

Или индивидуально для каждого ресурса:

~~~js
resourcesStore.parse([
    {id: 1, text: "John", capacity:8},
    {id: 2, text: "Mike", capacity:4},
    {id: 3, text: "Anna", capacity:8},
    {id: 4, text: "Bill", capacity:8},
    {id: 5, text: "Floe", capacity:8}
]);
~~~

:::note
Емкость, заданная на уровне ресурса, переопределяет глобальную емкость гистограммы для этого ресурса.
:::

## Работа с панелью представления ресурсов

По умолчанию оба представления (либо "resourceGrid" и "resourceTimeline", либо "resourceGrid" и "resourceHistogram") подключаются к хранилищу данных, указанному в настройке
[gantt.config.resource_store](api/config/resource_store.md).

### Автоматическое создание хранилища данных

Начиная с версии 8.0, хранилище данных ресурсов создается автоматически при инициализации gantt и готово к моменту срабатывания события "onGanttReady". Для доступа к этому хранилищу используйте метод [getDatastore](api/method/getdatastore.md).

Если вы хотите настроить хранилище ресурсов, используйте опцию [gantt.config.resources](api/config/resources.md):

~~~js
gantt.config.resources = {
    resource_store: {
        type: "treeDataStore",
        fetchTasks: true,
        initItem: function(item) {
            item.parent = item.parent || gantt.config.root_id;
            item[gantt.config.resource_property] = item.parent;
            item.open = true;
            return item;
        }
    },
}
~~~

Параметры внутри **resource_store** будут использованы для создания стандартного хранилища ресурсов. Если в вашем коде уже есть хранилище ресурсов, gantt использует его.

Для загрузки ресурсов вы можете передать их через **gantt.parse()**/**gantt.load()**, как описано [здесь](guides/resource-management.md#loadingresourcesandresourceassignments), либо напрямую заполнить хранилище методом **datastore.parse()**:

~~~js
gantt.attachEvent("onGanttReady", function(){
    const store = gantt.getDatastore(gantt.config.resource_store);
    store.parse([
       {id: 6, text: "John"},
       {id: 7, text: "Mike"},
       {id: 8, text: "Anna"},
       {id: 9, text: "Bill"},
    ])
});
~~~

Контрол ресурса в lightbox автоматически будет связан со списком ресурсов:

~~~js
gantt.config.lightbox = {
    sections: [
        ...,
        { name: "resources", type: "resources", map_to: "auto", default_value: 8}
    ]
};
~~~


### Ручное создание хранилища данных

Вы также можете создать хранилище данных вручную с помощью метода [createDatastore](api/method/createdatastore.md):

~~~js
var resourcesStore = gantt.createDatastore({
  name: gantt.config.resource_store,
  // используйте treeDatastore, если ваши ресурсы иерархичны (например, работники/отделы),
  // или опустите "type" для плоской структуры
  type: "treeDatastore", 
  initItem: function (item) {
    item.parent = item.parent || gantt.config.root_id;
    item[gantt.config.resource_property] = item.parent;
    item.open = true;
    return item;
  }
});
~~~

Для заполнения хранилища используйте метод **datastore.parse**:

~~~js
resourcesStore.parse([
    {id: 1, text: "QA", parent:null},
      {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);
~~~

Если вы хотите использовать ресурсы в lightbox, удобно сделать это через метод [serverList](api/method/serverlist.md), срабатывающий на событие onParse хранилища данных:

~~~js
resourcesStore.attachEvent("onParse", function(){
  var people = [];
  resourcesStore.eachItem(function(res){
    if(!resourcesStore.hasChild(res.id)){
        var copy = gantt.copy(res);
        copy.key = res.id;
        copy.label = res.text;
        people.push(copy);
    }
  });
  gantt.updateCollection("resourceOptions", people);
});
~~~

### Разворачивание панели ресурсов

Вы можете развернуть панель ресурсов для отображения всех задач, назначенных определенному ресурсу, включив свойство **fetchTasks** при инициализации хранилища данных:

![Expanded resource panel](/img/expanded_resource_panel.png)

~~~js
gantt.config.resources = {
    resource_store: {
        type: "treeDataStore",
        fetchTasks: true, /*!*/
        initItem: function (item) {
             item.parent = item.parent || gantt.config.root_id;
             item[gantt.config.resource_property] = item.parent;
             if(!item.parent){
                 item.open = true;
             }else{
                 item.open = false;
             }
             return item;
         }
    },
};
~~~

или

~~~js
gantt.$resourcesStore = gantt.createDatastore({
     name: gantt.config.resource_store,
    type: "treeDatastore",
     fetchTasks: true, /*!*/
     initItem: function (item) {
         item.parent = item.parent || gantt.config.root_id;
         item[gantt.config.resource_property] = item.parent;
         if(!item.parent){
             item.open = true;
         }else{
             item.open = false;
         }
         return item;
     }
});
~~~


[Show all assigned tasks in the resource panel](https://docs.dhtmlx.com/gantt/samples/11_resources/11_resource_histogram_display_tasks.html)


Если **fetchTasks** установлено в *true*, Gantt будет отображать все задачи, связанные с ресурсом, в панели представления ресурсов. Это работает как для диаграммы ресурсов, так и для гистограммы ресурсов.

Быстро получить все задачи, назначенные ресурсу, можно с помощью [getResourceAssignments](api/method/getresourceassignments.md).

~~~js
gantt.getResourceAssignments("6");
~~~

## Назначение ресурсов {#assigningresources}

### Связывание ресурсов с задачами

Связь между ресурсами и задачами настраивается с помощью параметра [resource_property](api/config/resource_property.md):

~~~js
gantt.config.resource_property = "user_id";
// task.user_id <-> resource.id
~~~

Ресурсы могут быть связаны с задачами через свойства объекта задачи несколькими способами:

- назначение одного ресурса задаче

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6, 
    user_id: 5 // 5 - это id ресурса
}
~~~

- назначение нескольких ресурсов задаче

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6, 
    users: [2, 3] // 2 и 3 - это id ресурсов
}
~~~

Этот формат хорошо работает с [кастомным multiselect контролом](guides/custom-editor.md#customthirdpartyeditor).

- назначение нескольких ресурсов с указанием количества

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6,
    users: [{resource_id:2, value:8}, {resource_id:3, value:4}]  
}
~~~

Здесь ресурсу с id="2" назначено 8 единиц, а ресурсу с id="3" - 4 единицы. Такой формат поддерживается lightbox-ом из [Контрол ресурсов](guides/resources.md).

Начиная с версии v8.0, назначения ресурсов также можно загружать отдельным списком, и Gantt автоматически свяжет их с задачами:

~~~js
gantt.parse({
       tasks: [...],
       links: [...],
       resources: [...],
       assignments: [{id:1, resource_id:2, task_id: 5, value: 8}, ...]
});
~~~

Подробнее о форматах данных можно узнать [здесь](guides/resource-management.md#loadingresourcesandresourceassignments).

При отправке данных на сервер DataProcessor сериализует эти свойства в JSON. Для эффективной обработки таких записей на сервере рекомендуется использовать режим dataprocessor ["REST_JSON"](guides/server-side.md#restjson).

Если вы хотите сохранять изменения в назначениях ресурсов отдельно от задач, включите эту настройку:

~~~js
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
};
~~~

Подробнее читайте в [отдельной статье](guides/server-side.md#resources_crud).

### Указание времени назначения ресурса {#resourceassignmenttime}

По умолчанию ресурс назначается на всю длительность задачи.


Начиная с v7.1, объекты назначения ресурсов могут содержать дополнительные опциональные параметры для указания дат назначения внутри задачи.

Дополнительные свойства:

- **id** - (*string|number*) id назначения
- **start_date** - (*Date|string*) дата начала назначения
- **end_date** - (*Date|string*) дата окончания назначения
- **delay** - (*number*) смещение между началом назначения и началом задачи
- **duration** - (*number*) длительность назначения
- **mode** - (*string*) способ расчёта времени назначения: "default"|"fixedDates"|"fixedDuration"

~~~js
{
    id: 5, text: "Interior office", type: "task", start_date: "03-04-2019 00:00",
    duration: 7, parent: "2", progress: 0.6, priority: 1,
    users: [{
        resource_id: "3",
        value: 8,
        delay: 1 /*!*/
    },{
        resource_id: "6",
        value: 3,
        start_date: "03-04-2019 00:00", /*!*/
        end_date: "05-04-2019 00:00", /*!*/
        mode: "fixedDates" /*!*/
    },{
        resource_id: "7",
        value: 3,
        delay: 1, /*!*/
        duration: 2, /*!*/
        mode: "fixedDuration" /*!*/
    }
    ]
}
~~~


[Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)


1. *Даты начала и окончания* назначений ресурсов будут отображаться в гистограмме и диаграмме ресурсов.

2. Вы можете добавить необязательный *id* в объект назначения:

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6,
    users: [{
        id: 5, 
        resource_id: 2, value: 8, 
        delay: 1
    }]
}
~~~

Этот id позволяет получить назначение через API Gantt:

~~~js
var assignment = gantt.getDatastore("resourceAssignments").getItem(5);
~~~

:::note
Datastore ["resourceAssignments"](api/config/resource_assignment_store.md) доступен только при включённой опции [process_resource_assignments](api/config/process_resource_assignments.md).
:::


3. Поведение других свойств зависит от значения **mode**:

- **_режим "default"_**

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6,
    users: [
        { resource_id: 2, value: 8, delay: 1},
        { resource_id: 3, value: 6},
    ]
}
~~~

Если *mode* отсутствует или установлен в "default", *start_date* и *end_date* назначения вычисляются на основе дат задачи. По умолчанию назначение начинается с даты начала задачи и заканчивается с её окончанием.

Свойство *delay* работает аналогично полю *Delay* в [MS Project](https://support.microsoft.com/en-us/office/assignment-delay-fields-427ac799-225c-4e10-9dcb-f58e524c8173).

Если задан delay, *start_date* назначения рассчитывается как 

`gantt.calculateEndDate((start_date:task.start_date, duration:assignment.delay, task:task))`.

Это означает, что назначение начнётся после указанной задержки от старта задачи и завершится вместе с задачей. Эти даты автоматически обновляются при изменении задачи.

- **_режим "fixedDuration"_**

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6,
    users: [
        {resource_id:2, value:8, duration: 1, delay:0, mode: "fixedDuration"},
        {resource_id:2, value:2, duration: 1, delay:1, mode: "fixedDuration"},
        {resource_id:2, value:3, delay:2, mode: "default"}
    ]
}
~~~

Здесь *start_date* рассчитывается так же, как в режиме *default*.

Однако *end_date* больше не привязан к дате окончания задачи. Вместо этого он вычисляется как

 `gantt.calculateEndDate((start_date:assignment.start_date, duration:assignment.duration, task:task))`.

При изменении задачи даты назначений пересчитываются, но длительность назначений остаётся фиксированной.

- **_режим "fixedDates"_**

~~~js
{
    id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6,
    users: [{
        resource_id:2, value:8, 
        start_date:"03-04-2018", end_date:"11-04-2018", mode: "fixedDates"
    }]
}
~~~

В этом режиме даты назначения задаются явно и не изменяются при изменении задачи.

Свойство *delay* не влияет на назначение, если *mode* - "fixedDates".


Краткая сводка по вычислению дат назначений для каждого режима:

- **default**

  - assignment.start_date = task.start_date + assignment.delay
  - assignment.end_date = task.end_date

- **fixedDuration**

  - assignment.start_date = task.start_date + assignment.delay
  - assignment.end_date = assignment.start_date + assignment.duration

- **fixedDates**

  - assignment.start_date = assignment.start_date
  - assignment.end_date = assignment.end_date


### Получение задач, назначенных ресурсу

Чтобы быстро получить все задачи, назначенные ресурсу, используйте метод, описанный в [getResourceAssignments](api/method/getresourceassignments.md).

~~~js
gantt.getResourceAssignments("6"); 
~~~

Метод принимает id ресурса и возвращает массив объектов, описывающих задачи, к которым этот ресурс назначен:

~~~js
[ 
    {task_id: 5, resource_id: "6", value: 5, delay: 0, duration: 7, 
        start_date: "03-04-2019 00:00", end_date: "12-04-2019 00:00", 
        id: 1617258553240, mode: "default"},
    {task_id: 18, resource_id: "6", value: 2, delay: 0, duration: 2, 
        start_date: "05-04-2019 00:00", end_date: "09-04-2019 00:00", 
        id: 1617258553250, mode: "default"},
    {task_id: 19, resource_id: "6", value: 3, delay: 0, duration: 4, 
        start_date: "09-04-2019 00:00", end_date: "13-04-2019 00:00", 
        id: 1617258553251, mode: "default"},
    {task_id: 21, resource_id: "6", value: 5, delay: 0, duration: 4, 
        start_date: "03-04-2019 00:00", end_date: "09-04-2019 00:00", 
        id: 1617258553254, mode: "default"}
]
~~~

Каждый объект содержит следующие свойства:

- *task_id* - идентификатор задачи
- *resource_id* - идентификатор ресурса
- *value* - количество ресурса, назначенного задаче
- *delay* - смещение между началом назначения и началом задачи
- *duration* - длительность назначения
- *start_date* - дата начала назначения
- *end_date* - дата окончания назначения
- *id* - идентификатор назначения
- *mode* - способ расчёта времени назначения: "default"|"fixedDates"|"fixedDuration"

### Получение назначений ресурсов для задачи

Метод [getTaskAssignments](api/method/gettaskassignments.md) позволяет получить назначения ресурсов для конкретной задачи из datastore:

~~~js
gantt.getTaskAssignments(5);
~~~

Метод принимает id задачи и возвращает массив объектов, представляющих назначения ресурсов для этой задачи:

~~~js
[
    {task_id: 5, id: 1617254693938, delay: 0, duration: 2, 
        start_date: "03-04-2019 00:00", end_date: "05-04-2019 00:00", 
        mode: "fixedDuration", resource_id: 6, value: 3},
    {task_id: 5, id: 1617254693946, delay: 3, duration: 1, 
        start_date: "06-04-2019 00:00", end_date: "07-04-2019 00:00", 
        mode: "fixedDuration", resource_id: 6, value: 6}
]
~~~

Возвращаемые объекты содержат те же свойства, что и объекты из метода [getResourceAssignments](api/method/getresourceassignments.md).

### Связывание через lightbox

Ресурсы могут быть связаны с любым свойством объекта задачи с помощью встроенного lightbox.

~~~js
gantt.serverList("people", [
    {key: 1, label: "John"},
    {key: 2, label: "Mike"},
    {key: 3, label: "Anna"},
    {key: 4, label: "Bill"},
    {key: 7, label: "Floe"}
]);

gantt.locale.labels.section_owner = "Owner";

gantt.config.lightbox.sections = [
  {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
  {name:"owner", map_to:"owner_id", type:"select", options:gantt.serverList("people")},
  {name:"time", type:"duration", map_to: "auto"}
];
~~~

Подробнее о настройке resource control в lightbox читайте в статье [Resources Control](guides/resources.md).

### Загрузка коллекций

Коллекции, определённые как серверные списки, могут быть загружены и обновлены динамически после инициализации Gantt:

~~~js
// инициализация лайтбокса с пустой коллекцией 
gantt.locale.labels.section_owner = "Owner";

gantt.config.lightbox.sections = [
  {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
  {name:"owner", map_to:"owner_id", type:"select", options:gantt.serverList("people")},
  {name:"time", type:"duration", map_to: "auto"}
];

// обновление опций после загрузки 
gantt.updateCollection("people", [
    {key: 1, label: "John"},
    {key: 2, label: "Mike"},
    {key: 3, label: "Anna"},
    {key: 4, label: "Bill"},
    {key: 7, label: "Floe"}
]);
~~~

![resource_management](/img/resource_management.png)


[Assigning owners to tasks](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)


При определении ресурсов через коллекцию *serverList*, они могут быть [загружены вместе с другими данными](guides/supported-data-formats.md#jsonwithcollections). В противном случае требуется ручная загрузка.

Дополнительные рекомендации по настройке элемента управления ресурсами в лайтбоксе доступны в статье [Resources Control](guides/resources.md).

## Загрузка ресурсов и назначений ресурсов

Начиная с версии 8.0, ресурсы и назначения ресурсов могут быть загружены в Gantt с помощью методов [gantt.parse()](api/method/parse.md) или [gantt.load()](api/method/load.md):

~~~js
gantt.parse({
    tasks: [
        ...,
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2024 00:00",
            duration: 7,
            parent: "2",
            owner: [
                {
                    resource_id: "6",
                    value: 3,
                    start_date: "03-04-2024 00:00",
                    end_date: "05-04-2024 00:00",
                }
            ]
        },
        ...
    ],
    links: [],
    resources: [
        {id: 6, text: "John", unit: "hours/day" },
        {id: 7, text: "Mike", unit: "hours/day" },
        {id: 8, text: "Anna", unit: "hours/day" },
        {id: 9, text: "Bill", unit: "hours/day" },
        {id: 10, text: "Floe", unit: "hours/day" }
    ]
});
~~~

Назначения ресурсов также могут быть предоставлены отдельно от задач:

~~~js
gantt.parse({
    tasks: [
        ...,
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2024 00:00",
            duration: 7,
            parent: "2",
            priority: 1
        },
        ...
    ],
    links: [],
    assignments: [
        {
            id: 1, task_id: 5, resource_id: 6, value: 3,
            start_date: "03-04-2024 00:00", 
            end_date: "05-04-2024 00:00"
        }
    ],
    resources: [
        {id: 6, text: "John", unit: "hours/day" },
        {id: 7, text: "Mike", unit: "hours/day" },
        {id: 8, text: "Anna", unit: "hours/day" },
        {id: 9, text: "Bill", unit: "hours/day" },
        {id: 10, text: "Floe", unit: "hours/day" }
    ]
});
~~~

## Управление назначениями ресурсов

### Разбор назначений ресурсов

Начиная с версии 7.1, назначения ресурсов могут обрабатываться как объекты внутри хранилища данных.

Свойство [process_resource_assignments](api/config/process_resource_assignments.md) управляет разбором значений из [gantt.config.resource_property](api/config/resource_property.md) задач во внутренние объекты назначений ресурсов. Это позволяет работать с назначениями через DataStore API, включая получение или обновление объектов назначений.

**Примечание**: Эта функция необходима при указании желаемой длительности и времени для ресурсов, особенно при работе с диаграммой ресурсов и гистограммой.

Имейте в виду, что включение этого процесса может привести к снижению производительности, что может повлиять на большие проекты. Если детали по времени или длительности не нужны, разбор можно отключить:

~~~js
gantt.config.process_resource_assignments = false;
~~~

Когда опция отключена, `gantt.getDatastore("resourceAssignments")` будет недоступен, и объекты назначений не будут иметь динамических свойств. В этом случае диаграмма ресурсов и гистограмма будут рассматривать ресурсы как назначенные на всю длительность задачи.

### Обновление назначений ресурсов

Назначения ресурсов хранятся в автоматически созданном [хранилище данных](api/config/resource_assignment_store.md).

По умолчанию это хранилище наполняется на основе объектов задач. Таким образом, изменение свойства ресурса задачи (например, task.users) автоматически обновит хранилище данных:

~~~js
task[gantt.config.resource_property] = [
    {
        resource_id: "6",
        value: 3,
        start_date: "03-04-2019 00:00",
        end_date: "05-04-2019 00:00",
    }
];
gantt.updateTask(taskId);
~~~


Однако иногда необходимо обновить объект задачи после внесения изменений в назначения ресурсов через DataStore API. Чтобы применить изменения обратно к объекту задачи, используйте метод [gantt.updateTaskAssignments()](api/method/updatetaskassignments.md):

~~~js
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);

assignmentStore.addItem({
    resource_id: 5,
    task_id: 2,
    value: 4
});
assignmentStore.removeItem(assignment.id);
assignmentStore.updateItem(assignment.id);

// после обновления назначений в datastore вызовите `updateTaskAssignments` для синхронизации с объектом задачи:
gantt.updateTaskAssignments(taskId);
~~~


## Отображение ресурса задачи

Имена ресурсов могут отображаться как часть описания задачи или как подписи в ячейках грида. Поскольку Gantt не предоставляет встроенного метода для получения элемента из серверного списка по id, можно использовать простой вспомогательный метод:

~~~js
function byId(list, id) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].key == id)
            return list[i].label || "";
    }
    return "";
}
~~~

Данный помощник можно использовать в шаблонах для отображения имён ресурсов:

~~~js
gantt.config.columns = [
    {name: "owner", width: 80, align: "center", template: function (item) {
        return byId(gantt.serverList('people'), item.owner_id)}},
    {name: "text", label: "Task name", tree: true, width: '*'},
    {name: "add", width: 40}
];

gantt.templates.rightside_text = function(start, end, task){
    return byId(gantt.serverList('people'), task.owner_id);
};
~~~


[Assigning owners to tasks](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)


## Редактируемая диаграмма ресурсов

Чтобы разрешить редактирование назначений ресурсов непосредственно в диаграмме ресурсов, установите следующую конфигурацию:

~~~js
gantt.config.resources = {
    editable_resource_diagram: true
};
~~~


[Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)


С включённой опцией **editable_resource_diagram** Gantt автоматически назначает шаблоны [gantt.templates.resource_cell_value](api/template/resource_cell_value.md) и [gantt.templates.resource_cell_class](api/template/resource_cell_class.md) для поддержки редактирования назначений ресурсов.

Если вы предоставляете собственные функции для этих шаблонов, Gantt будет использовать их вместо стандартных.

Стандартные реализации доступны в **gantt.ext.resources**:

~~~js
gantt.templates.resource_cell_value = gantt.ext.resources.editableResourceCellTemplate;
gantt.templates.resource_cell_class = gantt.ext.resources.editableResourceCellClass;
~~~

Обычно ручное назначение этих шаблонов не требуется, так как Gantt делает это автоматически при включении редактируемой диаграммы.

Ниже приведён пример шаблона с редактируемыми ячейками, который можно настроить по необходимости:


**Related example:** [Customizable resource diagram template](https://snippet.dhtmlx.com/libwuna4?tag="gantt")


## Пользовательское оформление ресурсов

Для применения цветов обычно используются следующие шаблоны:

- [gantt.templates.grid_row_class](api/template/grid_row_class.md) - CSS-класс для строк в левом гриде
- [gantt.templates.task_row_class](api/template/task_row_class.md) - строка-фон на временной шкале (не используется при включённом smart rendering)
- [gantt.templates.task_class](api/template/task_class.md) - CSS-класс для элементов полос задач

В зависимости от сценария вы можете:

- использовать [предопределённые классы для каждого ресурса](guides/colouring-tasks.md#redefiningthetaskstemplate), или
- загружать информацию о стиле, такую как цвета фона и текста, вместе с ресурсами, что требует [динамической генерации CSS на странице](guides/colouring-tasks.md#loadingcolorswiththedata)


[Assigning owners to tasks](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)


## Календари ресурсов

Gantt поддерживает пользовательские календари рабочего времени, которые могут быть связаны с определёнными ресурсами.

![resource_calendars](/img/resource_calendars.png)

Эти календари сопоставляются с задачами через свойство в формате один к одному:

~~~js
// значение ресурса берётся из свойства `task.resource_id`
gantt.config.resource_property = "resource_id";

gantt.config.resource_calendars = {
    "resource1" : "calendarId1",
    "resource2" : "calendarId2",
    "resource3" : "calendarId3"
};
~~~

Для назначения календарей ресурсам может использоваться любое свойство. Если свойство ресурса изменяется динамически, Gantt автоматически пересчитает сроки задачи с учётом обновлённого календаря.


[Resource calendars](https://docs.dhtmlx.com/gantt/samples/11_resources/02_resource_calendars.html)


Когда к одной задаче назначено несколько ресурсов, Gantt может [автоматически сгенерировать объединённый календарь](api/config/dynamic_resource_calendars.md) для всех назначенных ресурсов.

Подробнее - в статье о [назначении календарей ресурсам](guides/working-time.md#assigningcalendartoresource).


## Балансировка загрузки ресурсов

[Группирующее расширение](guides/extensions-list.md#grouping) позволяет разбить весь проект по свойству **resource**.

![resource_break_down](/img/resource_break_down.png)

Это помогает сбалансировать загрузку ресурсов в календаре.


[Break down by resources](https://docs.dhtmlx.com/gantt/samples/11_resources/03_break_down_by_resource.html)


Дополнительную информацию о группировке задач можно найти в [соответствующей статье](guides/grouping.md). 

### Группировка задач по нескольким ресурсам 

Когда задаче назначено несколько ресурсов, она будет сгруппирована по этим ресурсам. Это значит, что задача не будет появляться несколько раз для каждого человека; вместо этого она будет показана один раз со списком всех назначенных сотрудников. Группированные задачи сортируются по дате начала.

![Group resources](/img/grouping_resources.png)


[Group by multiple resources](https://docs.dhtmlx.com/gantt/samples/11_resources/08_resource_usage_groups.html)


- Если в данных задачи имеют несколько назначенных ресурсов, Gantt автоматически создаст для них группы. 
- Задачи без назначенных ресурсов будут помещены в группу по умолчанию Not assigned. Если эта группа уже присутствует в данных, переданных методу **groupBy()**, она должна содержать конфигурацию *default:true*, чтобы избежать дублирования группы по умолчанию.

:::note
Обратите внимание: перетаскивание задач, сгруппированных по нескольким ресурсам, невозможно.
:::

