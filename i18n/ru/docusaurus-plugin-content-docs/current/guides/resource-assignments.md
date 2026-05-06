---
title: "Resource Assignments Control"
sidebar_label: "Resource Assignments Control"
---

# Контроль назначений ресурсов

:::info
Эта функциональность доступна только в версии Gantt PRO.
:::

Расширенный элемент управления, предназначенный для назначения нескольким ресурсам и их количества к задаче (ссылка: [guides/resource-management.md#assigningresources]).

Ниже приведён пример Контрола назначений ресурсов с конфигурацией по умолчанию: 

![Контроль назначений ресурсов](/img/resource_assignments_control.png)

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "resource_selector", label: "Resources", type: "resource_selector", map_to: "auto" }, 
    { name: "time", type: "duration", map_to: "auto" }
];
~~~

[Контроль назначений ресурсов](https://docs.dhtmlx.com/gantt/samples/11_resources/07_assign_multiple_resources.html)

Вы можете [настроить столбцы грида ресурсов контрола](#configuring-resource-grid-columns-in-the-lightbox) и задать необходимые опции ресурсов:

![Опции контроля назначений ресурсов](/img/resource_assignments_control_options.png)

~~~js
// resource options
const usageMap = [
    { key: 1, label: "wood", text: "wood", unit: "box" },
    { key: 2, label: "water", text: "water", unit: "liter" },
    { key: 3, label: "grain", text: "grain", unit: "lbs" }
];

// helper editors
const selectResEditor = { type: "select", map_to: "resource_id", options: usageMap };
const numberEditor = { type: "number", map_to: "value", min: 0, max: 100 };

// resource grid columns config
const resourceLightboxConfig = {
    columns: [
        {
               name: "resource", 
            label: "Resource", 
            editor: selectResEditor
            // more column's options
        },
        {
            name: "units", 
            label: "Units", 
            editor: numberEditor,
            // more column's options
        },
        {
            name: "delete", 
            label: "Delete", 
            // more column's options
        }
    ]
};

gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "time", type: "duration", map_to: "auto" },
    { name: "resource_selector", type: "resource_selector", map_to: "auto", /*!*/
        config: resourceLightboxConfig } /*!*/
];

gantt.locale.labels.section_resource_selector = "Resources";
~~~
[Контроль назначений ресурсов](https://snippet.dhtmlx.com/id54i1b3)

:::note
 Вы также можете создать [пользовательский контрол для назначения нескольким ресурсам к задаче](guides/custom-editor.md#customthirdpartyeditor).
:::

## Инициализация

Чтобы добавить контрол **resource_selector** в lightbox, выполните нижеуказанные шаги:

1\. Добавьте секцию в конфигурацию lightbox:

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "resource_selector", type: "resource_selector", map_to: "auto" },
    { name: "time", type: "duration", map_to: "auto" }
];
~~~

:::note
По умолчанию управление ресурсами сопоставлено со свойством, указанным в конфигурации [](api/config/resource_property.md), поэтому опцию **map_to** можно опустить.
:::

2\. Задайте подпись для секции:

~~~js
gantt.locale.labels.section_resource_selector = "Resources";
~~~

## Свойства

Следующие свойства наиболее важны и обычно задаются для контролa **resource_selector**:

