placeholder_task
=============

@short:
	adds an empty row into the end of the list of tasks to simplify tasks editing via keyboard
    
@type: boolean
@example:
gantt.config.placeholder_task = true;

@template:	api_config
@descr:
- A placeholder task will be automatically added to the end of the task list.
- Once it's modified from the UI and received the **gantt.updateTask()** call, a new task will be added to the end of the list.
- A placeholder can be detected by its type value:

~~~js
if(task.type == gantt.config.types.placeholder){
   // do something
}
~~~


- Gantt will fire the api/gantt_ontaskcreated_event.md and api/gantt_onaftertaskadd_event.md events when placeholder is inserted.
- [gantt.dataProcessor](desktop/server_side.md) will fire the **onBeforeUpdate** event for the placeholder item, but won't produce any backend requests.


@related:
desktop/inline_editing.md#inlineeditingmodes

@relatedsample:
07_grid/12_inline_edit_key_nav.html