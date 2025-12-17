---
title: "Arbeitszeitberechnung"
sidebar_label: "Arbeitszeitberechnung"
---

Arbeitszeitberechnung
========================

Standardmäßig berechnet dhtmlxGantt die Dauern von Aufgaben anhand der Kalenderzeit, das heißt, Wochenenden und Feiertage werden in die Gesamtdauer einbezogen.

:::note
Weitere Details zur Formatierung von Aufgabenenddaten finden Sie im Artikel [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates).
:::


## Aktivieren der Arbeitszeitberechnung

Um die Aufgabendauer ausschließlich auf Basis der Arbeitsstunden zu berechnen, aktivieren Sie die in [work_time](api/config/work_time.md) beschriebene Option:

**Aktivieren der Arbeitszeitberechnung für Aufgabendauern**
~~~js
gantt.config.work_time = true;     // schließt Nicht-Arbeitszeit von der Dauernberechnung aus /*!*/
gantt.config.skip_off_time = true; /*!*/   // blendet Nicht-Arbeitszeit im Diagramm aus
 
gantt.init("gantt_here");
~~~

Beachten Sie, dass die Option [skip_off_time](api/config/skip_off_time.md) nur in der PRO-Version verfügbar ist.


[Duration includes only working days](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)


:::note
Je nach Einstellung von [duration_unit](api/config/duration_unit.md) berechnet dhtmlxGantt die Aufgabendauern in unterschiedlichen Einheiten (z. B. wenn
duration_unit = "hour", werden Dauern in Arbeitsstunden berechnet).
:::

![calculating_different_time](/img/calculating_different_time.png)


## Aufgabendauer im Dezimalformat {#taskdurationindecimalformat}

:::info
Diese Funktion ist ausschließlich in der PRO-Edition verfügbar.
:::

Ab Version 6.3 unterstützt dhtmlxGantt die Angabe von Aufgabendauern im Dezimalformat ("2.5 days", 

"0.5 hours", "3.75 hours") mithilfe des [Duration Formatter](guides/formatters-ext.md) Moduls.

Es ist wichtig zu beachten, dass Gantt intern Aufgabendauern als Ganzzahlen speichert.

Das Formatter-Modul hilft dabei, vom Benutzer eingegebene Dezimalwerte in das von Gantt verwendete interne Format umzuwandeln (zum Beispiel wird "1.5 hours" vom Benutzer eingegeben und als `90` Minuten gespeichert). Ebenso werden gespeicherte Werte wieder in ein lesbares Format umgewandelt (wie z. B. `12` Stunden zu "0.5 days").

![decimal_duration](/img/decimal_duration.png)

:::note
Aufgabendauern können als Bruchteile einer Stunde, eines Tages oder jeder anderen von [duration_unit](api/config/duration_unit.md) unterstützten Einheit angegeben werden, mit Ausnahme von Minuten.
:::


### Implementierung des Dezimalformats

Um Aufgabendauern im Dezimalformat anzuzeigen, gehen Sie wie folgt vor:

- Setzen Sie [duration_unit](api/config/duration_unit.md) auf "minute"
 
~~~js
gantt.config.work_time = true;
gantt.config.duration_unit = "minute"; /*!*/
~~~

Beachten Sie, dass die Einheit zur Speicherung der Dauern kleiner sein sollte als die Einheit, die im Dezimalformat angezeigt wird. Einfach gesagt:


    - Um Benutzern zu erlauben, Dauern als Bruchteile einer Stunde anzugeben (z. B. "0.5 hours"), setzen Sie [duration_unit](api/config/duration_unit.md) auf "minute" 


    - Um Bruchteile eines Tages zu erlauben, setzen Sie [duration_unit](api/config/duration_unit.md) auf "hour". In diesem Fall können Benutzer Dauern wie "0.5 day" eingeben, aber "0.5 hour" wird auf 1 Stunde aufgerundet, da Dauern als ganze Stunden gespeichert werden.

