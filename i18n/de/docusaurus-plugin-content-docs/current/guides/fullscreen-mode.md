---
title: "Vollbildmodus"
sidebar_label: "Vollbildmodus"
---

# Vollbildmodus

Ab der Version 3.3 enthält die Bibliothek die **fullscreen**-Erweiterung. 

Diese Erweiterung bietet eine API, die die Komponente in den Vollbildmodus erweitert, indem sie nach Möglichkeit die FullScreen API verwendet ( [die Liste der unterstützten Browser](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) ). 

<div style="text-align:center;">![full_screen](/img/full_screen.png)</div>

Für ältere Browser ermöglicht es einfach, Gantt auf 100 % der Fenstergröße zu erweitern.

Um die Vollbild-Unterstützung zu aktivieren, aktiviere das **fullscreen**-Plugin über die [gantt.plugins](api/method/plugins.md) Methode:

~~~js
gantt.plugins({
    fullscreen: true
});
~~~

Die Komponente selbst hat keine UI-Steuerung, die diesen Modus umschaltet; Sie müssen ihn irgendwo auf Ihrer Seite hinzufügen oder den aus dem Beispiel übernehmen:

~~~js
<input id="fullscreen_button" type="button" value="Toggle Fullscreen"/>

<script>
var button = document.getElementById("fullscreen_button");
     button.addEventListener("click", function(){
          if (!gantt.getState().fullscreen) {
            // Gantt auf Vollbild erweitern
               gantt.expand();
          }
          else {
            // Gantt wieder auf normale Größe zurücksetzen
               gantt.collapse();
          }
     }, false);
</script>
~~~

Ein Klick auf das Vollbild-Symbol verändert die Größe des Gantt vom Originalzustand in den Vollbildmodus und umgekehrt.

[Vollbild](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

## API-Übersicht

Es gibt zwei Methoden, die verwendet werden, um den Anzeigemodus des Gantt zu steuern:

- [expand](api/method/expand.md) - erweitert Gantt in den Vollbildmodus

~~~js
gantt.expand();
~~~

- [collapse](api/method/collapse.md) - kehrt Gantt vom Vollbildmodus in den Normalmodus zurück

~~~js
gantt.collapse();
~~~

## Die Liste der Ereignisse

Die unterstützten Ereignisse sind unten aufgeführt:

- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

~~~js
// bevor Gantt in den Vollbildmodus erweitert wird
gantt.attachEvent("onBeforeExpand",function(){
    // beliebige eigene Logik hier    
    return true;
});

// bevor Gantt den Vollbildmodus verlässt
gantt.attachEvent("onBeforeCollapse",function(){
    // beliebige eigene Logik hier    
    return true;
});

// wenn Gantt in den Vollbildmodus erweitert wird
gantt.attachEvent("onExpand", function (){
    // beliebige eigene Logik hier
});

// wenn Gantt den Vollbildmodus verlässt
gantt.attachEvent("onCollapse", function (){
    // beliebige eigene Logik hier
});
~~~

## Vollbild-API

Es gibt vier Methoden des [fullscreen](guides/fullscreen-ext.md) Objekts, die verwendet werden, um den Anzeigemodus des Gantt zusammen mit zusätzlichen Elementen zu steuern:

- **expand()** - erweitert Gantt in den Vollbildmodus

~~~js
gantt.ext.fullscreen.expand();
~~~

- **collapse()** - kehrt Gantt vom Vollbildmodus in den Normalmodus zurück

~~~js
gantt.ext.fullscreen.collapse();
~~~

- **toggle()** - ruft die Methode **collapse()** auf, wenn Gantt in den Vollbildmodus erweitert ist, und die Methode **expand()** ansonsten

~~~js
gantt.ext.fullscreen.toggle();
~~~

- **getFullscreenElement()** - gibt ein DOM-Element zurück, das durch die **expand()**-Methode in den Vollbildmodus erweitert wird. 

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

Standardmäßig gibt die Methode **getFullscreenElement()** ein HTML-Container des Gantt-Diagramms zurück. Sie können diese Methode neu definieren [um das Gantt mit zusätzlichen Elementen zum Vollbildmodus zu erweitern](guides/fullscreen-mode.md#gantt-with-the-headertoolbar-in-the-fullscreen).

## Gantt mit Kopfzeile/Symbolleiste im Vollbild

Die Gantt-API bietet die Möglichkeit, das Gantt durch die **getFullscreenElement()**-Methode des *fullscreen*-Objekts in den Vollbildmodus zu erweitern:

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

:::note
Standardmäßig gibt diese Methode ein HTML-Container des Gantt-Diagramms zurück. Das bedeutet, dass nur Gantt in den Vollbildmodus erweitert wird.
:::

Falls Sie das Gantt im Vollbildmodus mit zusätzlichen Elementen (wie einer Kopfzeile oder Toolbar) darstellen möchten, müssen Sie der Seite einen benutzerdefinierten Container hinzufügen, wie folgt:

~~~html
<div id="myCover">
    <div class="gantt_control">
        <button id="toggle_fullscreen" 
                onclick="gantt.ext.fullscreen.toggle();">toggle fullscreen</button>
    </div>
        <div id="gantt_here"></div>
</div>
~~~


Nachher müssen Sie die Methode **getFullscreenElement()** neu definieren, damit sie einen benutzerdefinierten Wurzelknoten zurückgibt, der in den Vollbildmodus erweitert wird:

~~~js
gantt.ext.fullscreen.getFullscreenElement = function() {
    return document.getElementById("myCover");
}
gantt.init("gantt_here");
~~~

[Full Screen with additional elements](https://docs.dhtmlx.com/gantt/samples/02_extensions/26_full_screen_with_additional_elements.html)

## Warum der Vollbildmodus nicht funktioniert?

Die Vollbild-Erweiterung funktioniert nur, wenn Sie Gantt nicht daran hindern, in den Vollbildmodus zu wechseln.

In Fällen, in denen der Gantt in einen Frame eingefügt wird, wo:

- die Eigenschaft **allowfullscreen** oder der Wert **allow="fullscreen"** fehlt
- oder der Wert für die Eigenschaft **allow** nicht angegeben ist,

der Gantt nicht in den Vollbildmodus wechseln kann (probieren Sie es in unserem Snippet-Tool ([Beispiel 1](https://snippet.dhtmlx.com/k72wjyzl), [Beispiel 2](https://snippet.dhtmlx.com/7jdrk6q5))). 

### Vollbild-Modus in Salesforce

Die Fullscreen-Erweiterung funktioniert nicht in Salesforce-Anwendungen, die Locker Service verwenden, da Locker die Fähigkeit blockiert, das Element in den Vollbildmodus zu wechseln.

Genauer gesagt funktioniert die Fullscreen-Erweiterung nicht mit dem Lightning Aura Framework und mit Lightning Web Components, könnte aber mit dem Visualforce-Framework funktionieren.

Sie können die Verfügbarkeit des Vollbildmodus in Ihrer App prüfen, indem Sie den folgenden Code-Schnipsel in den Konfigurationscode einfügen:

~~~js
console.log("document.body.requestFullscreen", document.body.requestFullscreen)
~~~

Wenn Sie im Output den Wert `undefined` sehen, bedeutet dies, dass die Funktion deaktiviert ist und es keine Möglichkeit gibt, Gantt zu erweitern.

:::note
Wenn Sie die [Vollbild-Unterstützung](guides/extensions-list.md#fullscreen) in einer Umgebung aktivieren, die diese Funktion nicht unterstützt, können Fehler auftreten, aber Gantt wird weiter funktionieren.
:::