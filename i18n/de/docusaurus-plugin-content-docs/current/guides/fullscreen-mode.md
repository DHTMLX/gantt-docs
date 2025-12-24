---
title: "Vollbildmodus"
sidebar_label: "Vollbildmodus"
---

# Vollbildmodus


Ab Version 3.3 bietet die Bibliothek die **fullscreen**-Erweiterung an.

Mit dieser Erweiterung kann die Komponente mithilfe der FullScreen API in den Vollbildmodus wechseln, sofern dieser unterstützt wird ([Liste unterstützter Browser](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)).

<div style="text-align:center;">![full_screen](/img/full_screen.png)</div>

Für ältere Browser wird das Gantt-Diagramm einfach so gestreckt, dass es die Fenstergröße zu 100% ausfüllt.

Um die Vollbildunterstützung zu aktivieren, schalten Sie das **fullscreen**-Plugin über die [gantt.plugins](api/method/plugins.md)-Methode ein:

~~~js
gantt.plugins({
    fullscreen: true
});
~~~

Die Komponente selbst enthält keine eingebaute UI-Steuerung zum Umschalten des Vollbildmodus. Sie müssen also entweder selbst eine hinzufügen oder das folgende Beispiel verwenden:

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

Durch Klicken auf den Button wird das Gantt-Diagramm zwischen seiner Originalgröße und dem Vollbildmodus umgeschaltet.


[Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)


## API-Überblick

Es gibt zwei Hauptmethoden, um den Anzeigemodus des Gantt-Diagramms zu steuern:

- [expand](api/method/expand.md) - schaltet das Gantt-Diagramm in den Vollbildmodus

~~~js
gantt.expand();
~~~

- [collapse](api/method/collapse.md) - stellt das Gantt-Diagramm vom Vollbildmodus wieder auf die normale Größe zurück

~~~js
gantt.collapse();
~~~

## Unterstützte Events


Die folgenden Events stehen zur Verfügung, um Änderungen am Vollbildmodus zu behandeln:

- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

~~~js
// bevor Gantt auf Vollbild erweitert wird
gantt.attachEvent("onBeforeExpand",function(){
    // eigene Logik hier    
    return true;
});

// bevor der Vollbildmodus verlassen wird
gantt.attachEvent("onBeforeCollapse",function(){
    // eigene Logik hier    
    return true;
});

// nachdem Gantt auf Vollbild erweitert wurde
gantt.attachEvent("onExpand", function (){
    // eigene Logik hier
});

// nachdem Gantt den Vollbildmodus verlassen hat
gantt.attachEvent("onCollapse", function (){
    // eigene Logik hier
});
~~~

## Fullscreen API


Das [fullscreen](guides/fullscreen-ext.md)-Objekt stellt vier Methoden zur Verfügung, um das Vollbildverhalten des Gantt-Diagramms (einschließlich anderer Elemente) zu steuern:

- **expand()** - schaltet das Gantt-Diagramm in den Vollbildmodus

~~~js
gantt.ext.fullscreen.expand();
~~~

- **collapse()** - verlässt den Vollbildmodus und stellt die normale Größe wieder her

~~~js
gantt.ext.fullscreen.collapse();
~~~

- **toggle()** - wechselt zwischen Vollbild- und Normalmodus

~~~js
gantt.ext.fullscreen.toggle();
~~~

- **getFullscreenElement()** - gibt das DOM-Element zurück, das beim Aufruf von **expand()** in den Vollbildmodus erweitert wird

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

Standardmäßig gibt **getFullscreenElement()** den HTML-Container des Gantt-Diagramms zurück. Sie können diese Methode überschreiben, um im Vollbildmodus weitere Elemente einzubeziehen, wie [hier](guides/fullscreen-mode.md#ganttwithheadertoolbarinfullscreen) beschrieben.

## Gantt mit Header/Toolbar im Vollbild


Die Gantt-API ermöglicht es, den Vollbildmodus mithilfe der **getFullscreenElement()**-Methode des *fullscreen*-Objekts auf andere Elemente auszuweiten:

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

:::note
Standardmäßig gibt diese Methode den HTML-Container des Gantt-Diagramms zurück, sodass nur das Gantt-Diagramm in den Vollbildmodus wechselt.
:::

Wenn Sie das Gantt-Diagramm zusammen mit zusätzlichen Elementen wie einem Header oder einer Toolbar im Vollbild anzeigen möchten, erstellen Sie einen eigenen Container auf Ihrer Seite, zum Beispiel:

~~~html
<div id="myCover">
    <div class="gantt_control">
        <button id="toggle_fullscreen" 
                onclick="gantt.ext.fullscreen.toggle();">toggle fullscreen</button>
    </div>
        <div id="gantt_here"></div>
</div>
~~~

Überschreiben Sie dann die **getFullscreenElement()**-Methode, sodass Ihr eigener Container in den Vollbildmodus erweitert wird:

~~~js
gantt.ext.fullscreen.getFullscreenElement = function() {
    return document.getElementById("myCover");
}
gantt.init("gantt_here");
~~~


[Full Screen with additional elements](https://docs.dhtmlx.com/gantt/samples/02_extensions/26_full_screen_with_additional_elements.html)


## Warum funktioniert der Vollbildmodus möglicherweise nicht?


Die Vollbild-Erweiterung funktioniert nur, wenn Gantt in den Vollbildmodus wechseln darf.

Wenn sich das Gantt-Diagramm in einem iframe befindet, in dem:

- das **allowfullscreen**-Attribut oder die Berechtigung **allow="fullscreen"** fehlt
- oder das **allow**-Attribut nicht "fullscreen" enthält

kann Gantt nicht in den Vollbildmodus wechseln (testen Sie es in unserem Snippet-Tool: [Example 1](https://snippet.dhtmlx.com/k72wjyzl), [Example 2](https://snippet.dhtmlx.com/7jdrk6q5)).

### Vollbildmodus in Salesforce

Die Fullscreen-Erweiterung funktioniert nicht in Salesforce-Anwendungen, die den [Locker Service](https://developer.salesforce.com/docs/atlas.en-us.238.0.lightning.meta/lightning/security_code.htm) verwenden, da Locker das Umschalten von Elementen in den Vollbildmodus blockiert.

Konkret funktioniert die Erweiterung nicht mit **Lightning Aura** oder **Lightning Web Components**, könnte aber mit dem **Visualforce**-Framework funktionieren.

Sie können testen, ob der Vollbildmodus in Ihrer App verfügbar ist, indem Sie dieses Snippet zu Ihrer Konfiguration hinzufügen:

~~~js
console.log("document.body.requestFullscreen", document.body.requestFullscreen)
~~~

Wenn die Ausgabe `undefined` anzeigt, ist der Vollbildmodus deaktiviert und Gantt kann nicht in den Vollbildmodus wechseln.


:::note
Wenn die Vollbildunterstützung in einer Umgebung aktiviert ist, die diese nicht unterstützt, können Fehler auftreten, aber Gantt funktioniert weiterhin wie gewohnt.
:::

