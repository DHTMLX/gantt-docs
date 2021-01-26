datastore
=============
@short: a set of datastore methods
	

@type:object
@example:


@template:	api_config
@descr:

The **datastore** object possesses the following methods and events:

### Methods

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
 <i>The twin of datastore.parse() is <a href="api/gantt_parse.md">gantt.parse()</a></i>
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
 <i>The twin of datastore.getItem() is <a href="   ">gantt.   ()</a></i>
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
 <i>The twin of datastore.updateItem() is <a href="   ">gantt.   ()</a></i>
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
 <i>The twin of datastore.removeItem() is <a href="   ">gantt.   ()</a></i>
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
 <i>The twin of datastore.isVisible() is <a href="api/gantt_istaskvisible.md">gantt.isTaskVisible()</a></i>
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
 <i>The twin of datastore.isVisible() is <a href="api/gantt_istaskvisible.md">gantt.isTaskVisible()</a></i>
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
 <i>The twin of datastore.addItem() is <a href="api/gantt_addtask.md">gantt.addtask()</a></i>
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
 <i>The twin of datastore.changeId() is <a href="api/gantt_changetaskid.md">gantt.changeTaskId()</a></i>
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
 <i>The twin of datastore.exists() is <a href="api/gantt_istaskexists.md">gantt.isTaskExists()</a></i>
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
 <i>The twin of datastore.move() is <a href="api/gantt_movetask.md">gantt.moveTask()</a></i>
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
 <i>The twin of datastore.clearAll() is <a href="api/gantt_clearall.md">gantt.clearAll()</a></i>
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
 <i>The twin of datastore.silent() is <a href="api/gantt_silent.md">gantt.silent()</a></i>
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
 <i>The twin of datastore.refresh() is <a href="api/gantt_refreshtask.md">gantt.refreshTask()</a></i>
</ul>



count() - returns the number of items that are currently loaded into the datastore

countVisible() - returns the number of items that are currently visible

eachItem(callback) - iterates over all tasks of the datastore

filter() - runs the filters and updates visible item array

getIndexRange(from, to) - returns records between the specified indexes

getItems() - return all records of the datastore

getIdByIndex(index) - returns an item by its index

getIndexById(id) - returns the id of the specified item

getFirst() - returns the first item of the datastore

getLast() - returns the last item of the datastore

getNext(id) - return the id of the next item of the datastore

getPrev(id) - return the id of the previous item of the datastore

destructor() - clears the datastore and removes all attached event handlers. The datastore is not usable after this method is called

attachEvent - https://docs.dhtmlx.com/gantt/api__gantt_attachevent.html

callEvent - https://docs.dhtmlx.com/gantt/api__gantt_callevent.html

detachEvent - https://docs.dhtmlx.com/gantt/api__gantt_detachevent.html


@relatedapi:
api/gantt_createdatastore.md
api/gantt_getdatastore.md
api/gantt_treedatastore_other.md