---
sidebar_label: getLightboxSection
title: getLightboxSection method
description: "gibt das Objekt der Lightbox-Sektion zurück"
---

# getLightboxSection

### Description

@short: Gibt das Objekt der Lightbox-Sektion zurück

@signature: getLightboxSection: (name: string | number) =\> LightboxSectionState

### Parameters
- `name` - (required) *string | number* -    der Name der Sektion

### Returns
- ` obj` - (LightboxSectionState) - das Sektion-Objekt

### Example

~~~jsx
const time = gantt.getLightboxSection('time');
const descr = gantt.getLightboxSection('description');
 
//liest den Wert aus
const value = time.getValue();
const value1 = descr.getValue();
 
//aktualisiert den Wert
descr.setValue('New Task'); //für Sektionen mit einem einzelnen Control
time.setValue(null,{
    start_date:new Date(2020,03,10), 
    end_date:new Date(2022,03,10), 
    duration:5
}); //für Sektionen mit mehreren Controls: das erste Argument ist 'null', das zweite ein Datenobjekt
~~~

### Details

Dieses Sektion-Objekt beinhaltet die folgenden Mitglieder:

## Eigenschaften

- **section** - (*object*) - das Konfigurationsobjekt der Sektion
    - **_id_** - (*string*) - die ID der Sektion
    - **_name_** - (*string*) - der Name der Sektion. Basierend auf diesem Namen holt gantt das Label der Sektion aus der **locale.labels** Sammlung. Zum Beispiel wird für die 'description' Sektion das Label als **gantt.locale.labels.section_description** verwendet
    - **_height_** - (*number*) - die Höhe der Sektion
    - **_map_to_** - (*string*) - der Name der Eigenschaft, die mit dem Editor verknüpft ist
    - **_type_** - (*string*) - der Typ des Editors
    - **_focus_** - (*boolean*) - wenn true, wird das entsprechende Feld fokussiert, wenn die Lightbox geöffnet wird
- **node** - (*HTMLElement*) - ein div-Element, das den Inhalt (Body) der Sektion enthält
- **header** - (*HTMLElement*) - ein div-Element, das den Header der Sektion enthält
- **control** - (*HTMLCollection*) - eine Sammlung von Controls, die in der Sektion verwendet werden

## Methoden

- **getValue (): any** - gibt das Datenobjekt der Sektion zurück
- **setValue (value, valueObject): any** - weist der Sektion Werte zu. Akzeptiert einen Wert (oder ein Objekt mit mehreren Werten, falls die Sektion mehrere Controls enthält)
    - **_value_** - (*any*) - der Wert, der für die Sektion gesetzt werden soll
    - **_valueObject?_** - (*CustomObject*) - optional, ein Objekt mit zusätzlichen Eigenschaften
