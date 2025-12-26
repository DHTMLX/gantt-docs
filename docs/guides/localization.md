---
title: "Localization"
sidebar_label: "Localization"
---

# Localization

Localization allows you to present the interface of the Gantt chart in the language you'd like: English, Spanish, French, etc.
By default, dhtmlxGantt uses [English locale](api/other/locale.md).

![gantt_localized](/img/gantt_localized.png)


## Activating a locale

To implement the Gantt chart in non-English language, you need to activate the necessary locale via the **setLocale** method of the [gantt.i18n](api/other/i18n.md) object. 

~~~js
gantt.i18n.setLocale("fr");    
~~~

You can use and update any of the [predefined locales](#predefinedlocales) that are bundled with the dhtmlxgantt.js file or define a custom locale.

:::note
The locale can be switched dynamically but the changes will be applied only after a complete redrawing of the Gantt chart either with the **gantt.render()** or **gantt.init()** call.
:::

~~~js
gantt.i18n.setLocale("fr");
gantt.init("gantt_here");
~~~

**Related sample**: [Localization](https://docs.dhtmlx.com/gantt/samples/01_initialization/12_localization.html)


## Predefined locales {#predefinedlocales}

<table>
<tr><td>Language</td><td>Language code</td><td>Translation status</td></tr>
<tr><td>Arabic</td><td>ar</td><td>partial</td></tr>
<tr><td>Belarusian</td><td>be</td><td>full</td></tr>
<tr><td>English</td><td>en</td><td>full</td></tr>
<tr><td>Catalan</td><td>ca</td><td>partial</td></tr>
<tr><td>Chinese</td><td>cn</td><td>partial</td></tr>
<tr><td>Croatian</td><td>hr</td><td>full</td></tr>
<tr><td>Czech</td><td>cs</td><td>partial</td></tr>
<tr><td>Danish</td><td>da</td><td>partial</td></tr>
<tr><td>Dutch</td><td>nl</td><td>partial</td></tr>
<tr><td>Finnish</td><td>fi</td><td>partial</td></tr>
<tr><td>French</td><td>fr</td><td>full</td></tr>
<tr><td>German</td><td>de</td><td>full</td></tr>
<tr><td>Greek</td><td>el</td><td>partial</td></tr>
<tr><td>Hebrew</td><td>he</td><td>partial</td></tr>
<tr><td>Hungarian</td><td>hu</td><td>partial</td></tr>
<tr><td>Indonesian</td><td>id</td><td>partial</td></tr>
<tr><td>Italian</td><td>it</td><td>partial</td></tr>
<tr><td>Japanese</td><td>jp</td><td>partial</td></tr>
<tr><td>Korean</td><td>kr</td><td>partial</td></tr>
<tr><td>Norwegian</td><td>no</td><td>partial</td></tr>
<tr><td>Norwegian Bokmål</td><td>nb</td><td>partial</td></tr>
<tr><td>Persian</td><td>fa</td><td>full</td></tr>
<tr><td>Polish</td><td>pl</td><td>partial</td></tr>
<tr><td>Portuguese</td><td>pt</td><td>partial</td></tr>
<tr><td>Romanian</td><td>ro</td><td>partial</td></tr>
<tr><td>Russian</td><td>ru</td><td>full</td></tr>
<tr><td>Slovak</td><td>sk</td><td>partial</td></tr>
<tr><td>Slovenian</td><td>si</td><td>partial</td></tr>
<tr><td>Spanish</td><td>es</td><td>partial</td></tr>
<tr><td>Swedish</td><td>sv</td><td>partial</td></tr>
<tr><td>Turkish</td><td>tr</td><td>partial</td></tr>
<tr><td>Ukrainian</td><td>ua</td><td>partial</td></tr>
</table>

## Creating a custom locale 

:::note
The [gantt.i18n](api/other/i18n.md) object is added in v7.0. In previous versions, the [gantt.locale](api/other/locale.md) object was used. For more information, see the [Migration article](migration.md#63---70).
:::

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


~~~js title="English locale definition"
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
- The **section_(name)** label refers to the lightbox section of the related name.
- The **new_task** label defines the default text of a new event.

