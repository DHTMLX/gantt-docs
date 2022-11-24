datastore
=============
@short: a set of datastore methods


@type:object
@example:


@template:	api_config
@descr:

{{note This is an experimental API that might be changed in the future.}}
**_Note_**, that Tasks and Links should be modified using the common [API of Gantt](api/refs/gantt.md). Modifying tasks or links directly in the datastore can produce unexpected results. Datastores are expected to be used for resources or other custom objects.

A new datastore can be created using api/gantt_createdatastore.md method. <br>
The **datastore** object possesses the following [methods](#methods) and [events](#events):

<h3 id="methods">Methods</h3>

<ul id="parse"><li>
    	<b>parse(data)</b> - loads data from an array
        <ul>
          	<li><b><i>data</i></b> - (<i>array</i>) the data to load</li>
        </ul>
</li></ul>

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
<br>
{{sample
11_resources/04_resource_usage_diagram.html
}}
<br>

<br>
 <i>The twin of datastore.parse() is <a href="api/gantt_parse.md">gantt.parse()</a>.</i>
  <br>
 <i>Calls the <a href="#onBeforeParse">onBeforeParse</a>, <a href="#onItemLoading">onItemLoading</a>, <a href="#onParse">onParse</a>, and <a href="#onStoreUpdated">onStoreUpdated</a> events.</i>
</ul>



<ul id="getItem">
    <li>
    	<b>getItem(id)</b> - returns the item by its id
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the item</li>
        </ul>
    </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var resource = store.getItem(resourceId);
~~~
<br>
{{sample
11_resources/04_resource_usage_diagram.html
}}
<br>
<br>
 <i>The twins of datastore.getItem() are <a href="api/gantt_gettask.md">gantt.getTask()</a> and <a href="api/gantt_getlink.md">gantt.getLink()</a>.</i>
</ul>

<ul id="updateItem">
    <li>
    	<b>updateItem(id, item)</b> - updates the specified item
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the item</li>
          	<li><b><i>item</i></b> - (<i>object</i>) an object the item</li>
        </ul>
    </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var resource = store.getItem(resourceId);
resource.text = "modified";
store.updateItem(resourceId);
// or
store.updateItem(resourceId, { text: "modified" });
~~~
<br>
<br>
 <i>The twins of datastore.updateItem() are <a href="api/gantt_updatetask.md">gantt.updateTask()</a> and <a href="api/gantt_updatelink.md">gantt.updateLink()</a>.</i>
<br>
 <i>Calls the <a href="#onBeforeUpdate">onBeforeUpdate</a>, <a href="#onAfterUpdate">onAfterUpdate</a> and <a href="#onStoreUpdated">onStoreUpdated</a> events.</i>

</ul>

<ul id="removeItem">
    <li>
    	<b>removeItem(id)</b> - deletes the specified item
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the item</li>
        </ul>
    </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.removeItem(resourceId);
~~~
<br>
<br>
 <i>The twins of datastore.removeItem() are <a href="api/gantt_deletetask.md">gantt.deleteTask()</a> and <a href="api/gantt_deletelink.md">gantt.deleteLink()</a>.</i>
<br>
 <i>Calls the <a href="#onBeforeDelete">onBeforeDelete</a>, <a href="#onAfterDelete">onAfterDelete</a> and <a href="#onStoreUpdated">onStoreUpdated</a> events.</i>
</ul>

<ul id="isVisible">
    <li>
    	<b>isVisible(id)</b> - checks whether the specified item is visible or hidden via filters
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the item</li>
        </ul>
        Returns <i>true</i>, if the task is visible. Otherwise, <i>false</i>.
    </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
if(store.isVisible(resourceId)){
    console.log(resourceId);
}
~~~
<br>
<br>
 <i>The twin of datastore.isVisible() is <a href="api/gantt_istaskvisible.md">gantt.isTaskVisible()</a>.</i>
</ul>

<ul id="getVisibleItems">
    <li>
    	<b>getVisibleItems()</b> - returns the array of visible items
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var items = store.getVisibleItems();
~~~
<br>
</ul>


<ul id="addItem">
    <li>
    	<b>addItem(item, index)</b> - adds a new task
        <ul>
          	<li><b><i>item</i></b> - (<i>object</i>) the task object</li>
          	<li><b><i>index</i></b> - (<i>string|number</i>) the position the task will be added into (0 or greater)
</li>
        </ul>
    Returns the id of the item.
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
<br>
<br>
 <i>The twins of datastore.addItem() are <a href="api/gantt_addtask.md">gantt.addTask()</a> and <a href="api/gantt_addlink.md">gantt.addLink()</a>.</i>
<br>
 <i>Calls the <a href="#onBeforeAdd">onBeforeAdd</a>, <a href="#onAfterAdd">onAfterAdd</a> and <a href="#onStoreUpdated">onStoreUpdated</a> events.</i>
</ul>

<ul id="changeId">
    <li>
    	<b>changeId(oldId, newId)</b> - changes the id of the item
        <ul>
          	<li><b><i>oldId</i></b> - (<i>string|number</i>) the current item's id</li>
          	<li><b><i>newId</i></b> - (<i>string|number</i>) the new item's id
</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);

