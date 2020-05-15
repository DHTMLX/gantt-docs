Localization
================

Localization allows you to present the interface of the Gantt chart in the language you'd like: English, Spanish, French, etc.
By default, dhtmlxGantt uses [English locale](api/gantt_locale_other.md).

<img style="padding-top:15px; padding-bottom:15px;" src="desktop/gantt_localized.png"/>


Activating a locale
---------------------------------------------

To implement the Gantt chart in non-English language, you need to activate the necessary locale via the **setLocale** method of the [gantt.i18n](api/gantt_i18n_other.md) object. 

~~~js
gantt.i18n.setLocale("fr");	
~~~

You can use and update any of the [predefined locales](#predefinedlocales) that are bundled with the dhtmlxgantt.js file or define a custom locale.

{{note
  The locale can be switched dynamically but the changes will be applied only after a complete redrawing of the Gantt chart either with the **gantt.render()** or **gantt.init()** call.
}}

~~~js
	gantt.i18n.setLocale("fr");
	gantt.init("gantt_here");
~~~

{{sample
	01_initialization/12_localization.html
}}


Predefined locales
-------------------

<table style='border-collapse: collapse; color:#444444' >
<tr><td style='font-weight:bold; border:1px solid #AAA;'>
 Language      
</td><td style='font-weight:bold; border:1px solid #AAA;'>
 Language code       
</td><td style='font-weight:bold; border:1px solid #AAA;'>
 Translation status
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Arabic 
</td><td style='border:1px solid #AAA;'>
 ar 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Belarusian 
</td><td style='border:1px solid #AAA;'>
 be 
</td><td style='border:1px solid #AAA;'>
 full
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 English 
</td><td style='border:1px solid #AAA;'>
 en
</td><td style='border:1px solid #AAA;'>
 full
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Catalan 
</td><td style='border:1px solid #AAA;'>
 ca 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Chinese 
</td><td style='border:1px solid #AAA;'>
 cn 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Croatian 
</td><td style='border:1px solid #AAA;'>
 hr 
</td><td style='border:1px solid #AAA;'>
 full
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Czech 
</td><td style='border:1px solid #AAA;'>
 cs 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Danish 
</td><td style='border:1px solid #AAA;'>
 da 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Dutch 
</td><td style='border:1px solid #AAA;'>
 nl 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Finnish 
</td><td style='border:1px solid #AAA;'>
 fi 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 French 
</td><td style='border:1px solid #AAA;'>
 fr
</td><td style='border:1px solid #AAA;'>
 full
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 German 
</td><td style='border:1px solid #AAA;'>
 de 
</td><td style='border:1px solid #AAA;'>
 full
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Greek 
</td><td style='border:1px solid #AAA;'>
 el 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Hebrew 
</td><td style='border:1px solid #AAA;'>
 he 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Hungarian 
</td><td style='border:1px solid #AAA;'>
 hu 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Indonesian 
</td><td style='border:1px solid #AAA;'>
 id 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Italian 
</td><td style='border:1px solid #AAA;'>
 it 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Japanese 
</td><td style='border:1px solid #AAA;'>
 jp 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Korean 
</td><td style='border:1px solid #AAA;'>
 kr 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Norwegian 
</td><td style='border:1px solid #AAA;'>
 no 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Norwegian Bokmål
</td><td style='border:1px solid #AAA;'>
 nb 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Persian 
</td><td style='border:1px solid #AAA;'>
 fa 
</td><td style='border:1px solid #AAA;'>
 full
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Polish 
</td><td style='border:1px solid #AAA;'>
 pl 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Portuguese 
</td><td style='border:1px solid #AAA;'>
 pt 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Romanian 
</td><td style='border:1px solid #AAA;'>
 ro 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Russian 
</td><td style='border:1px solid #AAA;'>
 ru 
</td><td style='border:1px solid #AAA;'>
 full
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Slovak
</td><td style='border:1px solid #AAA;'>
 sk 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Slovenian 
</td><td style='border:1px solid #AAA;'>
 si 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Spanish 
</td><td style='border:1px solid #AAA;'>
 es 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Swedish 
</td><td style='border:1px solid #AAA;'>
 sv 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Turkish 
</td><td style='border:1px solid #AAA;'>
 tr 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Ukrainian 
</td><td style='border:1px solid #AAA;'>
 ua 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
</table>

Creating a custom locale 
-------------------------------

{{note The [gantt.i18n](api/gantt_i18n_other.md) object is added in v7.0. In previous versions, the [gantt.locale](api/gantt_locale_other.md) object was used. For more information, see the [Migration article](migrating.md#6370).}}

The easiest way to create a custom locale is to make a copy of the default (English) locale from the sample below, 
and translate all strings from it into the required language.

The custom locale can be applied to the Gantt chart in two ways:

- either override the current locale via passing an object of the locale as a parameter to the **setLocale** method:

~~~js
gantt.i18n.setLocale(localeObject);	
~~~

Note, if you provide a partial locale object, gantt will add your labels into the current locale:

~~~js
gantt.i18n.setLocale({
	labels: {
		new_task: "New task"
	}
});	
~~~

- or, if you need to switch between several locales, define the locale with a custom language code and switch the gantt to it later:

~~~js
gantt.i18n.addLocale("lang", localeObject);	
gantt.i18n.setLocale("lang");
~~~

**Note**, 

- You can send your custom locale file to **support@dhtmlx.com** - so we will include it in the next release.
- The currently active locale is also available in the **gantt.locale** object
- **monthFull** - the full names of months starting from January;
- **monthShort** - the short names of months starting from January;
- **dayFull** - the full names of week days starting from Sunday;
- **dayShort** - the short names of week days starting from Sunday.

{{snippet
English locale definition
}}
~~~js
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
        gantt_save_btn: "New Label",
      	gantt_cancel_btn: "New Label",
      	gantt_delete_btn: "New Label",
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
~~~

- If the **confirm_closing** or **confirm_deleting** label is not defined - the related confirm dialog will not be shown at all (auto-confirm); 
- The **section_{name}** label refers to the lightbox section of the related name.
- The **new_task** label defines the default text of a new event.



