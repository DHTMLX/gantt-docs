--- 
title: "Erweiterung zur Tastaturnavigation" 
sidebar_label: "Erweiterung zur Tastaturnavigation" 
---

# Erweiterung zur Tastaturnavigation

Details zur Tastaturnavigations-Erweiterung finden Sie im Artikel [Tastaturnavigation](guides/keyboard-navigation.md).

Das *keyboardNavigation*-Objekt besitzt die folgende API:

## Methoden

- <span class="submethod">**focus (config): void**</span> - ermöglicht die Auswahl jeder Zelle im Raster. Funktioniert nur, wenn das Raster bereits den Fokus hat

    - **_config_** - (*object*) - das Konfigurationsobjekt
        - **_id_** - (*number | string*) - die ID einer bearbeiteten Aufgabe
        - **_column_** - (*string*) - der Spaltenname
        - **_type_** - (*string*) - Typ des Geltungsbereichs. Mögliche Werte: "gantt", "taskRow", "taskCell", "headerCell"


~~~js
gantt.ext.keyboardNavigation.focus({type:"taskCell",id:"taskId",column:"columnName"});
~~~

**Beispiel** [Auswahl einer Rasterzelle](https://snippet.dhtmlx.com/v5ffah8w)

- <span class="submethod">**getActiveNode (): boolean | void**</span> - ermöglicht das Abrufen von Informationen zur aktiven Zelle

~~~js
var active_node = gantt.ext.keyboardNavigation.getActiveNode();
// -> {type: "taskCell", id: "10", column: "text"}
~~~

**Beispiel** [Aktive Zelle abrufen](https://snippet.dhtmlx.com/dznf7xjw)