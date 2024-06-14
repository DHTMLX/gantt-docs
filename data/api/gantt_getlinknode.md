getLinkNode
=============
@short:returns the HTML element of the specified dependency link
	

@params:
- id	string | number	the link id

@returns:
node	HTMLElement		the HTML element of the link


@example:
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

gantt.getLinkNode(1); //-> <div class=​"gantt_task_link" link_id=​"1">​…​</div>​

@template:	api_method
@descr:

