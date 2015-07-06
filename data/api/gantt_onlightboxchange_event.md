onLightboxChange
=============
@short:fires when the structure of the lightbox is changed
	

@params:
- old_type	string	the name of the initial lighbox's structure
- new_type	string	the name of the new lighbox's structure

@example:
gantt.attachEvent("onLightboxChange", function(old_type, new_type){
	if(new_type == "milestone"){
    	alert("You have changed the type of your task to 'milestone'")
    }
});

@template:	api_event
@descr:

