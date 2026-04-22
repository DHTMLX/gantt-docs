---
title: "Link-Eigenschaften"
sidebar_label: "Link-Eigenschaften"
---

# Link-Eigenschaften

Auf dieser Seite finden Sie die vollständige Liste der Eigenschaften, die das Link-Objekt enthalten kann.

Die vollständige Liste der Eigenschaften des Task-Objekts finden Sie im Artikel [Aufgaben-Eigenschaften](guides/task-properties.md).


## Erforderliche Eigenschaften

<table>
  <tbody>
  <tr>
  <th>Name</th><th>Typ</th><th>Beschreibung</th>
  </tr>
  <tr>
  <td><b class="subproperty">id</b></td>
  <td><i>string | number</i></td>
  <td>die Link-ID</td>
  </tr>
  <tr>
  <td><b class="subproperty">source</b></td>
  <td><i>string | number</i></td>
  <td>die ID einer Aufgabe, von der die Abhängigkeit beginnt</td>
  </tr>
  <tr>
  <td><b class="subproperty">target</b></td>
  <td><i>string | number</i></td>
  <td>die ID einer Aufgabe, zu der die Abhängigkeit endet.</td>
  </tr>
  <tr>
  <td><b class="subproperty">type</b></td>
  <td><i>string</i></td>
  <td>der Abhängigkeitstyp. Die verfügbaren Werte sind im [links](api/config/links.md) Objekt gespeichert. Standardmäßig lauten sie: <ul> <li><b>"0"</b> - 'finish_to_start'.</li> <li><b>"1"</b> - 'start_to_start'.</li> <li><b>"2"</b> - 'finish_to_finish'.</li> <li><b>"3"</b> - 'start_to_finish'.</li> </ul></td>
  </tr>
  </tbody>
</table>

Wenn Sie die Abhängigkeitstypen auf andere Weise als die Standardwerte ('0','1','2') speichern möchten, können Sie die Werte der entsprechenden Eigenschaften des Objekts [links](api/config/links.md) ändern. Zum Beispiel:

~~~js
gantt.config.links.start_to_start = "start2start";
~~~

Hinweis: Diese Werte beeinflussen nur die Art und Weise, wie der Abhängigkeitstyp gespeichert wird, nicht das Verhalten der Visualisierung. 

## Optionale Eigenschaften

<table>
  <tbody>
  <tr>
  <th>Name</th><th>Typ</th><th>Beschreibung</th>
  </tr>
  <tr>
  <td><b class="subproperty">lag</b></td>
  <td><i>number</i></td>
  <td>[die Verzögerung der Aufgabe](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks)</td>
  </tr>
  <tr>
  <td><b class="subproperty">readonly</b></td>
  <td><i>boolean</i></td>
  <td>kann den Link als [readonly](guides/readonly-mode.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">editable</b></td>
  <td><i>boolean</i></td>
  <td>kann den Link als [editable](guides/readonly-mode.md#details-of-the-editable_property-config-option) kennzeichnen</td>
  </tr>
  </tbody>
</table>

## Beispiel

~~~js
var data = {
    tasks: [
        {id:1, text:"Project #1", start_date:"01-04-2020", duration:18},
         {id:2, text:"Task #1", start_date:"02-04-2020", duration:8, parent:1},
         {id:3, text:"Task #2", start_date:"11-04-2020", duration:8, parent:1}
    ],
    links:[
        {id:1, source:1, target:2, type:"1"},
        {id:2, source:2, target:3, type:"0"}
    ]
};
~~~