treeDatastore
=============
@short: a set of treeDatastore methods
	

@type:object
@example:

@template:	api_config
@descr:

TreeDatastore extends the [Datastore](api/gantt_datastore_other.md) and has all of its methods.

The extended API of the treeDatastore object provides the following [methods](#methods) and [events](#events):

<h3 id="methods">Methods</h3>

<ul><li>
    	<b>move(sid, tindex, parent)</b> - moves an item to the new position or to a new parent
        <ul>
          	<li><b><i>sid</i></b> - (<i>string|number</i>) the id of the item to move</li>
          	<li><b><i>tindex</i></b> - (<i>number</i>) the index of the position that the item will be moved to (the index within a branch)</li>
          	<li><b><i>parent</i></b> - (<i>string|number</i>) the parent id. If specified, the <b>tindex</b> will refer to the index in the
<b>'parent'</b> branch</li>
        </ul>
        Returns <i>false</i> if the action has been canceled using <b>onBeforeItemMove</b>, returns <i>true</i> otherwise.
</li></ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of treeDatastore.move() is <a href="api/gantt_movetask.md">gantt.moveTask()</a>.</i>
</ul>

<ul><li>
    	<b>getBranchIndex(id)</b> - returns the index of an item in the branch
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the item</li>
        </ul>
      
</li></ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of treeDatastore.getBranchIndex() is <a href="">gantt.   ()</a>.</i> <b>Twin???</b>
</ul>


<ul><li>
    	<b>hasChild(id)</b> - checks whether the specified item has child items
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the item</li>
        </ul>
      Returns <i>true</i> if the item has some child item(s). Otherwise, <i>false</i>.

</li></ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of treeDatastore.hasChild() is <a href="api/gantt_haschild.md">gantt.hasChild()</a>.</i>
</ul>

<ul><li>
    	<b>getChildren(id)</b> - returns the 1st-level child items of the specified parent branch
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the parent branch</li>
        </ul>
      Returns an array of children's ids.
</li></ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of treeDatastore.getChildren() is <a href="api/gantt_getchildren.md">gantt.getChildren()</a>.</i>
</ul>

<ul><li>
    	<b>isChildOf(childId, parentId)</b> - checks whether an item is a child of a different item
        <ul>
          	<li><b><i>childId</i></b> - (<i>string|number</i>) the id of an item that you want to check as a child</li>
          	<li><b><i>parentId</i></b> - (<i>string|number</i>) the id of an item that you want to check as a parent</li>
        </ul>
      Returns <i>true</i>, if the item is a child of the specified parent item. Otherwise, <i>false</i>.
</li></ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of treeDatastore.isChildOf() is <a href="api/gantt_ischildof.md">gantt.isChildOf()</a>.</i>
</ul>

<ul><li>
    	<b>getSiblings(id)</b> - returns siblings of the specified item (including itself)
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the item</li>
        </ul>
      Returns an array with the ids of the item's siblings.
</li></ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of treeDatastore.getSiblings() is <a href="api/gantt_getsiblings.md">gantt.getSiblings()</a>.</i>
</ul>

<ul><li>
    	<b>getNextSibling(id)</b> - returns the id of the next item of the same level
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the item</li>
        </ul>
      Returns the id of the next sibling.
</li></ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of treeDatastore.getNextSibling() is <a href="api/gantt_getnextsibling.md">gantt.getNextSibling()</a>.</i>
</ul>

<ul><li>
    	<b>getPrevSibling(id)</b> - returns the id of the previous item of the same level
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the item</li>
        </ul>
      Returns the id of the previous sibling.
</li></ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of treeDatastore.getPrevSibling() is <a href="api/gantt_getprevsibling.md">gantt.getPrevSibling()</a>.</i>
</ul>

<ul><li>
    	<b>getParent(id)</b> -  returns the id of the parent item
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the item</li>
        </ul>
</li></ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of treeDatastore.getParent() is <a href="api/gantt_getparent.md">gantt.getParent()</a>.</i>
</ul>

<ul><li>
    	<b>calculateItemLevel(item)</b> -  calculates the level of nesting of an item
        <ul>
          	<li><b><i>item</i></b> - (<i>object</i>) the item's object</li>
        </ul>
</li></ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of treeDatastore.calculateItemLevel() is <a href="api/gantt_calculatetasklevel.md">gantt.calculateTaskLevel()</a>.</i>
</ul>

<ul><li>
    	<b>setParent(item, newParentId)</b> -  sets the parent for an item
        <ul>
          	<li><b><i>item</i></b> - (<i>object</i>) the item's object</li>
          	<li><b><i>newParentId</i></b> - (<i>string|number</i>) the id of the parent</li>
        </ul>
</li></ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of treeDatastore.setParent() is <a href="api/gantt_setparent.md">gantt.setParent()</a>.</i>
</ul>

<ul><li>
    	<b>eachItem(callback, parentId)</b> -  iterates over all children of a specific item
        <ul>
          	<li><b><i>callback</i></b> - (<i>function</i>) the callback function</li>
          	<li><b><i>parentId</i></b> - (<i>string|number</i>) the id of the parent</li>
        </ul>
</li></ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of treeDatastore.eachItem() is <a href="api/gantt_eachtask.md">gantt.eachTask()</a>.</i>
</ul>

<ul><li>
    	<b>eachParent(callback, startItem)</b> -  iterates over all parent items of the specified item
        <ul>
          	<li><b><i>callback</i></b> - (<i>function</i>) the callback function</li>
          	<li><b><i>startItem</i></b> - (<i>string|number</i>) the id of the item the parent item of which should be iterated over</li>
        </ul>
</li></ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of treeDatastore.eachParent() is <a href="api/gantt_eachparent.md">gantt.eachParent()</a>.</i>
</ul>

<ul><li>
    	<b>open(id)</b> -  opens the branch with the specified id
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the branch id</li>
        </ul>
</li></ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of treeDatastore.open() is <a href="api/gantt_open.md">gantt.open()</a>.</i>
</ul>

<ul><li>
    	<b>close(id)</b> -  closes the branch with the specified id
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the branch id</li>
        </ul>
</li></ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of treeDatastore.close() is <a href="api/gantt_close.md">gantt.close()</a>.</i>
</ul>

<h3 id="events">Events</h3>

<ul>
    <li>
    	<b>onBeforeItemMove(id, parent, tindex)</b> - fires before an item is moved to a new position
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the item to move</li>
          	<li><b><i>parent</i></b> - (<i>string|number</i>) the parent id</li>
          	<li><b><i>tindex</i></b> - (<i>number</i>) the index of the position in the parent branch that the item will be moved to</li>
        </ul>
        Return <i>false</i> to prevent the default action of the event, otherwise <i>true</i>.
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of the onBeforeItemMove() event of treeDatastore is the <a href="api/gantt_onbeforetaskmove_event.md">onBeforeTaskMove()</a> event of Gantt.</i>
</ul>

<ul>
    <li>
    	<b>onAfterItemMove(id, parent, tindex)</b> - fires after an item was moved to a new position
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the item to move</li>
          	<li><b><i>parent</i></b> - (<i>string|number</i>) the parent id</li>
          	<li><b><i>tindex</i></b> - (<i>number</i>) the index of the position in the parent branch that the item will be moved to</li>
        </ul>
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of the onAfterItemMove() event of treeDatastore is the <a href="api/gantt_onaftertaskmove_event.md">onAfterTaskMove()</a> event of Gantt.</i>
</ul>

<ul>
    <li>
    	<b>onItemOpen(id)</b> - fires on opening a branch
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the branch</li>
        </ul>
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of the onItemOpen() event of treeDatastore is the <a href="api/gantt_ontaskopened_event.md">onTaskOpened()</a> event of Gantt.</i>
</ul>

<ul>
    <li>
    	<b>onItemClose(id)</b> - fires on closing a branch
        <ul>
          	<li><b><i>id</i></b> - (<i>string|number</i>) the id of the branch</li>
        </ul>
</li>
</ul>

<ul>
~~~js
Sample
~~~
<br>
 <i>The twin of the onItemClose() event of treeDatastore is the <a href="api/gantt_ontaskclosed_event.md">onTaskClosed()</a> event of Gantt.</i>
</ul>


@relatedapi:
api/gantt_createdatastore.md
api/gantt_getdatastore.md
api/gantt_treedatastore_other.md