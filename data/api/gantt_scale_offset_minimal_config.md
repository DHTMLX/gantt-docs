scale_offset_minimal
=============

@short:sets the minimal scale unit (in case multiple scales are used) as the interval of the leading/closing empty space 
	

@type: boolean
@default: true
@example:
gantt.config.scale_offset_minimal = false;


@template:	api_config
@descr:
If the scale interval is not strictly specified (by the api/gantt_start_date_config.md, api/gantt_end_date_config.md options), dhtmlxGantt calculates it based on the dates of the earliest and latest tasks. 
Plus, it adds an empty interval to the beginning and the end of the scale. By default, this 'empty' interval is equal to the minimum unit of the used scales (in case multiple scales are used). 

If you disable the option, dhtmlxGantt will add an empty interval equal to the value of the **unit** property of the api/gantt_scales_config.md option.



