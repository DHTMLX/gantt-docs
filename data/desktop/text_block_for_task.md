Assigning Text Blocks to the Tasks
====================================
A text near a task bar allows you to show additional information related to the task. 
In most cases, it's some assigned resource -  persons, materials etc.  

<img src="desktop/assigned_text.png"/>


Assigning a text to the left side of a bar
-------------------------------------------------
To place a text block on the left side of a task bar, use the  api/gantt_leftside_text_template.md template:

~~~js
gantt.templates.leftside_text = function(start, end, task){
	return "<b>Priority: </b>" +task.priority;
};
~~~
{{sample
	04_customization/01_outer_content.html
}}

Assigning a text to the right side of a bar
-------------------------------------------------
To place a text block on the right side of a task bar, use the  api/gantt_rightside_text_template.md template:

~~~js
gantt.templates.rightside_text = function(start, end, task){
	return "<b>Holders: </b>" + task.users;
};
~~~

{{sample
	04_customization/01_outer_content.html
}}

Changing the default template of the bar's text
-------------------------------------------------
To change the default template of task bars, use the api/gantt_task_text_template.md template:

~~~js
gantt.templates.task_text=function(start,end,task){
	return "<b>Text:</b> "+task.text+",<b> Holders:</b> "+task.users;
};
~~~

{{sample
	04_customization/08_templates.html
}}


<img src="desktop/task_text.png"/>