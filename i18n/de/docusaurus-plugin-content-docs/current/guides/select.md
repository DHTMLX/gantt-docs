---
title: "Auswahlliste"
sidebar_label: "Auswahlliste"
---

# Auswahlliste

Eine Dropdown-Liste.

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


[Auswahlliste](https://docs.dhtmlx.com/gantt/samples/05_lightbox/12_select.html)


## Initialization

Um die **select**-Steuerung zum Lightbox hinzuzufügen, befolgen Sie diese Schritte:

1) Fügen Sie der Lightbox-Konfiguration einen Abschnitt hinzu:

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

2) Legen Sie eine Beschriftung für den Abschnitt fest:

~~~js
gantt.locale.labels.section_priority = "Priority";
~~~
  
  

[Auswahlliste](https://docs.dhtmlx.com/gantt/samples/05_lightbox/12_select.html)


## Eigenschaften

Die folgenden Eigenschaften sind größtenteils wichtig und werden typischerweise für die **select**-Steuerung festgelegt (siehe die vollständige Liste [hier](api/config/lightbox.md)):

- **name** - (*string*) der Abschnittsname 
- **height** - (*number*) die Abschnittshöhe
- **map_to** - (*string*) der Name einer Dateneigenschaft, die dem Abschnitt zugeordnet wird
- **type** - (*string*) der Typ der [Abschnittssteuerung](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) wenn auf *true* gesetzt, erhält der Abschnitt beim Öffnen der Lightbox den Fokus
- **options** - (*array*) ein Array von Objekten. Definiert die Optionen der Steuerung für das **select**, **checkbox**- und **radio**-Steuerungen. Jedes Objekt im Array gibt eine einzelne Option an und besitzt
    - **key** - (*string*) die Option-ID. Dieses Attribut wird mit der Task-Dateneigenschaft verglichen, um Optionen Aufgaben zuzuordnen
    - **label** - (*string*) die Bezeichnung der Option
- **default_value** - (*any*) der Standardwert der Steuerung des Abschnitts. Wird nur angewendet, wenn der Eingabewert undefiniert ist    
- **onchange** - (*function*) gibt die ['onChange' Event-Handler-Funktion](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) für die Steuerung des Abschnitts an 


## Befüllen der Steuerung mit Daten

Im Allgemeinen gilt: Um Werte für die **select**-Steuerung festzulegen, verwenden Sie den [options](api/config/lightbox.md)-Parameter:

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

Elemente im [options](api/config/lightbox.md)-Parameter haben 2 Pflicht-Eigenschaften:

- **key** - die Option-ID
- **label** - die Option-Bezeichnung


## Befüllen der Steuerung mit Daten vom Server

Um die Steuerung vom Server aus zu befüllen, setzen Sie die [options](api/config/lightbox.md)-Option auf den Wert, der von der [serverList](api/method/serverlist.md) Methode zurückgegeben wird:

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

Die Ausgabe der URL **/data** ist Folgendes:

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

Hier ist ein Beispiel für die Initialisierung von [dhtmlxConnector](integrations/php/howtostart-connector.md):

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

