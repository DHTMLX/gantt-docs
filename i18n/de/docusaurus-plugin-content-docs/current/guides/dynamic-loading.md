---
title: "Dynamisches Laden (bei Bedarf)"
sidebar_label: "Dynamisches Laden (bei Bedarf)"
---

Dynamisches Laden (bei Bedarf)
=========================================
:::info
pronote Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::

Standardmäßig lädt dhtmlxGantt alle Daten auf einmal, was bei einer großen Anzahl von Aufgaben problematisch sein kann.

In solchen Fällen kann der Modus für dynamisches Laden verwendet werden, um Daten nach Zweigen (Teilprojekten), Ebene für Ebene, zu laden, während der Nutzer sie erweitert.

Funktionsweise
----------------

Wenn das dynamische Laden [aktiviert](#enablingdynamicloading) ist, sendet der Aufruf von [gantt.load("url")](api/method/load.md) eine GET-Anfrage an die angegebene URL und erwartet als Antwort nur die Aufgaben der obersten Ebene, wobei alle verschachtelten Zweige zunächst geschlossen sind.

Wenn der Nutzer auf das Symbol zum Erweitern klickt, ruft gantt automatisch die Methode [load](api/method/load.md) auf und sendet die ID der angeklickten Aufgabe an den Server:

~~~js
gantt.load("url?parent_id="123"");
~~~

Der Server sollte dann mit den Unteraufgaben des erweiterten Elements antworten.

:::note
Das Ereignis [onBeforeBranchLoading](api/event/onbeforebranchloading.md) kann verwendet werden, um die Anfrage-URL zu ändern oder zusätzliche Parameter hinzuzufügen.
:::

## Dynamisches Laden aktivieren  {#enablingdynamicloading}

<span id="enabledynload">Um das dynamische Laden im Gantt-Diagramm zu aktivieren</span>, sind sowohl clientseitige als auch serverseitige Konfigurationen erforderlich.

- Clientseitig (verwenden Sie die Option [branch_loading](api/config/branch_loading.md)):

~~~js
gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
gantt.config.branch_loading = true;

gantt.init("gantt_here");

gantt.load("/dynamic_loading");
~~~

- Serverseitig:

~~~php
<?php

include ('config.php');

$gantt = new JSONGanttConnector($res, $dbtype);

$parent_id = isset($_GET["parent_id"]) ? $_GET["parent_id"] : 0;

$gantt->mix("open", 0);
$gantt->mix("deep", 1);

$gantt->render_links("gantt_links", "id", "source,target,type");
$gantt->render_table(
    "gantt_tasks",
    "id",
    "start_date,duration,text,progress,parent",
    "", 
    "parent"
);
~~~
  

[Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)


Im Allgemeinen hat die Clientseite keine Informationen über die untergeordneten Elemente der angezeigten Daten, da diese Kinder zunächst nicht vom Server geladen werden.

Um diese Information bereitzustellen, kann eine spezielle Dateneigenschaft '$has_child' (die mit [branch_loading_property](api/config/branch_loading_property.md) angepasst werden kann) verwendet werden, um die Anzahl der Kindelemente einer Aufgabe anzugeben.

~~~php
function check_children($row){
 global $gantt;
 $task_id = $row->get_value('id');
 $sql = "SELECT COUNT(id) AS has_children FROM gantt_tasks WHERE parent='{$task_id}'";
 $children = $gantt->sql->query($sql);
    
 $child = $gantt->sql->get_next($children);
 $children_qty = $child['has_children'];

 $row->set_userdata('$has_child',$children_qty);
}
$gantt->event->attach("beforeRender","check_children");
~~~


[Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)


Datenformat für dynamisches Laden
-----------------------

Das Datenformat für das dynamische Laden sieht folgendermaßen aus:

~~~js
{
    "tasks":[
    {
        "id":13,
        "start_date":"2020-04-02 00:00:00",
        "duration":10,
        "text":"Task #1",
        "progress":0.2,
        "parent":12,
        "open":0,
        "$has_child":0
    },
    {
        "id":14,
        "start_date":"2020-04-04 00:00:00",
        "duration":4,
        "text":"Task #2",
        "progress":0.9,
        "parent":12,
        "open":0,
        "$has_child":4
    }],

    "links":[
        {"id":1,"source":1,"target":2,"type":"0"},
        {"id":2,"source":1,"target":3,"type":"0"},
        {"id":3,"source":1,"target":4,"type":"0"}
    ]

}
~~~

Dies ist dasselbe JSON-Format wie beim regulären Laden von Daten; zum Vergleich siehe den Artikel [Supported Data Formats](guides/supported-data-formats.md).

Der Hauptunterschied ist die **$has_child**-Eigenschaft, die bestimmt, ob eine Aufgabe als 'Blatt'-Element (ohne 'Erweitern'-Schalter) oder als erweiterbarer Knoten angezeigt wird:

- Wenn die *$has_child*-Eigenschaft vorhanden ist und einen ['truthy'](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) Wert enthält (wie eine von Null verschiedene Zahl, true oder ein nicht-leerer String), wird das Element mit dem Ein-/Ausklappschalter angezeigt. Das Erweitern löst eine Ajax-Anfrage an den Server aus;
- Wenn *$has_child* fehlt oder einen ['falsy'](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) Wert enthält (wie Null, false, NaN, undefined, leerer String oder null), wird das Element ohne Schalter angezeigt, was darauf hinweist, dass es keine untergeordneten Aufgaben gibt.

Wenn die Anfrage den Parameter *parent_id* enthält, sollte die Antwort die Kinder der Aufgabe mit dieser ID enthalten. Ist *parent_id* nicht enthalten, sollte die Antwort Aufgaben auf Root-Ebene enthalten:

<table class="dp_table">
  <tr>
  <th><b>Aktion</b></th><th><b>HTTP-Methode</b></th><th><b>URL</b></th><th><b>Antwort</b></th>
  </tr>
  <tr>
  <td>Root-Ebene laden</td>
  <td>GET</td>
  <td>/loadUrl</td>
  <td>[Format für dynamisches Laden](#dynamicloadingformatofdata)</td>
  </tr>
  <tr>
  <td>Kinder einer Aufgabe laden</td>
  <td>GET</td>
  <td>/loadUrl?parent_id="id"</td>
  <td>[Format für dynamisches Laden](#dynamicloadingformatofdata)</td>
  </tr>

</table>

## Aufgaben dynamisch laden

Das dynamische Laden von Aufgaben kann auch so implementiert werden, dass neue Aufgaben geladen werden, wenn Sie zur letzten sichtbaren Aufgabe scrollen. Weitere Details finden Sie im Artikel [How to load tasks dynamically](guides/how-to.md#howtoloadtasksdynamically).

