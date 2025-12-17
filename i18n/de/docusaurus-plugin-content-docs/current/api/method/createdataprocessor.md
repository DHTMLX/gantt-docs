---
sidebar_label: createDataProcessor
title: createDataProcessor method
description: "Erstellt eine neue dataProcessor-Instanz und verknüpft sie mit dem Gantt-Diagramm"
---

# createDataProcessor

### Description

@short: Erstellt eine neue dataProcessor-Instanz und verknüpft sie mit dem Gantt-Diagramm

@signature: createDataProcessor: (config: DataProcessorConfig | RouterFunction | RouterConfig) =\> any

### Parameters

- `config` - (required) *DataProcessorConfig | RouterFunction | RouterConfig* -         Konfigurationsobjekt für den dataProcessor

### Returns
- ` dataProcessor` - (object) - die erstellte dataProcessor-Instanz

### Example

~~~jsx
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~

### Related samples
- [Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)

### Details

Diese Methode akzeptiert einen der folgenden Parametertypen:

- **DataProcessorConfig** - (*object*) - ein Objekt, das einen der vordefinierten Datenübertragungsmodi definiert
    - **_url_** - (*string*) - die Server-URL
    - **_mode?_** - (*string*) - optional, gibt an, wie Daten gesendet werden: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"
    - **_deleteAfterConfirmation?_** - (*boolean*) - optional, bestimmt, ob eine Aufgabe erst nach Bestätigung der Löschung durch den Server aus dem Gantt entfernt wird. Abhängigkeitslinks und Unteraufgaben werden gelöscht, sobald die Löschung der übergeordneten Aufgabe bestätigt ist.


~~~js
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~


- **RouterFunction (entity, action, data, id): Promise | object | void** - eine Router-Funktion zur Verarbeitung von Änderungen im Gantt-Diagramm
    - **_entity_** - (*string*) - der relevante Entitätsname, z. B. "task", "link", "resource" oder "assignment"
    - **_action_** - (*string*) - der Aktionstyp: "create", "update" oder "delete"
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - das zu verarbeitende Objekt
    - **_id_** - (*string | number*) - die ID des zu verarbeitenden Objekts


~~~js
// entity - "task"|"link"|"resource"|"assignment"
// action - "create"|"update"|"delete"
// data - ein Objekt mit Task- oder Linkdaten
// id – die ID eines verarbeiteten Objekts (Task oder Link)
var dp = gantt.createDataProcessor(function(entity, action, data, id) { 
    switch(action) {
        case "create":
           return gantt.ajax.post(
                server + "/" + entity,
                data
           );
        break;
        case "update":
           return gantt.ajax.put(
                 server + "/" + entity + "/" + id,
                 data
            );
        break;
        case "delete":
           return gantt.ajax.del(
                 server + "/" + entity + "/" + id
           );
         break;
   }
});
~~~


- **RouterConfig** - (*object*) - ein Objekt zur Konfiguration von Routern für verschiedene Entitäten
    - **_task?_** - (*RouterForEntity*) - Router für Tasks
    - **_link?_** - (*RouterForEntity*) - Router für Links
    - **_resource?_** - (*RouterForEntity*) - Router für Ressourcen
    - **_assignment?_** - (*RouterForEntity*) - Router für Assignments


Das **RouterForEntity**-Objekt umfasst folgende Methoden:

- **create (data): Promise** - Funktion zum Hinzufügen von Elementen
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - das hinzuzufügende Element
- **update (data, id): Promise** - Funktion zum Aktualisieren von Elementen
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - das zu aktualisierende Element
    - **_id_** - (*string | number*) - die ID des Elements
- **delete (id): Promise** - Funktion zum Löschen von Elementen
    - **_id_** - (*string | number*) - die ID des Elements


~~~js
var dp = gantt.createDataProcessor({ 
   task: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   },
   link: {
      create: function(data) {},
      update: function(data, id) {},
      delete: function(id) {}
   }
});
~~~

Alle Router-Funktionen sollten entweder ein Promise oder ein Datenantwortobjekt zurückgeben. Dadurch kann der dataProcessor die Datenbank-ID aktualisieren und das **onAfterUpdate**-Event auslösen.

~~~js
router = function(entity, action, data, id) {
    return new gantt.Promise(function(resolve, reject) {
        // … Logik
        return resolve({tid: databaseId});
     });
}
~~~

Dieser Ansatz ermöglicht es, DataProcessor für das Speichern von Daten in localStorage oder anderen Speichern zu verwenden, die nicht an eine bestimmte URL gebunden sind, oder wenn verschiedene Server die Erstellung und Löschung von Objekten übernehmen.


## Speichern von Ressourcen und Resource Assignments

Standardmäßig verarbeitet der DataProcessor keine Updates für Ressourcen und Resource Assignments. 
Diese Funktion kann mit einer [separaten Konfiguration](guides/server-side.md#resources_crud) aktiviert werden.

### Related Guides
- ["Serverseitige Integration"](guides/server-side.md)

### Change log
- die Option **deleteAfterConfirmation** wurde in Version 8.0 hinzugefügt
