---
title: "Mit Gantt-Stilen arbeiten"
sidebar_label: "Mit Gantt-Stilen arbeiten"
---

# Mit Gantt-Stilen arbeiten


dhtmlxGantt bietet eine Vielzahl von Optionen, um das Erscheinungsbild individuell anzupassen. Sie können entweder [eine der vordefinierten Skins anwenden, um das Gesamterscheinungsbild des Gantt-Diagramms zu ändern](guides/skins.md), oder das Styling einzelner Elemente wie Aufgaben, Verbindungen, Zeitskala, Raster und mehr anpassen.

Dieser Leitfaden fasst allgemeine Anweisungen zum Styling verschiedener Teile des Gantt-Diagramms zusammen, um Ihnen die Navigation in der Dokumentation zu erleichtern. Ausführliche Informationen zu jedem spezifischen Element finden Sie in den entsprechenden Artikeln.

## Styling des Rasters


Das Styling des Rasterbereichs kann über die entsprechende [Templates of the Grid](guides/table-templates.md) angepasst werden.

### Kopfzeilen der Rasterspalten

Es gibt eine [grid_header_class](api/template/grid_header_class.md)-Vorlage, mit der Sie benutzerdefinierte Stile auf die Kopfzeilen der Rasterspalten anwenden können. Beispielsweise können Sie die Hintergrundfarbe bestimmter Kopfzeilen wie folgt ändern:

~~~js
<style>
      .updColor{
        background-color:#ffeb8a!important;
      }
</style>
~~~

~~~js
gantt.templates.grid_header_class = function(columnName, column){
  if(columnName == 'duration' ||columnName == 'text')
    return "updColor";
};
~~~

![styling_columns_headers](/img/styling_columns_headers.png)

**Related example:** [Styling Headers of Grid Columns](https://snippet.dhtmlx.com/j01gqhtj)

### Benutzerdefinierte Elemente in der Rasterkopfzeile

Sie können benutzerdefinierte Elemente wie Buttons, Icons oder Eingabefelder in die Rasterkopfzeile einfügen. Dazu setzen Sie das HTML-Element als Wert der **label**-Eigenschaft innerhalb der [**gantt.config.columns**](api/config/columns.md)-Konfigurationsoption:

~~~js
gantt.config.columns = [
  {name:"add", label:"", width:50, align:"left" },
  {name:"text", label:"<div class='searchEl'>Task name <input id='search' type='text'"+   /*!*/
      "placeholder='Search tasks...'></div>", width:250, tree:true},                          /*!*/
    // andere Spalten
];
~~~

So wird die Suchfunktion umgesetzt:

~~~js 
var inputEl = document.getElementById('search');

inputEl.oninput = function(){
  gantt.refreshData();
}

function hasSubstr(parentId){
  var task = gantt.getTask(parentId);
  if(task.text.toLowerCase().indexOf(inputEl.value.toLowerCase() ) !== -1)
    return true;

  var child = gantt.getChildren(parentId);
  for (var i = 0; i < child.length; i++) {
    if (hasSubstr(child[i]))
      return true;
  }
  return false;
}

gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
  if (hasSubstr(id))
    return true;
  
      return false;
});
~~~

![custom_elements_grid_header](/img/custom_elements_grid_header.png)

