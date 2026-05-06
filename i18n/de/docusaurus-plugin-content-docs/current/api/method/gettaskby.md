---
sidebar_label: getTaskBy
title: getTaskBy method
description: "Findet eine Aufgabe anhand der angegebenen Kriterien"
---

# getTaskBy

### Description

@short: Findet eine Aufgabe anhand der angegebenen Kriterien

@signature: getTaskBy: (propertyName: string | GanttCallback, propertyValue?: string | number | boolean | any[], types?: any) =\> Array\<Task\>

### Parameters

- `propertyName` - (erforderlich) *string | function*      -      der Name der Eigenschaft, die übereinstimmen soll, oder eine Filterfunktion
- `propertyValue`	-	(optional) 	*string | number | boolean | array*	-	die Eigenschaftswerte
- `types`		-	(optional)	*object*			-		ein Objekt mit den Typen der Tasks, die zurückgegeben werden sollen
### Returns
- ` tasks` - (Array &lt;Task&gt;) - Array von Task-Objekten

### Example

~~~jsx
// einfache Suche
const userTasks = gantt.getTaskBy("user_id", [5]);

// (task: object) => boolean
let userTasks = gantt.getTaskBy(function(task){
   return task.user_id == 5 || !task.user_id;
});

userTasks = gantt.getTaskBy(task => task.user_id == 5);
~~~

### Related samples
- [Vorlagen des Ressourcen-Diagramms](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)

### Details

- Die Methode kann verwendet werden, um Aufgaben anhand des Eigenschaftswerts auszuwählen, z. B. Aufgaben eines bestimmten Benutzers zu finden, abgeschlossene Aufgaben zu finden, usw.
- `gantt.getTaskBy(propertyName, propertyValue)` verwendet einen lockeren Gleichheitsvergleich („double equals“, ==)
- Das Ergebnis von `gantt.getTaskBy(propertyName, propertyValue)` kann von gantt gecached werden, wodurch diese Überladung schneller arbeiten kann als `gantt.getTaskBy((task: object) => boolean)`

By default **gantt.getTaskBy()** gibt nur Task- und Meilenstein-Items zurück, die den Kriterien entsprechen, während Projekt-Items ausgelassen werden.

Um Datensätze aller Typen auszuwählen, verwenden Sie folgenden Wert des dritten Parameters:

~~~js
gantt.getTaskBy("progress", 1, { task: true, project: true, milestone: true });
~~~

Um Elemente eines bestimmten Typs zurückzugeben, geben Sie den Typwert im dritten Parameter an:

~~~js
gantt.getTaskBy("progress", 1, { project: true})
~~~

### Related API
- [getSubtaskDuration](api/method/getsubtaskduration.md)
- [getSubtaskDates](api/method/getsubtaskdates.md)

### Change log
- Der Parameter **types** wurde in v8.0 hinzugefügt