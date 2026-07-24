---
title: "Lokalisierung"
sidebar_label: "Lokalisierung"
---

# Lokalisierung

Lokalisierung ermöglicht es Ihnen, die Benutzeroberfläche des Gantt-Diagramms in die gewünschte Sprache zu übertragen: Englisch, Spanisch, Französisch usw.
Standardmäßig verwendet dhtmlxGantt die [englische Lokalisierung](api/other/locale.md).

![gantt_localized](/img/gantt_localized.png)


## Aktivieren einer Lokalisierung {#activating-a-locale}

Um das Gantt-Diagramm in einer nicht-englischen Sprache zu implementieren, müssen Sie die erforderliche Lokalisierung über die Methode **setLocale** des [gantt.i18n](api/other/i18n.md) Objekts aktivieren. 

~~~js
gantt.i18n.setLocale("fr");    
~~~

Sie können eine der 50+ [vordefinierten Lokalisierungen](#predefinedlocales) verwenden und aktualisieren, die mit der Datei dhtmlxgantt.js gebündelt sind, oder eine benutzerdefinierte Lokalisierung definieren.

:::note
Die Lokalisierung kann dynamisch gewechselt werden, aber die Änderungen wirken erst nach einer vollständigen Neuzeichnung des Gantt-Diagramms, entweder durch Aufruf von **gantt.render()** oder **gantt.init()**.
:::

~~~js
gantt.i18n.setLocale("fr");
gantt.init("gantt_here");
~~~

**Zugehöriges Beispiel**: [Lokalisierung](https://docs.dhtmlx.com/gantt/samples/01_initialization/12_localization.html)


## Vordefinierte Lokalisierungen {#predefinedlocales}

:::note
Das Set der gebündelten Lokalisierungen wurde deutlich erweitert und die Übersetzungen wurden in **v10.0** überarbeitet, sodass alle vordefinierten Lokalisierungen nun mit einem vollständigen Satz von Bezeichnungen geliefert werden.
:::

<table>
<tr><td>Sprache</td><td>Sprachcode</td><td>Übersetzungsstatus</td></tr>
<tr><td>Afrikaans</td><td>af</td><td>vollständig</td></tr>
<tr><td>Albani(isch)</td><td>sq</td><td>vollständig</td></tr>
<tr><td>Arabisch</td><td>ar</td><td>vollständig</td></tr>
<tr><td>Weißrussisch</td><td>be</td><td>vollständig</td></tr>
<tr><td>Bosnisch</td><td>bs</td><td>vollständig</td></tr>
<tr><td>Bulgarisch</td><td>bg</td><td>vollständig</td></tr>
<tr><td>Katalanisch</td><td>ca</td><td>vollständig</td></tr>
<tr><td>Chinesisch (Vereinfachtes)</td><td>cn</td><td>vollständig</td></tr>
<tr><td>Chinesisch (Hongkong)</td><td>zh_hk</td><td>vollständig</td></tr>
<tr><td>Chinesisch (Taiwan)</td><td>zh_tw</td><td>vollständig</td></tr>
<tr><td>Kroatisch</td><td>hr</td><td>vollständig</td></tr>
<tr><td>Tschechisch</td><td>cs</td><td>vollständig</td></tr>
<tr><td>Dänisch</td><td>da</td><td>vollständig</td></tr>
<tr><td>Niederländisch</td><td>nl</td><td>vollständig</td></tr>
<tr><td>Niederländisch (Belgien)</td><td>nl_be</td><td>vollständig</td></tr>
<tr><td>Englisch</td><td>en</td><td>vollständig</td></tr>
<tr><td>Estnisch</td><td>et</td><td>vollständig</td></tr>
<tr><td>Finnisch</td><td>fi</td><td>vollständig</td></tr>
<tr><td>Französisch (Frankreich)</td><td>fr</td><td>vollständig</td></tr>
<tr><td>Französisch (Kanada)</td><td>fr_ca</td><td>vollständig</td></tr>
<tr><td>Deutsch (Deutschland)</td><td>de</td><td>vollständig</td></tr>
<tr><td>Deutsch (Österreich)</td><td>de_at</td><td>vollständig</td></tr>
<tr><td>Griechisch</td><td>el</td><td>vollständig</td></tr>
<tr><td>Hebräisch</td><td>he</td><td>vollständig</td></tr>
<tr><td>Ungarisch</td><td>hu</td><td>vollständig</td></tr>
<tr><td>Indonesisch</td><td>id</td><td>vollständig</td></tr>
<tr><td>Irisch</td><td>ga</td><td>vollständig</td></tr>
<tr><td>Italienisch</td><td>it</td><td>vollständig</td></tr>
<tr><td>Japanisch</td><td>jp</td><td>vollständig</td></tr>
<tr><td>Koreanisch</td><td>kr</td><td>vollständig</td></tr>
<tr><td>Lettisch</td><td>lv</td><td>vollständig</td></tr>
<tr><td>Litauisch</td><td>lt</td><td>vollständig</td></tr>
<tr><td>Mazedonisch</td><td>mk</td><td>vollständig</td></tr>
<tr><td>Malaiisch</td><td>ms</td><td>vollständig</td></tr>
<tr><td>Norwegisch (Bokmål)</td><td>nb</td><td>vollständig</td></tr>
<tr><td>Norwegisch (Nynorsk)</td><td>no</td><td>vollständig</td></tr>
<tr><td>Persisch</td><td>fa</td><td>vollständig</td></tr>
<tr><td>Polnisch</td><td>pl</td><td>vollständig</td></tr>
<tr><td>Portugiesisch (Portugal)</td><td>pt</td><td>vollständig</td></tr>
<tr><td>Portugiesisch (Brasilien)</td><td>pt_br</td><td>vollständig</td></tr>
<tr><td>Rumänisch</td><td>ro</td><td>vollständig</td></tr>
<tr><td>Russisch</td><td>ru</td><td>vollständig</td></tr>
<tr><td>Slowakisch</td><td>sk</td><td>vollständig</td></tr>
<tr><td>Slowenisch</td><td>si</td><td>vollständig</td></tr>
<tr><td>Spanisch (Spanien)</td><td>es</td><td>vollständig</td></tr>
<tr><td>Spanisch (Mexiko)</td><td>es_mx</td><td>vollständig</td></tr>
<tr><td>Schwedisch</td><td>sv</td><td>vollständig</td></tr>
<tr><td>Thai</td><td>th</td><td>vollständig</td></tr>
<tr><td>Türkisch</td><td>tr</td><td>vollständig</td></tr>
<tr><td>Ukrainisch</td><td>ua</td><td>vollständig</td></tr>
<tr><td>Vietnamesisch</td><td>vi</td><td>vollständig</td></tr>
</table>

## Erstellung einer benutzerdefinierten Lokalisierung 

:::note
Das [gantt.i18n](api/other/i18n.md) Objekt wird in v7.0 hinzugefügt. In früheren Versionen wurde das [gantt.locale](api/other/locale.md) Objekt verwendet. Für weitere Informationen lesen Sie den [Migration-Artikel](migration.md#63---70).
:::

Der einfachste Weg, eine benutzerdefinierte Lokalisierung zu erstellen, besteht darin, eine Kopie der Standard-(Englisch) Lokalisierung aus dem untenstehenden Muster zu erstellen und alle Zeichenfolgen daraus in die gewünschte Sprache zu übersetzen.

Die benutzerdefinierte Lokalisierung kann dem Gantt-Diagramm auf zwei Arten angewendet werden:

- entweder überschreiben Sie die aktuelle Lokalisierung, indem Sie ein Objekt der Lokalisierung als Parameter an die Methode **setLocale** übergeben:

~~~js
gantt.i18n.setLocale(localeObject);    
~~~

Hinweis, falls Sie ein partielles Lokalisierungsobjekt bereitstellen, wird gantt Ihre Labels in die aktuelle Lokalisierung hinzufügen:

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "New task"
    }
});    
~~~

