xml_format
=============
@short:a date object is converted into a string in conformity with this template. Used to send data back to the server
@params:
- date	Date	the date which needs formatting

@example:
gantt.templates.xml_format = function(date){
	return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:

@related:
	desktop/conversion_templates.md