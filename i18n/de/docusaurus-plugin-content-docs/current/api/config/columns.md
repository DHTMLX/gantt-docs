---
sidebar_label: columns
title: columns config
description: "richtet die columns in der Tabelle ein"
---

# columns

### Description

@short: Richtet die columns in der Tabelle ein

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

Jedes Element im Array definiert eine column. Das Objekt kann folgende Eigenschaften enthalten:

- **align?** - (*string*) - steuert die horizontale Ausrichtung des column-Headers. Optionen sind *'left'*, *'center'* oder *'right'*;
- **hide?** - (*boolean*) - schaltet die Sichtbarkeit einer column um (PRO);
- **label?** - (*string | number | any*) - legt den Titel des column-Headers fest;
- **max_width?** - (*number*) - begrenzt die maximale Breite der column beim Größenändern;
- **min_width?** - (*number*) - setzt die minimale Breite der column beim Größenändern;
- **name?** - (*string | number*) - identifiziert die column. Die Verwendung von 'add' erzeugt eine column mit einem '+'-Button;
- **resize?** - (*boolean*) - erlaubt das Größenändern der column durch Ziehen der Grenze (PRO);
- **sort? (task1, task2): number** - (*boolean | string | Function*) - konfiguriert das Sortierverhalten beim Klicken auf den column-Header. Wird auf *false* gesetzt, wird das Sortieren deaktiviert. Es kann eine Task-Eigenschaft als String für die Sortierung angegeben werden oder eine eigene Sortierfunktion übergeben werden.
    - **_task1_** - (*Task*) - das erste Task-Objekt für die Sortierung.
    - **_task2_** - (*Task*) - das zweite Task-Objekt für die Sortierung.
- **template? (task): any** - definiert eine Vorlage für die Daten der column.
    - **_task_** - (*Task*) - das Task-Objekt.
- **tree?** - (*boolean*) - markiert die column zur Anzeige einer Baumstruktur;
- **width?** - (*number | string*) - legt die Breite der column fest;
- **onrender? (task, node): any** - optionaler Callback zur Anpassung des Zell-Renderings. Er erhält das Task-Objekt und das DOM-Element der Zelle und kann eine Framework-Komponente zurückgeben. Mehr Infos [hier](guides/specifying-columns.md#modifyingcellsafterrendering);
    - **_task_** - (*Task*) - das Task-Objekt.
    - **_node_** - (*HTMLElement*) - das HTML-Element der grid-Zelle.
- **editor?** - (*object*) - Inline-Editor-Konfiguration.
    - **_type_** - (*string*) - der Editor-Typ.
    - **_map_to_** - (*string*) - die Task-Eigenschaft, die der Editor aktualisiert.
    - **_min?_** - (*Date | number*) - Minimalwert für Datums- und Dauer-Editoren.
    - **_max?_** - (*Date | number*) - Maximalwert für Datums- und Dauer-Editoren.
    - **_options?_** - (*Array &lt;any&gt;*) - Options-Array für Select-Editoren.
    - **_formatter?_** - (*DurationFormatter | LinkFormatter*) - Formatter für Datums- und Vorgänger-Editoren.

<br>

Die Gesamtbreite der grid columns hängt sowohl von der **width**-Eigenschaft jeder column als auch von der [grid_width](api/config/grid_width.md) ab. Stimmen diese Breiten nicht überein, passt Gantt eine von beiden an.

- Beim Initialisieren des Gantt mit [gantt.init()](api/method/init.md) hat die column-**width** Vorrang. <br>
:::note
Sample: [Spaltenbreiten-Priorität über grid_width beim Initialisieren ](https://snippet.dhtmlx.com/itnvg6z9) 
:::
- Beim Rendern des Gantt mit [gantt.render()](api/method/render.md) hat die [grid_width](api/config/grid_width.md) Vorrang. <br>
:::note
Sample: [Grid_width-Priorität über Spaltenbreite beim Rendern ](https://snippet.dhtmlx.com/4nb67z61) 
:::
- Beim Initialisieren mit [gantt.init()](api/method/init.md) und wenn die Spaltenbreite fehlt oder auf **'*'** gesetzt ist, hat die [grid_width](api/config/grid_width.md) Vorrang. <br>
:::note
Sample: [Grid_width-Priorität, wenn Spaltenbreite undefiniert oder '*' beim Initialisieren ](https://snippet.dhtmlx.com/qej8w5ix) 
:::

<br>

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

