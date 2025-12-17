---
sidebar_label: parse
title: parse method
description: "загружает данные из клиентского ресурса"
---

# parse

### Description

@short: Загружает данные из клиентского ресурса

@signature: parse: (data: string | DataToLoad1 | DataToLoad2, type?: string) =\> void

### Parameters

- `data` - (required) *string* - | DataToLoad     строка или объект, представляющий [данные](https://docs.dhtmlx.com/gantt/desktop__loading.html#dataproperties)
- `type` - (optional) *string* - необязательный параметр, (<i>'json', 'xml'</i>) указывает тип данных. По умолчанию <i>'json'</i>

### Example

~~~jsx
gantt.parse({
    data:[
        {id:1, text:"Project #2", start_date:"01-04-2023", duration:18},
        {id:2, text:"Task #1",    start_date:"02-04-2023", duration:8,
            progress:0.6, parent:1},
        {id:3, text:"Task #2",    start_date:"11-04-2023", duration:8,
            progress:0.6, parent:1}
    ],
    links:[
        { id:1, source:1, target:2, type:1},
        { id:2, source:2, target:3, type:0}
    ]
});
~~~

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)

### Details

Gantt ожидает, что массив задач будет называться либо **data**, либо **tasks**, а массив связей - **links**.

Структура данных выглядит следующим образом:

- **data** - (*[] | NewTask[]*) - массив с данными задач
- **links?** - (*Link[]*) - массив с данными связей
- **resources?** - (*NewResourceItem[]*) - массив с данными ресурсов
- **assignments?** - (*NewAssignmentItem[]*) - массив с данными назначений
- **collections?** - (*Сollections*) - объект, содержащий массивы с пользовательскими данными

~~~js
gantt.parse({
    data: [
        { id: 1, start_date: "2025-09-23", duration: 42, 
            text: "House Construction" },
        { id: 2, start_date: "2025-12-02", duration: 60, 
            text: "House Construction" },
    ],
    "links": [
        { id: "1", source: "1", target: "2", type: "0" },
    ],
    "resources": [
        { id: 1, text: "Anna, Architect", unit: "hours/day", 
            default_value: 8, type: "work" },
    ],
    "assignments": [
      { task_id: "1", resource_id: "1", value: "8" },
      { task_id: "2", resource_id: "1", value: "8", 
            mode: "fixedDates", start_date: "2025-09-23", 
            end_date: "2025-09-25", duration: 4, delay: 2,  },
      { task_id: "2", resource_id: "1", value: "8", 
            start_date: new Date("2025-09-23 00:00:00"), 
            end_date: new Date("2025-09-26 00:00:00"), },
    ]
})
~~~

Массив **data** или **tasks** должен содержать объекты **NewTask**, которые отличаются от объектов **Task**. Они могут быть строками или пустыми объектами. Эти объекты могут иметь те же свойства, что и [объект **Task**](guides/task-properties.md), а также могут содержать пользовательские свойства. В отличие от объекта **Task**, свойства, начинающиеся с *$*, игнорируются, а даты могут быть строками.

Разбор свойств:

- **NewTask** - (*string | {} | object*) - объект задачи, добавляемый в Gantt. Возможные свойства:
    - **_id?_** - (*string | number*) - необязательный, ID задачи, генерируется автоматически при отсутствии.
    - **_start_date?_** - (*string | Date*) - необязательный, дата начала задачи.
    - **_duration?_** - (*number*) - необязательный, продолжительность задачи.
    - **_end_date?_** - (*string | Date*) - необязательный, дата окончания задачи.
    - **_text?_** - (*string*) - необязательный, название задачи.
    - **_open?_** - (*boolean*) - необязательный, раскрыта ли задача при загрузке.
    - **_parent?_** - (*string | number*) - необязательный, ID родительской задачи.
    - **_constraint_date?_** - (*string | Date*) - необязательный, дата ограничения.
    - **_[customProperty: string]_** - (*any*) - любые другие свойства, включая свойства из [объекта **Task**](guides/task-properties.md).

Это не полный список свойств задачи; подробнее см. [в этой статье](guides/task-properties.md).

~~~js
gantt.parse({
    data: [
        { id: 1, start_date: "2025-09-23", duration: 42, 
            text: "House Construction" },
    ]
})
~~~

---

Массив **links** должен содержать объекты [**Link**](guides/link-properties.md).

