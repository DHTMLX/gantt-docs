---
title: "Select Control"
sidebar_label: "Select Control"
---

Select Control
=========================

Ein Dropdown-Auswahlfeld.

![select_control](/img/select_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", height:22, map_to:"priority", type:"select", options: [ /*!*/
        {key:1, label: "High"},                                               /*!*/
        {key:2, label: "Normal"},                                             /*!*/
        {key:3, label: "Low"}                                                 /*!*/
     ]},                                                                      /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.locale.labels.section_priority = "Priority";
~~~


[Select control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/12_select.html)


Initialisierung
-------------------

Um das **select**-Steuerelement im Lightbox-Formular einzubinden, gehen Sie wie folgt vor:

1) Fügen Sie eine Sektion zur Lightbox-Konfiguration hinzu:

~~~js
var opts = [
    {key:1, label: "High"},                                            
    {key:2, label: "Normal"},                                         
    {key:3, label: "Low"}                                            
];

gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name:"priority", height:22, map_to:"priority",type:"select",options:opts},      /*!*/                                                                 
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

2) Definieren Sie ein Label für die Sektion:

~~~js
gantt.locale.labels.section_priority = "Priority";
~~~
  
  

[Select control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/12_select.html)


Eigenschaften
-------------

Hier sind einige wichtige Eigenschaften, die üblicherweise für das **select**-Steuerelement gesetzt werden (die vollständige Liste finden Sie [hier](api/config/lightbox.md)):

- **name** - (*string*) Der Name der Sektion 
- **height** - (*number*) Die Höhe der Sektion
- **map_to** - (*string*) Der Name der Daten-Eigenschaft, die der Sektion zugeordnet wird
- **type** - (*string*) Der Typ des [section control](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) Wenn *true*, erhält die Sektion beim Öffnen des Lightbox-Dialogs den Fokus
- **options** - (*array*) Ein Array von Objekten, das die Auswahlmöglichkeiten für das Steuerelement definiert (*wird für **select**, **checkbox** und **radio** genutzt*). Jedes Objekt steht für eine Option und enthält:
    - **key** - (*string*) Die Options-ID, die mit der Eigenschaft der Task-Daten abgeglichen wird
    - **label** - (*string*) Die Bezeichnung der Option
- **default_value** - (*any*) Der Standardwert für das Steuerelement, der gesetzt wird, wenn der Eingabewert nicht definiert ist    
- **onchange** - (*function*) Die ['onChange'-Event-Handler-Funktion](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) für das Steuerelement 


Befüllen des Steuerelements mit Daten
-------------------------------

Um Werte für das **select**-Steuerelement zu setzen, verwenden Sie den [options](api/config/lightbox.md)-Parameter:

~~~js
gantt.config.lightbox.sections = [
    { name:"priority",height:22, map_to:"priority",type:"select",
      options: [ 
        {key:1, label: "High"},                                               
        {key:2, label: "Normal"},                                             
        {key:3, label: "Low"}                                                
    ]}                                                                    
];
~~~

Jedes Element im [options](api/config/lightbox.md)-Array muss diese zwei Eigenschaften besitzen:

- **key** - Die Options-ID
- **label** - Die Bezeichnung der Option


Befüllen des Steuerelements mit Daten vom Server
---------------------------------------------

Um das Steuerelement mit Daten vom Server zu befüllen, weisen Sie dem [options](api/config/lightbox.md)-Parameter den Wert zu, der von der Methode [serverList](api/method/serverlist.md) zurückgegeben wird:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", ...},
    { name:"priority",map_to:"priority",type:"select",
        options:gantt.serverList("priority")}, /*!*/
    {name:"category", map_to:"category", type:"select", 
        options:gantt.serverList("category")}, /*!*/
    {name:"time", ...}
];
gantt.init("gantt_here");
gantt.load("/data");
~~~

Die Antwort vom **/data**-Endpunkt sieht wie folgt aus:

~~~js
{
  "tasks":[
    {"id":1,"text":"Project #2","start_date":"01-04-2020","duration":18,"parent":0},
    {"id":2,"text":"Task #1","start_date":"02-04-2020","duration":8,"parent":1},
    {"id":3,"text":"Task #2","start_date":"11-04-2020","duration":8,"parent":1}
  ],
  "links":[
    {"id":1,"source":1,"target":2,"type":"1"},
    {"id":2,"source":2,"target":3,"type":"0"}
  ],
  "collections": { /*!*/
    "priority":[
        {"value":"1","label":"Low"},
        {"value":"2","label":"Medium"},
        {"value":"3","label":"High"}
    ],
    "category":[
        {"value":"1","label":"Simple"},
        {"value":"2","label":"Complex"},
        {"value":"3","label":"Unknown"}
    ]
  }
}
~~~

### Laden von Optionen über dhtmlxConnector

Nachfolgend ein Beispiel für die Initialisierung von [dhtmlxConnector](integrations/php/howtostart-connector.md):

~~~php
//data.php
<?php
    include('connector-php/codebase/gantt_connector.php');
 
    $res = new PDO("mysql:host=localhost;dbname=gantt", "root", "");

    $list = new OptionsConnector($res);
    $list->render_table("priorities","id","id(value),name(label)");
    
    $gantt = new JSONGanttConnector($res);
    $gantt->set_options("priority", $list);
    $gantt->render_links("gantt_links","id","source_task(source),
                    target_task(target),type");    
    $gantt->render_table("gantt_tasks","id","start_date,duration,text,progress,
                    sortorder,parent");
?>
~~~

