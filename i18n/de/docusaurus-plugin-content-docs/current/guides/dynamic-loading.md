---
title: "Dynamisches Laden (auf Abruf)"
sidebar_label: "Dynamisches Laden (auf Abruf)"
---

# Dynamisches Laden (auf Abruf)

:::info
Diese Funktionalität ist nur in der PRO Edition verfügbar
:::

Standardmäßig lädt dhtmlxGantt alle Daten auf einmal. Das kann problematisch werden, wenn Sie eine große Anzahl von Aufgaben haben.

In einem solchen Fall können Sie den dynamischen Ladevorgang verwenden und Daten nach Verzweigungen (Unterprojekten) schichtweise laden, während der Benutzer sie öffnet.

## Funktionsweise

Wenn dynamisches Laden aktiviert ist, sendet der Aufruf gantt.load("url") eine GET-Anfrage an die angegebene URL, und es wird erwartet, dass die Antwort nur die Aufgaben der obersten Ebene enthält, wobei alle verschachtelten Zweige als geschlossen angezeigt werden.

Wenn der Benutzer auf das Expand-Symbol klickt, ruft gantt automatisch die [load](api/method/load.md) Methode auf und sendet die ID der angeklickten Aufgabe an den Server:

~~~js
gantt.load("url?parent_id="123"");
~~~

Und erwartet die Antwort, die Unteraufgaben des erweiterten Elements enthält.

:::note
Sie können das [onBeforeBranchLoading](api/event/onbeforebranchloading.md) Ereignis verwenden, um die Request-URL zu ändern oder zusätzliche Parameter zu ihr hinzuzufügen.
:::

## Aktivierung des dynamischen Ladens {#enablingdynamicloading}

Um das dynamische Laden im Gantt-Diagramm zu aktivieren, müssen Sie sowohl die Client- als auch die Serverseite berücksichtigen.

- Clientenseite (verwenden Sie die Option [branch_loading](api/config/branch_loading.md)):

~~~js
gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
gantt.config.branch_loading = true;

gantt.init("gantt_here");

gantt.load("/dynamic_loading");
~~~

- Serverseite:

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

**Verwandtes Beispiel**: [Unteraufgaben bei Bedarf laden (Branch Loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)

Im Allgemeinen besitzt die Client-Seite keine Informationen über die Kind-Elemente der angezeigten Dateneinträge (da diese Kinder nicht von der Serverseite geladen wurden).

Um diese Information zu übermitteln, können Sie eine spezielle Dateneigenschaft '$has_child' verwenden (kann geändert werden über [branch_loading_property](api/config/branch_loading_property.md)), die die Anzahl der Kind-Elemente für die Aufgabe angibt.

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

**Verwandtes Beispiel**: [Unteraufgaben bei Bedarf laden (Branch Loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)


## Datenformat für dynamisches Laden

Das Format der Daten für dynamisches Laden ist folgendes:

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

Wie Sie sehen können, handelt es sich um dasselbe JSON wie das, das für das reguläre Laden von Daten verwendet wird. Zum Vergleich lesen Sie den Artikel über [Unterstützte Datenformate](guides/supported-data-formats.md).

Der einzige Unterschied besteht in der Eigenschaft **$has_child**, die angibt, ob eine Aufgabe als ein 'Blatts'-Element (ohne Expand-Umschalter) oder als erweiterbarer Knoten angezeigt wird:

- Wenn die Eigenschaft *$has_child* angegeben ist und einen [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)-Wert enthält (eine nicht-null Zahl, true, eine nicht-leere Zeichenkette usw.), wird der Eintrag mit dem Expand-/Kollaps-Schalter angezeigt. Beim Erweitern des Schalters wird eine Ajax-Anfrage an den Server gesendet;
- Wenn *$has_child* nicht angegeben ist oder einen [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)-Wert enthält (0, false, NaN, undefined, leerer String, null), wird der Eintrag ohne Umschalter angezeigt, als Aufgabe ohne Kind-Elemente.

Wenn die Anfrage den Parameter *parent_id* enthält, muss die Antwort Kinder der Aufgabe mit der angegebenen ID enthalten. Enthält *parent_id* keinen Wert, muss die Anfrage Aufgaben der Wurzelebene enthalten:

<table class="dp_table">
  <tr>
  <th><b>Aktion</b></th><th><b>HTTP-Methode</b></th><th><b>URL</b></th><th><b>Antwort</b></th>
  </tr>
  <tr>
  <td>load root level</td>
  <td>GET</td>
  <td>/loadUrl</td>
  <td>Dynamic loading format</td>
  </tr>
  <tr>
  <td>load children on the task</td>
  <td>GET</td>
  <td>/loadUrl?parent_id=id</td>
  <td>Dynamic loading format</td>
  </tr>

</table>

### Aufgaben dynamisch laden

Sie können das dynamische Laden von Aufgaben so implementieren, dass neue Aufgaben geladen werden, nachdem Sie bis zur letzten sichtbaren Aufgabe gescrollt haben. Details finden Sie im Artikel [Wie man Aufgaben dynamisch lädt](guides/how-to.md#how-to-load-tasks-dynamically).

### Verwandte API

- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)
- [onBeforeBranchLoading](api/event/onbeforebranchloading.md)
- [onAfterBranchLoading](api/event/onafterbranchloading.md)