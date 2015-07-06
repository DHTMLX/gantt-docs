xml_date
=============
@short:a string from an XML file is converted into a date object in conformity with this template
	
@params:
- date	Date	the date which needs formatting
@example:
gantt.templates.xml_date = function(date){
	return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:

@related:
	desktop/conversion_templates.md