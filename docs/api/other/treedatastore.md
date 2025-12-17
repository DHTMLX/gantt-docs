---
sidebar_label: treeDatastore
title: treeDatastore config
description: "a set of treeDatastore methods"
---


# treeDatastore


### Description


@short: A set of treeDatastore methods

@signature: treeDatastore: TreeDatastoreMethods


### Details


**_Note_**, that Tasks and Links should be modified using the common [API of Gantt](api/api-overview.md). Modifying tasks or links directly in the datastore can produce unexpected results. Datastores are expected to be used for resources or other custom objects.


A new datastore can be created using [createDatastore](api/method/createdatastore.md) method.


TreeDatastore extends [Datastore](api/other/datastore.md) and has all of its methods.
The extended API of the **treeDatastore** object provides the following [methods](#methods) and [events](#events):


## Methods


- **move (sid, tindex, parent): boolean | void** - moves an item to the new position or to a new parent
    - **_sid_** - (*string \| number*) - the id of the item to move
    - **_tindex_** - (*number*) - the index of the position that the item will be moved to (the index within a branch)
    - **_parent?_** - (*string \| number*) - optional, the parent id. If specified, the tindex will refer to the index in the 'parent' branch
    - Returns false if the action has been canceled using onBeforeItemMove, returns undefined otherwise.

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


The twin of treeDatastore.move() is [gantt.moveTask()](api/method/movetask.md).

Calls the onBeforeItemMove, onAfterItemMove events, and all events of the refresh method.


#### **getBranchIndex (id): number** - returns the index of an item in the branch
- **_id_** - (*string \| number*) - the id of the item

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


The twin of treeDatastore.getBranchIndex() is [gantt.getTaskIndex()](api/method/gettaskindex.md).


- **hasChild (id): number | void** - checks whether the specified item has child items
    - **_id_** - (*string \| number*) - the id of the item
    - Returns the number of child tasks (if exist), or undefined otherwise.

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


The twin of treeDatastore.hasChild() is gantt.hasChild().


- **getChildren (id): Array\<number \| string \| object\>** - returns the 1st-level child items of the specified parent branch
    - **_id_** - (*string \| number*) - the id of the parent branch
    - Returns an array of children's ids.

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


The twin of treeDatastore.getChildren() is gantt.getChildren().


- **isChildOf (childId, parentId): boolean** - checks whether an item is a child of a different item
    - **_childId_** - (*string \| number*) - the id of an item that you want to check as a child
    - **_parentId_** - (*string \| number*) - the id of an item that you want to check as a parent
    - Returns true, if the item is a child of the specified parent item. Otherwise, false.

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


The twin of treeDatastore.isChildOf() is [gantt.isChildOf()](api/method/ischildof.md).


- **getSiblings (id): Array\<number \| string \| object\>** - returns siblings of the specified item (including itself)
    - **_id_** - (*string \| number*) - the id of the item
    - Returns an array with the ids of the item's siblings.

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


The twin of treeDatastore.getSiblings() is [gantt.getSiblings()](api/method/getsiblings.md).


- **getNextSibling (id): number \| string \| null** - returns the id of the next item of the same level
    - **_id_** - (*string \| number*) - the id of the item
    - Returns the id of the next sibling or null.

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


The twin of treeDatastore.getNextSibling() is [gantt.getNextSibling()](api/method/getnextsibling.md).


- **getPrevSibling (id): number \| string \| null** - returns the id of the previous item of the same level
    - **_id_** - (*string \| number*) - the id of the item
    - Returns the id of the previous sibling or null.

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


The twin of treeDatastore.getPrevSibling() is [gantt.getPrevSibling()](api/method/getprevsibling.md).


- **getParent (id): number \| string** - returns the id of the parent item or 0
    - **_id_** - (*string \| number*) - the id of the item

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


The twin of treeDatastore.getParent() is [gantt.getParent()](api/method/getparent.md).


- **calculateItemLevel (item): number** - calculates the level of nesting of an item
    - **_item_** - (*object*) - the item's object

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


The twin of treeDatastore.calculateItemLevel() is [gantt.calculateTaskLevel()](api/method/calculatetasklevel.md).


- **setParent (item, newParentId): void** - sets the parent for an item. The parent id will be written to the property specified by `parentProperty` config, "item.parent" by default
    - **_item_** - (*object*) - the item's object
    - **_newParentId_** - (*string \| number \| null*) - the id of the parent

:::note
Use **treeDatastore.move()** in order to move task to a different parent. The **setParent()** method only writes the value to the property specified by the config, it won't update the internal state of the tree.
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


The twin of treeDatastore.setParent() is [gantt.setParent()](api/method/setparent.md).


- **eachItem (callback, parentId): void** - iterates over all children of a specific item
    - **_callback_** - (*Function*) - the callback function
    - **_parentId?_** - (*string \| number*) - optional, the id of the parent

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


The twin of treeDatastore.eachItem() is [gantt.eachTask()](api/method/eachtask.md).


- **eachParent (callback, startItem): void** - iterates over all parent items of the specified item
    - **_callback_** - (*Function*) - the callback function
    - **_startItem_** - (*string \| number*) - the id of the item the parent item of which should be iterated over

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


The twin of treeDatastore.eachParent() is [gantt.eachParent()](api/method/eachparent.md).


- **open (id): void** - opens the branch with the specified id
    - **_id_** - (*string \| number*) - the branch id

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


The twin of treeDatastore.open() is [gantt.open()](api/method/open.md).

Calls the onItemOpen event.


- **close (id): void** - closes the branch with the specified id
    - **_id_** - (*string \| number*) - the branch id

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


The twin of treeDatastore.close() is [gantt.close()](api/method/close.md).

Calls the onItemClose event.


- **sort (field, desc, parent, silent): void** - sorts items in the resource grid
    - **_field_** - (*string \| Function*) - the name of the column that the resource grid will be sorted by or a custom sorting function
    - **_desc?_** - (*boolean*) - optional, specifies the sorting direction: true - descending sort and false - ascending sort. By default, false
    - **_parent?_** - (*string \| number*) - optional, the id of the parent item. Specify to sort only in that branch
    - **_silent?_** - (*boolean*) - optional, specifies whether rendering should be invoked after reordering items

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


:::note
sample: [Gantt. Sorting resources by the column ](https://snippet.dhtmlx.com/gypniv9e )
:::


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


:::note
samle: [Gantt. Sorting resources by a custom function ](https://snippet.dhtmlx.com/fvjivly5)
:::


The twin of treeDatastore.sort() is [gantt.sort()](api/method/sort.md).


## Events


- **onBeforeItemMove (id, parent, tindex)** - fires before an item is moved to a new position
    - **_id_** - (*string \| number*) - the id of the item to move
    - **_parent_** - (*string \| number*) - the parent id
    - **_tindex_** - (*number*) - the index of the position in the parent branch that the item will be moved to
    - Return false to prevent the default action of the event, otherwise true.

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeItemMove", function(id, parent, tindex){
    // your code here
    return true;
});
~~~


The twin of the onBeforeItemMove event of treeDatastore is the [onBeforeTaskMove](api/event/onbeforetaskmove.md) event of Gantt.


- **onAfterItemMove (id, parent, tindex)** - fires after an item was moved to a new position
    - **_id_** - (*string \| number*) - the id of the item to move
    - **_parent_** - (*string \| number*) - the parent id
    - **_tindex_** - (*number*) - the index of the position in the parent branch that the item will be moved to

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterItemMove", function(id, parent, tindex){
    // your code here
});
~~~


The twin of the onAfterItemMove event of treeDatastore is the [onAfterTaskMove](api/event/onaftertaskmove.md) event of Gantt.


- **onItemOpen (id)** - fires on opening a branch
    - **_id_** - (*string \| number*) - the id of the branch

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemOpen", function(id){
    // your code here
});
~~~


The twin of the onItemOpen event of treeDatastore is the [onTaskOpened](api/event/ontaskopened.md) event of Gantt.


- **onItemClose (id)** - fires on closing a branch
    - **_id_** - (*string \| number*) - the id of the branch

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemClose", function(id){
    // your code here
});
~~~


The twin of the onItemClose event of treeDatastore is the [onTaskClosed](api/event/ontaskclosed.md) event of Gantt.


### Related API
- [createDatastore](api/method/createdatastore.md)
- [getDatastore](api/method/getdatastore.md)
- [datastore](api/other/datastore.md)


### Related Guides
- [Resource Management](guides/resource-management.md)

