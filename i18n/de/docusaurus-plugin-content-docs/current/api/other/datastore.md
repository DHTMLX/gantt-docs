---
sidebar_label: datastore
title: datastore config
description: "eine Sammlung von datastore-Methoden"
---

# datastore

### Description

@short: Eine Sammlung von datastore-Methoden

@signature: datastore: DatastoreMethods

### Details

**_Hinweis_**, Tasks und Links sollten über die Standard-[API von Gantt](api/api-overview.md) verwaltet werden. Direkte Änderungen an Tasks oder Links innerhalb des datastore können unvorhergesehene Probleme verursachen. Datastores sind hauptsächlich für Ressourcen oder andere benutzerdefinierte Objekte vorgesehen.

Sie können einen neuen datastore mit der Methode [createDatastore](api/method/createdatastore.md) erstellen. <br/>
Das **datastore**-Objekt bietet die folgenden [Methoden](#methods) und [Events](#events):

### Methoden {#methods}

<ul id="parse"><li>
  <b>parse (data): void</b> - lädt Daten aus einem Array
  <ul>
  <li><b><i>data</i></b> - (<i>Array&lt;object&gt;</i>) - die zu ladenden Daten</li>
  </ul></li>
</ul>

<ul>
~~~js
gantt.$resourcesStore.parse([
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
~~~
<br/>
:::note
sample
[Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
 
:::
<br/>

<br/>
 <i>datastore.parse() ergänzt [gantt.parse()](api/method/parse.md).</i>
  <br/>
 <i>Löst die Events <a href="#onBeforeParse">onBeforeParse</a>, <a href="#onItemLoading">onItemLoading</a>, <a href="#onParse">onParse</a> und <a href="#onStoreUpdated">onStoreUpdated</a> aus.</i>
</ul>


<ul id="getItem">
  <li>
  <b>getItem (id): object | void</b> - ruft das Element anhand seiner id ab
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die id des Elements</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var resource = store.getItem(resourceId);
~~~
<br/>
:::note
sample
[Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
 
:::
<br/>
<br/>
 <i>datastore.getItem() entspricht [gantt.getTask()](api/method/gettask.md) und [gantt.getLink()](api/method/getlink.md).</i>
</ul>

<ul id="updateItem">
  <li>
  <b>updateItem (id, item): void</b> - aktualisiert das angegebene Element
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die id des Elements</li>
  <li><b><i>item?</i></b> - (<i>object</i>) - ein Objekt mit aktualisierten Eigenschaften</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var resource = store.getItem(resourceId);
resource.text = "modified";
store.updateItem(resourceId);
// oder
store.updateItem(resourceId, { text: "modified" });
~~~
<br/>
<br/>
 <i>datastore.updateItem() ist ähnlich zu [gantt.updateTask()](api/method/updatetask.md) und [gantt.updateLink()](api/method/updatelink.md).</i>
<br/>
 <i>Löst die Events <a href="#onBeforeUpdate">onBeforeUpdate</a>, <a href="#onAfterUpdate">onAfterUpdate</a> und <a href="#onStoreUpdated">onStoreUpdated</a> aus.</i>

</ul>

<ul id="removeItem">
  <li>
  <b>removeItem (id): void</b> - löscht das angegebene Element
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die id des Elements</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.removeItem(resourceId);
~~~
<br/>
<br/>
 <i>datastore.removeItem() entspricht [gantt.deleteTask()](api/method/deletetask.md) und [gantt.deleteLink()](api/method/deletelink.md).</i>
<br/>
 <i>Löst die Events <a href="#onBeforeDelete">onBeforeDelete</a>, <a href="#onAfterDelete">onAfterDelete</a> und <a href="#onStoreUpdated">onStoreUpdated</a> aus.</i>
</ul>

<ul id="isVisible">
  <li>
  <b>isVisible (id): boolean</b> - bestimmt, ob das angegebene Element sichtbar oder durch Filter ausgeblendet ist
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die id des Elements</li>
  </ul>
  Gibt <i>true</i> zurück, wenn das Element sichtbar ist, sonst <i>false</i>.
  </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
if(store.isVisible(resourceId)){
    console.log(resourceId);
}
~~~
<br/>
<br/>
 <i>datastore.isVisible() ist vergleichbar mit [gantt.isTaskVisible()](api/method/istaskvisible.md).</i>
</ul>

<ul id="getVisibleItems">
  <li>
  <b>getVisibleItems (): Array&lt;object&gt;</b> - gibt ein Array der sichtbaren Elemente zurück
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var items = store.getVisibleItems();
~~~
<br/>
</ul>


<ul id="addItem">
  <li>
  <b>addItem (item, index): number | string</b> - fügt dem datastore ein neues Element hinzu
  <ul><li><b><i>item</i></b> - (<i>object</i>) - das Element-Objekt</li><li><b><i>index?</i></b> - (<i>number</i>) - die Position, an der das Element eingefügt wird (0 oder größer)</li></ul>
  Gibt die id des hinzugefügten Elements zurück.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var itemId = store.addItem({
    text: "Unassigned",
    parent:4
});
~~~
<br/>
<br/>
 <i>datastore.addItem() entspricht [gantt.addTask()](api/method/addtask.md) und [gantt.addLink()](api/method/addlink.md).</i>
<br/>
 <i>Löst die Events <a href="#onBeforeAdd">onBeforeAdd</a>, <a href="#onAfterAdd">onAfterAdd</a> und <a href="#onStoreUpdated">onStoreUpdated</a> aus.</i>
</ul>

<ul id="changeId">
  <li>
  <b>changeId (oldId, newId): void</b> - aktualisiert die id eines Elements
  <ul><li><b><i>oldId</i></b> - (<i>string | number</i>) - die aktuelle id des Elements</li><li><b><i>newId</i></b> - (<i>string | number</i>) - die neue zuzuweisende id</li></ul>
</li>
</ul>

<ul>

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);

var itemId = store.addItem({
    text: "Unassigned",
    parent:4
});

// itemId ist eine temporäre clientseitige id für das neue Element
// aktualisieren Sie den Client mit der neuen id, sobald sie in der Datenbank gespeichert ist:

store.changeId(itemId, "databaseId");
~~~
<br/>
<br/>
 <i>datastore.changeId() ist ähnlich zu [gantt.changeTaskId()](api/method/changetaskid.md) und [gantt.changeLinkId()](api/method/changelinkid.md).</i>
 <br/>
 <i>Löst das Event <a href="#onIdChange">onIdChange</a> aus.</i>
</ul>


<ul id="exists">
  <li>
  <b>exists (id): boolean</b> - prüft, ob das angegebene Element im datastore existiert
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die id des Elements</li>
  </ul>
  Gibt <i>true</i> zurück, wenn das Element existiert, sonst <i>false</i>.
</li>
</ul>

<ul>

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);

if(store.exists(resourceId)){
    console.log(resourceId);
}
~~~
<br/>
<br/>
 <i>datastore.exists() entspricht [gantt.isTaskExists()](api/method/istaskexists.md) und [gantt.isLinkExists()](api/method/islinkexists.md).</i>
</ul>


<ul id="move">
  <li>
  <b>move (sindex, tindex): void</b> - verschiebt ein Element an eine neue Position
  <ul>
  <li><b><i>sindex</i></b> - (<i>number</i>) - der aktuelle Index des Elements</li>
  <li><b><i>tindex</i></b> - (<i>number</i>) - der Zielindex, an den das Element verschoben wird</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);

// tausche zwei Elemente
var idA = 1;
var idB = 5;
var indexA = store.getIndexById(idA);
var indexB = store.getIndexById(idB);
store.move(indexB, indexA);

indexA = store.getIndexById(idA);
store.move(indexA, indexB);
~~~
<br/>
<br/>
  <i>datastore.move() ergänzt [gantt.moveTask()](api/method/movetask.md).</i>
  <br/>
  <i>Löst das Event <a href="#onStoreUpdated">onStoreUpdated</a> aus.</i>
</ul>

<ul>
  <li>
  <b>clearAll (): void</b> - leert den datastore
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.clearAll();
~~~
<br/>
<br/>
 <i>datastore.clearAll() entspricht [gantt.clearAll()](api/method/clearall.md).</i>
  <br/>
 <i>Löst die Events <a href="#onClearAll">onClearAll</a>, <a href="#onBeforeStoreUpdate">onBeforeStoreUpdate</a> und <a href="#onStoreUpdated">onStoreUpdated</a> aus.</i>

</ul>

<ul id="silent">
  <li>
  <b>silent (callback): void</b> - führt Code aus, ohne datastore API-Events auszulösen
  <ul>
  <li><b><i>callback</i></b> - (<i>Function</i>) - die Callback-Funktion</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.silent(function(){
    store.eachItem(function(item){
        item.text += " modified";
        store.updateItem(item.id);
    });
});
store.refresh();
~~~
<br/>
<br/>
 <i>datastore.silent() ergänzt [gantt.silent()](api/method/silent.md).</i>
</ul>

<ul id="refresh">
  <li>
  <b>refresh (id): void</b> - löst das Neuzeichnen der Events des angegebenen Datensatzes aus und wendet Filter an
  <ul>
  <li><b><i>id?</i></b> - (<i>string | number</i>) - optional, die id des Datensatzes</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.refresh(itemId); // zeichnet ein bestimmtes Element neu
store.refresh(); // zeichnet alle Elemente neu
~~~
<br/>
<br/>
 <i>datastore.refresh() entspricht [gantt.refreshTask()](api/method/refreshtask.md) und [gantt.refreshLink()](api/method/refreshlink.md).</i>
  <br/>
 <i>Löst die Events <a href="#onBeforeStoreUpdate">onBeforeStoreUpdate</a>, <a href="#onBeforeFilter">onBeforeFilter</a>, <a href="#onFilterItem">onFilterItem</a>, <a href="#onFilter">onFilter</a> und <a href="#onStoreUpdated">onStoreUpdated</a> aus.</i>

</ul>

<ul id="count">
  <li>
  <b>count (): number</b> - gibt die Gesamtanzahl der aktuell im datastore geladenen Elemente zurück
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onParse", function(){
    alert(store.count() + " items loaded");
});
~~~
<br/>
<br/>
 <i>datastore.count() entspricht [gantt.getTaskCount()](api/method/gettaskcount.md) und [gantt.getLinkCount()](api/method/getlinkcount.md).</i>
