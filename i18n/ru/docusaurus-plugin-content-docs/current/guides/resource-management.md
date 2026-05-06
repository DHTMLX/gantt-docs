---
title: "Управление ресурсами"
sidebar_label: "Управление ресурсами"
---

# Управление ресурсами

:::info
Эта функциональность доступна только в издании PRO.
:::

Gantt предоставляет предопределённые виды ресурсов для отображения загрузки ресурсов, методы разбиения проекта по ресурсу для балансировки нагрузки, 
рабочие календари задач и ресурсов.

![resource_panel](/img/resource_panel.png)

:::note
Хотя сам Gantt не рассчитывает загрузку ресурсов и не имеет готовых методов «из коробки», Gantt предоставляет вам публичный API для реализации любого пользовательского поведения.
:::

## Панель просмотра ресурсов {#resourceviewpanel}

dhtmlxGantt имеет два типа предопределённых макетов для отображения загрузки ресурсов в Gantt: диаграмму загрузки ресурсов и гистограмму ресурсов.

### Диаграмма загрузки ресурсов {#resourceloaddiagram}

Она включает соответствующие представления для грида и таймлайна: "resourceGrid" и "resourceTimeline".

![resource_panel](/img/resource_panel.png)

:::note
Вам нужно передать отдельную [конфигурацию](guides/layout-config.md#configs-and-templates-of-views) для представлений "resourceGrid" (для отображения столбцов ресурсов, а не задач) и "resourceTimeline", а также [шаблоны](guides/layout-config.md#configs-and-templates-of-views) для настройки отображения назначений ресурсов в панели.
:::

~~~js
gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            // layout for default Grid and Timeline
            cols: [
                { view: "grid", group: "grids", scrollY: "scrollVer" },
                { resizer: true, width: 1 },
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollVer", group: "vertical" }
            ],
            gravity: 2
        },
        { resizer: true, width: 1 },
        {
            // layout for Grid and Timeline of resource panel
            config: resourceConfig, // config for Grid and Timeline
            cols: [
                { view: "resourceGrid", group: "grids", width: 435,
                    scrollY: "resourceVScroll"
                },
                { resizer: true, width: 1 },
                { view: "resourceTimeline", scrollX: "scrollHor",
                    scrollY: "resourceVScroll"
                },
                { view: "scrollbar", id: "resourceVScroll", group: "vertical" }
            ],
            gravity: 1
        },
        { view: "scrollbar", id: "scrollHor" }
    ]
};
~~~


**Related sample**: [Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)

После инициализации *resourceGrid* будет работать так же, как и представление по умолчанию для грида, но только в режиме чтения. *resourceTimeline* будет унаследовать конфигурацию масштаба от дефолтного таймлайна и будет иметь два слоя:

- фоновые строки, которые наследуют [task_row_class](api/template/task_row_class.md) и [timeline_cell_class](api/template/timeline_cell_class.md). Шаблоны *resourceTimeline* могут быть переопределены на уровне макета.
- слой ресурсов - слой, специфичный для *resourceTimeline*. Он будет отображать блоки в ячейках, где ресурс имеет назначенные задачи. Стиль блока и содержимое можно шаблонизировать с использованием шаблонов
  [resource_cell_class](api/template/resource_cell_class.md) и [resource_cell_value](api/template/resource_cell_value.md):

~~~js
gantt.templates.resource_cell_value = (startDate, endDate, resource, tasks, assignments) => 
    `<div>${tasks.length * 8}h</div>`;
~~~


**Related sample**: [Templates of the Resource diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)


### Гистограмма ресурсов

Этот тип макета для отображения загрузки ресурсов Gantt включает представления "resourceGrid" и "resourceHistogram" для грида и таймлайна соответственно.

![Resource histogram](/img/resource_histogram.png)

