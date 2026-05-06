---
sidebar_label: treeDatastore
title: treeDatastore-Konfiguration
description: "eine Sammlung von treeDatastore-Methoden"
---


# treeDatastore

### Description

@short: Eine Sammlung von treeDatastore-Methoden

@signature: treeDatastore: TreeDatastoreMethods


### Details

**_Hinweis_**, dass Tasks und Links mit dem gemeinsamen [API von Gantt](api/api-overview.md) bearbeitet werden sollten. Tasks oder Links direkt im datastore zu ändern kann zu unerwarteten Ergebnissen führen. Datastores sollen für Ressourcen oder andere benutzerdefinierte Objekte verwendet werden.


Ein neuer datastore kann mit der [createDatastore](api/method/createdatastore.md) Methode erstellt werden.


TreeDatastore erweitert [Datastore](api/other/datastore.md) und besitzt alle seine Methoden.
Die erweiterte API des **treeDatastore**-Objekts bietet die folgenden [Methoden](#methods) und [Ereignisse](#events):


## Methoden

- **move (sid, tindex, parent): boolean | void** - verschiebt ein Element an die neue Position oder zu einem neuen Elternteil
    - **_sid_** - (*string \| number*) - die ID des zu verschiebenden Elements
    - **_tindex_** - (*number*) - der Index der Position, zu der das Element verschoben wird (der Index innerhalb eines Astes)
    - **_parent?_** - (*string \| number*) - optional, die Eltern-ID. Falls angegeben, bezieht sich der tindex auf den Index im Ast des 'parent'-Elements
    - Gibt false zurück, wenn die Aktion über onBeforeItemMove abgebrochen wurde, andernfalls undefined.

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);


store.move(6, -1, 2);// verschiebt 'John' von 'QA' nach 'Development'
~~~


Der Zwilling von treeDatastore.move() ist [gantt.moveTask()](api/method/movetask.md).

Ruft die onBeforeItemMove-, onAfterItemMove-Ereignisse sowie alle Ereignisse der refresh-Methode auf.


#### **getBranchIndex (id): number** - gibt den Index eines Elements im Ast zurück
- **_id_** - (*string \| number*) - die ID des Elements

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);

store.getBranchIndex(8);
// -> 1
~~~


Der Zwilling von treeDatastore.getBranchIndex() ist [gantt.getTaskIndex()](api/method/gettaskindex.md).


- **hasChild (id): number | void** - prüft, ob das angegebene Element Kind-Elemente besitzt
    - **_id_** - (*string \| number*) - die ID des Elements
    - Gibt die Anzahl der Kindaufgaben zurück (falls vorhanden) oder undefined, falls nicht.

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);


store.hasChild(1);
// -> true


store.hasChild(9);
// -> false
~~~


Der Zwilling von treeDatastore.hasChild() ist gantt.hasChild().


- **getChildren (id): Array\<number \| string \| object\>** - gibt die Kind-Elemente der 1. Ebene des angegebenen Elternzweigs zurück
    - **_id_** - (*string \| number*) - die ID des Elternzweigs
    - Gibt ein Array der IDs der Kinder zurück.

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);


store.getChildren(3);
// -> [9, 10]


store.getChildren(9);
// -> [0]
~~~


Der Zwilling von treeDatastore.getChildren() ist gantt.getChildren().


- **isChildOf (childId, parentId): boolean** - prüft, ob ein Element ein Kind eines anderen Elements ist
    - **_childId_** - (*string \| number*) - die ID eines Elements, das Sie als Kind prüfen möchten
    - **_parentId_** - (*string \| number*) - die ID eines Elements, das Sie als Elternteil prüfen möchten
    - Gibt true zurück, wenn das Element Kind des angegebenen Elternteils ist. Andernfalls false.

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);


store.isChildOf(9, 3);
// -> true


store.getChildren(9, 2);
// -> false
~~~


Der Zwilling von treeDatastore.isChildOf() ist [gantt.isChildOf()](api/method/ischildof.md).


- **getSiblings (id): Array\<number \| string \| object\>** - gibt Geschwister des angegebenen Elements zurück (einschließlich des Elements selbst)
    - **_id_** - (*string \| number*) - die ID des Elements
    - Gibt ein Array mit den IDs der Geschwister des Elements zurück.

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);


