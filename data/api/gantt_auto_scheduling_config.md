auto_scheduling
=============

@short:
	enables auto scheduling

@type: boolean | AutoSchedulingConfig
@default: false
@example:
gantt.config.auto_scheduling = true;

gantt.init("gantt_here");


@template:	api_config
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note This config is defined in the **auto_scheduling** extension, so you need to activate the [auto_scheduling](desktop/extensions_list.md#autoscheduling) plugin. Read the details in the desktop/auto_scheduling.md article.}}


The `auto_scheduling` config can be set as a boolean or as an object to enable additional control over the auto-scheduling behavior. When set as an object, the following options are available:

- <span class=subproperty>**enabled**</span> - (*boolean*) - turns auto-scheduling on or off (same as using a boolean value directly).
- <span class=subproperty>**show_constraints?**</span> - (*boolean*) - controls the display of task constraints on the Gantt chart.
Set to `true` to display constraints or `false` to hide them.

For example, to enable auto-scheduling but disable the display of task constraints:

~~~js
gantt.config.auto_scheduling = {
  enabled: true,
  show_constraints: false
};
gantt.init("gantt_here");
~~~

@related:
desktop/auto_scheduling.md

@relatedsample:

02_extensions/12_auto_scheduling.html

@relatedapi:
- api/gantt_auto_scheduling_initial_config.md
- api/gantt_auto_scheduling_descendant_links_config.md
- api/gantt_auto_scheduling_move_projects_config.md
- api/gantt_auto_scheduling_project_constraint_config.md
- api/gantt_auto_scheduling_strict_config.md
- api/gantt_auto_scheduling_use_progress_config.md
- api/gantt_findcycles.md
- api/gantt_iscircularlink.md
- api/gantt_onafterautoschedule_event.md
- api/gantt_onaftertaskautoschedule_event.md
- api/gantt_onbeforeautoschedule_event.md
- api/gantt_onbeforetaskautoschedule_event.md
- api/gantt_oncircularlinkerror_event.md
- api/gantt_onautoschedulecircularlink_event.md

@edition:pro

@changelog:
Can be set as an object since v9.0