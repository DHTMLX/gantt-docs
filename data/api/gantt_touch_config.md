touch
=============
@short:
	enables/disables the touch support for the Gantt chart

@type:boolean, string 
@example:
gantt.config.touch = "force";
...
gantt.init("gantt_here");

@template:	api_config
@descr:
As a string, the parameter can take the only value -  **'force'**.

<br>

So, there are 3 possible values that the parameter can take:

- *true* - dhtmlxGantt tries to detect the touch device by analyzing the user-agent string of the browser and, if a  touch device is detected, enables the touch support.
- *'force'* - enables the persistent touch support, no matter what kind of device is used.
- *false* - disables the touch support.

@relatedapi:
	api/gantt_touch_drag_config.md

    
    


