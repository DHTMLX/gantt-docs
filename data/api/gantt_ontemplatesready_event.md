onTemplatesReady
=============

@short:fires when the dhtmlxGantt templates are initialized
	



@example: 
gantt.attachEvent("onTemplatesReady", function(){
	//any custom logic here
});

@template:	api_event
@descr: 
The event informs that templates of dhtmlxGantt are ready. The event is a good point for creating a custom view.

It's a good practice to write the code of custom view creation in the handler of onTemplatesReady event. It will guarantee that custom view's templates will be ready before grid initialization, 
and custom view will be correctly rendered on the page.
