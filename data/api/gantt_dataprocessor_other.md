dataprocessor
=============
@short: a set of dataprocessor methods
	

@type:object

@example:

@template:	api_config
@descr:

A new instance of DataProcessor can be created using api/gantt_createdataprocessor.md method. Alternatively, the api/gantt_dataprocessor.md constructor provides a legacy way to create a DataProcessor instance. <br>
The **dataprocessor** object possesses the following [methods](#methods) and [events](#events):

<h3 id="methods">Methods</h3>

<ul id="attachEvent">
	<li>
		<b class=submethod>attachEvent (name, handler, settings): string</b> - attaches the handler to an API event of DataProcessor
		<ul>
			<li><b><i>name</i></b> - (<i>string</i>) - the event's name, case-insensitive</li>
			<li><b><i>handler</i></b> - (<i>Function</i>) - the handler function</li>
			<li><b><i>settings?</i></b> - (<i>object</i>) - optional, an object with settings for the event handler</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
const dp = gantt.createDataProcessor({
	url: "/api",
	mode: "REST",
});

dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
	console.log("Updated task:", id);
});
~~~
</ul>

<ul id="detachEvent">
	<li>
		<b class=submethod>detachEvent (id): void</b> - detaches a handler from an event (which was attached before by the <b>attachEvent()</b> method)
		<ul>
			<li><b><i>id</i></b> - (<i>string</i>) - the event's id</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
const dp = gantt.createDataProcessor({
	url: "/api",
	mode: "REST",
});

const handlerId = dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
	console.log("Updated task:", id);
});

// detach a listener
dp.detachEvent(handlerId);
~~~
</ul>

<ul id="getState">
	<li>
		<b class="submethod">getState (id): string</b> - returns the state of an item (updated or not)
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - the ID of an item</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
const status = dp.getState(id);
~~~
</ul>

<ul id="ignore">
	<li>
		<b class="submethod">ignore (code): void</b> - executes a block without triggering DataProcessor
		<ul>
			<li><b><i>code</i></b> - (<i>Function</i>) - data modification code</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.ignore(() => {
	// won't be saved
	gantt.addTask({
		id: 10,
		text: "Task #5",
		start_date: "03-02-2025",
		duration: 5
	});
});
~~~

<p>You can place data adding and deleting operations here when you don't want to save that changes on the server side.</p>
<i>The dp.ignore() method works similarly to <a href="api/gantt_silent.md">gantt.silent()</a>.</i>
</ul>

<ul id="setTransactionMode">
	<li>
		<b class="submethod">setTransactionMode (mode, total): void</b> - configures the data sending mode
		<ul>
			<li><b><i>mode</i></b> - (<i>string</i>) - the data sending mode, "GET"|"POST"|"REST"|"JSON"|"REST-JSON"</li>
			<li><b><i>total</i></b> - (<i>boolean</i>) - defines, whether all data is sent all at once, or each record is sent by a separate request</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.setTransactionMode("POST", true);
~~~

<p>To send custom HTTP request headers or additional data to the server, specify the first parameter as an object with the following properties:</p>

<ul>
	<li><b><i>mode</i></b> - (<i>string</i>) - data sending mode, "GET", "POST", "REST", "JSON", "REST-JSON"</li>
	<li><b><i>headers</i></b> - (<i>object</i>) - a set of headers, defined as <code>"key":"value"</code> pairs that should be sent with a request</li>
	<li><b><i>payload</i></b> - (<i>object</i>) - additional data, set as <code>"key":"value"</code> pairs that should be sent to the server together with headers</li>
</ul>
~~~js
dp.setTransactionMode({
	mode: "POST",
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		"Accept-Language": "fr-FR"
	},
	payload: {
		"user_id": "12"
	}
}, true);
~~~
</ul>

<ul id="setUpdated">
	<li>
		<b class="submethod">setUpdated (rowId, [mode, state]): void</b> - marks an item as updated
		<ul>
			<li><b><i>rowId</i></b> - (<i>string | number</i>) - the ID of an item to set the update status for</li>
			<li><b><i>mode?</i></b> - (<i>boolean</i>) - optional, <code>true</code> (default) for "updated", <code>false</code> for "not updated"</li>
			<li><b><i>state?</i></b> - (<i>string</i>) - optional, the update mode name, <code>"updated"</code> by default</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.setUpdated(1);