</ul>

<ul id="countVisible">
  <li>
  <b>countVisible (): number</b> - gibt die Anzahl der aktuell sichtbaren Elemente zurück
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
alert(store.countVisible() + " items are visible");
~~~
<br/>
<br/>
 <i>datastore.countVisible() entspricht [gantt.getVisibleTaskCount()](api/method/getvisibletaskcount.md).</i>
</ul>

<ul id="eachItem">
  <li>
  <b>eachItem (callback): void</b> - iteriert über alle Elemente im datastore
  <ul>
  <li><b><i>callback</i></b> - (<i>Function</i>) - die Callback-Funktion</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);

var searchItems = [];
store.eachItem(function(item){
    if(!item.value){
        searchItems.push(item);
    }
});
~~~
<br/>
<br/>
 <i>datastore.eachItem() entspricht [gantt.eachTask()](api/method/eachtask.md).</i>
</ul>

<ul id="filter">
  <li>
  <b>filter (): void</b> - wendet Filter an und aktualisiert die Liste der sichtbaren Elemente
</li>
Normalerweise wird diese Methode automatisch von <b>store.refresh()</b> aufgerufen.
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.filter();
~~~
<br/>
</ul>

<ul id="sort"><li>
  <b>sort (field, desc, parent, silent): void</b> - sortiert Elemente im resource grid
  <ul>
  <li><b><i>field</i></b> - (<i>string | Function</i>) - der Spaltenname zum Sortieren oder eine benutzerdefinierte Sortierfunktion</li>
  <li><b><i>desc?</i></b> - (<i>boolean</i>) - Sortierrichtung: <i>true</i> für absteigend, <i>false</i> für aufsteigend (Standard ist <i>false</i>)</li>
  <li><b><i>parent?</i></b> - (<i>string | number</i>) - id des übergeordneten Elements, um die Sortierung auf dessen Zweig zu beschränken</li>
  <li><b><i>silent?</i></b> - (<i>boolean</i>) - ob das Rendering nach dem Sortieren übersprungen werden soll</li>
  </ul>
