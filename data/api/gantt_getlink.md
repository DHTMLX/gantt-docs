getLink
=============

@short: returns the dependency link object by the specified id
	

@params:
- id	string, number	the link id

@returns:
link	object 	the link object 

@example:
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});
gantt.getLink(1);// -> {id:1, source:1, target:2, type:1}

@template:	api_method
@descr:

