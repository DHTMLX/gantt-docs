---
title: "Lokalisierung"
sidebar_label: "Lokalisierung"
---

# Lokalisierung

Die Lokalisierung ermöglicht es Ihnen, die Benutzeroberfläche des Gantt-Diagramms in der gewünschten Sprache anzuzeigen: Englisch, Spanisch, Französisch usw. Standardmäßig verwendet dhtmlxGantt [English locale](api/other/locale.md).

![gantt_localized](/img/gantt_localized.png)


## Aktivieren einer Lokalisierung

Um das Gantt-Diagramm in einer nicht-englischen Sprache zu implementieren, müssen Sie die benötigte Lokalisierung über die Methode **setLocale** des [gantt.i18n](api/other/i18n.md)-Objekts aktivieren. 

~~~js
gantt.i18n.setLocale("fr");    
~~~

Sie können eine der [vordefinierten Lokalisierungen](#predefinedlocales) verwenden und aktualisieren, die in der Datei dhtmlxgantt.js enthalten sind, oder eine benutzerdefinierte Lokalisierung definieren.

:::note
Die Lokalisierung kann dynamisch gewechselt werden, aber die Änderungen werden erst nach einer vollständigen Neuzeichnung des Gantt-Diagramms angewendet, entweder durch den Aufruf von **gantt.render()** oder **gantt.init()**.
:::

~~~js
gantt.i18n.setLocale("fr");
gantt.init("gantt_here");
~~~

**Verwandtes Beispiel**: [Localization](https://docs.dhtmlx.com/gantt/samples/01_initialization/12_localization.html)


## Vordefinierte Lokalisierungen {#predefinedlocales}

<table>
<tr><td>Sprache</td><td>Sprachcode</td><td>Übersetzungsstatus</td></tr>
<tr><td>Arabisch</td><td>ar</td><td>teilweise</td></tr>
<tr><td>Belarussisch</td><td>be</td><td>vollständig</td></tr>
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


## Eine benutzerdefinierte Lokalisierung erstellen

:::note
Das [gantt.i18n](api/other/i18n.md)-Objekt wurde in v7.0 hinzugefügt. In früheren Versionen wurde das [gantt.locale](api/other/locale.md)-Objekt verwendet. Weitere Informationen finden Sie im [Migration article](migration.md#63---70).
:::

Der einfachste Weg, eine benutzerdefinierte Lokalisierung zu erstellen, besteht darin, eine Kopie der Standard-Lokalisierung (Englisch) aus dem untenstehenden Beispiel zu erstellen und alle Strings daraus in die gewünschte Sprache zu übersetzen.

Die benutzerdefinierte Lokalisierung kann auf zwei Arten auf das Gantt-Diagramm angewendet werden:

- entweder übersteuern Sie die aktuelle Lokalisierung, indem Sie ein Objekt der Lokalisierung als Parameter an die Methode **setLocale** übergeben:

~~~js
gantt.i18n.setLocale(localeObject);    
~~~

Hinweis, falls Sie ein partielles Lokalisierungsobjekt angeben, wird gantt Ihre Bezeichner in die aktuelle Lokalisierung hinzufügen:

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "Neue Aufgabe"
    }
});    
~~~

- oder, wenn Sie zwischen mehreren Lokalisierungen wechseln müssen, definieren Sie die Lokalisierung mit einem benutzerdefinierten Sprachcode und wechseln Sie später zum Gantt darauf um:

~~~js
gantt.i18n.addLocale("lang", localeObject);    
gantt.i18n.setLocale("lang");
~~~

**Hinweis**, 

- Sie können Ihre benutzerdefinierte Lokalisierungsdatei an **support@dhtmlx.com** senden – wir werden sie in der nächsten Veröffentlichung berücksichtigen.
- Die aktuell aktive Lokalisierung ist auch im **gantt.locale**-Objekt verfügbar
- **monthFull** – die vollständigen Monatsnamen, beginnend mit Januar;
- **monthShort** – die kurzen Monatsnamen, beginnend mit Januar;
- **dayFull** – die vollständigen Wochentagsnamen, beginnend mit Sonntag;
- **dayShort** – die kurzen Wochentagsnamen, beginnend mit Sonntag.

~~~js title="Englische Locale-Definition"
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