</li></ul>

<ul>
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

// Sortierrichtung nach Spalte umschalten
var resourceSortDirection = false;
function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~
<br/>

Alternativ können Sie eine benutzerdefinierte Sortierfunktion bereitstellen:

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
<br/>
 <i>datastore.sort() ergänzt [gantt.sort()](api/method/sort.md).</i>
</ul>

<ul id="getIndexRange">
  <li>
  <b>getIndexRange (from, to): Array&lt;object&gt;</b> - gibt Elemente zwischen den angegebenen Indizes zurück
  <ul>
  <li><b><i>from</i></b> - (<i>number</i>) - Startposition</li>
  <li><b><i>to</i></b> - (<i>number</i>) - Endposition</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var itemsInViewPort = store.getIndexRange(5, 10); // Elemente vom 5. bis 10.
~~~
<br/>
</ul>

<ul id="getItems">
  <li>
  <b>getItems (): Array&lt;object&gt;</b> - gibt alle Elemente im datastore zurück
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var items = store.getItems();
~~~
<br/>
<br/>
 <i>datastore.getItems() entspricht [getTasgantt.getTaskByTime()kByTime](api/method/gettaskbytime.md) und [gantt.getLinks()](api/method/getlinks.md).</i>
</ul>

<ul id="getIdByIndex">
  <li>
        <b>getIdByIndex (index): string | number | void</b> - gibt die id des Elements am angegebenen Index zurück oder `undefined`, wenn keines vorhanden ist
  <ul>
  <li><b><i>index</i></b> - (<i>number</i>) - die Position des Elements</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var firstItem = store.getIdByIndex(0);
