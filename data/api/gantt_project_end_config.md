project_end
=============

@short:
	specifies the end date of a project

@type: Date,undefined

@example:
gantt.config.project_end = new Date(2025, 10, 1);

@template:	api_config

@descr:

{{pronote This functionality is available in the PRO edition only.}}

The value of this config can be used as the default end date of new tasks, when backward scheduling is enabled.

@related:
desktop/auto_scheduling.md

@relatedapi:
api/gantt_schedule_from_end_config.md
api/gantt_auto_scheduling_config.md

@relatedsample:
02_extensions/20_backwards_scheduling.html