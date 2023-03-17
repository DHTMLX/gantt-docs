getSiblings
=============
@short:returns siblings of the specified  task (including itself) 
	

@params:
- id	string,number	the task id


@returns:
- siblings	array	the ids of the task's siblings





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
 
gantt.getSiblings("t_1"); ->  ["t_1", "t_2] /*!*/


@template:	api_method
@relatedapi:
    api/gantt_getnextsibling.md 
    api/gantt_getprevsibling.md 
	api/gantt_getparent.md
    api/gantt_haschild.md
    api/gantt_getchildren.md
    
@descr:

Siblings are tasks of the same tree level
