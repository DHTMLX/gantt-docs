--- 
title: "Link-Färbung und Styling"
sidebar_label: "Link-Färbung und Styling"
---

# Link-Färbung und Styling

Sie können das Styling von Verknüpfungen zwischen Aufgaben ändern, um das gewünschte Aussehen und Gefühl Ihres Gantt-Diagramms zu erreichen. Das Färben von Abhängigkeitsverbindungen in verschiedenen Farben ermöglicht es, sie visuell zu unterscheiden.

![coloring_links](/img/coloring_links.png)

Um einen benutzerdefinierten Stil für Verknüpfungen festzulegen, können Sie eine der folgenden Vorgehensweisen verwenden:

1. [Die Standardvorlage des Links neu definieren](guides/colouring-lines.md#redefiningthelinkstemplate)
2. [Stilwerte in den Eigenschaften des Link-Objekts festlegen](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject)

Zunächst werfen wir einen Blick auf die Elemente der Link-Struktur, um die Logik ihrer Positionierung, Größe, Funktionalität und Standardgestaltung zu verstehen.

## Struktur des Link-DOM-Elements {#structureofthelinkdomelement}

Das DOM-Element des Links hat folgende Struktur:

- **.gantt_task_link**  - statische Positionierung, Nullgröße
    - **.gantt_line_wrapper/gantt_link_arrow/gantt_link_corner** - absolute Positionierung
        - **.gantt_link_line_down(/up/right/left)** - statische Positionierung innerhalb des Wrapper-Elements
  
Das DOM sieht wie folgt aus:

~~~html
<div class="gantt_task_link" link_id="3">
    <div class="gantt_line_wrapper">
        <div class="gantt_link_line_left"></div>
      </div>
    <div class="gantt_line_wrapper">
        <div class="gantt_link_line_left"></div>
      </div>
    <div class="gantt_link_corner gantt_link_corner_left_down"></div>
    <div class="gantt_line_wrapper">
        <div class="gantt_link_line_down"></div>
      </div>
    <div class="gantt_link_corner gantt_link_corner_down_right"></div>
    <div class="gantt_line_wrapper">
        <div class="gantt_link_line_right"></div>
      </div>
    <div class="gantt_link_arrow gantt_link_arrow_right"></div>
</div>
~~~

wobei: 

- **gantt_task_link** - das Element mit nuller Größe und statischer Positionierung. Es wird als gemeinsamer Elternteil für alle Teile des Links verwendet, zum Beispiel, um Stile anzuwenden:

~~~css
.gantt_task_link{
   --dhx-gantt-link-background:red;
} 
~~~ 

Sie können Klassen aus der [link_class](api/template/link_class.md) Vorlage auf dieses Element anwenden. 

#### Kritische Links

Die Gestaltung kritischer Links wird definiert, indem die Klasse **gantt_critical_link** dem **gantt_task_link**-Element hinzugefügt wird.

- **gantt_line_wrapper** ist verantwortlich für Position und Größe eines Links. Es ist transparent, absolut positioniert und etwas größer als die Link-Linie, was die Link-Auswahl mit dem Mauszeiger erleichtert. 

Die Breite dieses Elements wird durch die [link_wrapper_width](api/config/link_wrapper_width.md) Konfigurationseigenschaft festgelegt.

~~~js
gantt.config.link_wrapper_width = 30;
~~~

- **gantt_link_arrow** - der Link-Pfeil. Er ist absolut positioniert. Je nach Richtung, in die der Pfeil zeigt, kann das Element eine entsprechende zusätzliche Klasse haben: 
    - **gantt_link_arrow_right**,
    - **gantt_link_arrow_left**,
    - **gantt_link_arrow_up**, oder
    - **gantt_link_arrow_down**.

Derzeit werden nur **gantt_link_arrow_right** und **gantt_link_arrow_down** verwendet.

Die Größe des Elements **gantt_link_arrow** wird durch die [link_arrow_size](api/config/link_arrow_size.md) Konfigurationseigenschaft festgelegt.

~~~js
gantt.config.link_arrow_size = 8;
~~~


- **gantt_link_line_(dir)** -  das sichtbare Element eines Links. Verwenden Sie **left/right/up/down** statt des **dir**-Teils des Elementnamens.

Die Breite dieses Elements kann über die [link_line_width](api/config/link_line_width.md) Konfigurationseigenschaft geändert werden:

~~~js
gantt.config.link_line_width = 3;
~~~ 

- **gantt_link_corner** -  die abgerundete Ecke einer Link-Linie. Der Radius der Ecke wird von [link_radius](api/config/link_radius.md) festgelegt:

~~~js
gantt.config.link_radius = 2;
~~~

Das Festlegen von **gantt.config.link_radius = 1** entfernt abgerundete Ecken. 


## Neudefinition der Link-Vorlage {#redefiningthelinkstemplate}

Um Abhängigkeitsverbindungen zu stylen, verwenden Sie die [link_class](api/template/link_class.md) Vorlage. Beispielsweise, um Verbindungen abhängig von der Priorität der Aufgaben zu färben, verwenden Sie den Code wie folgt:

**Coloring links depending on the dependency type**
~~~js
gantt.templates.link_class = function(link){
    var types = gantt.config.links;
    switch (link.type){
        case types.finish_to_start:
            return "finish_to_start";
            break;
        case types.start_to_start:
            return "start_to_start";
            break;
        case types.finish_to_finish:
            return "finish_to_finish";
            break;
        case types.start_to_finish:
            return "start_to_finish";
            break;
    }
};
~~~


[Link styles](https://docs.dhtmlx.com/gantt/samples/04_customization/03_link_styles.html)


:::note
Um andere Elemente von Abhängigkeitsverbindungen zu stylen, verwenden Sie die Vorlagen aus dem Artikel [Templates of Dependency Links](guides/dependency-templates.md).
::: 

Eine ähnliche Vorgehensweise kann auch auf Aufgaben angewendet werden. Lesen Sie mehr darüber [hier](guides/colouring-tasks.md#redefiningthetaskstemplate).


## Festlegen der Farbe in der Eigenschaft des Link-Objekts {#specifyingcolorinthepropertiesofthelinkobject}

Um eine benutzerdefinierte Farbe für einen Abhängigkeits-Link festzulegen, können Sie dem Datenobjekt eine zusätzliche Eigenschaft hinzufügen:

- **color** - Die Farbe des Links 

![link_color_property](/img/link_color_property.png)

:::note
Hinweis, dies ist eine spezielle Eigenschaft. Standardmäßig prüft Gantt, ob ein Link diese Eigenschaft besitzt, und wendet den entsprechenden Wert auf den Link an. Andernfalls wird die vordefinierte Farbe angewendet.
:::

**Festlegen der Link-Farbe im Datenobjekt**
~~~js
var tasks = {
  data:[
     {id:1, text:"Projekt #1", start_date:"01-04-2013", duration:18},
     {id:2, text:"Aufgabe #1",    start_date:"02-04-2013", duration:8, parent:1},
     {id:3, text:"Aufgabe #2",    start_date:"11-04-2013", duration:8, parent:1}
  ],
  links:[
     {id:1, source:1, target:2, type:"1", color:"red"}, /*!*/
     {id:2, source:2, target:3, type:"0", color:"blue"},/*!*/
     {id:3, source:3, target:4, type:"0", color:"blue"},/*!*/
     {id:4, source:2, target:5, type:"2", color:"green"}/*!*/
  ]
};

gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getLink(4).color = "green";
~~~ 

**Beispiel** [Linkfarben aus der "color"-Eigenschaft](https://snippet.dhtmlx.com/e5utei5g)

:::note
Das Hinzufügen einer benutzerdefinierten Farbe über die **color**-Eigenschaft wird von dem Hinzufügen eines Inline-Stils gefolgt, der die höchste Priorität unter anderen Stilen hat. Folglich wird der kritische Pfad nicht hervorgehoben, und jeder benutzerdefinierte Stil, den Sie hinzugefügt haben, um die Link-Farbe zu ändern, wird nicht angewendet.
:::

Um die Verbindungen kritisch aussehen zu lassen, können Sie folgenden Code verwenden:

~~~css
.gantt_critical_link {
  --dhx-gantt-link-background: #e63030 !important;
}
~~~

Beispiel [Beispiel](https://snippet.dhtmlx.com/xipdml7a) 

Wenn mindestens eine Eigenschaft eines Link-Objekts festgelegt ist, erhält der Link zusätzlich die Klasse **"gantt_link_inline_color"**. Sie können diese Klasse verwenden, um andere Stile für den Link zu überschreiben:

~~~css
.gantt_link_inline_color {
    opacity:0.4
}
~~~

Die Eigenschaften können jeden gültigen CSS-Farbwert haben, z.B. alle folgenden Notationen sind gültig:

~~~js
link.color = "#FF0000";
link.color = "red";
link.color = "rgb(255,0,0)";
~~~

Eine ähnliche Vorgehensweise kann auch auf Aufgaben angewendet werden. Lesen Sie mehr darüber [hier](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject).