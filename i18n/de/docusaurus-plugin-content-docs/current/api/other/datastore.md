---
sidebar_label: datastore
title: Datastore-Konfiguration
description: "eine Sammlung von datastore-Methoden"
---

# datastore

### Description

@short: Eine Sammlung von datastore-Methoden

@signature: datastore: DatastoreMethods

### Details

**_Hinweis_**, dass Tasks und Links über die gemeinsame [API von Gantt](api/api-overview.md) geändert werden sollten. Das Ändern von Tasks oder Links direkt im datastore kann zu unerwarteten Ergebnissen führen. Datastores sollten für Ressourcen oder andere benutzerdefinierte Objekte verwendet werden.

Eine neue Datastore kann mithilfe der Methode [createDatastore](api/method/createdatastore.md) erstellt werden. 
Das **datastore**-Objekt besitzt die folgenden [Methoden](#methods) und [Events](#events):

## Methoden

### parse (data): void 
Lädt Daten aus einem Array

**Parametere**:
- `data` - (Array\<object\>) - die zu ladenden Daten

**Beispiel**:
~~~js
gantt.$resourcesStore.parse([
    { id: 1, text: "QA", parent: null },
    { id: 2, text: "Development", parent: null },
    { id: 3, text: "Sales", parent: null },
    { id: 4, text: "Other", parent: null },
    { id: 5, text: "Unassigned", parent: 4 },
    { id: 6, text: "John", parent: 1 },
    { id: 7, text: "Mike", parent: 2 },
    { id: 8, text: "Anna", parent: 2 },
    { id: 9, text: "Bill", parent: 3 },
    { id: 10, text: "Floe", parent: 3 }
]);
~~~

:::note
sample
[Ressourcen-Lade-Diagramm](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
:::

Der Zwilling von datastore.parse() ist [gantt.parse()](api/method/parse.md).
  
Ruft die Events [onBeforeParse](#onbeforeparse-data) , [onItemLoading](#onitemloading-item), [onParse](#onparse-data), und [onStoreUpdated](#onstoreupdated-id-item-action) auf.

---

### getItem (id)
Gibt den Eintrag anhand seiner id zurück

**Parameter**:
- `id` - (string | number) - die ID des Elements

**Rückgabe**: Objekt | void - das Element-Objekt

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const resource = store.getItem(resourceId);
~~~

:::note
sample
[Ressourcen-Lade-Diagramm](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
:::

Die Zwillinge von datastore.getItem() sind [gantt.getTask()](api/method/gettask.md) und [gantt.getLink()](api/method/getlink.md).

---

### updateItem (id, item)
Aktualisiert den angegebenen Eintrag

**Parametere**:
- `id` - (string | number) - die ID des Elements
- `item` - (object) - das Objekt des Elements

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const resource = store.getItem(resourceId);
resource.text = "modified";
store.updateItem(resourceId);
// oder
store.updateItem(resourceId, { text: "modified" });
~~~

Die Zwillinge von datastore.updateItem() sind [gantt.updateTask()](api/method/updatetask.md) und [gantt.updateLink()](api/method/updatelink.md).

Ruft die Events [onBeforeUpdate](#onbeforeupdate-id-item), [onAfterUpdate](#onafterupdate-id-item) und [onStoreUpdated](#onstoreupdated-id-item-action) auf.

---

### removeItem (id)
Löscht den angegebenen Eintrag

**Parametere**:
- `id` - (string | number) - die ID des Elements

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.removeItem(resourceId);
~~~

Die Zwillinge von datastore.removeItem() sind [gantt.deleteTask()](api/method/deletetask.md) und [gantt.deleteLink()](api/method/deletelink.md).

Ruft die Events [onBeforeDelete](#onbeforedelete-id-item), [onAfterDelete](#onafterdelete-id-item) und [onStoreUpdated](#onstoreupdated-id-item-action) auf.

---

### isVisible (id)
Prüft, ob der angegebene Eintrag sichtbar ist oder durch Filter verborgen wurde

**Parametere**:
- `id` - (string | number) - die ID des Elements

**Rückgabe**: boolean - true, wenn sichtbar, andernfalls false

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
if(store.isVisible(resourceId)){
    console.log(resourceId);
}
~~~

Die Zwillinge von datastore.isVisible() sind [gantt.isTaskVisible()](api/method/istaskvisible.md).

---

### getVisibleItems ()
Gibt das Array der sichtbaren Einträge zurück

**Rückgabe**: Array\<object\> - Array der sichtbaren Items

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const items = store.getVisibleItems();
~~~

---

### addItem (item, index)
Fügt der datastore einen neuen Eintrag hinzu

**Parametere**:
- `item` - (object) - das Item-Objekt
- `index` - (number) - die Position, an der das Item eingefügt wird (0 oder größer)

**Rückgabe**: number | string - die ID des Elements

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const itemId = store.addItem({
    text: "Unassigned",
    parent:4
});
~~~

Die Zwillinge von datastore.addItem() sind [gantt.addTask()](api/method/addtask.md) und [gantt.addLink()](api/method/addlink.md).

Ruft die Events [onBeforeAdd](#onbeforeadd-id-item), [onAfterAdd](#onafteradd-id-item) und [onStoreUpdated](#onstoreupdated-id-item-action) auf.

---

### changeId (oldId, newId)
Ändert die ID des Elements

**Parametere**:
- `oldId` - (string | number) - die aktuelle ID des Elements
- `newId` - (string | number) - die neue ID des Elements

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

const itemId = store.addItem({
    text: "Unassigned",
    parent:4
});

// itemId - temporäre Client-seitige ID des neuen Elements
// sobald das Item in der Datenbank gespeichert ist - aktualisieren Sie den Client mit der neuen ID:

store.changeId(itemId, "databaseId");
~~~

Die Zwillinge von datastore.changeId() sind [gantt.changeTaskId()](api/method/changetaskid.md) und [gantt.changeLinkId()](api/method/changelinkid.md).
 
Ruft das Event [onIdChange](#onidchange-id-newid) auf.

---

### exists (id)
Prüft, ob das angegebene Element im datastore existiert

**Parametere**:
- `id` - (string | number) - die ID des Elements

**Rückgabe**: boolean - true, wenn vorhanden, sonst false

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

if(store.exists(resourceId)){
    console.log(resourceId);
}
~~~

Die Zwillinge von datastore.exists() sind [gantt.isTaskExists()](api/method/istaskexists.md) und [gantt.isLinkExists()](api/method/islinkexists.md).

---

### move (sindex, tindex)
Verschiebt ein Item an eine neue Position

**Parametere**:
- `sindex` - (number) - der Index der aktuellen Position der Aufgabe
- `tindex` - (number) - der Index der Position, in die das Element verschoben wird

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

// vertausche zwei Items
const idA = 1;
const idB = 5;
const indexA = store.getIndexById(idA);
const indexB = store.getIndexById(idB);
store.move(indexB, indexA);

indexA = store.getIndexById(idA);
store.move(indexA, indexB);
~~~

Der Zwilling von datastore.move() ist [gantt.moveTask()](api/method/movetask.md).
  
Ruft das Event [onStoreUpdated](#onstoreupdated-id-item-action) auf.

---

### clearAll ()
Löscht die datastore

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.clearAll();
~~~

Der Zwilling von datastore.clearAll() ist [gantt.clearAll()](api/method/clearall.md).
  
Ruft die Events [onClearAll](#onclearall-), [onBeforeStoreUpdate](#onbeforestoreupdate-id-item-action) und [onStoreUpdated](#onstoreupdated-id-item-action) auf.

---

### silent (callback)
Führt den Code aus, ohne API-Ereignisse des datastore auszulösen

**Parametere**:
- `callback` - (Function) - die Callback-Funktion

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.silent(function(){
    store.eachItem(function(item){
        item.text += " modified";
        store.updateItem(item.id);
    });
});
store.refresh();
~~~

Der Zwilling von datastore.silent() ist [gantt.silent()](api/method/silent.md).

---

### refresh (id)
Löst das Neuteuern der Ereignisse des angegebenen Datensatzes aus und führt Filter aus

**Parametere**:
- `id` - (string | number) - optional, die ID des Datensatzes

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.refresh(itemId); // malt ein Item neu
store.refresh(); // malt alle Items neu
~~~

Die Zwillinge von datastore.refresh() sind [gantt.refreshTask()](api/method/refreshtask.md) und [gantt.refreshLink()](api/method/refreshlink.md).
  
Ruft die Events [onBeforeStoreUpdate](#onbeforestoreupdate-id-item-action), [onBeforeFilter](#onbeforefilter-), [onFilterItem](#onfilteritem-id-item), [onFilter](#onfilter-) und [onStoreUpdated](#onstoreupdated-id-item-action) auf.

---

### count ()
Gibt die Anzahl der aktuell in den datastore geladenen Items zurück

**Rückgabe**: number - Anzahl der Items

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onParse", function(){
    alert(store.count() + " items loaded");
});
~~~

Die Zwillinge von datastore.count() sind [gantt.getTaskCount()](api/method/gettaskcount.md) und [gantt.getLinkCount()](api/method/getlinkcount.md).

---

### countVisible ()
Gibt die Anzahl der aktuell sichtbaren Items zurück

**Rückgabe**: number - Anzahl der sichtbaren Items

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
alert(store.countVisible() + " items are visible");
~~~

Die Zwilling von datastore.countVisible() ist [gantt.getVisibleTaskCount()](api/method/getvisibletaskcount.md).

---

### eachItem (callback)
Iteriert über alle Items des datastore

**Parametere**:
- `callback` - (Function) - Die Callback-Funktion

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

let searchItems = [];
store.eachItem(function(item){
    if(!item.value){
        searchItems.push(item);
    }
});
~~~

Die Zwilling von datastore.eachItem() ist [gantt.eachTask()](api/method/eachtask.md).

---

### filter ()
Führt die Filter aus und aktualisiert das sichtbare Array der Items

Normalerweise müssen Sie diese Methode nicht aufrufen, sie wird automatisch von der store.refresh() Methode aufgerufen.

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.filter();
~~~

---

### sort (field, desc, parent, silent)
Sortiert Items im Ressourcen-Gitter

**Parametere**:
- `field` - (string | Function) - der Name der Spalte oder eine benutzerdefinierte Sortierfunktion
- `desc` - (boolean) - gibt die Sortierreihenfolge an: true - absteigend, false - aufsteigend
- `parent` - (string | number) - die ID des übergeordneten Elements
- `silent` - (boolean) - gibt an, ob nach dem Neuanordnen das Rendering ausgelöst werden soll

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    { id: 1, text: "QA", parent: null },
    { id: 2, text: "Development", parent: null },
    { id: 3, text: "Sales", parent: null },
    { id: 4, text: "Other", parent: null },
    { id: 5, text: "Unassigned", parent: 4 },
    { id: 6, text: "John", parent: 1 },
    { id: 7, text: "Mike", parent: 2 },
    { id: 8, text: "Anna", parent: 2 },
    { id: 9, text: "Bill", parent: 3 },
    { id: 10, text: "Floe", parent: 3 }
]);

// sortiere das Ressourcen-Gitter nach der Spalte
let resourceSortDirection = false;

function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~

oder Sie können eine benutzerdefinierte Funktion zum Sortieren verwenden:

~~~js
let resourceSortDirection = false;

function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort(function (resource1, resource2){
        return resource1.id - resource2.id;
    }, resourceSortDirection)
    gantt.render();
}
~~~

Der Zwilling von datastore.sort() ist [gantt.sort()](api/method/sort.md).

---

### getIndexRange (from, to)
Gibt Datensätze zwischen den angegebenen Indizes zurück

**Parametere**:
- `from` - (number) - die Startposition
- `to` - (number) - die Endposition

**Rückgabe**: Array\<object\> - Array der Elemente

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const itemsInViewPort = store.getIndexRange(5, 10);// holt Items von 5. bis 10. Position
~~~

---

### getItems ()
Gibt alle Einträge des datastore zurück

**Rückgabe**: Array\<object\> - Array aller Items

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const items = store.getItems();
~~~

Die Zwillinge von datastore.getItems() sind [gantt.getTaskByTime()](api/method/gettaskbytime.md) und [gantt.getLinks()](api/method/getlinks.md).

---

### getIdByIndex (index)
Gibt die ID des Elements anhand seines Index zurück

**Parametere**:
- `index` - (number) - die Position des Elements

**Rückgabe**: string | number | void - Item-ID oder undefined

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const firstItem = store.getIdByIndex(0);
~~~

Der Zwilling von datastore.getIdByIndex() ist [gantt.getTaskByIndex()](api/method/gettaskbyindex.md).

---

### getIndexById (id)
Gibt den Index des Elements anhand seiner ID zurück

**Parametere**:
- `id` - (string | number) - die ID des Elements

**Rückgabe**: number - Element-Index oder -1, wenn nicht gefunden

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const itemIndex = store.getIndexById(5);
~~~

Der Zwilling von datastore.getIndexById() ist [gantt.getTaskIndex()](api/method/gettaskindex.md).

---

### getFirst ()
Gibt die ID des ersten Elements des datastore zurück

**Rückgabe**: string | number | null - ID des ersten Elements

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const firstId = store.getFirst();
~~~

---

### getLast ()
Gibt die ID des letzten Elements des datastore zurück

**Rückgabe**: string | number | null - ID des letzten Elements

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const lastId = store.getLast();
~~~

---

### getNext (id)
Gibt die ID des nächsten Elements des datastore zurück

**Parametere**:
- `id` - (string | number) - die ID des Elements

**Rückgabe**: string | number | null - ID des nächsten Elements

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const firstId = store.getFirst();
const secondId = store.getNext(firstId);
~~~

Der Zwilling von datastore.getNext() ist [gantt.getNext()](api/method/getnext.md).

---

### getPrev (id)
Gibt die ID des vorherigen Elements des datastore zurück

**Parametere**:
- `id` - (string | number) - die ID des Elements

**Rückgabe**: string | number | null - ID des vorherigen Elements

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const prevId = store.getPrev(itemId);
~~~

Der Zwilling von datastore.getPrev() ist [gantt.getPrev()](api/method/getprev.md).

---

### destructor ()
Löscht den datastore und entfernt alle angehängten Event-Handler

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.destructor();
~~~

Der Zwilling von datastore.destructor() ist [gantt.destructor()](api/method/destructor.md).

---

### attachEvent (name, handler, settings)
Befestigt den Handler an einem internen Event des DataStore

**Parametere**:
- `name` - (string) - der Name des Events, case-insensitive
- `handler` - (Function) - die Handler-Funktion
- `settings` - (object) - optional, ein Objekt mit Einstellungen für den Event-Handler

**Rückgabe**: string - Event-ID

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});
~~~

Der Zwilling von datastore.attachEvent() ist [gantt.attachEvent()](api/method/attachevent.md).

---

### callEvent (name, params)
Ruft ein internes Event auf

**Parametere**:
- `name` - (string) - der Name des Events, case-insensitive
- `params` - (Array\<any\>) - ein Array der Event-bezogenen Daten

**Rückgabe**: boolean - true, wenn das Event erfolgreich abgeschlossen wurde

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.callEvent("CustomEvent", [param1, param2]);
~~~

Der Zwilling von datastore.callEvent() ist [gantt.callEvent()](api/method/callevent.md).

---

### detachEvent (id)
Löst einen Handler von einem Event

**Parametere**:
- `id` - (string) - die Event-ID

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const handlerId = store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});

// Listener lösen
store.detachEvent(handlerId);
~~~

Der Zwilling von datastore.detachEvent() ist [gantt.detachEvent()](api/method/detachevent.md).

---

## Events

### onItemLoading (item)
Löst aus, wenn ein Item aus der Datenquelle geladen wird

**Parametere**:
- `item` - (object) - das Objekt eines Items

**Rückgabe**: boolean - Rückgabe false, um die Standardaktion zu verhindern

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemLoading", function(item){
    if(item.valid){ // filter Items beim Laden nach eigener Eigenschaft
        return true;
    }
    return false;
});
~~~

Der Zwilling des onItemLoading-Ereignisses des datastore ist das [onTaskLoading](api/event/ontaskloading.md) Ereignis von Gantt.

---

### onBeforeParse (data)
Löst aus, bevor Daten geparst werden

**Parametere**:
- `data` - (Array\<any\>) - das Array mit den geladenen Daten

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeParse", function(item){
    console.time("StoreParse");
});
store.attachEvent("onParse", function(item){
    console.timeEnd("StoreParse");
});
~~~

Der Zwilling des onBeforeParse-Ereignisses des datastore ist das [onBeforeParse](api/event/onbeforeparse.md) Ereignis von Gantt.

---

### onParse (data)
Löst aus, nachdem die Daten geparst wurden, aber bevor sie gerendert wurden

**Parametere**:
- `data` - (Array\<any\>) - das Array mit den geladenen Daten

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeParse", function(item){
    console.time("StoreParse");
});
store.attachEvent("onParse", function(item){
    console.timeEnd("StoreParse");
});
~~~

Das Zwilling-Ereignis onParse des datastore entspricht dem onParse-Ereignis von Gantt.

---

### onBeforeUpdate (id, item)
Tritt auf, bevor ein Item aktualisiert wird

**Parametere**:
- `id` - (string | number) - die ID des Items
- `item` - (object) - das neue (aktualisierte) Objekt des Items

