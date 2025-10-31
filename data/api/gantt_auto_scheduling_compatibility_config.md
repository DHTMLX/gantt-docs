auto_scheduling_compatibility
=============

@short: disables usage of time contraints for tasks
	
@default:false
@type: boolean
@example:
gantt.config.auto_scheduling_compatibility = true;

@template:	api_config
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note This config is defined in the **auto_scheduling** extension, so you need to enable the [auto_scheduling](desktop/extensions_list.md#autoscheduling) plugin. Read the details in the desktop/auto_scheduling.md article.}}

The [time constraints functionality](desktop/auto_scheduling.md#timeconstraintsfortasks) was introduced in v6.1 to improve the auto scheduling logic of Gantt. 
The **auto_scheduling_compatibility** config was added to [provide backward compatibility with previous versions](desktop/auto_scheduling.md#versioncompatibility).

@related:
desktop/auto_scheduling.md

@deprecated: The property has been deprecated in v9.1, use the `apply_constraints` property of api/gantt_auto_scheduling_config.md#applyconstraints instead.

@changelog:
- the property has been deprecated in v9.1
- added in v6.1 for compatibility with earlier versions



@relatedapi:
api/gantt_auto_scheduling_config.md


@edition:pro