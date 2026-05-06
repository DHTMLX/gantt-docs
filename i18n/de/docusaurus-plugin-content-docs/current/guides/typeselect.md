---
title: "Typeselect-Steuerung"
sidebar_label: "Typeselect-Steuerung"
---

# Typeselect-Steuerung


:::info
Diese Funktionalität ist nur in der PRO Edition verfügbar.
:::

Eine Auswahlliste zum Ändern des [Typs einer Aufgabe](guides/task-types.md). 

 Die Steuerung lädt Optionen aus dem [types](api/config/types.md)-Objekt und verwendet den Standard-Onchange-Handler. Der Rest ist identisch mit [Select Control](guides/select.md).
 

![typeselect_control](/img/typeselect_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name: "type", type: "typeselect", map_to: "type"},                             /*!*/
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~


[Projekte und Meilensteine](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


## Initialisierung


Um die **typeselect**-Steuerung dem Lightbox hinzuzufügen, fügen Sie einfach eine Sektion zur Lightbox-Konfiguration wie folgt hinzu:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name: "type", type: "typeselect", map_to: "type"},                             /*!*/
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~


[Projekte und Meilensteine](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


- [Jeder Aufgabentyp hat sein Lightbox](guides/task-types.md#specificlightboxpertasktype). Sie können einen neuen Aufgabentyp erstellen und eine spezifische Struktur des Lightboxes für diesen Typ festlegen.
- Sobald der Benutzer den [Typ einer Aufgabe](guides/task-types.md) über die Steuerung ändert, aktualisiert die Steuerung die Lightbox-Struktur entsprechend dem ausgewählten Wert. 
- Die Steuerung lädt Optionen aus dem [types](api/config/types.md)-Objekt und verwendet den Standard-Onchange-Handler.
- Der Abschnitt mit **name="type"** hat bereits ein Label angegeben als „Typ“. Wenn Sie dem Abschnitt ein anderes Label geben möchten, verwenden Sie den folgenden Code: 

~~~js
gantt.locale.labels.section_type = "New label for the section";
~~~
  

## Eigenschaften


Die folgenden Eigenschaften sind größtenteils wichtig und werden typischerweise für die **typeselect**-Steuerung festgelegt (siehe vollständige Liste [hier](api/config/lightbox.md)):

- **name** - (*string*) der Abschnittsname 
- **height** - (*number*) die Abschnittshöhe
- **map_to** - (*string*) der Name einer Daten-Eigenschaft, die dem Abschnitt zugeordnet wird
- **type** - (*string*) der [Typ des Abschnitt-Steuerelements](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) wenn auf *true* gesetzt, erhält der Abschnitt beim Öffnen des Lightboxes den Fokus
- **filter** - (*function*) legt eine Filterfunktion für die Typen von Aufgaben fest. Die Funktion erhält den Typnamen als Parameter