**Rückgabe**: boolean - Return false, um die Standardaktion zu verhindern

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeUpdate", function(id, item){
    // your code here
    return true;
});
~~~

Die Zwillinge des onBeforeUpdate-Ereignisses des datastore sind die [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md) und [onBeforeLinkUpdate](api/event/onbeforelinkupdate.md) Ereignisse von Gantt.

---

### onAfterUpdate (id, item)
Löst aus, nachdem ein Item aktualisiert wurde

**Parametere**:
- `id` - (string | number) - die ID des Items
- `item` - (object) - das Objekt des Items

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterUpdate", function(id, item){
    // your code here
});
~~~

Die Zwillinge des onAfterUpdate-Ereignisses des datastore sind die [onAfterTaskUpdate](api/event/onaftertaskupdate.md) und [onAfterLinkUpdate](api/event/onafterlinkupdate.md) Ereignisse von Gantt.

---

### onBeforeDelete (id, item)
Löst aus vor der Löschung eines Items

**Parametere**:
- `id` - (string | number) - die ID des Items
- `item` - (object) - das Objekt des Items

**Rückgabe**: boolean - Return false, um die Standardaktion zu verhindern

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeDelete", function(id, item){
    // your code here
    return true;
});
~~~

Die Zwillinge des onBeforeDelete-Ereignisses des datastore sind die [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) und [onBeforeLinkDelete](api/event/onbeforelinkdelete.md) Ereignisse von Gantt.

