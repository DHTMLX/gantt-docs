Validating Tasks
==============================================
Validation allows you to control the data entered by the user in order to exclude the possibility of saving incorrect values. 
For example, with validation you can deny assigning 2 simultaneous tasks to a person.

<br>

Generally, to validate the data entered by the user, use the events provided by the dhtmlxGantt API and catch the input data to process them in accordance with their correctness:

Client-side validation
--------------------------
The following events  are mostly important and commonly used for data validation:

- api/gantt_onlightboxsave_event.md - fires when the user clicks on the 'Save' button in the lightbox
-  api/gantt_onbeforetaskadd_event.md - fires before a new task is added to the Gantt chart
- api/gantt_onbeforetaskchanged_event.md - fires  before a task is updated
- api/gantt_onbeforelinkadd_event.md - fires before a new link is added to the Gantt chart
- api/gantt_onbeforelinkupdate_event.md - fires before a link is updated

The simplest validation can be achieved with the help of the api/gantt_onlightboxsave_event.md event. The event is invoked when the user clicks the 'Save' button on the form. 
Returning *true* from the event will save the changes, returning *false* will cancel the further processing and leave the lightbox opened.

For example, to restrict saving of a task, if no users are assigned to it, use the code like this:

~~~js
gantt.attachEvent("onLightboxSave", function(id, item){
	if(!item.text){
		dhtmlx.message({type:"error", text:"Enter task description!"});
		return false;
	}
	if(!item.user){
		dhtmlx.message({type:"error", text:"Choose a worker for this task!"});
		return false;
	}
		return true;
});
~~~
{{sample
	05_lightbox/03_validation.html
}}


Server-side validation
-----------------------------

The solution above has a shortcoming - the event won't fire if the data in the lightbox has been changed through an inline editor  or by dragging over the Gantt chart.

To prove this and catch all changes made in the Gantt chart (editing, creating, deleting etc.),  use the [dataProcessor](desktop/server_side.md) object or, to be precise, one of its events - **onBeforeUpdate**.
The event fires before sending data to the server and after any change, made in the Gantt chart (not only in the lightbox).

~~~js
gantt.init("gantt_here");
gantt.load("data.php");
 
var dp = new dataProcessor("data.php");
dp.init(gantt);

dp.attachEvent("onBeforeUpdate", function (id, status, data) {
     if (!data.text) {
         dhtmlx.message("The event's text can't be empty!");
         return false;
     }
     return true;
});
~~~
 
 where 

- **id** - (*string*) the task's id.
- **status** - (*'updated', 'inserted', deleted'*) the task's operation status.
- **data** - (*object*) the data to send.

Note, when the field fails validation, changes aren't sent to the server, but stay on the client and can be used for further processing.