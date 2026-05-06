---
sidebar_label: sort
title: Sortiermethode
description: "Sortiert Aufgaben im Grid"
---

# sort

### Description

@short: Sortiert Aufgaben im Grid

@signature: sort: (field: string | ((task1: Task, task2: Task) => 1 | 0 | -1), desc?: boolean, parent?: string | number, silent?: boolean) =\> void;

### Parameters

- `field`	- (erforderlich) *string | SortTasks*	- der Name der Spalte, nach der das Grid sortiert wird, oder eine benutzerdefinierte Sortierfunktion
- `desc`	- (optional) *boolean* - gibt die Sortierreihenfolge an: <i>true</i> – absteigend sortieren und <i>false</i> – aufsteigend sortieren. Standardmäßig <i>false</i>
- `parent` -	(optional) *string | number*	- die ID der übergeordneten Aufgabe. Geben Sie den Parameter an, wenn Sie Aufgaben nur im Zweig des angegebenen Elternteils sortieren möchten.
- `silent` -	(optional) *boolean*	- gibt an, ob das Rendering nach dem Neuordnen der Elemente aufgerufen werden soll

### Example

~~~jsx
<input type='button'  value='Sort by task name' onclick='sortByName()'>
<script>
    var n_direction = false;
    function sortByName(){
        if (n_direction){
            gantt.sort("text",false);
        } else {
            gantt.sort("text",true);
        }
        n_direction = !n_direction;
    };
    gantt.init("gantt_here");
</script>
~~~

### Related samples
- [Verwendung von Sortiermethoden](https://docs.dhtmlx.com/gantt/samples/07_grid/05_sort_api.html)

### Details

Die benutzerdefinierte Sortierfunktion verwendet die **Task**-Objekte als Argumente und sollte die Zahl (1, 0 oder -1) zurückgeben

Der **parent**-Parameter wird bei der Anwendung einer benutzerdefinierten Sortierfunktion ignoriert. [Beispiel ansehen](https://snippet.dhtmlx.com/d8li6kq2).

Wenn die **sort()**-Methode verwendet wird, fügt Gantt kein Sortier-Symbol hinzu (ein Pfeil, der die Sortierreihenfolge anzeigt). Falls Sie ein Sortier-Icon rendern müssen, können Sie es manuell hinzufügen. [Beispiel ansehen](https://snippet.dhtmlx.com/5bjavofk).

### Related API
- [sort](api/config/sort.md)
- [onAfterSort](api/event/onaftersort.md)

### Related Guides
- [Spalten sortieren](guides/sorting.md)