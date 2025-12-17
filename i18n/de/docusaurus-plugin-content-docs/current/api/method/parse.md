---
sidebar_label: parse
title: parse method
description: "lädt Daten aus einer clientseitigen Ressource"
---

# parse

### Description

@short: Lädt Daten aus einer clientseitigen Ressource

@signature: parse: (data: string | DataToLoad1 | DataToLoad2, type?: string) =\> void

### Parameters

- `data` - (required) *string | DataToLoad* -    ein String oder Objekt, das <a href="https://docs.dhtmlx.com/gantt/desktop__loading.html#dataproperties">Daten</a> repräsentiert
- `type` - (optional) *string* - ('json', 'xml') spezifiziert den Datentyp. Standard ist 'json'


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

Gantt erwartet, dass das Aufgaben-Array entweder **data** oder **tasks** heißt, während das Array mit Links **links** benannt sein sollte.

So sieht die Datenstruktur aus:

- **data** - (*[] | NewTask[]*) - das Array mit den Aufgabendaten
- **links?** - (*Link[]*) - das Array mit den Link-Daten
- **resources?** - (*NewResourceItem[]*) - das Array mit Ressourcendaten
- **assignments?** - (*NewAssignmentItem[]*) - das Array mit Zuweisungsdaten
- **collections?** - (*Сollections*) - ein Objekt, das Arrays mit benutzerdefinierten Daten enthält

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

Das **data**- oder **tasks**-Array sollte **NewTask**-Objekte enthalten, die sich von **Task**-Objekten unterscheiden. Sie können Strings oder leere Objekte sein. Diese Objekte können dieselben Eigenschaften wie das [**Task**-Objekt](guides/task-properties.md) besitzen, und es können auch benutzerdefinierte Eigenschaften hinzugefügt werden. Anders als beim **Task**-Objekt werden Eigenschaften, die mit *$* beginnen, ignoriert, und Datumsangaben können Strings sein.

Hier eine Übersicht:

- **NewTask** - (*string | {} | object*) - das Task-Objekt, das zu Gantt hinzugefügt wird. Mögliche Eigenschaften sind:
    - **_id?_** - (*string | number*) - optional, Task-ID, wird automatisch generiert, falls nicht vorhanden.
    - **_start_date?_** - (*string | Date*) - optional, Startdatum der Aufgabe.
    - **_duration?_** - (*number*) - optional, Dauer der Aufgabe.
    - **_end_date?_** - (*string | Date*) - optional, Enddatum der Aufgabe.
    - **_text?_** - (*string*) - optional, Aufgabenname.
    - **_open?_** - (*boolean*) - optional, ob die Aufgabe beim Laden aufgeklappt ist.
    - **_parent?_** - (*string | number*) - optional, ID der übergeordneten Aufgabe.
    - **_constraint_date?_** - (*string | Date*) - optional, Einschränkungsdatum.
    - **_[customProperty: string]_** - (*any*) - beliebige weitere Eigenschaften, auch solche aus dem [**Task**-Objekt](guides/task-properties.md).

Dies ist keine vollständige Liste der Task-Eigenschaften; weitere Informationen finden Sie in [diesem Artikel](guides/task-properties.md).

~~~js
gantt.parse({
    data: [
        { id: 1, start_date: "2025-09-23", duration: 42, 
            text: "House Construction" },
    ]
})
~~~

---

Das **links**-Array sollte [**Link**-Objekte](guides/link-properties.md) enthalten.

~~~js
gantt.parse({
    data: [],
    links: [
        { id: "1", source: "1", target: "2", type: "0" },
    ]
})
~~~

---

Das **resources**-Array erwartet **NewResourceItem**-Objekte, die enthalten können:

- **NewResourceItem** - (*object*) - Ressourceneintrag, der zu Gantt hinzugefügt wird, mit Eigenschaften wie:
    - **_id?_** - (*string | number*) - optional, Ressourcen-ID, wird automatisch generiert, falls nicht vorhanden.
    - **_parent?_** - (*string | number*) - optional, ID der übergeordneten Ressource.
    - **_text?_** - (*string*) - optional, Ressourcenname.
    - **_open?_** - (*boolean*) - optional, ob die Ressource beim Laden aufgeklappt ist.
    - **_unit?_** - (*string | number*) - optional, Einheit der Ressourcenzuweisung.
    - **_default_value?_** - (*string | number*) - optional, Standardwert der Zuweisung, der im Lightbox angezeigt wird.
    - **_[customProperty: string]_** - (*any*) - beliebige weitere Eigenschaften.

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

Das **assignments**-Array erwartet **NewAssignmentItem**-Objekte mit Eigenschaften wie:

- **NewAssignmentItem** - (*object*) - Zuweisungseintrag, der zu Gantt hinzugefügt wird, und folgende Eigenschaften enthalten kann:
    - **_id?_** - (*string | number*) - optional, Zuweisungs-ID, wird automatisch generiert, falls nicht vorhanden.
    - **_task_id_** - (*string | number*) - ID der zugewiesenen Aufgabe.
    - **_resource_id_** - (*string | number*) - ID der zugewiesenen Ressource.
    - **_value_** - (*number | string*) - optional, Wert der Zuweisung.
    - **_mode?_** - (*string*) - optional, Berechnungsmodus: "default"|"fixedDates"|"fixedDuration".
    - **_delay?_** - (*number*) - optional, Differenz zwischen Zuweisungsstart und Aufgabenstart.
    - **_start_date?_** - (*string | Date*) - optional, Startdatum der Zuweisung.
    - **_duration?_** - (*number*) - optional, Dauer der Zuweisung.
    - **_end_date?_** - (*string | Date*) - optional, Enddatum der Zuweisung.
    - **_[customProperty: string]_** - (*any*) - beliebige weitere benutzerdefinierte Eigenschaften.

~~~js
gantt.parse({
    data: [],
    assignments: [
      { task_id: "1", resource_id: "1", value: "8" },
    ]
})
~~~

---

Das **collections**-Objekt dient zum Laden benutzerdefinierter Daten. Seine Eigenschaften können beliebige Namen haben, die Werte sind Arrays mit Collection-Items:

- **[collectionName: string]** - (*[] | СollectionItem[]*) - Array von Collection-Items.

Jedes **СollectionItem** ist ein Objekt mit beliebigen Eigenschaften:

- **[itemProperty: string]** - (*any*) - beliebige benutzerdefinierte Eigenschaft.

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

Wenn die Daten keine Aufgaben enthalten, muss trotzdem ein leeres Aufgaben-Array definiert werden:

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
Ab Version 8.0 können Sie mit der Methode **parse()** auch Ressourcen und Ressourcenzuweisungen zusammen mit Aufgaben und Links laden:

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

Weitere Details finden Sie [hier](guides/resource-management.md#loadingresourcesandresourceassignments).

### Related API
- [load](api/method/load.md)

### Related Guides
- ["Datenladen"](guides/loading.md)
- ["Unterstützte Datenformate"](guides/supported-data-formats.md)
- ["Unterstützte Datenformate"](guides/supported-data-formats.md#jsonwithcollections) (siehe, wie JSON mit Collections geladen wird)