~~~
<br/>
<br/>
 <i>datastore.getIdByIndex() entspricht [gantt.getTaskByIndex()](api/method/gettaskbyindex.md).</i>
</ul>

<ul id="getIndexById">
  <li>
        <b>getIndexById (id): number</b> - gibt den Index des Elements anhand seiner id zurück oder `-1`, wenn nicht gefunden
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die id des Elements</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var itemIndex = store.getIndexById(5);
~~~
<br/>
<br/>
 <i>datastore.getIndexById() entspricht [gantt.getTaskIndex()](api/method/gettaskindex.md).</i>
</ul>

<ul id="getFirst">
  <li>
  <b>getFirst (): string | number | null</b> - gibt die id des ersten Elements im datastore zurück
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var firstId = store.getFirst();
~~~
<br/>
<br/>
</ul>

<ul id="getLast">
  <li>
  <b>getLast (): string | number | null</b> - gibt die id des letzten Elements im datastore zurück
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var lastId = store.getLast();
~~~
<br/>
</ul>

<ul id="getNext">
  <li>
  <b>getNext (id): string | number | null</b> - gibt die id des Elements zurück, das dem angegebenen folgt
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die id des aktuellen Elements</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var firstId = store.getFirst();
var secondId = store.getNext(firstId);
~~~
<br/>
<br/>
 <i>datastore.getNext() entspricht [gantt.getNext()](api/method/getnext.md).</i>
</ul>

<ul id="getPrev">
  <li>
  <b>getPrev (id): string | number | null</b> - gibt die id des Elements zurück, das dem angegebenen vorausgeht
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die id des aktuellen Elements</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var prevId = store.getPrev(itemId);
~~~
<br/>
<br/>
 <i>datastore.getPrev() entspricht [gantt.getPrev()](api/method/getprev.md).</i>
</ul>

<ul id="destructor">
  <li>
  <b>destructor (): void</b> - leert den datastore und entfernt alle Event-Handler; der datastore ist danach nicht mehr verwendbar
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.destructor();
~~~
<br/>
<br/>
 <i>datastore.destructor() entspricht [gantt.destructor()](api/method/destructor.md).</i>
</ul>