---

### onAfterDelete (id, item)
Löst aus, nachdem ein Item gelöscht wurde

**Parametere**:
- `id` - (string | number) - die ID des Items
- `item` - (object) - das Objekt des Items

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterDelete", function(id, item){
    // your code here
});
~~~

Die Zwillinge des onAfterDelete-Ereignisses des datastore sind die [onAfterTaskDelete](api/event/onaftertaskdelete.md) und [onAfterLinkDelete](api/event/onafterlinkdelete.md) Ereignisse von Gantt.

---

### onBeforeAdd (id, item)
Löst aus, bevor ein neuer Eintrag zum datastore hinzugefügt wird

**Parametere**:
- `id` - (string | number) - die ID des Items
- `item` - (object) - das Objekt des Items

**Rückgabe**: boolean - Return false, um die Standardaktion zu verhindern

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeAdd", function(id, item){
    // your code here
    return true;
});
~~~

Die Zwillinge des onBeforeAdd-Ereignisses des datastore sind die [onBeforeTaskAdd](api/event/onbeforetaskadd.md) und [onBeforeLinkAdd](api/event/onbeforelinkadd.md) Ereignisse von Gantt.

---

### onAfterAdd (id, item)
Löst aus, nachdem ein Item zum datastore hinzugefügt wurde