:::note
Вам нужно передать отдельную [конфигурацию](guides/layout-config.md#configs-and-templates-of-views) для представлений "resourceGrid" (для отображения столбцов ресурсов, а не задач) и "resourceHistogram" и [шаблоны](guides/layout-config.md#configs-and-templates-of-views) для настройки отображения назначений ресурсов в панели.
:::


~~~js
gantt.config.layout = { 
    css: "gantt_container",
    rows: [
        {
            // layout for default Grid and Timeline
            gravity: 2,
            cols: [
                { view: "grid", group: "grids", scrollY: "scrollVer" },
                { resizer: true, width: 1 },
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollVer", group: "vertical" }
            ]
        },
        { resizer: true, width: 1, next: "resources" },
        {
            // layout for Grid and Timeline of resource panel
            gravity: 1,
            id: "resources",
            config: resourceConfig, // config for Grid and Timeline
            templates: resourceTemplates, // templates for Grid and Timeline
            cols: [
                { view: "resourceGrid", group: "grids", scrollY: "resourceVScroll" },
                { resizer: true, width: 1 },
                { 
                    view: "resourceHistogram", 
                    capacity: 24, 
                    scrollX: "scrollHor", 
                    scrollY: "resourceVScroll" 
                },
                { view: "scrollbar", id: "resourceVScroll", group: "vertical" }
            ]
        },
        { view: "scrollbar", id: "scrollHor" }
    ]
};
~~~


**Related sample**: [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)


То же самое, что и в диаграмме загрузки ресурсов, *resourceGrid* будет работать так же, как и стандартное представление грида, но в режиме чтения. *resourceHistogram* имеет следующие дополнительные шаблоны:

- *histogram_cell_class* - CSS-класс, применяемый к ячейке панели ресурсов

~~~js
gantt.templates.histogram_cell_class =
    (start_date, end_date, resource, tasks, assignments) => "";
~~~

- *histogram_cell_label* - метка внутри ячейки

~~~js
gantt.templates.histogram_cell_label =
    (start_date, end_date, resource, tasks, assignments) => tasks.length * 8;
~~~

- *histogram_cell_allocated* - высота заполненной области в гистограмме. Значение может быть от 0 до *maxCapacity* *.

~~~js
gantt.templates.histogram_cell_allocated =
    (start_date, end_date, resource, tasks, assignments) => tasks.length * 8;
~~~

- *histogram_cell_capacity* - высота линии, определяющей доступную мощность ресурса. Значение может быть от -1 до *maxCapacity* *. Значения меньше 0 не будут рисовать эту линию.

~~~js
gantt.templates.histogram_cell_capacity =
    (start_date, end_date, resource, tasks, assignments) => 24;
~~~

**Что такое maxCapacity**

Если рассматривать каждую строку гистограммы как часть диаграммы-баров, maxCapacity — высота шкалы Y этой диаграммы. На изображении ниже maxCapacity = 24:

![maxCapacity](/img/maxcapacity.png)

Таким образом, если шаблоны *histogram_cell_allocated* или *histogram_cell_capacity* устанавливаются в значение 24, это означает верхнюю точку строки.

По умолчанию, **maxCapacity** равен 24 для всех ресурсов. Это означает, что если вы вернёте значение больше 24 в шаблоне *histogram_cell_capacity*, числа будут рассчитаны корректно, но площадь ячеек панели ресурсов может заполниться не так, как вы ожидали.

![filled_capacity](/img/filled_capacity.png)

Но есть возможность задать **maxCapacity** сразу для всей гистограммы и отдельно для каждого ресурса. Пример ниже:

**Related sample**: [Configuring maxCapacity](https://snippet.dhtmlx.com/glnqcsgq)

**maxCapacity** можно определить либо на уровне гистограммы:

~~~js
{ view: "resourceHistogram", capacity: 24, scrollX: "scrollHor", scrollY: "resourceVScroll" }
~~~

или индивидуально для каждого ресурса:

~~~js
resourcesStore.parse([
    { id: 1, text: "John", capacity: 8 },
    { id: 2, text: "Mike", capacity: 4 },
    { id: 3, text: "Anna", capacity: 8 },
    { id: 4, text: "Bill", capacity: 8 },
    { id: 5, text: "Floe", capacity: 8 }
]);
~~~

:::note
 емкость, определяемая на уровне ресурса, перекрывает глобальную емкость гистограммы для данного ресурса.
:::

## Работа с панелью просмотра ресурсов

По умолчанию обе панели (или "resourceGrid" и "resourceTimeline" или "resourceGrid" и "resourceHistogram") будут привязаны к хранилищу данных, указанному в конфигурации [gantt.config.resource_store].

### Автогенерация хранилища данных

С версии v8.0 хранилище данных ресурсов будет создаваться автоматически во время инициализации Gantt и будет доступно к моменту вызова "onGanttReady". Чтобы использовать созданное Gantt-хранилище данных, применяйте метод [gantt.getDatastore](api/method/getdatastore.md).

Если вам нужно предоставить дополнительную конфигурацию для хранилища ресурсов, вы можете использовать новую опцию [gantt.config.resources](api/config/resources.md):

~~~js
gantt.config.resources = {
    resource_store: {
        type: "treeDataStore",
        fetchTasks: true,
        initItem: item => {
            item.parent = item.parent || gantt.config.root_id;
            item[gantt.config.resource_property] = item.parent;
            item.open = true;
            return item;
        }
    }
};
~~~

Настройки, переданные в **resource_store**, будут использоваться Gantt для создания хранилища ресурсов по умолчанию. Если вы уже создали хранилище ресурсов в вашем коде, Gantt будет использовать ваше хранилище.

Чтобы загрузить ресурсы, можно либо передать ресурсы в методы **gantt.parse()**/**gantt.load()**, как описано [здесь](guides/resource-management.md#loading-resources-and-resource-assignments), либо можно получить доступ к хранилищу данных и заполнить его с помощью метода **datastore.parse()**:

~~~js
gantt.attachEvent("onGanttReady", () => {
    const store = gantt.getDatastore(gantt.config.resource_store);
    store.parse([
        { id: 6, text: "John" },
        { id: 7, text: "Mike" },
        { id: 8, text: "Anna" },
        { id: 9, text: "Bill" }
    ]);
});
~~~

Контроль ресурсов в lightbox будет автоматически связан с списком ресурсов:

~~~js
gantt.config.lightbox = {
    sections: [
        ...,
        { name: "resource_selector", label: "Resources", type: "resource_selector", map_to: "auto" } 
    ]
};
~~~


### Ручная инициализация хранилища данных

Также возможно вручную инициализировать хранилище данных с помощью метода [createDatastore](api/method/createdatastore.md):

~~~js
const resourcesStore = gantt.createDatastore({
    name: gantt.config.resource_store,
    // Используйте treeDatastore, если ресурсы иерархические (например, работники/отделы),
    // пропустите поле "type", если структура является плоской
    type: "treeDatastore",
    initItem: item => {
        item.parent = item.parent || gantt.config.root_id;
        item[gantt.config.resource_property] = item.parent;
        item.open = true;
        return item;
    }
});
~~~

Чтобы заполнить хранилище данных, используйте метод **datastore.parse**:

~~~js
resourcesStore.parse([
    { id: 1, text: "QA", parent: null },
    { id: 2, text: "Development", parent: null },
    { id: 3, text: "Sales", parent: null },
    { id: 4, text: "Other", parent: null },
    { id: 5, text: "Unassigned", parent: 4 },
    { id: 6, text: "John", parent: 1 },
    { id: 7, text: "Mike", parent: 2 },
    { id: 8, text: "Anna", parent: 2 },
    { id: 9, text: "Bill", parent: 3 },
    { id: 10, text: "Floe", parent: 3 }
]);
~~~

Если вы хотите использовать ресурсы в lightbox, может быть полезно сделать это через метод [serverList](api/method/serverlist.md) из события onParse хранилища данных:

~~~js
resourcesStore.attachEvent("onParse", () => {
    const people = [];
    resourcesStore.eachItem(res => {
        if (!resourcesStore.hasChild(res.id)) {
            const copy = gantt.copy(res);
            copy.key = res.id;
            copy.label = res.text;
            people.push(copy);
        }
    });
    gantt.updateCollection("resourceOptions", people);
});
~~~

### Расширение панели ресурсов

Можно расширить панель ресурсов, чтобы отображать все задачи, назначенные конкретному ресурсу, включив свойство **fetchTasks** во время инициализации хранилища данных:

![Expanded resource panel](/img/expanded_resource_panel.png)

~~~js
gantt.config.resources = {
    resource_store: {
        type: "treeDataStore",
        fetchTasks: true, /*!*/
        initItem: item => {
            item.parent = item.parent || gantt.config.root_id;
            item[gantt.config.resource_property] = item.parent;
            item.open = !item.parent;
            return item;
        }
    }
};
~~~

