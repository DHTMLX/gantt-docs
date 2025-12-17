---
sidebar_label: lightbox
title: lightbox config
description: "spezifiziert das lightbox-Objekt"
---

# lightbox

### Description

@short: Spezifiziert das lightbox-Objekt

@signature: lightbox: LightboxSections

### Example

~~~jsx
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name:"priority", height:22, map_to:"priority",type:"select",options:opts},                                                                        
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.init("gantt_here");
~~~

### Details

Das lightbox-Objekt beinhaltet eine Haupteigenschaft:

- **sections** - (*array*) - definiert die Sektionen innerhalb der lightbox

~~~js
// Standard-Lightbox-Definition   
gantt.config.lightbox.sections=[
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

Jedes Objekt im **sections** Array kann je nach [Sektionstyp](guides/default-edit-form.md#lightboxstructure) unterschiedliche Eigenschaften besitzen:

#### Gemeinsam für alle Sektionen

- **name** - (*string*) - der Bezeichner der Sektion (wird von dhtmlxGantt verwendet, um das Label aus der *locale.labels* Sammlung zu holen). Beispielsweise verwendet die **time** Sektion das Label unter **gantt.locale.labels.section_time**.
- **map_to** - (*string*) - der Name der Daten-Eigenschaft, mit der die Sektion verknüpft ist.
- **type** - (*string*) - der [Steuerungstyp](guides/default-edit-form.md#lightboxcontrols), der in der Sektion verwendet wird.
- **height?** - (*number*) - optional, legt die Höhe der Sektion fest. Diese Eigenschaft gilt nicht für [checkbox](guides/checkbox.md) und [radio](guides/radio.md) Sektionen.
- **focus?** - (*boolean*) - optional, wenn true, wird die Sektion fokussiert, wenn die lightbox geöffnet wird.
- **formatter?** - (*DurationFormatter | LinkFormatter*) - optional, spezifiziert einen Formatter für die Sektion.

#### Zeit- und Dauer-Steuerelemente 

- **readonly?** - (*boolean*) - optional, wenn auf true gesetzt, wird die Sektion schreibgeschützt.
- **year_range?** - (*number | number[]*) - optional, definiert den Bereich für den Jahresauswahl-Selector. Es kann auf zwei Arten angegeben werden: 
    - *year_range: [2005, 2025]* - wählt Jahre von 2005 bis 2025 aus.
    - *year_range: 10* - wählt einen Bereich von 10 Jahren vor bis 10 Jahren nach dem aktuellen Jahr.
- **single_date?** - (*boolean*) - optional, wenn true, wird nur der 'Startdatum'-Selector angezeigt. Bearbeitete Aufgaben haben dann nur ein Startdatum mit null Dauer. Dies ist hauptsächlich für [Meilensteine](guides/task-types.md#milestones) nützlich.
- **time_format?** - (*string[]*) - optional, definiert die Reihenfolge der Datums- und Zeit-Selectoren.
- **autofix_end?** - (*boolean*) - optional, steuert, ob das Enddatum automatisch angepasst wird, wenn das Startdatum nach dem Enddatum gesetzt wird. Standardmäßig ist dies aktiviert. Wird es deaktiviert, ist manuelle Validierung möglich, aber ohne Validierung können Aufgaben eine Dauer von null erhalten, falls das Startdatum später als das Enddatum liegt.

#### Select-Steuerelement

- **onchange? (*e*): any** - optional, setzt einen 'onChange' Event-Handler für das Steuerelement der Sektion.
    - **_e_** - (*Event*) - das native Event-Objekt.

#### Select-, Checkbox-, Radio- und Ressourcen-Steuerelemente

- **options?** - (*object[]*) - optional, listet die Optionen für das Steuerelement auf. Jedes Objekt im Array repräsentiert eine Option mit folgenden Eigenschaften:
    - **_key_** - (*number | string*) - der Bezeichner der Option, der verwendet wird, um die Daten-Eigenschaft der Aufgabe abzugleichen.
    - **_label_** - (*string*) - die Anzeige-Beschriftung der Option.
    - **_unit?_** - (*string | number*) - optional, Maßeinheit für Ressourcen (verwendet im Resources-Steuerelement).
- **default_value?** - (*any*) - optional, der Standardwert, der verwendet wird, wenn der Eingabewert undefiniert ist. Für das Resources-Steuerelement gilt dies, wenn der Ressourcenwert undefiniert ist.

#### Parent-Steuerelement

- **allow_root?** - (*boolean*) - optional, wenn true, wird eine zusätzliche Option hinzugefügt, um die oberste Ebene als übergeordnete Aufgabe auszuwählen. Dies funktioniert zusammen mit der Eigenschaft **root_label**.
- **root_label?** - (*string*) - optional, definiert die Beschriftung für die Option der obersten Ebene. Wird zusammen mit **allow_root** verwendet.
- **sort? (task1, task2): number** - optional, stellt eine Sortierfunktion für die Select-Optionen bereit.
    - **_task1_** - (*Task*) - das erste Task-Objekt zum Vergleichen.
    - **_task2_** - (*Task*) - das zweite Task-Objekt zum Vergleichen.
- **filter? (id, task): boolean** - optional, liefert eine Filterfunktion für die Select-Optionen, die die Task-ID und das Task-Objekt erhält.
    - **_id_** - (*string | number*) - die ID der Aufgabe.
    - **_task_** - (*Task*) - das Task-Objekt.
- **template? (start_date, end_date, task): string|number** - optional, definiert eine Vorlage für die Select-Optionen.
    - **_start_date_** - (*Date | number*) - das Startdatum der Aufgabe.
    - **_end_date_** - (*Date | number*) - das Enddatum der Aufgabe.
    - **_task_** - (*Task*) - das Task-Objekt.

#### Typeselect-Steuerelement

- **filter** - (*function*) - setzt eine Filterfunktion für die Aufgabentypen, die den Typnamen als Parameter erhält.

### Related API
- [wide_form](api/config/wide_form.md)

### Related Guides
- - ["Textarea-Steuerelement"](guides/textarea.md)
- - ["Dauersteuerung"](guides/duration.md)
- - ["Zeitsteuerung"](guides/time.md)
- - ["Select Control"](guides/select.md)
- - ["Typeselect-Steuerelement"](guides/typeselect.md)
- - ["Parent Control"](guides/parent.md)
- - ["Template Control"](guides/template.md)
- - ["Checkbox-Steuerelement"](guides/checkbox.md)
- - ["Radio Button-Steuerelement"](guides/radio.md)
- - ["Konfiguration der Lightbox-Elemente"](guides/default-edit-form.md)
- - ["Arbeiten mit Lightbox-Elementen"](guides/lightbox-manipulations.md)
- - ["Erstellen eines benutzerdefinierten Elements"](guides/custom-editor.md)
- - ["Custom Lightbox"](guides/custom-edit-form.md)
- - ["Ändern der Schaltflächen im Lightbox"](guides/custom-button.md)

### Change log
- Wenn [gantt.config.csp](api/config/csp.md) auf *true* gesetzt ist oder wenn Gantt in der Salesforce-Umgebung läuft, wird die lightbox ab Version 7.1.13 innerhalb des Gantt-Containers gerendert.

