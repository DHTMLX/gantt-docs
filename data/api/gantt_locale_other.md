locale
=============
@short:a locale object (region-specific labels) of the Gantt chart
	

@type:object

@example:
gantt.locale = {
	date:{
		month_full:["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"],
		month_short:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"],
		day_full:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
        "Saturday"],
		day_short:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	},
	labels:{
		new_task:"New task",
		icon_save:"Save",
		icon_cancel:"Cancel",
		icon_details:"Details",
		icon_edit:"Edit",
		icon_delete:"Delete",
		confirm_closing:"",//Your changes will be lost, are you sure ?
		confirm_deleting:"Task will be deleted permanently, are you sure?",

		section_description:"Description",
		section_time:"Time period",

		/* link confirmation */

		confirm_link_deleting:"Dependency will be deleted permanently, are you sure?",
		link_from: "From",
		link_to: "To",
		link_start: "Start",
		link_end: "End",

        minutes: "Minutes",
        hours: "Hours",
        days: "Days",
        weeks: "Week",
        months: "Months",
        years: "Years"
	}
};

@template:	api_config
@descr:


