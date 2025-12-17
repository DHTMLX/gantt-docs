---
sidebar_label: calendar
title: calendar config
description: "die Schnittstelle für das Arbeitskalender-Objekt"
---

# calendar

### Description

@short: Die Schnittstelle für das Arbeitskalender-Objekt

@signature: calendar: Calendar

### Example

~~~jsx

~~~

### Details

Für weitere Details zu Arbeitskalendern siehe den Artikel ["Arbeitszeitberechnung"](guides/working-time.md#multipleworktimecalendars).

Das **calendar**-Objekt umfasst die folgenden Methoden und Eigenschaften:

## Methoden


- **setWorkTime (config): boolean** - definiert die Arbeitszeiten für das Gantt-Diagramm
    - **_config_** - (*object*) - das [Konfigurationsobjekt](api/method/setworktime.md#configurationobjectproperties), das den Zeitraum beschreibt:
        - **_day?_** - (*string | number*) - optional, eine Wochentagsnummer [0 (Sonntag) - 6 (Samstag)]. Es kann jeweils nur ein Tag gesetzt werden
        - **_date?_** - (*Date*) - optional, ein spezifisches Datum, das als Arbeitstag oder Nicht-Arbeitstag markiert wird
        - **_hours?_** - (*string[] | number[] | boolean*) - optional, ein Array von Arbeitszeiten als 'von'-'bis' Paare. 'false' markiert einen freien Tag, 'true' (Standard) verwendet die Standardarbeitszeit (["8:00-17:00"])
        - **_customWeeks?_** - (*object*) - optional, ein Objekt, das unterschiedliche Arbeitszeitregeln für verschiedene Zeiträume definiert. Es enthält Schlüssel:Wert-Paare, wobei der Schlüssel der Name des Zeitraums ist und der Wert ein Objekt mit folgenden Attributen:
            - **_[timespan: string]_** - (*object*) - der Zeitraum mit Arbeitszeiteinstellungen. Der Schlüsselname wird als Name des Zeitraums verwendet
                - **_from_** - (*Date*) - Startdatum des Zeitraums
                - **_to_** - (*Date*) - Enddatum des Zeitraums
                - **_hours?_** - (*string[] | number[]*) - optional, ein Array von Arbeitszeiten als 'von'-'bis' Paare. 'false' markiert einen freien Tag, 'true' (Standard) verwendet die Standardarbeitszeit (["8:00-17:00"])
                - **_days?_** - (*WorkDaysTuple | boolean*) - optional, ein Array mit 7 Elementen, die die Wochentage repräsentieren (0 - Sonntag, 6 - Samstag), wobei 1/true ein Arbeitstag und 0/false ein freier Tag ist.

  
~~~js
calendar.setWorkTime({ hours:["9:00-18:00"] });
~~~

- **unsetWorkTime (config): void** - entfernt eine Arbeitszeit-Einstellung aus dem Gantt-Diagramm
    - **_config_** - (*object*) - das [Konfigurationsobjekt](api/method/unsetworktime.md#configurationobjectproperties), das den Zeitraum beschreibt:
        - **_day?_** - (*string | number*) - optional, eine Wochentagsnummer [0 (Sonntag) - 6 (Samstag)]. Es kann jeweils nur ein Tag gesetzt werden
        - **_date?_** - (*Date*) - optional, ein spezifisches Datum, das als Arbeitstag oder Nicht-Arbeitstag markiert wird
        - **_hours?_** - (*string[] | number[] | boolean*) - optional, ein Array von Arbeitszeiten als 'von'-'bis' Paare. 'false' markiert einen freien Tag, 'true' (Standard) verwendet die Standardarbeitszeit (["8:00-17:00"])


~~~js
calendar.unsetWorkTime({ hours:["9:00-18:00"] });
~~~

- **isWorkTime (config, time_unit): boolean** - bestimmt, ob das angegebene Datum Arbeitszeit ist 
    - **_config_** - (*Date | object*) - entweder ein Date-Objekt zur Prüfung oder das [Konfigurationsobjekt](api/method/isworktime.md#configurationobjectproperties), das den Zeitraum beschreibt:
        - **_date_** - (*Date*) - das zu prüfende Datum
        - **_unit?_** - (*string*) - optional, Zeiteinheit: "minute", "hour", "day", "week", "month", "year"
        - **_task?_** - (*Task*) - optional, das Task-Objekt, dessen Dauer berücksichtigt werden soll
    - **_time_unit?_** - (*string*) - optional, die Zeiteinheit: "minute", "hour", "day", "week", "month", "year". Nicht erforderlich, wenn der erste Parameter ein Objekt ist<br><br>

~~~js
var calendar = gantt.getTaskCalendar(task);
if (calendar.isWorkTime({date: date})){
    alert("worktime of task" + task.text);
}
~~~

- **getClosestWorkTime (config): Date** - findet die nächstgelegene Arbeitszeit
    - **_config_** - (*Date | object*) - das [Konfigurationsobjekt](api/method/getclosestworktime.md#configurationobjectproperties):
        - **_date_** - (*Date*) - das Datum, für das die nächste Arbeitszeit gefunden werden soll
        - **_dir?_** - (*string*) - optional, Suchrichtung: "future" oder "past"
        - **_unit?_** - (*string*) - optional, Zeiteinheit für die Suche
        - **_task?_** - (*Task*) - optional, das Task-Objekt, dessen Kalender verwendet werden soll

~~~js
calendar.getClosestWorkTime({
    date:new Date(2013,0,1), 
    dir:"future", 
    unit:"hour"
});
~~~


- **calculateEndDate (config, duration, unit): Date** - berechnet das Enddatum einer Aufgabe
    - **_config_** - (*Date | object*) - entweder das Startdatum der Aufgabe oder das [Konfigurationsobjekt](api/method/calculateenddate.md#configurationobjectproperties), das den Zeitraum beschreibt:
        - **_start_date_** - (*Date*) - das Startdatum der Aufgabe
        - **_duration_** - (*number*) - die Dauer der Aufgabe
        - **_unit?_** - (*string*) - optional, die Zeiteinheit der Dauer: "minute", "hour", "day", "week", "month", "year"
        - **_task?_** - (*Task*) - optional, das Task-Objekt, dessen Dauer berechnet werden soll
    - **_duration?_** - (*number*) - optional, die Dauer der Aufgabe. Nicht nötig, wenn der erste Parameter ein Objekt ist
    - **_unit?_** - (*string*) - optional, die Zeiteinheit der Dauer. Nicht nötig, wenn der erste Parameter ein Objekt ist<br>

~~~js
var end_date = calendar.calculateEndDate({start_date:date, duration:duration});
~~~

- **calculateDuration (config, end): number** - berechnet die Dauer einer Aufgabe 
    - **_config_** - (*Date | object*) - entweder das Startdatum der Aufgabe oder das [Konfigurationsobjekt](api/method/calculateduration.md#configurationobjectproperties), das den Zeitraum beschreibt:
        - **_start_date_** - (*Date*) - das Startdatum der Aufgabe
        - **_end_date_** - (*Date*) - das Enddatum der Aufgabe
        - **_task?_** - (*Task*) - optional, das Task-Objekt, dessen Dauer berechnet werden soll
    - **_end?_**    - (*Date*) - das Enddatum der Aufgabe. Nicht nötig, wenn der erste Parameter ein Objekt ist<br>

~~~js
calendar.calculateDuration(new Date(2013,02,15), new Date(2013,02,25));
~~~


## Eigenschaften

- **id** - (*string | number*) - die Kennung des Kalenders der Aufgabe

### Related API
- [addCalendar](api/method/addcalendar.md)
- [getCalendar](api/method/getcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- ["Arbeitszeitberechnung"](guides/working-time.md#assigningcalendartotask)

