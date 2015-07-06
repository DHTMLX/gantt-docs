time_picker
=============


@short:specifies the format of the drop-down time selector in the lightbox

@params:
- date	Date	the date which needs formatting

@example:
gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"time",type:"duration",map_to:"auto",time_format:["%d","%m","%Y","%H:%i"]}
];

gantt.templates.time_picker = function(date){
    return gantt.date.date_to_str(gantt.config.time_picker)(date);
};
@template:	api_template 
@returns:
- text		string		html text which will be rendered in the gantt
@descr:


@related:
	desktop/lightbox_templates.md