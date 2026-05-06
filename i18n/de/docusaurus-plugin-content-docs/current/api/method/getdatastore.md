---
sidebar_label: getDatastore
title: getDatastore method
description: "liefert das Konfigurationsobjekt eines Datastores"
---

# getDatastore

### Description

@short: Gibt das Konfigurationsobjekt eines Datastores zurück

@signature: getDatastore: (name: string) => DatastoreMethods & TreeDatastoreMethods

### Parameters

- `name` - (required) *string* - der Name des Datastores

### Returns
- ` datastore` - (datastore & treedatastore) - das Konfigurationsobjekt eines Datastores

### Example

~~~jsx
var tasksStore = gantt.getDatastore("task");
~~~

### Related samples
- [Gantt-Diagramm mit Ressourcen-Panel](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)