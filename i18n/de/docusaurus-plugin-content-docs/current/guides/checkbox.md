---
title: "Checkbox-Steuerelement"
sidebar_label: "Checkbox-Steuerelement"
---

# Checkbox-Steuerelement

Dies ist ein einfaches Zwei-Zustands-Checkbox-Steuerelement, das verwendet wird, um eine Option oder mehrere Werte ein- und auszuschalten.

Es kann in folgenden Situationen nützlich sein:

- [Ressourcen Aufgaben zuweisen](guides/resource-management.md)

![Checkbox-Steuerelement](/img/checkbox_control.png)


[Checkbox control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_checkbox.html)


- Umschalten [zwischen Split- und Baum-Modus für geteilte Aufgaben](guides/split-tasks.md)

![Split-Task-Checkbox](/img/split_task_checkbox.png)


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


## Initialisierung

Um das **Checkbox**-Steuerelement in das Lightbox-Formular einzufügen, müssen Sie:

1) Einen Abschnitt zur Lightbox-Konfiguration hinzufügen:

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

2) Ein Label für diesen Abschnitt definieren:

~~~js
gantt.locale.labels.section_split = "Display";
~~~
  

[Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


## Eigenschaften

Hier sind einige wichtige Eigenschaften, die häufig mit dem **Checkbox**-Steuerelement verwendet werden (eine vollständige Liste finden Sie [hier](api/config/lightbox.md)):

- **name** - (*string*) der Name des Abschnitts 
- **map_to** - (*string*) der Name der Daten-Eigenschaft, die diesem Abschnitt zugeordnet ist
- **type** - (*string*) der [Typ des Abschnitt-Steuerelements](guides/default-edit-form.md#lightboxcontrols)
- **options** - (*array*) ein Array von Objekten, das die auswählbaren Optionen für das Steuerelement definiert (*wird mit **select**, **checkbox** und **radio**-Steuerelementen verwendet*). Jedes Objekt enthält:
    - **key** - (*string*) die Options-ID, die mit der Task-Daten-Eigenschaft abgeglichen wird
    - **label** - (*string*) die Anzeige-Bezeichnung der Option
- **focus** - (*boolean*) falls true, erhält dieser Abschnitt den Fokus, wenn die Lightbox geöffnet wird
- **default_value** - (*any*) der Standardwert für das Steuerelement, wird nur angewendet, wenn der Eingabewert undefiniert ist
  


## Steuerelement mit Daten befüllen

Um Werte für das **Checkbox**-Steuerelement zu setzen, wird in der Regel der [options](api/config/lightbox.md)-Parameter verwendet:

~~~js
gantt.config.lightbox.sections = [
    {name: "split", type:"checkbox", map_to: "render", options:[
        {key:"split", label:"Split Task"}
    ]}                                                                
];
~~~

Jedes Element im [options](api/config/lightbox.md)-Array muss diese beiden Eigenschaften haben:

- **key** - die Options-ID
- **label** - die Bezeichnung der Option

