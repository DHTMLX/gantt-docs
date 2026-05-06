---
sidebar_label: modalbox
title: modalbox Methode
description: "ruft ein modalbox auf"
---

# modalbox

### Description

@short: Ruft eine modalbox auf

@signature: modalbox: (config: ModalBoxConfig) =\> HTMLElement

### Parameters

- `config` - (erforderlich) *ModalBoxConfig* - die Konfiguration des Modalbox-Fensters

### Returns
- ` div` - (HTMLElement) - der Div-Container des Modalbox-Fensters

### Example

~~~jsx
let box = gantt.modalbox({
    title: "Close",
     type: "alert-warning"
});
~~~

### Details

Das Konfigurationsobjekt verwendet die folgenden Eigenschaften:

- **id?** - (*number | string*) - optional, die ID des Modalbox-Fensters
- **text** - (*number | string*) - der Text des Inhalts des Modalbox-Fensters
- **title?** - (*number | string*) - optional, der Text der Kopfzeile
- **position?** - (*string*) - optional, die Position des Modalbox-Fensters; derzeit wird nur ein Wert unterstützt - "top", jeder andere Wert führt zu "center-align"
- **buttons** - (*string[] | number[] | ModalboxButton[]*) - das Array der Buttons
- **width?** - (*string*) - optional, die Breite des Modalbox-Fensters (als CSS [\<length\>](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder [\<percentage\>](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) Werte, z.B. "100px", "50%")
- **height?** - (*string*) - optional, die Höhe des Modalbox-Fensters (als CSS [\<length\>](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder [\<percentage\>](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) Werte, z.B. "100px", "50%")
- **callback? (result): void** - optional, die Funktion, die beim Klicken eines Buttons aufgerufen wird. Nimmt *true* oder *false* als Parameter (abhängig vom geklickten Button)
    - **_result_** - (*string | number | boolean*) - Das Ergebnis der Callback-Funktion entspricht dem stringifizierten Index des gedrückten Buttons aus dem Array ("0", "1", "2",...)


Die ModalboxButton hat folgende Typen:

- **label** - (*string | number*) - der Text des Buttons
- **value?** - (*string | number | boolean*) - optional, der Wert, der im *result*-Argument der *callback*-Funktion zurückgegeben wird
- **css?** - (*string | number*) - optional, ein benutzerdefinierter Klassenname für den Button, mit dem Präfix "gantt_"


Für zusätzliche Details zu unterstützten Konfigurationsoptionen eines Modalbox siehe den Artikel [Popup Messages and Modal Boxes](guides/message-boxes.md).

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/message-boxes.md)

### Change log
- hinzugefügt in Version 4.0