var itemId = store.addItem({
    text: "Unassigned",
    parent:4
});

// itemId - temporary client-side id of the new item
// once item is saved to the database - update the client with the new id:

store.changeId(itemId, "databaseId");
~~~
<br>
<br>
 <i>The twins of datastore.changeId() are <a href="api/gantt_changetaskid.md">gantt.changeTaskId()</a> and <a href="api/gantt_changelinkid.md">gantt.changeLinkId()</a>.</i>
 <br>
 <i>Calls the <a href="#onIdChange">onIdChange</a> event.</i>
</ul>


<ul id="exists">
    <li>
    	<b>exists(id)</b> - checks whether the specified item exists in the datastore
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the item's id</li>
        </ul>
        Returns <i>true</i>, if the task exists. Otherwise, <i>false</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);

if(store.exists(resourceId)){
    console.log(resourceId);
}
~~~
<br>
<br>
 <i>The twins of datastore.exists() are <a href="api/gantt_istaskexists.md">gantt.isTaskExists()</a> and <a href="api/gantt_islinkexists.md">gantt.isLinkExists()</a>.</i>
</ul>


<ul id="move">
    <li>
    	<b>move(sindex, tindex)</b> - moves an item to a new position
        <ul>
          	<li><b><i>sindex</i></b> - (<i>number</i>) the index of the current position of the task</li>
          	<li><b><i>tindex</i></b> - (<i>number</i>) the index of the position that the item will be moved to</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);

// swap two items
var idA = 1;
var idB = 5;
var indexA = store.getIndexById(idA);
var indexB = store.getIndexById(idB);
store.move(indexB, indexA);

indexA = store.getIndexById(idA);
store.move(indexA, indexB);
~~~
<br>
<br>
    <i>The twin of datastore.move() is <a href="api/gantt_movetask.md">gantt.moveTask()</a>.</i>
    <br>
    <i>Call the <a href="#onStoreUpdated">onStoreUpdated</a> event.</i>
</ul>

<ul>
    <li>
    	<b>clearAll()</b> - clears the datastore
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.clearAll();
~~~
<br>
<br>
 <i>The twin of datastore.clearAll() is <a href="api/gantt_clearall.md">gantt.clearAll()</a>.</i>
   <br>
 <i>Calls the <a href="#onClearAll">onClearAll</a>, <a href="#onBeforeStoreUpdate">onBeforeStoreUpdate</a> and <a href="#onStoreUpdated">onStoreUpdated</a> events.</i>

</ul>

<ul id="silent">
    <li>
    	<b>silent(callback)</b> - execute the code without firing API events of the datastore
        <ul>
          	<li><b><i>callback</i></b> - (<i>function</i>) the callback function</li>
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
<br>
<br>
 <i>The twin of datastore.silent() is <a href="api/gantt_silent.md">gantt.silent()</a>.</i>
</ul>

