---
title: "Arbeitszeitberechnung"
sidebar_label: "Arbeitszeitberechnung"
---

# Arbeitszeitberechnung

Standardmäßig berechnet dhtmlxGantt die Aufgaben-Dauer in Kalenderzeit. Es wird angenommen, dass die endgültige Dauer der Aufgaben Wochenenden und Feiertage einschließen kann.

:::note
Lesen Sie den Artikel [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates), um das Format des Enddatums einer Aufgabe zu erfahren.
:::


## Aktivierung der Arbeitszeitberechnung

Um die Berechnung der Aufgaben-Dauer in Arbeitszeit zu ermöglichen, verwenden Sie die [work_time](api/config/work_time.md) Option:

**Aktivierung des Modus, in dem die Aufgaben-Dauer in Arbeitszeit berechnet wird**
~~~js
gantt.config.work_time = true;     // entfernt Nicht-Arbeitszeit aus den Berechnungen /*!*/
gantt.config.skip_off_time = true; /*!*/   // versteckt Nicht-Arbeitszeit im Diagramm
 
gantt.init("gantt_here");
~~~

Bitte beachten Sie, dass die [skip_off_time](api/config/skip_off_time.md) Konfigurationsoption nur in der PRO-Version verfügbar ist.


[Duration includes only working days](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)


:::note
Je nach Wert von [duration_unit](api/config/duration_unit.md) berechnet dhtmlxGantt die Dauer der Aufgaben in unterschiedlichen Zeiteinheiten (z.B. falls
duration_unit = "hour", wird die Dauer in den Arbeitsstunden berechnet).
:::

![calculating_different_time](/img/calculating_different_time.png)


## Task-Dauer im Dezimalformat {#taskdurationindecimalformat}

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Ab Version v6.3 ermöglicht dhtmlxGantt das Spezifizieren der Aufgaben-Dauer im Dezimalformat ("2.5 days", 

"0.5 hours", "3.75 hours") über das [Duration Formatter](guides/formatters-ext.md)-Modul.

Wichtiger Punkt: Intern speichert Gantt die Dauer von Aufgaben immer als Ganzzahlen. 

Während das bereitgestellte Modul das Parsen der Aufgaben-Dauer aus dem vom Benutzer eingegebenen Format in das in Gantt gespeicherte Format ermöglicht 
(beispielsweise wird statt eingegebener "1.5 hours" die Anzahl der Minuten - `90` - gespeichert). Darüber hinaus können die gespeicherten Werte in ein lesbares Format zurück konvertiert werden (von `12` Stunden zu "0.5 Tage").

![decimal_duration](/img/decimal_duration.png)

:::note
Die Dauer von Aufgaben kann als Bruchteil einer Stunde, eines Tages oder jeder anderen vom [duration_unit](api/config/duration_unit.md) konfigurierten Einheit dargestellt werden, mit Ausnahme von Minuten.
:::


### Implementierung des Dezimalformats

Um die Anzeige der Aufgaben-Dauer im Dezimalformat bereitzustellen, folgen Sie der untenstehenden Logik:

- Setzen Sie [duration_unit](api/config/duration_unit.md) auf minute
 
~~~js
gantt.config.work_time = true;
gantt.config.duration_unit = "minute"; /*!*/
~~~

Beachten Sie, dass Sie Aufgabendauern in einer kleineren Einheit speichern müssen als die Einheiten der Werte, die im Dezimalformat angezeigt werden. Einfach ausgedrückt:

    - wenn Sie möchten, dass ein Benutzer Dauern als Bruchteil einer Stunde angeben kann (z.B. "0.5 hours"), setzen Sie [duration_unit](api/config/duration_unit.md) auf minute


    - Wenn Sie möchten, dass ein Benutzer Dauern als Bruchteil eines Tages angeben kann, setzen Sie [duration_unit](api/config/duration_unit.md) auf hour. In diesem Fall kann der Benutzer die Dauer der Aufgabe als "0.5 day" eingeben, aber "0.5 hour" wird auf 1 Stunde aufgerundet, da die Dauer in ganzzahligen Stunden gespeichert wird.

:::note
Standardmäßig werden Aufgaben-Daten an den Zeitmaßstab angepasst. Wenn Sie einen Zeitmaßstab in Tagen haben, möchten Sie ihn möglicherweise deaktivieren, um eine Aufgabe innerhalb eines Tages auf unterschiedliche Stunden ziehen zu können. 

Um dieses Drag-and-Drop zu aktivieren, müssen Sie [round_dnd_dates](api/config/round_dnd_dates.md) deaktivieren und einen passenden Wert für [time_step](api/config/time_step.md) festlegen.
:::
Zum Beispiel:

~~~js
// globaler Time-Step beträgt 15 Minuten, benötigt "minute" als Dauer-Einheiten
gantt.config.time_step = 15;
gantt.config.round_dnd_dates = false;
~~~

oder 

~~~js
// globaler Time-Step beträgt eine Stunde, 
// dieser Wert kann verwendet werden, wenn die Dauer-Einheit auf "hour" gesetzt ist
gantt.config.time_step = 60;
gantt.config.round_dnd_dates = false;
~~~

- erstellen Sie das *formatter*-Objekt zur Formatierung der Aufgaben-Dauer:

~~~js
// Formatierung der Dauer
const formatter = gantt.ext.formatters.durationFormatter({
    enter: "day", 
    store: "minute", // duration_unit
    format: "day",
    hoursPerDay: 8,
    hoursPerWeek: 40,
    daysPerMonth: 30
});
~~~

- fügen Sie das *formatter*-Objekt der Spalte "Duration" hinzu, indem Sie die Template-Funktion definieren, die die *formatierte Dauer der Aufgabe* über das **template**-Attribut des Columns-Parameters zurückgibt:

~~~js
gantt.config.columns = [
    { name: "text", tree: true, width: 170, resize: true, editor: textEditor },
    { name: "start_date", align: "center", resize: true, editor: dateEditor },
    { name: "duration", label: "Duration", resize: true, align: "center",
        template: task => formatter.format(task.duration), width: 100 },
    { name: "add", width: 44 }
];
~~~

- fügen Sie das *formatter*-Objekt der Lightbox-Sektion hinzu, indem Sie die **formatter**-Eigenschaft für die **time**-Steuerung setzen:

~~~js
gantt.config.lightbox.sections = [
    { name: "description", map_to: "text", type: "textarea", height: 70, focus: true },
    { name: "time", map_to: "auto", type: "duration", formatter: formatter }
];
~~~

- falls Inline-Bearbeitung im Grid aktiviert ist, müssen Sie außerdem das *formatter*-Objekt dem durationEditor-Objekt über das **formatter**-Attribut hinzufügen:

~~~js
const durationEditor = {
    type: "duration",
    map_to: "duration",
    formatter: formatter, /*!*/
    min: 0,
    max: 1000
};

gantt.config.columns = [
    { name: "text", tree: true, width: 170, resize: true },
    { name: "start_date", align: "center", resize: true },
    { name: "duration", label: "Duration", resize: true, align: "center", 
        template: (task) => formatter.format(task.duration),
        editor: durationEditor, width: 100 },
    { name: "add", width: 44 }
];
~~~

:::note
Wenn Sie bereits Gantt mit Aufgaben-Dauern in Minuten, Stunden oder einer anderen Einheit verwenden, können Sie auch das [Duration Formatter](guides/formatters-ext.md) Modul verwenden, um die Dauern im Dezimalformat darzustellen.
:::


## Globale Einstellungen

### Arbeitszeit festlegen

Die Standard-Arbeitszeit ist folgende:

- Arbeitstage: Montag - Freitag.
- Arbeitszeiten: 8:00 - 12:00, 13:00 - 17:00.

Um die Standard-Arbeitszeit zu ändern, verwenden Sie die Methode [setWorkTime](api/method/setworktime.md):

~~~js title="Festlegen einer benutzerdefinierten Arbeitszeit"
// ändert die Arbeitszeit der Arbeitstage
gantt.setWorkTime({ hours: ["9:00-18:00"] });

// macht jeden Freitag freier Tag
gantt.setWorkTime({ day: 5, hours: false });

// ändert die Arbeitszeit für Freitage und Samstage
gantt.setWorkTime({ day: 5, hours: ["8:00-12:00"] });
gantt.setWorkTime({ day: 6, hours: ["8:00-12:00"] });

// macht ein bestimmtes Datum einen Arbeitstag
gantt.setWorkTime({ date: new Date(2025, 2, 31) });

// macht ein bestimmtes Datum einen freien Tag
gantt.setWorkTime({ date: new Date(2025, 0, 1), hours: false });
~~~

**Related sample**: [Custom working days and time](https://docs.dhtmlx.com/gantt/samples/09_worktime/04_custom_workday_duration.html)


### Arbeitszeit für Nachtschicht festlegen

Die Arbeitszeiteinstellungen für das **hours**-Attribut des Konfigurationsobjekts der [setWorkTime](api/method/setworktime.md)-Methode sollten von der geringeren in die größere Zeitspanne angegeben werden, das heißt in aufsteigender Reihenfolge. Falls die Zeiteinstellungen in absteigender Reihenfolge vorliegen, werden Teile davon ignoriert. Im untenstehenden Beispiel würden die Zeitintervalle nach `18:00` ignoriert:

~~~js
// die untenstehenden Einstellungen sind falsch 
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00", "14:00-15:00", "08:00-10:00"] });
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00", "00:00-04:00", "05:00-06:00"] });
~~~

Wenn Sie Arbeitszeit-Einstellungen für die Nachtschicht festlegen müssen, sollten Sie sie wie folgt setzen: 

- innerhalb von 24 Stunden für den ersten Tag
- innerhalb von 24 Stunden für den folgenden Tag

Zum Beispiel:

~~~js
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00"] });
gantt.setWorkTime({ day: 6, hours: ["00:00-04:00", "05:00-06:00"] });
~~~


### Konfiguration der Arbeitszeitregeln

Es besteht die Möglichkeit, verschiedene Arbeitszeitregeln für unterschiedliche Zeiträume über das Attribut **customWeeks** der [setWorkTime](api/method/setworktime.md)-Methode zu konfigurieren. Beispielsweise können Sie die Standard-Arbeitszeit für Wintermonate ändern:

~~~js
//ändert die Arbeitszeit für Wintermonate
gantt.setWorkTime({
    customWeeks: {
        winter: {
            from: new Date(2025, 11, 1), // 1. Dezember 2025
            to: new Date(2026, 2, 1), // 1. März 2026 00:00
            hours: ["9:00-13:00", "14:00-16:00"],
            days: [1, 1, 1, 1, 0, 0, 0]
        }
    }
});
~~~

Um die Arbeitszeit nicht nur von Stunde zu Stunde (z.B. "8:00-12:00") zu spezifizieren, sondern auch Minuten einzuschließen (z.B. "8:15-12:45"), setzen Sie die Konfiguration duration_unit auf *"minute"*.

~~~js title="Festlegen einer benutzerdefinierten Arbeitszeit bis zu Minuten"
gantt.config.duration_unit = "minute";

// setzt die Arbeitszeit bis zu Minuten
gantt.setWorkTime({ hours: ["8:15-12:45"] });
~~~

:::note
Das Format der Arbeitszeit, das bis Version 7.0 verwendet wurde, funktioniert weiterhin wie zuvor:

~~~js
gantt.setWorkTime({ hours: [9, 18] });
~~~
:::


### Überschreiben einer Arbeitszeitregel

Hinweis: Bei jedem nächsten Aufruf der Methode für dasselbe Datum wird die vorherige Arbeitszeit-Regel überschrieben. Wenn Sie also eine Regel zurücksetzen möchten, rufen Sie die [setWorkTime](api/method/setworktime.md) Methode mit einer anderen Konfiguration auf: 

~~~js
gantt.setWorkTime({ hours: ["8:00-12:00"] });
gantt.setWorkTime({ hours: ["13:00-17:00"] });
// das Ergebnis der obigen Befehle ist die Arbeitszeit 13:00-17:00
// und nicht eine Mischung aus beiden Befehlen
~~~


### Festlegen benutzerdefinierter Arbeitszeiten / arbeitsfreier Tage

Beachten Sie, dass es nicht möglich ist, Arbeitszeiteinstellungen anzuwenden, die keine Arbeitsstunden enthalten. Zum Beispiel wie folgt:

~~~js
gantt.setWorkTime({ day: 0, hours: [] });
gantt.setWorkTime({ day: 1, hours: [] });
gantt.setWorkTime({ day: 2, hours: [] });
gantt.setWorkTime({ day: 3, hours: [] });
gantt.setWorkTime({ day: 4, hours: [] });
gantt.setWorkTime({ day: 5, hours: [] });
gantt.setWorkTime({ day: 6, hours: [] });
~~~

Infolgedessen wird Gantt das Anwenden der Methode auf einen der Arbeitstage ignorieren, und es werden dennoch Arbeitsstunden enthalten sein. 

Wenn Sie versuchen würden, die nächste Arbeitszeit oder Dauer von einem Datum aus zu berechnen, gäbe es weder solch ein Datum noch eine Dauer.
Das bedeutet, dass das Festlegen eines solchen Kalenders keinen Sinn ergibt. Selbst wenn Sie bestimmte Daten mit Arbeitsstunden festlegen, würde es nicht korrekt funktionieren, da Gantt Daten nur innerhalb eines Datumsbereichs mit Arbeitsstunden berechnen kann. Versuche, Daten außerhalb des Bereichs zu berechnen, würden das Fehlen des Datums und verschiedene Fehler verursachen. 

Wenn Sie einen Kalender erstellen möchten, in dem einige Monate oder sogar Jahre nur arbeitsfreie Tage haben, sollten Sie die *customWeeks*-Einstellung der **setWorkTime()**-Methode verwenden. Um Arbeitstage/-stunden innerhalb des erforderlichen Bereichs festzulegen, müssen Sie:

- ihn in Abschnitte ohne Arbeitsstunden unterteilen
- Arbeitsstunden für die erforderlichen Daten festlegen

~~~js
gantt.setWorkTime({ date: new Date(2025, 3, 10), hours: ["8:00-12:00"] })
gantt.setWorkTime({ date: new Date(2025, 3, 11), hours: ["13:00-17:00"] })

gantt.setWorkTime({
    customWeeks: {
        period1: {
            from: new Date(2025, 3, 1),
            to: new Date(2025, 3, 10),
            hours: false,
        },

        period2: {
            from: new Date(2025, 3, 12),
            to: new Date(2025, 5, 1),
            hours: false,
        },

    }
});
~~~

**Related sample** [Using `customWeeks` to make all days in the calendar days-off](https://snippet.dhtmlx.com/i0o74zg7)


### Arbeitszeit zurücksetzen

Sie können die Arbeitszeit mit der [unsetWorkTime](api/method/unsetworktime.md)-Methode zurücksetzen:

~~~js
// Änderung der Arbeitszeit der Arbeitstage von ["8:00-17:00"] zu ["8:00-12:00"]
gantt.setWorkTime({ hours: ["8:00-12:00"] });
// setzt die Arbeitszeit zurück
gantt.unsetWorkTime({ hours: ["8:00-12:00"] });
~~~


### Arbeitszeit prüfen

Um zu prüfen, ob ein angegebenes Datum Arbeitszeit ist, verwenden Sie die [isWorkTime](api/method/isworktime.md)-Methode:

~~~js
// macht den 1. Januar 2025 zu einem freien Tag
gantt.setWorkTime({ date: new Date(2025, 0, 1), hours: false });
gantt.isWorkTime(new Date(2025, 0, 1)); // -> false  /*!*/

// macht den 15. März 2025 zu einem Arbeitstag von 9:00 bis 18:00
gantt.setWorkTime({ date: new Date(2025, 2, 15), hours: ["8:00-17:00"] });
gantt.isWorkTime(new Date(2025, 2, 15, 10, 0), "hour"); // -> true  /*!*/
gantt.isWorkTime(new Date(2025, 2, 15, 8, 0), "hour"); // -> false  /*!*/
~~~


**Related sample**: [Correct task position on drag](https://docs.dhtmlx.com/gantt/samples/09_worktime/05_adjust_to_worktime.html)


### Arbeitszeit abrufen

Um die Arbeitsstunden des angegebenen Datums zu erhalten, verwenden Sie die Methode [getWorkHours](api/method/getworkhours.md):

~~~js
gantt.getWorkHours(new Date(2025, 3, 30)); // -> ["8:00-17:00"]
~~~

Um den nächstgelegenen Arbeitstag zum angegebenen Datum zu erhalten, verwenden Sie die Methode [getClosestWorkTime](api/method/getclosestworktime.md):

~~~js
gantt.getClosestWorkTime(new Date(2025, 3, 30));
~~~


### Wiederholung der spezifischen Arbeitszeit

Sie müssen häufig eine Arbeitszeit festlegen, die sich nur an bestimmten Tagen wiederholt (z. B. der letzte Freitag eines Monats ist ein kurzer Tag, der 25. Dezember ist ein Feiertag), aber über die gesamte Projektdauer hinweg.

Die aktuelle Version von dhtmlxGantt bietet keine Konfigurationen zur Festlegung dieses Typs von Arbeitszeit.

Die Bibliothek erlaubt Ihnen lediglich:

- die Arbeitszeit für einen Wochentag festzulegen (Montag, Dienstag, ...)
- die Arbeitszeit für ein bestimmtes Datum festzulegen (4. Juni 2025)
- Arbeitszeitregeln für einen Datumsbereich zu überschreiben (1. Juni 2025 – 1. September 2025)

Wenn Sie also Ausnahmen zu den Arbeitszeitregeln haben, müssen Sie manuell die Daten finden, die Ihrer Regel entsprechen, und die Arbeitszeiteinstellungen auf jedes dieser Daten separat anwenden.

Beispielsweise haben Sie ein Projekt, das 5 Jahre dauert, und Sie möchten den 1. Januar als freien Tag festlegen und den letzten Freitag jedes Monats als kurzen Tag. 

Um den 1. Januar als freien Tag festzulegen, können Sie einfach Werte wie folgt hartkodieren:

~~~js
gantt.setWorkTime({ hours: false, date: new Date(2025, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2026, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2027, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2028, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2029, 0, 1) });
~~~

Und hier ist ein Code-Beispiel, wie man den letzten Freitag eines Monats als kurzen Tag während des gesamten Projekts festlegt:

~~~js
const lastFridayOfMonth = (date) => {
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    if (lastDay.getDay() < 5) {
        lastDay.setDate(lastDay.getDate() - 7);
    }

    lastDay.setDate(lastDay.getDate() - (lastDay.getDay() - 5));

    return lastDay;
};

const projectStart = new Date(2025, 5, 1);
const projectEnd = new Date(2026, 5, 1);
let currentDate = new Date(projectStart);

while (currentDate <= projectEnd) {
    const lastFriday = lastFridayOfMonth(currentDate);
    gantt.setWorkTime({ hours: ["8:00-12:00", "13:00-15:00"], date: lastFriday });
    currentDate = gantt.date.add(currentDate, 1, "month");
}
~~~

**Related sample** [Using `customWeeks` to make all days in the calendar days-off](https://snippet.dhtmlx.com/i0o74zg7)


### Arbeitszeit entfernen

Sie können eine Arbeitszeit durch die Verwendung der [unsetWorkTime](api/method/unsetworktime.md)-Methode entfernen:

~~~js
// ändert die Arbeitszeit der Arbeitstage von ["8:00-17:00"] zu ["8:00-12:00"]
gantt.setWorkTime({ hours: ["8:00-12:00"] });
// setzt die Arbeitszeit zurück
gantt.unsetWorkTime({ hours: ["8:00-12:00"] });
~~~


### Arbeitszeit prüfen

Um zu prüfen, ob das angegebene Datum Arbeitszeit ist, verwenden Sie die [isWorkTime](api/method/isworktime.md)-Methode:

~~~js
// macht der 1. Januar 2025 zu einem freien Tag
gantt.setWorkTime({ date: new Date(2025, 0, 1), hours: false });
gantt.isWorkTime(new Date(2025, 0, 1)); // -> false  /*!*/

// macht der 15. März 2025 zu einem Arbeitstag von 9:00 bis 18:00
gantt.setWorkTime({ date: new Date(2025, 2, 15), hours: ["8:00-17:00"] });
gantt.isWorkTime(new Date(2025, 2, 15, 10, 0), "hour"); // -> true  /*!*/
gantt.isWorkTime(new Date(2025, 2, 15, 8, 0), "hour"); // -> false  /*!*/
~~~


**Related sample**: [Correct task position on drag](https://docs.dhtmlx.com/gantt/samples/09_worktime/05_adjust_to_worktime.html)


### Die Arbeitszeit abrufen

Um die Arbeitsstunden des angegebenen Datums abzurufen, verwenden Sie die Methode [getWorkHours](api/method/getworkhours.md):

~~~js
gantt.getWorkHours(new Date(2025, 3, 30)); // -> ["8:00-17:00"]
~~~

Um den nächstgelegenen Arbeitstag zum angegebenen Datum zu erhalten, verwenden Sie die Methode [getClosestWorkTime](api/method/getclosestworktime.md):

~~~js
gantt.getClosestWorkTime(new Date(2025, 3, 30));
~~~


### Wiederholung der spezifischen Arbeitszeit

Sie müssen oft eine Arbeitszeit festlegen, die sich nur an bestimmten Tagen wiederholt (z. B. der letzte Freitag eines Monats ist ein kurzer Tag, der 25. Dezember ist ein Feiertag), aber über die gesamte Projektdauer hinweg.

Die aktuelle Version von dhtmlxGantt bietet keine Configs zur Festlegung dieser Art von Arbeitszeit. Die Bibliothek erlaubt Ihnen lediglich:

- die Arbeitszeit für einen Wochentag festzulegen (Montag, Dienstag, ...)
- die Arbeitszeit für ein bestimmtes Datum festzulegen (4. Juni 2025)
- Arbeitszeitregeln für einen Datumsbereich zu überschreiben (1. Juni 2025 - 1. September 2025)

Wenn Sie Ausnahmen zu den Arbeitszeitregeln haben, müssen Sie manuell die Daten finden, die Ihrer Regel entsprechen, und die Arbeitszeiteinstellungen auf jedes dieser Daten separat anwenden.

Beispielsweise haben Sie ein Projekt, das 5 Jahre dauert, und Sie möchten den 1. Januar als freien Tag festlegen und den letzten Freitag jedes Monats als kurzen Tag. 

Um den 1. Januar als freien Tag festzulegen, können Sie einfach Werte hartkodieren, wie in:

~~~js
gantt.setWorkTime({ hours: false, date: new Date(2025, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2026, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2027, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2028, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2029, 0, 1) });
~~~

Und hier ist ein Code-Beispiel, wie man den letzten Freitag eines Monats als kurzen Tag während des gesamten Projekts festlegt:

~~~js
const lastFridayOfMonth = (date) => {
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    if (lastDay.getDay() < 5) {
        lastDay.setDate(lastDay.getDate() - 7);
    }

    lastDay.setDate(lastDay.getDate() - (lastDay.getDay() - 5));

    return lastDay;
};

const projectStart = new Date(2025, 5, 1);
const projectEnd = new Date(2026, 5, 1);
let currentDate = new Date(projectStart);

while (currentDate <= projectEnd) {
    const lastFriday = lastFridayOfMonth(currentDate);
    gantt.setWorkTime({ hours: ["8:00-12:00", "13:00-15:00"], date: lastFriday });
    currentDate = gantt.date.add(currentDate, 1, "month");
}
~~~

**Related sample** [Using `customWeeks` to make all days in the calendar days-off](https://snippet.dhtmlx.com/i0o74zg7)

### Die Nicht-Arbeitszeiten einfärben

Um die Nicht-Arbeitszeiten im Diagrammbereich zu färben, verwenden Sie die [timeline_cell_class](api/template/timeline_cell_class.md) Vorlage:

~~~js
gantt.templates.timeline_cell_class = (task, date) => 
    !gantt.isWorkTime({ task, date }) ? "week_end" : "";
~~~

**Verwandtes Beispiel**: [Custom working days and time](https://docs.dhtmlx.com/gantt/samples/09_worktime/04_custom_workday_duration.html)

Weitere Informationen finden Sie im Artikel [Highlighting Time Slots](guides/highlighting-time-slots.md).

:::note
Um die Nicht-Arbeitszeit auszublenden, verwenden Sie die im Artikel beschriebenen Techniken - [Hiding Time Units in the Scale](guides/custom-scale.md).
:::


## Mehrere Arbeitszeitkalender {#multipleworktimecalendars}

Zusätzlich zu den globalen Arbeitszeiteinstellungen ermöglicht Gantt das Erstellen mehrerer Arbeitszeitkalender. Sie können sie einzelnen Aufgaben oder Aufgaben-Gruppen zuweisen.


### Einen Arbeitskalender erstellen

Eine neue Kalenderinstanz kann mit der [createCalendar](api/method/createcalendar.md) Methode erstellt werden.

Diese Methode geht von zwei möglichen Optionen aus:

- Wird sie ohne Parameter aufgerufen, erstellt sie einen Vollzeit-Kalender: 24 Arbeitsstunden pro Tag, 7 Tage pro Woche 

~~~js
const calendar = gantt.createCalendar();
~~~

- Wenn Sie bereits einen Kalender haben und ihn wiederverwenden möchten, um einen neuen Kalender mit anderen Optionen zu erstellen, können Sie Ihren Kalender als Parameter an die [createCalendar](api/method/createcalendar.md) Methode übergeben

~~~js
const newCalendar = gantt.createCalendar(calendar);
~~~

Das Kalenderobjekt ist zunächst von Gantt getrennt und wirkt erst, wenn Sie es in Gantt hinzufügen.


### Einen Arbeitskalender in Gantt hinzufügen

Nachdem Sie einen Kalender erstellt haben, müssen Sie ihn mit der Hilfe der [addCalendar](api/method/addcalendar.md) Methode in Gantt hinzufügen. Wieder gibt es zwei Möglichkeiten:

- Eine vorhandene Kalenderkonfiguration hinzufügen 

~~~js
const calendarId = gantt.addCalendar(calendar);
~~~

- Eine neue Kalend-Konfiguration festlegen, die die Kalender-ID und das **worktime**-Objekt mit Arbeits- und Öffnungszeiten enthält:

~~~js
const calendarId = gantt.addCalendar({
    id: "custom", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});
~~~

:::note
Sie können diese Option auch zum Erstellen eines Kalenders verwenden.
:::


### Verschiedene Arbeitszeiten für verschiedene Zeiträume {#rules_for_periods}

Ab Version 7.1 besteht die Möglichkeit, innerhalb eines Kalenders unterschiedliche Arbeitszeitregeln für verschiedene Zeiträume festzulegen. Beispielsweise können Sie beim Hinzufügen eines Kalenders zu Gantt einen separaten Zeitplan für die Wintermonate anwenden. Dafür verwenden Sie die **customWeeks**-Eigenschaft der [addCalendar](api/method/addcalendar.md) Methode:

~~~js
const calendarId = gantt.addCalendar({
    id: "global", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1],
        customWeeks: {
            winter: {
                from: new Date(2025, 11, 1), // December 1st, 2025
                to: new Date(2026, 2, 1), // March 1st, 00:00, 2026
                hours: ["9:00-13:00", "14:00-16:00"],
                days: [1, 1, 1, 1, 0, 0, 0]
            }
        }
    }
});
~~~


**Verwandtes Beispiel**: [Different worktimes for different time periods](https://docs.dhtmlx.com/gantt/samples/09_worktime/12_calendar_ranges.html)


### Verschiedene Arbeitszeiten festlegen

Sie können die Arbeitszeit für einzelne Tage des entsprechenden Kalenders über die [setWorkTime()](api/method/setworktime.md) Methode ändern:

~~~js
const calendar = gantt.getCalendar("custom");
calendar.setWorkTime({ day: 6, hours: ["8:00-12:00"] });
calendar.setWorkTime({ date: new Date(2025, 0, 1), hours: ["8:00-12:00"] });
~~~


### Calendars abrufen

Sie können Objekte von Arbeitskalendern abrufen, um später damit zu arbeiten. Es gibt mehrere verfügbare Optionen, die unten beschrieben sind.


#### Globalen Gantt-Kalender abrufen

Um das Objekt des globalen Gantt-Kalenders mit der [getCalendar](api/method/getcalendar.md) Methode zu erhalten:

~~~js
const calendar = gantt.getCalendar(id);
~~~

Das *calendar*-Objekt ist eine Instanz des [calendar](api/other/calendar.md) Interfaces.

Die Standardkalenderinstanz (globale Einstellungen) kann über die vordefinierte **"global"**-ID abgerufen werden:

~~~js
const globalSettings = gantt.getCalendar("global");
~~~

Dieser Kalender wird von den [work time methods](guides/working-time.md#global-settings) verwendet, wenn kein anderer Kalender angegeben ist. Er wird standardmäßig Aufgaben zugewiesen.


#### Den aktuellen Kalender einer Aufgabe abrufen

Um das Objekt eines Arbeitskalenders zu erhalten, der einer bestimmten Aufgabe zugewiesen ist, verwenden Sie die [getTaskCalendar](api/method/gettaskcalendar.md) Methode. Sie müssen das Aufgabenobjekt an die Methode übergeben:

~~~js
const task = gantt.getTask(taskId);
const calendar = gantt.getTaskCalendar(task);

if (calendar.isWorkTime(date)) {
    alert("TaskWorkTime");
}
~~~


**Verwandtes Beispiel**: [Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)


Wenn die Arbeitszeit in der Gantt-Konfiguration deaktiviert ist, wird die Methode einen 24/7-Arbeitskalender zurückgeben.


### Globale Methoden zum Zugriff auf Kalender verwenden

Die [work time methods](guides/working-time.md#global-settings) des Gantt-Objekts können verwendet werden, um die Zeitdauer einer bestimmten Aufgabe zu berechnen, ohne ihren Kalender manuell zu verwenden. In diesem Fall nehmen die Methoden ein Objekt-Argument, bei dem das zugehörige "task"-Objekt als eine der Eigenschaften übergeben wird.


- [**gantt.isWorkTime**](api/method/isworktime.md)

~~~js
if (gantt.isWorkTime({ date: date, task: task })) {
    alert(`Work time of a task: ${task.text}`);
}
~~~

Was gleichbedeutend ist mit:

~~~js
const calendar = gantt.getTaskCalendar(task);

if (calendar.isWorkTime({ date: date })) {
    alert(`Work time of a task: ${task.text}`);
}
~~~

- [**gantt.calculateEndDate**](api/method/calculateenddate.md)

~~~js
const endDate = gantt.calculateEndDate({  
    start_date: date, duration: duration, task: task  
});
// oder
const endDate = gantt.calculateEndDate(task);
~~~

- [**gantt.calculateDuration**](api/method/calculateduration.md)

~~~js
const duration = gantt.calculateDuration({  
    start_date: start, end_date: end, task: task  
});
// oder
const duration = gantt.calculateDuration(task);
~~~

- [**gantt.getClosestWorkTime**](api/method/getclosestworktime.md)

~~~js
const closestTime = gantt.getClosestWorkTime({ date: date, task: task });
~~~


### Alle Gantt-Kalender abrufen

Um alle in Gantt hinzugefügten Kalender abzurufen (sowohl der globale als auch die, die einzelnen Aufgaben zugewiesen sind), verwenden Sie die Methode [getCalendars](api/method/getcalendars.md):

~~~js
const calendars = gantt.getCalendars();
~~~

Die Methode gibt ein Array von [Calendar interface](api/other/calendar.md) Objekten zurück.


### Kalender löschen

Falls Sie einen Kalender nicht mehr benötigen, können Sie ihn einfach über die Methode [deleteCalendar](api/method/deletecalendar.md) entfernen.
Sie müssen der Methode die Kalender-ID übergeben:

~~~js
// Kalender hinzufügen
gantt.addCalendar({
    id: "custom",
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});

// Kalender löschen
gantt.deleteCalendar("custom");
~~~


## Kalender einem Task zuweisen {#assigningcalendartotask}

Um einem Task einen Arbeitskalender zuzuweisen, müssen Sie die Kalender-ID und das **worktime**-Objekt mit Arbeits- und Öffnungszeiten festlegen:

~~~js
gantt.addCalendar({
    id: "custom", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});
~~~

und anschließend die Kalender-ID als Wert des Attributs **"calendar_id"** im Task-Objekt festlegen:

~~~js
{
    id: 2, text: "Task #1", start_date: "02-04-2025", duration: 8,
    calendar_id: "custom" /*!*/
}
~~~

Sie können den Namen der dem Task zuweisenden Kalenderbindung-Eigenschaft über die [calendar_property](api/config/calendar_property.md) Konfigurationsoption ändern:

~~~js
gantt.config.calendar_property = "property_name";
~~~


**Verwandtes Beispiel**: [Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)


## Kalender einer Ressource zuweisen {#assigningcalendartoresource}

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Es ist auch möglich, bestimmten Aufgaben, die spezielle Ressourcen (Personen, Geräte usw.) benötigen, einen Arbeitskalender zuzuweisen. 

Beispielsweise können Sie einzelnen Aufgaben je nach dem Benutzer, dem eine Aufgabe zugewiesen wird, separate Kalender zuweisen. Die Reihenfolge Ihrer Schritte wird wie folgt aussehen:

- Definieren Sie die Eigenschaft eines Aufgabenobjekts, die eine Ressourcen-ID speichert, über das [resource_property]-Konfigurationsattribut. Im folgenden Beispiel speichert die Eigenschaft mit dem Namen **user** die IDs der Benutzer:

~~~js
gantt.config.resource_property = "user";
~~~

- Verwenden Sie die Konfigurationsoption [resource_calendars], um den gewünschten Kalender für jeden Benutzer hinzuzufügen und Kalender zu einem einzigen Objekt zusammenzufassen.

~~~js
gantt.config.resource_calendars = {
    1 : gantt.addCalendar({
        worktime: {
            days: [0, 1, 1, 1, 1, 1, 0]
        }
    }),
    2 : gantt.addCalendar({
        worktime: {
            days: [1, 0, 0, 0, 0, 0, 1]
        }
    }),
    3 : gantt.addCalendar({
        worktime: {
            days: [0, 1, 1, 1, 0, 1, 1]
        }
    })
};
~~~

Das Objekt enthält eine Menge von *Key:Value*-Paaren, wobei der Schlüssel die ID der Ressource ist und der Wert die IDs der durch die [addCalendar]-Methode zurückgegebenen Kalender entspricht.

- Geben Sie das **user**-Attribut in Task-Konfigurationsobjekten an. Als Wert dieses Attributs verwenden Sie den Schlüssel des notwendigen Kalenders aus dem Objekt, das in der Konfigurationsoption **resource_calendars** definiert ist:

~~~js
{ id: 1, user: 1, text: "Project #2", start_date: "01-04-2025", duration: 5 },
{ id: 2, user: 0, text: "Task #1", start_date: "02-04-2025", duration: 2 },
{ id: 3, user: 2, text: "Task #2", start_date: "11-04-2025", duration: 4 },
{ id: 4, user: 3, text: "Task #3", start_date: "13-04-2025", duration: 3 },
{ id: 5, user: 0, text: "Task #1.1", start_date: "02-04-2025", duration: 7 },
{ id: 6, user: 1, text: "Task #1.2", start_date: "03-04-2025", duration: 7 }
~~~


[Resource level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/07_resource_calendars.html)


:::note
Beachten Sie, dass, wenn eine Aufgabe sowohl einen benutzerdefinierten Kalender als auch einen Ressourcen-Kalender hat, der benutzerdefinierte Kalender Vorrang hat und die Einstellungen des Ressourcen-Kalenders überschreibt.
:::


### Mehrere Kalender zusammenführen {#mergingcalendars}

Seit v7.0 ist es möglich, mehrere Kalender zu einem Kalender zusammenzuführen. 


Beispielsweise möchten Sie zwei oder mehr Ressourcen mit unterschiedlichen Arbeitskalendern derselben Aufgabe zuweisen. Die Arbeitszeiten der ersten reichen von 9:00 bis 15:00, während die Arbeitszeit eines anderen von 12:00 bis 17:00 geht. Durch deren Zusammenführung erhalten Sie einen Kalender mit Arbeitszeiten von 12:00 bis 15:00.

Wenn Sie die Konfiguration [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) auf true setzen, wird diese Funktion automatisch aktiviert: 

~~~js
gantt.config.dynamic_resource_calendars = true;
~~~


**Verwandtes Beispiel**: [Merge work Calendars of different resources](https://docs.dhtmlx.com/gantt/samples/09_worktime/10_merge_calendars.html)


Sie können Kalender auch manuell zusammenführen mit der Hilfe der [mergeCalendars](api/method/mergecalendars.md) Methode:

~~~js
const johnCalendarId = gantt.addCalendar({
    worktime: {
        hours: ["0:00-24:00"],
        days: [0, 1, 1, 1, 1, 1, 0]
    }
});

const mikeCalendarId = gantt.addCalendar({
    worktime: {
        hours: ["8:00-12:00", "13:00-17:00"],
        days: [0, 1, 1, 1, 1, 1, 0]
    }
});

const joinedCalendar = gantt.mergeCalendars(
    gantt.getCalendar(mikeCalendarId),
    gantt.getCalendar(johnCalendarId)
);
~~~

Lernen Sie die Logik, wie das Zusammenführen von Arbeitszeiten im [mergeCalendars()](api/method/mergecalendars.md) Artikel durchgeführt wird.


## Kalender dem Projekt zuweisen

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Es gibt die Möglichkeit, einen Arbeitskalender nicht nur für eine bestimmte Aufgabe oder Ressource festzulegen, sondern für ein ganzes Projekt, sodass Aufgaben denselben Kalender verwenden können, dem ihr übergeordnetes Projekt zugewiesen ist.

Die Logik der Vererbung eines Kalenders durch eine Aufgabe ist folgende:

- Wenn einem Unterprojekt mit Aufgaben ein Kalender zugewiesen wird, verwenden alle seine Aufgaben diesen Kalender. 
- Wenn einer Aufgabe ein persönlicher Kalender zugewiesen ist, verwendet sie ihren Kalender und nicht den Kalender ihres übergeordneten Projekts.

Um diese Funktionalität zu aktivieren, setzen Sie die Konfigurationsoption [inherit_calendar] auf true. Standardmäßig ist diese Option deaktiviert.

~~~js
gantt.config.inherit_calendar = true;
~~~

- Wenn *true*, verwenden Aufgaben, denen kein Kalender zugewiesen ist, den Kalender, der ihrem zusammenfassenden Elternteil zugewiesen ist (welcher wiederum den Kalender seines Elternteils erben kann).
- Wenn *false*, verwenden Aufgaben ohne Kalender den globalen Kalender.

Im folgenden Beispiel erben Aufgaben standardmäßig Kalender von ihren übergeordneten Projekten. Falls eine Aufgabe jedoch einen anderen Kalender zugewiesen hat, wird dieser Kalender stattdessen verwendet. Somit verwenden "Task #2.2" und "Task #3" die "Full week"-Kalender im Gegensatz zu ihren übergeordneten Projekten:

![Working calendar for project](/img/working_calendar_project.png)


**Verwandtes Beispiel**: [Project level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/08_project_calendars.html)


## Kalender dynamisch ändern

Seit v7.0 erkennt Gantt Änderungen am Kalender einer Aufgabe und berechnet die Zeiten der Aufgaben automatisch neu.

Sie können den Aufgaben-Zeitplan jedoch auch manuell aktualisieren, wenn sich dessen Kalender ändert.
Beispielsweise kann der Kalender aus dem Lightbox-Dialog geändert werden:

~~~js
const updateTaskTiming = (task) => {
    task.start_date = gantt.getClosestWorkTime({
        dir: "future",
        date: task.start_date,
        unit: gantt.config.duration_unit,
        task: task
    });
    task.end_date = gantt.calculateEndDate(task);
};

gantt.attachEvent("onLightboxSave", (id, task, is_new) => {
    updateTaskTiming(task);
    return true;
});
~~~

Oder Sie können die Neuberechnung aller Aufgaben bei Bedarf definieren:

~~~js
gantt.batchUpdate(() => {
    gantt.eachTask((task) => {
        task.start_date = gantt.getClosestWorkTime({
            dir: "future",
            date: task.start_date,
            unit: gantt.config.duration_unit,
            task: task
        });
        task.end_date = gantt.calculateEndDate(task);
        gantt.updateTask(task.id);
    });
});
~~~

**Verwandtes Beispiel**: [Toggle working time settings and move the task to the working date](https://snippet.dhtmlx.com/6cvo9dy9)

**Verwandtes Beispiel**: [Toggle working time settings and recalculate the task's end dates](https://snippet.dhtmlx.com/wb8vc82p)


## Arbeiten-zeitbasierte Anzeige von Aufgabenbalken in Tag-/Wochenskalen

Seit v9.1 erlaubt Gantt das Festlegen der `projection`-Einstellung in der Konfiguration eines Aufgaben-Objekts. Mit dieser Eigenschaft können Sie die Position und Größe der Aufgabenbalken in den Tag- und Wochen-Skalen basierend auf der **Arbeitszeit** festlegen, statt des Intervalls 00:00-24:00.

Weitere Details zu den Möglichkeiten der **scale projection** finden Sie im entsprechenden Leitfaden [in der zugehörigen Anleitung](guides/configuring-time-scale.md#workhourawaretaskbarsrenderingindayweekscales).