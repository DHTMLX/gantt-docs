---
title: "Spalten sortieren"
sidebar_label: "Spalten sortieren"
---

# Spalten sortieren

dhtmlxGantt ermöglicht es Ihnen, Daten in den Spalten des Grids (auf der Client-Seite) zu sortieren. 


Es gibt zwei Möglichkeiten, wie Sie im Grid eine Sortierung bereitstellen können:

1. Durch einen einzelnen Klick auf den Header einer Spalte mit dem aktivierten [sort](api/config/sort.md)-Attribut;
2. Durch den API-Aufruf der [sort](api/method/sort.md)-Methode (kann von einem Ereignis oder einer Aktion aus erfolgen, z. B. einem Button-Klick oder beim Seitenladen).

:::note
Bitte beachten Sie, dass Gantt Aufgaben nur nach Werten aus den Daten sortieren kann und nicht Werte sortiert, die durch das Template-Attribut einer Spalte festgelegt sind.
:::

## Sortieren durch einen Klick auf den Header

Sobald der Benutzer auf den Header klickt, beginnt das Gantt-Diagramm, eine spezielle Steuerung anzuzeigen, die anzeigt, nach welcher Spalte die Tabelle derzeit sortiert ist und in welcher Richtung diese Sortierung erfolgt (aufsteigend oder absteigend). 
Bei jedem weiteren Klick auf denselben Header wird die Sortierungsrichtung umgekehrt.

![gantt_sorting](/img/gantt_sorting.png)

Um das Sortieren im Gantt-Diagramm zu aktivieren, setzen Sie die [sort](api/config/sort.md)-Eigenschaft auf *true*:

~~~js
gantt.config.sort = true; 
gantt.init("gantt_here");
~~~


[Integrierte Sortierung](https://docs.dhtmlx.com/gantt/samples/07_grid/01_builtin_sorting.html)


## Programmatische Sortierung

Um das Grid bei einer bestimmten Aktion oder einem Ereignis (z. B. Button-Klick oder Seitenlade) zu sortieren, rufen Sie die [sort](api/method/sort.md)-Methode auf.

**Sortierung beim Button-Klick**
~~~html
<input type='button' value='Sort by task name' onclick='gantt.sort("text", true);'>

<script type="text/javascript" charset="utf-8">
    gantt.init("gantt_here"); 
    gantt.parse(tasks);
</script>
~~~


[Verwendung von Sortiermethoden](https://docs.dhtmlx.com/gantt/samples/07_grid/05_sort_api.html)


## Benutzerdefinierte Sortierfunktionen

Um eine benutzerdefinierte Sortierfunktion auf das Grid anzuwenden, rufen Sie die [sort](api/method/sort.md)-Methode mit dem Namen Ihrer benutzerdefinierten Funktion als erstem (und einzigem) Parameter auf.

Eine benutzerdefinierte Sortierfunktion wird für jedes Paar benachbarter Werte aufgerufen und gibt 1,-1 oder 0 zurück:

- **1** - das Objekt mit dem ersten Wert im Paar muss vor dem zweiten stehen;
- **-1** - das zweite Objekt geht vor dem ersten;
- **0** - die Reihenfolge beider Objekte ändert sich nicht.

**Verwendung einer benutzerdefinierten Funktion zum Sortieren eines Gantt-Diagramms**
~~~html
<input type='button' value='Sort by the number of holders' 
       onclick='sortByHolders(direction)'>

<script type="text/javascript" charset="utf-8">
    var direction = false;

    function sortByHolders(direction1){
        direction = !direction;
        gantt.sort(sortHolders);
    };
    function sortHolders(a,b){
         a = a.users.length;
         b = b.users.length;

         if (direction){
            return a>b?1:(a<b?-1:0);
         } else {
            return a>b?-1:(a<b?1:0);
         }
    };
</script>
~~~


[Benutzerdefinierte Sortierfunktion](https://docs.dhtmlx.com/gantt/samples/07_grid/04_custom_sorting.html)


## Sortierung pro Spalte im Grid {#percolumngridsorting}

Es ist möglich, pro Spalte eine benutzerdefinierte Sortierregel festzulegen. Drei der häufigsten Sortierszenarien pro Spalte:

1) Deaktivieren der Sortierung für eine Spalte, indem *sort* auf false gesetzt wird

~~~js
gantt.config.columns[1].sort = false;
~~~

2) Sortieren einer Spalte gemäß den bereitgestellten Sortierfunktionen, indem *sort* auf eine Funktion gesetzt wird

~~~js
gantt.config.columns[1].sort = function(a,b){
    return custom_function(a,b);
};
~~~

Eine benutzerdefinierte Sortierfunktion wird für ein Paar von Aufgabenobjekten (a und b) aufgerufen und gibt 1,-1 oder 0 zurück:


- **1** - ein Objekt mit dem ersten Wert im Paar muss vor dem zweiten stehen;
- **-1** - das zweite Objekt geht vor dem ersten;
- **0** - die Reihenfolge beider Objekte ändert sich nicht.


3) Sortieren einer Spalte gemäß den Werten eines anderen Feldes der Aufgabe, indem *sort* auf dieses Feld gesetzt wird 

~~~js
gantt.config.columns[1].sort = 'other_field';
~~~


## Sortierung nach mehreren Feldern

Sie können das Grid des Gantt-Diagramms nach mehreren Eigenschaften (Feldern) sortieren, indem Sie eine benutzerdefinierte Sortierfunktion verwenden. 
Im folgenden Beispiel werden die Daten nach den Feldern *duration* und *priority* sortiert:

~~~js
let sortDirection = -1
function customSort() {
    sortDirection *= -1;
    gantt.sort(function (task1, task2) {
        // sort by priority
        if (task1.duration == task2.duration) {
            return (task1.priority - task2.priority) * sortDirection
        }
        // sort by duration
        return (task1.duration - task2.duration) * sortDirection
    });
}
~~~

[Sortierung nach mehreren Eigenschaften (Feldern) mit einer benutzerdefinierten Sortierfunktion](https://snippet.dhtmlx.com/upu86azw)

- Falls die Dauer der Aufgaben gleich ist, wird nach diesem Feld keine Sortierung angewendet, und die Aufgaben werden nach dem Feld *priority* sortiert. 
- Ist die Dauer der Aufgaben unterschiedlich, wird das Grid nach der Eigenschaft *duration* sortiert.