- oder, wenn Sie zwischen mehreren Lokalisierungen wechseln müssen, definieren Sie die Lokalisierung mit einem benutzerdefinierten Sprachcode und wechseln Sie den Gantt später darauf um:

~~~js
gantt.i18n.addLocale("lang", localeObject);    
gantt.i18n.setLocale("lang");
~~~

**Hinweis**, 

- Sie können Ihre benutzerdefinierte Lokalisierungsdatei an **support@dhtmlx.com** senden – dann wird sie in der nächsten Veröffentlichung berücksichtigt.
- Die derzeit aktive Lokalisierung ist auch im **gantt.locale** Objekt verfügbar
- **month_full** - die vollständigen Monatsnamen beginnend mit Januar;
- **month_short** - die kurzen Monatsnamen beginnend mit Januar;
- **day_full** - die vollständigen Wochentagsnamen beginnend mit Sonntag;
- **day_short** - die kurzen Wochentagsnamen beginnend mit Sonntag.

~~~js title="Englische Lokalisierungsdefinition"
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
        confirm_deleting: "Task will be deleted permanently, are you sure?",
        section_description: "Description",
        section_time: "Time period",
        section_type: "Type",
        section_deadline: "Deadline",
        section_baselines: "Baselines",
        section_new_resources: "Resources",

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
        weeks: "Weeks",
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
        resources_add_button: "Add Assignment",
        resources_filter_placeholder: "Search...",
        resources_filter_label: "hide empty",
        resources_section_placeholder: "Nothing assigned yet. Click 'Add Assignment' to assign resources.",

        /* empty state screen */
        empty_state_text_link: "Click here",
        empty_state_text_description: "to create your first task",

        /* baselines control */
        baselines_section_placeholder: "Start adding a new baseline",
        baselines_add_button: "Add Baseline",
        baselines_remove_button: "Remove",
        baselines_remove_all_button: "Remove All",

        /* deadline control */
        deadline_enable_button: "Set",
        deadline_disable_button: "Remove"
    }
});
~~~

- Wenn das Label **confirm_closing** oder **confirm_deleting** nicht definiert ist, wird der zugehörige Bestätigungsdialog überhaupt nicht angezeigt (Auto-Bestätigung); 
- Das Label **section_(name)** bezieht sich auf den Lightbox-Bereich des entsprechenden Namens.
- Das Label **new_task** definiert den Standardtext eines neuen Tasks.