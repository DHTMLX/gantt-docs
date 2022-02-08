task_height
=============
@short:sets the height of task bars in the timeline area
	

@type: number,string
@default:"full"
@example:
gantt.config.task_height = 30;
gantt.init("gantt_here");

@template:	api_config
@descr:
{{note The **task_height** property is deprecated. Instead of it, you can use the [bar_height](api/gantt_bar_height_config.md) configuration property:}}

~~~
gantt.config.bar_height = 30;
gantt.init("gantt_here");
~~~

@deprecated: The property is deprecated.


@changelog: the **task_height** property has been deprecated in v7.1