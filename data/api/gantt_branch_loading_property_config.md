branch_loading_property
=============

@edition: pro

@short:
	specifies that the task has children that are not yet loaded from the backend

@default: "$has_child"

@type: string
@example:
gantt.config.branch_loading = true;
gantt.config.branch_loading_property = "hasChild";
gantt.init("gantt_here");

@template:	api_config
@descr:
{{pronote This functionality is available in the PRO edition only.}}

Can only be used together with the api/gantt_branch_loading_config.md config.


@relatedapi:
	api/gantt_branch_loading_config.md
@related:
	desktop/performance.md
	desktop/dynamic_loading.md
@relatedsample:
	02_extensions/06_dynamic_loading.html
	08_api/10_performance_tweaks.html	
