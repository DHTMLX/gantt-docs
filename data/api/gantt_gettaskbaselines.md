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

The method returns an array with the **baseline** objects that have the following properties:

- <span class=subproperty>**id**</span> - (*string | number*) - the baseline ID
- <span class=subproperty>**task_id**</span> - (*string | number*) - the ID of the task the baseline belongs to
- <span class=subproperty>**start_date**</span> - (*Date*) - the start date of the baseline
- <span class=subproperty>**duration**</span> - (*number*) - the duration of the baseline
- <span class=subproperty>**end_date**</span> - (*Date | number*) - the end date of the baseline
- <span class=subproperty>**[customProperty: string]**</span> - (*any*) - any custom property



For example:

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