<ul id="attachEvent">
  <li>
  <b>attachEvent (name, handler, settings): string</b> - hängt einen Handler an ein internes datastore-Event an
  <ul>
  <li><b><i>name</i></b> - (<i>string</i>) - Event-Name, case-insensitive</li>
  <li><b><i>handler</i></b> - (<i>Function</i>) - die Handler-Funktion</li>
  <li><b><i>settings?</i></b> - (<i>object</i>) - optionales Einstellungsobjekt für den Event-Handler</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});
~~~
<br/>
<br/>
 <i>datastore.attachEvent() entspricht [gantt.attachEvent()](api/method/attachevent.md).</i>
</ul>

<ul id="callEvent">
  <li>
  <b>callEvent (name, params): boolean</b> - löst ein internes Event aus
  <ul>
  <li><b><i>name</i></b> - (<i>string</i>) - Event-Name, case-insensitive</li>
  <li><b><i>params</i></b> - (<i>Array&lt;any&gt;</i>) - Array mit Event-bezogenen Daten</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.callEvent("CustomEvent", [param1, param2]);
~~~
<br/>
<br/>
 <i>datastore.callEvent() entspricht [gantt.callEvent()](api/method/callevent.md).</i>
</ul>

<ul id="detachEvent">
  <li>
  <b>detachEvent (id): void</b> - entfernt einen zuvor angehängten Event-Handler
  <ul>
  <li><b><i>id</i></b> - (<i>string</i>) - die id des Event-Handlers</li>
  </ul>
</li>
</ul>

<ul>

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var handlerId = store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});

// entferne den Event-Handler
store.detachEvent(handlerId);
~~~
<br/>
<br/>
 <i>datastore.detachEvent() entspricht [gantt.detachEvent()](api/method/detachevent.md).</i>
</ul>


### Events {#events} 

<ul id="onItemLoading">
  <li>
  <b>onItemLoading (item)</b> - wird ausgelöst, wenn ein Element aus der Datenquelle geladen wird
  <ul>
  <li><b><i>item</i></b> - (<i>object</i>) - das Element-Objekt</li>
  </ul>
  Rückgabe von <i>false</i> verhindert das Standardverhalten des Events, ansonsten <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemLoading", function(item){
    if(item.valid){ // filtert Elemente während des Ladens basierend auf einer benutzerdefinierten Eigenschaft
        return true;
    }
    return false;
});
~~~
<br/>
<br/>
 <i>datastore's onItemLoading-Event entspricht dem Gantt-Event [onTaskLoading](api/event/ontaskloading.md).</i>
</ul>

<ul id="onBeforeParse">
  <li>
  <b>onBeforeParse (data)</b> - wird vor Beginn des Datenparsens ausgelöst
  <ul>
  <li><b><i>data</i></b> - (<i>Array &lt;any&gt;</i>) - das geladene Datenarray</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeParse", function(item){
    console.time("StoreParse");
});
store.attachEvent("onParse", function(item){
    console.timeEnd("StoreParse");
});
~~~
<br/>
<br/>
 <i>datastore's onBeforeParse-Event entspricht dem Gantt-Event [onBeforeParse](api/event/onbeforeparse.md).</i>
</ul>

<ul id="onParse">
  <li>
  <b>onParse (data)</b> - wird nach Abschluss des Parsens, aber vor dem Rendern im Gantt-Diagramm ausgelöst
  <ul>
  <li><b><i>data</i></b> - (<i>Array &lt;any&gt;</i>) - das geladene Datenarray</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeParse", function(item){
    console.time("StoreParse");
});
store.attachEvent("onParse", function(item){
    console.timeEnd("StoreParse");
});
~~~
<br/>
<br/>
 <i>datastore's onParse-Event entspricht dem Gantt-Event [onParse](api/event/onparse.md).</i>
</ul>

<ul id="onBeforeUpdate">
  <li>
  <b>onBeforeUpdate (id, item)</b> - wird ausgelöst, bevor ein Element aktualisiert wird
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die id des Elements</li>
  <li><b><i>item</i></b> - (<i>object</i>) - das aktualisierte Element-Objekt</li>
  </ul>
  Rückgabe von <i>false</i> verhindert die Standardaktion des Events, ansonsten <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeUpdate", function(id, item){
    // eigener Code hier
    return true;
});
~~~
<br/>
<br/>
 <i>datastore's onBeforeUpdate-Event entspricht den Gantt-Events [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md) und [onBeforeLinkUpdate](api/event/onbeforelinkupdate.md).</i>