или

~~~js
gantt.$resourcesStore = gantt.createDatastore({
    name: gantt.config.resource_store,
    type: "treeDatastore",
    fetchTasks: true, /*!*/
    initItem: item => {
        item.parent = item.parent || gantt.config.root_id;
        item[gantt.config.resource_property] = item.parent;
        item.open = !item.parent;
        return item;
    }
});
~~~


**Related sample**: [Show all assigned tasks in the resource panel](https://docs.dhtmlx.com/gantt/samples/11_resources/11_resource_histogram_display_tasks.html)


С включённым свойством **fetchTasks** в значение *true*, Gantt отрисует все задачи, назначенные определённому ресурсу, в панели просмотра ресурса. Эта функциональность работает как для диаграммы ресурсов, так и для типa макета гистограммы.

Существует сокращённый способ получить все задачи, назначенные ресурсу — [getResourceAssignments](api/method/getresourceassignments.md).

~~~js
gantt.getResourceAssignments("6"); 
~~~

Метод принимает в качестве параметра id ресурса и возвращает массив объектов с задачами, назначенными этому ресурсу:

~~~js
[ 
    { task_id: 5, resource_id: "6", value: 5, delay: 0, duration: 7, 
        start_date: "03-04-2025 00:00", end_date: "12-04-2025 00:00", 
        id: 1617258553240, mode: "default" },
    { task_id: 18, resource_id: "6", value: 2, delay: 0, duration: 2, 
        start_date: "05-04-2025 00:00", end_date: "09-04-2025 00:00", 
        id: 1617258553250, mode: "default" },
    { task_id: 19, resource_id: "6", value: 3, delay: 0, duration: 4, 
        start_date: "09-04-2025 00:00", end_date: "13-04-2025 00:00", 
        id: 1617258553251, mode: "default" },
    { task_id: 21, resource_id: "6", value: 5, delay: 0, duration: 4, 
        start_date: "03-04-2025 00:00", end_date: "09-04-2025 00:00", 
        id: 1617258553254, mode: "default" }
]
~~~

Каждый объект содержит следующие свойства:

- *task_id* - id задачи
- *resource_id* - id ресурса
- *value* - количество ресурса, назначенное задаче
- *delay* - разница между датой начала назначения и датой начала задачи
- *duration* - продолжительность назначения
- *start_date* - дата начала назначения
- *end_date* - дата окончания назначения
- *id* - id назначения
- *mode* - режим расчета времени назначения ресурса: "default"|"fixedDates"|"fixedDuration"


### Получение назначений ресурса задачи 

Метод [getTaskAssignments](api/method/gettaskassignments.md) позволяет получить разобранные назначения ресурсов конкретной задачи из хранилища:

~~~js
gantt.getTaskAssignments(5);
~~~

Метод принимает в качестве параметра id задачи и возвращает массив объектов с назначениями ресурсов задачи:

~~~js
[
    { task_id: 5, id: 1617254693938, delay: 0, duration: 2, 
        start_date: "03-04-2025 00:00", end_date: "05-04-2025 00:00", 
        mode: "fixedDuration", resource_id: 6, value: 3 },
    { task_id: 5, id: 1617254693946, delay: 3, duration: 1, 
        start_date: "06-04-2025 00:00", end_date: "07-04-2025 00:00", 
        mode: "fixedDuration", resource_id: 6, value: 6 }
]
~~~

Возвращаемый объект содержит тот же набор свойств, что и возвращаемые объекты метода [getResourceAssignments](api/method/getresourceassignments.md).


### Настройка связи через lightbox

Ресурсы можно назначать на любое свойство объекта задачи с использованием встроенного lightbox.

~~~js
gantt.serverList("people", [
    { key: 1, label: "John" },
    { key: 2, label: "Mike" },
    { key: 3, label: "Anna" },
    { key: 4, label: "Bill" },
    { key: 7, label: "Floe" }
]);

gantt.locale.labels.section_owner = "Owner";

gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "owner", map_to: "owner_id", type: "select",
        options: gantt.serverList("people") },
    { name: "time", type: "duration", map_to: "auto" }
];
~~~

