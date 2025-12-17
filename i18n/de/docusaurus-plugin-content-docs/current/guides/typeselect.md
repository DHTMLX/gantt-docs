---
title: "Typeselect-Steuerelement"
sidebar_label: "Typeselect-Steuerelement"
---

Typeselect-Steuerelement
======================

:::info
Diese Funktion ist ausschließlich in der PRO Edition verfügbar.
:::

Dies ist ein Auswahlfeld, das für das Ändern des [Typs einer Aufgabe](guides/task-types.md) vorgesehen ist. 

 Die Optionen werden aus dem 
[types](api/config/types.md)-Objekt geladen und es wird der Standard-onchange-Handler verwendet. Ansonsten verhält es sich wie das in [Select Control](guides/select.md) beschriebene Steuerelement.
 

![typeselect_control](/img/typeselect_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name: "type", type: "typeselect", map_to: "type"},                             /*!*/
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~


[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


Initialisierung
---------------------

Um das **typeselect**-Steuerelement im Lightbox-Dialog zu verwenden, fügen Sie einfach einen Abschnitt zur Lightbox-Konfiguration wie folgt hinzu:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name: "type", type: "typeselect", map_to: "type"},                             /*!*/
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~


[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


- Jeder Aufgabentyp kann seine eigene Lightbox haben, wie unter [individuelle Lightboxen für jeden Typ](guides/task-types.md#specificlightboxpertasktype) beschrieben. Es ist möglich, neue Aufgabentypen zu erstellen und ein benutzerdefiniertes Lightbox-Layout dafür zu definieren.
- Wenn der Benutzer den [Aufgabentyp](guides/task-types.md) über dieses Steuerelement ändert, passt sich die Struktur der Lightbox dem ausgewählten Typ an.
- Die Optionen des Steuerelements werden aus dem [types](api/config/types.md)-Objekt geladen und es wird der Standard-onchange-Handler verwendet.
- Der Abschnitt mit **name="type"** hat standardmäßig das Label "Type". Um dieses Label anzupassen, verwenden Sie folgenden Code:

~~~js
gantt.locale.labels.section_type = "Neues Label für den Abschnitt";
~~~
  

Eigenschaften
----------------

Hier sind die wichtigsten Eigenschaften, die häufig mit dem **typeselect**-Steuerelement verwendet werden (die vollständige Liste finden Sie [hier](api/config/lightbox.md)):

- **name** - (*string*) der Name des Abschnitts 
- **height** - (*number*) die Höhe des Abschnitts
- **map_to** - (*string*) die Daten-Eigenschaft, der der Abschnitt zugeordnet wird
- **type** - (*string*) der [Typ des Abschnitt-Steuerelements](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) wenn auf *true* gesetzt, erhält der Abschnitt den Fokus, wenn die Lightbox geöffnet wird
- **filter** - (*function*) eine Filterfunktion für Aufgabentypen, die den Typnamen als Argument erhält