store.getSiblings(1);
// -> [1,2,3,4]


store.getSiblings(6);
// -> [6]
~~~


Der Zwilling von treeDatastore.getSiblings() ist [gantt.getSiblings()](api/method/getsiblings.md).


- **getNextSibling (id): number \| string \| null** - gibt die ID des nächsten Elements auf derselben Ebene zurück
    - **_id_** - (*string \| number*) - die ID des Elements
    - Gibt die ID des nächsten Geschwisters oder null zurück.

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);


store.getNextSibling(9);
// -> 10


store.getNextSibling(10);
// -> null
~~~


Der Zwilling von treeDatastore.getNextSibling() ist [gantt.getNextSibling()](api/method/getnextsibling.md).


- **getPrevSibling (id): number \| string \| null** - gibt die ID des vorherigen Elements auf derselben Ebene zurück
    - **_id_** - (*string \| number*) - die ID des Elements
    - Gibt die ID des vorherigen Geschwisters oder null zurück.

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);


store.getPrevSibling(9);
// -> null


store.getPrevSibling(10);
// -> 9
~~~


Der Zwilling von treeDatastore.getPrevSibling() ist [gantt.getPrevSibling()](api/method/getprevsibling.md).


- **getParent (id): number \| string** - gibt die ID des Elternteils zurück oder 0
    - **_id_** - (*string \| number*) - die ID des Elements

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);


store.getParent(9);
// -> 3


store.getParent(1);
// -> 0
~~~


Der Zwilling von treeDatastore.getParent() ist [gantt.getParent()](api/method/getparent.md).


- **calculateItemLevel (item): number** - berechnet die Verschachtelungsebene eines Elements
    - **_item_** - (*object*) - das Element-Objekt

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);


store.calculateItemLevel(store.getItem(9));
// -> 1


store.calculateItemLevel(store.getItem(1));
// -> 0
~~~


Der Zwilling von treeDatastore.calculateItemLevel() ist [gantt.calculateTaskLevel()](api/method/calculatetasklevel.md).


- **setParent (item, newParentId): void** - setzt das Elternteil für ein Element. Die Eltern-ID wird in die durch die Konfiguration angegebene Eigenschaft geschrieben, standardmäßig "item.parent"
    - **_item_** - (*object*) - das Element-Objekt
    - **_newParentId_** - (*string \| number \| null*) - die ID des Elternteils

:::note
Verwenden Sie **treeDatastore.move()**, um eine Aufgabe in ein anderes Elternteil zu verschieben. Die **setParent()**-Methode schreibt lediglich den Wert in die durch die Konfiguration angegebene Eigenschaft, sie aktualisiert den internen Zustand des Baums nicht.
:::


~~~js
gantt.createDatastore({
    name: gantt.config.resource_store,
    type: "treeDatastore",
    parentProperty: "parent", //
    initItem: function (item) {
        item.parent = item.parent \|\| gantt.config.root_id;
        item[gantt.config.resource_property] = item.parent;
        item.open = true;
        return item;
    }
});


var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);


store.setParent(store.getItem(9), 4);
// -> 3


~~~


Der Zwilling von treeDatastore.setParent() ist [gantt.setParent()](api/method/setparent.md).


- **eachItem (callback, parentId): void** - iteriert über alle Kinder eines bestimmten Elements
    - **_callback_** - (*Function*) - die Callback-Funktion
    - **_parentId?_** - (*string \| number*) - optional, die ID des Elternteils

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);


store.eachItem(function(item){
    console.log(item.text);
});
~~~


Der Zwilling von treeDatastore.eachItem() ist [gantt.eachTask()](api/method/eachtask.md).


- **eachParent (callback, startItem): void** - iteriert über alle Eltern-Elemente des angegebenen Elements
    - **_callback_** - (*Function*) - die Callback-Funktion
    - **_startItem_** - (*string \| number*) - die ID des Elements, dessen Elternkette iteriert werden soll

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);


store.eachParent(function(item){
    console.log(item.text);
}, 10);
// -> "Sales"
~~~


Der Zwilling von treeDatastore.eachParent() ist [gantt.eachParent()](api/method/eachparent.md).


- **open (id): void** - öffnet den Ast mit der angegebenen ID
    - **_id_** - (*string \| number*) - die Ast-ID

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);