Читайте о том, как настроить управление ресурсами lightbox в статьях [Resources Control](guides/resources.md) и [Resource Assignments control](guides/resource-assignments.md).


### Загрузка коллекций

Коллекции, указанные как серверные списки, можно загружать и обновлять динамически после инициализации Gantt:

~~~js
// инициализация lightbox с пустой коллекцией
gantt.locale.labels.section_owner = "Owner";

gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "owner", map_to: "owner_id", type: "select",
        options: gantt.serverList("people") },
    { name: "time", type: "duration", map_to: "auto" }
];

// после загрузки опций
gantt.updateCollection("people", [
    { key: 1, label: "John" },
    { key: 2, label: "Mike" },
    { key: 3, label: "Anna" },
    { key: 4, label: "Bill" },
    { key: 7, label: "Floe" }
]);
~~~

![resource_management](/img/resource_management.png)


**Related sample**: [Assigning owners to tasks](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)


Если вы определяете ресурсы через коллекцию *serverList*, их можно [загрузить вместе с остальными данными](guides/supported-data-formats.md#jsonwithcollections), в противном случае их придётся загружать вручную.

Читайте о том, как настроить управление ресурсами lightbox в статьях [Resources control](guides/resources.md) и [Resource Assignments control](guides/resource-assignments.md).


## Загрузка ресурсов и назначений ресурсов

С версии v8.0 ресурсы и назначения ресурсов можно загружать в Gantt с помощью методов [gantt.parse()](api/method/parse.md) или [gantt.load()](api/method/load.md):

~~~js
gantt.parse({
    tasks: [
        ...,
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2025 00:00",
            duration: 7,
            parent: "2",
            owner: [
                {
                    resource_id: "6",
                    value: 3,
                    start_date: "03-04-2025 00:00",
                    end_date: "05-04-2025 00:00",
                }
            ]
        },
        ...
    ],
    links: [],
    resources: [
        { id: 6, text: "John", unit: "hours/day" },
        { id: 7, text: "Mike", unit: "hours/day" },
        { id: 8, text: "Anna", unit: "hours/day" },
        { id: 9, text: "Bill", unit: "hours/day" },
        { id: 10, text: "Floe", unit: "hours/day" }
    ]
});
~~~

