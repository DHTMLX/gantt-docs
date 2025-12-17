---
sidebar_label: datastore
title: datastore config
description: "a set of datastore methods"
---

# datastore

### Description

@short: A set of datastore methods

@signature: datastore: DatastoreMethods

### Details

**_Note_**, that Tasks and Links should be modified using the common [API of Gantt](api/api-overview.md). Modifying tasks or links directly in the datastore can produce unexpected results. Datastores are expected to be used for resources or other custom objects.

A new datastore can be created using [createDatastore](api/method/createdatastore.md) method. 
The **datastore** object possesses the following [methods](#methods) and [events](#events):

## Methods

### parse (data): void 
Loads data from an array

**Parameters**:
- `data` - (Array\<object\>) - the data to load

**Example**:
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
[Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
:::

The twin of datastore.parse() is [gantt.parse()](api/method/parse.md).
  
Calls the [onBeforeParse](#onbeforeparse-data) , [onItemLoading](#onitemloading-item), [onParse](#onparse-data), and [onStoreUpdated](#onstoreupdated-id-item-action) events.

---

### getItem (id)
Returns the item by its id

**Parameters**:
- `id` - (string | number) - the id of the item

**Returns**: object | void - the item object

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const resource = store.getItem(resourceId);
~~~

:::note
sample
[Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
:::

The twins of datastore.getItem() are [gantt.getTask()](api/method/gettask.md) and [gantt.getLink()](api/method/getlink.md).

---

### updateItem (id, item)
Updates the specified item

**Parameters**:
- `id` - (string | number) - the id of the item
- `item` - (object) - an object the item

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const resource = store.getItem(resourceId);
resource.text = "modified";
store.updateItem(resourceId);
// or
store.updateItem(resourceId, { text: "modified" });
~~~

The twins of datastore.updateItem() are [gantt.updateTask()](api/method/updatetask.md) and [gantt.updateLink()](api/method/updatelink.md).

Calls the [onBeforeUpdate](#onbeforeupdate-id-item), [onAfterUpdate](#onafterupdate-id-item) and [onStoreUpdated](#onstoreupdated-id-item-action) events.

---

### removeItem (id)
Deletes the specified item

**Parameters**:
- `id` - (string | number) - the id of the item

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.removeItem(resourceId);
~~~

The twins of datastore.removeItem() are [gantt.deleteTask()](api/method/deletetask.md) and [gantt.deleteLink()](api/method/deletelink.md).

Calls the [onBeforeDelete](#onbeforedelete-id-item), [onAfterDelete](#onafterdelete-id-item) and [onStoreUpdated](#onstoreupdated-id-item-action) events.

---

### isVisible (id)
Checks whether the specified item is visible or hidden via filters

**Parameters**:
- `id` - (string | number) - the id of the item

**Returns**: boolean - true if visible, false otherwise

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
if(store.isVisible(resourceId)){
    console.log(resourceId);
}
~~~

The twin of datastore.isVisible() is [gantt.isTaskVisible()](api/method/istaskvisible.md).

---

### getVisibleItems ()
Returns the array of visible items

**Returns**: Array\<object\> - array of visible items

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const items = store.getVisibleItems();
~~~

---

### addItem (item, index)
Adds a new item to the datastore

**Parameters**:
- `item` - (object) - the item object
- `index` - (number) - the position the task will be added into (0 or greater)

**Returns**: number | string - the id of the item

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const itemId = store.addItem({
    text: "Unassigned",
    parent:4
});
~~~

The twins of datastore.addItem() are [gantt.addTask()](api/method/addtask.md) and [gantt.addLink()](api/method/addlink.md).

Calls the [onBeforeAdd](#onbeforeadd-id-item), [onAfterAdd](#onafteradd-id-item) and [onStoreUpdated](#onstoreupdated-id-item-action) events.

---

### changeId (oldId, newId)
Changes the id of the item

**Parameters**:
- `oldId` - (string | number) - the current item's id
- `newId` - (string | number) - the new item's id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

const itemId = store.addItem({
    text: "Unassigned",
    parent:4
});

// itemId - temporary client-side id of the new item
// once item is saved to the database - update the client with the new id:

store.changeId(itemId, "databaseId");
~~~

The twins of datastore.changeId() are [gantt.changeTaskId()](api/method/changetaskid.md) and [gantt.changeLinkId()](api/method/changelinkid.md).
 
Calls the [onIdChange](#onidchange-id-newid) event.

---

### exists (id)
Checks whether the specified item exists in the datastore

**Parameters**:
- `id` - (string | number) - the item's id

**Returns**: boolean - true if exists, false otherwise

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

if(store.exists(resourceId)){
    console.log(resourceId);
}
~~~

The twins of datastore.exists() are [gantt.isTaskExists()](api/method/istaskexists.md) and [gantt.isLinkExists()](api/method/islinkexists.md).

---

### move (sindex, tindex)
Moves an item to a new position

**Parameters**:
- `sindex` - (number) - the index of the current position of the task
- `tindex` - (number) - the index of the position that the item will be moved to

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

// swap two items
const idA = 1;
const idB = 5;
const indexA = store.getIndexById(idA);
const indexB = store.getIndexById(idB);
store.move(indexB, indexA);

indexA = store.getIndexById(idA);
store.move(indexA, indexB);
~~~

The twin of datastore.move() is [gantt.moveTask()](api/method/movetask.md).
  
Call the [onStoreUpdated](#onstoreupdated-id-item-action) event.

---

### clearAll ()
Clears the datastore

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.clearAll();
~~~

The twin of datastore.clearAll() is [gantt.clearAll()](api/method/clearall.md).
  
Calls the [onClearAll](#onclearall-), [onBeforeStoreUpdate](#onbeforestoreupdate-id-item-action) and [onStoreUpdated](#onstoreupdated-id-item-action) events.

---

### silent (callback)
Execute the code without firing API events of the datastore

**Parameters**:
- `callback` - (Function) - the callback function

**Example**:
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

The twin of datastore.silent() is [gantt.silent()](api/method/silent.md).

---

### refresh (id)
Fires repainting of events of the specified record, runs filters

**Parameters**:
- `id` - (string | number) - optional, the id of the record

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.refresh(itemId); // repaints an item
store.refresh(); // repaints all items
~~~

The twins of datastore.refresh() are [gantt.refreshTask()](api/method/refreshtask.md) and [gantt.refreshLink()](api/method/refreshlink.md).
  
Calls the [onBeforeStoreUpdate](#onbeforestoreupdate-id-item-action), [onBeforeFilter](#onbeforefilter-), [onFilterItem](#onfilteritem-id-item), [onFilter](#onfilter-) and [onStoreUpdated](#onstoreupdated-id-item-action) events.

---

### count ()
Returns the number of items that are currently loaded into the datastore

**Returns**: number - count of items

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onParse", function(){
    alert(store.count() + " items loaded");
});
~~~

The twins of datastore.count() are [gantt.getTaskCount()](api/method/gettaskcount.md) and [gantt.getLinkCount()](api/method/getlinkcount.md).

---

### countVisible ()
Returns the number of items that are currently visible

**Returns**: number - count of visible items

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
alert(store.countVisible() + " items are visible");
~~~

The twin of datastore.countVisible() is [gantt.getVisibleTaskCount()](api/method/getvisibletaskcount.md).

---

### eachItem (callback)
Iterates over all tasks of the datastore

**Parameters**:
- `callback` - (Function) - the callback function

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

let searchItems = [];
store.eachItem(function(item){
    if(!item.value){
        searchItems.push(item);
    }
});
~~~

The twin of datastore.eachItem() is [gantt.eachTask()](api/method/eachtask.md).

---

### filter ()
Runs the filters and updates visible array of items

Normally, you don't need to call this method, it is called automatically from the store.refresh() method.

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.filter();
~~~

---

### sort (field, desc, parent, silent)
Sorts items in the resource grid

**Parameters**:
- `field` - (string | Function) - the name of the column or a custom sorting function
- `desc` - (boolean) - specifies the sorting direction: true - descending sort and false - ascending sort
- `parent` - (string | number) - the id of the parent item
- `silent` - (boolean) - specifies whether rendering should be invoked after reordering items

**Example**:
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

// sort the resource grid by the column
let resourceSortDirection = false;

function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~

or you can define a custom function for sorting:

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

The twin of datastore.sort() is [gantt.sort()](api/method/sort.md).

---

### getIndexRange (from, to)
Returns records between the specified indexes

**Parameters**:
- `from` - (number) - the position of the start record
- `to` - (number) - the position of the end record

**Returns**: Array\<object\> - array of items

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const itemsInViewPort = store.getIndexRange(5, 10);// get items from 5th to 10th
~~~

---

### getItems ()
Returns all records of the datastore

**Returns**: Array\<object\> - array of all items

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const items = store.getItems();
~~~

The twins of datastore.getItems() are [gantt.getTaskByTime()](api/method/gettaskbytime.md) and [gantt.getLinks()](api/method/getlinks.md).

---

### getIdByIndex (index)
Returns the id of the item by its index

**Parameters**:
- `index` - (number) - the position of the item

**Returns**: string | number | void - item id or undefined

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const firstItem = store.getIdByIndex(0);
~~~

The twin of datastore.getIdByIndex() is [gantt.getTaskByIndex()](api/method/gettaskbyindex.md).

---

### getIndexById (id)
Returns the index of the item by its id

**Parameters**:
- `id` - (string | number) - the id of the item

**Returns**: number - item index or -1 if not found

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const itemIndex = store.getIndexById(5);
~~~

The twin of datastore.getIndexById() is [gantt.getTaskIndex()](api/method/gettaskindex.md).

---

### getFirst ()
Returns the id of the first item of the datastore

**Returns**: string | number | null - id of first item

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const firstId = store.getFirst();
~~~

---

### getLast ()
Returns the id of the last item of the datastore

**Returns**: string | number | null - id of last item

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const lastId = store.getLast();
~~~

---

### getNext (id)
Returns the id of the next item of the datastore

**Parameters**:
- `id` - (string | number) - the item's id

**Returns**: string | number | null - id of next item

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const firstId = store.getFirst();
const secondId = store.getNext(firstId);
~~~

The twin of datastore.getNext() is [gantt.getNext()](api/method/getnext.md).

---

### getPrev (id)
Returns the id of the previous item of the datastore

**Parameters**:
- `id` - (string | number) - the item's id

**Returns**: string | number | null - id of previous item

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const prevId = store.getPrev(itemId);
~~~

The twin of datastore.getPrev() is [gantt.getPrev()](api/method/getprev.md).

---

### destructor ()
Clears the datastore and removes all attached event handlers

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.destructor();
~~~

The twin of datastore.destructor() is [gantt.destructor()](api/method/destructor.md).

---

### attachEvent (name, handler, settings)
Attaches the handler to an inner event of DataStore

**Parameters**:
- `name` - (string) - the event's name, case-insensitive
- `handler` - (Function) - the handler function
- `settings` - (object) - optional, an object with settings for the event handler

**Returns**: string - event id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});
~~~

The twin of datastore.attachEvent() is [gantt.attachEvent()](api/method/attachevent.md).

---

### callEvent (name, params)
Calls an inner event

**Parameters**:
- `name` - (string) - the event's name, case-insensitive
- `params` - (Array\<any\>) - an array of the event-related data

**Returns**: boolean - true if event completed successfully

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.callEvent("CustomEvent", [param1, param2]);
~~~

The twin of datastore.callEvent() is [gantt.callEvent()](api/method/callevent.md).

---

### detachEvent (id)
Detaches a handler from an event

**Parameters**:
- `id` - (string) - the event's id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const handlerId = store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});

// detach a listener
store.detachEvent(handlerId);
~~~

The twin of datastore.detachEvent() is [gantt.detachEvent()](api/method/detachevent.md).

---

## Events

### onItemLoading (item)
Fires when an item is being loaded from the data source

**Parameters**:
- `item` - (object) - the object of an item

**Returns**: boolean - Return false to prevent the default action

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemLoading", function(item){
    if(item.valid){ // filter items on loading by custom property
        return true;
    }
    return false;
});
~~~

The twin of the onItemLoading event of datastore is the [onTaskLoading](api/event/ontaskloading.md) event of Gantt.

---

### onBeforeParse (data)
Fires before data started to be parsed

**Parameters**:
- `data` - (Array\<any\>) - the array with the data that was loaded

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeParse", function(item){
    console.time("StoreParse");
});
store.attachEvent("onParse", function(item){
    console.timeEnd("StoreParse");
});
~~~

The twin of the onBeforeParse event of datastore is the [onBeforeParse](api/event/onbeforeparse.md) event of Gantt.

---

### onParse (data)
Fires after data were parsed but before they were rendered

**Parameters**:
- `data` - (Array\<any\>) - the array with the data that was loaded

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeParse", function(item){
    console.time("StoreParse");
});
store.attachEvent("onParse", function(item){
    console.timeEnd("StoreParse");
});
~~~

The twin of the onParse event of datastore is the onParse event of Gantt.

---

### onBeforeUpdate (id, item)
Fires before an item is updated

**Parameters**:
- `id` - (string | number) - the id of an item
- `item` - (object) - the new (updated) object of the item

**Returns**: boolean - Return false to prevent the default action

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeUpdate", function(id, item){
    // your code here
    return true;
});
~~~

The twins of the onBeforeUpdate event of datastore are the [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md) and [onBeforeLinkUpdate](api/event/onbeforelinkupdate.md) events of Gantt.

---

### onAfterUpdate (id, item)
Fires after an item is updated

**Parameters**:
- `id` - (string | number) - the id of an item
- `item` - (object) - the object of the item

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterUpdate", function(id, item){
    // your code here
});
~~~

The twins of the onAfterUpdate event of datastore are the [onAfterTaskUpdate](api/event/onaftertaskupdate.md) and [onAfterLinkUpdate](api/event/onafterlinkupdate.md) events of Gantt.

---

### onBeforeDelete (id, item)
Fires before an item is deleted

**Parameters**:
- `id` - (string | number) - the id of an item
- `item` - (object) - the object of the item

**Returns**: boolean - Return false to prevent the default action

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeDelete", function(id, item){
    // your code here
    return true;
});
~~~

The twins of the onBeforeDelete event of datastore are the [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) and [onBeforeLinkDelete](api/event/onbeforelinkdelete.md) events of Gantt.

---

### onAfterDelete (id, item)
Fires after an item is deleted

**Parameters**:
- `id` - (string | number) - the id of an item
- `item` - (object) - the object of the item

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterDelete", function(id, item){
    // your code here
});
~~~

