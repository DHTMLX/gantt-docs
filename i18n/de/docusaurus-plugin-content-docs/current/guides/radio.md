--- 
title: "Radiobutton-Steuerung"
sidebar_label: "Radiobutton-Steuerung"
---

# Radiobutton-Steuerung

Ein Block von Optionen, der es ermöglicht, jeweils nur eine davon auszuwählen.

![Radio Button](/img/radiobutton_control.png)


[Radiobutton-Steuerung](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_radio.html)


## Initialisierung

Um die **Radiobutton**-Steuerung dem Lightbox hinzuzufügen, befolgen Sie diese Schritte:

1) Fügen Sie dem Lightbox-Konfigurationsblock einen Abschnitt hinzu:

~~~js
var opts = [
    {key: 1, label: "High"},
    {key: 2, label: "Normal"},
    {key: 3, label: "Low"}                                        
];

gantt.config.lightbox.sections = [
    {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    {name: "priority", height: 22, map_to: "priority", type: "radio", options: [opts]}, /*!*/
    {name: "time", type: "duration", map_to: "auto"}
];
~~~


2) Legen Sie ein Label für den Abschnitt fest:

~~~js
gantt.locale.labels.section_priority = "Priority";
~~~


[Radiobutton-Steuerung](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_radio.html)


## Eigenschaften

Die folgenden Eigenschaften sind größtenteils wichtig und werden häufig für die **Radiobutton**-Steuerung festgelegt (siehe die vollständige Liste [hier](api/config/lightbox.md)):

- **name** - (*string*) der Abschnittsname 
- **map_to** - (*string*) der Name einer Dateneigenschaft, die dem Abschnitt zugeordnet wird
- **type** - (*string*) der [Typ der Abschnittssteuerung](guides/default-edit-form.md#lightboxcontrols)
- **options** - (*array*) ein Array von Objekten. Definiert die Auswahloptionen der Steuerung (*verwendet für die **Auswahl**, **Checkbox**- und **Radiobutton**-Steuerungen*). Jedes Objekt im Array gibt eine einzelne Option an und besitzt die folgenden Eigenschaften:
    - **key** - (*string*) die Option-ID. Dieses Attribut wird mit der Task-Daten-Eigenschaft verglichen, um Optionen Aufgaben zuzuordnen
    - **label** - (*string*) die Bezeichnung der Option
- **focus** - (*boolean*) wird, wenn auf *true* gesetzt, der Abschnitt beim Öffnen des Lightboxes den Fokus erhalten
- **default_value** - (*any*) der Standardwert der Steuerung des Abschnitts. Wird nur angewendet, wenn der Eingabewert undefiniert ist


## Befüllen der Steuerung mit Daten

Im Allgemeinen, um Werte für die **Radiobutton**-Steuerung festzulegen, verwenden Sie da [options](api/config/lightbox.md)-Parameter:

~~~js
gantt.config.lightbox.sections = [        
    {name: "priority", map_to: "priority", type: "radio", options: [
        {key: 1, label: "High"},
        {key: 2, label: "Normal"},
        {key: 3, label: "Low"},
    ]}        
];
~~~


Elemente im [options](api/config/lightbox.md)-Parameter haben 2 Pflicht-Eigenschaften:

- **key** - (*string*) die Option-ID
- **label** - (*string*) die Bezeichnung der Option