Назначения ресурсов можно передавать в метод отдельно от задач:

~~~js
gantt.parse({
    tasks: [
        ...,
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2025 00:00",
            duration: 7,
            parent: "2",
            priority: 1
        },
        ...
    ],
    links: [],
    assignments: [
        {
            id: 1,
            task_id: 5,
            resource_id: 6,
            value: 3,
            start_date: "03-04-2025 00:00",
            end_date: "05-04-2025 00:00"
        }
    ],
    resources: [
        { id: 6, text: "John", unit: "hours/day" },
        { id: 7, text: "Mike", unit: "hours/day" },
        { id: 8, text: "Anna", unit: "hours/day" },
        { id: 9, text: "Bill", unit: "hours/day" },
        { id: 10, text: "Floe", unit: "hours/day" }
    ]
});
~~~

## Управление назначениями ресурсов {#managingresourceassignments}

### Разбор назначений ресурсов

Начиная с версии v7.1, вы можете работать с [назначениями ресурсов](guides/resource-management.md#resourceassignmenttime) как с объектами хранилища данных.

Новое свойство [process_resource_assignments](api/config/process_resource_assignments.md) позволяет разбор значений из [gantt.config.resource_property](api/config/resource_property.md) задач во внутренние объекты назначений ресурсов.
В результате вы сможете управлять назначениями через объект DataStore. Например, можно получить необходимый объект назначения или обновить его.

**Примечание**, что эта функциональность необходима, если вы хотите задать желаемую продолжительность и время для ресурсов при построении диаграммы и гистограммы ресурсов.

Процесс может вносить заметные задержки в производительность, и у больших проектов он может работать медленнее.
Поэтому, если вам не нужно задавать время или продолжительность назначения, можно отключить разбор назначений ресурсов с помощью конфигурации:

~~~js
gantt.config.process_resource_assignments = false;
~~~

Когда конфигурация отключена, хранилище данных `gantt.getDatastore("resourceAssignments")` будет недоступно, а объекты назначений не будут иметь каких-либо динамических свойств. Диаграмма и гистограмма ресурсов будут считать, что ресурсы назначены на всю продолжительность задачи.

### Обновление назначений ресурсов

Назначения ресурсов хранятся в [хранилище данных](api/config/resource_assignment_store.md), которое создаётся автоматически.

По умолчанию хранилище назначений заполняется данными задач. Это значит, что если вы изменяете свойство ресурсов задачи (например, task.users), изменения автоматически отражаются в хранилище.

~~~js
task[gantt.config.resource_property] = [
    {
        resource_id: "6",
        value: 3,
        start_date: "03-04-2025 00:00",
        end_date: "05-04-2025 00:00",
    }
];

gantt.updateTask(taskId);
~~~

Но может понадобиться обновлять данные назначений в обратном направлении. А именно — применить изменения к объекту задачи после того, как назначения ресурсов были изменены через API хранилища. В таком случае нужно обновить свойство ресурса задачи значениями из хранилища, вызвав метод [gantt.updateTaskAssignments()](api/method/updatetaskassignments.md):

~~~js
const assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);

