---
title: "Tastaturnavigations-Erweiterung"
sidebar_label: "Tastaturnavigations-Erweiterung"
---

Tastaturnavigations-Erweiterung
==========================

Weitere Informationen zur Tastaturnavigations-Erweiterung finden Sie im Artikel [Keyboard Navigation](guides/keyboard-navigation.md). 


Das *keyboardNavigation*-Objekt stellt folgende API zur Verfügung:

Methoden
----------

- <span class="submethod">**focus (config): void**</span> - ermöglicht das Auswählen einer beliebigen Zelle innerhalb des Grids. Dies funktioniert nur, wenn das Grid bereits den Fokus hat.

    - **_config_** - (*object*) - Konfigurationsobjekt
        - **_id_** - (*number | string*) - die ID der zu bearbeitenden Aufgabe
        - **_column_** - (*string*) - der Name der Spalte
        - **_type_** - (*string*) - definiert den Bereichstyp. Mögliche Werte sind: "gantt", "taskRow", "taskCell", "headerCell"


~~~js
gantt.ext.keyboardNavigation.focus({type:"taskCell",id:"taskId",column:"columnName"});
~~~

**Related example:** [Auswählen einer Grid-Zelle](https://snippet.dhtmlx.com/v5ffah8w)

- <span class="submethod">**getActiveNode (): boolean | void**</span> - ruft Informationen über die aktuell aktive Zelle ab

~~~js
var active_node = gantt.ext.keyboardNavigation.getActiveNode();
// -> {type: "taskCell", id: "10", column: "text"}
~~~

**Related example:** [Aktive Zelle abrufen](https://snippet.dhtmlx.com/dznf7xjw)
