---
title: "Inline-Editor-Erweiterung"
sidebar_label: "Inline-Editor-Erweiterung"
---

# Inline-Editor-Erweiterung

Lesen Sie Details zur Inline-Editor-Erweiterung im Artikel [Inline Editing in Grid](guides/inline-editing.md).

Das *inlineEditors*-Objekt verfügt über die folgende API:

## Methoden

### Aktionen:

- <span class="submethod">**startEdit (taskId, columnName): void**</span> - öffnet einen Editor in der angegebenen Aufgabe/Zelle, setzt den zugeordneten Wert und setzt den Browser-Fokus auf den Editor
    - **_taskId_** - (*number | string*) - die Aufgaben-ID
    - **_columnName_** - (*string*) - der Spaltenname
- <span class="submethod">**show (taskId, columnName): void**</span> - öffnet einen leeren Editor in der angegebenen Aufgabe/Zelle
    - **_taskId_** - (*number | string*) - die Aufgaben-ID
    - **_columnName_** - (*string*) - der Spaltenname
- <span class="submethod">**setValue (): void**</span> - füllt einen geöffneten Editor mit Werten aus der Aufgabe
- <span class="submethod">**save (): void**</span> - speichert Änderungen und versteckt den Editor
- <span class="submethod">**hide (): void**</span> - versteckt einen Editor, ohne Änderungen zu speichern
- <span class="submethod">**focus (): void**</span> - setzt den Browser-Fokus auf den Editor
- <span class="submethod">**getState (): object**</span> - holt das Statusobjekt (id: taskId, columnName: columnName, placeholder: HTMLElement)
- <span class="submethod">**getValue (): string**</span> - holt den aktuellen Wert des Editors

### Zustand:

- <span class="submethod">**isChanged (): boolean**</span> - prüft, ob der aktuelle Editorwert vom ursprünglichen Wert abweicht
- <span class="submethod">**isVisible (): boolean**</span> - prüft, ob der Editor geöffnet ist

### Ereignisse:

- <span class="submethod">**attachEvent (name, handler): string**</span> - hängt einen Ereignishandler an das inlineEditors-Objekt an
    - **_name_** - (*string*) - der Name des Ereignishandlers
    - **_handler_** - (*Function*) - die Funktion, die aufgerufen wird, wenn das Ereignis ausgelöst wird
- <span class="submethod">**detachEvent (id): void**</span> - trennt einen an ein Ereignis gehängten Handler (der zuvor durch attachEvent() angehängt wurde) 
    - **_id_** - (*string*) - die ID des angehängten Ereignishandlers


### Navigation:

- <span class="submethod">**editNextCell (canChangeRow): void**</span> - speichert den aktuellen Editor und verschiebt den Editor zur nächsten Zelle
    - **_canChangeRow?_**  - (*boolean*) - der Parameter gibt an, ob der Editor nach der letzten Zelle der aktuellen Zeile in die erste Zelle der nächsten Zeile verschoben werden kann
- <span class="submethod">**editNextRow (skipReadonly): void**</span> - speichert den aktuellen Editor und öffnet einen Editor in derselben Zelle der Aufgabe darunter
    - **_skipReadonly?_**  - (*boolean*) - der Parameter gibt an, ob die schreibgeschützte Aufgabe übersprungen werden soll und der Editor in die Zelle der ersten editierbaren Aufgabe geöffnet wird. Der Standardwert false führt dazu, dass der Editor geschlossen wird, wenn die nächste Aufgabe schreibgeschützt ist.
- <span class="submethod">**editPrevCell (canChangeRow): void**</span> - speichert den aktuellen Editor und verschiebt den Editor zur vorherigen Zelle
    - **_canChangeRow?_**  - (*boolean*) - der Parameter gibt an, ob der Editor nach der ersten Zelle der aktuellen Zeile in die letzte Zelle der vorherigen Zeile verschoben werden kann
- <span class="submethod">**editPrevRow (skipReadonly): void**</span> - speichert den aktuellen Editor und öffnet einen Editor in derselben Zelle der Aufgabe darüber
    - **_skipReadonly?_**  - (*boolean*) - der Parameter gibt an, ob die schreibgeschützte Aufgabe übersprungen werden soll und der Editor in die Zelle der ersten editierbaren Aufgabe geöffnet wird. Der Standardwert false beendet den Editor, wenn die vorherige Aufgabe schreibgeschützt ist.
