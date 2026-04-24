---
sidebar_label: columns
title: columns config
description: "richtet die columns in der Tabelle ein"
---

# columns

### Description

@short: Konfiguriert die Spalten der Tabelle

@signature: columns: GridColumn[]

### Example

~~~jsx
// Standard-Columns Definition
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" },
    { name: "add",        label: "",           width: 44 }
];

gantt.init("gantt_here");
~~~

### Related samples
- [Progress lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_progress_lightbox.html)

### Details

Jedes Objekt im Array spezifiziert eine einzelne Spalte. Ein Objekt kann die folgenden Attribute annehmen:

- **align?** - (*string*) - legt die horizontale Titel-Ausrichtung fest. Mögliche Werte: *'left'*, *'center'*, oder *'right'*;
- **hide?** - (*boolean*) - versteckt/zeigt eine Spalte (PRO);
- **label?** - (*string | number | any*) - gibt den Titel der Spalte an;
- **max_width?** - (*number*) - setzt die maximale Spaltenbreite im Falle von Resize-Operationen;
- **min_width?** - (*number*) - setzt die minimale Spaltenbreite im Falle von Resize-Operationen;
- **name?** - (*string | number*) - definiert die Spalten-ID. Der Name 'add' ermöglicht es, eine Spalte mit dem '+' Zeichen hinzuzufügen;
- **resize?** - (*boolean*) - ermöglicht es, eine Spalte durch Ziehen der Begrenzung der Spalte zu skalieren (PRO);
- **sort? (task1, task2): number** - (*boolean | string | Function*) - die Konfiguration der Sortierung nach dem Klicken auf die Spaltenüberschrift. Wenn die Eigenschaft auf *false* gesetzt ist, ist das Sortieren deaktiviert. Man kann auch eine andere Task-Eigenschaft im *string* verwenden, um die Spalte zu sortieren, oder eine benutzerdefinierte Sortierfunktion verwenden.
    - **_task1_** - (*Task*) - ein Objekt der ersten Aufgabe, die sortiert wird.
    - **_task2_** - (*Task*) - ein Objekt der zweiten Aufgabe, die sortiert wird.
- **template? (task): any** - setzt eine Datenvorlage.
    - **_task_** - (*Task*) - das Task-Objekt.
- **tree?** - (*boolean*) - zeigt an, dass die zugehörige Spalte einen Baum anzeigen soll;
- **width?** - (*number | string*) - definiert die Breite der Spalte;
- **onrender? (task, node): any** - optional, eine Callback-Funktion zur Renderung einer Zelle in das DOM. Die Funktion nimmt ein Task-Objekt und das DOM-Element der Grid-Zelle als Parameter und kann eine Komponente des Frameworks zurückgeben. Siehe Details hier;
    - **_task_** - (*Task*) - das Task-Objekt.
    - **_node_** - (*HTMLElement*) - das HTML-Element der Grid-Zelle.
- **editor?** - (*object*) - Inline-Editor angehängt.
    - **_type_** - (*string*) - der Typ des Inline-Editors.
    - **_map_to_** - (*string*) - gibt an, welche Eigenschaft des Tasks durch den Inline-Editor aktualisiert werden soll.
    - **_min?_** - (*Date | number*) - minimaler Wert für Datums- und Dauer-Typen.
    - **_max?_** - (*Date | number*) - maximaler Wert für Datums- und Dauer-Typen.
    - **_options?_** - (*Array &lt;any&gt;*) - ein Array mit Optionen für die Select-Typen.
    - **_formatter?_** - (*DurationFormatter | LinkFormatter*) - Formatter für Datum- und Vorgänger-Typen.



Die Gesamtbreite der grid columns hängt sowohl von der **width**-Eigenschaft jeder column als auch von der [grid_width](api/config/grid_width.md) ab. Stimmen diese Breiten nicht überein, passt Gantt eine von beiden an.

- Beim Initialisieren des Gantt mit [gantt.init()](api/method/init.md) hat die column-**width** Vorrang.
:::note
 [Column width priority over grid width at initialization](https://snippet.dhtmlx.com/itnvg6z9)
:::
- Beim Rendern des Gantt mit [gantt.render()](api/method/render.md) hat die [grid_width](api/config/grid_width.md) Vorrang.
:::note
sample: [Grid width priority over column width during rendering ](https://snippet.dhtmlx.com/4nb67z61)
:::
- Beim Initialisieren mit [gantt.init()](api/method/init.md) und wenn die Spaltenbreite fehlt oder auf **'*'** gesetzt ist, hat die [grid_width](api/config/grid_width.md) Vorrang.

:::note
sample: [Grid width priority when column width is undefined or set to '*' at initialization](https://snippet.dhtmlx.com/qej8w5ix)
:::

Die **template**-Eigenschaft ist eine Funktion, die ein Datenobjekt erhält und den anzuzeigenden Inhalt zurückgibt. Dies ermöglicht eine flexible Anpassung des column-Inhalts.

~~~js
gantt.config.columns = [
    { name: "text",        label: "Task name",  tree: true, width: "*" },
    { name: "start_date",  label: "Start time", align: "center" },
    { name: "staff",       label: "Holder(s)", template: (obj) => {
        return `${obj.holder} (${obj.progress})`;
    } }
];

gantt.init("gantt_here");
~~~

### Related Guides
- ["Spalten festlegen"](guides/specifying-columns.md)
- ["How-tos"](guides/how-to.md#howtoaddacustomcolumninthegrid) (Details zum Hinzufügen einer benutzerdefinierten column im grid)
- ["How-tos"](guides/how-to.md#howtoaddacustomaddbutton) (Anleitung zum Hinzufügen eines benutzerdefinierten add(+)-Buttons)

### Change log
- Die **onrender**-Eigenschaft wurde in v7.1 eingeführt

