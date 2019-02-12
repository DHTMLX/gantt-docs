Tooltips for Gantt Elements
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

You can configure the time of tooltips showing and hiding via the related settings.

To specify the time period in milliseconds before a tooltip for a task will appear, use the api/gantt_tooltip_timeout_config.md:

~~~js
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~


To define how long (in milliseconds) a tooltip will be shown after the user moves the cursor to another position, use the api/gantt_tooltip_hide_timeout_config.md property:

~~~js
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~

Position
----------

The position of a tooltip can be configured by changing offsets of its default position via the two configuration properties:

- api/gantt_tooltip_offset_x_config.md - sets the horizontal offset of the tooltip position
- api/gantt_tooltip_offset_y_config.md - sets the vertical offset of the tooltip position

~~~js
gantt.config.tooltip_offset_x = 30;
gantt.config.tooltip_offset_y = 40;
 
gantt.init("gantt_here");
~~~