**Parametere**:
- `id` - (string | number) - die ID des Items
- `item` - (object) - das Objekt des Items

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterAdd", function(id, item){
    // your code here
});
~~~

Die Zwillinge des onAfterAdd-Ereignisses des datastore sind die [onAfterTaskAdd](api/event/onaftertaskadd.md) und [onAfterLinkAdd](api/event/onafterlinkadd.md) Ereignisse von Gantt.

---

### onIdChange (id, newId)
Löst aus, wenn die ID eines Items geändert wird

**Parametere**:
- `id` - (string | number) - die ID des Items
- `newId` - (string | number) - die neue ID des Items

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onIdChange", function(oldId, newId){
    // your code here
});
~~~

Der Zwilling des onIdChange-Ereignisses des datastore ist das [onTaskIdChange](api/event/ontaskidchange.md) Ereignis von Gantt.

---

### onClearAll ()
Löst aus, nachdem alle Items aus dem datastore entfernt wurden

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onClearAll", function(){
    // your code here
});
~~~

Der Zwilling des onClearAll-Ereignisses des datastore ist das [onClear](api/event/onclear.md) Ereignis von Gantt.

---

### onBeforeStoreUpdate (id, item, action)
Löst aus, bevor der datastore aktualisiert wird

**Parametere**:
- `id` - (string | number | null) - die ID eines Items oder null
- `item` - (object | null) - das Item-Objekt oder null
- `action` - (string | null) - der Aktionstyp ("paint", "move", "add", "delete", null)

