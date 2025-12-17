---
sidebar_label: getTaskBy
title: getTaskBy method
description: "sucht eine Aufgabe basierend auf den angegebenen Kriterien"
---

# getTaskBy

### Description

@short: Sucht eine Aufgabe basierend auf den angegebenen Kriterien

@signature: getTaskBy: (propertyName: string | GanttCallback, propertyValue?: string | number | boolean | any[], types?: any) =\> Array\<Task\>

### Parameters

- `propertyName` - (required) *string | function* -  die Eigenschaft, nach der gesucht wird, oder eine Filterfunktion
- `propertyValue` - (optional) *string | number | boolean | array* -  der Wert, der für die Eigenschaft übereinstimmen soll
- `types` - (optional) *object* - ein Objekt, das angibt, welche Arten von Aufgaben in den Ergebnissen enthalten sein sollen

### Returns
- ` tasks` - (Array &lt;Task&gt;) - ein Array von Task-Objekten, die den Kriterien entsprechen

### Example

~~~jsx
// einfache Suche
const userTasks = gantt.getTaskBy("user_id", [5]);

// mit einer Filterfunktion
let userTasks = gantt.getTaskBy(function(task){
   return task.user_id == 5 || !task.user_id;
});

userTasks = gantt.getTaskBy(task => task.user_id == 5);
~~~

### Related samples
- [Templates of the Resource diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)

### Details

- Diese Methode ermöglicht es, Aufgaben basierend auf einem Eigenschaftswert auszuwählen, z.B. um Aufgaben zu finden, die einem bestimmten Benutzer zugewiesen sind oder Aufgaben, die abgeschlossen sind.
- Beim Aufruf von `gantt.getTaskBy(propertyName, propertyValue)` wird ein lockerer Gleichheitsvergleich ("double equals", ==) verwendet.
- Die Ergebnisse von `gantt.getTaskBy(propertyName, propertyValue)` können vom gantt gecached werden, wodurch diese Form potenziell schneller ist als die Verwendung der Filterfunktion `gantt.getTaskBy((task: object) => boolean)`.

Standardmäßig gibt **gantt.getTaskBy()** nur Aufgaben und Meilensteine zurück, die den Kriterien entsprechen, und schließt Projekt-Items aus.

Um alle Arten von Einträgen einzuschließen, verwenden Sie diesen dritten Parameter:

~~~js
gantt.getTaskBy("progress", 1, { task: true, project: true, milestone: true });
~~~

Um nur einen bestimmten Typ von Eintrag zu erhalten, geben Sie ihn im dritten Parameter an:

~~~js
gantt.getTaskBy("progress", 1, { project: true})
~~~

### Related API
- [getSubtaskDuration](api/method/getsubtaskduration.md)
- [getSubtaskDates](api/method/getsubtaskdates.md)

### Change log
- der **types** Parameter wurde in Version 8.0 eingeführt

