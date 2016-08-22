findCycles
=============

@todo:
	check 

@short:
	returns all dependency loops in the chart

@params:

@returns:

- cycles		array		an array of dependency loops found in gantt

@example:
var cycles = gantt.findCycles();

@template:	api_method
@descr:
added in version 4.1

Each element of the *cycles* array is a group of tasks and links which makes a loop.

~~~js
[ 
	{ 
    	tasks: [//ids of tasks connected in a loop], 
        links: [//ids of links connected in a loop]
    },
    {
    	
    	tasks: [...], 
        links: [...]
    }
]
~~~

Have a look at the example below:

<img src="api/on_autoschedule_circular_link.png">


- Task #3 -> id = 10
- Task #4.1 -> id = 12
- Link from the end of Task #3 to the start of Task #4 -> id = 1
- Link from the end of Task #4.1 to the start of Task #3 -> id = 2

The *cycles* array will contain the following object:

~~~js
[ 
    { 
        tasks: ["10", "12"], 
        links: ["1", "2"]
    }
]
~~~

@related:
desktop/auto_scheduling.md

@relatedsample:

02_extensions/12_auto_scheduling.html

@relatedapi:

- api/gantt_auto_scheduling_config.md
- api/gantt_auto_scheduling_descendant_links_config.md
- api/gantt_auto_scheduling_initial_config.md
- api/gantt_auto_scheduling_move_projects_config.md
- api/gantt_auto_scheduling_strict_config.md
- api/gantt_iscircularlink.md
- api/gantt_onafterautoschedule_event.md
- api/gantt_onaftertaskautoschedule_event.md
- api/gantt_onbeforeautoschedule_event.md
- api/gantt_onbeforetaskautoschedule_event.md
- api/gantt_onautoschedulecircularlink_event.md
- api/gantt_oncircularlinkerror_event.md



@edition:
pro