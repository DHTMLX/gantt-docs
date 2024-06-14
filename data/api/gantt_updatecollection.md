updateCollection
=============
@short: 
	updates the specified collection with new options

@params: 
- collection	string | number 		the name of the collection to update
- options		array	the new values of the collection

@example: 
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", height:22, map_to:"priority", type:"select", /*!*/     
    	options:gantt.serverList("priorities", values_array)},     /*!*/                                                                
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.updateCollection("priorities", new_values_array); /*!*/     


@returns: 
- collection	boolean		true, if the update was successful; false, if the collection wasn't found
@template:	api_method
@relatedapi:
	api/gantt_serverlist.md
    api/gantt_onoptionsload_event.md
@descr: 
 
- The method calls the api/gantt_onoptionsload_event.md event and resets the lightbox. 
- The collection can be created with the api/gantt_serverlist.md method.

###Examples

####Select control

Let's assume that you have the lightbox as in:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", map_to:"priority", type:"select", 
    	options:gantt.serverList("priorities")},  /*!*/                                                                  
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

With such declaration it would be possible to update options in the select control through the list named 'priorities'. <br>
To update the 'priorities' list you can use:
~~~js
gantt.updateCollection("priorities", new_priorities_array);
~~~

