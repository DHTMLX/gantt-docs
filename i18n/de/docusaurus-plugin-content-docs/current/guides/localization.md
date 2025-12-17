---
title: "Lokalisierung"
sidebar_label: "Lokalisierung"
---

Lokalisierung
================

Mit der Lokalisierung können Sie die Benutzeroberfläche des Gantt-Diagramms in Ihrer bevorzugten Sprache anzeigen lassen, beispielsweise auf Englisch, Spanisch, Französisch und anderen. Standardmäßig verwendet dhtmlxGantt die [englische Spracheinstellung](api/other/locale.md).

![gantt_localized](/img/gantt_localized.png)


Aktivieren einer Spracheinstellung
---------------------------------------------

Um das Gantt-Diagramm in einer anderen Sprache als Englisch zu nutzen, müssen Sie lediglich die gewünschte Sprache mit der **setLocale**-Methode des [gantt.i18n](api/other/i18n.md)-Objekts aktivieren.

~~~js
gantt.i18n.setLocale("fr");    
~~~

Sie können eine der [vordefinierten Spracheinstellungen](#predefinedlocales) aus der dhtmlxgantt.js-Datei verwenden oder eine eigene Spracheinstellung anlegen.

:::note
Die Spracheinstellung kann während der Laufzeit geändert werden, aber die Änderung wird erst nach einer vollständigen Neuzeichnung des Gantt-Diagramms wirksam, indem entweder **gantt.render()** oder **gantt.init()** aufgerufen wird.
:::

~~~js
    gantt.i18n.setLocale("fr");
    gantt.init("gantt_here");
~~~


[Localization](https://docs.dhtmlx.com/gantt/samples/01_initialization/12_localization.html)


Vordefinierte Spracheinstellungen
-------------------

<table >
<tr><td>Sprache</td><td>Sprachcode</td><td>Übersetzungsstatus</td></tr>
<tr><td>Arabisch</td><td>ar</td><td>teilweise</td></tr>
<tr><td>Weißrussisch</td><td>be</td><td>vollständig</td></tr>
<tr><td>Englisch</td><td>en</td><td>vollständig</td></tr>
<tr><td>Katalanisch</td><td>ca</td><td>teilweise</td></tr>
<tr><td>Chinesisch</td><td>cn</td><td>teilweise</td></tr>
<tr><td>Kroatisch</td><td>hr</td><td>vollständig</td></tr>
<tr><td>Tschechisch</td><td>cs</td><td>teilweise</td></tr>
<tr><td>Dänisch</td><td>da</td><td>teilweise</td></tr>
<tr><td>Niederländisch</td><td>nl</td><td>teilweise</td></tr>
<tr><td>Finnisch</td><td>fi</td><td>teilweise</td></tr>
<tr><td>Französisch</td><td>fr</td><td>vollständig</td></tr>
<tr><td>Deutsch</td><td>de</td><td>vollständig</td></tr>
<tr><td>Griechisch</td><td>el</td><td>teilweise</td></tr>
<tr><td>Hebräisch</td><td>he</td><td>teilweise</td></tr>
<tr><td>Ungarisch</td><td>hu</td><td>teilweise</td></tr>
<tr><td>Indonesisch</td><td>id</td><td>teilweise</td></tr>
<tr><td>Italienisch</td><td>it</td><td>teilweise</td></tr>
<tr><td>Japanisch</td><td>jp</td><td>teilweise</td></tr>
<tr><td>Koreanisch</td><td>kr</td><td>teilweise</td></tr>
<tr><td>Norwegisch</td><td>no</td><td>teilweise</td></tr>
<tr><td>Norwegisch Bokmål</td><td>nb</td><td>teilweise</td></tr>
<tr><td>Persisch</td><td>fa</td><td>vollständig</td></tr>
<tr><td>Polnisch</td><td>pl</td><td>teilweise</td></tr>
<tr><td>Portugiesisch</td><td>pt</td><td>teilweise</td></tr>
<tr><td>Rumänisch</td><td>ro</td><td>teilweise</td></tr>
<tr><td>Russisch</td><td>ru</td><td>vollständig</td></tr>
<tr><td>Slowakisch</td><td>sk</td><td>teilweise</td></tr>
<tr><td>Slowenisch</td><td>si</td><td>teilweise</td></tr>
<tr><td>Spanisch</td><td>es</td><td>teilweise</td></tr>
<tr><td>Schwedisch</td><td>sv</td><td>teilweise</td></tr>
<tr><td>Türkisch</td><td>tr</td><td>teilweise</td></tr>
<tr><td>Ukrainisch</td><td>ua</td><td>teilweise</td></tr>
</table>

Erstellen einer eigenen Spracheinstellung 
-------------------------------

:::note
Das [gantt.i18n](api/other/i18n.md)-Objekt wurde in Version 7.0 eingeführt. Ältere Versionen nutzten das [gantt.locale](api/other/locale.md)-Objekt. Weitere Informationen finden Sie im [Migrationsartikel](migration.md#63---70).
:::

Die einfachste Möglichkeit, eine eigene Spracheinstellung zu erstellen, besteht darin, die untenstehende englische Standard-Spracheinstellung zu kopieren und alle Zeichenketten in die gewünschte Sprache zu übersetzen.

Sie können Ihre eigene Spracheinstellung auf zwei Arten auf das Gantt-Diagramm anwenden:

- Überschreiben Sie die aktuelle Spracheinstellung, indem Sie Ihr Sprachobjekt an die **setLocale**-Methode übergeben:

~~~js
gantt.i18n.setLocale(localeObject);    
~~~

Wenn Sie ein teilweises Sprachobjekt bereitstellen, werden Ihre Bezeichnungen mit der bestehenden Spracheinstellung zusammengeführt:

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "New task"
    }
});    
~~~

- Oder, wenn Sie zwischen mehreren Spracheinstellungen wechseln möchten, definieren Sie eine neue Spracheinstellung mit einem eigenen Sprachcode und wechseln später zu dieser:

~~~js
gantt.i18n.addLocale("lang", localeObject);    
gantt.i18n.setLocale("lang");
~~~

**Hinweis**, 

- Sie können Ihre eigene Sprachdatei an **support@dhtmlx.com** senden, damit sie in zukünftige Versionen aufgenommen wird.
- Die aktuell aktive Spracheinstellung ist über das **gantt.locale**-Objekt zugänglich.
- **monthFull** enthält die vollständigen Monatsnamen, beginnend mit Januar;
- **monthShort** enthält die abgekürzten Monatsnamen, beginnend mit Januar;
- **dayFull** enthält die vollständigen Wochentagsnamen, beginnend mit Sonntag;
- **dayShort** enthält die abgekürzten Wochentagsnamen, beginnend mit Sonntag.

**English locale definition**
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

- Wenn die **confirm_closing**- oder **confirm_deleting**-Bezeichnungen fehlen, erscheinen die entsprechenden Bestätigungsdialoge nicht (automatisch bestätigt).
- Die **section_(name)**-Bezeichnungen entsprechen den Lightbox-Abschnitten mit den entsprechenden Namen.
- Die **new_task**-Bezeichnung legt den Standardtext für neue Aufgaben fest.

