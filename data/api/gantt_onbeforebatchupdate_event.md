onBeforeBatchUpdate
=============

@short:
	fires before the api/gantt_batchupdate.md method is called

@params:

@returns:  
 - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@example:
gantt.attachEvent("onBeforeBatchUpdate", function(){
	// your code here
    return true;
});


@template:	api_event
@descr:
the event is blockable - returning false will cancel further processing

@relatedapi:
- api/gantt_batchupdate.md
- api/gantt_onafterbatchupdate_event.md

@changelog:
added in version 4.0