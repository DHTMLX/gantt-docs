getTaskBy
=============

@short:
	finds a task by the specified criteria

@params:
- propertyName			string,function			the name of the property to match, or a filter function
* propertyValue			string,number,array		the property value

@returns:
- tasks			Array &lt;Task&gt;		array of task objects

@example:

// simple search
var userTasks = gantt.getTaskBy("user_id", [5]);

// (task: object) => boolean
var userTasks = gantt.getTaskBy(function(task){
   return task.user_id == 5 || !task.user_id;
});

var userTasks = gantt.getTaskBy(task => task.user_id == 5);


@descr:

- The method can be used for selecting tasks by the property value, e.g. find tasks of a specific user, find completed tasks, etc.
- Tasks of the [project type](api/gantt_types_config.md) are not iterated.
- `gantt.getTaskBy(propertyName, propertyValue)` uses loose equality check ("double equals", ==)
- The result of `gantt.getTaskBy(propertyName, propertyValue)` can be cached by gantt, thus this overload can work faster than `gantt.getTaskBy((task: object) => boolean)`



@template:	api_method

@relatedapi:
api/gantt_getsubtaskduration.md
api/gantt_getsubtaskdates.md

@relatedsample:
	11_resources/05_resource_usage_templates.html