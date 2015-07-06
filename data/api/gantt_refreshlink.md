refreshLink
=============
@short: refreshes the specifies link
	

@params:
- id	string, number	the link id



@example:
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

var task = gantt.getLink(1);

task.type = 2; /*!*/
gantt.refreshLink(1);       /*!*/

@template:	api_method
@descr:

@relatedapi:
	api/gantt_refreshtask.md
    api/gantt_refreshdata.md