<ul id="refresh">
    <li>
    	<b>refresh(id)</b> - fires repainting of events of the specified record, runs filters
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) optional, the id of the record</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.refresh(itemId); // repaints an item
store.refresh(); // repaints all items
~~~
<br>
<br>
 <i>The twins of datastore.refresh() are <a href="api/gantt_refreshtask.md">gantt.refreshTask()</a> and <a href="api/gantt_refreshlink.md">gantt.refreshLink()</a>.</i>
   <br>
 <i>Calls the <a href="#onBeforeStoreUpdate">onBeforeStoreUpdate</a>, <a href="#onBeforeFilter">onBeforeFilter</a>, <a href="#onFilterItem">onFilterItem</a>, <a href="#onFilter">onFilter</a> and <a href="#onStoreUpdated">onStoreUpdated</a> events.</i>

</ul>

<ul id="count">
    <li>
    	<b>count()</b> - returns the number of items that are currently loaded into the datastore
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onParse", function(){
    alert(store.count() + " items loaded");
});
~~~
<br>
<br>
 <i>The twins of datastore.count() are <a href="api/gantt_gettaskcount.md">gantt.getTaskCount()</a> and <a href="api/gantt_getlinkcount.md">gantt.getLinkCount()</a>.</i>
</ul>

<ul id="countVisible">
    <li>
    	<b>countVisible()</b> - returns the number of items that are currently visible
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
alert(store.countVisible() + " items are visible");
~~~
<br>
<br>
 <i>The twin of datastore.countVisible() is <a href="api/gantt_getvisibletaskcount.md">gantt.getVisibleTaskCount()</a>.</i>
</ul>

<ul id="eachItem">
    <li>
    	<b>eachItem(callback)</b> - iterates over all tasks of the datastore
        <ul>
          	<li><b><i>callback</i></b> - (<i>function</i>) the callback function</li>
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
<br>
<br>
 <i>The twin of datastore.eachItem() is <a href="api/gantt_eachtask.md">gantt.eachTask()</a>.</i>
</ul>

<ul id="filter">
    <li>
    	<b>filter()</b> - runs the filters and updates visible array of items
</li>
Normally, you don't need to call this method, it is called automatically from the <b>store.refresh()</b> method.
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.filter();
~~~
<br>
</ul>

<ul id="getIndexRange">
    <li>
    	<b>getIndexRange(from, to)</b> - returns records between the specified indexes
        <ul>
          	<li><b><i>from</i></b> - (<i>number</i>) the position of the start record</li>
          	<li><b><i>to</i></b> - (<i>number</i>) the position of the end record</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var itemsInViewPort = store.getIndexRange(5, 10);// get items from 5th to 10th
~~~
<br>
</ul>

<ul id="getItems">
    <li>
    	<b>getItems()</b> - returns all records of the datastore
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var items = store.getItems();
~~~
<br>
<br>
 <i>The twins of datastore.getItems() are <a href="api/gantt_gettaskbytime.md">gantt.getTaskByTime()</a> and <a href="api/gantt_getlinks.md">gantt.getLinks()</a>.</i>
</ul>

<ul id="getIdByIndex">
    <li>
    	<b>getIdByIndex(index)</b> - returns the id of the item by its index. Returns `undefined` if there is no item at the specified index.
        <ul>
          	<li><b><i>index</i></b> - (<i>number</i>) the position of the item</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var firstItem = store.getIdByIndex(0);
~~~
<br>
<br>
 <i>The twin of datastore.getIdByIndex() is <a href="api/gantt_gettaskbyindex.md">gantt.getTaskByIndex()</a>.</i>
</ul>

<ul id="getIndexById">
    <li>
    	<b>getIndexById(id)</b> - returns the index of the item by its id. Returns `-1` if no such item exists in the datastore.
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the item</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var itemIndex = store.getIndexById(5);
~~~
<br>
<br>
 <i>The twin of datastore.getIndexById() is <a href="api/gantt_gettaskindex.md">gantt.getTaskIndex()</a>.</i>
</ul>