**Rückgabe**: boolean - Return false, um die Standardaktion zu verhindern

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeStoreUpdate", function(id, item, action){
    // your code here
    return true;
});
~~~

---

### onStoreUpdated (id, item, action)
Löst aus, nachdem der datastore aktualisiert wurde

**Parametere**:
- `id` - (string | number | null) - die ID eines Items oder null
- `item` - (object | null) - das Item-Objekt oder null
- `action` - (string | null) - der Aktionstyp ("paint", "move", "add", "delete", null)

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onStoreUpdated", function(id, item, action){
    // your code here
});
~~~

---

### onBeforeFilter ()
Löst aus, bevor Filter angewendet werden

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeFilter", function(){
    console.time("filtering");
});
store.attachEvent("onFilter", function(){
    console.timeEnd("filtering");
});
~~~

---

### onFilter ()
Löst aus, nachdem der datastore den Filterstatus aktualisiert hat

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeFilter", function(){
    console.time("filtering");
});
store.attachEvent("onFilter", function(){
    console.timeEnd("filtering");
});
~~~

---

### onFilterItem (id, item)
Löst für jedes Item während des Filtervorgangs aus

**Parametere**:
- `id` - (string | number) - die ID des Items
- `item` - (object) - das Item-Objekt

**Rückgabe**: boolean - Return false, um das Item als nicht sichtbar zu markieren

**Beispiel**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onFilterItem", function(id, item){
    // your code here
    return true;
});
~~~

Der Zwilling des onFilterItem-Ereignisses des datastore ist das [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) Ereignis von Gantt.

---

### onDestroy () {#ondestroy}
Löst aus, nachdem die destructor() Methode aufgerufen wurde

**Beispiel**:
~~~js
const datastore = gantt.createDatastore({
    name: gantt.config.resource_store,
    type: "treeDatastore",
    initItem: function (item) {
        item.parent = item.parent || gantt.config.root_id;
        item[gantt.config.resource_property] = item.parent;
        item.open = true;
        return item;
    }
});

datastore.attachEvent("onDestroy", function(){
    alert("free custom resources");
});

datastore.destructor();
~~~

## Verwandte API
- [createDatastore](api/method/createdatastore.md)
- [getDatastore](api/method/getdatastore.md)
- [treeDatastore](api/other/treedatastore.md)

## Relevante Guides
- [Resource Management](guides/resource-management.md)