</ul>

<ul id="onAfterUpdate">
  <li>
  <b>onAfterUpdate (id, item)</b> - wird ausgelöst, nachdem ein Element aktualisiert wurde
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die id des Elements</li>
  <li><b><i>item</i></b> - (<i>object</i>) - das aktualisierte Element-Objekt</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterUpdate", function(id, item){
    // eigener Code hier
});
~~~
<br/>
<br/>
 <i>datastore's onAfterUpdate-Event entspricht den Gantt-Events [onAfterTaskUpdate](api/event/onaftertaskupdate.md) und [onAfterLinkUpdate](api/event/onafterlinkupdate.md).</i>
</ul>

<ul id="onBeforeDelete">
  <li>
  <b>onBeforeDelete (id, item)</b> - wird ausgelöst, bevor ein Element gelöscht wird
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die id des Elements</li>
  <li><b><i>item</i></b> - (<i>object</i>) - das Element-Objekt</li>
  </ul>
  Rückgabe von <i>false</i> verhindert die Standardaktion des Events, ansonsten <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeDelete", function(id, item){
    // eigener Code hier
    return true;
});
~~~
<br/>
<br/>
 <i>datastore's onBeforeDelete-Event entspricht den Gantt-Events [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) und [onBeforeLinkDelete](api/event/onbeforelinkdelete.md).</i>
</ul>

<ul id="onAfterDelete">
  <li>
  <b>onAfterDelete (id, item)</b> - wird ausgelöst, nachdem ein Element gelöscht wurde
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die id des Elements</li>
  <li><b><i>item</i></b> - (<i>object</i>) - das Element-Objekt</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterDelete", function(id, item){
    // eigener Code hier
});
~~~
<br/>
<br/>
 <i>datastore's onAfterDelete-Event entspricht den Gantt-Events [onAfterTaskDelete](api/event/onaftertaskdelete.md) und [onAfterLinkDelete](api/event/onafterlinkdelete.md).</i>
</ul>

<ul id="onBeforeAdd">
  <li>
  <b>onBeforeAdd (id, item)</b> - wird ausgelöst, bevor ein neues Element zum datastore hinzugefügt wird
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die id des Elements</li>
  <li><b><i>item</i></b> - (<i>object</i>) - das Element-Objekt</li>
  </ul>
  Rückgabe von <i>false</i> verhindert die Standardaktion des Events, ansonsten <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeAdd", function(id, item){
    // eigener Code hier
    return true;
});
~~~
<br/>
<br/>
 <i>datastore's onBeforeAdd-Event entspricht den Gantt-Events [onBeforeTaskAdd](api/event/onbeforetaskadd.md) und [onBeforeLinkAdd](api/event/onbeforelinkadd.md).</i>
</ul>

<ul id="onAfterAdd">
  <li>
  <b>onAfterAdd (id, item)</b> - wird ausgelöst, nachdem ein neues Element zum datastore hinzugefügt wurde
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die id des Elements</li>
  <li><b><i>item</i></b> - (<i>object</i>) - das Element-Objekt</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterAdd", function(id, item){
    // eigener Code hier
});
~~~
<br/>
<br/>
 <i>datastore's onAfterAdd-Event entspricht den Gantt-Events [onAfterTaskAdd](api/event/onaftertaskadd.md) und [onAfterLinkAdd](api/event/onafterlinkadd.md).</i>
</ul>

<ul id="onIdChange">
  <li>
  <b>onIdChange (id, newId)</b> - wird ausgelöst, wenn sich die id eines Elements ändert
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die alte id</li>
  <li><b><i>newId</i></b> - (<i>string | number</i>) - die neue id</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onIdChange", function(oldId, newId){
    // eigener Code hier
});
~~~
<br/>
<br/>
 <i>datastore's onIdChange-Event entspricht dem Gantt-Event [onTaskIdChange](api/event/ontaskidchange.md).</i>
