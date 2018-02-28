Tooltips for the Tasks
===========================

Tooltips allow you to add extra information for users without overflowing the screen with the text.

<img src="desktop/task_tooltip.png"/>


Activation
---------------

To activate tooltips for tasks, include the **ext/dhtmlxgantt_tooltip.js** extension file on the page:

~~~js
<script src="codebase/ext/dhtmlxgantt_tooltip.js"></script>  /*!*/

<script>
	gantt.init("gantt_here");
</script>
~~~

{{sample
	02_extensions/02_tooltip.html
}}

Once the extension is activated, tooltips will be automatically displayed with the default settings.


Custom text 
----------------

By default, tooltips display 3 properties of a task:

1. The start date of a task.
2. The end date of a task.
3. The task name.

To set a custom text for tooltips, use the api/gantt_tooltip_text_template.md template:

~~~js
gantt.templates.tooltip_text = function(start,end,task){
    return "<b>Task:</b> "+task.text+"<br/><b>Duration:</b> " + task.duration;
};
~~~

Timeout
------------------

You can specify how long a tooltip will be shown after the user moves the cursor to another position. To set such a period, use the api/gantt_tooltip_hide_timeout_config.md property:

~~~js
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~

