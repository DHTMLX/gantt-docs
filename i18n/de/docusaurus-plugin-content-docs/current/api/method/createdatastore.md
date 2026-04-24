---
sidebar_label: createDatastore
title: createDatastore method
description: "erstellt einen Datastore gemäß der bereitgestellten Konfiguration"
---

# createDatastore

### Description

@short: Erstellt einen Datastore gemäß der bereitgestellten Konfiguration

@signature: createDatastore: (config: DatastoreConfig) =\> DatastoreMethods & TreeDatastoreMethods

### Parameters

- `config` - (erforderlich) *DatastoreConfig* - ein Konfigurationsobjekt eines Datastore

### Returns
- ` datastore` - (Datastore & TreeDatastore) - das Datastore- oder TreeDatastore-Objekt, abhängig vom Typ

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

Configuration object properties:

  
- **name** - (*string*) - ein beliebiger String-Name des Datastore. Der Datastore kann über seinen Namen mit [getDatastore](api/method/getdatastore.md) aufgerufen werden.
- **initItem? (item): any** - optional, preprocesses items loaded into the datastore. It is a good place to set the default values of the datastore items. The function takes the following parameter:
    - **_item_** - (*any*) - das Ressourcenobjekt.
- **type?** - (*string*) - optional, akzeptiert nur einen festen Wert **"treeDatastore"**. Wenn der Typ "treeDatastore" angegeben wird, unterstützt der datastore hierarchische Daten, wobei die **id**-Eigenschaft als Primärschlüssel dient und **parent** als Link zur Eltern-ID fungiert. Jeder andere Wert erzeugt einen flachen Listen-Datastore.
- **fetchTasks?** - (*boolean*) - optional, aktiviert das Anzeigen aller Aufgaben, die einer bestimmten Ressource zugewiesen sind, im Ressourcen-Ansichtsfenster. Diese Funktionalität funktioniert sowohl für den Ressourcen-Diagramm-Typ als auch für den Ressourcen-Histogramm-Typ des Layouts.

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)

### Related Guides
- [Gantt-Layout](guides/layout-config.md)
- [Ressourcenverwaltung](guides/resource-management.md)