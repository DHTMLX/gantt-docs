isLinkAllowed
=============

@short:checks whether the specified link is correct
	

@params:
- link	object 		the link object

@returns:
- value		boolean		<i>true</i>, if the link is correct. Otherwise, <i>false</i>


@example:
var link = {
    source:2,
    target:2,
    type:gantt.config.link.start_to_start
};
if(gantt.isLinkAllowed(link))// -> false (because source==target)
	gantt.addLink(link);


@template:	api_method
@descr:
The cases when a link is considered as incorrect:

1. The source task's id is equal to the target task's id.
2. If the type is set to a value that is not 0, 1 or 2, 3.
3. If the link failed the validation.
4. If the link is created from the project task to its sub-task. The dates of the project task depends on the dates of children tasks.

{{note
The method invokes the api/gantt_onlinkvalidation_event.md event. Therefore, if the api/gantt_onlinkvalidation_event.md event returns `false`, a link will be also considered as incorrect.
}}

<br>

Note, there is the 2nd way to call the method:

~~~js
gantt.isLinkAllowed(from, from_start, to, to_start )
~~~

where 

- **from**  - (*string, number*)	the id of the source task
- **from_start** - 	(*boolean*)		<i>true</i>, if the link is being dragged from the start of the  source task, <i>false</i> - if <br> from the end of the task
- **to** - (*string, number*)	the id of the target task( 'null' or 'undefined', if the target task isn't specified yet)
- **to_start** - (*boolean*)		<i>true</i>, if the link is being dragged to the start of the target task, <i>false</i> - if <br> to the end of the task

For example, the code above you alter as in:

~~~js
//var link = {
//    source:2,
//    target:2,
//    type:gantt.config.link.start_to_start
//};

if(gantt.isLinkAllowed(2, true, 2, true))// -> false (because source==target)
	//do something
    
~~~