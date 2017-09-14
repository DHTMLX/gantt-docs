branch_loading
=============
@short:enables the dynamic loading in the Gantt chart
	
@edition: pro
@type: boolean
@default: false
@example:
gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
gantt.init("gantt_here");
gantt.config.branch_loading = true;
		
gantt.load("/data"); /*!*/

@template:	api_config
@descr:


@related:
	desktop/performance.md
	desktop/loading.md
@relatedsample:
	02_extensions/06_dynamic_loading.html
	08_api/10_performance_tweaks.html	