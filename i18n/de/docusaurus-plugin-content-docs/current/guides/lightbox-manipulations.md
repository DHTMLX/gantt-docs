---
title: "Arbeiten mit Lightbox-Elementen"
sidebar_label: "Arbeiten mit Lightbox-Elementen"
---

# Arbeiten mit Lightbox-Elementen

## Abrufen/Setzen des Kontrollwerts

Um den Wert eines Lightbox-Controls abzurufen oder zu aktualisieren, verwenden Sie die Methode [getLightboxSection](api/method/getlightboxsection.md) wie folgt:

~~~js
// Wert abrufen
var value = gantt.getLightboxSection('description').getValue();

// Wert setzen
gantt.getLightboxSection('description').setValue('abc');
~~~

## Überprüfen, ob die Lightbox geöffnet ist

Um herauszufinden, ob die Lightbox aktuell geöffnet oder geschlossen ist, prüfen Sie die **lightbox**-Eigenschaft des Statusobjekts, das von der Methode [getState](api/method/getstate.md) zurückgegeben wird.

 Wenn die Lightbox geöffnet ist, gibt die Methode die ID der geöffneten Aufgabe zurück; andernfalls wird 'null' oder 'undefined' zurückgegeben.

~~~js
if (gantt.getState().lightbox){
    // Code, wenn die Lightbox geöffnet ist
} else {
    // Code, wenn die Lightbox geschlossen ist
}
~~~

## Datenattribute Lightbox-Abschnitten zuordnen

Um ein Datenattribut einem Lightbox-Abschnitt zuzuordnen, verwenden Sie das Attribut **map_to** im Abschnittsobjekt:

~~~js
// weist den Abschnitt "holders" einem Datenattribut namens "holder" zu 
gantt.config.lightbox.sections = [
    {name:"description", height:38, type:"textarea", map_to:"text", focus:true},
    {name:"holders",     height:22, type:"textarea", map_to:"holder"},      /*!*/                                                                
    {name:"time",         height:72, type:"duration", map_to:"auto"}
];
~~~

## Standardwert für ein Lightbox-Control festlegen

Um einen Standardwert für einen Lightbox-Abschnitt anzugeben, verwenden Sie die Eigenschaft **default_value** im Abschnittsobjekt.

Wenn Sie beispielsweise einen benutzerdefinierten "Priority"-Abschnitt zur Lightbox hinzufügen, der die Priorität einer Aufgabe anzeigt, bleibt das Feld beim Erstellen eines neuen Ereignisses leer. Um einen Standardwert wie z.B. niedrige Priorität festzulegen, konfigurieren Sie die Lightbox wie folgt:

~~~js
var opts = [
    { key:1, label: "High" },                                            
    { key:2, label: "Normal" },                                         
    { key:3, label: "Low" }                                            
];

gantt.config.lightbox.sections = [
    {name:"description", height:38, type:"textarea", map_to:"text",    focus:true},
    {name:"priority",      height:22, type:"select",      map_to:"priority",  /*!*/  
    options:opts, default_value:3},      /*!*/                                                                
    {name:"time",          height:72, type:"duration", map_to:"auto"}
];
~~~

:::note
Die **default_value**-Eigenschaft legt nur den initialen Wert für den Lightbox-Abschnitt fest. Das bedeutet, dass ein neues Ereignis diesen Wert erst erhält, nachdem der Benutzer die Lightbox öffnet und das Ereignis speichert.
:::

Wenn Sie den Standardwert direkt beim Erstellen neuer Ereignisse zuweisen möchten, verwenden Sie das Event [onTaskCreated](api/event/ontaskcreated.md):

~~~js
gantt.attachEvent("onTaskCreated", function(id, task){
    task.priority = "Low";
    return true;
});
~~~

## Einen Abschnitt für bestimmte Ereignisse ausblenden

Um einen Abschnitt für bestimmte Ereignisse auszublenden, überschreiben Sie dessen **set_value**-Methode wie folgt:


~~~js
gantt.form_blocks.textarea.set_value = function(node, value, ev){
    node.firstChild.value = value || "";
    var style = ev.some_property ? "" : "none";
    node.style.display = style; // Editorbereich
    node.previousSibling.style.display = style; // Abschnittsüberschrift
    gantt.resizeLightbox(); // Lightbox-Größe anpassen
}
~~~

## Abschnitt und Beschriftung in einer Zeile anordnen

Abschnitte und deren Beschriftungen können in einer Zeile platziert werden, indem Sie die Option [wide_form](api/config/wide_form.md) aktivieren:

~~~js
gantt.config.wide_form = true; /*!*/

gantt.locale.labels.section_priority = "Priority";
gantt.locale.labels.section_status = "Status";


gantt.config.lightbox.sections = [
    {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    {name: "status", height:22, map_to: "status", type: "select", options: [         
        {key:1, label: "New"},                                                       
          {key:2, label: "Open"},                                                     
          {key:3, label: "Done"}                                                      
    ]},                                                                            
    {name: "priority", map_to: "priority", type: "radio", options: [
        {key: 1, label: "High"},
        {key: 2, label: "Normal"},
        {key: 3, label: "Low"},
    ]},
    {name: "time", type: "duration", map_to: "auto"}
];

gantt.init("gantt_here");
~~~

**Related example:** [Ausrichtung der Lightbox](https://snippet.dhtmlx.com/hf45hvr3)

## Button in der Abschnittsüberschrift

Es ist möglich, einen benutzerdefinierten Button in der Abschnittsüberschrift hinzuzufügen. Gehen Sie dazu wie folgt vor:

- Fügen Sie die **button**-Eigenschaft zum Abschnittsobjekt hinzu:

~~~js
{name:"description", height:130, map_to:"text", type:"textarea", button:"help"}
~~~
- Definieren Sie die Beschriftung für den Button:

~~~js
//'help' entspricht dem Wert der 'button'-Eigenschaft
gantt.locale.labels.button_help = "Help label";
~~~

- Implementieren Sie den Click-Handler für den Button:

~~~
gantt.form_blocks.textarea.button_click = function(index, button, shead, sbody){
    // eigene Logik hier
}
~~~
Parameter:

- **index** - (*number*) der nullbasierte Index des Abschnitts
- **button** - (*HTMLElement*) das Button-Element selbst
- **shead** - (*HTMLElement*) das Abschnittsüberschrift-Element
- **sbody** - (*HTMLElement*) das Abschnittsinhalt-Element

Um das Bild des Buttons festzulegen, verwenden Sie folgende CSS-Klasse:

~~~js
.dhx_custom_button_help{
    background-image: url(imgs/but_help.gif);
}
~~~

