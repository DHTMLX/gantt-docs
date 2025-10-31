schedule_from_end
=============

@short:
	enables backward scheduling

@type: boolean

@default: false

@example:
gantt.config.schedule_from_end = true;
gantt.config.project_end = new Date(2019, 4, 1);

@template:	api_config

@descr:

{{pronote This functionality is available in the PRO edition only.}}

Setting this config to `true` will switch auto scheduling to the `as late as possible` mode.

The value will be only applied if api/gantt_project_end_config.md is specified as well. 

@related:
desktop/auto_scheduling.md

@relatedapi:
api/gantt_auto_scheduling_config.md
api/gantt_project_end_config.md

@relatedsample:
02_extensions/20_backwards_scheduling.html

@edition:pro

@changelog: 
the property has been deprecated in v9.1

@deprecated: The property has been deprecated in v9.1, use `schedule_from_end` property of api/gantt_auto_scheduling_config.md#schedulefromend instead.