:::note
Standardmäßig rasten Aufgabendaten an der Zeitskala ein. Wenn Ihre Skala auf Tagen basiert, möchten Sie dies eventuell deaktivieren, um Aufgaben auf verschiedene Stunden innerhalb eines Tages zu verschieben.

Um dies zu ermöglichen, deaktivieren Sie [round_dnd_dates](api/config/round_dnd_dates.md) und wählen Sie einen passenden Wert für [time_step](api/config/time_step.md).
:::
Beispiel:

~~~js
// globaler Zeitintervall beträgt 15 Minuten, benötigt "minute" als Dauereinheit
gantt.config.time_step = 15;
gantt.config.round_dnd_dates = false;
~~~

oder 

~~~js
// globaler Zeitintervall ist eine Stunde,
// geeignet, wenn die Dauereinheit "hour" ist
gantt.config.time_step = 60;
gantt.config.round_dnd_dates = false;
~~~

- Erstellen Sie ein *formatter*-Objekt, das die Dauerformate verarbeitet:

~~~js
// Einrichten des Duration Formatters
const formatter = gantt.ext.formatters.durationFormatter({
    enter: "day", 
    store: "minute", // duration_unit
    format: "day",
    hoursPerDay: 8,
    hoursPerWeek: 40,
    daysPerMonth: 30
});
~~~

- Fügen Sie den *formatter* der "Duration"-Spalte hinzu, indem Sie eine Template-Funktion definieren, die die formatierte Dauer zurückgibt:

~~~js
gantt.config.columns = [
    { name: "text", tree: true, width: 170, resize: true, editor: textEditor },
    { name: "start_date", align: "center", resize: true, editor: dateEditor },
    { name: "duration", label: "Duration", resize: true, align: "center",
        template: task => formatter.format(task.duration), width: 100 },
    { name: "add", width: 44 }
];
~~~

- Fügen Sie den *formatter* dem Lightbox hinzu, indem Sie ihn der **formatter**-Eigenschaft des **time**-Controls zuweisen:

~~~js
gantt.config.lightbox.sections = [
    { name: "description", map_to: "text", type: "textarea", height: 70, focus: true },
    { name: "time", map_to: "auto", type: "duration", formatter: formatter }
];
~~~

- Wenn das Inline-Editing im Grid aktiviert ist, fügen Sie den *formatter* auch dem durationEditor-Objekt über die **formatter**-Eigenschaft hinzu:

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
Wenn Ihr Gantt bereits Aufgabendauern in Minuten, Stunden oder einer anderen Einheit speichert, können Sie das [Duration Formatter](guides/formatters-ext.md) Modul verwenden, um Dauern im Dezimalformat anzuzeigen.
:::


## Globale Einstellungen {#globalsettings}

### Festlegen der Arbeitszeit {#setworktime}

Standardmäßig sind die Arbeitszeiten wie folgt definiert:

- Arbeitstage: Montag bis Freitag.
- Arbeitsstunden: 8:00 - 12:00, 13:00 - 17:00.

Um die Arbeitszeit anzupassen, verwenden Sie die Methode [setWorkTime](api/method/setworktime.md):

**Anpassen der Arbeitszeit**

~~~js
// Ändert die Arbeitsstunden an Arbeitstagen
gantt.setWorkTime({ hours: ["9:00-18:00"] });

// Macht alle Freitage zu arbeitsfreien Tagen
gantt.setWorkTime({ day: 5, hours: false });

// Setzt die Arbeitsstunden für Freitage und Samstage
gantt.setWorkTime({ day: 5, hours: ["8:00-12:00"] });
gantt.setWorkTime({ day: 6, hours: ["8:00-12:00"] });

// Legt ein bestimmtes Datum als Arbeitstag fest
gantt.setWorkTime({ date: new Date(2025, 2, 31) });