<ul id="getFirst">
    <li>
    	<b>getFirst()</b> - returns the id of the first item of the datastore
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var firstId = store.getFirst();
~~~
<br>
<br>
</ul>

<ul id="getLast">
    <li>
    	<b>getLast()</b> - returns the id of the last item of the datastore
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var lastId = store.getLast();
~~~
<br>
</ul>

<ul id="getNext">
    <li>
    	<b>getNext(id)</b> - returns the id of the next item of the datastore
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the item's id</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var firstId = store.getFirst();
var secondId = store.getNext(firstId);
~~~
<br>
<br>
 <i>The twin of datastore.getNext() is <a href="api/gantt_getnext.md">gantt.getNext()</a>.</i>
</ul>

<ul id="getPrev">
    <li>
    	<b>getPrev(id)</b> - returns the id of the previous item of the datastore
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the item's id</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var prevId = store.getPrev(itemId);
~~~
<br>
<br>
 <i>The twin of datastore.getPrev() is <a href="api/gantt_getprev.md">gantt.getPrev()</a>.</i>
</ul>

<ul id="destructor">
    <li>
    	<b>destructor()</b> - clears the datastore and removes all attached event handlers. The datastore is not usable after this method is called.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.destructor();
~~~
<br>
<br>
 <i>The twin of datastore.destructor() is <a href="api/gantt_destructor.md">gantt.destructor()</a>.</i>
</ul>


<ul id="attachEvent">
    <li>
    	<b>attachEvent(name, handler, settings)</b> - attaches the handler to an inner event of DataStore
        <ul>
          	<li><b><i>name</i></b> - (<i>DataStoreEventName</i>) the event's name, case-insensitive</li>
          	<li><b><i>handler</i></b> - (<i>function</i>) the handler function</li>
          	<li><b><i>settings</i></b> - (<i>object</i>) optional, an object with settings for the event handler</li>
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
<br>
<br>
 <i>The twin of datastore.attachEvent() is <a href="api/gantt_attachevent.md">gantt.attachEvent()</a>.</i>
</ul>

<ul id="callEvent">
    <li>
    	<b>callEvent(name, params)</b> - calls an inner event
        <ul>
          	<li><b><i>name</i></b> - (<i>string</i>) the event's name, case-insensitive</li>
          	<li><b><i>params</i></b> - (<i>array</i>) an array of the event-related data</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.callEvent("CustomEvent", [param1, param2]);
~~~
<br>
<br>
 <i>The twin of datastore.callEvent() is <a href="api/gantt_callevent.md">gantt.callEvent()</a>.</i>
</ul>

<ul id="detachEvent">
    <li>
    	<b>detachEvent(id)</b> - detaches a handler from an event (which was attached before by the <b>attachEvent()</b> method)
        <ul>
          	<li><b><i>id</i></b> - (<i>string</i>) the event's id</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var handlerId = store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});

// detach a listener
store.detachEvent(handlerId);
~~~
<br>
<br>
 <i>The twin of datastore.detachEvent() is <a href="api/gantt_detachevent.md">gantt.detachEvent()</a>.</i>
</ul>


<h3 id="events">Events</h3> 

<ul id="onItemLoading">
    <li>
    	<b>onItemLoading(item)</b> - fires when an item is being loaded from the data source
        <ul>
          	<li><b><i>item</i></b> - (<i>object</i>) the object of an item</li>
        </ul>
        Return <i>false</i> to prevent the default action of the event, otherwise <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemLoading", function(item){
    if(item.valid){ // filter items on loading by custom property
        return true;
    }
    return false;
});
~~~
<br>
<br>
 <i>The twin of the onItemLoading event of datastore is the <a href="api/gantt_ontaskloading_event.md">onTaskLoading</a> event of Gantt.</i>
</ul>

<ul id="onBeforeParse">
    <li>
    	<b>onBeforeParse()</b> - fires before data started to be parsed
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
<br>
<br>
 <i>The twin of the onBeforeParse event of datastore is the <a href="api/gantt_onbeforeparse_event.md">onBeforeParse</a> event of Gantt.</i>
