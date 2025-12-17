---
sidebar_label: sort
title: sort method
description: "sortiert Aufgaben im Grid"
---

# sort

### Description

@short: Sortiert Aufgaben im Grid

@signature: sort: (field: string | Function, desc?: boolean, parent?: string | number, silent?: boolean) =\> void

### Parameters

- `field` - (required) *string | SortTasks* - der Spaltenname, nach dem das Grid sortiert werden soll, oder eine benutzerdefinierte Sortierfunktion
- `desc` - (required) *boolean* - 	legt die Sortierreihenfolge fest: true für absteigend, false für aufsteigend
Reihenfolge. Standard ist false
- `parent` - (required) *string | number* - die ID der übergeordneten Aufgabe. Verwenden Sie dies, wenn Sie nur Aufgaben innerhalb des angegebenen Elternzweigs sortieren möchten.
- `silent` - (required) *boolean* - 	bestimmt, ob nach dem Umordnen der Elemente ein Rendering ausgelöst wird
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
- [Using sorting methods](https://docs.dhtmlx.com/gantt/samples/07_grid/05_sort_api.html)

### Details

Die benutzerdefinierte Sortierfunktion erhält **Task**-Objekte als Argumente und sollte eine Zahl (1, 0 oder -1) zurückgeben.

Beim Verwenden einer benutzerdefinierten Sortierfunktion wird der **parent**-Parameter ignoriert. [Siehe das Beispiel](https://snippet.dhtmlx.com/d8li6kq2).

Beim Aufruf der **sort()**-Methode fügt Gantt kein Sortiersymbol (wie einen Pfeil zur Anzeige der Sortierrichtung) hinzu. Wenn Sie ein Sortiersymbol anzeigen möchten, können Sie es manuell hinzufügen. [Siehe das Beispiel](https://snippet.dhtmlx.com/5bjavofk).

### Related API
- [sort](api/config/sort.md)
- [onAfterSort](api/event/onaftersort.md)

### Related Guides
- ["Sortieren von Spalten"](guides/sorting.md)