The twins of the onAfterDelete event of datastore are the [onAfterTaskDelete](api/event/onaftertaskdelete.md) and [onAfterLinkDelete](api/event/onafterlinkdelete.md) events of Gantt.

---

### onBeforeAdd (id, item)
Fires before a new item is added to the datastore

**Parameters**:
- `id` - (string | number) - the id of an item
- `item` - (object) - the object of the item

**Returns**: boolean - Return false to prevent the default action

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeAdd", function(id, item){
    // your code here
    return true;
});
~~~

The twins of the onBeforeAdd event of datastore are the [onBeforeTaskAdd](api/event/onbeforetaskadd.md) and [onBeforeLinkAdd](api/event/onbeforelinkadd.md) events of Gantt.

---

### onAfterAdd (id, item)
Fires after an item is added to the datastore

**Parameters**:
- `id` - (string | number) - the id of an item
- `item` - (object) - the object of the item

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterAdd", function(id, item){
    // your code here
});
~~~

The twins of the onAfterAdd event of datastore are the [onAfterTaskAdd](api/event/onaftertaskadd.md) and [onAfterLinkAdd](api/event/onafterlinkadd.md) events of Gantt.

---

### onIdChange (id, newId)
Fires when the id of an item is changed

**Parameters**:
- `id` - (string | number) - the id of an item
- `newId` - (string | number) - the new id of the item

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onIdChange", function(oldId, newId){
    // your code here
});
~~~