</ul>

<ul id="onParse">
    <li>
    	<b>onParse()</b> - fires after data were parsed (became available for API) but before they were rendered in the Gantt chart
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
<br>
<br>
 <i>The twin of the onParse event of datastore is the <a href="api/gantt_onparse_event.md">onParse</a> event of Gantt.</i>
</ul>

<ul id="onBeforeUpdate">
    <li>
    	<b>onBeforeUpdate(id, item)</b> - fires before an item is updated
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of an item</li>
          	<li><b><i>item</i></b> - (<i>object</i>) the new (updated) object of the item</li>
        </ul>
        Return <i>false</i> to prevent the default action of the event, otherwise <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeUpdate", function(id, item){
    // your code here
    return true;
});
~~~
<br>
<br>
 <i>The twins of the onBeforeUpdate event of datastore are the <a href="api/gantt_onbeforetaskupdate_event.md">onBeforeTaskUpdate</a> and <a href="api/gantt_onbeforelinkupdate_event.md">onBeforeLinkUpdate</a> events of Gantt.</i>
</ul>

<ul id="onAfterUpdate">
    <li>
    	<b>onAfterUpdate(id, item)</b> - fires after an item is updated
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of an item</li>
          	<li><b><i>item</i></b> - (<i>object</i>) the object of the item</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterUpdate", function(id, item){
    // your code here
});
~~~
<br>
<br>
 <i>The twins of the onAfterUpdate event of datastore are the <a href="api/gantt_onaftertaskupdate_event.md">onAfterTaskUpdate</a> and <a href="api/gantt_onafterlinkupdate_event.md">onAfterLinkUpdate</a> events of Gantt.</i>
</ul>

<ul id="onBeforeDelete">
    <li>
    	<b>onBeforeDelete(id, item)</b> - fires before an item is deleted
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of an item</li>
          	<li><b><i>item</i></b> - (<i>object</i>) the object of the item</li>
        </ul>
        Return <i>false</i> to prevent the default action of the event, otherwise <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeDelete", function(id, item){
    // your code here
    return true;
});
~~~
<br>
<br>
 <i>The twins of the onBeforeDelete event of datastore are the <a href="api/gantt_onbeforetaskdelete_event.md">onBeforeTaskDelete</a> and <a href="api/gantt_onbeforelinkdelete_event.md">onBeforeLinkDelete</a> events of Gantt.</i>
</ul>

<ul id="onAfterDelete">
    <li>
    	<b>onAfterDelete(id, item)</b> - fires after an item is deleted
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of an item</li>
          	<li><b><i>item</i></b> - (<i>object</i>) the object of the item</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterDelete", function(id, item){
    // your code here
});
~~~
<br>
<br>
 <i>The twins of the onAfterDelete event of datastore are the <a href="api/gantt_onaftertaskdelete_event.md">onAfterTaskDelete</a> and <a href="api/gantt_onafterlinkdelete_event.md">onAfterLinkDelete</a> events of Gantt.</i>
</ul>

<ul id="onBeforeAdd">
    <li>
    	<b>onBeforeAdd(id, item)</b> - fires before a new item is added to the datastore
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of an item</li>
          	<li><b><i>item</i></b> - (<i>object</i>) the object of the item</li>
        </ul>
        Return <i>false</i> to prevent the default action of the event, otherwise <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeAdd", function(id, item){
    // your code here
    return true;
});
~~~
<br>
<br>
 <i>The twins of the onBeforeAdd event of datastore are the <a href="api/gantt_onbeforetaskadd_event.md">onBeforeTaskAdd</a> and <a href="api/gantt_onbeforelinkadd_event.md">onBeforeLinkAdd</a> events of Gantt.</i>
</ul>

<ul id="onAfterAdd">
    <li>
    	<b>onAfterAdd(id, item)</b> - fires after an item is added to the datastore
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of an item</li>
          	<li><b><i>item</i></b> - (<i>object</i>) the object of the item</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterAdd", function(id, item){
    // your code here
});
~~~
<br>
<br>
 <i>The twins of the onAfterAdd event of datastore are the <a href="api/gantt_onaftertaskadd_event.md">onAfterTaskAdd</a>  and <a href="api/gantt_onafterlinkadd_event.md">onAfterLinkAdd</a> events of Gantt.</i>