store.open(1);
~~~


Der Zwilling von treeDatastore.open() ist [gantt.open()](api/method/open.md).

Ruft das onItemOpen-Ereignis auf.


- **close (id): void** - schließt den Ast mit der angegebenen ID
    - **_id_** - (*string \| number*) - die Ast-ID

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);


store.close(1);
~~~


Der Zwilling von treeDatastore.close() ist [gantt.close()](api/method/close.md).

Ruft das onItemClose-Ereignis auf.


- **sort (field, desc, parent, silent): void** - sortiert Elemente im Ressourcenraster
    - **_field_** - (*string \| Function*) - der Spaltenname, nach dem das Ressourcenraster sortiert wird, oder eine benutzerdefinierte Sortierfunktion
    - **_desc?_** - (*boolean*) - optional, gibt die Sortierichtung an: true - absteigend, false - aufsteigend. Standardmäßig false
    - **_parent?_** - (*string \| number*) - optional, die ID des Elternelements. Sortiert nur in diesem Ast
    - **_silent?_** - (*boolean*) - optional, gibt an, ob nach dem Neordenieren gerendert werden soll

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);


// sortiere das Ressourcenraster nach der Spalte
var resourceSortDirection = false;
function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~


:::note
sample: [Gantt. Sorting resources by the column ](https://snippet.dhtmlx.com/gypniv9e )
:::


oder definiere eine benutzerdefinierte Funktion zum Sortieren:


~~~js
var resourceSortDirection = false;
function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort(function (resource1, resource2){
        return resource1.id - resource2.id;
    }, resourceSortDirection)
    gantt.render();
}
~~~


:::note
samle: [Gantt. Sorting resources by a custom function ](https://snippet.dhtmlx.com/fvjivly5)
:::


Der Zwilling von treeDatastore.sort() ist [gantt.sort()](api/method/sort.md).


## Ereignisse

- **onBeforeItemMove (id, parent, tindex)** - löst aus, bevor ein Element an eine neue Position verschoben wird
    - **_id_** - (*string \| number*) - die ID des zu bewegenden Elements
    - **_parent_** - (*string \| number*) - die Eltern-ID
    - **_tindex_** - (*number*) - der Index der Position im Elternast, auf den das Element verschoben wird
    - Gibt false zurück, um die Standardaktion des Ereignisses zu verhindern, andernfalls true.

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeItemMove", function(id, parent, tindex){
    // Ihr Code hier
    return true;
});
~~~


Der Zwilling des onBeforeItemMove-Ereignisses von treeDatastore ist das [onBeforeTaskMove](api/event/onbeforetaskmove.md)-Ereignis von Gantt.


- **onAfterItemMove (id, parent, tindex)** - löst aus, nachdem ein Element an eine neue Position verschoben wurde
    - **_id_** - (*string \| number*) - die ID des zu bewegenden Elements
    - **_parent_** - (*string \| number*) - die Eltern-ID
    - **_tindex_** - (*number*) - der Index der Position im Elternast, auf den das Element verschoben wird

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterItemMove", function(id, parent, tindex){
    // Ihr Code hier
});
~~~


Der Zwilling des onAfterItemMove-Ereignisses von treeDatastore ist das [onAfterTaskMove](api/event/onaftertaskmove.md)-Ereignis von Gantt.


- **onItemOpen (id)** - löst aus, wenn ein Ast geöffnet wird
    - **_id_** - (*string \| number*) - die ID des Astes

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemOpen", function(id){
    // Ihr Code hier
});
~~~


Der Zwilling des onItemOpen-Ereignisses von treeDatastore ist das [onTaskOpened](api/event/ontaskopened.md)-Ereignis von Gantt.


- **onItemClose (id)** - löst aus, wenn ein Ast geschlossen wird
    - **_id_** - (*string \| number*) - die ID des Astes

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemClose", function(id){
    // Ihr Code hier
});
~~~


Der Zwilling des onItemClose-Ereignisses von treeDatastore ist das [onTaskClosed](api/event/ontaskclosed.md)-Ereignis von Gantt.


### Related API
- [createDatastore](api/method/createdatastore.md)
- [getDatastore](api/method/getdatastore.md)
- [datastore](api/other/datastore.md)

### Related Guides
- [Resource Management](guides/resource-management.md)