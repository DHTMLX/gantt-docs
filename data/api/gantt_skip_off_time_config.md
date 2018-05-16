skip_off_time
=============

@short:hides non-working time from the time scale
	
@edition: pro
@type: boolean
@default:false
@example:
//calculates duration in working hours and hides non-working time from the chart
gantt.config.duration_unit = "hour";
gantt.config.work_time = true; 
gantt.config.skip_off_time = true; /*!*/

gantt.init("gantt_here");

@template:	api_config
@descr:
{{pronote This functionality is available in the PRO edition only.}}

@related:
	 desktop/working_time.md
@relatedapi:
	api/gantt_correct_work_time_config.md
     api/gantt_work_time_config.md