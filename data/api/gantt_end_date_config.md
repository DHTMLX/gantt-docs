end_date
=============

@short:sets the  end value of the time scale
	

@type: Date
@example:
gantt.config.start_date = new Date(2018, 08, 10);
gantt.config.end_date = new Date(2018, 08, 20);
 
gantt.init("gantt_here");


@template:	api_config
@descr:
- If both the **start_date** and **end_date** options are specified and you create a task that is outside the range, the task won't be displayed in the chart.
- Optional parameters of api/gantt_init.md method can be used as initial values of api/gantt_start_date_config.md and api/gantt_end_date_config.md configs.
- api/gantt_start_date_config.md and api/gantt_end_date_config.md overwrites api/gantt_fit_tasks_config.md, if you want use these settings together you'll need to [manage the time scale from code](desktop/configuring_time_scale.md#range).

In this case we can extend the range:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 var taskStart = task.start_date;
 var taskEnd = task.end_date;
 var scaleStart = gantt.config.start_date;
 var scaleEnd = gantt.config.end_date;

 // if the task is out of the range
 if(scaleStart > taskEnd || scaleEnd < taskStart ){
  // update timescale range
  gantt.config.end_date=new Date(Math.max(taskEnd.valueOf(), scaleEnd.valueOf()));
  gantt.config.start_date=new Date(Math.min(taskStart.valueOf(),scaleStart.valueOf()));
  gantt.render();
 }    
 return true;
});
~~~

Or add validation to the lightbox control:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 	var taskStart = task.start_date;
 	var taskEnd = task.end_date;
 	var scaleStart = gantt.config.start_date;
 	var scaleEnd = gantt.config.end_date;

    // check if the task is out of the range
    if(scaleStart > taskEnd || scaleEnd < taskStart ){
        gantt.message({
            type:"warning", 
            text:"Warning! The task is outside the date range!",
            expire:5000
        });
          return false;
    } 
    return true;
});
~~~

@related:
	desktop/configuring_time_scale.md#settingtheminmasvaluesofthescale
@relatedapi:
	api/gantt_start_date_config.md
	api/gantt_fit_tasks_config.md
	api/gantt_init.md