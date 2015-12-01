defined
=============

@short:
	returns false if the provided argument is undefined, otherwise true

@params:

- task			object			the object that should be checked 						

@returns:
- state			boolean			false if the provided argument is undefined, otherwise true



@example:
// check if the "custom_property" property is defined for the task object
if(gantt.defined(task.custom_property)){
  // ..
};

@template:	api_method
@descr:
@changelog:
added in version 4.0