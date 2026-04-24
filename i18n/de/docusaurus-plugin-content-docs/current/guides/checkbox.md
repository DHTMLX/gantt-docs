---
title: "Checkbox-Steuerelement"
sidebar_label: "Checkbox-Steuerelement"
---

# Checkbox-Steuerelement

Ein zweistufiges Kontrollkästchen. Die Steuerung wird verwendet, um eine Option oder mehrere Werte ein- oder auszuschalten.

Zum Beispiel ist es nützlich für:

- [Ressourcen Aufgaben zuordnen](guides/resource-management.md)

![Kontrollkästchen-Steuerung](/img/checkbox_control.png)

[Kontrollkästchen-Steuerung](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_checkbox.html)

- Wechseln zwischen dem Split-Modus und dem Baum-Modus für geteilte Aufgaben

![Split-Aufgaben-Checkbox](/img/split_task_checkbox.png)


~~~js
gantt.config.lightbox.project_sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "split", type:"checkbox", map_to: "render", options:[    /*!*/
        {key:"split", label:"Split Task"}                            /*!*/                        
    ]},                                                                /*!*/
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~


[Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


## Initialization

Um das **Kontrollkästchen**-Steuerelement zum Lightbox hinzuzufügen, folgen Sie diesen Schritten:

1) Fügen Sie dem Lightbox-Konfigurations-Block eine Sektion hinzu:

~~~js
var opts = [
    {key:"split", label:"Split Task"}                                        
];

gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "split", type:"checkbox", map_to: "render", options:opts},            /*!*/
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~

2) Legen Sie eine Bezeichnung für die Sektion fest:

~~~js
gantt.locale.labels.section_split = "Display";
~~~
  

[Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


## Eigenschaften

Die folgenden Eigenschaften sind größtenteils wichtig und werden häufig für das **Kontrollkästchen**-Steuerelement festgelegt (siehe die vollständige Liste [hier](api/config/lightbox.md)):

- **name** - (*string*) der Abschnittsname 
- **map_to** - (*string*) der Name einer Dateneigenschaft, die dem Abschnitt zugeordnet wird
- **type** - (*string*) der [Typ des Abschnittskontrolls](guides/default-edit-form.md#lightboxcontrols)
- **options** - (*array*) ein Array von Objekten. Definiert die Auswahlmöglichkeiten des Steuerelements (*wird verwendet für die **select**, **Kontrollkästchen** und **Radio**-Steuerelemente*). Jedes Objekt im Array entspricht einer einzelnen Option und besitzt die folgenden Eigenschaften:
    - **key** - (*string*) die Options-ID. Dieses Attribut wird mit der Task-Daten-Eigenschaft verglichen, um Optionen den Aufgaben zuzuordnen
    - **label** - (*string*) die Options-Bezeichnung
- **focus** - (*boolean*) wird der Wert auf *true* gesetzt, erhält der Abschnitt beim Öffnen des Lightbox den Fokus
- **default_value** - (*any*) der Standardwert des Abschnitts-Steuerelements. Gilt nur, wenn der Eingabewert undefiniert ist
  


## Befüllen des Steuerelements mit Daten

Im Allgemeinen, um Werte für das **Kontrollkästchen**-Steuerelement festzulegen, verwenden Sie den Parameter [options](api/config/lightbox.md):

~~~js
gantt.config.lightbox.sections = [
    {name: "split", type:"checkbox", map_to: "render", options:[
        {key:"split", label:"Split Task"}
    ]}                                                                
];
~~~

Elemente im Parameter [options](api/config/lightbox.md) haben 2 Pflicht-Eigenschaften:

- **key** - (*string*) die Option-ID
- **label** - (*string*) die Options-Bezeichnung