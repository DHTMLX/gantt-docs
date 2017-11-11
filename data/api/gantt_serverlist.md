serverList
=============

@short:	returns a list of options
	
@params: 
- list_name	string 		the name of a list
* options	array		an array of options


@returns:

- list		array		a list of options

@example: 
//returns a list of options with the name 'my_list'
var list = gantt.serverList("my_list"); 
...
//creates and returns the specified list
var list = gantt.serverList("options", [
	{key: 1, label: "John"},
	{key: 2, label: "Adam"},
	{key: 3, label: "Diane"}
]);



@template:	api_method
@descr: 
- If the method is called only with the first parameter, the method will return a list with that name (if exists).
- If the method is called with 2 parameters, dhtmlxGantt will create a list with the specified name and options.
If the list with such a name already exists, dhtmlxGantt will update data in it.
- [Lightbox select controls](desktop/select.md) can be automatically populated using *gantt.serverList*.
If the method is called with 2 parameters, dhtmlxGantt will create a list with the specified name and options. 
If the list with such a name already exists, dhtmlxGantt will update data in it.

That's why if there is a need to update collections, e.g. select options, it's a good idea to create them as a named list of options.

~~~js
// with such declaration it would be possible to load options 
// into the select element from the list named 'persons'
gantt.config.lightbox.sections=[   
	{name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
	{name:"persons", height:23, type:"select", 
    options:serverList("persons", persons_array), map_to:"section_id" }
]; 
~~~

@relatedapi
	api/gantt_updatecollection.md
	