// Legt ein bestimmtes Datum als arbeitsfreien Tag fest
gantt.setWorkTime({ date: new Date(2025, 0, 1), hours: false });
~~~


[Custom working days and time](https://docs.dhtmlx.com/gantt/samples/09_worktime/04_custom_workday_duration.html)


### Arbeitszeiten für Nachtschichten festlegen

Beim Konfigurieren des **hours**-Attributs in der [setWorkTime](api/method/setworktime.md)-Methode sollten Zeitintervalle in aufsteigender Reihenfolge angegeben werden. Wenn die Intervalle nicht sortiert sind, können einige ignoriert werden. Zum Beispiel werden Intervalle nach `18:00` in den folgenden falschen Einstellungen ignoriert:

~~~js
// Beispiel für falsche Reihenfolge
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00", "14:00-15:00", "08:00-10:00"] });
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00", "00:00-04:00", "05:00-06:00"] });
~~~

Um Arbeitszeiten anzugeben, die Nachtschichten abdecken, teilen Sie die Intervalle auf zwei Tage auf:

- innerhalb von 24 Stunden für den ersten Tag
- innerhalb von 24 Stunden für den folgenden Tag

Beispiel:

~~~js
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00"] });
gantt.setWorkTime({ day: 6, hours: ["00:00-04:00", "05:00-06:00"] });
~~~


### Arbeitszeitregeln konfigurieren

Sie können verschiedene Arbeitszeitregeln für unterschiedliche Zeiträume mit dem **customWeeks**-Attribut der [setWorkTime](api/method/setworktime.md)-Methode definieren. Beispiel: Anpassung der Arbeitszeiten für die Wintermonate:

~~~js
// Ändert die Arbeitsstunden für die Wintermonate
gantt.setWorkTime({
    customWeeks: {
        winter: {
            from: new Date(2025, 11, 1), // 1. Dezember 2025
            to: new Date(2026, 2, 1), // 1. März 2026
            hours: ["9:00-13:00", "14:00-16:00"],
            days: [1, 1, 1, 1, 0, 0, 0]
        }
    }
});
~~~

Um Arbeitszeiten inklusive Minuten (z. B. "8:15-12:45") statt nur voller Stunden anzugeben, setzen Sie [duration_unit](api/config/duration_unit.md) auf *"minute"*.

**Festlegen der Arbeitszeit mit Minuten-Genauigkeit**
~~~js
gantt.config.duration_unit = "minute";

// Setzt Arbeitsstunden mit Minuten-Genauigkeit
gantt.setWorkTime({ hours: ["8:15-12:45"] });
~~~

:::note
Das Arbeitszeitformat, das vor Version 7.0 verwendet wurde, wird weiterhin unterstützt:

~~~js
gantt.setWorkTime({ hours: [9, 18] });
~~~
:::


### Überschreiben einer Arbeitszeitregel

Jeder Aufruf der Methode für dasselbe Datum überschreibt die vorherige Arbeitszeitregel. Um eine Regel aufzuheben, rufen Sie [setWorkTime](api/method/setworktime.md) mit einer anderen Konfiguration auf:

~~~js
gantt.setWorkTime({ hours: ["8:00-12:00"] });
gantt.setWorkTime({ hours: ["13:00-17:00"] });
// Die endgültige Arbeitszeit ist 13:00-17:00,
// nicht eine Kombination beider Einstellungen
~~~

### Benutzerdefinierte Arbeitstage/Feiertage festlegen

Beachten Sie, dass Sie keine Arbeitszeiteinstellungen anwenden können, die alle Arbeitstage oder -stunden ausschließen. Zum Beispiel funktioniert Folgendes nicht:

~~~js
gantt.setWorkTime({ day: 0, hours: [] });
gantt.setWorkTime({ day: 1, hours: [] });
gantt.setWorkTime({ day: 2, hours: [] });
gantt.setWorkTime({ day: 3, hours: [] });
gantt.setWorkTime({ day: 4, hours: [] });
gantt.setWorkTime({ day: 5, hours: [] });
gantt.setWorkTime({ day: 6, hours: [] });
~~~

In diesem Fall ignoriert Gantt den Methodenaufruf für mindestens einen Arbeitstag, und dieser Tag wird weiterhin Arbeitsstunden haben.

Wenn Sie versuchen, die nächstgelegene Arbeitszeit oder -dauer ab einem bestimmten Datum zu berechnen, wird kein gültiges Datum oder keine gültige Dauer gefunden. Das bedeutet, dass eine solche Kalendereinstellung nicht wirklich funktioniert. Selbst wenn Sie Arbeitszeiten für bestimmte Daten festlegen, verhält es sich nicht korrekt, da Gantt nur Daten innerhalb von Bereichen berechnen kann, die Arbeitstage und -stunden enthalten. Berechnungen außerhalb dieser Bereiche schlagen fehl oder verursachen Fehler.

Wenn Sie einen Kalender erstellen möchten, in dem einige Monate oder sogar Jahre ausschließlich aus arbeitsfreien Tagen bestehen, sollten Sie die Option *customWeeks* in der **setWorkTime()**-Methode verwenden. Um Arbeitstage und Arbeitszeiten innerhalb des gewünschten Bereichs festzulegen, sollten Sie:

- den Bereich in Perioden ohne Arbeitsstunden unterteilen
- Arbeitsstunden an den erforderlichen Daten festlegen

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

**Related example:** [Using `customWeeks` to make all days in the calendar days-off](https://snippet.dhtmlx.com/i0o74zg7)


### Arbeitszeit entfernen {#unsetworktime}

Sie können eine Arbeitszeiteinstellung mit der Methode [unsetWorkTime](api/method/unsetworktime.md) entfernen:

~~~js
// ändert die Arbeitszeit an Arbeitstagen von ["8:00-17:00"] auf ["8:00-12:00"]
gantt.setWorkTime({ hours: ["8:00-12:00"] });
// entfernt die Arbeitszeiteinstellung
gantt.unsetWorkTime({ hours: ["8:00-12:00"] });
~~~


### Arbeitszeit prüfen {#checkworktime}

Um herauszufinden, ob ein bestimmtes Datum in die Arbeitszeit fällt, verwenden Sie die Methode [isWorkTime](api/method/isworktime.md):

~~~js
// markiert den 1. Januar 2025 als arbeitsfreien Tag
gantt.setWorkTime({ date: new Date(2025, 0, 1), hours: false });
gantt.isWorkTime(new Date(2025, 0, 1)); // -> false  /*!*/

// markiert den 15. März 2025 als Arbeitstag von 8:00 bis 17:00 Uhr
gantt.setWorkTime({ date: new Date(2025, 2, 15), hours: ["8:00-17:00"] });
gantt.isWorkTime(new Date(2025, 2, 15, 10, 0), "hour"); // -> true  /*!*/
gantt.isWorkTime(new Date(2025, 2, 15, 8, 0), "hour"); // -> false  /*!*/
~~~


[Correct task position on drag](https://docs.dhtmlx.com/gantt/samples/09_worktime/05_adjust_to_worktime.html)


### Arbeitszeit abrufen {#getworktime}

Um die Arbeitsstunden für ein bestimmtes Datum zu erhalten, verwenden Sie die Methode [getWorkHours](api/method/getworkhours.md):

~~~js
gantt.getWorkHours(new Date(2025, 3, 30)); // -> ["8:00-17:00"]
~~~

Um den nächstgelegenen Arbeitstag zu einem bestimmten Datum zu finden, verwenden Sie die Methode [getClosestWorkTime](api/method/getclosestworktime.md):

~~~js
gantt.getClosestWorkTime(new Date(2025, 3, 30));
~~~


### Wiederholung bestimmter Arbeitszeiten {#repeat_worktime}

Manchmal ist es notwendig, Arbeitszeiten festzulegen, die sich nur an bestimmten Tagen wiederholen (z. B. der letzte Freitag eines Monats als kurzer Arbeitstag oder der 25. Dezember als Feiertag) über die gesamte Projektdauer hinweg.

Derzeit bietet dhtmlxGantt keine integrierten Konfigurationen für diese Art von wiederkehrender Arbeitszeit. Es werden nur folgende Einstellungen unterstützt:

- Arbeitszeit nach Wochentag festlegen (Montag, Dienstag, usw.)
- Arbeitszeit für bestimmte Daten festlegen (z. B. 4. Juni 2025)
- Arbeitszeitregeln für Datumsbereiche überschreiben (z. B. 1. Juni bis 1. September 2025)

Wenn Sie also Ausnahmen von den Arbeitszeitregeln haben, müssen Sie die Daten, die Ihren Kriterien entsprechen, manuell ermitteln und die Arbeitszeiteinstellungen für jedes Datum einzeln anwenden.

Wenn Ihr Projekt beispielsweise 5 Jahre umfasst und Sie den 1. Januar als arbeitsfreien Tag festlegen möchten und der letzte Freitag jedes Monats ein kurzer Tag sein soll, können Sie die arbeitsfreien Tage am 1. Januar wie folgt fest codieren:

~~~js
gantt.setWorkTime({ hours: false, date: new Date(2025, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2026, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2027, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2028, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2029, 0, 1) });
~~~

Hier ein Beispiel, wie Sie den letzten Freitag jedes Monats über das gesamte Projekt hinweg als kurzen Tag markieren können:

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


### Freie Zeiten farblich hervorheben {#color_dayoff_times}

Um arbeitsfreie Zeiten im Diagrammbereich hervorzuheben, verwenden Sie das Template [timeline_cell_class](api/template/timeline_cell_class.md):

~~~js
gantt.templates.timeline_cell_class = (task, date) => 
    !gantt.isWorkTime({ task, date }) ? "week_end" : "";
~~~


[Custom working days and time](https://docs.dhtmlx.com/gantt/samples/09_worktime/04_custom_workday_duration.html)


Weitere Details finden Sie im Artikel [Highlighting Time Slots](guides/highlighting-time-slots.md).

:::note
Wenn Sie arbeitsfreie Zeiten ausblenden möchten, sehen Sie sich die Methode in [Hiding Time Units in the Scale](guides/custom-scale.md) an.
:::

## Mehrere Arbeitszeitkalender {#multipleworktimecalendars}

Neben den globalen Arbeitszeiteinstellungen unterstützt Gantt die Erstellung mehrerer Arbeitszeitkalender. Diese können bestimmten Aufgaben oder Gruppen von Aufgaben zugewiesen werden.

### Einen Arbeitszeitkalender erstellen {#createcalendar}

Sie können eine neue Kalenderinstanz mit der Methode [createCalendar](api/method/createcalendar.md) erstellen.

Es gibt zwei Möglichkeiten, diese Methode zu verwenden:

- Wenn Sie sie ohne Parameter aufrufen, wird ein Vollzeitkalender mit 24 Arbeitsstunden pro Tag, 7 Tage die Woche erstellt:

~~~js
const calendar = gantt.createCalendar();
~~~

- Wenn Sie einen neuen Kalender auf Basis eines bestehenden, aber mit anderen Optionen erstellen möchten, können Sie den bestehenden Kalender als Parameter an die Methode [createCalendar](api/method/createcalendar.md) übergeben:

~~~js
const newCalendar = gantt.createCalendar(calendar);
~~~

Anfangs ist das Kalenderobjekt von Gantt getrennt und hat keine Auswirkung, bis Sie es zu Gantt hinzufügen.

### Einen Arbeitszeitkalender zu Gantt hinzufügen {#addcalendar}

Nachdem Sie einen Kalender erstellt haben, müssen Sie ihn mit der Methode [addCalendar](api/method/addcalendar.md) zu Gantt hinzufügen. Es gibt zwei Möglichkeiten:

- Eine bestehende Kalenderkonfiguration hinzufügen:

~~~js
const calendarId = gantt.addCalendar(calendar);
~~~

- Oder eine neue Kalenderkonfiguration festlegen, einschließlich der Kalender-ID und des **worktime**-Objekts mit Arbeitstagen und -stunden:

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
Diese Option kann auch zum Erstellen eines Kalenders verwendet werden.
:::

### Unterschiedliche Arbeitszeiten für verschiedene Zeiträume festlegen {#rules_for_periods}

Ab Version 7.1 ist es möglich, unterschiedliche Arbeitszeitregeln für verschiedene Zeiträume innerhalb eines einzelnen Kalenders zu definieren. Sie können zum Beispiel einen separaten Zeitplan für die Wintermonate anwenden, wenn Sie einen Kalender zu Gantt hinzufügen. Verwenden Sie dazu die **customWeeks**-Eigenschaft der [addCalendar](api/method/addcalendar.md)-Methode:

~~~js
const calendarId = gantt.addCalendar({
    id: "global", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1],
        customWeeks: {
            winter: {
                from: new Date(2025, 11, 1), // 1. Dezember 2025
                to: new Date(2026, 2, 1), // 1. März 2026, 00:00 Uhr
                hours: ["9:00-13:00", "14:00-16:00"],
                days: [1, 1, 1, 1, 0, 0, 0]
            }
        }
    }
});
~~~


[Different worktimes for different time periods](https://docs.dhtmlx.com/gantt/samples/09_worktime/12_calendar_ranges.html)


### Arbeitszeiten ändern {#change_worktime}

Sie können die Arbeitszeiten für bestimmte Tage in einem Kalender mit der [setWorkTime()](api/method/setworktime.md)-Methode aktualisieren:

~~~js
const calendar = gantt.getCalendar("custom");
calendar.setWorkTime({ day: 6, hours: ["8:00-12:00"] });
calendar.setWorkTime({ date: new Date(2025, 0, 1), hours: ["8:00-12:00"] });
~~~

### Kalender abrufen {#multipleworktimecalendars}

Es gibt verschiedene Möglichkeiten, Arbeitszeitkalenderobjekte für die weitere Verwendung abzurufen.

#### Den globalen Gantt-Kalender abrufen {#getglobalcalendar}

Um das globale Gantt-Kalenderobjekt zu erhalten, verwenden Sie die Methode [getCalendar](api/method/getcalendar.md):

~~~js
const calendar = gantt.getCalendar(id);
~~~

Das *calendar*-Objekt ist eine Instanz des [calendar](api/other/calendar.md)-Interfaces.

Der Standardkalender (globale Einstellungen) kann mit der vordefinierten **"global"**-ID abgerufen werden:

~~~js
const globalSettings = gantt.getCalendar("global");
~~~

Dieser Kalender wird von den [Arbeitszeitmethoden](guides/working-time.md#globalsettings) verwendet, wenn kein anderer Kalender angegeben ist. Er wird Aufgaben standardmäßig zugewiesen.

#### Den aktuellen Kalender einer Aufgabe abrufen {#gettaskcalendar}

Um den Arbeitszeitkalender zu erhalten, der einer bestimmten Aufgabe zugewiesen ist, verwenden Sie die Methode [getTaskCalendar](api/method/gettaskcalendar.md) und übergeben das Aufgabenobjekt:

~~~js
const task = gantt.getTask(taskId);
const calendar = gantt.getTaskCalendar(task);

if (calendar.isWorkTime(date)) {
    alert("TaskWorkTime");
}
~~~


[Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)


Wenn die Arbeitszeit im Gantt-Config deaktiviert ist, gibt diese Methode einen 24/7-Arbeitszeitkalender zurück.

### Globale Methoden zum Zugriff auf Kalender verwenden {#globalmethodsforcalendars}

Die [Arbeitszeitmethoden](guides/working-time.md#globalsettings) des Gantt-Objekts ermöglichen die Berechnung der Zeitdauer einer Aufgabe, ohne dass Sie manuell auf deren Kalender zugreifen müssen.

Diese Methoden akzeptieren ein Objektargument, in dem das zugehörige "task"-Objekt als eine der Eigenschaften enthalten ist.

- [**gantt.isWorkTime**](api/method/isworktime.md)

~~~js
if (gantt.isWorkTime({ date: date, task: task })) {
    alert(`Work time of a task: ${task.text}`);
}
~~~

Dies entspricht:

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

### Alle Gantt-Kalender abrufen {#getallcalendars}

Um alle zu Gantt hinzugefügten Kalender (einschließlich des globalen und der einzelnen Aufgaben zugewiesenen) abzurufen, verwenden Sie die Methode [getCalendars](api/method/getcalendars.md):

~~~js
const calendars = gantt.getCalendars();
~~~

Diese Methode gibt ein Array von [Calendar interface](api/other/calendar.md)-Objekten zurück.

### Kalender löschen {#deletecalendar}

Wenn ein Kalender nicht mehr benötigt wird, kann er mit der Methode [deleteCalendar](api/method/deletecalendar.md) durch Angabe seiner ID entfernt werden:

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

## Kalender einem Vorgang zuweisen

Um einem Vorgang einen Arbeitskalender zuzuweisen, fügen Sie zunächst den Kalender mit der id und dem **worktime**-Objekt hinzu, das Arbeitstage und Arbeitszeiten angibt:

~~~js
gantt.addCalendar({
    id: "custom", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});
~~~

Setzen Sie anschließend die id dieses Kalenders als Wert des **"calendar_id"**-Attributs im Vorgangsobjekt:

~~~js
{
    id: 2, text: "Task #1", start_date: "02-04-2025", duration: 8,
    calendar_id: "custom" /*!*/
}
~~~

Sie können den Namen der Vorgangseigenschaft, die für die Verknüpfung mit einem Kalender verwendet wird, über die Konfigurationsoption [calendar_property](api/config/calendar_property.md) ändern:

~~~js
gantt.config.calendar_property = "property_name";
~~~


[Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)


## Kalender einer Ressource zuweisen

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Es ist ebenfalls möglich, einem Vorgang, der bestimmte Ressourcen wie Personen oder Geräte benötigt, einen spezifischen Arbeitskalender zuzuweisen.

Sie können beispielsweise individuelle Kalender für Vorgänge basierend auf dem zugewiesenen Benutzer festlegen. Der Ablauf umfasst:

- Definieren der Vorgangseigenschaft, die die Ressourcen-ID enthält, mithilfe des Konfigurationsattributs [resource_property](api/config/resource_property.md). Im folgenden Beispiel wird die Eigenschaft **user** die Benutzer-IDs speichern:

~~~js
gantt.config.resource_property = "user";
~~~

- Hinzufügen von Kalendern für jeden Benutzer mittels der Konfigurationsoption [resource_calendars](api/config/resource_calendars.md) und Gruppierung in einem Objekt:

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

Dieses Objekt ordnet Ressourcen-IDs als Schlüssel den Kalender-IDs zu, die von der Methode [addCalendar](api/method/addcalendar.md) zurückgegeben werden.

- Angabe des **user**-Attributs in den Vorgangskonfigurationsobjekten. Der Wert sollte dem Schlüssel des entsprechenden Kalenders in der **resource_calendars**-Konfiguration entsprechen:

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
Wenn ein Vorgang sowohl einen benutzerdefinierten als auch einen Ressourcenkalender hat, hat der benutzerdefinierte Kalender Vorrang und überschreibt die Einstellungen des Ressourcenkalenders.
:::

### Mehrere Kalender zusammenführen {#mergingcalendars}

Seit Version 7.0 ist es möglich, mehrere Kalender zu einem zusammenzuführen. 


Wenn beispielsweise zwei Ressourcen mit unterschiedlichen Arbeitskalendern demselben Vorgang zugewiesen sind - einer arbeitet von 9:00 bis 15:00 Uhr, der andere von 12:00 bis 17:00 Uhr - ergibt das Zusammenführen dieser Kalender einen kombinierten Kalender mit Arbeitszeiten von 12:00 bis 15:00 Uhr.

Das Aktivieren der Konfiguration [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) auf *true* aktiviert diese Funktion automatisch:

~~~js
gantt.config.dynamic_resource_calendars = true;
~~~


[Merge work Calendars of different resources](https://docs.dhtmlx.com/gantt/samples/09_worktime/10_merge_calendars.html)


Sie können Kalender auch manuell mit der Methode [mergeCalendars](api/method/mergecalendars.md) zusammenführen:

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

Weitere Informationen dazu, wie Arbeitszeiten zusammengeführt werden, finden Sie im Artikel [mergeCalendars()](api/method/mergecalendars.md).

## Kalender einem Projekt zuweisen

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Sie können einen Arbeitskalender nicht nur einzelnen Vorgängen oder Ressourcen, sondern auch Projekten zuweisen, sodass Vorgänge den Kalender ihres übergeordneten Projekts erben.

Die Vererbungslogik funktioniert wie folgt:

- Wenn einem Teilprojekt mit Vorgängen ein Kalender zugewiesen ist, erben alle seine Vorgänge diesen Kalender.
- Wenn ein Vorgang einen eigenen Kalender zugewiesen hat, verwendet er diesen anstelle des Kalenders des übergeordneten Projekts.

Um diese Funktion zu aktivieren, setzen Sie die Konfigurationsoption [inherit_calendar](api/config/inherit_calendar.md) auf *true*. Standardmäßig ist sie deaktiviert.

~~~js
gantt.config.inherit_calendar = true;
~~~

- Wenn *true*, verwenden Vorgänge ohne zugewiesenen Kalender den Kalender ihres übergeordneten Vorgangs (der wiederum von seinem Elternteil erben kann).
- Wenn *false*, verwenden solche Vorgänge den globalen Kalender.

Im folgenden Beispiel erben Vorgänge standardmäßig Kalender von ihren Elternprojekten. Vorgänge mit eigenen Kalendern verwenden stattdessen diese. Zum Beispiel nutzen "Task #2.2" und "Task #3" den Kalender "Full week", im Gegensatz zu ihren Elternprojekten:

![Arbeitskalender für Projekt](/img/working_calendar_project.png)


[Project level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/08_project_calendars.html)


## Kalender dynamisch ändern

Seit Version 7.0 erkennt Gantt automatisch Änderungen am Kalender eines Vorgangs und aktualisiert die Zeitplanung des Vorgangs entsprechend.

Bei Bedarf können Sie den Zeitplan des Vorgangs auch manuell anpassen, wenn sein Kalender geändert wird. Beispielsweise kann eine Kalenderänderung über das Lightbox-Formular behandelt werden:

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

Alternativ können Sie bei Bedarf eine Neuberechnung für alle Vorgänge auslösen:

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

**Related example:** [Arbeitszeiteinstellungen umschalten und den Vorgang auf das Arbeitsdatum verschieben](https://snippet.dhtmlx.com/6cvo9dy9)

**Related example:** [Arbeitszeiteinstellungen umschalten und das Enddatum des Vorgangs neu berechnen](https://snippet.dhtmlx.com/wb8vc82p)

