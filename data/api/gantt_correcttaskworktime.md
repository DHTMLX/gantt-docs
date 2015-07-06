correctTaskWorkTime
=============
@short:recalculates the task duration in the work time
	

@params:
- task	object	the task's object





@example:

if(gantt.config.work_time && gantt.config.correct_work_time){
	if(drag.mode == gantt.config.drag_mode.resize){
		if(drag.left){
			task.start_date =gantt.getClosestWorkTime({date:task.start_date,dir:'future'});
		}else{
			task.end_date = gantt.getClosestWorkTime({date:task.end_date, dir:'past'});
		}
	}else if(drag.mode == gantt.config.drag_mode.move){
		gantt.correctTaskWorkTime(task);
}       
            
@template:	api_method
@descr:

