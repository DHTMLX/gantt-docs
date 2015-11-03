uid
=============


@short:
	returns a unique id

@params:

@returns:

- id 		number		a unique id


@example:

var id = gantt.uid();

@template:	api_method
@descr:
The generated id is unique per page but not globally. 
So you can use the method in the on-page logic. It's not good enough for use as the DB id.


@changelog:
added in version 4.0