- <span class="submethod">**getFirstCell (): string**</span> - gibt den Namen der ersten bearbeitbaren Spalte im Grid zurück
- <span class="submethod">**getLastCell (): string**</span> - gibt den Namen der letzten bearbeitbaren Spalte im Grid zurück
- <span class="submethod">**getNextCell (direction): string | null**</span> - gibt den Namen der nächsten bearbeitbaren Spalte zurück
    - **_direction_**  - (*number*) - der Parameter gibt an, in welche Richtung die folgende Zelle iteriert werden soll. `1` - rechts, `-1` - links.


### Hilfsfunktionen:

- <span class="submethod">**locateCell (node): object | null**</span> - prüft, ob ein übergebenes DOM-Element ein Task-Zellen-Objekt ist und gibt, falls ja, den Editor-Zustand zurück: (id: taskId, columnName: columnName)
    - **_node_** - (*HTMLElement*) - das HTML-Element


### Maus-/Tastatur-Zuordnung:

- <span class="submethod">**setMapping (mapping): void**</span> - setzt ein Mapping-Objekt
    - **_mapping_** - (*object*) - ein Objekt mit der Mapping-Konfiguration:
        - **_init_** - (*Function*): void - die Methode zur Initialisierung der Zuordnung
            - **_inlineEditors_** - (*InlineEditorMethods*) - das inlineEditors-Objekt
            - **_grid_** - (*any*) - die Grid-Layout-Ansicht
        - **_onShow_** - (*Function*): void - die Methode, die aufgerufen wird, wenn der Inline-Editor geöffnet wird
            - **_inlineEditors_** - (*InlineEditorMethods*) - das inlineEditors-Objekt
            - **_node_** - (*HTMLElement*) - das HTML-Element
            - **_grid_** - (*any*) - die Grid-Layout-Ansicht
        - **_onHide_** - (*Function*): void - die Methode, die aufgerufen wird, wenn der Inline-Editor geschlossen wird
            - **_inlineEditors_** - (*InlineEditorMethods*) - das inlineEditors-Objekt
            - **_node_** - (*HTMLElement*) - das HTML-Element
            - **_grid_** - (*any*) - die Grid-Layout-Ansicht
        - **_destroy_** - (*Function*): void - die Methode zum Zerstören der Zuordnung
- <span class="submethod">**getMapping (): object**</span> - gibt ein aktuell angewendetes Mapping-Objekt zurück


## Ereignisse

### <span class="eventname">onBeforeEditStart</span>

Argumente:
<span class="eventarguments">

- **_state_** - (*object*) - das Editor-Zustandsobjekt
    - **_id_** - (*number | string*) - die ID der bearbeiteten Aufgabe
    - **_columnName_** - (*string*) - der Spaltenname
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

- **_state_** - (*object*) - das Editor-Zustandsobjekt
    - **_id_** - (*number | string*) - die ID der bearbeiteten Aufgabe
    - **_columnName_** - (*string*) - der Spaltenname
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditStart", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~

### <span class="eventname">onBeforeSave</span>

Wird ausgelöst, bevor ein Editor geschlossen wird und Änderungen gespeichert werden

Argumente:
<span class="eventarguments">

- **_state_** - (*object*) - das Editor-Zustandsobjekt
    - **_id_** - (*number | string*) - die ID der bearbeiteten Aufgabe
    - **_columnName_** - (*string*) - der Spaltenname
    - **_oldValue_** - (*any*) - der ursprüngliche Wert des Editors
    - **_newValue_** - (*any*) - der aktuelle Wert des Editors, kann geändert werden
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

Wird ausgelöst, nachdem ein Task aus dem Editor aktualisiert wurde

Argumente:
<span class="eventarguments">

- **_state_** - (*object*) - das Editor-Zustandsobjekt
    - **_id_** - (*number | string*) - die ID der bearbeiteten Aufgabe
    - **_columnName_** - (*string*) - der Spaltenname
    - **_oldValue_** - (*any*) - der ursprüngliche Wert des Editors
    - **_newValue_** - (*any*) - der aktuelle Wert des Editors
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

Wird ausgelöst, nachdem ein Inline-Editor ausgeblendet wurde

Argumente:
<span class="eventarguments">

- **_state_** - (*object*) - das Editor-Zustandsobjekt
    - **_id_** - (*number | string*) - die ID der bearbeiteten Aufgabe
    - **_columnName_** - (*string*) - der Spaltenname
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditEnd", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~