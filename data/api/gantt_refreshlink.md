refreshLink
=============
@short: refreshes the specifies link
	

@params:
- id	string | number	the link id



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

You can use this method to repaint a link after changing its properties. Unlike api/gantt_updatelink.md, this method does not trigger the [DataProcessor](desktop/server_side.md), and no updates will be sent to the server.

@relatedapi:
    api/gantt_refreshtask.md
    api/gantt_refreshdata.md
    api/gantt_updatetask.md
    api/gantt_updatelink.md