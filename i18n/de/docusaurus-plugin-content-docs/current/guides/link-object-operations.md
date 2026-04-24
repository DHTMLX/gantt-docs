---
title: "Das Link-Objekt/Die Link-ID abrufen"
sidebar_label: "Das Link-Objekt/Die Link-ID abrufen"
---

# Das Link-Objekt/Die Link-ID abrufen

Um mit Verknüpfungen im Gantt-Diagramm zu arbeiten, müssen Sie wissen, wie man das Objekt oder die ID einer Verknüpfung erhält. Zunächst
nehmen die meisten Methoden das Objekt (id) der Verknüpfung als Parameter. Zweitens können benutzerdefinierte Szenarien für Verknüpfungen nicht implementiert werden, ohne sich auf das Objekt (id) der Verknüpfung zu beziehen.

## Das Link-Objekt erhalten

Um ein Link-Objekt zu erhalten, verwenden Sie die [getLink](api/method/getlink.md) Methode:

~~~js
gantt.getLink("link1");                //-> {id:"link1", source:1, target:2, type:1}
~~~


## Alle Links aus dem Gantt-Diagramm abrufen

Um alle im Diagramm dargestellten Links zu erhalten, verwenden Sie die [getLinks](api/method/getlinks.md) Methode wie folgt:

~~~js
var links = gantt.getLinks(); 
~~~

Es gibt ein Array von Link-Objekten zurück.

## Verknüpfungen zu einer bestimmten Aufgabe abrufen

Um Links zu einer Aufgabe zu erhalten, verwenden Sie die **$source**- und **$target**-Eigenschaften des Aufgabenobjekts.

 Die Eigenschaften werden automatisch generiert und speichern die IDs der zugehörigen Verknüpfungen:

- **$source** - Verknüpfungen, die von der Aufgabe ausgehen.
- **$target** - Verknüpfungen, die zur Aufgabe führen.

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - IDs der von der Aufgabe ausgehen  /*!*/
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - IDs der zur Aufgabe führenden Verknüpfungen  /*!*/
~~~


Die **task.$source**- und **task.$target**-Eigenschaften sind [dynamische Eigenschaften des Aufgabenobjekts](guides/loading.md#dataproperties) und enthalten IDs der mit der Aufgabe verbundenen Verknüpfungen.
Die Eigenschaften werden nicht in der Datenbank gespeichert, sondern nach dem Laden der Daten dynamisch dem Aufgabenobjekt hinzugefügt.

~~~js
const task = gantt.getTask(1);
const source = task.$source;
// Verknüpfungen, die von der Aufgabe ausgehen,
// `Aufgabe #1` ist ein Vorgänger in diesen Beziehungen

source.forEach(function(linkId) {
   const link = gantt.getLink(linkId);
   console.log(link);
   // { id: linkId, source: 1, target: targetTaskId, ...}
});

const target = task.$target;
// Verknüpfungen, die zur Aufgabe führen,
// `Aufgabe #1` ist ein Nachfolger in diesen Beziehungen

target.forEach(function(linkId) {
   const link = gantt.getLink(linkId);
   console.log(link);
   // { id: linkId, source: sourceTaskId, target: 1, ...}
});
~~~


## Die Link-ID abrufen

Im Allgemeinen können Sie die ID einer Verknüpfung aus dem *links*-Objekt des Datensatzes abrufen. 

~~~js
{
    tasks:[...],
    links:[
        { id:1, source:1, target:2, type:"1"},                       //Link-ID = 1 /*!*/
        { id:2, source:2, target:3, type:"0"},                       //Link-ID = 2 /*!*/
        { id:3, source:3, target:4, type:"0"}                        //Link-ID = 3 /*!*/
    ]
}
~~~


Wenn Sie die ID von Link(s) mit einem bestimmten "*target*", "*source*" oder "*type*" Wert erhalten möchten, verwenden Sie die folgende Vorgehensweise:

~~~js
//Suche nach einer Verknüpfung, die von der Aufgabe mit der ID="1" zur Aufgabe mit der ID="2" geht
var links = gantt.serialize().links;                             //gibt alle Verknüpfungen zurück
for(var i="0;i<links.length;" i++){                              //geht über alle Verknüpfungen
   if ( (links[i].source == 1) && (links[i].target == 2) )
       var linkId = links[i].id;
};
~~~


## Die Link-ID ändern

Um die aktuelle ID einer Verknüpfung zu ändern, verwenden Sie die [changeLinkId](api/method/changelinkid.md) Methode:
~~~js
gantt.changeLinkId(1274, "link14");          //ändert die Link-ID: 1274 -> "link14"
~~~