</ul>

<ul id="onIdChange">
    <li>
    	<b>onIdChange(id, newId)</b> - fires when the id of an item is changed
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of an item</li>
          	<li><b><i>newId</i></b> - (<i>string|number</i>) the new id of the item</li>
        </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onIdChange", function(oldId, newId){
    // your code here
});
~~~
<br>
<br>
 <i>The twin of the onIdChange event of datastore is the <a href="api/gantt_ontaskidchange_event.md">onTaskIdChange</a> event of Gantt.</i>
</ul>

<ul id="onClearAll">
    <li>
    	<b>onClearAll()</b> - fires after all items were removed from the datastore
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onClearAll", function(oldId, newId){
    // your code here
});
~~~
<br>
 <i>The twin of the onClearAll event of datastore is the <a href="api/gantt_onclear_event.md">onClear</a> event of Gantt.</i>
</ul>


<ul id="onBeforeStoreUpdate">
    <li>
    	<b>onBeforeStoreUpdate(id, item, action)</b> - fires before the datastore is refreshed
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number"null</i>) the id of an item or null</li>
          	<li><b><i>item</i></b> - (<i>object|null</i>) the item object or null</li>
          	<li><b><i>action</i></b> - (<i>string|null</i>) the action type ("paint", "move", "add", "delete", null)</li>
        </ul>
        Return <i>false</i> to prevent the default action of the event, otherwise <i>true</i>.
        <br>
        This event signals that the datastore items need a repaint. `null` argument value means that the whole datastore is updated.

</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeStoreUpdate", function(id, item, action){
    // your code here
    return true;
});
~~~
<br>
</ul>


<ul id="onStoreUpdated">
    <li>
    	<b>onStoreUpdated(id, item, action)</b> - fires after the datastore has been refreshed
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number"null</i>) the id of an item or null</li>
          	<li><b><i>item</i></b> - (<i>object|null</i>) the item object or null</li>
          	<li><b><i>action</i></b> - (<i>string|null</i>) the action type ("paint", "move", "add", "delete", null)</li>
        </ul>
        This event signals that the datastore items need a repaint. `null` argument value means that the whole datastore is updated.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onStoreUpdated", function(id, item, action){
    // your code here
});
~~~
<br>
</ul>


<ul id="onBeforeFilter">
    <li>
    	<b>onBeforeFilter()</b> - fires before filtering is applied
    </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeFilter", function(item){
    console.time("filtering");
});
store.attachEvent("onFilter", function(item){
    console.timeEnd("filtering");
});
~~~
<br>
</ul>

<ul id="onFilter">
    <li>
    	<b>onFilter()</b> - fires after the datastore has update the filtering state
    </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeFilter", function(item){
    console.time("filtering");
});
store.attachEvent("onFilter", function(item){
    console.timeEnd("filtering");
});
~~~
<br>
</ul>

<ul id="onFilterItem">
    <li>
    	<b>onFilterItem(id, item)</b> - fires for each item during the filtering stage, returning `false` will mark item as not visible
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of an item</li>
          	<li><b><i>item</i></b> - (<i>object</i>) the item object</li>
        </ul>
        Return <i>false</i> to prevent the default action of the event, otherwise <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onFilterItem", function(id, item){
    // your code here
    return true;
});
~~~
<br>
 <i>The twin of the onFilterItem event of datastore is the <a href="api/gantt_onbeforetaskdisplay_event.md">onBeforeTaskDisplay</a> event of Gantt.</i>
</ul>

<ul id="ondestroy">
    <li>
    	<b>onDestroy()</b> - fires after the destructor() method of the datastore is called
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
<br>
</ul>



@relatedapi:
api/gantt_createdatastore.md
api/gantt_getdatastore.md
api/gantt_treedatastore_other.md

@related:
desktop/resource_management.md