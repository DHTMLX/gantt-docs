scale_row_class
=============

@short:specifies the CSS class that will be applied to the time scale  

@params:
- scale 	Scale	the scale's configuration object


@example:
<style>
 .day_scale{ background-color: #C3C7D4;}
 .week_scale{ background-color: #E5DFE8;}
 .month_scale{ background-color: #DFE8DF;}
</style>
~~~
~~~js
gantt.templates.scale_row_class = function(scale){
	switch(scale.unit){
		case "day":
    	return "day_scale";
   		
        case "month":
    	return "month_scale";
   		
        default:// "week"
   		return "week_scale";
	}
}
@returns:
- text		string		a CSS class for item in question

@template:	api_template
@descr:


@relatedapi:
 	api/gantt_scale_cell_class_template.md
@related:
 	desktop/timeline_templates.md
