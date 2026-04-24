---
sidebar_label: resources
title: resources config
description: "definiert zusätzliche Einstellungen für den resource store"
---

# resources

### Description

@short: Definiert eine zusätzliche Konfiguration für den Ressourcen-Speicher

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

Die Eigenschaft **resources** stellt ein Objekt mit einer Reihe von Attributen dar:

- **dataprocessor_assignments** - (*boolean*) - definiert, ob bearbeitete Ressourcen-Zuweisungen an den DataProcessor als separate Einträge mit persistierenden IDs gesendet werden können
- **dataprocessor_resources** - (*boolean*) - definiert, ob bearbeitete Ressourcen-Objekte an den DataProcessor als separate Einträge mit persistierenden IDs gesendet werden können
- **editable_resource_diagram** - (*boolean*) - definiert, ob Ressourcen-Zuweisungen im Ressourcen-Diagramm bearbeitbar sind
- **resource_store** - (*object*) - erstellt den Standard-Ressourcen-Datastore. Das Objekt enthält die folgenden Eigenschaften:
    - **_type?_** - (*string*) - optional, akzeptiert nur einen festen Wert **"treeDatastore"**. Wenn type:"treeDatastore" angegeben ist, unterstützt der Datastore hierarchische Daten, wobei die Eigenschaft **id** als Primärschlüssel dient und **parent** als Verknüpfung zur Eltern-ID. Anderer Wert erzeugt einen flachen Listen-Datastore.
    - **_initItem?_** - (*Function*): any - optional, bereitet Elemente vor, die in den Datenspeicher geladen werden. Es ist ein guter Ort, um die Standardwerte der Datastore-Einträge festzulegen. Die Funktion nimmt folgenden Parameter entgegen:
        - **_item_** - (*any*) - das Ressourcen-Item
    - **_fetchTasks?_** - (*boolean*) - optional, aktiviert die Anzeige aller Aufgaben, die einer bestimmten Ressource zugewiesen sind, im Ressourcen-Ansichtspanel. Diese Funktionalität funktioniert sowohl für das Ressourcen-Diagramm als auch für das Ressourcen-Histogramm-Layout.
- **lightbox_resources? (resourceArray): any** - optional, eine Funktion, die alle Ressourcen als Argument nimmt und ein Array von Ressourcen zurückgeben muss, die in der Ressourcensteuerung des Lightbox verfügbar sein sollen. Standardmäßig wird das Steuerungselement mit Ressourcen gefüllt, die keine Unterressourcen haben. 
    - **_resourceArray_** - (*any*) - ein Array mit Ressourcen

### Related Guides
- [Resource Management](guides/resource-management.md)

### Change log
- hinzugefügt in v8.0
