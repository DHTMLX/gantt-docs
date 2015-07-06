isCriticalLink
=============
@short:checks whether the specified link is critical
	
@edition: pro
@params:
- link	object	the link's object


@returns:
- value	boolean	'true' if the specified link is critical, otherwise - 'false'

@example:
var tasks = {
	data:[
    	{id:1, text:"Project #1", start_date:"01-04-2013", duration:18, type:"project"},
        {id:2, text:"Task #1", start_date:"02-04-2013",duration:8, parent:1},
        {id:3, text:"Task #2", start_date:"13-04-2013",duration:8, parent:1}
    ],
    links:[
        {id:1, source:1, target:2, type:"1"},
        {id:2, source:2, target:3, type:"0"}
    ]
};

gantt.config.highlight_critical_path = true; /*!*/
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.isCriticaLink(gantt.getLink(2));// ->'false' /*!*/

@template:	api_method


@related:
	desktop/critical_path.md
@relatedsample:
	02_extensions/03_critical_path.html
@relatedapi:
	api/gantt_highlight_critical_path_config.md
	api/gantt_iscriticaltask.md
@descr:


<img src="api/iscritical_path.png"/>