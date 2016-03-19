onGridHeaderClick
=============
@short:fires when the user clicks on the grid's header
	

@params:
- name	string	the name attribute of the column which header the user clicks on
- e		Event	a native event object

@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

@example:
gantt.attachEvent("onGridHeaderClick", function(name, e){
	//any custom logic here
    return true;
});

@descr:
the event is blockable - returning false will cancel further processing

@template:	api_event
@descr:

