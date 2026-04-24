---
sidebar_label: locale
title: locale config
description: "Das aktuell verwendete locale-Objekt, das regionsspezifische Bezeichnungen für das Gantt-Diagramm enthält"
---

# locale

### Description

@short: Das aktuell verwendete locale-Objekt, das regionsspezifische Bezeichnungen für das Gantt-Diagramm enthält

@signature: locale: GanttLocale

### Example

~~~jsx
gantt.i18n.setLocale({
    date: {
        month_full: ["Januar", "Februar", "März", "April", "Mai", "Juni", 
            "Juli", "August", "September", "Oktober", "November", "Dezember"],
        month_short: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", 
            "Aug", "Sep", "Okt", "Nov", "Dez"],
        day_full: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag",
             "Freitag", "Samstag"],
        day_short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
    },
    labels: {
        new_task: "Neue Aufgabe",
        icon_save: "Speichern",
        icon_cancel: "Abbrechen",
        icon_details: "Details",
        icon_edit: "Bearbeiten",
        icon_delete: "Löschen",
        gantt_save_btn: "Neue Bezeichnung",
          gantt_cancel_btn: "Neue Bezeichnung",
          gantt_delete_btn: "Neue Bezeichnung",
        confirm_closing: "",// Your changes will be lost, are you sure?
        confirm_deleting: "Aufgabe wird dauerhaft gelöscht, sind Sie sicher?",
        section_description: "Beschreibung",
        section_time: "Zeitraum",
        section_type: "Typ",

        /* grid columns */
        column_wbs: "WBS",
        column_text: "Aufgabenname",
        column_start_date: "Startzeit",
        column_duration: "Dauer",
        column_add: "",

        /* link confirmation */
        link: "Link",
        confirm_link_deleting: "wird gelöscht",
        link_start: " (Anfang)",
        link_end: " (Ende)",

        type_task: "Aufgabe",
        type_project: "Projekt",
        type_milestone: "Meilenstein",

        minutes: "Minuten",
        hours: "Stunden",
        days: "Tage",
        weeks: "Wochen",
        months: "Monate",
        years: "Jahre",

        /* message popup */
        message_ok: "OK",
        message_cancel: "Abbrechen",

        /* constraints */
        section_constraint: "Beschränkung",
        constraint_type: "Art der Beschränkung",
        constraint_date: "Datum der Beschränkung",
        asap: "So bald wie möglich",
        alap: "So spät wie möglich",
        snet: "Start nicht früher als",
        snlt: "Start nicht später als",
        fnet: "Ende nicht früher als",
        fnlt: "Ende nicht später als",
        mso: "Muss am Startdatum beginnen",
        mfo: "Muss am Abschlussdatum enden",

        /* resource control */
        resources_filter_placeholder: "Zum Filtern eingeben",
        resources_filter_label: "Leer ausblenden"
    }
});

console.log(gantt.locale);
~~~



### Details

Das aktuelle Locale ist im **gantt.locale** Objekt verfügbar und kann direkt modifiziert werden, wie zum Beispiel:

~~~js
gantt.locale.labels.new_task = "Neue Aufgabe";
~~~

Was dem Folgenden entspricht:

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "Neue Aufgabe"
    }
});    
~~~

Beide Ansätze sind gültig und werden unterstützt. Wir empfehlen die Verwendung des [gantt.i18n](api/other/i18n.md) Objekt-APIs.

### Related Guides
- [Lokalisierung](guides/localization.md)

