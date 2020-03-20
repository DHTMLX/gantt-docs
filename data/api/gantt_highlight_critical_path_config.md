highlight_critical_path
=============
@short: shows the critical path in the chart
	
@edition: pro
@type: boolean
@default: false
@example:
gantt.config.highlight_critical_path = true; /*!*/

gantt.init("gantt_here");

@template:	api_config
@related:
	desktop/critical_path.md
@relatedsample:
	02_extensions/03_critical_path.html
@relatedapi:
	api/gantt_iscriticaltask.md
	api/gantt_iscriticallink.md
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note This option is defined in the **critical_path.js** extension, so you need to activate the [critical_path](desktop/extensions_list.md#criticalpath) plugin. Read the details in the desktop/critical_path.md article.}}

