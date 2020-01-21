onEmptyClick
=============

@short: fires when the user clicks on an empty space in the Gantt chart (not on tasks)
	

@params: 
- e 	Event	a native event object

@example: 
	
gantt.attachEvent("onEmptyClick", function (e){
       //any custom logic here
});



@template:	api_event
@descr: 

The **onEmptyClick** event also fires when the user clicks on a link. You can  prevent this feature of the event. To do this, you need to check whether the `e.target` element or the closest one to it contains the **link_attribute** property, as in:

~~~js
gantt.attachEvent("onEmptyClick", function (e) {
  var domHelpers = gantt.utils.dom;
  if(!domHelpers.closest(e.target, "[" + gantt.config.link_attribute + "]")){
    gantt.message("not a link");
  }else{
    gantt.message("link!"); 
  }
});
~~~