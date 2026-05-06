---
sidebar_label: calendar
title: calendar config
description: "die Schnittstelle für das Arbeitskalender-Objekt"
---

# calendar

### Beschreibung

@short: Die Schnittstelle für das Arbeitskalender-Objekt

@signature: calendar: Calendar


### Details

Lesen Sie den [Work Time Calculation](guides/working-time.md#getting-calendars) Artikel für detaillierte Informationen zu Arbeitskalendern.

Das **calendar**-Objekt besitzt die folgenden Methoden und Eigenschaften:

### Methoden

- **setWorkTime (config): boolean** - setzt die Arbeitszeit für das Gantt-Diagramm
    - **_config:_** - (*object*) - das [Konfigurationsobjekt](api/method/setworktime.md#configuration-object-properties) eines Zeitabschnitts:
        - **_day?_** - (*string | number*) - optional, eine Zahl des Wochentags [0 (Sonntag) - 6 (Samstag)]. Hinweis: Es können jeweils nur 1 Tag festgelegt werden
        - **_date?_** - (*Date*) - optional, ein bestimmtes Datum, das als Arbeitstag oder freier Tag festgelegt wird
        - **_hours?_** - (*string[] | number[] | boolean*) - optional, ein Array von Arbeitsstunden als 'von'-'bis'-Paare. 'false'-Wert setzt einen Ruhetag, 'true' (Standardwert) wendet die Standardstunden an (["8:00-17:00"])
        - **_customWeeks?_** - (*object*) - optional, ein Objekt mit verschiedenen Arbeitszeitregeln für unterschiedliche Zeiträume. Das Objekt kann eine Menge von Schlüssel-Wert-Paaren enthalten, wobei der Schlüssel der Name des Zeitabschnitts ist und der Wert ein Objekt mit Attributlisten ist.
            - **_[timespan: string]_** - (*object*) - der Zeitabschnitt mit den Arbeitszeiteinstellungen. Der Name dieses Objekts wird als Name des Zeitabschnitts verwendet
                - **_from_** - (*Date*) - das Datum, an dem der Zeitabschnitt beginnen soll
                - **_to_** - (*Date*) - das Datum, an dem der Zeitabschnitt abgeschlossen werden soll
                - **_hours?_** - (*string[] | number[]*) - optional, ein Array von Arbeitsstunden als 'von'-'bis'-Paare. 'false'-Wert setzt einen Ruhetag, 'true' (Standardwert) wendet die Standardstunden an (["8:00-17:00"])
                - **_days?_** - (*WorkDaysTuple | boolean*) - optional, ein Array von 7 Wochentagen (von 0 - Sonntag, bis 6 - Samstag), wobei 1/true für einen Arbeitstag und 0/false - ein Nicht-Arbeitstag steht.

  
~~~js
calendar.setWorkTime({ hours:["9:00-18:00"] });
calendar.setWorkTime({ hours:["9:00-18:00"] });
calendar.setWorkTime({ day: 5, hours: ["9:00-18:00"] });
calendar.setWorkTime({ day: 5, hours: false });
calendar.setWorkTime({ date: new Date(2025, 5, 6), hours: ["9:00-18:00"] });
calendar.setWorkTime({ date: new Date(2025, 5, 6), hours: false });
calendar.setWorkTime({ hours: false });
calendar.setWorkTime({
  customWeeks: {
    winter: {
      from: new Date(2025, 11, 1),
      to: new Date(2026, 2, 1),
      hours: ["8:00-13:00", "14:00-16:00"],
      days: [1, 1, 1, 1, 1, 0, 0]
    },
    summer: {
      from: new Date(2026, 5, 1),
      to: new Date(2026, 7, 1),
      hours: ["10:00-13:00", "14:00-16:00"],
      days: [1, 1, 0, 1, 1, 0, 0]
    }
  }
});
calendar.setWorkTime({
  customWeeks: {
    winter: {
      from: new Date(2025, 11, 1),
      to: new Date(2026, 2, 1),
      hours: ["8:00-13:00", "14:00-16:00"],
      days: [1, ["8:00-13:00"], 1, 1, ["14:00-16:00"], 0, 0]
    },
    summer: {
      from: new Date(2026, 5, 1),
      to: new Date(2026, 7, 1),
      hours: ["10:00-13:00", "14:00-16:00"],
      days: false
    }
  }
});
~~~

- **unsetWorkTime (config): void** - setzt eine Arbeitszeit im Gantt-Diagramm zurück
    - **_config_** - (*object*) - das [Konfigurationsobjekt](api/method/unsetworktime.md#configuration-object-properties) eines Zeitabschnitts:
        - **_day?_** - (*string | number*) - optional, eine Zahl des Wochentags [0 (Sonntag) - 6 (Samstag)]. Hinweis: Es können jeweils nur 1 Tag festgelegt werden
        - **_date?_** - (*Date*) - optional, ein bestimmtes Datum, das als Arbeitstag oder freier Tag festgelegt wird
        - **_hours?_** - (*string[] | number[] | boolean*) - optional, ein Array von Arbeitsstunden als 'von'-'bis'-Paare.
'false' Wert setzt die Arbeitszeit zurück, 'true' (Standardwert) wendet die Standardstunden an (["8:00-17:00"])


~~~js
calendar.unsetWorkTime({ hours: ["9:00-18:00"] });
calendar.unsetWorkTime({ day: "5", hours: ["9:00-18:00"] });
calendar.unsetWorkTime({ day: 5, hours: false });
calendar.unsetWorkTime({ date: new Date(2025, 5, 6), hours: true });
~~~

- **isWorkTime (config, time_unit): boolean** - prüft, ob das angegebene Datum Arbeitszeit ist
    - **_config_** - (*Date | object*) - entweder ein Datum zum Prüfen oder das [Konfigurationsobjekt](api/method/isworktime.md#configuration-object-properties) eines Zeitabschnitts:
        - **_date_** - (*Date*) - ein Datum zum Prüfen
        - **_unit?_** - (*string*) - optional, eine Zeiteinheit: "minute", "hour", "day", "week", "month", "year"
    - **_time_unit?_** - (*string*) - optional, eine Zeiteinheit: "minute", "hour", "day", "week", "month", "year". Nicht nötig, wenn der erste Parameter als Objekt angegeben wird

~~~js
const calendar = gantt.getTaskCalendar(task);
if (calendar.isWorkTime({date: date})){
    alert("worktime of task" + task.text);
}

calendar.isWorkTime(new Date(2025, 5, 6));
calendar.isWorkTime(new Date(2025, 5, 6), "hour");
calendar.isWorkTime({ date: new Date(2025, 5, 6), unit: "hour" });
~~~

- **getClosestWorkTime (config): Date** - gibt die nächste Arbeitszeit zurück
    - **_config_** - (*Date | object*) - das [Konfigurationsobjekt](api/method/getclosestworktime.md#configuration-object-properties):
        - **_date_** - (*Date*) - ein Datum, für das die nächste Arbeitszeit ermittelt wird
        - **_dir?_** - (*string*) - optional, gibt die Richtung der nächsten Zeit an: "future" oder "past" 
        - **_unit?_** - (*string*) - optional, eine Zeiteinheit, in der die nächste Arbeitszeit gesucht wird

~~~js
calendar.getClosestWorkTime(new Date(2025, 5, 6));
calendar.getClosestWorkTime({ 
    date: new Date(2025, 5, 6), 
    unit: "hour",
    dir: "past" 
});
~~~


- **calculateEndDate (config, duration, unit): Date** - berechnet das Enddatum einer Aufgabe
    - **_config_** - (*Date | object*) - entweder das Datum, an dem eine Aufgabe beginnen soll, oder das [configuration object](api/method/calculateenddate.md#configuration-object-properties) eines Zeitabschnitts:
        - **_start_date_** - (*Date*) - das Datum, an dem eine Aufgabe beginnen soll
        - **_duration_** - (*number*) - die Dauer einer Aufgabe
        - **_unit?_** - (*string*) - optional, die Zeiteinheit der Dauer: "minute", "hour", "day", "week", "month", "year"
    - **_duration?_** - (*number*) - optional, die Dauer einer Aufgabe. Nicht nötig, wenn der erste Parameter als Objekt angegeben wird
    - **_unit?_** - (*string*) - optional, die Zeiteinheit der Dauer. Nicht nötig, wenn der erste Parameter als Objekt angegeben wird

~~~js
calendar.calculateEndDate(new Date(2025, 5, 6), 2, "hour");
calendar.calculateEndDate({ 
    start_date: new Date(2025, 5, 6), 
    duration: 2, 
    unit: "hour" 
});
~~~

- **calculateDuration (config, end): number** - berechnet die Dauer einer Aufgabe 
    - **_config_** - (*Date | object*) - entweder das Datum, an dem eine Aufgabe beginnt, oder das [configuration object](api/method/calculateduration.md#configuration-object-properties) eines Zeitabschnitts:
        - **_start_date_** - (*Date*) - das Datum, an dem eine Aufgabe beginnen soll
        - **_end_date_** - (*Date*) - das Datum, an dem eine Aufgabe beendet werden soll
    - **_end?_**    - (*Date*) - das Datum, an dem eine Aufgabe beendet werden soll. Nicht nötig, wenn der erste Parameter als Objekt angegeben wird

~~~js
calendar.calculateDuration(new Date(2025, 5, 6), new Date(2025, 5, 17));
calendar.calculateDuration({ 
    start_date: new Date(2025, 5, 6), 
    end_date: new Date(2025, 5, 17) 
});
~~~


### Eigenschaften

- **id** - (*string | number*) - die ID des Kalenders einer Aufgabe

### Related API
- [addCalendar](api/method/addcalendar.md)
- [getCalendar](api/method/getcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- [Arbeitszeitberechnung](guides/working-time.md#assigningcalendartotask)

