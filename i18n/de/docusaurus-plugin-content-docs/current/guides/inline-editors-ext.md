---
title: "Inline Editors Erweiterung"
sidebar_label: "Inline Editors Erweiterung"
---

# Inline Editors Erweiterung

Weitere Informationen zur Inline Editors Erweiterung finden Sie im Artikel [Inline Editing in Grid](guides/inline-editing.md). 

 Das *inlineEditors* Objekt bietet folgende API:

## Methoden

### Aktionen:

- <span class="submethod">**startEdit (taskId, columnName): void**</span> - Öffnet einen Editor für die angegebene Aufgabe und Zelle, befüllt ihn mit dem zugeordneten Wert und fokussiert den Editor
    - **_taskId_** - (*number | string*) - Die Aufgaben-ID
    - **_columnName_** - (*string*) - Der Spaltenname
- <span class="submethod">**show (taskId, columnName): void**</span> - Öffnet einen leeren Editor in der angegebenen Aufgabe und Zelle
    - **_taskId_** - (*number | string*) - Die Aufgaben-ID
    - **_columnName_** - (*string*) - Der Spaltenname
- <span class="submethod">**setValue (): void**</span> - Befüllt den geöffneten Editor mit Werten aus der Aufgabe
- <span class="submethod">**save (): void**</span> - Speichert die Änderungen und schließt den Editor
- <span class="submethod">**hide (): void**</span> - Schließt den Editor ohne Änderungen zu speichern
- <span class="submethod">**focus (): void**</span> - Setzt den Fokus auf den Editor
- <span class="submethod">**getState (): object**</span> - Gibt das Statusobjekt zurück (id: taskId, columnName: columnName, placeholder: HTMLElement)
- <span class="submethod">**getValue (): string**</span> - Gibt den aktuellen Wert des Editors zurück

### Status: 

- <span class="submethod">**isChanged (): boolean**</span> - Prüft, ob sich der aktuelle Wert des Editors vom ursprünglichen Wert unterscheidet
- <span class="submethod">**isVisible (): boolean**</span> - Prüft, ob der Editor aktuell geöffnet ist

### Ereignisse:

- <span class="submethod">**attachEvent (name, handler): string**</span> - Fügt dem inlineEditors Objekt einen Ereignis-Handler hinzu
    - **_name_** - (*string*) - Der Name des Ereignisses
    - **_handler_** - (*Function*) - Die Callback-Funktion, die beim Auslösen des Ereignisses ausgeführt wird
- <span class="submethod">**detachEvent (id): void**</span> - Entfernt einen zuvor hinzugefügten Ereignis-Handler
    - **_id_** - (*string*) - Die ID des Ereignis-Handlers

### Navigation:

- <span class="submethod">**editNextCell (canChangeRow): void**</span> - Speichert den aktuellen Editor und wechselt zur nächsten Zelle
    - **_canChangeRow?_** - (*boolean*) - Gibt an, ob der Editor nach der letzten Zelle der aktuellen Zeile zur ersten Zelle der nächsten Zeile wechseln kann
- <span class="submethod">**editNextRow (skipReadonly): void**</span> - Speichert den aktuellen Editor und öffnet einen Editor in der gleichen Zelle der darunterliegenden Aufgabe
    - **_skipReadonly?_** - (*boolean*) - Wenn true, werden schreibgeschützte Aufgaben übersprungen und der Editor wird in der ersten bearbeitbaren Aufgabe darunter geöffnet; wenn false (Standard), wird der Editor geschlossen, wenn die nächste Aufgabe schreibgeschützt ist
- <span class="submethod">**editPrevCell (canChangeRow): void**</span> - Speichert den aktuellen Editor und wechselt zur vorherigen Zelle
    - **_canChangeRow?_** - (*boolean*) - Gibt an, ob der Editor nach der ersten Zelle der aktuellen Zeile zur letzten Zelle der vorherigen Zeile wechseln kann
- <span class="submethod">**editPrevRow (skipReadonly): void**</span> - Speichert den aktuellen Editor und öffnet einen Editor in der gleichen Zelle der darüberliegenden Aufgabe
    - **_skipReadonly?_** - (*boolean*) - Wenn true, werden schreibgeschützte Aufgaben übersprungen und der Editor wird in der ersten bearbeitbaren Aufgabe darüber geöffnet; wenn false (Standard), wird der Editor geschlossen, wenn die vorherige Aufgabe schreibgeschützt ist
- <span class="submethod">**getFirstCell (): string**</span> - Gibt den Namen der ersten bearbeitbaren Spalte im Grid zurück
- <span class="submethod">**getLastCell (): string**</span> - Gibt den Namen der letzten bearbeitbaren Spalte im Grid zurück
- <span class="submethod">**getNextCell (direction): string | null**</span> - Gibt den Namen der nächsten bearbeitbaren Spalte zurück
    - **_direction_** - (*number*) - Die Richtung: `1` für rechts, `-1` für links

