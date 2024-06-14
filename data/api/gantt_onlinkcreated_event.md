onLinkCreated
=============

@short: fires when a user creates a new link between tasks

@params:
- link		Link		the object of a new link

@returns:  
- result     boolean       returning `false` will cancel the creation of a new link, returning `true` will continue the default processing
 
@example:
gantt.attachEvent("onLinkCreated", function(link){
    // your code here
    return true;
});

@template:	api_event
@descr:
The event fires before a new link is displayed, which allows you to **cancel the creation** of a link.


@changelog:
added in v6.2.2
