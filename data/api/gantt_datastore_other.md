datastore
=============
@short: a set of datastore methods
	

@type:object
@example:


@template:	api_config
@descr:

{{note Datastores are created automatically for tasks and links. But applying methods of datastore to the tasks or links can produce unexpected result. Thus, you should use the common [API of Gantt](api/refs/gantt.md) when working with the tasks and links.}}


The **datastore** object possesses the following [methods](#methods) and [events](#events):

<h3 id="methods">Methods</h3>

<ul><li>
    	<b>parse(data)</b> - loads data from an array
        <ul>
          	<li><b><i>data</i></b> - (<i>array</i>) the data to load</li>
        </ul>
</li></ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.parse() is <a href="api/gantt_parse.md">gantt.parse()</a>.</i>
</ul>



<ul>
    <li>
    	<b>getItem(id)</b> - returns the item by its id
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the item</li>
        </ul>
    </li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twins of datastore.getItem() are <a href="api/gantt_gettask.md">gantt.getTask()</a> and <a href="api/gantt_getlink.md">gantt.getLink()</a>.</i>
</ul>

<ul>
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
Sample
~~~
<br>
 <i>The twins of datastore.updateItem() are <a href="api/gantt_updatetask.md">gantt.updateTask()</a> and <a href="api/gantt_updatelink.md">gantt.updateLink()</a>.</i>
</ul>

<ul>
    <li>
    	<b>removeItem(id)</b> - deletes the specified item
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the item</li>
        </ul>
    </li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twins of datastore.removeItem() are <a href="api/gantt_deletetask.md">gantt.deleteTask()</a> and <a href="api/gantt_deletelink.md">gantt.deleteLink()</a>.</i>
</ul>

<ul>
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
Sample
~~~
<br>
 <i>The twin of datastore.isVisible() is <a href="api/gantt_istaskvisible.md">gantt.isTaskVisible()</a>.</i>
</ul>

<ul>
    <li>
    	<b>getVisibleItems()</b> - returns the array of visible items
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.getVisibleItems() is <a href="">gantt.()</a>.</i>
</ul>

<ul>
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
Sample
~~~
<br>
 <i>The twins of datastore.addItem() are <a href="api/gantt_addtask.md">gantt.addTask()</a> and <a href="api/gantt_addlink.md">gantt.addLink()</a>.</i>
</ul>

<ul>
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
Sample
~~~
<br>
 <i>The twins of datastore.changeId() are <a href="api/gantt_changetaskid.md">gantt.changeTaskId()</a> and <a href="api/gantt_changelinkid.md">gantt.changeLinkId()</a>.</i>
</ul>


<ul>
    <li>
    	<b>exists(id)</b> - checks whether the specified item exists in the datastore
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the item's id</li>
        </ul>
        Returns <i>true</i>, if the task exists. Otherwise, <i>false</i>
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twins of datastore.exists() are <a href="api/gantt_istaskexists.md">gantt.isTaskExists()</a> and <a href="api/gantt_islinkexists.md">gantt.isLinkExists()</a>.</i>
</ul>


<ul>
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
Sample
~~~
<br>
 <i>The twin of datastore.move() is <a href="api/gantt_movetask.md">gantt.moveTask()</a>.</i>
</ul>

<ul>
    <li>
    	<b>clearAll()</b> - clears the datastore
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.clearAll() is <a href="api/gantt_clearall.md">gantt.clearAll()</a>.</i>
</ul>

<ul>
    <li>
    	<b>silent(callback)</b> - execute the code without firing API events of the datastore
        <ul>
          	<li><b><i>callback</i></b> - (<i>function</i>) the callback function</li>
        </ul>
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.silent() is <a href="api/gantt_silent.md">gantt.silent()</a>.</i>
</ul>

<ul>
    <li>
    	<b>refresh(id)</b> - fires repainting of events of the specified record, runs filters
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) optional, the id of the record</li>
        </ul>
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twins of datastore.refresh() are <a href="api/gantt_refreshtask.md">gantt.refreshTask()</a> and <a href="api/gantt_refreshlink.md">gantt.refreshLink()</a>.</i>
</ul>

