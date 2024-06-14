hasChild
=============
@short:returns the number of child task(s) 
	

@params:
- id	string | number	the task id

@returns:
- childs	number | undefined	the number of child tasks (if exist), or "undefined" otherwise




@example:
const tasks = {
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

gantt.hasChild("p_1"); //-> 2 /*!*/
gantt.hasChild("t_1"); //-> undefined /*!*/

@template:	api_method
@descr:

@relatedapi:
	api/gantt_getchildren.md
    api/gantt_getnext.md
    api/gantt_getprev.md
    api/gantt_getsiblings.md
    api/gantt_getnextsibling.md 
    api/gantt_getprevsibling.md 