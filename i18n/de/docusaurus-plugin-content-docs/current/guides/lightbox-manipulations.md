--- 
title: "Arbeiten mit Lightbox-Elementen" 
sidebar_label: "Arbeiten mit Lightbox-Elementen" 
---

# Arbeiten mit Lightbox-Elementen

## Abrufen/Setzen des Lightbox-Steuerelementwerts

Um den Wert eines Lightbox-Steuerelements abzurufen oder zu setzen, verwenden Sie die [getLightboxSection](api/method/getlightboxsection.md)-Methode wie folgt:

~~~js
//zum Abrufen des Wertes
var value = gantt.getLightboxSection('description').getValue();

//zum Setzen des Wertes
gantt.getLightboxSection('description').setValue('abc');
~~~

## Prüfen, ob das Lightbox geöffnet ist

Um zu prüfen, ob das Lightbox aktuell geöffnet oder geschlossen ist, verwenden Sie die **lightbox**-Eigenschaft des Statusobjekts, das von der [getState](api/method/getstate.md) Methode zurückgegeben wird.

 Wenn das Lightbox geöffnet ist – gibt die Methode die ID der geöffneten Aufgabe zurück, andernfalls 'null' oder 'undefined'

~~~js
if (gantt.getState().lightbox){
    //der Code für das geöffnete Lightbox
} else {
    //der Code für das geschlossene Lightbox
}
~~~

## Zuordnung von Datenfeldern zu den Lightbox-Abschnitten

Um eine Daten-Eigenschaft einem Lightbox-Abschnitt zuzuordnen, verwenden Sie das **map_to**-Attribut des Abschnittsobjekts:

~~~js
//ordnet dem Abschnitt "holders" eine Daten-Eigenschaft mit dem Namen "holder" zu
gantt.config.lightbox.sections = [
    {name:"description",height:38, type:"textarea", map_to:"text", focus:true},
    {name:"holders",     height:22, type:"textarea", map_to:"holder"},      /*!*/                                                                
    {name:"time",         height:72, type:"duration", map_to:"auto"}
];
~~~

## Festlegen des Standardwerts für einen Lightbox-Abschnitt

Um den Standardwert für einen Lightbox-Abschnitt festzulegen, verwenden Sie die **default_value**-Eigenschaft des Abschnittsobjekts.

Zum Beispiel haben Sie dem Lightbox einen benutzerdefinierten Abschnitt - „Priority“ - hinzugefügt, der die Priorität der Aufgabe anzeigt. 
Wenn der Benutzer ein neues Ereignis erstellt, ist das Feld zunächst leer. Um solches Verhalten zu korrigieren und standardmäßig z. B. die niedrige Priorität festzulegen, definieren Sie die Lightbox wie folgt:

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
Die **default_value**-Eigenschaft setzt den Standardwert für den Lightbox-Abschnitt, nicht für ein neues Ereignis, d. h. ein neues Ereignis erhält den angegebenen Wert erst, nachdem der Benutzer das Lightbox geöffnet und das Ereignis gespeichert hat.
:::

Um den Standardwert direkt für neue Ereignisse festzulegen, verwenden Sie das [onTaskCreated](api/event/ontaskcreated.md) Event:

~~~js
gantt.attachEvent("onTaskCreated", function(id, task){
    task.priority = "Low";
    return true;
});
~~~

## Einen Abschnitt für bestimmte Ereignisse ausblenden

Um einen Abschnitt für bestimmte Ereignisse auszublenden, überschreiben Sie seine **set_value**-Methode wie folgt:

~~~js
gantt.form_blocks.textarea.set_value="function(node,value,ev){"
    node.firstChild.value="value||""";
    var style = ev.some_property?"":"none";
    node.style.display="style;" // Editor-Bereich
    node.previousSibling.style.display="style;" // Abschnittskopf
    gantt.resizeLightbox(); // korrekte Größe der Lightbox
}
~~~

## Abschnitt und dessen Bezeichnung auf derselben Zeile setzen

Sie können Abschnitte der Lightbox in derselben Zeile wie ihre Bezeichnungen platzieren, indem Sie die Konfigurationsoption [wide_form](api/config/wide_form.md) auf *true* setzen:

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


**Zugehöriges Beispiel** [Aligning Lightbox](https://snippet.dhtmlx.com/hf45hvr3)

## Button im Abschnittskopf

Es ist möglich, einen benutzerdefinierten Button im Abschnittskopf zu haben. Um einen Button in die Kopfzeile eines Abschnitts einzufügen, führen Sie die folgenden Schritte aus:

- Geben Sie die **button**-Eigenschaft im Abschnittsobjekt an:

~~~js
{name:"description", height:130, map_to:"text", type:"textarea", button:"help"}
~~~
- Legen Sie das Label für den Button fest:

~~~js
//'help' ist der Wert der Eigenschaft 'button'
gantt.locale.labels.button_help="Help label";
~~~

- Geben Sie den Handler für Button-Klicks an:

~~~
gantt.form_blocks.textarea.button_click = function(index,button,shead,sbody){
    // beliebige benutzerdefinierte Logik
}
~~~
wo:

- **index** - (*number*) der Abschnittsindex. Nullbasierte Nummerierung
- **button** - (*HTMLElement*) das HTML-Element eines Buttons
- **shead** - (*HTMLElement*) das HTML-Element der Abschnittskopfzeile
- **sbody** - (*HTMLElement*) das HTML-Element des Abschnittsinhalts

Sie können das Bild, das für den Button verwendet wird, über die folgende CSS-Klasse definieren:

~~~js
.dhx_custom_button_help{
    background-image:url(imgs/but_help.gif);
}
~~~