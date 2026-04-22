--- 
title: "Popup-Nachrichten und Modalfenster"
sidebar_label: "Popup-Nachrichten und Modalfenster"
---

# Popup-Nachrichten und Modalfenster

Nachrichten werden im Gantt-Diagramm verwendet, um den Benutzer über einen Fehler zu informieren, eine Aktion zu bestätigen oder abzulehnen, eine von mehreren Optionen auszuwählen und so weiter.  
Gantt-Diagramm-Nachrichten basieren auf einem Fork des Repositories dhtmlxMessage als Grundlage.  
Daher ist die gesamte Funktionalität von dhtmlxMessage auch für dhtmlxGantt-Nachrichten relevant.

Es gibt zwei Haupttypen von Nachrichten: eine [einfaches Popup-Nachrichtenfeld](guides/message-boxes.md#basic-popup-message) und eine [modale Meldungsbox](guides/message-boxes.md#modal-message-boxes) mit Buttons, die die Arbeit einer Anwendung blockieren.

Eine modale Meldungsbox kann zu einem von drei möglichen Typen gehören:

- [Warnungs-Meldungsbox](#alert)
- [Bestätigungs-Meldungsbox](#confirm)
- [Modalbox](#modal)


## Basic Popup Message 

Um eine grundlegende modale Meldungsbox zu erstellen, verwenden Sie die [gantt.message](api/method/message.md) Methode. Der obligatorische Parameter der Methode ist der Text der Nachricht:

~~~js
gantt.message("The task is updated");
~~~

Es gibt drei Typen von Nachrichtenboxen:
  
- eine Standard-Meldungsbox (**type:"info"**)

![default_message](/img/default_message.png)
  
- eine Fehlermeldungsbox (**type:"error"**)

![error_message](/img/error_message.png)

- eine Warnmeldungsbox (**type:"warning"**)

![warning_message](/img/warning_message.png)

Um eine notwendige Meldungsbox zu erstellen, müssen Sie die *type*-Eigenschaft mit dem entsprechenden Wert definieren: 

~~~js
// Erstellen einer Fehlermeldungsbox
gantt.message({type:"error", text:"Invalid data format"});
~~~


[Gantt message types](https://docs.dhtmlx.com/gantt/samples/04_customization/20_message_types.html)


Um verschiedene Stile auf eine Meldungsbox anzuwenden, müssen Sie eine CSS-Klasse über den type-Parameter angeben, wie hier beschrieben [hier](guides/message-boxes.md#styling).

### Positionierung von Meldungsboxen

Standardmäßig erscheint eine Popup-Nachrichtenbox in der rechten oberen Ecke des Fensters. Sie blockiert nicht die Arbeit der übergeordneten Anwendung, im Gegensatz zu [modalen Meldungsboxen](guides/message-boxes.md#modal-message-boxes), die die übergeordnete Anwendung überlagern und deren Arbeit blockieren. Sie können die Position einer Meldungsbox ändern, indem Sie die Eigenschaft **gantt.message.position** verwenden:

~~~js
gantt.message.position = 'bottom';
~~~

**Verwandtes Beispiel** [Message position](https://snippet.dhtmlx.com/tte3rx78)

Es gibt vier mögliche Werte für die Position der Meldung:

- **top** - zeigt eine Meldungsbox in der rechten oberen Ecke des Fensters, standardmäßig festgelegt

- **bottom** - zeigt eine Meldungsbox in der rechten unteren Ecke des Fensters

- **left** -  zeigt eine Meldungsbox auf der linken Seite des Fensters unter Gantt

- **right** - zeigt eine Meldungsbox auf der rechten Seite des Fensters unter Gantt

### Expire Interval

Es ist möglich, das Ablauf-Intervall für eine Meldungsbox mithilfe des *expire*-Parameters anzupassen. Es handelt sich dabei um den Zeitraum nach dem das Meldungsfeld verschwindet (in Millisekunden).  
Standardmäßig ist das Ablauf-Intervall auf 4000 Millisekunden gesetzt. 

Sie können diesen Wert entweder ändern oder das Ablaufzeit-Fenster ganz deaktivieren, indem Sie den expire-Parameter auf "-1" setzen. In diesem Fall verschwindet eine Meldungsbox erst nach einem Mausklick.

~~~js
gantt.message({
    type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

### Verstecken einer Message Box über die API

Um die angegebene Meldungsbox manuell zu verstecken und nicht darauf zu warten, bis sie automatisch verschwindet, können Sie die Methode **gantt.message.hide(boxId)** verwenden. Sie nimmt einen Parameter:

- **boxId** - die Box-ID, die im Konstruktor der Box angegeben ist

~~~js
gantt.message({
    id:"myBox",
    text:"Page is loaded"
});

gantt.message.hide("myBox");
~~~ 

## Modal Message Boxes

Modalmeldungsboxen verhindern die Arbeit der übergeordneten App, bis eine notwendige Aktion ausgeführt wird (in der Regel durch Klicken auf einen Button). Sie schließen sich durch einen Button-Klick und eine Callback-Funktion, falls vorhanden.

Es gibt drei Typen von modalem Meldungsboxen:

- [Warnungs-Meldungsbox](#alert) - eine Warnbox mit einem Button;
- [Bestätigungs-Meldungsbox](#confirm) - eine Bestätigungsbox mit zwei Buttons (um zu bestätigen oder abzubrechen); 
- [Modalbox](#modal) - eine modale Meldungsbox mit einer unbegrenzten Anzahl von Buttons. 

Gemeinsame Eigenschaften der Boxen sind:

- **id** – die ID der Meldungsbox;
- **title** – der Text des Headers;
- **type** – der Typ der Meldungsbox (eine Warnung oder ein Fehler);
- **text** – der Text des Textbereichs der Meldungsbox; 
- **ok** – der Text der "OK"-Schaltfläche;
- **cancel** – der Text der "Cancel"-Schaltfläche (für die Bestätigungsbox);
- **callback** – die bei Klick auf eine Schaltfläche aufgerufene Funktion. Nimmt *true* oder *false* als Parameter an (je nach gedrückter Schaltfläche);
- **position** – aktuell wird nur ein Wert - "top" - unterstützt; jeder andere Wert ergibt eine zentrierte Ausrichtung;
- **width**    - die Breite der Modalbox (gesetzt als CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) Werte, z. B. "100px", "50%");
- **height** - die Höhe der Modalbox (gesetzt als CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) Werte, z. B. "100px", "50%").

## Warnungs-Meldungsbox {#alert}

![alert](/img/alert.png)

Eine Warnungs-Meldungsbox enthält den "OK"-Button. Um den Text des "OK"-Buttons festzulegen, verwenden Sie den *ok*-Parameter mit dem Textwert:

- eine kurze Form (enthält nur den Text der Meldung – implizite Nutzung des Parameters 'text'. Die anderen Parameter haben Standardwerte):

~~~js
gantt.alert("Text");
~~~

- eine vollständige Form (enthält mehrere verfügbare Parameter. Nicht angegebene Parameter erhalten Standardwerte)

~~~js
gantt.alert({
    text:"some text",
    title:"Error!",
    ok:"Yes",
    callback:function(){...}
});
~~~


## Bestätigungs-Meldungsbox {#confirm}

![confirm](/img/confirm.png)

Eine Bestätigungs-Meldungsbox hat zwei Buttons: den "OK"-Button und den "Cancel"-Button. Der Text der Buttons wird in den Eigenschaften mit den entsprechenden Namen festgelegt. 


- eine kurze Form

~~~js
gantt.confirm("ConfirmText");
~~~

- eine vollständige Form

~~~js
gantt.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        gantt.message("Result: "+result);
    }
});
~~~


## Modalbox {#modal}

![modalbox](/img/modalbox.png)

Eine Modalbox besitzt einige besondere Merkmale: 

- ihr *Text* kann beliebigen *HTML*-Inhalt enthalten;
- sie kann viele Buttons enthalten, die im *buttons*-Array angegeben sind und die Textwerte der Buttons enthalten;
- die *callback*-Funktion nimmt den *Index* des gewählten Buttons als Parameter.

~~~js
gantt.modalbox({
    title:"Settings",
    text: " ... html code here... ",
    buttons:["Save", "Defaults", "Cancel"],
    callback: function(result){
        gantt.alert(result);
    }
});
~~~


### Configuring modalbox buttons 

Es gibt zwei Hauptwege, die Konfiguration der modalbox Buttons zu definieren:

- eine kurze Form: 

~~~js
gantt.modalbox({
    // other settings
    buttons:["Save", "Delete", "Cancel"],
    callback: function(result){
           switch(result){
            case "0":
                //Save
                break;
            case "1":
                //Delete
                break;
            case "2":
                //Cancel
                break;
        }    
    }
});
~~~ 

Das Ergebnis der Callback-Funktion wird dem stringifizierten Index eines gedrückten Buttons aus dem Array entsprechen ("0", "1", "2",...). Jeder Button erhält eine CSS-Klasse aus seinem Label, das in Kleinbuchstaben umgewandelt wird, z. B. *gantt_**save**_button*, *gantt_**delete**_button*, *gantt_**cancel**_button*. 

Diese Klassen können verwendet werden, um Buttons zu stylen:

~~~js
.gantt_delete_button div{
    background:red;
}
~~~ 

Falls derselbe Button-Name von mehreren Popups verwendet wird, die unterschiedlich gestylt werden sollen, kann die **type**-Konfiguration verwendet werden:

~~~js
gantt.modalbox({
    // other settings
    type:"special_popup",
    buttons:["Save", "Delete", "Cancel"]
});
~~~ 

Der **type** wird mit dem Präfix "gantt_" versehen und als Klassenname zum Popup-Element hinzugefügt:

~~~js
.gantt_special_popup .gantt_delete_button div{
      background:red;
}
~~~ 

- eine vollständige Form:

Die CSS-Klassen der Buttons und Callback-Werte können explizit über eine längere Konfigurationsform definiert werden:

~~~js
gantt.modalbox({
    // other settings
    buttons: [
        { label:"Save",   css:"link_save_btn",   value:"save" },
        { label:"Cancel", css:"link_cancel_btn", value:"cancel" },
        { label:"Delete", css:"link_delete_btn", value:"delete" }
    ],
    callback: function(result){
        switch(result){
            case "save":
                //Save
                break;
            case "cancel":
                //Cancel
                break;
            case "delete":
                //Delete
                break;
        }
    }
});
~~~ 

Das **label**-Parameter ist verpflichtend, während **css**- und **value**-Optionen weggelassen werden können. Fehlende Parameter werden wie in der kurzen Form der Button-Konfiguration berechnet: CSS wird aus dem kleingeschriebenen Button-Label vererbt und der Button-Index wird als Wert verwendet.


Der **css**-Wert wird mit dem String "gantt_" vorangestellt und dem Button-Element als Klassenname hinzugefügt:

~~~js
.gantt_link_delete_btn div{
      background:red;
}
~~~ 

## Ausblenden von Modal Message Boxes

Um eine Modal-Meldungsbox manuell auszublenden, können Sie die Methode **gantt.modalbox.hide()** verwenden. Als Parameter nimmt sie den div-Container der Modalbox:

~~~js
var box = gantt.modalbox({    
    title:"Settings",
    text: " ... html code here... ",
    buttons:["Save", "Defaults", "Cancel"],
    callback: function(result){
        gantt.alert(result);
    }
});

gantt.modalbox.hide(box);
~~~ 

Für die **alert**- und **confirm**-Modalboxen müssen Sie ebenfalls die Methode **gantt.modalbox.hide()** verwenden:

~~~js
var box = gantt.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        gantt.message("Result: "+result);
    }
});

gantt.modalbox.hide(box);
~~~ 

## How Gantt Works with Modalbox Buttons

Standardmäßig sind die Button-Namen als Text gesetzt. Wird der Name eines Buttons als HTML-Element gesetzt (z. B. um die Schrift fett darzustellen oder ein Material-Icon hinzuzufügen),
wird das Ergebnis der Callback-Funktion beim Klicken auf den Button *null* sein. 

Dies passiert, weil Gantt bestimmte Attribute des Eltern-Elements des geklickten Elements überwacht. Fehlen die erwarteten Attribute, gibt Gantt *null* zurück. 
Außerdem wickelt Gantt alle Elemente, die Sie für die Buttons angeben, in die `<div>`-Tags ein. 

Wenn Sie also einen String als Button-Namen zurückgeben, wird dessen Elternteil ein leeres `<div>`-Element sein und Sie erhalten `null`. 
Wenn jedoch ein Button außerhalb des Textes angeklickt wird, ist sein Elternteil ein Element mit allen erforderlichen Attributen, sodass Sie ein etwas genaueres Ergebnis erhalten:

- *true/false* für die Bestätigungsbox
- für die Modalbox:
    - die Nummer des Elements in einem Array (für die [kurze Form](#configuring-modalbox-buttons))
    - der Wert des `value`-Parameters (für die [vollständige Form](#configuring-modalbox-buttons))
  
Das bedeutet, dass wenn Sie ein HTML-Element als Button-Namen verwenden möchten, Sie alles in zwei div-Elemente einschließen müssen, die das `data-result`-Attribut besitzen. Zum Beispiel:

~~~js
gantt.confirm({
    ok:`<div data-result="yes"><div data-result="yes"><i>Yes</i></div></div>`,
    cancel:`<div data-result="no"><div data-result="no"><i>No</i></div></div>`,
});

gantt.modalbox({
  buttons: [
   { label:`<div data-result="yes">
           <div data-result="yes"><i>Yes</i></div>
     </div>`,   
     css:"link_save_btn", value:"yes" },
   { label:`<div data-result="no">
           <div data-result="no"><i>No</i></div>
     </div>`, 
     css:"link_cancel_btn", value:"no" },
   { label:`<div data-result="cancel">
           <div data-result="cancel"><i>Cancel</i></div>
     </div>`, 
     css:"link_cancel_btn", value:"cancel" },
  ],
});
~~~ 

Wenn Sie andere Elemente für einen Button verwenden müssen, sollten alle Elternelemente ebenfalls das `data-result`-Attribut haben. Im untenstehenden Beispiel werden die `<u>`-Tags als Button-Namen verwendet. Sie tragen daher dasselbe `data-result`-Attribut wie die beiden anderen `<div>`-Elternteile des Buttons: 

~~~js
gantt.confirm({
  ok:`<div data-result="yes">
      <div data-result="yes"><u data-result="yes"><i>Yes</i></u></div>
  </div>`,
  cancel:`<div data-result="no">
      <div data-result="no"><u data-result="no"><i>No</i></u></div>
  </div>`,
});

gantt.modalbox({
  buttons: [
    { label:`<div data-result="yes">
        <div data-result="yes">
            <u data-result="yes"><i>Yes</i></u>
           </div>
      </div>`,   
      css:"link_save_btn",  value:"yes" },
    { label:`<div data-result="no">
        <div data-result="no">
            <u data-result="no"><i>No</i></u>
        </div>
      </div>`, 
      css:"link_cancel_btn", value:"no" },
    { label:`<div data-result="cancel">
        <div data-result="cancel">
            <u data-result="cancel"><i>Cancel</i></u>
        </div>
      </div>`, 
      css:"link_cancel_btn", value:"cancel" },
  ],
});
~~~ 

## Styling

Für jede Art von Meldungsbox können Sie einen benutzerdefinierten Stil definieren, um das gewünschte Erscheinungsbild zu erreichen.
Im Allgemeinen wird die passende CSS-Klasse über den *type*-Parameter festgelegt: Sie definieren eine CSS-Klasse und setzen den Parameter auf deren Namen.

Es gibt einige Regeln im Umgang mit dem 'type'-Parameter, die Sie beachten sollten:

- Um eine CSS-Klasse für die Alert- und Bestätigungsboxen festzulegen, müssen Sie eine solche Box auf die 'window-bezogene' Weise initialisieren.
- Um eine CSS-Klasse für die Meldungsboxen festzulegen, müssen Sie eine Box auf die 'allgemeine' Weise initialisieren.
- Der Name einer CSS-Klasse sollte mit dem Prefix 'gantt-' beginnen.
- Um den Stil korrekt anzuwenden, ist es notwendig, den Klassennamen als **.gantt-some div** zu verwenden, um anzugeben, dass er für das Element innerhalb einer gantt-Nachricht bestimmt ist. 

~~~js
<style type="text/css">
.gantt-myCss div{
    font-weight:bold;
    color:wheat;
    background-color:crimson;
}
</style>


gantt.message({ type:"myCss", text:"some text" });
~~~ 

**Related sample**  [Styling message boxes](https://snippet.dhtmlx.com/p950vym3)
## Modal Windows and Keyboard Interaction

Die Tastaturfunktionalität für Modalboxen wird durch die Eigenschaft **gantt.message.keyboard** gesteuert. Anfänglich ist sie auf *true* gesetzt. 

Standardmäßig blockieren Modalboxen Tastatur-Ereignisse der Seite. Die einzigen Tasten, die verwendet werden können, sind: 

- "space" und "enter" - setzt den *true*-Wert als Ergebnis einer Modalbox;
- "escape" - setzt den *false*-Wert als Ergebnis einer Modalbox.

Indem Sie die Eigenschaft **keyboard** auf *false* setzen, aktivieren Sie Tastatur-Ereignisse (und deaktivieren die oben genannten Tasten):

~~~js
gantt.message.keyboard = false; 
gantt.modalbox({...});
~~~

Dies ermöglicht die vollständige Nutzung der Tastatur, z. B. zum Eingeben von Werten in Eingabefelder innerhalb von Modalboxen.