</ul>

<ul id="onClearAll">
  <li>
  <b>onClearAll ()</b> - wird ausgelöst, nachdem alle Elemente aus dem datastore entfernt wurden
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onClearAll", function(){
    // eigener Code hier
});
~~~
<br/>
 <i>datastore's onClearAll-Event entspricht dem Gantt-Event [onClear](api/event/onclear.md).</i>
</ul>


<ul id="onBeforeStoreUpdate">
  <li>
  <b>onBeforeStoreUpdate (id, item, action)</b> - wird ausgelöst, bevor der datastore aktualisiert wird
  <ul>
  <li><b><i>id</i></b> - (<i>string | number | null</i>) - die id des Elements oder null</li>
  <li><b><i>item</i></b> - (<i>object | null</i>) - das Element-Objekt oder null</li>
  <li><b><i>action</i></b> - (<i>string | null</i>) - der Aktionstyp ("paint", "move", "add", "delete", null)</li>
  </ul>
  Rückgabe von <i>false</i> verhindert die Standardaktion des Events, ansonsten <i>true</i>.
  <br/>
        Dieses Event signalisiert, dass datastore-Elemente neu gezeichnet werden müssen. Ein `null`-Wert bedeutet, dass der gesamte datastore aktualisiert wird.

</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeStoreUpdate", function(id, item, action){
    // eigener Code hier
    return true;
});
~~~
<br/>
</ul>


<ul id="onStoreUpdated">
  <li>
  <b>onStoreUpdated (id, item, action)</b> - wird ausgelöst, nachdem der datastore aktualisiert wurde
  <ul>
  <li><b><i>id</i></b> - (<i>string | number | null</i>) - die id des Elements oder null</li>
  <li><b><i>item</i></b> - (<i>object | null</i>) - das Element-Objekt oder null</li>
  <li><b><i>action</i></b> - (<i>string | null</i>) - der Aktionstyp ("paint", "move", "add", "delete", null)</li>
  </ul>
        Dieses Event signalisiert, dass datastore-Elemente neu gezeichnet werden müssen. Ein `null`-Wert bedeutet, dass der gesamte datastore aktualisiert wird.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onStoreUpdated", function(id, item, action){
    // eigener Code hier
});
~~~
<br/>
</ul>


<ul id="onBeforeFilter">
  <li>
  <b>onBeforeFilter ()</b> - wird ausgelöst, bevor Filter angewendet werden
  </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeFilter", function(){
    console.time("filtering");
});
store.attachEvent("onFilter", function(){
    console.timeEnd("filtering");
});
~~~
<br/>
</ul>

<ul id="onFilter">
  <li>
  <b>onFilter ()</b> - wird ausgelöst, nachdem Filter die sichtbaren Elemente aktualisiert haben
  </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeFilter", function(){
    console.time("filtering");
});
store.attachEvent("onFilter", function(){
    console.timeEnd("filtering");
});
~~~
<br/>
</ul>

<ul id="onFilterItem">
  <li>
        <b>onFilterItem (id, item)</b> - wird für jedes Element während des Filtervorgangs ausgelöst; Rückgabe von `false` blendet das Element aus
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die id des Elements</li>
  <li><b><i>item</i></b> - (<i>object</i>) - das Element-Objekt</li>
  </ul>
  Rückgabe von <i>false</i> blendet das Element aus, ansonsten <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onFilterItem", function(id, item){
    // eigener Code hier
    return true;
});
~~~
<br/>
 <i>datastore's onFilterItem-Event entspricht dem Gantt-Event [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md).</i>
</ul>

<ul id="ondestroy">
  <li>
  <b>onDestroy ()</b> - wird ausgelöst, nachdem die destructor()-Methode des datastore aufgerufen wurde
</li>
</ul>
<ul>
~~~js
var datastore = gantt.createDatastore({
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
<br/>
</ul>

### Related API
- [createDatastore](api/method/createdatastore.md)
- [getDatastore](api/method/getdatastore.md)
- [treeDatastore](api/other/treedatastore.md)

### Related Guides
- [Ressourcenmanagement](guides/resource-management.md)

