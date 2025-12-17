---
sidebar_label: treeDatastore
title: treeDatastore config
description: "eine Sammlung von treeDatastore-Methoden"
---

# treeDatastore

### Description

@short: Eine Sammlung von treeDatastore-Methoden

@signature: treeDatastore: TreeDatastoreMethods

### Details

**_Hinweis_**, Aufgaben (Tasks) und Verknüpfungen (Links) sollten über die Standard-[API von Gantt](api/api-overview.md) aktualisiert werden. Das direkte Ändern von Aufgaben oder Verknüpfungen innerhalb des Datastores kann zu unerwartetem Verhalten führen. Datastores sind hauptsächlich für Ressourcen oder andere benutzerdefinierte Objekte vorgesehen.

Sie können einen neuen Datastore mit der Methode [createDatastore](api/method/createdatastore.md) erstellen.

TreeDatastore erbt von [Datastore](api/other/datastore.md) und umfasst alle dessen Methoden.
Die erweiterte API des **treeDatastore**-Objekts bietet folgende [Methoden](#methods) und [Events](#events):

### Methoden {#methods}

<ul><li>
  <b>move (sid, tindex, parent): boolean | void</b> - verschiebt ein Element an eine neue Position oder zu einem neuen Elternteil
  <ul>
  <li><b><i>sid</i></b> - (<i>string | number</i>) - die ID des zu verschiebenden Elements</li>
  <li><b><i>tindex</i></b> - (<i>number</i>) - der Zielindex innerhalb des Zweigs, an dem das Element eingefügt wird</li>
  <li><b><i>parent?</i></b> - (<i>string | number</i>) - die ID des neuen Elternteils. Falls angegeben, ist <b>tindex</b> relativ zu diesem Elternzweig</li>
  </ul>
  Gibt <i>false</i> zurück, wenn die Verschiebung durch <b>onBeforeItemMove</b> abgebrochen wird, sonst <i>undefined</i>.
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

store.move(6, -1, 2);// verschiebt 'John' von 'QA' zu 'Development'
~~~

<br/>
<br/>
 <i>Das Gegenstück zu treeDatastore.move() ist [gantt.moveTask()](api/method/movetask.md).</i>
  <br/>
  <i>Diese Methode löst die Events [onBeforeItemMove](#onBeforeItemMove), [onAfterItemMove](#onAfterItemMove) sowie alle Events im Zusammenhang mit der [refresh](api/other/datastore.md#refresh)-Methode aus.</i>

</ul>

<ul><li>
  <b>getBranchIndex (id): number</b> - ermittelt den Index eines Elements innerhalb seines Zweigs
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des Elements</li>
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

store.getBranchIndex(8);
// -> 1
~~~
<br/>
<br/>
 <i>Das Gegenstück zu treeDatastore.getBranchIndex() ist [gantt.getTaskIndex()](api/method/gettaskindex.md)</i>
</ul>


<ul><li>
  <b>hasChild (id): number | void</b> - überprüft, ob das angegebene Element Kind-Elemente hat
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des Elements</li>
  </ul>
  Gibt die <i>Anzahl</i> der Kind-Elemente zurück, falls vorhanden, oder <i>undefined</i>, wenn keine vorhanden sind.

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

store.hasChild(1);
// -> true

store.hasChild(9);
// -> false
~~~
<br/>
<br/>
 <i>Das Gegenstück zu treeDatastore.hasChild() ist [gantt.hasChild()](api/method/haschild.md).</i>
</ul>

<ul><li>
  <b>getChildren (id): Array&lt;number | string | object&gt;</b> - holt die direkten Kind-Elemente eines gegebenen Elternzweigs
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des Elternzweigs</li>
  </ul>
  Gibt ein Array mit den IDs der Kind-Elemente zurück.
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

store.getChildren(3);
// -> [9, 10]

store.getChildren(9);
// -> [0]
~~~
<br/>
<br/>
 <i>Das Gegenstück zu treeDatastore.getChildren() ist [getChildren](api/method/getchildren.md).</i>
</ul>

<ul><li>
  <b>isChildOf (childId, parentId): boolean</b> - prüft, ob ein Element ein Kind eines anderen Elements ist
  <ul>
  <li><b><i>childId</i></b> - (<i>string | number</i>) - die ID des potenziellen Kind-Elements</li>
  <li><b><i>parentId</i></b> - (<i>string | number</i>) - die ID des potenziellen Eltern-Elements</li>
  </ul>
  Gibt <i>true</i> zurück, wenn das Element ein Kind des angegebenen Elternteils ist, sonst <i>false</i>.
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

store.isChildOf(9, 3);
// -> true

store.getChildren(9, 2);
// -> false
~~~
<br/>
<br/>
 <i>Das Gegenstück zu treeDatastore.isChildOf() ist [gantt.isChildOf()](api/method/ischildof.md).</i>
</ul>

<ul><li>
  <b>getSiblings (id): Array&lt;number | string | object&gt;</b> - holt die Geschwister des angegebenen Elements, einschließlich des Elements selbst
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des Elements</li>
  </ul>
  Gibt ein Array mit den IDs der Geschwister-Elemente zurück.
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

store.getSiblings(1);
// -> [1,2,3,4]

store.getSiblings(6);
// -> [6]
~~~
<br/>
<br/>
 <i>Das Gegenstück zu treeDatastore.getSiblings() ist [gantt.getSiblings()](api/method/getsiblings.md).</i>
</ul>

<ul><li>
  <b>getNextSibling (id): number | string | null</b> - gibt die ID des nächsten Geschwisters auf derselben Ebene zurück
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des aktuellen Elements</li>
  </ul>
  Gibt die ID des nächsten Geschwisters zurück oder <i>null</i>, wenn kein weiteres Geschwister existiert.
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

store.getNextSibling(9);
// -> 10

store.getNextSibling(10);
// -> null
~~~
<br/>
<br/>
 <i>Das Gegenstück zu treeDatastore.getNextSibling() ist [gantt.getNextSibling()](api/method/getnextsibling.md).</i>
</ul>

<ul><li>
  <b>getPrevSibling (id): number | string | null</b> - gibt die ID des vorherigen Geschwisters auf derselben Ebene zurück
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des aktuellen Elements</li>
  </ul>
  Gibt die ID des vorherigen Geschwisters zurück oder <i>null</i>, wenn kein weiteres Geschwister existiert.
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

store.getPrevSibling(9);
// -> null

store.getPrevSibling(10);
// -> 9
~~~
<br/>
<br/>
 <i>Das Gegenstück zu treeDatastore.getPrevSibling() ist [gantt.getPrevSibling()](api/method/getprevsibling.md).</i>
</ul>

<ul><li>
  <b>getParent (id): number| string</b> - gibt die ID des Elternelements zurück oder 0, falls keines existiert
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des Elements</li>
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

store.getParent(9);
// -> 3

store.getParent(1);
// -> 0
~~~
<br/>
<br/>
 <i>Das Gegenstück zu treeDatastore.getParent() ist [gantt.getParent()](api/method/getparent.md).</i>
</ul>

<ul><li>
  <b>calculateItemLevel (item): number</b> - bestimmt die Verschachtelungsebene eines Elements
  <ul>
  <li><b><i>item</i></b> - (<i>object</i>) - das Element-Objekt</li>
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

store.calculateItemLevel(store.getItem(9));
// -> 1

store.calculateItemLevel(store.getItem(1));
// -> 0
~~~
<br/>
<br/>
 <i>Das Gegenstück zu treeDatastore.calculateItemLevel() ist [gantt.calculateTaskLevel()](api/method/calculatetasklevel.md).</i>
</ul>

<ul><li>
        <b>setParent (item, newParentId): void</b> - weist einem Element einen neuen Elternteil zu, indem die Eigenschaft aktualisiert wird, die in der `parentProperty`-Konfiguration definiert ist (Standard ist "item.parent").
  <ul>
  <li><b><i>item</i></b> - (<i>object</i>) - das Element-Objekt</li>
  <li><b><i>newParentId</i></b> - (<i>string | number | null</i>) - die ID des neuen Elternteils</li>
  </ul>
</li></ul>

<ul>

:::note

Um ein Element korrekt zu einem anderen Elternteil zu verschieben, verwenden Sie **treeDatastore.move()**. Die Methode **setParent()** aktualisiert nur die Eigenschaft des Elements und beeinflusst nicht die interne Baumstruktur.
 
:::

~~~js
gantt.createDatastore({
    name: gantt.config.resource_store,
    type: "treeDatastore",
    parentProperty: "parent", //
    initItem: function (item) {
        item.parent = item.parent || gantt.config.root_id;
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
<br/>
<br/>
 <i>Das Gegenstück zu treeDatastore.setParent() ist [gantt.setParent()](api/method/setparent.md).</i>
</ul>

<ul><li>
  <b>eachItem (callback, parentId): void</b> - durchläuft alle Kind-Elemente eines gegebenen Elements
  <ul>
  <li><b><i>callback</i></b> - (<i>Function</i>) - die Funktion, die für jedes Element ausgeführt wird</li>
  <li><b><i>parentId?</i></b> - (<i>string | number</i>) - die Eltern-ID, ab der gestartet wird</li>
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

store.eachItem(function(item){
    console.log(item.text);
});
~~~
<br/>
<br/>
 <i>Das Gegenstück zu treeDatastore.eachItem() ist [gantt.eachTask()](api/method/eachtask.md).</i>
</ul>

<ul><li>
  <b>eachParent (callback, startItem): void</b> - iteriert über alle Elternelemente eines gegebenen Elements
  <ul>
  <li><b><i>callback</i></b> - (<i>Function</i>) - die Funktion, die für jeden Elternteil ausgeführt wird</li>
  <li><b><i>startItem</i></b> - (<i>string | number</i>) - die ID des Elements, dessen Eltern iteriert werden</li>
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

store.eachParent(function(item){
    console.log(item.text);
}, 10);
// -> "Sales"
~~~
<br/>
<br/>
 <i>Das Gegenstück zu treeDatastore.eachParent() ist [gantt.eachParent()](api/method/eachparent.md).</i>
</ul>

<ul><li>
  <b>open (id): void</b> - erweitert den Zweig mit der angegebenen ID
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des Zweigs</li>
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

store.open(1);
~~~
<br/>
<br/>
 <i>Das Gegenstück zu treeDatastore.open() ist [gantt.open()](api/method/open.md).</i>
<i>Dies löst das Event [onItemOpen](#onItemOpen) aus.</i>
</ul>

<ul><li>
  <b>close (id): void</b> - klappt den Zweig mit der angegebenen ID zusammen
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des Zweigs</li>
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

store.close(1);
~~~
<br/>
<br/>
 <i>Das Gegenstück zu treeDatastore.close() ist [gantt.close()](api/method/close.md).</i>
  <i>Dies löst das Event [onItemClose](#onItemClose) aus.</i>
</ul>

<ul><li>
  <b>sort (field, desc, parent, silent): void</b> - sortiert Elemente im Ressourcen-Grid
  <ul>
  <li><b><i>field</i></b> - (<i>string | Function</i>) - der Spaltenname, nach dem sortiert werden soll, oder eine benutzerdefinierte Sortierfunktion</li>
  <li><b><i>desc?</i></b> - (<i>boolean</i>) - Sortierreihenfolge: <i>true</i> für absteigend, <i>false</i> für aufsteigend (Standard ist <i>false</i>)</li>
  <li><b><i>parent?</i></b> - (<i>string | number</i>) - die ID des Elternteils, um die Sortierung auf einen bestimmten Zweig zu beschränken</li>
  <li><b><i>silent?</i></b> - (<i>boolean</i>) - ob das Rendering nach der Sortierung übersprungen werden soll</li>
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

// Sortierrichtung umschalten und Ressourcen nach der Spalte sortieren
var resourceSortDirection = false;
function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~
<br/>

:::note
Smaple: [Gantt. Sortieren von Ressourcen nach Spalte ](https://snippet.dhtmlx.com/gypniv9e)
:::
<br/><br/>
Alternativ können Sie eine benutzerdefinierte Sortierfunktion verwenden:

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
:::note
Smaple: [Gantt. Sortieren von Ressourcen mit benutzerdefinierter Funktion ](https://snippet.dhtmlx.com/fvjivly5)
:::
<br/><br/>
 <i>Das Gegenstück zu treeDatastore.sort() ist [gantt.sort()](api/method/sort.md).</i>
</ul>

### Events {#events}

<ul id="onBeforeItemMove">
  <li>
  <b>onBeforeItemMove (id, parent, tindex)</b> - wird ausgelöst, bevor ein Element an eine neue Position verschoben wird
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des zu verschiebenden Elements</li>
  <li><b><i>parent</i></b> - (<i>string | number</i>) - die neue Eltern-ID</li>
  <li><b><i>tindex</i></b> - (<i>number</i>) - der Zielindex innerhalb des Elternzweigs</li>
  </ul>
  Gibt <i>false</i> zurück, um die Verschiebung zu verhindern, andernfalls <i>true</i>.
</li>
</ul>

<ul>

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeItemMove", function(id, parent, tindex){
    // Ihr Code hier
    return true;
});
~~~
<br/>
<br/>
 <i>Das Gegenstück zum onBeforeItemMove-Event von treeDatastore ist das [onBeforeTaskMove](api/event/onbeforetaskmove.md) -Event von Gantt.</i>
</ul>

<ul id="onAfterItemMove">
  <li><b>onAfterItemMove (id, parent, tindex)</b> - wird ausgelöst, nachdem ein Element verschoben wurde<ul><li><b><i>id</i></b> - (<i>string | number</i>) - die ID des verschobenen Elements</li><li><b><i>parent</i></b> - (<i>string | number</i>) - die neue Eltern-ID</li><li><b><i>tindex</i></b> - (<i>number</i>) - der neue Index innerhalb des Elternzweigs</li></ul></li>
</ul>

<ul>

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterItemMove", function(id, parent, tindex){
    // Ihr Code hier
});
~~~
<br/>
<br/>
 <i>Das Gegenstück zum onAfterItemMove-Event von treeDatastore ist das [onAfterTaskMove](api/event/onaftertaskmove.md)-Event von Gantt.</i>
</ul>

<ul id="onItemOpen">
  <li>
  <b>onItemOpen (id)</b> - wird ausgelöst, wenn ein Zweig erweitert wird
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des Zweigs</li>
  </ul>
</li>
</ul>

<ul>

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemOpen", function(id){
    // Ihr Code hier
});
~~~
<br/>
<br/>
 <i>Das Gegenstück zum onItemOpen-Event von treeDatastore ist das [onTaskOpened](api/event/ontaskopened.md)-Event von Gantt.</i>
</ul>

<ul id="onItemClose">
  <li>
  <b>onItemClose (id)</b> - wird ausgelöst, wenn ein Zweig eingeklappt wird
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - die ID des Zweigs</li>
  </ul>
</li>
</ul>

<ul>

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemClose", function(id){
    // Ihr Code hier
});
~~~
<br/>
<br/>
 <i>Das Gegenstück zum onItemClose-Event von treeDatastore ist das [onTaskClosed](api/event/ontaskclosed.md)-Event von Gantt.</i>
</ul>

### Related API
- [createDatastore](api/method/createdatastore.md)
- [getDatastore](api/method/getdatastore.md)
- [datastore](api/other/datastore.md)

### Related Guides
- [Resource Management](guides/resource-management.md)

