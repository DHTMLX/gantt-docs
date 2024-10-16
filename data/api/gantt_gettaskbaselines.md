getTaskBaselines
=============


@short: returns an array of baselines of a specific task from the datastore
	

@params:
- taskId	string | number	the task id



@returns:
- param	Baseline[]	an array of baseline objects

@example:
gantt.getTaskBaselines(5); // -> see details

@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note The **getTaskBaselines** method is not available if the api/gantt_baselines_config.md config is disabled.}}

The method returns an array with objects as in:

~~~js
[
	{
		task_id: 5,
		id: 1, 
		duration: 2, 
		start_date: "03-04-2019 00:00", 
		end_date: "05-04-2019 00:00"
	},
	{
		task_id: 5,
		id: 2, 
		duration: 1, 
		start_date: "06-04-2019 00:00", 
		end_date: "07-04-2019 00:00"
	}
]
~~~

 


@related: desktop/inbuilt_baselines.md

@relatedsample: 04_customization/15_baselines.html

@changelog: added in v9.0

@edition: pro