**Related example:** [Custom Elements in Grid Header](https://snippet.dhtmlx.com/8jilpcrg)

#### Icons und Bilder in der Rasterkopfzeile

Um ein Bild oder Icon in die Kopfzeile einzufügen, können Sie es über die **label**-Eigenschaft ins HTML der Zelle einfügen:

~~~js
var textLabel = [
    "<div class='gantt-text-label'>"+
    "<img src='http://docs.dhtmlx.com/scheduler/assets/index/icon1.png'>"+
    "<span>Text</span>" +
    "</div>"
].join("");

gantt.config.columns = [
    {name: "text", label:textLabel,tree: true, width: '*', resize: true},
    {name: "start_date", align: "center", resize: true},
    {name: "duration", align: "center"},
    {name: "add", width: 44}
];
~~~

**Related example:** [Images in Grid Header: Columns Config](https://snippet.dhtmlx.com/5/55086fc42)

Alternativ können Sie eine Kopfzeilenzelle in CSS mit dem **.gantt_grid_head_<columnName>**-Selektor gestalten:

~~~css
.gantt_grid_head_text  {
    background-image:url('http://docs.dhtmlx.com/scheduler/assets/index/icon1.png');
    background-repeat:no-repeat;  
}
~~~

![custom_elements_grid_header_image](/img/custom_elements_grid_header_image.png)

**Related example:** [Images in Grid Header:CSS](https://snippet.dhtmlx.com/5/e13d18a10)

### Mehrzeiliger Text in der Rasterkopfzeile

Siehe das Beispiel im Abschnitt [Wie mehrere Zeilen in der Rasterzelle/Kopfzeile anzeigen](guides/how-to.md#howtodisplayseverallinesinthegridcellheader).

### Hintergrundfarbe der Rasterzeilen 

Sie können die Hintergrundfarbe für alle oder bestimmte Rasterzeilen mit Aufgaben über die [grid_row_class](api/template/grid_row_class.md)-Vorlage anpassen. Zum Beispiel, um die Hintergrundfarbe einer bestimmten Zeile zu ändern:

~~~js
<style>
  .updColor{
      background-color:#ffeb8a!important;  
  }
</style>
~~~

~~~js
gantt.templates.grid_row_class = function(start, end, task){
 if(task.id == 12)
    return "updColor";
};
~~~

![grid_row_bg](/img/grid_row_bg.png)

**Related example:** [Coloring Grid Rows](https://snippet.dhtmlx.com/y0dbph4x)

### Farbe der Rasterzeilen beim Überfahren mit der Maus

Um eine Rasterzeile beim Überfahren hervorzuheben, wenden Sie folgende Stilregeln an:

~~~js
.gantt_grid_data .gantt_row.odd:hover, .gantt_grid_data .gantt_row:hover,
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected{
    background-color: cyan; 
}
~~~

![grid_row_hover_color](/img/grid_row_hover_color.png)

**Related example:** [Coloring Grid Rows on Hover](https://snippet.dhtmlx.com/730ig4ck)

### Anpassung der Rasterspalten {#customizationgridcolumns}

dhtmlxGantt ermöglicht es Ihnen, das Standard-Erscheinungsbild der Rasterspalten über das **template**-Attribut der [**gantt.config.columns**](api/config/columns.md)-Konfigurationsoption zu individualisieren.

Das **template**-Attribut ist eine Funktion, die ein Datenobjekt erhält und den endgültigen Inhalt zurückgibt. Dadurch sind nahezu alle Arten von Inhaltsanpassungen möglich. Beispielsweise können Sie die Textfarbe in Rasterzeilen ändern oder benutzerdefinierte Elemente in Rasterspalten verwenden.

#### Textfarbe in den Rasterzeilen

Um die Textfarbe von Aufgaben je nach Priorität anzupassen, können Sie Folgendes tun:

~~~js
gantt.config.columns="["
    {name:"text",       label:"Task name",  tree:true, width:230, template:myFunc },   /*!*/
    {name:"start_date", label:"Start time", align: "center" },
    {name:"duration",   label:"Duration",   align: "center" }
];

function myFunc(task){
    if(task.priority ==1)
        return "<div class='important'>"+task.text+" ("+task.users+") </div>";
    return task.text+" ("+task.users+")";
};
~~~

![columns_text_color](/img/columns_text_color.png)


[Template for tree nodes](https://docs.dhtmlx.com/gantt/samples/04_customization/05_tree_template.html)


#### Benutzerdefinierte Elemente in den Rasterspalten

Um benutzerdefinierte Elemente wie Buttons oder Eingabefelder in Rasterspalten einzufügen, setzen Sie das HTML-Element als **template**-Attribut der Spalte:

~~~js
var colContent = function (task) {
    return ('<i class="fa gantt_button_grid gantt_grid_edit fa-pencil"'+
                'onclick="clickGridButton(' + task.id + ', 'edit')"></i>' +
            '<i class="fa gantt_button_grid gantt_grid_add fa-plus"'+
                'onclick="clickGridButton(' + task.id + ', 'add')"></i>' +
            '<i class="fa gantt_button_grid gantt_grid_delete fa-times"'+
                'onclick="clickGridButton(' + task.id + ', 'delete')"></i>');
};

gantt.config.columns = [
    {name: "text", tree: true, width: '*', resize: true},
    {name: "start_date", align: "center", resize: true},
    {name: "duration", align: "center"},
    {name: "buttons", label: colHeader, width: 75, template: colContent}  /*!*/
];
~~~

![custom_elements_grid_columns](/img/custom_elements_grid_columns.png)


[Custom Buttons in a Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/07_custom_buttons.html)


#### Langen Text mit Auslassungszeichen in Rasterspalten abschneiden

Gantt kürzt langen Text in Rasterzeilen automatisch.

Ab Version 7.0 können Sie langen Inhalt in Rasterzeilen mit Auslassungszeichen abschneiden, indem Sie die zugehörige CSS-Klasse **.gantt_tree_content** anpassen:

~~~js
<style>
.gantt_tree_content {
    overflow:hidden;
    text-overflow: ellipsis;
}
</style>

gantt.init("gantt_here");
~~~

![truncate_text](/img/truncate_text.png)

**Related example:** [Truncate long text with ellipsis](https://snippet.dhtmlx.com/d82twxd8)

#### Mehrzeiliger Text in Rasterzellen

Siehe die Beispiele im Abschnitt [Wie mehrere Zeilen in der Rasterzelle/Kopfzeile anzeigen](guides/how-to.md#howtodisplayseverallinesinthegridcellheader).

## Styling der Zeitskala


Das Styling der Zeitskala wird über die entsprechenden [Vorlagen des Zeitachsenbereichs](guides/timeline-templates.md) gesteuert.

### Skalenzeile

Sie können die Skalenzeile mit der **scale_row_class**-Vorlage gestalten. Zum Beispiel, um eine Hintergrundfarbe zu setzen:

~~~js
<style>
  .updColor{
      background-color:#ffeb8a!important      
  }
</style>
~~~

~~~js
gantt.templates.scale_row_class = function(scale){           
    return "updColor";
}
~~~

![color_scale_row](/img/color_scale_row.png)
 
**Related example:** [Styling Row of the Scale](https://snippet.dhtmlx.com/7ngm6yzk)

### Skalenzellen 

Sie können auch bestimmte Skalenzellen mit der **scale_cell_class**-Vorlage gestalten. Zum Beispiel, um Wochenenden im Zeitachsenbereich hervorzuheben:

~~~js
gantt.templates.scale_cell_class = function(date){
    if(date.getDay()==0||date.getDay()==6){
        return "updColor";
    }
};
~~~

![styling_scale_cells](/img/styling_scale_cells.png)

**Related example:** [Styling Separate Cells on the Scale](https://snippet.dhtmlx.com/emdjgwln)

Weitere Details finden Sie in [Setting up Scale](guides/configuring-time-scale.md#settingthescalesstyle) und [Highlighting Time Slots](guides/highlighting-time-slots.md).

### Unterskala

Über das **css**-Attribut der [scales](api/config/scales.md)-Eigenschaft kann einer Skala ein neuer Stil zugewiesen werden. Zum Beispiel, um Wochenenden besonders einzufärben:

~~~js
<style type="text/css">
    .weekend{
        background: #F0DFE5 !important;
    }
</style>
~~~

~~~js
var daysStyle = function(date){
    var dateToStr = gantt.date.date_to_str("%D");
    if (dateToStr(date) == "Sun"||dateToStr(date) == "Sat")  return "weekend";

    return "";
};

gantt.config.scales = [
    {unit:"day", format:"%D", css:daysStyle }
];
~~~

![styling_subscale](/img/styling_subscale.png)


[Multiple scales](https://docs.dhtmlx.com/gantt/samples/03_scales/01_multiple_scales.html)


## Styling von Aufgaben


Das Styling von Aufgaben kann über die entsprechenden [Vorlagen des Zeitachsenbereichs](guides/timeline-templates.md) angepasst werden.

### Aufgabenbalken

Sie können die [task_class](api/template/task_class.md)-Vorlage neu definieren, um Aufgabenstile zu aktualisieren. Weitere Informationen finden Sie unter [Tasks Coloring](guides/colouring-tasks.md#redefiningthetaskstemplate).

~~~js
gantt.templates.task_class = function(start, end, task){return "";};
~~~

![coloring_tasks](/img/coloring_tasks.png)


[Task styles](https://docs.dhtmlx.com/gantt/samples/04_customization/04_task_styles.html)


Vorlagen unterstützen dynamisches Styling. Zum Beispiel können Sie Farben je nach Fortschritt der Aufgabe ändern:

~~~js
gantt.templates.task_class = function(start,end,task){
    if(task.progress > 0.5){
        return "";
    }else{
        return "important";
    }
};
~~~

![dynamic_styling](/img/dynamic_styling.png)


[Styling task bars with events](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)


### Text im Aufgabenbalken

Die [task_text](api/template/task_text.md)-Vorlage ermöglicht Inline-Styling des Textes im Aufgabenbalken:

~~~js
gantt.templates.task_text = function(start, end, task){
  if(task.id == 12)
    return "<span style='color:red'>"+task.text+"</span>";
  
  return task.text;
};
~~~

![inline_styling_task_text](/img/inline_styling_task_text.png)

**Related example:** [Inline Styling of the Task Text](https://snippet.dhtmlx.com/us1g45wg)

#### Mehrzeiliger Text

Siehe das [Beispiel](https://snippet.dhtmlx.com/55uy7ibo) im Abschnitt [Wie mehrere Zeilen in der Rasterzelle/Kopfzeile anzeigen](guides/how-to.md#howtodisplayseverallinesinthegridcellheader).

### Benutzerdefinierte Elemente in Aufgabenbalken

Benutzerdefinierte Elemente können auch innerhalb von Aufgabenbalken mit der [task_text](api/template/task_text.md)-Vorlage eingefügt werden. Zum Beispiel können Buttons wie folgt hinzugefügt werden:

~~~js
gantt.templates.task_text = function(start, end, task){  
  return task.text+" <button>Text</button>";    
};
~~~

![custom_elements_task_bars](/img/custom_elements_task_bars.png)

**Related example:** [Custom Elements in Task Bars](https://snippet.dhtmlx.com/fahpyr58)

### Stil über Eigenschaften eines Aufgabenobjekts festlegen

Sie können die Farbe einer Aufgabe anpassen, indem Sie zusätzliche Eigenschaften zur Aufgabenobjekt-Konfiguration hinzufügen. Die verfügbaren Eigenschaften sind: **color**, **textColor** und **progressColor**.

~~~js
var tasks = {
  data:[
     {id:1, text:"Project #1", start_date:"01-04-2013", duration:18, color:"red"},
     {id:2, text:"Task #1", start_date:"02-04-2013", 
        duration:8, color:"blue", parent:1}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.getTask(1).color = "red"
~~~

Weitere Informationen finden Sie im entsprechenden Abschnitt des Artikels [Tasks Coloring](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject).

### Taskleisten über das Lightbox stylen

Sie können eine Liste vordefinierter Farben einrichten und diese als Optionen in der Lightbox-Konfiguration einbinden. Dadurch können Sie Aufgaben Text- oder Hintergrundfarben zuweisen:

~~~js
var colors = [
    {key:"", label:"Default"},
    {key:"#4B0082",label:"Indigo"},
    {key:"#FFFFF0",label:"Ivory"},
    {key:"#F0E68C",label:"Khaki"}
    // more colors
];

gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", height:22, map_to:"color", type:"select", options:colors},
    {name:"textColor", height:22, map_to:"textColor", type:"select", options:colors},
    {name:"time", type:"duration", map_to:"auto"}
];
~~~

![task_style_property](/img/task_style_property.png)


[Specify inline colors for Tasks and Links](https://docs.dhtmlx.com/gantt/samples/04_customization/16_inline_task_colors.html)


### Zeilen im Zeitachsenbereich

Mit der [task_row_class](api/template/task_row_class.md) Vorlage können Sie die Farbe der Zeitachsenzeilen hinter den Gantt-Aufgaben anpassen.

~~~js
gantt.templates.task_row_class = function(start, end, task){
  if(task.id == 12)
      return "updColor";
};
~~~

![styling_timeline_row](/img/styling_timeline_row.png)

**Related example:** [Styling Rows of the Timeline Area](https://snippet.dhtmlx.com/33jfmwsp)


[Custom tree formatting](https://docs.dhtmlx.com/gantt/samples/04_customization/02_custom_tree.html)


### Hervorheben von Zeitachsen-Zellen

Sie können bestimmte Zeitachsen-Zellen, z. B. nach Wochentagen, mit der **timeline_cell_class** Vorlage hervorheben. Diese Template-Funktion durchläuft die Zellen und wendet eine CSS-Klasse auf die ausgewählten an. Beispielsweise lassen sich Wochenenden wie folgt hervorheben:

~~~js
<style>
    .weekend{
        background: #f4f7f4;
    }    
</style>
~~~

~~~js
gantt.templates.timeline_cell_class = function(item,date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend"
    }
};
~~~

![styling_timeline_cells](/img/styling_timeline_cells.png)


[Highlighting weekends](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)


Weitere Informationen finden Sie im Artikel [Highlighting Time Slots](guides/highlighting-time-slots.md).

### Externe Elemente anzeigen (Baselines, Deadlines, etc.)

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Sie können zusätzliche Elemente wie Baselines oder Deadline-Markierungen zum Gantt-Diagramm hinzufügen. Erstellen Sie dazu eine neue Darstellungsebene mit der [addTaskLayer](api/method/addtasklayer.md) Methode und fügen Sie dort Ihre benutzerdefinierten Elemente hinzu. Die Methode akzeptiert eine Funktion, die ein Aufgabenobjekt erhält und entweder ein DOM-Element zum Anzeigen oder *false* zurückgibt, um das Element für diese Aufgabe auszublenden:

~~~js
gantt.addTaskLayer(function myNewElement(task) {
    var el = document.createElement('div');
    // your code
    return el;
});
~~~

Beispiele für solche externen Elemente sind:

- Baselines

![show_baselines](/img/show_baselines.png)


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


- Deadlines

![show_deadlines](/img/show_deadlines.png)


[Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


Weitere Details finden Sie im Artikel [Custom Elements in Timeline Area](guides/baselines.md).

### Tooltips für Aufgaben

Tooltips bieten eine kompakte Möglichkeit, Aufgabendetails anzuzeigen.

![default_task_tooltip](/img/default_task_tooltip.png)

Standardmäßig erscheinen Tooltips für Aufgaben, wenn Sie das [tooltip](guides/extensions-list.md#tooltip) Plugin aktivieren.

#### Benutzerdefinierter Text für Tooltips

Um den Tooltip-Text anzupassen, verwenden Sie die [tooltip_text](api/template/tooltip_text.md) Vorlage:

~~~js
gantt.templates.tooltip_text = function(start,end,task){
    return "<b>Task:</b> "+task.text+"

<b>Duration:</b> " + task.duration;
};
~~~

Mehr zu Tooltips finden Sie im Artikel [Tooltips for Gantt Elements](guides/tooltips.md).

## Links stylen


Sie können das Aussehen von Abhängigkeitslinien mit den Ressourcen aus [Templates of Dependency Links](guides/dependency-templates.md) anpassen.

### Linien der Abhängigkeitslinks

Mit der [link_class](api/template/link_class.md) Vorlage können Sie die Farbe der Abhängigkeitslinien ändern.

~~~js
gantt.templates.link_class = function(link){
    return "";
};
~~~

![coloring_links](/img/coloring_links.png)


[Link styles](https://docs.dhtmlx.com/gantt/samples/04_customization/03_link_styles.html)


Weitere Informationen finden Sie im Artikel [Links Coloring and Styling](guides/colouring-lines.md).

### Linkfarbe über die Eigenschaft eines Link-Objekts festlegen

Sie können auch eine benutzerdefinierte Farbe für einen Abhängigkeitslink festlegen, indem Sie die **color** Eigenschaft zum Link-Objekt hinzufügen:

~~~js
var tasks = {
  data:[
     // tasks configuration
  ],
  links:[
     {id:1, source:1, target:2, type:"1", color:"red"}, 
     {id:2, source:2, target:3, type:"0", color:"blue"}
  ]
};
 
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.getLink(2).color = "blue";
~~~

Weitere Details finden Sie im Abschnitt [Links Coloring and Styling](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject).

### Linkfarbe beim Überfahren mit der Maus

Sie können die Farbe eines Links beim Überfahren mit der Maus per CSS ändern:

~~~js
.gantt_task_link:hover .gantt_line_wrapper div{
    box-shadow: 0 0 5px 0 yellowgreen;
    background: yellowgreen
}
  
.gantt_task_link:hover .gantt_link_arrow_left,
.gantt_task_link:hover .gantt_link_arrow_right{
    border-left-color: yellowgreen !important;
    border-right-color: yellowgreen !important;
}
~~~

**Related example:** [Link color on hover](https://snippet.dhtmlx.com/z3friavt)

![link_hover_color](/img/link_hover_color.png)

Mehr Details finden Sie im Artikel [Links Coloring and Styling](guides/colouring-lines.md).

### Popups für Abhängigkeitslinks

Mit der [drag_link_class](api/template/drag_link_class.md) Vorlage können Sie das Popup stylen, das beim Ziehen einer Abhängigkeitslinie zwischen Aufgaben angezeigt wird. Sie können zum Beispiel Hintergrund- und Textfarbe des Popups anpassen:

~~~js
<style>
  .gantt_link_tooltip{color:red; background-color:yellow} 
</style> 
~~~

~~~js
gantt.templates.drag_link_class = function(from, from_start, to, to_start) {
    return "gantt_link_tooltip" ;
};
~~~

![styling_link_popup](/img/styling_link_popup.png)

**Related example:** [Styling the Popup of Dependency Link](https://snippet.dhtmlx.com/7o5f261z)

Mehr Informationen finden Sie im Artikel [Templates of Dependency Links](guides/dependency-templates.md).

### Link-Werte über die UI bearbeiten

Während es Lightboxes zum Bearbeiten und Stylen von Taskleisten gibt, existiert keine integrierte UI zum Bearbeiten von Links. Sie können jedoch ein eigenes Interface erstellen, indem Sie dem Ansatz im 
[dedicated article](guides/crud-dependency.md#editinglinkvaluesfromui) folgen.

![link_edit_ui](/img/link_edit_ui.png)

**Related example:** [Custom UI for Editing Link Values](https://snippet.dhtmlx.com/2208ic0t)

## Styling des Quick Info Popups


Das Styling des Quick Info Popups wird über die [Templates of the 'Quick Info' Extension (Touch Support)](guides/touch-templates.md) Templates gesteuert.

Sie können das Editierformular des Popups mit der [quick_info_class](api/template/quick_info_class.md) Vorlage stylen. Zum Beispiel, um Quick Info Popups für bestimmte Aufgaben zu gestalten:

~~~js
<style>
  .updColor{
      background-color:#ffeb8a!important;
  }
  .updColor .gantt_cal_qi_title{
      background-color:#ffeb8a!important;
  }
</style>
~~~

~~~js
gantt.templates.quick_info_class = function(start, end, task){ 
  if(task.id == "12")
    return "updColor";
  
      return ""
};
~~~

![styling_quick_info](/img/styling_quick_info.png)

**Related example:** [Styling Quick Info Popup](https://snippet.dhtmlx.com/b92gyqwu)