<ul>
    <li>
    	<b>count()</b> - returns the number of items that are currently loaded into the datastore
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twins of datastore.count() are <a href="api/gantt_gettaskcount.md">gantt.getTaskCount()</a> and <a href="api/gantt_getlinkcount.md">gantt.getLinkCount()</a>.</i>
</ul>

<ul>
    <li>
    	<b>countVisible()</b> - returns the number of items that are currently visible
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.countVisible() is <a href="api/gantt_getvisibletaskcount.md">gantt.getVisibleTaskCount()</a>.</i>
</ul>

<ul>
    <li>
    	<b>eachItem(callback)</b> - iterates over all tasks of the datastore
        <ul>
          	<li><b><i>callback</i></b> - (<i>function</i>) the callback function</li>
        </ul>
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.eachItem() is <a href="api/gantt_eachtask.md">gantt.eachTask()</a>.</i>
</ul>

<ul>
    <li>
    	<b>filter()</b> - runs the filters and updates visible item array (<b>translate is not clear</b>)
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.filter() is <a href=""></a>.</i>
</ul>

<ul>
    <li>
    	<b>getIndexRange(from, to)</b> - returns records between the specified range of indexes (<b>уточнить</b>)
        <ul>
          	<li><b><i>from</i></b> - (<i>number</i>) the position of the start record</li>
          	<li><b><i>to</i></b> - (<i>number</i>) the position of the end record</li>
        </ul>
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.getIndexRange() is <a href=""></a>.</i>
</ul>

<ul>
    <li>
    	<b>getItems()</b> - returns all records of the datastore
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.getItems() is <a href=""></a>.</i>
</ul>

<ul>
    <li>
    	<b>getIdByIndex(index)</b> - returns the id of the item by its index
        <ul>
          	<li><b><i>index</i></b> - (<i>number</i>) the position of the item</li>
        </ul>
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.getIdByIndex() is <a href="api/gantt_gettaskbyindex.md">gantt.getTaskByIndex()</a>.</i>
</ul>

<ul>
    <li>
    	<b>getIndexById(id)</b> - returns the index of the item by its id
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the item</li>
        </ul>
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.getIndexById() is <a href="api/gantt_gettaskindex.md">gantt.getTaskIndex()</a>.</i>
</ul>

<ul>
    <li>
    	<b>getFirst()</b> - returns the first item of the datastore
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.getFirst() is <a href=""></a>.</i>
</ul>

<ul>
    <li>
    	<b>getLast()</b> - returns the last item of the datastore
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.getLast() is <a href=""></a>.</i>
</ul>

<ul>
    <li>
    	<b>getNext(id)</b> - returns the id of the next item of the datastore
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the item's id</li>
        </ul>
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.getNext() is <a href="api/gantt_getnext.md">gantt.getNext()</a>.</i>
</ul>

<ul>
    <li>
    	<b>getPrev(id)</b> - returns the id of the previous item of the datastore
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the item's id</li>
        </ul>
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.getPrev() is <a href="api/gantt_getprev.md">gantt.getPrev()</a>.</i>
</ul>

<ul>
    <li>
    	<b>destructor()</b> - clears the datastore and removes all attached event handlers. The datastore is not usable after this method is called.
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.destructor() is <a href="api/gantt_destructor.md">gantt.destructor()</a>.</i>
</ul>


<ul>
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
Sample
~~~
<br>
 <i>The twin of datastore.attachEvent() is <a href="api/gantt_attachevent.md">gantt.attachEvent()</a>.</i>
</ul>

<ul>
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
Sample
~~~
<br>
 <i>The twin of datastore.callEvent() is <a href="api/gantt_callevent.md">gantt.callEvent()</a>.</i>
</ul>

<ul>
    <li>
    	<b>detachEvent(id)</b> - detaches a handler from an event (which was attached before by the attachEvent() method)
        <ul>
          	<li><b><i>id</i></b> - (<i>string</i>) the event's id</li>
        </ul>
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of datastore.detachEvent() is <a href="api/gantt_detachevent.md">gantt.detachEvent()</a>.</i>
</ul>


<h3 id="events">Events</h3>  <b>Check</b>

