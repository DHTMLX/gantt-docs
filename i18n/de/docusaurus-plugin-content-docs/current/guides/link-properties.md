---
title: "Link-Eigenschaften"
sidebar_label: "Link-Eigenschaften"
---

# Link-Eigenschaften 


Auf dieser Seite sind alle Eigenschaften aufgeführt, die ein Link-Objekt haben kann.

Für einen vollständigen Überblick über die Eigenschaften von Aufgabenobjekten lesen Sie den Artikel [Task Properties](guides/task-properties.md).


## Erforderliche Eigenschaften


<table>
  <tbody>
  <tr>
  <th>Name</th><th>Typ</th><th>Beschreibung</th>
  </tr>
  <tr>
  <td><b class="subproperty">id</b></td>
  <td><i>string | number</i></td>
  <td>die eindeutige Kennung des Links</td>
  </tr>
  <tr>
  <td><b class="subproperty">source</b></td>
  <td><i>string | number</i></td>
  <td>die ID der Aufgabe, bei der die Abhängigkeit beginnt</td>
  </tr>
  <tr>
  <td><b class="subproperty">target</b></td>
  <td><i>string | number</i></td>
  <td>die ID der Aufgabe, bei der die Abhängigkeit endet</td>
  </tr>
  <tr>
  <td><b class="subproperty">type</b></td>
  <td><i>string</i></td>
  <td>der Abhängigkeitstyp. Die verfügbaren Optionen sind im Objekt [links](api/config/links.md) definiert. Standardmäßig sind diese Werte: <ul> <li><b>"0"</b> - 'finish_to_start'.</li> <li><b>"1"</b> - 'start_to_start'.</li> <li><b>"2"</b> - 'finish_to_finish'.</li> <li><b>"3"</b> - 'start_to_finish'.</li> </ul></td>
  </tr>
  </tbody>
</table>

Wenn Sie anstelle der Standardwerte ('0','1','2') andere Werte für Abhängigkeitstypen verwenden möchten, können Sie diese anpassen, indem Sie die entsprechenden Eigenschaften im Objekt [links](api/config/links.md) ändern. Zum Beispiel:

~~~js
gantt.config.links.start_to_start = "start2start";
~~~

Beachten Sie, dass diese Änderung nur die Speicherung des Abhängigkeitstyps betrifft, nicht aber dessen Anzeige.


## Optionale Eigenschaften


<table>
  <tbody>
  <tr>
  <th>Name</th><th>Typ</th><th>Beschreibung</th>
  </tr>
  <tr>
  <td><b class="subproperty">lag</b></td>
  <td><i>number</i></td>
  <td>[die Verzögerungszeit zwischen Aufgaben](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks)</td>
  </tr>
  <tr>
  <td><b class="subproperty">readonly</b></td>
  <td><i>boolean</i></td>
  <td>markiert den Link als [schreibgeschützt](guides/readonly-mode.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">editable</b></td>
  <td><i>boolean</i></td>
  <td>markiert den Link als [bearbeitbar](guides/readonly-mode.md)</td>
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

