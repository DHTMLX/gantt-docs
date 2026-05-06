--- 
title: "Elternsteuerung" 
sidebar_label: "Elternsteuerung" 
---

# Elternsteuerung

Eine Auswahlliste zum Ändern des Elternteils einer Aufgabe. Das Steuerelement lädt alle im Gantt-Diagramm dargestellten Aufgaben, Sie können jedoch Filterregeln und die Vorlage für die darstellbaren Werte festlegen. Der Rest ist identisch mit [Select Control](guides/select.md).

![elternsteuerung](/img/parent_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

[Elternauswahl](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)


## Initialisierung

Um die **parent**-Steuerung in das Lightbox-Fenster hinzuzufügen, folgen Sie diesen Schritten:

1) Fügen Sie einen Abschnitt zur Lightbox-Konfiguration hinzu:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
       {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"},   /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~
  
2) Legen Sie eine Bezeichnung für den Abschnitt fest:

~~~js
gantt.locale.labels["section_parent"] = "Parent task";
~~~

[Elternauswahl](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)


## Eigenschaften

Die folgenden Eigenschaften sind für die **parent**-Steuerung (siehe die vollständige Liste [hier](api/config/lightbox.md)) am wichtigsten und werden häufig gesetzt:

- **name** - (*string*) der Abschnittsname 
- **height** - (*number*) die Abschnittshöhe
- **map_to** - (*string*) der Name einer Dateneigenschaft, die dem Abschnitt zugeordnet wird
- **type** - (*string*) der Typ der Abschnittsteuerung
- **focus** - (*boolean*) wenn auf *true* gesetzt, erhält der Abschnitt beim Öffnen des Lightboxes den Fokus
- **allow_root** - (*boolean*) wenn auf "true" gesetzt, enthält die Optionsliste eine zusätzliche Option, die Benutzern erlaubt, die Root-Ebene als Elternteil für Aufgaben festzulegen. Wird in Verbindung mit der **root_label**-Eigenschaft verwendet 
- **root_label** - (*string*) setzt eine Beschriftung für den Root-Ebene-Parent. Wird in Verbindung mit der **allow_root**-Eigenschaft verwendet 
- **filter** - (*function*) legt eine [Filterfunktion für die Auswahloptionen](guides/parent.md#options-filtering) fest. Nimmt die Aufgaben-ID und das Aufgabenobjekt als Parameter
- **sort** - (*function*) legt eine [Sortierfunktion für die Auswahloptionen](guides/parent.md#options-sorting) fest
- **template** - (*function*) legt eine Vorlage für die Auswahloptionen fest
  

## Optionen filtern

Um Optionen im **parent**-Steuerung zu filtern, verwenden Sie die **filter**-Eigenschaft:

**Filtern. Nur Aufgaben der 1. Ebene anzeigen**
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

[Elternauswahl](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)


Die **filter**-Eigenschaft legt eine Filterfunktion fest, die 2 Parameter annimmt:

- **id**  - (*string, number*) die ID der Aufgabe
- **task** - (*object*) das Aufgabenobjekt

und zurückgibt:

- *true*, für eine Aufgabe, die angezeigt werden soll
- *false*, für eine Aufgabe, die aus der Auswahlliste entfernt werden soll


## Optionen sortieren

Um Optionen im **parent**-Steuerung zu sortieren, verwenden Sie die **sort**-Eigenschaft:

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

Die **sort**-Eigenschaft legt eine Sortierfunktion fest, die bei jedem benachbarten Wertepaar aufgerufen wird und 1, -1 oder 0 zurückgibt:

- 1 - das erste Objekt im Paar muss vor dem zweiten stehen
- -1 - das zweite Objekt geht vor dem ersten
- 0 - die Reihenfolge beider Objekte ändert sich nicht


## Vorlage für Optionen

Um die Vorlage der Optionen im **parent**-Steuerung festzulegen, verwenden Sie die **template**-Eigenschaft:

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

Die **template**-Eigenschaft legt eine Funktion fest, die 3 Parameter annimmt: 

- **start** - (*Date*) das Datum, an dem ein Ereignis beginnen soll
- **end** - (*Date*) das Datum, an dem ein Ereignis beendet sein soll
- **ev** - (*object*) das Ereignis-Objekt

und die Vorlage der Optionen im Steuerelement zurückgibt.


:::note
Wenn die 'template'-Eigenschaft nicht angegeben ist, wird das Format der Optionen durch die [task_text](api/template/task_text.md) Vorlage definiert.
:::