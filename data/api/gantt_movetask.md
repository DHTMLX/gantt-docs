moveTask
=============


@short:moves a task to a new position

@params: 
- sid		string/number			the id of the task to move
- tindex	number					the index of the position that the task will be moved to <br> (the index within a branch)
* parent	string/number			the parent id. If specified, the <b>tindex</b> will  refer to the  index in the <br> <b>'parent'</b> branch

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
 
gantt.moveTask("t_1", 1); /*!*/
//-> after such a move, the task "t_1" will have the root level

@template:	api_method
@descr:

@relatedapi:
	api/gantt_gettaskindex.md
	api/gantt_onbeforetaskmove_event.md
	api/gantt_onaftertaskmove_event.md