---
sidebar_label: createDataProcessor
title: createDataProcessor method
description: "erstellt eine neue dataProcessor-Instanz und hängt sie an gantt"
---

# createDataProcessor

### Beschreibung

@short: Erstellt eine neue dataProcessor-Instanz und hängt sie an gantt

@signature: createDataProcessor: (config: DataProcessorConfig | RouterFunction | RouterConfig) =\> any

### Parameters

- `config` - (erforderlich) *DataProcessorConfig | RouterFunction | RouterConfig* -         DataProcessor-Konfigurationsobjekt

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

Die Methode kann einen der folgenden Parametertypen akzeptieren:

- **DataProcessorConfig** - (*Objekt*) - Objekt, das einen der vordefinierten Modi zum Senden der Daten angibt
    - **_url_** - (*string*) - die URL zur Serverseite
    - **_mode?_** - (*string*) - optional, der Modus zum Senden von Daten an den Server: "JSON" | "REST-JSON" | "JSON" | "POST" | "GET"
    - **_deleteAfterConfirmation?_** - (*boolean*) - optional, definiert, ob die Aufgabe aus dem gantt erst nach einer erfolgreichen Serverantwort gelöscht wird. Abhängigkeitsverknüpfungen und Unteraufgaben werden nach Bestätigung der Löschung der übergeordneten Aufgabe gelöscht.


~~~js
var dp = gantt.createDataProcessor({
   url: "/api",
   mode: "REST",
   deleteAfterConfirmation: true
});
~~~


- **RouterFunction (entity, action, data, id): Promise | object | void** - die Router-Funktion zur Verarbeitung von Änderungen im Gantt
    - **_entity_** - (*string*) - der Name der relevanten Entität. Mögliche Werte sind: "task"|"link"|"resource"|"assignment"
    - **_action_** - (*string*) - der Name der relevanten Aktion. Mögliche Werte sind:  "create"|"update"|"delete"
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - das verarbeitete Objekt
    - **_id_** - (*string | number*) - die ID eines verarbeiteten Objekts


~~~js
// entity - "task"|"link"|"resource"|"assignment"
// action - "create"|"update"|"delete"
// data - ein Objekt mit Task- oder Link-Daten
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


- **RouterConfig** - (*Objekt*) - die Router-Konfiguration für verschiedene Entitäten
    - **_task?_** - (*RouterForEntity*) - das Router-Objekt für Tasks
    - **_link?_** - (*RouterForEntity*) - das Router-Objekt für Links
    - **_resource?_** - (*RouterForEntity*) - das Router-Objekt für Ressourcen
    - **_assignment?_** - (*RouterForEntity*) - das Router-Objekt für Zuweisungen


Das **RouterForEntity**-Objekt hat die folgenden Eigenschaften:

- **create (data): Promise** - eine Funktion zur Verarbeitung des Hinzufügens von Items
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - das verarbeitete Item
- **update (data, id): Promise** - eine Funktion zur Verarbeitung der Aktualisierung von Items
    - **_data_** - (*Task | Link | ResourceAssignment | CustomObject*) - das verarbeitete Item
    - **_id_** - (*string | number*) - die ID eines verarbeiteten Items
- **delete (id): Promise** - eine Funktion zur Verarbeitung der Löschung von Items
    - **_id_** - (*string | number*) - die ID eines verarbeiteten Items


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

Alle Funktionen des Router-Objekts sollten entweder eine Promise oder ein Daten-Antwort-Objekt zurückgeben. Dies ist notwendig, damit der DataProcessor die Datenbank-ID anwenden kann und um das **onAfterUpdate**-Ereignis des DataProcessors auszulösen.

~~~js
router = function(entity, action, data, id) {
    return new gantt.Promise(function(resolve, reject) {
        // … some logic
        return resolve({tid: databaseId});
     });
}
~~~

Auf diese Weise können Sie DataProcessor verwenden, um Daten im LocalStorage zu speichern, oder in irgendeinem anderen Speicher, der nicht an eine bestimmte URL gebunden ist, oder falls zwei verschiedene Server (URLs) für die Erstellung und Löschung von Objekten verantwortlich sind.


## Speichern von Ressourcen und Ressourcen-Zuweisungen

Standardmäßig erhält der DataProcessor keine Updates zu Ressourcen und Ressourcen-Zuweisungen. 
Sie können diese Funktion jedoch über eine [separate Konfiguration](guides/server-side.md#resources_crud) aktivieren.

### Verwandte Anleitungen
- [Serverseitige Integration](guides/server-side.md)

### Änderungsprotokoll
- der Parameter **deleteAfterConfirmation** wurde in v8.0 hinzugefügt