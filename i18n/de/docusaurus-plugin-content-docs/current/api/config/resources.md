---
sidebar_label: resources
title: resources config
description: "definiert zusätzliche Einstellungen für den resource store"
---

# resources

### Description

@short: Definiert zusätzliche Einstellungen für den resource store

@signature: resources: boolean | \{ dataprocessor_assignments?: boolean; dataprocessor_resources?: boolean; editable_resource_diagram?: boolean; resource_store?: \{ type?: string; initItem?: ((item: any) =\> any); fetchTasks?: boolean; \}; lightbox_resources?(resourceArray: any): any; \}

### Example

~~~jsx
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
    editable_resource_diagram: true,
    resource_store: {
        type: "treeDataStore",
        fetchTasks: true,
        initItem: function(item) {
            item.parent = item.parent || gantt.config.root_id;
            item[gantt.config.resource_property] = item.parent;
            item.open = true;
            return item;
        }
    },
    lightbox_resources: function selectResourceControlOptions(resources){
        const lightboxOptions = [];
        resources.forEach(function(res) {
            if (!gantt.$resourcesStore.hasChild(res.id)) {
                const copy = gantt.copy(res);
                copy.key = res.id;
                copy.label = res.text;
                lightboxOptions.push(copy);
            }
        });
        return lightboxOptions;
    }
};
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

Die **resources**-Einstellung ist ein Objekt, das mehrere Optionen umfasst:

- **dataprocessor_assignments** - (*boolean*) - bestimmt, ob Änderungen an resource assignments als separate Einträge mit persistenten IDs an den DataProcessor gesendet werden
- **dataprocessor_resources** - (*boolean*) - steuert, ob Änderungen an resource Objekten als separate Einträge mit persistenten IDs an den DataProcessor gesendet werden
- **editable_resource_diagram** - (*boolean*) - steuert, ob resource assignments direkt im resource diagram bearbeitet werden können
- **resource_store** - (*object*) - richtet den Standard-resource datastore ein, mit folgenden Eigenschaften:
    - **_type?_** - (*string*) - optional, akzeptiert nur den festen Wert **"treeDataStore"**. Wird dieser Wert gesetzt, unterstützt der datastore hierarchische Daten mit **id** als Primärschlüssel und **parent** als Referenz auf die Eltern-id. Jeder andere Wert führt zu einem flachen List-datastore.
    - **_initItem?_** - (*Function*): any - optional, erlaubt die Vorverarbeitung von Items, die in den datastore geladen werden, nützlich zum Setzen von Standardwerten. Die Funktion erhält:
        - **_item_** - (*any*) - das zu verarbeitende resource Item
    - **_fetchTasks?_** - (*boolean*) - optional, aktiviert die Anzeige aller einem resource zugewiesenen Tasks im resource view panel. Funktioniert sowohl für resource diagram als auch resource histogram Layouts.
- **lightbox_resources? (resourceArray): any** - optional, eine Funktion, die alle resources erhält und ein Array von resources zurückgibt, die im resource control der lightbox angezeigt werden sollen. Standardmäßig werden nur resources ohne Unterressourcen einbezogen.
    - **_resourceArray_** - (*any*) - ein Array von resource Objekten

### Related Guides
- ["Ressourcenmanagement"](guides/resource-management.md)

### Change log
- hinzugefügt in v8.0
