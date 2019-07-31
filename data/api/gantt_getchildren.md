getChildren
=============

@short:returns the 1st-level child tasks of the specified parent branch
	

@params:
- id	string,number		the parent branch's id

@returns:
- ids	array				an array of children's ids


@example:
var tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getChildren("p_1");//->["t_1", "t_2"] /*!*/

@related:
	desktop/tree_column.md
@relatedsample:
	07_grid/03_filtering.html
@relatedapi: 
	api/gantt_haschild.md
    api/gantt_getnext.md
    api/gantt_getprev.md
    api/gantt_getsiblings.md
    api/gantt_getnextsibling.md 
    api/gantt_getprevsibling.md 
    api/gantt_eachtask.md
@template:	api_method
@descr:
Another method to iterate over child tasks of some task is api/gantt_eachtask.md.
