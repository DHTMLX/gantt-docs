---
sidebar_label: getLightboxSection
title: getLightboxSection Methode
description: "gibt das Objekt des Lightbox-Abschnitts zurück"
---

# getLightboxSection

### Description

@short: Gibt das Objekt des Lightbox-Abschnitts zurück

@signature: getLightboxSection: (name: string | number) =\> LightboxSectionState

### Parameters

- `name` - (erforderlich) *string | number* - der Name des Abschnitts

### Returns
- ` obj` - (LightboxSectionState) - das Abschnittsobjekt

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

Das Abschnittsobjekt enthält die folgenden Mitglieder:

## Eigenschaften

- **section** - (*object*) - das Konfigurationsobjekt des Abschnitts
    - **_id_** - (*string*) - die Abschnitts-ID
    - **_name_** - (*string*) - der Abschnittsname. Laut dem Namen nimmt gantt das Label für den Abschnitt aus der **locale.labels**-Sammlung. Beispielsweise wird für den Abschnitt 'description' das Label als **gantt.locale.labels.section_description** verwendet
    - **_height_** - (*number*) - die Abschnittshöhe
    - **_map_to_** - (*string*) - der Name einer Eigenschaft, die dem Editor zugeordnet ist
    - **_type_** - (*string*) - der Editor-Typ
    - **_focus_** - (*boolean*) - wird auf *true* gesetzt, erhält das zugehörige Feld beim Öffnen des Lightbox den Fokus
- **node** - (*HTMLElement*) - ein Div-Element mit dem Abschnittskörper
- **header** - (*HTMLElement*) - ein Div-Element mit dem Abschnittskopf
- **control** - (*HTMLCollection*) - eine Sammlung von Controls, die im Abschnitt verwendet werden

  
## Methoden

- **getValue (): any** - gibt ein Objekt mit den Daten des Abschnitts zurück
- **setValue (value, valueObject): any** - setzt die Werte für den Abschnitt. Als Parameter nimmt die Methode einen Wert (oder ein Objekt mit Werten, falls der Abschnitt mehrere Controls besitzt), der gesetzt werden soll
    - **_value_** - (*any*) - ein Wert für den Abschnitt
    - **_valueObject?_** - (*CustomObject*) - optional, ein Objekt mit beliebigen Eigenschaften