dp.setUpdated(2, true, "deleted");
~~~
</ul>



<h3 id="events">Events</h3> 

<ul id="onAfterUpdate">
	<li>
		<b class="submethod">onAfterUpdate (id, action, tid, response): void</b> - fires after receiving and processing the server-side response
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - the ID of the updated item</li>
			<li><b><i>action</i></b> - (<i>string</i>) - the response status (operation type)</li>
			<li><b><i>tid</i></b> - (<i>string</i>) - the new ID (applicable only for insert operations)</li>
			<li><b><i>response</i></b> - (<i>mixed</i>) - the XML node or JSON object containing the parsed response</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
	if (action === "error") {
		alert(`Server error: ${response.message}`);
	}
});
~~~
</ul>

<ul>
<p><b>Possible response statuses:</b></p>
<ul>
	<li><code>updated</code></li>
	<li><code>inserted</code></li>
	<li><code>deleted</code></li>
	<li><code>invalid</code></li>
	<li><code>error</code></li>
</ul>
</ul>

<ul id="onBeforeDataSending">
	<li>
		<b class="submethod">onBeforeDataSending (id, state, data): void</b> - fires before sending data to a server
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - the ID of the item</li>
			<li><b><i>state</i></b> - (<i>string</i>) - the item's state (operation type)</li>
			<li><b><i>data</i></b> - (<i>object</i>) - the serialized data that will be sent to the server</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.attachEvent("onBeforeDataSending", (id, state, data) => {
	// Custom logic before sending data
	return true;
});
~~~
</ul>

<ul>
<p>The event fires for each data update request (after <code>onBeforeUpdate</code>).</p>
<p>Returning <code>false</code> from the event handler will prevent data from being sent to the server.</p>

<p><b>Possible response statuses:</b></p>
<ul>
	<li><code>updated</code></li>
	<li><code>inserted</code></li>
	<li><code>deleted</code></li>
	<li><code>invalid</code></li>
	<li><code>error</code></li>
</ul>
</ul>

<ul id="onBeforeUpdate">
	<li>
		<b class="submethod">onBeforeUpdate (id, state, data): void</b> - fires before updating a record (or records)
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - the item's ID</li>
			<li><b><i>state</i></b> - (<i>string</i>) - the item's state (operation type)</li>
			<li><b><i>data</i></b> - (<i>object</i>) - the data that will be sent to the server</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.attachEvent("onBeforeUpdate", (id, state, data) => {
	// Custom logic before updating
	return true;
});
~~~
</ul>

<ul>
<p>The event fires for each updating record and before <code>onBeforeDataSending</code>.</p>
<p>Returning <code>false</code> from the event handler will prevent data from being sent to the server.</p>

<p><b>Possible response statuses:</b></p>
<ul>
	<li><code>updated</code></li>
	<li><code>inserted</code></li>
	<li><code>deleted</code></li>
	<li><code>invalid</code></li>
	<li><code>error</code></li>
</ul>
</ul>

<ul id="onRowMark">
	<li>
		<b class="submethod">onRowMark (id, state, mode, invalid): void</b> - fires before each attempt to mark the updated item
		<ul>
			<li><b><i>id</i></b> - (<i>string | number</i>) - the ID of the item for which the error occurs</li>
			<li><b><i>state</i></b> - (<i>string</i>) - the item's state (operation type)</li>
			<li><b><i>mode</i></b> - (<i>boolean</i>) - <code>true</code> for adding an update mark, <code>false</code> for removing</li>
			<li><b><i>invalid</i></b> - (<i>object</i>) - details about errors, if any</li>
		</ul>
	</li>
</ul>

<ul>
~~~js
dp.attachEvent("onRowMark", (id, state, mode, invalid) => {
	// Custom logic before marking an item
	return true;
});
~~~
</ul>

<ul>
<p>The event is blockable. Returning <code>false</code> will prevent the item from being marked.</p>
</ul>



@relatedapi:
api/gantt_createdataprocessor.md
api/gantt_dataprocessor.md

@related:
desktop/server_side.md