assignmentStore.addItem({
    resource_id: 5,
    task_id: 2,
    value: 4
});

assignmentStore.removeItem(assignment.id);
assignmentStore.updateItem(assignment.id);

// после обновления назначений в хранилище,
 // нужно вызвать `updateTaskAssignments`, чтобы записать изменения в объект задачи:
gantt.updateTaskAssignments(taskId);
~~~

### Повторная отрисовка назначений во время перетаскивания задачи

Когда задача перетаскивается, панель ресурсов перерисовывается, но назначения ресурсов не изменяются. Перерисовываются только те ячейки панели ресурсов, которые затрагиваются перемещением задачи (по умолчанию — только внутри дат задачи).

Чтобы обновлять назначения во всех ячейках, необходимо либо отключить опцию [process_resource_assignments](api/config/process_resource_assignments.md), либо вручную обновить все назначения задачи, как показано в примере ниже:

~~~js
gantt.attachEvent("onTaskDrag", (id, mode, task, original) => {
    const assignments = gantt.getTaskAssignments(id);
    assignments.forEach(assignment => {
        if (assignment.mode === "default") {
            assignment.start_date = task.start_date;
            assignment.end_date = task.end_date;
        }
    });
});
~~~

## Отображение ресурса задачи

Имя ресурса можно выводить как часть описания задачи или как метку одной из ячеек грида.
Gantt не предоставляет готовый метод получения элемента, указанного в серверном списке по его id, поэтому нужно реализовать небольшого помощника:

~~~js
const byId = (list, id) => {
    const item = list.find(item => item.key === id);
    return item ? item.label || "" : "";
};
~~~

После этого вы можете использовать имя ресурса в шаблонах:

~~~js
gantt.config.columns = [
    { name: "owner", width: 80, align: "center",
        template: (item) => byId(gantt.serverList('people'), item.owner_id) },
    { name: "text", label: "Task name", tree: true, width: '*' },
    { name: "add", width: 40 }
];

gantt.templates.rightside_text =
    (start, end, task) => byId(gantt.serverList('people'), task.owner_id);
~~~


**Related sample**: [Assigning owners to tasks](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)


## Редактируемая диаграмма ресурсов

Чтобы сделать назначения ресурсов редактируемыми на диаграмме ресурсов, можно использовать следующую конфигурацию:

~~~js
gantt.config.resources = {
    editable_resource_diagram: true
};
~~~


**Related sample**: [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)


Когда свойство **editable_resource_diagram** включено, Gantt автоматически назначит шаблоны [gantt.templates.resource_cell_value](api/template/resource_cell_value.md) и [gantt.templates.resource_cell_class](api/template/resource_cell_class.md), чтобы обеспечить возможность редактирования назначений ресурсов в gantt.

Если вы назначите собственные функции этим шаблонам, Gantt будет использовать именно ваши шаблоны.

Стандартная реализация шаблонов доступна в объекте **gantt.ext.resources**.

