---
title: "Ressourcensteuerung"
sidebar_label: "Ressourcensteuerung"
---

# Ressourcensteuerung

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Eine komplexe Steuerung, die verwendet wird, um mehreren Ressourcen und deren Menge einer Aufgabe zuzuweisen (Link: [assigningresources](guides/resource-management.md#assigningresources)).

![Ressourcensteuerung Serveroptionen](/img/resources_control.png)

~~~js
gantt.config.lightbox.sections = [
 { name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
 { name: "owner", height: 60, type: "resources", default_value: 8},   /*!*/
 { name: "time", type: "duration", map_to: "auto"}
];
~~~


[Mehrere Ressourcen zuweisen](https://docs.dhtmlx.com/gantt/samples/11_resources/07_assign_multiple_resources.html)


oder

![Ressourcensteuerung Optionen](/img/resources_control2.png)

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 38, map_to:"text", type: "textarea", focus: true },
  { name: "time", type: "duration", map_to: "auto" },
  { name: "rooms", type: "resources", map_to: "rooms", options: [  /*!*/
  	  { key: 1, label: "room 1", unit: "hours" },    /*!*/
	  { key: 2, label: "room 2", unit: "hours" },   /*!*/
	  { key: 3, label: "room 3", unit: "hours" }   /*!*/
    ]  /*!*/
  }	   /*!*/
];

gantt.locale.labels.section_rooms = "Rooms";
~~~


[Resources control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/13_resources.html)


:::note
Sie können auch eine benutzerdefinierte Steuerung erstellen, um einer Aufgabe mehrere Ressourcen zuzuweisen (Link: guides/custom-editor.md#customthirdpartyeditor).
:::

## Initialization

Um die **Ressourcen**-Steuerung dem Lightbox hinzuzufügen, befolgen Sie die folgenden Schritte:

1. Fügen Sie eine Sektion zur Lightbox-Konfiguration hinzu:

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
  { name: "time", type: "duration", map_to: "auto" },
  { name: "rooms", type:"resources" }	   /*!*/
];
~~~

2. Legen Sie ein Label für den Abschnitt fest:

~~~js
gantt.locale.labels.section_resources = "Rooms";
~~~


[Resources control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/13_resources.html)


## Eigenschaften

Die folgenden Eigenschaften sind größtenteils wichtig und werden häufig für die **Ressourcen**-Steuerung festgelegt (siehe die vollständige Liste [hier](api/config/lightbox.md)):

- **name** - (*string*) der Abschnittsname 
- **map_to** - (*string*) der Name einer Daten-Eigenschaft, die dem Abschnitt zugeordnet wird
- **type** - (*string*) der Typ der [Abschnittskontrolle](guides/default-edit-form.md#lightboxcontrols)
- **options** - (*array*) ein Array von Objekten. Definiert Auswahloptionen der Steuerung (*verwendet für die **select**, **checkbox**,**radio** und **resources**  Steuerelemente*). 
Jedes Objekt im Array spezifiziert eine einzelne Option und enthält die folgenden Eigenschaften:
    - **key** - (*string*) die Options-ID. Dieses Attribut wird mit der Task-Daten-Eigenschaft verglichen, um Optionen Tasks zuzuweisen
    - **label** - (*string*) die Optionsbeschriftung
    - **unit** - (*number*) die Einheit der Messung der Ressource
- **focus** - (*boolean*) wird auf *true* gesetzt, erhält der Abschnitt beim Öffnen des Lightbox den Fokus
- **default_value** - (*any*) der Standardwert des Abschnitts-Steuerelements. Wird angewendet, wenn der Wert der Ressource undefiniert ist. Jeder Eintrag aus dem **options**-Array kann seinen eigenen Standardwert haben.

:::note
Standardmäßig ist die Ressourcen-Steuerung dem in der [resource_property](api/config/resource_property.md) Konfiguration angegebenen Eigenschaft zugeordnet, sodass die **map_to**-Option entfallen kann.
:::
:::note
Standardmäßig wird die Ressourcen-Steuerung automatisch aus dem [Resource-Datenspeicher](guides/resource-management.md#working-with-resource-view-panel) über die `gantt.serverList("resourceOptions")` [Collection](api/method/serverlist.md) befüllt. Man muss die Optionsliste nur manuell angeben, wenn man das Standardverhalten ändern möchte.
:::

## Populate-Steuerung mit Daten

Ab Version 8.0 bezieht die Ressourcen-Steuerung standardmäßig Optionen aus dem [Resource-Datenspeicher](guides/resource-management.md#working-with-resource-view-panel).

Verwendest du den Standard-Resource-Datenspeicher, der von Gantt erzeugt wird, und die [Ressourcensteuerung](guides/resources.md) wird ohne den Parameter **options** initialisiert, wird sie mit der **gantt.serverList("resourceOptions")**-Sammlung verbunden. Diese Sammlung wird mit den Ressourcen aus dem Resource-Datenspeicher befüllt. Du kannst Optionen per Code abrufen:

~~~js
const options = gantt.serverList("resourceOptions");
~~~

Hinweis: Das Options-Array bleibt leer, bevor die Ressourcen in den Datenspeicher geladen werden.

Du kannst diese Sammlung auch mit benutzerdefinierter Optionsliste aktualisieren:

~~~js
gantt.updateCollection("resourceOptions", [...]);
~~~

Hinweis: Falls du Ressourcen danach in den Gantt lädst, wird diese Sammlung aktualisiert und deine Änderungen überschrieben.

Wenn du festlegen möchtest, welche Ressourcen in das Lightbox-Fenster gelangen, kannst du die Konfiguration von `gantt.config.resources.lightbox_resources` neu definieren:

~~~js
gantt.config.resources = {
    lightbox_resources: function selectResourceControlOptions(resources){
          const lightboxOptions = [];
          resources.forEach(function(res) {
             if (!gantt.$resourcesStore.hasChild(res.id)) {
                const copy = gantt.copy(res);
                copy.key = res.id;
                copy.label = res.text;
                lightboxOptions.push(copy);
             }
          });
          return lightboxOptions;
       }
};
~~~

Wenn du den Resource-Datenspeicher manuell erstellst, musst du die Ressourcensteuerung mit den Optionen selbst befüllen.

Generell gilt: Um Werte für die **resources**-Steuerung festzulegen, verwende den [options](api/config/lightbox.md)-Parameter:

~~~js
gantt.config.lightbox.sections = [
    { name:"rooms",type:"resources",map_to:"rooms",
        options:[
            { key: 1, label: "room 1", unit: "hours" },
            { key: 2, label: "room 2", unit: "hours" },
            { key: 3, label: "room 3", unit: "hours" }
        ]
    }
];
~~~

Elemente im [options](api/config/lightbox.md)-Parameter haben 3 verpflichtende Eigenschaften:

- **key** - die Options-ID
- **label** - die Options-Beschriftung
- **unit** - die Einheit der Messung der Ressource


## Populate-Steuerung mit Daten vom Server

Um die Steuerung vom Server aus zu befüllen, setzen Sie die [options](api/config/lightbox.md)-Option auf den von der [serverList](api/method/serverlist.md) Methode zurückgegebenen Wert:

~~~js
gantt.config.lightbox.sections = [
 {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
 {name: "resources", type: "resources", map_to: "owner_id", default_value:8,
     options: gantt.serverList("resourceOptions")},
 {name: "time", type: "duration", map_to: "auto"}
];

gantt.init("gantt_here");
gantt.load("/data");
~~~


Der Inhalt von `gantt.serverList("resourceOptions")` kann definiert werden, wenn die Optionen verfügbar werden, mittels der [updateCollection](api/method/updatecollection.md)-Methode:

~~~js
gantt.updateCollection("resourceOptions", [
    { key: 1, label: "room 1", unit: "hours" },
    { key: 2, label: "room 2", unit: "hours" },
    { key: 3, label: "room 3", unit: "hours" }
])
~~~


[Mehrere Ressourcen zuweisen](https://docs.dhtmlx.com/gantt/samples/11_resources/07_assign_multiple_resources.html)