- **name** - (*string*) имя секции
- **map_to** - (*string*) имя свойства данных, которое будет сопоставлено секции
- **type** - (*string*) тип [контрола секции](guides/default-edit-form.md#lightboxcontrols)
- **label** - (*string*) подпись секции
- **config** - (*object*) конфигурация грида ресурсов в lightbox для отображения нужных столбцов
- **templates** - (*object*) шаблоны для грида ресурсов в lightbox
    
:::note
Начальные свойства *start_date*, *end_date* и *duration* могут иметь значение `null`. В таком случае они будут инициализированы значениями, соответствующими объекту задачи.
:::

## Конфигурация столбцов грида ресурсов во lightbox

По умолчанию конфигурация столбцов таблицы ресурсов во lightbox приведена ниже:

~~~js
// helper editors
const selectResEditor = { 
  type: "select", map_to: "resource_id", options: gantt.serverList("resourceOptions")
};
const numberEditor = { type: "number", map_to: "value", min: 0, max: 100 };

const dateToStr = gantt.date.date_to_str("%d-%m-%Y");
const resourceStore = gantt.getDatastore(gantt.config.resource_store);
// default columns definition
const defaultResourceLightboxConfig = {
    scale_height: 35, // height of the grid scale
    row_height: 35, // height of assignment rows
    // configures the columns of the grid
    columns: [
        {
            name: "resource", label: "Resource", align: "center", width: 80, 
            editor: selectResEditor, template: function (assignment) {
            let defaultValue = "Unassigned";
            const resource = resourceStore .getItem(assignment.resource_id);
            return resource ? resource.text : defaultValue;
            }
        },
        {
            name: "hours/Day", label: "Hours/Day", align: "center", width: 70,
            editor: numberEditor, template: function (assignment) {
            return assignment.value ? +assignment.value : ``;
            }
        },
        {
            name: "start", label: "Start", align: "center", width: 100, 
            template: function (assignment) { 
            return assignment.start_date ? dateToStr(assignment.start_date) : ``;
            }
        },
        { 
            name: "end", label: "End", align: "center", width: 100, 
            template: function (assignment) {
            return assignment.end_date ? dateToStr(assignment.end_date) : ``;
            }
        },
        { 
            name: "duration", label: "Duration", align: "center", width: 80, 
            template: function (assignment) {
            if (assignment.duration) {
                return `${assignment.duration} day${assignment.duration == 1 ? '' : 's'}`;
            } else {
                return ``;
            }
            }
        },
        {
            name: "delete", label: "Delete", align: "center", width: 80, 
            template: function (assignment) {
                return `<div
                    data-assignment-id='${assignment.id}'
                    data-assignment-delete='${assignment.id}'
                    class='dhx_gantt_icon dhx_gantt_icon_delete'
                    >
                    </div>`;
            }
        }
    ],
    //Configures the default adding assignment(assignment that will be added by "Add Assignment button")
    resource_default_assignment: {
        duration: null,
        value: 8,
        start_date: null,
        end_date: null,
        mode: "default"
    }
};
~~~

### Подробности

Каждый объект в массиве **columns** задаёт один столбец. Объект может принимать следующие атрибуты:

- **name?** - (*string | number*) - определяет идентификатор столбца;
- **align?** - (*string*) - устанавливает горизонтальное выравнивание заголовка. Возможные значения: *'left'*, *'center'*, или *'right'*;
- **hide?** - (*boolean*) - скрывает/показывает столбец (PRO);
- **label?** - (*string | number | any*) - задаёт заголовок столбца;
- **max_width?** - (*number*) - устанавливает максимальную ширину столбца;
- **min_width?** - (*number*) - устанавливает минимальную ширину столбца;
- **width?** - (*number | string*) - определяет ширину столбца;
- **template? (assignment): any** - устанавливает шаблон данных.
    - **assignment** - (*Assignment*) - объект Assignment;
- **onrender? (assignment, node): any** - необязательно, колбек для рендеринга ячейки в DOM. 
Функция принимает объект assignment и HTML-элемент ячейки грида в качестве параметров и может вернуть компонент фреймворка. Подробности [здесь](guides/specifying-columns.md#modifyingcellsafterrendering);
    - **assignment** - (*Assignment*) - объект Assignment;
    - **_node_** - (*HTMLElement*) - HTML-элемент ячейки грида;
- **editor?** - (*object*) - подключённый [inline editor](guides/inline-editing.md);
    - **_type_** - (*string*) тип встроенного редактора;
    - **_map_to_** - (*string*) указывает, какое свойство назначения обновлять встроенным редактором;
    - **_min?_** - (*Date | number*) минимальное значение для типов даты и продолжительности;
    - **_max?_** - (*Date | number*) максимальное значение для типов даты и продолжительности;
    - **_options?_** - (*Array &lt;any&gt;*) массив опций для типов select;
    - **_formatter?_** - (*DurationFormatter | LinkFormatter*) форматтер для типов даты и предшественников.

Вы можете изменить значение по умолчанию добавляемого назначения, указав следующее свойство в конфигурации lightbox для ресурса:

- **resource_default_assignment** - (*object*) конфигурационный объект для назначения по умолчанию (которое будет добавлено кнопкой "Add Assignment")
    - **start_date** - (*Date | string | null*) дата начала назначения
    - **end_date** - (*Date | string | null*) дата завершения назначения
    - **value** - (*number | string*) количество ресурсов, назначаемых на задачу
    - **duration** - (*number | null*) продолжительность назначения
    - **mode** - (*string*) режим расчёта времени назначения ресурса: "default" | "fixedDates" | "fixedDuration"
<br>

:::note
Атрибут **template** — это функция, которая принимает объект элемента данных в качестве параметра и возвращает итоговый шаблон данных. Определение функции позволяет отображать почти любой контент.
:::


## Заполнение управления данными

Если вы используете стандартное ресурcное Datastore, созданное Gantt, контроль **resource_selector** будет подключён к коллекции **gantt.serverList("resourceOptions")**. Эта коллекция будет заполнена ресурсами из хранилища ресурсов. Вы можете получить доступ к опциям с помощью следующей строки кода:

~~~js
const options = gantt.serverList("resourceOptions");
~~~

Обратите внимание, что массив опций будет пуст до загрузки ресурсов в хранилище.

Вы также можете обновлять эту коллекцию, используя произвольный список опций, следующим образом:

~~~js
gantt.updateCollection("resourceOptions", [...]);
~~~

Учитывайте, что если вы загрузите ресурсы в Gantt после этого, Gantt обновит эту коллекцию и перезапишет ваши изменения.

## Заполнение управления данными с сервера

Чтобы заполнить управление данными с сервера, используйте метод [serverList()](api/method/serverlist.md) в опциях редактора ресурса:

~~~js
const resourceEditor = { 
    type: "select", map_to: "resource_id", options: gantt.serverList("resourceOptions")
};

const defaultResourceLightboxConfig = {
    // other settings
    ...
    // an array with the columns configs
    columns:[
        {
              name: "resource", 
            label: "Resource", 
            align: "center",  
            editor: resourceEditor
        },
        // more columns configs
    ]
}
~~~

Содержимое `gantt.serverList("resourceOptions")` может быть определено, когда опции становятся доступными, с использованием метода [updateCollection()](api/method/updatecollection.md):

~~~js
gantt.updateCollection("resourceOptions", [
    // resource objects
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