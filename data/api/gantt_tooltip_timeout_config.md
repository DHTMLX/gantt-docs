tooltip_timeout
=============

@short:sets the timeout in milliseconds before the tooltip is displayed for a task
	
@default:30
@type: number
@example:
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");


@template:	api_config
@descr:

{{note This option is defined in the **tooltip** extension, so you need to activate the [tooltip](desktop/extensions_list.md#tooltip) plugin. Read the details in the desktop/tooltips.md article.}}



@relatedapi:
api/gantt_tooltip_hide_timeout_config.md

@related:
   desktop/tooltips.md
