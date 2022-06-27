changeLinkId
=============
@short:changes the link's id
	
@params: 
- id	string, number	the current link's id
- new_id	string, number	the new link's id




@example:
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

gantt.changeLinkId(1, 5); //changes the link's id '1 -> 5' /*!*/


@template:	api_method
@descr:
The method fires the  api/gantt_onlinkidchange_event.md event.

@relatedapi:
	api/gantt_onlinkidchange_event.md
	api/gantt_changetaskid.md