### Hilfsfunktionen:

- <span class="submethod">**locateCell (node): object | null**</span> - Prüft, ob ein angegebenes DOM-Element eine Aufgaben-Zelle ist, und gibt ggf. ein Editor-Statusobjekt zurück: (id: taskId, columnName: columnName)
    - **_node_** - (*HTMLElement*) - Das HTML-Element

### Maus-/Tastatur-Mapping:

- <span class="submethod">**setMapping (mapping): void**</span> - Setzt ein Mapping-Konfigurationsobjekt
    - **_mapping_** - (*object*) - Ein Objekt, das das Mapping definiert:
        - **_init_** - (*Function*): void - Initialisiert das Mapping
            - **_inlineEditors_** - (*InlineEditorMethods*) - Das inlineEditors Objekt
            - **_grid_** - (*any*) - Die Grid-Layout-Ansicht
        - **_onShow_** - (*Function*): void - Wird aufgerufen, wenn der Inline-Editor geöffnet wird
            - **_inlineEditors_** - (*InlineEditorMethods*) - Das inlineEditors Objekt
            - **_node_** - (*HTMLElement*) - Das HTML-Element
            - **_grid_** - (*any*) - Die Grid-Layout-Ansicht
        - **_onHide_** - (*Function*): void - Wird aufgerufen, wenn der Inline-Editor geschlossen wird
            - **_inlineEditors_** - (*InlineEditorMethods*) - Das inlineEditors Objekt
            - **_node_** - (*HTMLElement*) - Das HTML-Element
            - **_grid_** - (*any*) - Die Grid-Layout-Ansicht
        - **_destroy_** - (*Function*): void - Bereinigt das Mapping
- <span class="submethod">**getMapping (): object**</span> - Gibt das aktuell angewendete Mapping-Objekt zurück

## Ereignisse

### <span class="eventname">onBeforeEditStart</span>

Argumente:
<span class="eventarguments">

- **_state_** - (*object*) - Das Editor-Statusobjekt
    - **_id_** - (*number | string*) - Die ID der bearbeiteten Aufgabe
    - **_columnName_** - (*string*) - Der Spaltenname
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onBeforeEditStart", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
   return true;
});
~~~

### <span class="eventname">onEditStart</span>

Argumente:
<span class="eventarguments">

- **_state_** - (*object*) - Das Editor-Statusobjekt
    - **_id_** - (*number | string*) - Die ID der bearbeiteten Aufgabe
    - **_columnName_** - (*string*) - Der Spaltenname
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditStart", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~

### <span class="eventname">onBeforeSave</span>

Wird ausgelöst, wenn der Editor kurz vor dem Schließen und Speichern der Änderungen steht

Argumente:
<span class="eventarguments">

- **_state_** - (*object*) - Das Editor-Statusobjekt
    - **_id_** - (*number | string*) - Die ID der bearbeiteten Aufgabe
    - **_columnName_** - (*string*) - Der Spaltenname
    - **_oldValue_** - (*any*) - Der ursprüngliche Wert im Editor
    - **_newValue_** - (*any*) - Der aktuelle Wert im Editor, kann verändert werden
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onBeforeSave", function(state){
   console.log(state);
   // -> { id: itemId, 
   //      columnName: columnName, 
   //      oldValue: value, 
   //      newValue: value
   //    };
   return true;
});
~~~

### <span class="eventname">onSave</span>

Wird ausgelöst, nachdem eine Aufgabe über den Editor aktualisiert wurde

Argumente:
<span class="eventarguments">

- **_state_** - (*object*) - Das Editor-Statusobjekt
    - **_id_** - (*number | string*) - Die ID der bearbeiteten Aufgabe
    - **_columnName_** - (*string*) - Der Spaltenname
    - **_oldValue_** - (*any*) - Der ursprüngliche Wert im Editor
    - **_newValue_** - (*any*) - Der aktuelle Wert im Editor
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onSave", function(state){
   console.log(state);
   // -> { id: itemId, 
   //      columnName: columnName, 
   //      oldValue: value, 
   //      newValue: value
   //    };
});
~~~

### <span class="eventname">onEditEnd</span>

Wird ausgelöst, nachdem der Inline-Editor geschlossen wurde

Argumente:
<span class="eventarguments">

- **_state_** - (*object*) - Das Editor-Statusobjekt
    - **_id_** - (*number | string*) - Die ID der bearbeiteten Aufgabe
    - **_columnName_** - (*string*) - Der Spaltenname
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditEnd", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~
