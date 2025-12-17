---
title: "Links-Färbung und -Stil"
sidebar_label: "Links-Färbung und -Stil"
---

Links-Färbung und -Stil
================================

Es ist möglich, das Aussehen der Verbindungen zwischen Aufgaben individuell anzupassen, um das gewünschte Erscheinungsbild für Ihr Gantt-Diagramm zu erzielen. Die Verwendung verschiedener Farben für Abhängigkeitsverbindungen hilft den Nutzern, diese leichter zu unterscheiden.

![coloring_links](/img/coloring_links.png)

Es gibt mehrere Möglichkeiten, benutzerdefinierte Stile für Links festzulegen:

1. [Neudefinition der Standard-Link-Vorlage](guides/colouring-lines.md#redefiningthelinkstemplate)
2. [Festlegen von Stilwerten innerhalb der Eigenschaften des Link-Objekts](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject)

Schauen wir uns zunächst die DOM-Struktur eines Links an, um zu verstehen, wie die einzelnen Teile positioniert, dimensioniert, verwendet und standardmäßig gestylt werden.

## Struktur des Link-DOM-Elements {#structureofthelinkdomelement}
----------------------

Das DOM-Element eines Links ist wie folgt aufgebaut:

- **.gantt_task_link**  - besitzt statische Positionierung und keine Größe
    - **.gantt_line_wrapper/gantt_link_arrow/gantt_link_corner** - absolut positioniert
        - **.gantt_link_line_down(/up/right/left)** - statisch innerhalb des Wrappers positioniert
  
Das DOM sieht folgendermaßen aus:

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

Die Bedeutung der einzelnen Teile:

- **gantt_task_link** - Dieses Element hat keine Größe und eine statische Positionierung. Es dient als gemeinsamer Elternelement für alle Link-Teile, was das Anwenden von Stilen erleichtert:

~~~css
.gantt_task_link{
   --dhx-gantt-link-background:red;
} 
~~~

Sie können auf dieses Element auch Klassen aus der [link_class](api/template/link_class.md) Vorlage anwenden.

#### Kritische Verbindungen

Kritische Verbindungen erhalten ihren Stil durch Hinzufügen der **gantt_critical_link** Klasse zum **gantt_task_link** Element.

- **gantt_line_wrapper** steuert die Position und Größe eines Links. Er ist transparent, absolut positioniert und etwas größer als die eigentliche Link-Linie, was die Genauigkeit bei der Auswahl mit der Maus verbessert.

Die Breite dieses Elements wird durch die [link_wrapper_width](api/config/link_wrapper_width.md) Eigenschaft gesteuert:

~~~js
gantt.config.link_wrapper_width = 30;
~~~

- **gantt_link_arrow** stellt den Pfeil am Link dar. Er ist absolut positioniert und kann je nach Richtung eine der folgenden zusätzlichen Klassen haben: 
    - **gantt_link_arrow_right**,
    - **gantt_link_arrow_left**,
    - **gantt_link_arrow_up** oder
    - **gantt_link_arrow_down**.

Aktuell werden nur **gantt_link_arrow_right** und **gantt_link_arrow_down** verwendet.

Die Größe des Pfeils wird durch die [link_arrow_size](api/config/link_arrow_size.md) Eigenschaft festgelegt:

~~~js
gantt.config.link_arrow_size = 8;
~~~

- **gantt_link_line_(dir)** ist der sichtbare Teil der Link-Linie. Ersetzen Sie **dir** entsprechend durch **left**, **right**, **up** oder **down**.

Die Breite dieser Linie kann mit der [link_line_width](api/config/link_line_width.md) Eigenschaft angepasst werden:

~~~js
gantt.config.link_line_width = 3;
~~~

- **gantt_link_corner** ist die abgerundete Ecke der Link-Linie. Der Radius der Ecke wird durch [link_radius](api/config/link_radius.md) festgelegt:

~~~js
gantt.config.link_radius = 2;
~~~

Wenn **gantt.config.link_radius = 1** gesetzt wird, werden die abgerundeten Ecken entfernt.

## Neudefinition der Link-Vorlage {#redefiningthelinkstemplate}


Zur Anpassung von Abhängigkeitsverbindungen wird die [link_class](api/template/link_class.md) Vorlage verwendet. Um beispielsweise Links basierend auf der Priorität einer Aufgabe zu färben, können Sie folgenden Code nutzen:

**Links je nach Abhängigkeitstyp einfärben**
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
Informationen zum Styling weiterer Teile von Abhängigkeitsverbindungen finden Sie in den Vorlagen im Artikel [Templates of Dependency Links](guides/dependency-templates.md).
:::

Die gleiche Methode kann auch auf Aufgaben angewendet werden. Weitere Details finden Sie [hier](guides/colouring-tasks.md#redefiningthetaskstemplate).

## Festlegen der Farbe in der Eigenschaft des Link-Objekts {#specifyingcolorinthepropertiesofthelinkobject}


Sie können einer Abhängigkeitsverbindung auch eine benutzerdefinierte Farbe zuweisen, indem Sie eine Eigenschaft zum Datenobjekt hinzufügen:

- **color** - definiert die Farbe des Links

![link_color_property](/img/link_color_property.png)

:::note
Dies ist eine spezielle Eigenschaft. Gantt prüft, ob ein Link diese Eigenschaft besitzt, und wendet deren Wert auf den Link an. Fehlt sie, wird die Standardfarbe verwendet.
:::

**Die Farbe des Links im Datenobjekt festlegen**
~~~js
var tasks = {
  data:[
     {id:1, text:"Project #1", start_date:"01-04-2013", duration:18},
     {id:2, text:"Task #1",    start_date:"02-04-2013", duration:8, parent:1},
     {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8, parent:1}
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

**Related example:** [Link colors from the "color" property](https://snippet.dhtmlx.com/e5utei5g)

:::note
Wenn Sie eine benutzerdefinierte Farbe über die **color**-Eigenschaft hinzufügen, wird ein Inline-Stil gesetzt, der andere Stile überschreibt. Das bedeutet, dass der kritische Pfad nicht hervorgehoben wird und benutzerdefinierte Stile zur Änderung der Link-Farbe keine Wirkung zeigen.
:::

Um Links als kritisch anzuzeigen, können Sie dieses CSS verwenden:

~~~css
.gantt_critical_link {
  --dhx-gantt-link-background: #e63030 !important;
}
~~~

**Related example:** [Kritische Aufgaben und Links einfärben](https://snippet.dhtmlx.com/xipdml7a)

Wenn eine Eigenschaft eines Link-Objekts gesetzt ist, erhält der Link eine zusätzliche Klasse **"gantt_link_inline_color"**. Diese Klasse kann verwendet werden, um andere Stile für diesen Link zu überschreiben:

~~~css
.gantt_link_inline_color {
    opacity:0.4
}
~~~

Die color-Eigenschaft akzeptiert jedes gültige CSS-Farbformat, zum Beispiel:

~~~js
link.color = "#FF0000";
link.color = "red";
link.color = "rgb(255,0,0)";
~~~

Das gleiche Vorgehen kann auch für Aufgaben verwendet werden. Weitere Informationen finden Sie [hier](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject).

