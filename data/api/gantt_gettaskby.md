getTaskBy
=============

@short:
	finds a task by the specified criteria

@params:
- propertyName			string,function			the name of the property to match, or a filter function
* propertyValue			string,number,array		the property value
* types					object					an object with types of the tasks which should be returned

@returns:
- tasks			Array &lt;Task&gt;		array of task objects

@example:

// simple search
const userTasks = gantt.getTaskBy("user_id", [5]);

// (task: object) => boolean
let userTasks = gantt.getTaskBy(function(task){
   return task.user_id == 5 || !task.user_id;
});

userTasks = gantt.getTaskBy(task => task.user_id == 5);


@descr:

- The method can be used for selecting tasks by the property value, e.g. find tasks of a specific user, find completed tasks, etc.
- `gantt.getTaskBy(propertyName, propertyValue)` uses loose equality check ("double equals", ==)
- The result of `gantt.getTaskBy(propertyName, propertyValue)` can be cached by gantt, thus this overload can work faster than `gantt.getTaskBy((task: object) => boolean)`

By default **gantt.getTaskBy()** returns only task and milestone items that match the criteria, while project items are omitted.

To select records of all types, use the following value of the third parameter:

~~~js
gantt.getTaskBy("progress", 1, { task: true, project: true, milestone: true });
~~~

To return items of only a specific type, specify the type value in the third parameter:

~~~js
gantt.getTaskBy("progress", 1, { project: true})
~~~

@template:	api_method

@relatedapi:
api/gantt_getsubtaskduration.md
api/gantt_getsubtaskdates.md

@relatedsample:
	11_resources/05_resource_usage_templates.html

@changelog: the **types** parameter was added in v8.0