~~~js
gantt.parse({
    data: [],
    links: [
        { id: "1", source: "1", target: "2", type: "0" },
    ]
})
~~~

---

Массив **resources** ожидает объекты **NewResourceItem**, которые могут содержать:

- **NewResourceItem** - (*object*) - элемент ресурса, добавляемый в Gantt, с такими свойствами:
    - **_id?_** - (*string | number*) - необязательный, ID ресурса, генерируется автоматически при отсутствии.
    - **_parent?_** - (*string | number*) - необязательный, ID родительского ресурса.
    - **_text?_** - (*string*) - необязательный, название ресурса.
    - **_open?_** - (*boolean*) - необязательный, раскрыт ли ресурс при загрузке.
    - **_unit?_** - (*string | number*) - необязательный, единица измерения ресурса.
    - **_default_value?_** - (*string | number*) - необязательный, значение по умолчанию для назначения, отображаемое в lightbox.
    - **_[customProperty: string]_** - (*any*) - любые дополнительные свойства.

~~~js
gantt.parse({
    data: [],
    resources: [
        { id: 1, text: "Anna, Architect", unit: "hours/day", 
            default_value: 8, type: "work" },
    ]
})
~~~

---

Массив **assignments** ожидает объекты **NewAssignmentItem** со свойствами:

- **NewAssignmentItem** - (*object*) - элемент назначения, добавляемый в Gantt, который может включать:
    - **_id?_** - (*string | number*) - необязательный, ID назначения, генерируется автоматически при отсутствии.
    - **_task_id_** - (*string | number*) - ID задачи, к которой относится назначение.
    - **_resource_id_** - (*string | number*) - ID назначенного ресурса.
    - **_value_** - (*number | string*) - необязательный, значение назначения.
    - **_mode?_** - (*string*) - необязательный, режим расчёта: "default"|"fixedDates"|"fixedDuration".
    - **_delay?_** - (*number*) - необязательный, разница между началом назначения и началом задачи.
    - **_start_date?_** - (*string | Date*) - необязательный, дата начала назначения.
    - **_duration?_** - (*number*) - необязательный, продолжительность назначения.
    - **_end_date?_** - (*string | Date*) - необязательный, дата окончания назначения.
    - **_[customProperty: string]_** - (*any*) - любые другие пользовательские свойства.

~~~js
gantt.parse({
    data: [],
    assignments: [
      { task_id: "1", resource_id: "1", value: "8" },
    ]
})
~~~

---

Объект **collections** предназначен для загрузки пользовательских данных. Его свойства могут иметь любые имена, а значениями являются массивы с элементами коллекций:

- **[collectionName: string]** - (*[] | СollectionItem[]*) - массив элементов коллекции.

Каждый **СollectionItem** - объект с любыми свойствами:

- **[itemProperty: string]** - (*any*) - любое пользовательское свойство.

~~~js
gantt.parse({
    data: [
        { "id": "1", "text": "Task #1", "priority": 1, 
            "start_date": "02-04-2019", "duration": 1, },
        { "id": "2", "text": "Task #2", "priority": 2,  
            "start_date": "01-04-2019", "duration": 1, },
        { "id": "3", "text": "Task #3", "priority": 3,  
            "start_date": "02-04-2019", "duration": 1, },
        { "id": "4", "text": "Task #4", "priority": 1,  
            "start_date": "03-04-2019", "duration": 1, },
    ],
    links: [],
    collections: {
        task_priority: [
            { key: 1, label: "High" },
            { key: 2, label: "Normal" },
            { key: 3, label: "Low" }
        ]
    }
});
~~~

---

Если в данных отсутствуют задачи, всё равно нужно определить пустой массив задач:

~~~js
gantt.parse({
    tasks:[],
    links:[
        { id:1, source:1, target:2, type:1},
        { id:2, source:2, target:3, type:0}
    ]
});
~~~

<br>
Начиная с версии 8.0, вы также можете загружать ресурсы и назначения ресурсов вместе с задачами и связями с помощью метода **parse()**:

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

Больше деталей можно найти [здесь](guides/resource-management.md#loadingresourcesandresourceassignments).

### Related API
- [load](api/method/load.md)

### Related Guides
- [Загрузка данных](guides/loading.md)
- [Поддерживаемые форматы данных](guides/supported-data-formats.md)
- [Поддерживаемые форматы данных](guides/supported-data-formats.md#jsonwithcollections) (читайте, как загружать JSON с коллекциями)

