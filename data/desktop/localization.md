Localizing Gantt Chart
======================================

Localization allows you to present the interface of the Gantt chart in the language you'd like: English, Spanish, French, etc.
By default, dhtmlxGantt provides support for the [English locale](api/gantt_locale_other.md).

<img style="padding-top:15px; padding-bottom:15px;" src="desktop/gantt_localized.png"/>


Activating a locale
---------------------------------------------

To implement the Gantt chart in non-English language, you need to include the locale file on the page. Gantt has the predefined locales for main languages.
All locale files are stored in sources/locale folder as sources/locale/locale_{name}.js


~~~html
<script src="../codebase/dhtmlxgantt.js"></script>
<link rel="stylesheet" href="../codebase/dhtmlxgantt.css">

<script src="../codebase/locale/locale_fr.js" charset="utf-8"></script>
~~~

{{note
Make sure that you use **charset="utf-8"**, because all locales are stored as UTF-8 text.
}}

{{sample
	01_initialization/12_localization.html
}}

Predefined locales
-------------------

<table style='border-collapse: collapse; color:#444444' >
<tr><td style='font-weight:bold; border:1px solid #AAA;'>
 Language      
</td><td style='font-weight:bold; border:1px solid #AAA;'>
 Locale file       
</td><td style='font-weight:bold; border:1px solid #AAA;'>
 Translation status
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Arabic 
</td><td style='border:1px solid #AAA;'>
 locale_ar.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Belarusian 
</td><td style='border:1px solid #AAA;'>
 locale_be.js 
</td><td style='border:1px solid #AAA;'>
 full
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 English 
</td><td style='border:1px solid #AAA;'>
 locale.js
</td><td style='border:1px solid #AAA;'>
 full
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Catalan 
</td><td style='border:1px solid #AAA;'>
 locale_ca.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Chinese 
</td><td style='border:1px solid #AAA;'>
 locale_cn.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Croatian 
</td><td style='border:1px solid #AAA;'>
 locale_hr.js 
</td><td style='border:1px solid #AAA;'>
 full
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Czech 
</td><td style='border:1px solid #AAA;'>
 locale_cs.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Danish 
</td><td style='border:1px solid #AAA;'>
 locale_da.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Dutch 
</td><td style='border:1px solid #AAA;'>
 locale_nl.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Finnish 
</td><td style='border:1px solid #AAA;'>
 locale_fi.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 French 
</td><td style='border:1px solid #AAA;'>
 locale_fr.js
</td><td style='border:1px solid #AAA;'>
 full
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 German 
</td><td style='border:1px solid #AAA;'>
 locale_de.js 
</td><td style='border:1px solid #AAA;'>
 full
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Greek 
</td><td style='border:1px solid #AAA;'>
 locale_el.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Hebrew 
</td><td style='border:1px solid #AAA;'>
 locale_he.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Hungarian 
</td><td style='border:1px solid #AAA;'>
 locale_hu.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Indonesian 
</td><td style='border:1px solid #AAA;'>
 locale_id.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Italian 
</td><td style='border:1px solid #AAA;'>
 locale_it.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Japanese 
</td><td style='border:1px solid #AAA;'>
 locale_jp.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Korean 
</td><td style='border:1px solid #AAA;'>
 locale_kr.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Norwegian 
</td><td style='border:1px solid #AAA;'>
 locale_no.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Persian 
</td><td style='border:1px solid #AAA;'>
 locale_fa.js 
</td><td style='border:1px solid #AAA;'>
 full
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Polish 
</td><td style='border:1px solid #AAA;'>
 locale_pl.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Portuguese 
</td><td style='border:1px solid #AAA;'>
 locale_pt.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Romanian 
</td><td style='border:1px solid #AAA;'>
 locale_ro.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Russian 
</td><td style='border:1px solid #AAA;'>
 locale_ru.js 
</td><td style='border:1px solid #AAA;'>
 full
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Slovakian 
</td><td style='border:1px solid #AAA;'>
 locale_sk.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Slovenian 
</td><td style='border:1px solid #AAA;'>
 locale_si.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Spanish 
</td><td style='border:1px solid #AAA;'>
 locale_es.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Swedish 
</td><td style='border:1px solid #AAA;'>
 locale_sv.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Turkish 
</td><td style='border:1px solid #AAA;'>
 locale_tr.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
<tr><td style='border:1px solid #AAA;'>
 Ukrainian 
</td><td style='border:1px solid #AAA;'>
 locale_ua.js 
</td><td style='border:1px solid #AAA;'>
 partial
</td></tr>
</table>

Creating a custom locale 
-------------------------------

**Note**, 

- Locale is created in a separate js file named as **"locale_[xx]"**, where **[xx]** is a two-letter language code.
- You can send your custom locale file to **support@dhtmlx.com** - so we will include it in the next release.


The easiest way to create a custom locale is to make a copy of the default (English) locale  - **<i>gantt/sources/locale/locale.js</i>**, 
and translate all strings from it into the required language.


- **monthFull** - the full names of months starting from January;
- **monthShort** - the short names of months starting from January;
- **dayFull** - the full names of week days starting from Sunday;
- **dayShort** - the short names of week days starting from Sunday.

{{snippet
Creating a French (France) locale. The "locale_fr.js" file
}}
~~~js
gantt.locale = {
	date: {
		month_full: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
        	"Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
		month_short: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", 
        	"Juil", "Aôu", "Sep", "Oct", "Nov", "Déc"],
		day_full: ["Dimanche", "Lundi", "Mardi", "Mercredi", 
        	"Jeudi", "Vendredi", "Samedi"],
		day_short: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
	},
	labels:{
		new_task:"Tâche neuve",
		icon_save:"Enregistrer",
		icon_cancel:"Annuler",
		icon_details:"Détails",
		icon_edit:"Modifier",
		icon_delete:"Effacer",
		confirm_closing:"",//Vos modifications seront perdus, êtes-vous sûr ?
		confirm_deleting:"L'événement sera effacé sans appel, êtes-vous sûr ?",

		section_description:"Description",
		section_time:"Période",
		section_type:"Type",

        /* grid columns */

        column_text :  "Tâche neuve",
        column_start_date : "Date initiale",
        column_duration : "Durée",
        column_add : "",


		/* link confirmation */

		confirm_link_deleting:"seront supprimées",
		link_start: "(début)",
		link_end: "(fin)",

		type_task: "Task",
		type_project: "Project",
		type_milestone: "Milestone",


    	minutes: "Minutes",
    	hours: "Heures",
    	days: "Jours",
    	weeks: "Semaine",
    	months: "Mois",
    	years: "Années"
	}
};
~~~

- If the **confirm_closing** or **confirm_deleting** label is not defined - the related confirm dialog will not be shown at all (auto-confirm); 
- The **section_{name}** label refers to the lightbox section of the related name.
- The **new_task** label defines the default text of a new event.

