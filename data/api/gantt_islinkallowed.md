isLinkAllowed
=============

@short:checks whether the specified link is correct
	

@params:
- linkOrFrom	string | number | LinkForValidation 		either ID of the source (predecessor) task or a link object with the following properties:
* from_start	boolean 		optional, specifies if the link is being dragged from the start of the source (predecessor) task (*true*) or from its end (*false*). Not needed at all when the first parameter is specified as an object
* to	string | number | null | undefined 		optional, the ID of the target (successor) task. Can have the *null* or *undefined* value if the target task isn't specified yet. Not needed at all when the first parameter is specified as an object
* to_start	boolean 		optional, specifies if the link is being dragged to the start of the target (successor) task (*true*) or from its end (*false*). Not needed at all when the first parameter is specified as an object

@returns:
- value		boolean		<i>true</i>, if the link is correct. Otherwise, <i>false</i>


@example:
const link = {
    source:2,
    target:2,
    type:gantt.config.link.start_to_start
};
if(gantt.isLinkAllowed(link))// -> false (because source==target)
	gantt.addLink(link);


@template:	api_method
@descr:

The link object is different from the [Link](desktop/link_properties.md) object and has only 3 properties:

- <span class=subproperty>**source**</span> - (*string | number*) - the ID of the source (predecessor) task.
- <span class=subproperty>**target**</span> - (*string | number*) - the ID of the target (successor) task.
- <span class=subproperty>**type**</span> - (*string*) - the link type.



The cases when a link is considered as incorrect:

1. The source task's id is equal to the target task's id.
2. If the type is set to a value that is not 0, 1, 2, or 3.
3. If the link failed the validation.
4. If the link is created from the project task to its sub-task. The dates of the project task depend on the dates of children tasks.

{{note
The method invokes the api/gantt_onlinkvalidation_event.md event. Therefore, if the api/gantt_onlinkvalidation_event.md event returns `false`, a link will be also considered as incorrect.
}}

<br>

Note, there is the 2nd way to call the method:

~~~js
gantt.isLinkAllowed(from, from_start, to, to_start )
~~~

Here is the type description of the arguments:

- **from** - (*string | number | object*) - either ID of the source (predecessor) task or a link object with the following properties:
- **from_start?** - (*boolean*) - optional, specifies if the link is being dragged from the start of the source (predecessor) task (*true*) or from its end (*false*). Not needed at all when the first parameter is specified as an object
- **to?** - (*string | number | null | undefined
*) - optional, the ID of the target (successor) task. Can have the *null* or *undefined* value if the target task isn't specified yet. Not needed at all when the first parameter is specified as an object
- **to_start?** - (*boolean*) - optional, specifies if the link is being dragged to the start of the target (successor) task (*true*) or from its end (*false*). Not needed at all when the first parameter is specified as an object


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