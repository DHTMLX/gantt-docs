---
title: "Sortieren von Spalten"
sidebar_label: "Sortieren von Spalten"
---

# Sortieren von Spalten


dhtmlxGantt bietet die Möglichkeit, Daten innerhalb der Gitterspalten direkt auf der Client-Seite zu sortieren.


Es gibt zwei Möglichkeiten, das Sortieren im Gitter zu aktivieren:

1. Einmaliges Klicken auf den Spaltenkopf, der das Attribut [sort](api/config/sort.md) aktiviert hat;
2. Verwendung des API-Aufrufs der Methode [sort](api/method/sort.md), der durch ein Ereignis oder eine Aktion ausgelöst werden kann, wie z.B. das Drücken eines Buttons oder beim Laden der Seite.

:::note
Beachten Sie, dass Gantt Aufgaben nur auf Basis der tatsächlichen Datenwerte sortiert und keine Werte sortiert, die durch das template-Attribut einer Spalte erzeugt werden.
:::

## Sortieren durch Klicken auf den Spaltenkopf


Wenn ein Spaltenkopf angeklickt wird, zeigt das Gantt-Diagramm einen visuellen Indikator an, der hervorhebt, welche Spalte aktuell sortiert ist und in welcher Sortierreihenfolge (aufsteigend oder absteigend). Jeder weitere Klick auf denselben Spaltenkopf wechselt die Sortierrichtung.

![gantt_sorting](/img/gantt_sorting.png)

Um das Sortieren im Gantt-Diagramm zu aktivieren, setzen Sie die Eigenschaft [sort](api/config/sort.md) auf *true*:

~~~js
gantt.config.sort = true; 
gantt.init("gantt_here");
~~~


[Built-in sorting](https://docs.dhtmlx.com/gantt/samples/07_grid/01_builtin_sorting.html)


## Sortieren per Programmierung


Um das Gitter basierend auf einem bestimmten Ereignis oder einer Aktion zu sortieren (z.B. beim Klicken eines Buttons oder beim Laden der Seite), verwenden Sie die Methode [sort](api/method/sort.md).

**Sortieren per Button-Klick**
~~~html
<input type='button' value='Nach Aufgabenname sortieren' onclick='gantt.sort("text", true);'>

<script type="text/javascript" charset="utf-8">
    gantt.init("gantt_here"); 
    gantt.parse(tasks);
</script>
~~~


[Using sorting methods](https://docs.dhtmlx.com/gantt/samples/07_grid/05_sort_api.html)


## Eigene Sortierfunktionen


Eigene Sortierfunktionen können angewendet werden, indem Sie den Namen Ihrer Funktion als ersten (und einzigen) Parameter an die Methode [sort](api/method/sort.md) übergeben.

Diese Funktion wird für jedes Paar benachbarter Werte aufgerufen und sollte 1, -1 oder 0 zurückgeben:

- **1** - Das erste Objekt im Paar soll vor dem zweiten erscheinen;
- **-1** - Das zweite Objekt soll vor dem ersten erscheinen;
- **0** - Die Reihenfolge dieser Objekte bleibt gleich.

**Verwendung einer eigenen Funktion zum Sortieren eines Gantt-Diagramms**
~~~html
<input type='button' value='Nach Anzahl der Inhaber sortieren' 
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


[Custom sorting function](https://docs.dhtmlx.com/gantt/samples/07_grid/04_custom_sorting.html)


## Sortieren pro Spalte im Gitter


Es ist möglich, für jede Spalte individuelle Sortierregeln festzulegen. Hier sind drei gängige Methoden, das Sortieren pro Spalte zu steuern:

1) Sortieren für eine Spalte deaktivieren, indem *sort* auf false gesetzt wird

~~~js
gantt.config.columns[1].sort = false;
~~~

2) Eine Spalte mit einer eigenen Funktion sortieren, indem *sort* auf diese Funktion gesetzt wird

~~~js
gantt.config.columns[1].sort = function(a,b){
    return custom_function(a,b);
};
~~~

Diese eigene Funktion erhält zwei Aufgabenobjekte (a und b) und gibt 1, -1 oder 0 zurück:


- **1** - Das erste Objekt soll vor dem zweiten erscheinen;
- **-1** - Das zweite Objekt soll vor dem ersten erscheinen;
- **0** - Die Reihenfolge bleibt unverändert.


3) Eine Spalte basierend auf den Werten eines anderen Aufgabenfeldes sortieren, indem *sort* auf den Namen dieses Feldes gesetzt wird

~~~js
gantt.config.columns[1].sort = 'other_field';
~~~