<ul>
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
Sample
~~~
<br>
 <i>The twin of the onItemLoading() event of datastore is the <a href="api/gantt_ontaskloading_event.md">onTaskLoading()</a> event of Gantt.</i>
</ul>

<ul>
    <li>
    	<b>onBeforeParse()</b> - fires before data started to be parsed
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of the onBeforeParse() event of datastore is the <a href="api/gantt_onbeforeparse_event.md">onBeforeParse()</a> event of Gantt.</i>
</ul>

<ul>
    <li>
    	<b>onParse()</b> - fires after data were parsed (became available for API) but before they were rendered in the Gantt chart (<b>проверить описание</b>)
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of the onParse() event of datastore is the <a href="api/gantt_onparse_event.md">onParse()</a> event of Gantt.</i>
</ul>

<ul>
    <li>
    	<b>onBeforeUpdate(id, new_item)</b> - fires before an item is updated
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of an item</li>
          	<li><b><i>new_item</i></b> - (<i>object</i>) the new (updated) object of the item</li>
        </ul>
        Return <i>false</i> to prevent the default action of the event, otherwise <i>true</i>.
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twins of the onBeforeUpdate() event of datastore are the <a href="api/gantt_onbeforetaskupdate_event.md">onBeforeTaskUpdate()</a> and <a href="api/gantt_onbeforelinkupdate_event.md">onBeforeLinkUpdate()</a> events of Gantt.</i>
</ul>

<ul>
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
Sample
~~~
<br>
 <i>The twins of the onAfterUpdate() event of datastore are the <a href="api/gantt_onaftertaskupdate_event.md">onAfterTaskUpdate()</a> and <a href="api/gantt_onafterlinkupdate_event.md">onAfterLinkUpdate()</a> events of Gantt.</i>
</ul>

<ul>
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
Sample
~~~
<br>
 <i>The twins of the onBeforeDelete() event of datastore are the <a href="api/gantt_onbeforetaskdelete_event.md">onBeforeTaskDelete()</a> and <a href="api/gantt_onbeforelinkdelete_event.md">onBeforeLinkDelete()</a> events of Gantt.</i>
</ul>

<ul>
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
Sample
~~~
<br>
 <i>The twins of the onAfterDelete() event of datastore are the <a href="api/gantt_onaftertaskdelete_event.md">onAfterTaskDelete()</a> and <a href="api/gantt_onafterlinkdelete_event.md">onAfterLinkDelete()</a> events of Gantt.</i>
</ul>

<ul>
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
Sample
~~~
<br>
 <i>The twins of the onBeforeAdd() event of datastore are the <a href="api/gantt_onbeforetaskadd_event.md">onBeforeTaskAdd()</a> and <a href="api/gantt_onbeforelinkadd_event.md">onBeforeLinkAdd()</a> events of Gantt.</i>
</ul>

<ul>
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
Sample
~~~
<br>
 <i>The twins of the onAfterAdd() event of datastore are the <a href="api/gantt_onaftertaskadd_event.md">onAfterTaskAdd()</a>  and <a href="api/gantt_onafterlinkadd_event.md">onAfterLinkAdd()</a> events of Gantt.</i>
</ul>

<ul>
    <li>
    	<b>onIdChange(id, new_id)</b> - fires when the id of an item is changed
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of an item</li>
          	<li><b><i>new_id</i></b> - (<i>string|number</i>) the new id of the item</li>
        </ul>
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of the onIdChange() event of datastore is the <a href="api/gantt_ontaskidchange_event.md">onTaskIdChange()</a> event of Gantt.</i>
</ul>

<ul>
    <li>
    	<b>onClearAll()</b> - fires after all items were removed from the datastore
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of the onClearAll() event of datastore is the <a href="api/gantt_onclear_event.md">onClear()</a> event of Gantt.</i>
</ul>



- **onBeforeStoreUpdate**
- **onStoreUpdated**
- **onBeforeFilter**
- **onFilterItem**
- **onFilter**



@relatedapi:
api/gantt_createdatastore.md
api/gantt_getdatastore.md
api/gantt_treedatastore_other.md