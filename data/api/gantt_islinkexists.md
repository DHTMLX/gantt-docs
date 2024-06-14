isLinkExists
=============
@short:checks whether the specified link exists
	

@params:
- id	string | number	the link id


@returns:
- link	boolean		<i>true</i>, if such a link exists. Otherwise, <i>false</i>

@example:
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});
gantt.isLinkExists(1); // ->true
@template:	api_method
@descr:

