---
sidebar_label: isWorkTime
title: isWorkTime Methode
description: "prüft, ob das angegebene Datum Arbeitszeit ist"
---

# isWorkTime

### Description

@short: Prüft, ob das angegebene Datum Arbeitszeit ist

@signature: isWorkTime: (config: Date | object, time_unit?: string)

### Parameters

- `config` - (required) *object | Date* -        entweder das Konfigurationsobjekt einer Zeitspanne oder ein spezifisches Datum

### Returns
- `isWorkTime` - (boolean) - <i>true</i>, falls das angegebene Datum Arbeitszeit ist. Andernfalls, <i>false</i>

### Example

~~~jsx
//prüft, ob das angegebene Datum ein Arbeitstag gemäß den globalen Einstellungen ist
gantt.isWorkTime({ date: new Date(2023,3,5) });
// oder
gantt.isWorkTime(new Date(2023,3,5));

//prüft, ob das angegebene Datum ein Arbeitstag für eine bestimmte Aufgabe ist
gantt.isWorkTime({date: new Date(2023,3,5), task: task});
~~~

### Details

:::note
Wenn die [work_time](api/config/work_time.md) Option deaktiviert ist, gibt die Methode immer `true` zurück. 
:::

- Die Methode wird den [globalen Arbeitszeitkalender](guides/working-time.md#multipleworktimecalendars) verwenden, wenn keine Aufgabe angegeben ist. 
- Außerdem kann die Methode direkt von einem [calendar object](api/other/calendar.md) aufgerufen werden.

Angenommen, Sie setzen die folgende Arbeitszeit für das Diagramm:

- **Arbeitstage**: Montag - Freitag
- **Arbeitsstunden**: 6:00 - 15:00

Dann erhalten Sie, wenn Sie Montag, 3. April 2023 wie im obigen Beispiel prüfen:

~~~js
gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit: "hour"}); 
//->false, da 17:00-18:00 nicht in der Arbeitszeit liegt

gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit:  "day"}); 
//-> true, da Montag ein Arbeitstag ist
~~~

## Konfigurationsobjekt-Eigenschaften

Das Konfigurationsobjekt kann die folgenden Eigenschaften enthalten:

- **date** - (*Date*) ein zu prüfendes Datum
- * **unit** - (string)    optional, eine Zeit-Einheit: "minute", "hour", "day", "week", "month", "year"
- * **task** - (*object*)    optional, das Objekt der Aufgabe, deren Dauer berechnet werden soll

~~~js
if (gantt.isWorkTime({date: date, task: task})){
    alert("worktime of task" + task.text);
}
~~~

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [getWorkHours](api/method/getworkhours.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)