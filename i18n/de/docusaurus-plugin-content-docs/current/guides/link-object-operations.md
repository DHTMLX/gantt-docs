---
title: "Abrufen des Link-Objekts/der Link-ID"
sidebar_label: "Abrufen des Link-Objekts/der Link-ID"
---

# Abrufen des Link-Objekts/der Link-ID

Beim Arbeiten mit Links im Gantt-Diagramm ist es wichtig zu verstehen, wie man auf das Link-Objekt oder die Link-ID zugreift. Die meisten Methoden erfordern das Link-Objekt (oder die ID) als Eingabeparameter. Zusätzlich müssen benutzerdefinierte, linkbezogene Szenarien auf das Link-Objekt oder die Link-ID referenzieren, um korrekt zu funktionieren.

## Abrufen des Link-Objekts

Um ein Link-Objekt abzurufen, verwenden Sie die Methode [getLink](api/method/getlink.md):

~~~js
gantt.getLink("link1");                //-> {id:"link1", source:1, target:2, type:1}
~~~

## Abrufen aller Links aus dem Gantt-Diagramm 

Um alle aktuell im Diagramm angezeigten Links zu erhalten, verwenden Sie die Methode [getLinks](api/method/getlinks.md) wie folgt:

~~~js
var links = gantt.getLinks(); 
~~~

Dies gibt ein Array zurück, das alle Link-Objekte enthält.

## Abrufen der Links, die mit einer bestimmten Aufgabe verbunden sind

Um die Links zu finden, die mit einer bestimmten Aufgabe verknüpft sind, prüfen Sie die Eigenschaften **$source** und **$target** des Aufgabenobjekts.

Diese Eigenschaften werden automatisch generiert und enthalten die IDs der zugehörigen Links:

- **$source** - Links, die von der Aufgabe ausgehen.
- **$target** - Links, die in die Aufgabe hineinführen.

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - IDs der ausgehenden Links  /*!*/
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - IDs der eingehenden Links  /*!*/
~~~

Die **task.$source** und **task.$target** sind [dynamische Eigenschaften des Aufgabenobjekts](guides/loading.md#dataproperties), die die IDs der mit der Aufgabe verbundenen Links enthalten. Diese Eigenschaften werden nicht in der Datenbank gespeichert, sondern dynamisch zum Aufgabenobjekt hinzugefügt, sobald die Daten geladen sind.

~~~js
const task = gantt.getTask(1);
const source = task.$source;
// Links, die von der Aufgabe ausgehen,
// `task #1` fungiert in diesen Beziehungen als Vorgänger

source.forEach(function(linkId) {
   const link = gantt.getLink(linkId);
   console.log(link);
   // { id: linkId, source: 1, target: targetTaskId, ...}
});

const target = task.$target;
// Links, die auf die Aufgabe zeigen,
// `task #1` ist in diesen Beziehungen ein Nachfolger

target.forEach(function(linkId) {
   const link = gantt.getLink(linkId);
   console.log(link);
   // { id: linkId, source: sourceTaskId, target: 1, ...}
});
~~~

## Abrufen der Link-ID

In der Regel befindet sich die ID eines Links im *links*-Objekt des Datensatzes.

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


Wenn Sie die ID eines Links mit einem bestimmten "*target*", "*source*" oder "*type*" Wert suchen müssen, können Sie den folgenden Ansatz verwenden:

~~~js
// Suchen eines Links, der von der Aufgabe mit id="1" zur Aufgabe mit id="2" führt
var links = gantt.serialize().links;                             // gibt alle Links zurück
for(var i="0;" i < links.length; i++){                             // iteriert über alle Links
   if ( (links[i].source == 1) && (links[i].target == 2) )
       var linkId = links[i].id;
};
~~~

## Ändern der Link-ID

Um die ID eines bestehenden Links zu aktualisieren, verwenden Sie die Methode [changeLinkId](api/method/changelinkid.md):

~~~js
gantt.changeLinkId(1274, "link14");          // ändert die Link-ID von 1274 auf "link14"
~~~

