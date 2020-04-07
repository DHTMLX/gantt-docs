locale
=============
@short:the current locale object (region-specific labels) of the Gantt chart
	

@type:object

@example:
gantt.i18n.setLocale({
	date: {
		month_full: ["January", "February", "March", "April", "May", "June", 
			"July", "August", "September", "October", "November", "December"],
		month_short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", 
			"Aug", "Sep", "Oct", "Nov", "Dec"],
		day_full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
			 "Friday", "Saturday"],
		day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	},
	labels: {
		new_task: "New task",
		icon_save: "Save",
		icon_cancel: "Cancel",
		icon_details: "Details",
		icon_edit: "Edit",
		icon_delete: "Delete",
		confirm_closing: "",// Your changes will be lost, are you sure?
		confirm_deleting: "Task will be deleted permanently, are you sure?",
		section_description: "Description",
		section_time: "Time period",
		section_type: "Type",

		/* grid columns */
		column_wbs: "WBS",
		column_text: "Task name",
		column_start_date: "Start time",
		column_duration: "Duration",
		column_add: "",

		/* link confirmation */
		link: "Link",
		confirm_link_deleting: "will be deleted",
		link_start: " (start)",
		link_end: " (end)",

		type_task: "Task",
		type_project: "Project",
		type_milestone: "Milestone",

		minutes: "Minutes",
		hours: "Hours",
		days: "Days",
		weeks: "Week",
		months: "Months",
		years: "Years",

		/* message popup */
		message_ok: "OK",
		message_cancel: "Cancel",

		/* constraints */
		section_constraint: "Constraint",
		constraint_type: "Constraint type",
		constraint_date: "Constraint date",
		asap: "As Soon As Possible",
		alap: "As Late As Possible",
		snet: "Start No Earlier Than",
		snlt: "Start No Later Than",
		fnet: "Finish No Earlier Than",
		fnlt: "Finish No Later Than",
		mso: "Must Start On",
		mfo: "Must Finish On",

		/* resource control */
		resources_filter_placeholder: "type to filter",
		resources_filter_label: "hide empty"
	}
});

console.log(gantt.locale);


@related: desktop/localization.md
@template:	api_config

@descr:

The current locale is available in the **gantt.locale** object and can be modified directly, as in:

~~~js
gantt.locale.labels.new_task = "New task";
~~~

Which is equal to:

~~~js
gantt.i18n.setLocale({
	labels: {
		new_task: "New task"
	}
});	
~~~

Both approaches are valid and supported. We recommend using the [gantt.i18n](api/gantt_i18n_other.md) object API.