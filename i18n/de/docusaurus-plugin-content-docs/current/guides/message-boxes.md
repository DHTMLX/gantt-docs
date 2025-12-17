---
title: "Popup-Nachrichten und Modale Boxen"
sidebar_label: "Popup-Nachrichten und Modale Boxen"
---

Popup-Nachrichten und Modale Boxen
======================

Nachrichten im Gantt-Diagramm informieren Benutzer über Fehler, bestätigen oder verweigern Aktionen, ermöglichen die Auswahl von Optionen und mehr. Diese Nachrichten basieren auf [einem Fork des dhtmlxMessage-Repositories](https://github.com/DHTMLX/message), sodass alle Features von dhtmlxMessage auch für dhtmlxGantt-Nachrichten gelten.

Es gibt zwei Haupttypen von Nachrichten: eine [einfache Popup-Nachricht](guides/message-boxes.md#basicpopupmessage) und eine [modale Nachrichtenbox](guides/message-boxes.md#modalmessageboxes) mit Schaltflächen, die die Interaktion mit der Anwendung blockieren.

Modale Nachrichtenboxen gibt es in drei Varianten:

- [Alert-Nachrichtenbox](#alert)
- [Confirm-Nachrichtenbox](#confirm)
- [Modalbox](#modal)


## Einfache Popup-Nachricht

Um eine einfache modale Nachrichtenbox anzuzeigen, verwenden Sie die Methode [gantt.message](api/method/message.md). Der erforderliche Parameter ist der Nachrichtentext:

~~~js
gantt.message("The task is updated");
~~~

Es gibt drei Stile für Nachrichtenboxen:

- Standard-Nachrichtenbox (**type:"info"**)

![default_message](/img/default_message.png)
  
- Fehler-Nachrichtenbox (**type:"error"**)

![error_message](/img/error_message.png)

- Warnungs-Nachrichtenbox (**type:"warning"**)

![warning_message](/img/warning_message.png)

Um die gewünschte Nachrichtenbox zu erstellen, setzen Sie die Eigenschaft *type* mit dem entsprechenden Wert: 

~~~js
// Erstellung einer Fehler-Nachrichtenbox
gantt.message({type:"error", text:"Invalid data format"});
~~~


[Gantt message types](https://docs.dhtmlx.com/gantt/samples/04_customization/20_message_types.html)


Um eine Nachrichtenbox anders zu gestalten, geben Sie eine CSS-Klasse über den type-Parameter an, wie [hier](guides/message-boxes.md#styling) beschrieben.

### Positionierung der Nachrichtenboxen

Standardmäßig erscheinen Popup-Nachrichtenboxen in der oberen rechten Ecke des Fensters. Anders als [modale Nachrichtenboxen](guides/message-boxes.md#modalmessageboxes) blockieren sie nicht die Interaktion mit der übergeordneten Anwendung. Die Position kann durch Setzen der Eigenschaft **gantt.message.position** geändert werden:

~~~js
gantt.message.position = 'bottom';
~~~

**Related example:** [Message position](https://snippet.dhtmlx.com/tte3rx78)

Verfügbare Positionswerte sind:

- **top** - zeigt die Nachrichtenbox in der oberen rechten Ecke an (Standard)

- **bottom** - zeigt die Nachrichtenbox in der unteren rechten Ecke an

- **left** - zeigt die Nachrichtenbox auf der linken Seite unterhalb des Gantt an

- **right** - zeigt die Nachrichtenbox auf der rechten Seite unterhalb des Gantt an

### Ablaufintervall

Sie können einstellen, wie lange eine Nachrichtenbox sichtbar bleibt, indem Sie den Parameter *expire* verwenden. Dieser gibt die Zeit in Millisekunden an, bevor die Box verschwindet. Standardwert ist 4000 Millisekunden.

Um diese Dauer zu ändern oder das automatische Ausblenden zu deaktivieren, setzen Sie den expire-Parameter auf einen anderen Wert oder auf -1. Bei -1 verschwindet die Nachrichtenbox nur, wenn sie angeklickt wird.

~~~js
gantt.message({
    type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

### Ausblenden einer Nachrichtenbox per API

Um eine bestimmte Nachrichtenbox manuell auszublenden, bevor sie automatisch verschwindet, verwenden Sie die Methode **gantt.message.hide(boxId)**. Sie akzeptiert einen Parameter:

- **boxId** - die ID, die der Box bei der Erstellung zugewiesen wurde

~~~js
gantt.message({
    id:"myBox",
    text:"Page is loaded"
});

gantt.message.hide("myBox");
~~~

## Modale Nachrichtenboxen

Modale Nachrichtenboxen blockieren die Interaktion mit der Anwendung, bis eine Aktion ausgeführt wird, meist durch Klicken auf eine Schaltfläche. Sie schließen sich beim Klicken auf eine Schaltfläche und führen ggf. eine Callback-Funktion aus.

Es gibt drei Typen modaler Nachrichtenboxen:

- [Alert-Nachrichtenbox](#alert) - eine Meldung mit einer einzelnen Schaltfläche;
- [Confirm-Nachrichtenbox](#confirm) - eine Bestätigungsbox mit "OK" und "Abbrechen"-Schaltflächen;
- [Modalbox](#modal) - eine modale Box, die beliebig viele Schaltflächen haben kann.

Gemeinsame Eigenschaften sind:

- **id** - die Kennung der Nachrichtenbox;
- **title** - Kopfzeilentext;
- **type** - Typ der Nachrichtenbox (z.B. warning oder error);
- **text** - Nachrichteninhalt;
- **ok** - Text für die "OK"-Schaltfläche;
- **cancel** - Text für die "Abbrechen"-Schaltfläche (nur bei Confirm-Box);
- **callback** - Funktion, die beim Klicken auf eine Schaltfläche aufgerufen wird und *true* oder *false* erhält, je nachdem, welche Schaltfläche gewählt wurde;
- **position** - unterstützt derzeit nur "top"; andere Werte zentrieren die Box;
- **width** - Breite der Modalbox, festgelegt mit CSS-[Längenangaben](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder [Prozentangaben](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) wie "100px" oder "50%";
- **height** - Höhe der Modalbox, analog zur Breite festgelegt.

## Alert-Nachrichtenbox (#alert)

![alert](/img/alert.png)

Eine Alert-Nachrichtenbox enthält eine "OK"-Schaltfläche. Der Text der Schaltfläche kann mit dem *ok*-Parameter gesetzt werden:

- Kurzform (nur Nachrichtentext, andere Parameter werden auf Standardwerte gesetzt):

~~~js
gantt.alert("Text");
~~~

- Vollständige Form (mehrere Optionen angeben, nicht angegebene Parameter nutzen Standardwerte):

~~~js
gantt.alert({
    text:"some text",
    title:"Error!",
    ok:"Yes",
    callback:function(){...}
});
~~~


## Confirm-Nachrichtenbox (#confirm)

![confirm](/img/confirm.png)

Confirm-Nachrichtenboxen haben zwei Schaltflächen: "OK" und "Abbrechen". Die Texte werden über die jeweiligen Eigenschaften gesetzt.

- Kurzform:

~~~js
gantt.confirm("ConfirmText");
~~~

- Vollständige Form:

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


## Modalbox (#modal)

![modalbox](/img/modalbox.png)

Modalboxen bieten einige besondere Funktionen:

- Ihr *text* kann beliebigen *HTML*-Inhalt enthalten;
- Sie können mehrere Schaltflächen im *buttons*-Array definieren, das die Beschriftungen enthält;
- Die *callback*-Funktion erhält den *Index* der geklickten Schaltfläche.

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


### Konfiguration der Modalbox-Schaltflächen (#configuringmodalboxbuttons)

Es gibt zwei Hauptwege, Modalbox-Schaltflächen zu konfigurieren:

- Kurzform:

~~~js
gantt.modalbox({
    // weitere Einstellungen
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

In dieser Form erhält die Callback-Funktion den als String dargestellten Index der geklickten Schaltfläche ("0", "1", "2" usw.). Jede Schaltfläche bekommt eine CSS-Klasse, die auf ihrem Label in Kleinbuchstaben basiert, z.B. *gantt_**save**_button*, *gantt_**delete**_button*, *gantt_**cancel**_button*.

Sie können die Schaltflächen mit diesen Klassen gestalten:

~~~js
.gantt_delete_button div{
    background:red;
}
~~~

Falls mehrere Popups denselben Schaltflächennamen haben, aber unterschiedliche Gestaltung benötigen, kann die **type**-Konfiguration verwendet werden:

~~~js
gantt.modalbox({
    // weitere Einstellungen
    type:"special_popup",
    buttons:["Save", "Delete", "Cancel"]
});
~~~

Der **type** wird mit "gantt_" vorangestellt und als Klasse dem Popup-Element hinzugefügt:

~~~js
.gantt_special_popup .gantt_delete_button div{
      background:red;
}
~~~

- Vollständige Form:

Sie können CSS-Klassen und Rückgabewerte der Schaltflächen explizit mit einer detaillierten Konfiguration festlegen:

~~~js
gantt.modalbox({
    // weitere Einstellungen
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

**label** ist erforderlich, während **css** und **value** optional sind. Wenn sie weggelassen werden, werden CSS-Klassen und Werte wie in der Kurzform aus dem Label und dem Schaltflächenindex abgeleitet.

Die **css**-Klasse wird mit "gantt_" vorangestellt und dem Schaltflächenelement hinzugefügt:

~~~js
.gantt_link_delete_btn div{
      background:red;
}
~~~


## Modale Nachrichtenboxen ausblenden

Um eine modale Nachrichtenbox manuell zu schließen, verwenden Sie die Methode **gantt.modalbox.hide()** und übergeben das Modalbox-Container-Element:

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

Für **alert**- und **confirm**-Modale Boxen gilt die gleiche Methode **gantt.modalbox.hide()**:

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

## Wie Gantt mit Modalbox-Schaltflächen arbeitet

Standardmäßig sind Schaltflächennamen einfacher Text. Wenn ein Schaltflächenname als HTML-Element gesetzt wird (z.B. fettgedruckte Schrift oder ein Material-Icon), gibt die Callback-Funktion beim Klick *null* zurück.

Das liegt daran, dass Gantt bestimmte Attribute am Elternelement des geklickten Elements erwartet. Fehlen diese, gibt Gantt *null* zurück. Außerdem werden alle Elemente, die Sie für Schaltflächen angeben, von Gantt in `<div>`-Tags eingeschlossen.

Wenn Sie also ein String-Element beim Klick auf den Text zurückgeben, ist dessen Elternelement ein leerer `<div>`, was zu einem `null`-Ergebnis führt. Wenn Sie aber außerhalb des Textes auf eine Schaltfläche klicken, hat das Elternelement die erforderlichen Attribute, sodass die Callback-Funktion die erwarteten Ergebnisse zurückgibt:

- *true/false* für Confirm-Boxen
- für Modalboxen:
  - der Index des Elements im Array (bei der [Kurzform](#configuringmodalboxbuttons))
  - der Wert des `value`-Parameters (bei der [Vollständigen Form](#configuringmodalboxbuttons))
  
Das bedeutet: Wenn Sie ein HTML-Element als Schaltflächennamen verwenden möchten, sollten Sie es in zwei `<div>`-Elemente einschließen, die beide das Attribut `data-result` besitzen. Zum Beispiel:

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

Wenn Sie andere Elemente als Schaltfläche verwenden möchten, stellen Sie sicher, dass alle Elternelemente ebenfalls das Attribut `data-result` besitzen. Im folgenden Beispiel werden `<u>`-Tags für den Schaltflächennamen verwendet, und sie sowie die beiden Elternelemente besitzen das Attribut `data-result`:

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

Sie können das Erscheinungsbild jeder Message-Box anpassen, indem Sie eigene Styles definieren. In der Regel geben Sie eine CSS-Klasse über den *type*-Parameter an, indem Sie eine CSS-Klasse erstellen und deren Namen diesem Parameter zuweisen.

Beachten Sie beim Setzen des 'type'-Parameters folgende wichtige Punkte:

- Um eine CSS-Klasse auf Alert- und Confirm-Boxen anzuwenden, initialisieren Sie die Box mit der 'window-related'-Methode.
- Um eine CSS-Klasse auf Message-Boxen anzuwenden, initialisieren Sie die Box mit der 'common'-Methode.
- CSS-Klassennamen sollten mit dem Präfix 'gantt-' beginnen.
- Damit der Style korrekt angewendet wird, verwenden Sie einen Selektor wie **.gantt-some div**, um Elemente innerhalb einer Gantt-Nachricht gezielt anzusprechen.

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

**Related example:** [Styling message boxes](https://snippet.dhtmlx.com/p950vym3)

## Modale Fenster und Tastatur-Interaktion

Die Tastaturunterstützung für modale Boxen wird über die Eigenschaft **gantt.message.keyboard** gesteuert, die standardmäßig auf *true* gesetzt ist.

Standardmäßig blockieren modale Boxen die Tastaturereignisse der Seite, mit Ausnahme bestimmter Tasten:

- "space" und "enter" setzen das Ergebnis der modalen Box auf *true*
- "escape" setzt das Ergebnis der modalen Box auf *false*

Wenn Sie **gantt.message.keyboard** auf *false* setzen, werden Tastaturereignisse nicht mehr blockiert und diese Tasten lösen keine modalen Ergebnisse mehr aus:

~~~js
gantt.message.keyboard = false; 
gantt.modalbox({...});
~~~

Dies ermöglicht die uneingeschränkte Nutzung der Tastatur, z. B. um Eingaben in Felder innerhalb modaler Boxen zu machen.

