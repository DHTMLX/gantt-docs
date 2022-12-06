mixin
=============


@short:
	adds properties of the 'source' object into the 'target' object

@params:

- target		object		the target object
- source		object		the source object
* force			boolean		optional, if true, properties of the 'source' will overwrite matching properties of the 'target', if there are any. If false (by default), properties that already exist in the 'target' will be omitted	




@example:

gantt.mixin(target, source, force);

@template:	api_method
@descr:

@changelog:
added in version 4.0