~~~js
gantt.templates.resource_cell_value = gantt.ext.resources.editableResourceCellTemplate;
gantt.templates.resource_cell_class = gantt.ext.resources.editableResourceCellClass;
~~~

Обычно не нужно вручную присваивать эти шаблоны для редактируемой диаграммы — это должно обрабатываться Gantt.

В примере ниже приведён шаблон с редактируемыми ячейками. При необходимости его можно доработать:

**Related sample**: [Customizable resource diagram template](https://snippet.dhtmlx.com/libwuna4?tag="gantt")


## Пользовательское оформление ресурсов

Для окраски обычно понадобятся следующие шаблоны:

- [gantt.templates.grid_row_class](api/template/grid_row_class.md) - CSS-стиль строки левого грида
- [gantt.templates.task_row_class](api/template/task_row_class.md) - фоновая строка на таймлайне (не вызывается, если включён smart_rendering)
- [gantt.templates.task_class](api/template/task_class.md) - CSS-класс элемента полосы задачи


В зависимости от контекста вы можете 

- либо использовать предопределённые классы для каждого ресурса (guides/colouring-tasks.md#redefiningthetaskstemplate)
- либо загружать стили, например, настройки фона и цвета текста вместе с ресурсами. В таком случае вам потребуется динамически сгенерировать CSS на странице (guides/colouring-tasks.md#loadingcolorswithdata)


**Related sample**: [Assigning owners to tasks](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)


## Календари ресурсов

Gantt поддерживает возможность использования пользовательских рабочих календарей. Рабочие календари могут быть привязаны к конкретным ресурсам.

![resource_calendars](/img/resource_calendars.png)

Они отображаются к задачам через свойство значения в отношении «один к одному»:

~~~js
// значение ресурса будет взято из свойства `task.resource_id`
gantt.config.resource_property = "resource_id";

gantt.config.resource_calendars = {
    "resource1" : "calendarId1",
    "resource2" : "calendarId2",
    "resource3" : "calendarId3"
};
~~~

Вы можете использовать любое свойство для назначения календарей ресурсам. Если свойство ресурса меняется динамически, Gantt автоматически пересчитает время задач с использованием нового календаря.

**Related sample**: [Resource calendars](https://docs.dhtmlx.com/gantt/samples/11_resources/02_resource_calendars.html)


Если несколько ресурсов могут быть назначены одной задаче, Gantt может автоматически сгенерировать общий календарь для всех назначенных ресурсов.

Вы можете получить больше информации в соответствующей статье (guides/working-time.md#assigningcalendartoresource).


## Балансировка загрузки ресурсов {#balancingresourceload}

Вы можете использовать расширение [grouping](guides/extensions-list.md#grouping), чтобы разбить весь проект по свойству **resource**. 

![resource_break_down](/img/resource_break_down.png)

Эта функция может использоваться для балансировки загрузки ресурсов в календаре.


**Related sample**: [Break down by resources](https://docs.dhtmlx.com/gantt/samples/11_resources/03_break_down_by_resource.html)


Подробнее о группировке задач читайте в соответствующей статье (guides/grouping.md). 

### Группировка задач по нескольким ресурсам 

Если вы назначаете на задачу несколько ресурсов, задачи будут сгруппированы по назначенным ресурсам. Это означает, что задача, назначенная двум людям, не будет продублирована для каждого из них. Вместо этого она будет отрисована один раз с обоими лицами, назначенными на неё. Обратите внимание, что сгруппированные задачи будут отсортированы по дате начала.

![Group resources](/img/grouping_resources.png)


**Related sample**: [Group by multiple resources](https://docs.dhtmlx.com/gantt/samples/11_resources/08_resource_usage_groups.html)


- Если в загруженном наборе данных задача имеет несколько ресурсов, Gantt автоматически создаст для них группы. 
- Для задач без назначенных ресурсов Gantt создаст группу по умолчанию Not assigned. В случае, если в наборе данных есть такая группа, передаваемая в метод groupBy(), она должна иметь конфигурацию *default:true*, чтобы предотвратить автоматическое создание такой группы.

:::note
Пожалуйста, учтите, что перемещение задач, сгруппированных по нескольким ресурсам, невозможно.