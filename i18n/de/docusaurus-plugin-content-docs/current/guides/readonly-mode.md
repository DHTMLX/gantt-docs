--- 
title: "Nur-Lese-Modus" 
sidebar_label: "Nur-Lese-Modus" 
---

# Nur-Lesemodus

In diesem Abschnitt betrachten wir den Nur-Lesemodus im Kontext von zwei Situationen:

1. [Nur-Lesemodus für das gesamte Gantt-Diagramm](guides/readonly-mode.md#readonlymodefortheentiregantt)
2. [Nur-Lesemodus für spezifische Aufgaben](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)


## Nur-Lesemodus für das gesamte Gantt {#readonlymodefortheentiregantt}

Um das gesamte Gantt-Diagramm in den Nur-Lesemodus zu versetzen, setzen Sie die Option [readonly](api/config/readonly.md) auf *true*.

~~~js
gantt.config.readonly = true;

gantt.init("gantt_here");
~~~

Beachten Sie, dass der Nur-Lesemodus sich nur auf die eingebauten Aktionen auswirkt, die Benutzer über die UI durchführen können. Das bedeutet, dass, wenn das gesamte Gantt-Diagramm schreibgeschützt ist, die Benutzer weder die Lightbox noch den Inline-Editor öffnen können, Tasks weder vertikal noch horizontal ziehen und ablegen können, noch deren Größe ändern.

Die Eigenschaft [readonly](api/config/readonly.md) blockiert jedoch nicht Aktionen, die über API-Methoden implementiert sind. Wenn Sie also die Gantt-API verwenden, müssen Sie in der Callback-Funktion manuell prüfen, ob der Nur-Lesemodus aktiviert ist. Zum Beispiel können Sie hier die Fähigkeit blockieren, Tasks durch Klicken auf einen benutzerdefinierten Button hinzuzufügen:

~~~js
gantt.config.readonly = true;

gantt.config.columns = [
    { name: "text", label: "Task name", width: "*", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration", label: "Duration", align: "center" },
    { name: "add", label: "1", width: 44 },
    {
        name: "add_custom", label: "2", width: 44, template: function (task) {
          return "<div class='custom_add' onclick='customAdd(" + task.id + ")';></div>"
        }
    }
];

function customAdd(parentId) { /*!*/
    if (gantt.config.readonly){ /*!*/
        return; /*!*/
    }/*!*/
}/*!*/
~~~


Um bestimmte Aufgaben/Verknüpfungen bearbeitbar im Nur-Lesemodus-Gantt zu machen, fügen Sie der Datenobjekt die Eigenschaft 'editable' hinzu und setzen Sie sie auf *true*:

![task_editable_property](/img/task_editable_property.png)

~~~js
gantt.config.readonly = true;
var task = gantt.getTask(id).editable = true;
~~~
Standardmäßig ist das beschriebene Verhalten an die Eigenschaft 'editable' einer Aufgabe/Verknüpfung gebunden. Sie können die Ziel-Eigenschaft mit der Konfigurationsoption [editable_property](api/config/editable_property.md) ändern:

~~~js
gantt.config.editable_property = "property_name";
~~~


## Nur-Lesemodus für spezifische Aufgaben/Verknüpfungen {#readonlymodeforspecifictaskslinks}

Um bestimmte Aufgaben oder Verknüpfungen schreibgeschützt zu machen, fügen Sie der Datenobjekte die Eigenschaft 'readonly' hinzu und setzen Sie sie auf true:

~~~js
gantt.getTask(id).readonly = true;
gantt.getLink(id).readonly = true;
~~~

![task_readonly_property](/img/task_readonly_property.png)

:::note
Standardmäßig prüft der Gantt, ob eine Aufgabe/Verknüpfung diese Eigenschaft mit einem nicht-negativen Wert besitzt; falls ja, wird sie schreibgeschützt. Andernfalls bleibt sie bearbeitbar.
:::

Wenn die Aufgabe/Verknüpfung schreibgeschützt ist, reagiert sie nicht auf Klicks, Doppelklicks, ist weder verschiebbar noch irgendwie bearbeitbar.

Falls Sie das Lightbox-Fenster für schreibgeschützte Aufgaben anzeigen möchten, können Sie sie manuell mit [gantt.showLightbox(id)](api/method/showlightbox.md) aufrufen:

~~~js
gantt.attachEvent("onTaskDblClick", function(id,e){
    gantt.showLightbox(id)
    return true;
});
~~~

Standardmäßig ist das Nur-Lesemodus-Verhalten an die Eigenschaft 'readonly' einer Aufgabe/Verknüpfung gebunden. Sie können jedoch die Ziel-Eigenschaft mit der Konfigurationsoption [readonly_property](api/config/readonly_property.md) ändern:

~~~js
gantt.config.readonly_property = "property_name";
~~~


## Details zur Konfigurationsoption "editable_property"

'editable_property' bezieht sich auf die Eigenschaft des Task-Datenobjekts, nicht auf den Lightbox-Bereich oder die Spalte des linken Grids:

~~~js
{
    tasks:[
        {id:1, text:"Project #2", start_date:"01-04-2020", duration:18,order:10, 
            progress:0.4, parent:0, editable:false},
        {id:2, text:"Task #1", start_date:"02-04-2020", duration:8, order:10, 
            progress:0.6, parent:1, editable:true},
        {id:3, text:"Task #2", start_date:"11-04-2020", duration:8, order:20, 
            progress:0.6, parent:1, editable:true}
    ],
    links:[...]
}
~~~

Wenn Sie es vom Lightbox aus setzen lassen möchten, müssen Sie 'editable_property' auf dieselbe Eigenschaft setzen, auf die das Steuerelement abgebildet ist:

~~~js
gantt.config.lightbox.sections = [ 
    {
        name:"description", 
        height:38, 
        map_to:"some_property", 
        type:"textarea", 
        focus:true
    },
    ....
]
gantt.config.editable_property = "some_property";
~~~


## Festlegen des Read-Only-Verhaltens von Ereignissen basierend auf mehreren Eigenschaften

Wenn Sie Ereignisse bedingt bearbeitbar machen möchten, basierend auf einer Reihe von Eigenschaften, können Sie:

- deren Bearbeitbarkeit manuell verwalten, z. B. indem Sie die [onBeforeLightbox](api/event/onbeforelightbox.md) und [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) Ereignisse blockieren 
- dynamisch die 'editable_property' jedes Mal aktualisieren, wenn die Aufgabe geladen, hinzugefügt oder aktualisiert wird ([onTaskLoading](api/event/ontaskloading.md), [onTaskCreated](api/event/ontaskcreated.md), [onAfterTaskUpdate](api/event/onaftertaskupdate.md)):

~~~js
gantt.attachEvent("onTaskLoading", function(task){
    task.editable = task.has_owner && task.editable && task.text;
    return true;
});
~~~