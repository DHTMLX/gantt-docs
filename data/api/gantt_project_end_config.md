project_end
=============

@short:
	specifies the end date of the project

@type: Date

@example:
gantt.config.project_end = new Date(2019, 2, 1);

@template:	api_config

@descr:

The value of this config can be used as a default end date of new tasks, when backwards scheduling is enabled.

@related:
desktop/auto_scheduling.md

@relatedapi:
api/gantt_schedule_from_end_config.md

@relatedsample:
02_extensions/20_backwards_scheduling.html