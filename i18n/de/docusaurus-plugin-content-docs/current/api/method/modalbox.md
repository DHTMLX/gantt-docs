---
sidebar_label: modalbox
title: modalbox method
description: "öffnet eine modalbox"
---

# modalbox

### Description

@short: Öffnet eine modalbox

@signature: modalbox: (config: ModalBoxConfig) =\> HTMLElement

### Parameters

- `config` - (required) *ModalBoxConfig* - die Konfigurationseinstellungen für die modalbox

### Returns
- ` div` - (HTMLElement) - das div-Element, das die modalbox enthält

### Example

~~~jsx
let box = gantt.modalbox({
    title: "Close",
     type: "alert-warning"
});
~~~

### Details

Das Konfigurationsobjekt umfasst folgende Eigenschaften:

- **id?** - (*number | string*) - optional, die eindeutige Kennung für die modalbox
- **text** - (*number | string*) - der Inhaltstext, der in der modalbox angezeigt wird
- **title?** - (*number | string*) - optional, der Header-Text der modalbox
- **position?** - (*string*) - optional, steuert die Position der modalbox; unterstützt derzeit nur "top", jeder andere Wert führt zur Standardposition "center-align"
- **buttons** - (*string[] | number[] | ModalboxButton[]*) - ein Array, das die anzuzeigenden Buttons spezifiziert
- **width?** - (*string*) - optional, legt die Breite der modalbox mit CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) Werten fest, z.B. "100px" oder "50%"
- **height?** - (*string*) - optional, legt die Höhe der modalbox mit CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) Einheiten fest, z.B. "100px" oder "50%"
- **callback? (result): void** - optional, eine Funktion, die ausgelöst wird, wenn ein Button angeklickt wird. Die Funktion erhält *true* oder *false* abhängig vom angeklickten Button
    - **_result_** - (*string | number | boolean*) - der Callback erhält den stringifizierten Index des gedrückten Buttons aus dem Array ("0", "1", "2", ...)


Der Typ ModalboxButton umfasst folgende Eigenschaften:

- **label** - (*string | number*) - der Beschriftungstext des Buttons
- **value?** - (*string | number | boolean*) - optional, der Wert, der als *result* in der *callback*-Funktion zurückgegeben wird
- **css?** - (*string | number*) - optional, eine benutzerdefinierte CSS-Klasse für den Button, die mit dem Präfix "gantt_" beginnen sollte


Für weitere Informationen zu den Konfigurationsoptionen der modalbox siehe den Artikel ["Popup-Nachrichten und Modale Boxen"](guides/message-boxes.md).

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)

### Related Guides
- ["Popup-Nachrichten und Modale Boxen"](guides/message-boxes.md)

### Change log
- hinzugefügt in Version 4.0

