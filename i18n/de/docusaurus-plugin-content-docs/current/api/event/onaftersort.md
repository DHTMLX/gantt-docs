---
sidebar_label: onAfterSort
title: onAfterSort-Ereignis
description: "Wird ausgelöst, nachdem Aufgaben im Grid sortiert wurden"
---

# onAfterSort

### Description

@short: Wird ausgelöst, nachdem Aufgaben im Grid sortiert wurden

@signature: onAfterSort: (field: string | GanttCallback, desc?: boolean, parent?: string | number) =\> void;

### Parameters

- `field` - (erforderlich) *string | function* - der Name der Spalte, nach der das Grid sortiert wurde, oder eine benutzerdefinierte Sortierfunktion
- `desc`	- (optional)	*boolean*	 	-		optional, die Sortierrichtung: <i>true</i> - absteigend, <i>false</i> - aufsteigend<br/>
- `parent`	- (optional) *string | number*	-	optional, die ID der übergeordneten Aufgabe, falls die Aufgaben nur im Zweig des angegebenen Elternteils sortiert wurden

### Example

~~~jsx
gantt.attachEvent("onAfterSort",function(field, direction, parent){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related API
- [sort](api/method/sort.md)
- [sort](api/config/sort.md)