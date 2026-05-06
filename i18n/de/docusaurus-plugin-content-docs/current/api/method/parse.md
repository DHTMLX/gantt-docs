---
sidebar_label: parse
title: Parse-Methode
description: "Lädt Daten aus einer clientseitigen Ressource"
---

# parse

### Description

@short: Lädt Daten aus einer clientseitigen Ressource

@signature: parse: (data: string | DataToLoad1 | DataToLoad2, type?: string) =\> void

### Parameters

- `data` - (required) *string | DataToLoad* -    eine Zeichenkette oder ein Objekt, das [Daten](guides/loading.md#dataproperties) darstellt
- `type`	-	(optional) *string*	 	-	 optional, (<i>'json', 'xml'</i>) der Datentyp. Der Standardwert - <i>'json'</i>

### Example

~~~jsx
gantt.parse({
    data:[
        {id:1, text:"Projekt #2", start_date:"01-04-2023", duration:18},
        {id:2, text:"Aufgabe #1",    start_date:"02-04-2023", duration:8,
            progress:0.6, parent:1},
        {id:3, text:"Aufgabe #2",    start_date:"11-04-2023", duration:8,
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

Gantt erwartet, dass *ein Array mit Tasks* entweder **data** oder **tasks** genannt wird, während *ein Array mit Links* **links** genannt wird.

Dies ist die Liste der erwarteten Eigenschaften:

- **data** - (*[] | NewTask[]*) - das Array mit den Taskdaten
- **links?** - (*Link[]*) - das Array mit den Linkdaten
- **resources?** - (*NewResourceItem[]*) - das Array mit den Ressourcendaten
- **assignments?** - (*NewAssignmentItem[]*) - das Array mit den Zuweisungsdaten
- **collections?** - (*Сollections*) - das Objekt, das die Arrays mit benutzerdefinierten Daten enthält

~~~js
gantt.parse({
    data: [
        { id: 1, start_date: "2025-09-23", duration: 42, 
            text: "Hausbau" },
        { id: 2, start_date: "2025-12-02", duration: 60, 
            text: "Hausbau" },
    ],
    "links": [
        { id: "1", source: "1", target: "2", type: "0" },
    ],
    "resources": [
        { id: 1, text: "Anna, Architekt", unit: "hours/day", 
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

Der **data**- oder **tasks**-Array erwartet das **NewTask**-Objekt, das sich vom **Task**-Objekt unterscheidet. Es kann ein String oder ein leeres Objekt sein. Es kann dieselben Eigenschaften wie das [**Task**-Objekt](guides/task-properties.md) haben, und Sie können dort auch beliebige benutzerdefinierte Eigenschaften hinzufügen. Der Unterschied besteht darin, dass einige Eigenschaften des **Task**-Objekts, die mit dem Symbol `$` beginnen, ignoriert werden und die Datumswerte den Typ *string* haben können. Hier ist die Typbeschreibung:

- **NewTask** - (*string | {} | object*) - das Task-Objekt, das dem Gantt hinzugefügt wird. Es kann die folgenden Eigenschaften haben:
    - **_id?_** - (*string | number*) - optional, die Aufgaben-ID, automatisch generiert, wenn sie nicht gesetzt ist.
    - **_start_date?_** - (*string | Date*) - optional, das Datum, an dem eine Aufgabe beginnen soll.
    - **_duration?_** - (*number*) - optional, die Dauer der Aufgabe.
    - **_end_date?_** - (*string | Date*) - optional, das Datum, an dem die Aufgabe beendet wird.
    - **_text?_** - (*string*) - optional, der Aufgabenname.
    - **_open?_** - (*boolean*) - optional, gibt an, ob die Aufgabe beim Laden geöffnet wird (um Kindaufgaben anzuzeigen).
    - **_parent?_** - (*string | number*) - optional, die ID der übergeordneten Aufgabe.
    - **_constraint_date?_** - (*string | Date*) - optional, das Datum der Aufgabenbeschränkung.
    - **_[customProperty: string]_** - (*any*) - jede andere Eigenschaft, die Sie hinzufügen möchten, einschließlich der aus dem [**Task**-Objekt](guides/task-properties.md)

Dies ist nicht die vollständige Liste möglicher Task-Eigenschaften. Dafür verweisen Sie bitte auf diesen Artikel (guides/task-properties.md).

~~~js
gantt.parse({
    data: [
        { id: 1, start_date: "2025-09-23", duration: 42, 
            text: "House Construction" },
    ]
})
~~~

---

Die **links**-Array erwartet die [**Link**-Objekte](guides/link-properties.md).

~~~js
gantt.parse({
    data: [],
    links: [
        { id: "1", source: "1", target: "2", type: "0" },
    ]
})
~~~

---

Die **resources**-Array erwartet das **NewResourceItem**-Objekt, das die folgenden Eigenschaften haben kann:

- **NewResourceItem** - (*object*) - das Resource-Item-Objekt, das dem Gantt hinzugefügt wird. Es kann die folgenden Eigenschaften haben:
    - **_id?_** - (*string | number*) - optional, die Resource-ID, automatisch generiert, wenn sie nicht gesetzt ist
    - **_parent?_** - (*string | number*) - optional, die ID der übergeordneten Ressource
    - **_text?_** - (*string*) - optional, der Ressourcenname
    - **_open?_** - (*boolean*) - optional, gibt an, ob die Ressource beim Laden geöffnet wird (um Kindobjekte anzuzeigen)
    - **_unit?_** - (*string | number*) - optional, die Einheit der Zuweisung
    - **_default_value?_** - (*string | number*) - optional, der Standardwert beim Hinzufügen der Zuordnung im Lightbox-Abschnitt
    - **_[customProperty: string]_** - (*any*) - jede andere Eigenschaft, die Sie hinzufügen möchten

~~~js
gantt.parse({
    data: [],
    resources: [
        { id: 1, text: "Anna, Architekt", unit: "hours/day", 
            default_value: 8, type: "work" },
    ]
})
~~~

---

Die **assignments**-Array erwartet das **NewAssignmentItem**-Objekt, das die folgenden Eigenschaften haben kann:

- **NewAssignmentItem** - (*object*) - das Zuordnungsitem-Objekt, das dem Gantt hinzugefügt wird. Es kann die folgenden Eigenschaften haben:
    - **_id?_** - (*string | number*) - optional, die Zuweisungs-ID, automatisch generiert, wenn sie nicht gesetzt ist
    - **_task_id_** - (*string | number*) - Die ID der Aufgabe, der die Ressource zugewiesen ist
    - **_resource_id_** - (*string | number*) - Die ID der Ressource, die der Aufgabe zugewiesen ist
    - **_value_** - (*number | string*) - optional, der Zuweisungswert
    - **_mode?_** - (*string*) - optional, der Berechnungsmodus der Zeit der Ressourcenzuweisung: "default"|"fixedDates"|"fixedDuration"
    - **_delay?_** - (*number*) - optional, die Differenz zwischen Startdatum der Zuordnung und Startdatum der Aufgabe
    - **_start_date?_** - (*string | Date*) - optional, das Datum, wann die Zuordnung beginnen soll
    - **_duration?_** - (*number*) - optional, die Zuweisungsdauer
    - **_end_date?_** - (*string | Date*) - optional, das Datum, wann die Zuordnung enden soll
    - **_[customProperty: string]_** - (*any*) - jede andere Eigenschaft, die Sie hinzufügen möchten

~~~js
gantt.parse({
    data: [], 
    assignments: [
      { task_id: "1", resource_id: "1", value: "8" },
    ]
})
~~~

---

Das **collections**-Objekt erlaubt das Laden beliebiger benutzerdefinierter Daten. Die Eigenschaften können jeden Namen haben, und der Wert sollte ein Array sein, das die Sammlungselemente enthält:

- **[collectionName: string]** - (*[] | СollectionItem[]*) - ein Array, das die Sammlungselemente enthält.

Das **СollectionItem** ist ein Objekt, das beliebige Eigenschaften haben kann. Es hat die folgenden Typen für seine Eigenschaften:

- **[itemProperty: string]** - (*any*) - Beliebige benutzerdefinierte Eigenschaft des Sammlungselements.

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

If you want to load data which doesn't contain tasks, you still need to define an array of tasks in the object with data but it can be empty:

~~~js
gantt.parse({
    tasks:[],
    links:[
        { id:1, source:1, target:2, type:1},
        { id:2, source:2, target:3, type:0}
    ]
});
~~~

From v8.0, besides tasks and links, you can load resources and resource assignments into the gantt via the **parse()** method:

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

You can read more [here](guides/resource-management.md#loading-resources-and-resource-assignments).

### Related API
- [load](api/method/load.md)

### Related Guides
- [Data Loading](guides/loading.md)
- [Supported Data Formats](guides/supported-data-formats.md)
- [Supported Data Formats](guides/supported-data-formats.md#jsonwithcollections) (lesen, wie man JSON mit Collections lädt)