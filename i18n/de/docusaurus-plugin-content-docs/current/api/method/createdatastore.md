---
sidebar_label: createDatastore
title: createDatastore method
description: "erstellt einen Datastore basierend auf der angegebenen Konfiguration"
---

# createDatastore

### Description

@short: Erstellt einen Datastore basierend auf der angegebenen Konfiguration

@signature: createDatastore: (config: DatastoreConfig) =\> DatastoreMethods & TreeDatastoreMethods

### Parameters

- `config` - (required) *DatastoreConfig* - ein Objekt, das die Konfiguration des Datastores enthält

### Returns
- ` datastore` - (datastore & treedatastore) - gibt entweder ein datastore- oder ein treedatastore-Objekt zurück, abhängig vom angegebenen Typ

### Example

~~~jsx
var resourcesStore = gantt.createDatastore({
    name:"resource",
    initItem: function(item){
        item.id = item.key || gantt.uid();
        return item;
    }
});
~~~

### Related samples
- [Gantt chart with resource panel](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)
- [Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)

### Details

Eigenschaften des Konfigurationsobjekts:

  
- **name** - (*string*) - ein benutzerdefinierter String-Name für den Datastore. Dieser Name ermöglicht den Zugriff auf den Datastore über [getDatastore](api/method/getdatastore.md).
- **initItem? (item): any** - optional, eine Funktion zur Vorverarbeitung von Items, wenn sie in den Datastore geladen werden. Dies ist nützlich, um Standardwerte für Datastore-Items festzulegen. Die Funktion erhält:
    - **_item_** - (*any*) - das verarbeitete Ressourcen-Item.
- **type?** - (*string*) - optional, akzeptiert nur den Wert **"treeDatastore"**. Die Angabe type:"treeDatastore" erstellt einen Datastore, der hierarchische Daten verwaltet, wobei **id** als Primärschlüssel und **parent** zur Verknüpfung mit der Eltern-id verwendet wird. Jeder andere Wert erzeugt einen flachen Listen-Datastore.
- **fetchTasks?** - (*boolean*) - optional, wenn aktiviert, werden alle Aufgaben angezeigt, die einer bestimmten Ressource im Ressourcen-Ansichts-Panel zugewiesen sind. Diese Funktion funktioniert sowohl für das Resource Diagram als auch für das Resource Histogram Layout.

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)

### Related Guides
- ["Gantt-Layout"](guides/layout-config.md)
- ["Ressourcenmanagement"](guides/resource-management.md)

