---
title: "Schreibgeschützter Modus"
sidebar_label: "Schreibgeschützter Modus"
---

# Schreibgeschützter Modus


In diesem Artikel betrachten wir den schreibgeschützten Modus in zwei Szenarien:

1. [Schreibgeschützter Modus für das gesamte Gantt-Diagramm](guides/readonly-mode.md#readonlymodefortheentiregantt)
2. [Schreibgeschützter Modus für bestimmte Aufgaben](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)


## Schreibgeschützter Modus für das gesamte Gantt-Diagramm {#readonlymodefortheentiregantt}

Um das gesamte Gantt-Diagramm schreibgeschützt zu machen, setzen Sie einfach die Option [readonly](api/config/readonly.md) auf *true*.

~~~js
gantt.config.readonly = true;

gantt.init("gantt_here");
~~~

Beachten Sie, dass der schreibgeschützte Modus nur die integrierten Aktionen deaktiviert, die Benutzer über die Benutzeroberfläche ausführen können. Das bedeutet, wenn das gesamte Gantt-Diagramm gesperrt ist, können Benutzer weder das Lightbox-Formular noch den Inline-Editor öffnen, Aufgaben verschieben oder deren Größe ändern.

Die [readonly](api/config/readonly.md)-Eigenschaft blockiert jedoch keine Aktionen, die durch API-Aufrufe durchgeführt werden. Wenn Sie also die Gantt-API verwenden, sollten Sie in Ihren Callback-Funktionen manuell prüfen, ob der schreibgeschützte Modus aktiviert ist. Hier ein Beispiel, wie Sie das Hinzufügen von Aufgaben über einen benutzerdefinierten Button verhindern können:

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


Um bestimmte Aufgaben oder Verknüpfungen weiterhin bearbeitbar zu lassen, auch wenn das Gantt-Diagramm schreibgeschützt ist, fügen Sie deren Datenobjekt die Eigenschaft 'editable' hinzu und setzen Sie sie auf *true*:

![task_editable_property](/img/task_editable_property.png)

~~~js
gantt.config.readonly = true;
var task = gantt.getTask(id).editable = true;
~~~

Standardmäßig ist dieses Verhalten an die Eigenschaft 'editable' einer Aufgabe oder Verknüpfung gebunden. Wenn Sie eine andere Eigenschaft verwenden möchten, können Sie dies mit der Option [editable_property](api/config/editable_property.md) ändern:

~~~js
gantt.config.editable_property = "property_name";
~~~


## Schreibgeschützter Modus für bestimmte Aufgaben/Verknüpfungen {#readonlymodeforspecifictaskslinks}

Um bestimmte Aufgaben oder Verknüpfungen schreibgeschützt zu machen, fügen Sie deren Datenobjekt die Eigenschaft 'readonly' hinzu und setzen Sie sie auf true:

~~~js
gantt.getTask(id).readonly = true;
gantt.getLink(id).readonly = true;
~~~

![task_readonly_property](/img/task_readonly_property.png)

:::note
Standardmäßig prüft das Gantt-Diagramm, ob eine Aufgabe oder Verknüpfung diese Eigenschaft auf einen "truthy"-Wert gesetzt hat und macht sie dann schreibgeschützt. Andernfalls bleibt sie bearbeitbar.
:::

Wenn eine Aufgabe oder Verknüpfung schreibgeschützt ist, reagiert sie weder auf Klicks noch auf Doppelklicks und kann nicht verschoben oder bearbeitet werden.

Wenn Sie das Lightbox-Formular für schreibgeschützte Aufgaben anzeigen möchten, können Sie es manuell mit [gantt.showLightbox(id)](api/method/showlightbox.md) aufrufen:

~~~js
gantt.attachEvent("onTaskDblClick", function(id,e){
    gantt.showLightbox(id)
    return true;
});
~~~

Standardmäßig ist das schreibgeschützte Verhalten mit der Eigenschaft 'readonly' einer Aufgabe oder Verknüpfung verbunden. Sie können diese Eigenschaft jedoch mit der Option [readonly_property](api/config/readonly_property.md) ändern:

~~~js
gantt.config.readonly_property = "property_name";
~~~


## Details zur "editable_property" Konfigurationsoption


Die 'editable_property' verweist auf eine Eigenschaft direkt im Aufgaben-Datenobjekt, nicht auf einen Lightbox-Abschnitt oder eine Spalte im linken Gitter:

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

Wenn Sie diese Eigenschaft über das Lightbox-Formular bearbeitbar machen möchten, setzen Sie 'editable_property' auf die Eigenschaft, auf die das Steuerelement abgebildet ist:

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


## Setzen von schreibgeschützt/bearbeitbar auf Basis mehrerer Eigenschaften


Um die Bearbeitbarkeit von Ereignissen auf Grundlage mehrerer Bedingungen zu steuern, können Sie:

- Die Bearbeitbarkeit manuell steuern, indem Sie die [onBeforeLightbox](api/event/onbeforelightbox.md)- und [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)-Ereignisse blockieren
- Die 'editable_property' dynamisch aktualisieren, wann immer Aufgaben geladen, erstellt oder aktualisiert werden (mithilfe von [onTaskLoading](api/event/ontaskloading.md), [onTaskCreated](api/event/ontaskcreated.md), [onAfterTaskUpdate](api/event/onaftertaskupdate.md)):

~~~js
gantt.attachEvent("onTaskLoading", function(task){
    task.editable = task.has_owner && task.editable && task.text;
    return true;
});
~~~