The twin of the onIdChange event of datastore is the [onTaskIdChange](api/event/ontaskidchange.md) event of Gantt.

---

### onClearAll ()
Fires after all items were removed from the datastore

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onClearAll", function(){
    // your code here
});
~~~

The twin of the onClearAll event of datastore is the [onClear](api/event/onclear.md) event of Gantt.

---

### onBeforeStoreUpdate (id, item, action)
Fires before the datastore is refreshed

**Parameters**:
- `id` - (string | number | null) - the id of an item or null
- `item` - (object | null) - the item object or null
- `action` - (string | null) - the action type ("paint", "move", "add", "delete", null)

**Returns**: boolean - Return false to prevent the default action

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeStoreUpdate", function(id, item, action){
    // your code here
    return true;
});
~~~

---

### onStoreUpdated (id, item, action)
Fires after the datastore has been refreshed

**Parameters**:
- `id` - (string | number | null) - the id of an item or null
- `item` - (object | null) - the item object or null
- `action` - (string | null) - the action type ("paint", "move", "add", "delete", null)

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onStoreUpdated", function(id, item, action){
    // your code here
});
~~~

---

### onBeforeFilter ()
Fires before filtering is applied

**Example**:
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
Fires after the datastore has update the filtering state

**Example**:
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
Fires for each item during filtering

**Parameters**:
- `id` - (string | number) - the id of an item
- `item` - (object) - the item object

**Returns**: boolean - Return false to mark item as not visible

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onFilterItem", function(id, item){
    // your code here
    return true;
});
~~~

The twin of the onFilterItem event of datastore is the [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) event of Gantt.

---

### onDestroy () {#ondestroy}
Fires after the destructor() method is called

**Example**:
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

## Related API
- [createDatastore](api/method/createdatastore.md)
- [getDatastore](api/method/getdatastore.md)
- [treeDatastore](api/other/treedatastore.md)

## Related Guides
- [Resource Management](guides/resource-management.md)

