---
title: "Parent Control"
sidebar_label: "Parent Control"
---

# Parent Control

Dieses Steuerelement stellt ein Auswahlfeld zur Verfügung, mit dem das übergeordnete Element (Parent) einer Aufgabe geändert werden kann. Es lädt alle Aufgaben, die im Gantt-Diagramm angezeigt werden, mit der Möglichkeit, Filterregeln anzuwenden und die Anzeige der Werte zu individualisieren. Abgesehen von diesen Funktionen verhält es sich wie das Steuerelement [Select Control](guides/select.md).

![parent_control](/img/parent_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)


## Initialisierung

Um das **parent**-Steuerelement im Lightbox-Dialog einzubinden, gehen Sie wie folgt vor:

1) Fügen Sie einen Abschnitt zur Lightbox-Konfiguration hinzu:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
       {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"},   /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~
  
2) Definieren Sie ein Label für den Abschnitt:

~~~js
gantt.locale.labels["section_parent"] = "Parent task";
~~~
  

[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)
  


## Eigenschaften

Hier sind einige wichtige Eigenschaften, die häufig mit dem **parent**-Steuerelement verwendet werden (die vollständige Liste finden Sie [hier](api/config/lightbox.md)):

- **name** - (*string*) der Name des Abschnitts 
- **height** - (*number*) die Höhe des Abschnitts
- **map_to** - (*string*) der Name der Daten-Eigenschaft, die diesem Abschnitt zugeordnet ist
- **type** - (*string*) der [Typ des Abschnitt-Steuerelements](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) wenn auf *true* gesetzt, erhält der Abschnitt beim Öffnen der Lightbox den Fokus
- **allow_root** - (*boolean*) wenn "true", enthält die Optionsliste eine Option, um die Root-Ebene als übergeordnete Aufgabe zu setzen; wird zusammen mit **root_label** verwendet
- **root_label** - (*string*) Bezeichnung für die Root-Level-Option; wird mit **allow_root** verwendet
- **filter** - (*function*) eine [Filterfunktion für die Optionsauswahl](guides/parent.md#optionsfiltering). Sie erhält die task id und das task Objekt als Argumente
- **sort** - (*function*) eine [Sortierfunktion für die Optionsauswahl](guides/parent.md#optionssorting)
- **template** - (*function*) eine Template-Funktion zur individuellen Darstellung der Optionsauswahl
  

## Optionen filtern

Um zu steuern, welche Optionen im **parent**-Steuerelement angezeigt werden, verwenden Sie die **filter**-Eigenschaft:

**Filtern. Es werden nur Aufgaben der 1. Ebene angezeigt**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent",  filter:function(id, task){ /*!*/
         if(task.$level > 1){         /*!*/
            return false;     /*!*/
        }else{  /*!*/
            return true; /*!*/
        } /*!*/
    }},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)


Die **filter**-Funktion erhält zwei Parameter:

- **id**  - (*string, number*) die ID der Aufgabe
- **task** - (*object*) das Aufgabenobjekt

und gibt zurück:

- *true*, um die Aufgabe in der Optionsliste anzuzeigen
- *false*, um sie auszublenden


## Optionen sortieren

Um die Reihenfolge der Optionen im **parent**-Steuerelement zu bestimmen, verwenden Sie die **sort**-Eigenschaft:

**Sortieren der Aufgaben nach der Länge des Titels**
~~~js
function sortByLength(a,b){
    a = a.text.length();
    b = b.text.length();
    return a>b?1:(a<b?-1:0);
};
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent",  sort:sortByLength}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Die **sort**-Funktion vergleicht jeweils zwei benachbarte Elemente und gibt zurück:

- 1 - das erste Element soll vor dem zweiten erscheinen
- -1 - das zweite Element soll vor dem ersten erscheinen
- 0 - die Reihenfolge beider Elemente bleibt unverändert

## Template für Optionen

Um die Darstellung der Optionen im **parent**-Steuerelement zu individualisieren, verwenden Sie die **template**-Eigenschaft:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent",  template(start,end,ev){/*!*/
        var title = ev.id+"."+ev.text;/*!*/
        return title;/*!*/
    }}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Die **template**-Funktion erhält drei Parameter: 

- **start** - (*Date*) das Startdatum eines Ereignisses
- **end** - (*Date*) das Enddatum eines Ereignisses
- **ev** - (*object*) das Ereignisobjekt

und gibt das formatierte Element für das Steuerelement zurück.


:::note
Wenn die 'template'-Eigenschaft nicht gesetzt ist, werden die Optionen entsprechend dem [task_text](api/template/task_text.md) Template formatiert.
:::

