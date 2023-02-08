treeDatastore
=============
@short: a set of treeDatastore methods


@type:object
@example:

@template:	api_config
@descr:
{{note This is an experimental API that might be changed in the future.}}
**_Note_**, that Tasks and Links should be modified using the common [API of Gantt](api/refs/gantt.md). Modifying tasks or links directly in the datastore can produce unexpected results. Datastores are expected to be used for resources or other custom objects.

A new datastore can be created using api/gantt_createdatastore.md method.

TreeDatastore extends [Datastore](api/gantt_datastore_other.md) and has all of its methods.
The extended API of the **treeDatastore** object provides the following [methods](#methods) and [events](#events):

<h3 id="methods">Methods</h3>

<ul><li>
    	<b class=submethod>move (sid, tindex, parent): undefined</b> - moves an item to the new position or to a new parent
        <ul>
          	<li><b><i>sid</i></b> - (<i>string | number</i>) - the id of the item to move</li>
          	<li><b><i>tindex</i></b> - (<i>number</i>) - the index of the position that the item will be moved to (the index within a branch)</li>
          	<li><b><i>parent?</i></b> - (<i>string | number</i>) - the parent id. If specified, the <b>tindex</b> will refer to the index in the
<b>'parent'</b> branch</li>
        </ul>
        Returns <i>false</i> if the action has been canceled using <b>onBeforeItemMove</b>, returns <i>undefined</i> otherwise.
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

store.move(6, -1, 2);// move 'John' from 'QA' to 'Development'
~~~
<br>
<br>
 <i>The twin of treeDatastore.move() is <a href="api/gantt_movetask.md">gantt.moveTask()</a>.</i>
  <br>
  <i>Calls the <a href="#onBeforeItemMove">onBeforeItemMove</a>, <a href="#onAfterItemMove">onAfterItemMove</a> events, and all events of the <a href="api/gantt_datastore_other.md#refresh">refresh</a> method.</i>

</ul>

<ul><li>
    	<b class=submethod>getBranchIndex (id): number</b> - returns the index of an item in the branch
        <ul>
          	<li><b><i>id</i></b> - (<i>string | number</i>) - the id of the item</li>
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
<br>
<br>
 <i>The twin of treeDatastore.getBranchIndex() is <a href="api/gantt_gettaskindex.md">gantt.getTaskIndex()</a> </i>
</ul>


<ul><li>
    	<b class=submethod>hasChild (id): number | undefined</b> - checks whether the specified item has child items
        <ul>
          	<li><b><i>id</i></b> - (<i>string | number</i>) - the id of the item</li>
        </ul>
      Returns the <i>number</i> of child tasks (if exist), or <i>undefined</i> otherwise.

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
<br>
<br>
 <i>The twin of treeDatastore.hasChild() is <a href="api/gantt_haschild.md">gantt.hasChild()</a>.</i>
</ul>

<ul><li>
    	<b class=submethod>getChildren (id): Array&lt;number | string | object&gt;</b> - returns the 1st-level child items of the specified parent branch
        <ul>
          	<li><b><i>id</i></b> - (<i>string | number</i>) - the id of the parent branch</li>
        </ul>
      Returns an array of children's ids.
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
<br>
<br>
 <i>The twin of treeDatastore.getChildren() is <a href="api/gantt_getchildren.md">gantt.getChildren()</a>.</i>
</ul>

<ul><li>
    	<b class=submethod>isChildOf (childId, parentId): boolean</b> - checks whether an item is a child of a different item
        <ul>
          	<li><b><i>childId</i></b> - (<i>string | number</i>) - the id of an item that you want to check as a child</li>
          	<li><b><i>parentId</i></b> - (<i>string | number</i>) - the id of an item that you want to check as a parent</li>
        </ul>
      Returns <i>true</i>, if the item is a child of the specified parent item. Otherwise, <i>false</i>.
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
<br>
<br>
 <i>The twin of treeDatastore.isChildOf() is <a href="api/gantt_ischildof.md">gantt.isChildOf()</a>.</i>
</ul>

<ul><li>
    	<b class=submethod>getSiblings (id): Array&lt;number | string | object&gt;</b> - returns siblings of the specified item (including itself)
        <ul>
          	<li><b><i>id</i></b> - (<i>string | number</i>) - the id of the item</li>
        </ul>
      Returns an array with the ids of the item's siblings.
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
<br>
<br>
 <i>The twin of treeDatastore.getSiblings() is <a href="api/gantt_getsiblings.md">gantt.getSiblings()</a>.</i>
</ul>

<ul><li>
    	<b class=submethod>getNextSibling (id): number | string | null</b> - returns the id of the next item of the same level
        <ul>
          	<li><b><i>id</i></b> - (<i>string | number</i>) - the id of the item</li>
        </ul>
      Returns the id of the next sibling or <i>null</i>.
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
<br>
<br>
 <i>The twin of treeDatastore.getNextSibling() is <a href="api/gantt_getnextsibling.md">gantt.getNextSibling()</a>.</i>
</ul>

<ul><li>
    	<b class=submethod>getPrevSibling (id): number | string | null</b> - returns the id of the previous item of the same level
        <ul>
          	<li><b><i>id</i></b> - (<i>string | number</i>) - the id of the item</li>
        </ul>
      Returns the id of the previous sibling or <i>null</i>.
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
<br>
<br>
 <i>The twin of treeDatastore.getPrevSibling() is <a href="api/gantt_getprevsibling.md">gantt.getPrevSibling()</a>.</i>
</ul>

<ul><li>
    	<b class=submethod>getParent (id): number| string</b> -  returns the id of the parent item or 0.
        <ul>
          	<li><b><i>id</i></b> - (<i>string | number</i>) - the id of the item</li>
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
<br>
<br>
 <i>The twin of treeDatastore.getParent() is <a href="api/gantt_getparent.md">gantt.getParent()</a>.</i>
</ul>

<ul><li>
    	<b class=submethod>calculateItemLevel (item): number</b> -  calculates the level of nesting of an item
        <ul>
          	<li><b><i>item</i></b> - (<i>object</i>) - the item's object</li>
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
<br>
<br>
 <i>The twin of treeDatastore.calculateItemLevel() is <a href="api/gantt_calculatetasklevel.md">gantt.calculateTaskLevel()</a>.</i>
</ul>

<ul><li>
    	<b class=submethod>setParent (item, newParentId): undefined</b> -  sets the parent for an item. The parent id will be writen to the property specified by `parentProperty` config, "item.parent" by default.
        <ul>
          	<li><b><i>item</i></b> - (<i>object</i>) - the item's object</li>
          	<li><b><i>newParentId</i></b> - (<i>string | number</i>) - the id of the parent</li>
        </ul>
</li></ul>

<ul>

{{note
Use **treeDatastore.move()** in order to move task to a different parent. The **setParent()** method only writes the value to the property specified by the config, it won't update the internal state of the tree.
}}

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
<br>
<br>
 <i>The twin of treeDatastore.setParent() is <a href="api/gantt_setparent.md">gantt.setParent()</a>.</i>
</ul>

<ul><li>
    	<b class=submethod>eachItem (callback, parentId): undefined</b> -  iterates over all children of a specific item
        <ul>
          	<li><b><i>callback</i></b> - (<i>Function</i>) - the callback function</li>
          	<li><b><i>parentId?</i></b> - (<i>string | number</i>) - the id of the parent</li>
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
<br>
<br>
 <i>The twin of treeDatastore.eachItem() is <a href="api/gantt_eachtask.md">gantt.eachTask()</a>.</i>
</ul>

<ul><li>
    	<b class=submethod>eachParent (callback, startItem): undefined</b> -  iterates over all parent items of the specified item
        <ul>
          	<li><b><i>callback</i></b> - (<i>Function</i>) - the callback function</li>
          	<li><b><i>startItem</i></b> - (<i>string | number</i>) - the id of the item the parent item of which should be iterated over</li>
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
<br>
<br>
 <i>The twin of treeDatastore.eachParent() is <a href="api/gantt_eachparent.md">gantt.eachParent()</a>.</i>
</ul>

<ul><li>
    	<b class=submethod>open (id): undefined</b> -  opens the branch with the specified id
        <ul>
          	<li><b><i>id</i></b> - (<i>string | number</i>) - the branch id</li>
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
<br>
<br>
 <i>The twin of treeDatastore.open() is <a href="api/gantt_open.md">gantt.open()</a>.</i>
<i>Calls the <a href="#onItemOpen">onItemOpen</a> event.</i>
</ul>

<ul><li>
    	<b class=submethod>close (id): undefined</b> -  closes the branch with the specified id
        <ul>
          	<li><b><i>id</i></b> - (<i>string | number</i>) - the branch id</li>
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
<br>
<br>
 <i>The twin of treeDatastore.close() is <a href="api/gantt_close.md">gantt.close()</a>.</i>
   <i>Calls the <a href="#onItemClose">onItemClose</a> event.</i>
</ul>

<ul><li>
    	<b class=submethod>sort (field, desc, parent, silent): undefined</b> -  sorts items in the resource grid
        <ul>
          	<li><b><i>field</i></b> - (<i>string | Function</i>) - the name of the column that the resource grid will be sorted by or a custom sorting function</li>
          	<li><b><i>desc?</i></b> - (<i>boolean</i>) - specifies the sorting direction: <i>true</i> - descending sort and <i>false</i> - ascending sort. By default, <i>false</i></li>
          	<li><b><i>parent?</i></b> - (<i>string | number</i>) - the id of the parent item. Specify the parameter if you want to sort items only in the branch of the specified parent.</li>
          	<li><b><i>silent?</i></b> - (<i>boolean</i>) - specifies whether rendering should be invoked after reordering items</li>
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

// sort the resource grid by the column
var resourceSortDirection = false;
function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~
<br>
{{editor	https://snippet.dhtmlx.com/gypniv9e	Gantt. Sorting resources by the column}}
<br><br>
or you can define a custom function for sorting:

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
<br>
{{editor	https://snippet.dhtmlx.com/fvjivly5	Gantt. Sorting resources by a custom function}}
<br><br>
 <i>The twin of treeDatastore.sort() is <a href="api/gantt_sort.md">gantt.sort()</a>.</i>
</ul>

<h3 id="events">Events</h3>

<ul id="onBeforeItemMove">
    <li>
    	<b class=eventname>onBeforeItemMove (id, parent, tindex)</b> - fires before an item is moved to a new position
        <ul>
          	<li><b><i>id</i></b> - (<i>string | number</i>) - the id of the item to move</li>
          	<li><b><i>parent</i></b> - (<i>string | number</i>) - the parent id</li>
          	<li><b><i>tindex</i></b> - (<i>number</i>) - the index of the position in the parent branch that the item will be moved to</li>
        </ul>
        Return <i>false</i> to prevent the default action of the event, otherwise <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeItemMove", function(id, parent, tindex){
    // your code here
    return true;
});
~~~
<br>
<br>
 <i>The twin of the onBeforeItemMove event of treeDatastore is the <a href="api/gantt_onbeforetaskmove_event.md">onBeforeTaskMove</a> event of Gantt.</i>
</ul>

<ul id="onAfterItemMove">
    <li>
    	<b class=eventname>onAfterItemMove (id, parent, tindex)</b> - fires after an item was moved to a new position
        <ul>
          	<li><b><i>id</i></b> - (<i>string | number</i>) - the id of the item to move</li>
          	<li><b><i>parent</i></b> - (<i>string | number</i>) - the parent id</li>
          	<li><b><i>tindex</i></b> - (<i>number</i>) - the index of the position in the parent branch that the item will be moved to</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterItemMove", function(id, parent, tindex){
    // your code here
});
~~~
<br>
<br>
 <i>The twin of the onAfterItemMove event of treeDatastore is the <a href="api/gantt_onaftertaskmove_event.md">onAfterTaskMove</a> event of Gantt.</i>
</ul>

<ul id="onItemOpen">
    <li>
    	<b class=eventname>onItemOpen (id)</b> - fires on opening a branch
        <ul>
          	<li><b><i>id</i></b> - (<i>string | number</i>) - the id of the branch</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemOpen", function(id){
    // your code here
});
~~~
<br>
<br>
 <i>The twin of the onItemOpen event of treeDatastore is the <a href="api/gantt_ontaskopened_event.md">onTaskOpened</a> event of Gantt.</i>
</ul>

<ul id="onItemClose">
    <li>
    	<b class=eventname>onItemClose (id)</b> - fires on closing a branch
        <ul>
          	<li><b><i>id</i></b> - (<i>string | number</i>) - the id of the branch</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemClose", function(id){
    // your code here
});
~~~
<br>
<br>
 <i>The twin of the onItemClose event of treeDatastore is the <a href="api/gantt_ontaskclosed_event.md">onTaskClosed</a> event of Gantt.</i>
</ul>


@relatedapi:
api/gantt_createdatastore.md
api/gantt_getdatastore.md
api/gantt_datastore_other.md

@related:
desktop/resource_management.md