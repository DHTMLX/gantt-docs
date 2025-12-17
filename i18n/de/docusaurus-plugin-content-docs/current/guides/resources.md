---
title: "Ressourcen-Steuerung"
sidebar_label: "Ressourcen-Steuerung"
---

Ressourcen-Steuerung
===================

:::info
Dieses Feature ist nur in der PRO Edition verfügbar.
:::

Dies ist ein vielseitiges Steuerelement, das dazu dient, [mehreren Ressourcen und deren Mengen einer Aufgabe zuzuweisen](guides/resource-management.md#assigningresources).

![Ressourcen-Steuerung Serveroptionen](/img/resources_control.png)

~~~js
gantt.config.lightbox.sections = [
 {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
 {name:"owner",height:60, type:"resources", default_value:8},   /*!*/
 {name: "time", type: "duration", map_to: "auto"}
];
~~~


[Assign multiple resources](https://docs.dhtmlx.com/gantt/samples/11_resources/07_assign_multiple_resources.html)


Alternativ:

![Ressourcen-Steuerung Optionen](/img/resources_control2.png)

~~~js
gantt.config.lightbox.sections = [
  { name:"description",height:38,map_to:"text",type:"textarea",focus:true },
  { name:"time",type:"duration",map_to:"auto" },
  { name:"rooms",type:"resources",map_to:"rooms", options:[  /*!*/
        { key: 1, label: "room 1", unit: "hours" },    /*!*/
      { key: 2, label: "room 2", unit: "hours" },   /*!*/
      { key: 3, label: "room 3", unit: "hours" }   /*!*/
    ]  /*!*/
  }       /*!*/
];

gantt.locale.labels.section_rooms = "Rooms";
~~~


[Resources control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/13_resources.html)


:::note
Es ist auch möglich, [ein benutzerdefiniertes Steuerelement zu erstellen, um mehreren Ressourcen einer Aufgabe zuzuweisen](guides/custom-editor.md#customthirdpartyeditor).
:::

Initialisierung
------------

Um das **resources**-Steuerelement im Lightbox-Dialog einzubinden, gehen Sie wie folgt vor:

1. Fügen Sie eine Sektion zur Lightbox-Konfiguration hinzu:

~~~js
gantt.config.lightbox.sections = [
  { name:"description",height:38,map_to:"text",type:"textarea",focus:true },
  { name:"time",type:"duration",map_to:"auto" },
  { name:"rooms",type:"resources" }       /*!*/
];
~~~

2. Definieren Sie ein Label für die Sektion:

~~~js
gantt.locale.labels.section_resources = "Rooms";
~~~


[Resources control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/13_resources.html)


Eigenschaften
-------------

Hier sind die wichtigsten Eigenschaften, die häufig für das **resources**-Steuerelement festgelegt werden (vollständige Details finden Sie [hier](api/config/lightbox.md)):

- **name** - (*string*) der Name der Sektion
- **map_to** - (*string*) der Name der Daten-Eigenschaft, die der Sektion zugeordnet ist
- **type** - (*string*) der Typ des Steuerelements für die [Sektion](guides/default-edit-form.md#lightboxcontrols)
- **options** - (*array*) ein Array von Objekten, das die Auswahlmöglichkeiten des Steuerelements definiert (*wird verwendet mit **select**, **checkbox**, **radio** und **resources** Steuerelementen*). Jedes Objekt enthält:
    - **key** - (*string*) die Options-ID, die mit der Daten-Eigenschaft der Aufgabe abgeglichen wird
    - **label** - (*string*) die Bezeichnung der Option
    - **unit** - (*number*) die Einheit der Ressource
- **focus** - (*boolean*) wenn true, erhält die Sektion den Fokus, wenn die Lightbox geöffnet wird
- **default_value** - (*any*) Standardwert für das Steuerelement, der verwendet wird, wenn kein Ressourcenwert definiert ist. Jede Option kann ihren eigenen Standardwert haben.

:::note
Standardmäßig wird das Ressourcen-Steuerelement der in [resource_property](api/config/resource_property.md) definierten Eigenschaft zugeordnet, daher ist die Angabe von **map_to** optional.
:::
:::note
Standardmäßig werden die Optionen des Ressourcen-Steuerelements automatisch aus dem [Resource Datastore](guides/resource-management.md#workingwithresourceviewpanel) über die `gantt.serverList("resourceOptions")` [Collection](api/method/serverlist.md) übernommen. Sie müssen die Optionen nur manuell setzen, wenn Sie dieses Verhalten überschreiben möchten.
:::

Befüllen des Steuerelements mit Daten
-------------------------------

Seit Version 8.0 erhält das Ressourcen-Steuerelement die Optionen automatisch aus dem [Resource Datastore](guides/resource-management.md#workingwithresourceviewpanel).

Wenn Sie den von Gantt bereitgestellten Standard-Resource Datastore verwenden, wird das [Ressourcen-Steuerelement](guides/resources.md), das ohne den **options**-Parameter initialisiert wird, mit der **gantt.serverList("resourceOptions")** Collection verknüpft, die mit Ressourcen aus dem Datastore gefüllt wird. Sie können im Code wie folgt auf die Optionen zugreifen:

~~~js
const options = gantt.serverList("resourceOptions");
~~~

Beachten Sie, dass das Options-Array leer ist, bis Ressourcen in den Datastore geladen wurden.

Sie können diese Collection auch mit einer eigenen Liste von Optionen aktualisieren:

~~~js
gantt.updateCollection("resourceOptions", [...]);
~~~

Beachten Sie, dass, wenn Sie nach dem Aktualisieren dieser Collection Ressourcen in das Gantt laden, Ihre Änderungen überschrieben werden.

Um zu steuern, welche Ressourcen in der Lightbox erscheinen, definieren Sie die **gantt.config.resources.lightbox_resources** Konfiguration neu:

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

Wenn Sie den Resource Datastore manuell erstellen, müssen Sie die Optionen des Ressourcen-Steuerelements selbst befüllen.

Typischerweise setzen Sie Werte für das **resources**-Steuerelement über den [options](api/config/lightbox.md) Parameter:

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

Jedes Element im [options](api/config/lightbox.md) Array muss enthalten:

- **key** - die Options-ID
- **label** - die Bezeichnung der Option
- **unit** - die Einheit der Ressource


Befüllen des Steuerelements mit Daten vom Server
---------------------------------------------

Um das Steuerelement mit Daten vom Server zu befüllen, setzen Sie die [options](api/config/lightbox.md) Eigenschaft auf den Wert, der von der [serverList](api/method/serverlist.md) Methode zurückgegeben wird:

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


Der Inhalt von `gantt.serverList("resourceOptions")` kann gesetzt werden, sobald die Optionen verfügbar sind, indem Sie die [updateCollection](api/method/updatecollection.md) Methode verwenden:

~~~js
gantt.updateCollection("resourceOptions", [
    { key: 1, label: "room 1", unit: "hours" },
    { key: 2, label: "room 2", unit: "hours" },
    { key: 3, label: "room 3", unit: "hours" }
])
~~~

[Assign multiple resources](https://docs.dhtmlx.com/gantt/samples/11_resources/07_assign_multiple_resources.html)

