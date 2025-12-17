---
sidebar_label: confirm
title: confirm method
description: "zeigt eine Confirm-Message-Box an"
---

# confirm

### Description

@short: Zeigt eine Confirm-Message-Box an

@signature: confirm: (config: ConfirmBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (required) *ConfirmBoxConfig | string | number* -             kann entweder ein Konfigurationsobjekt für die Confirm-Box sein oder einfach der anzuzeigende Text

### Returns
- ` div` - (HTMLElement) - das div-Element, das die Confirm-Box enthält

### Example

~~~jsx
var box = gantt.confirm({
    text: "Weiter?",
    ok:"Ja", 
    cancel:"Nein",
    callback: function(result){
        if(result){
            gantt.message("Ja!");
        }else{
            gantt.message("Nein...");
        }
    }
});

// oder
var box = gantt.confirm("Möchten Sie fortfahren?");
~~~

### Details

Das Konfigurationsobjekt enthält die folgenden Eigenschaften:

- **id?** - (*number | string*) - optionaler Bezeichner für die Confirm-Box
- **text** - (*number | string*) - der Haupttext, der innerhalb der Confirm-Box angezeigt wird
- **title?** - (*number | string*) - optionaler Kopfzeilentext
- **ok?** - (*number | string*) - optionales Label für die "OK"-Schaltfläche
- **cancel?** - (*number | string*) - optionales Label für die "Abbrechen"-Schaltfläche
- **position?** - (*string*) - optionale Platzierung der Confirm-Box; derzeit wird nur "top" unterstützt, andernfalls ist die Standardplatzierung "center-align"
- **width?** - (*string*) - optionale Breite der Confirm-Box, angegeben als CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) Wert, z.B. "100px", "50%"
- **height?** - (*string*) - optionale Höhe der Confirm-Box, angegeben als CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) Wert, z.B. "100px", "50%"
- **callback? (result): void** - optionale Funktion, die ausgelöst wird, wenn eine Schaltfläche gedrückt wird. Erhält *true* oder *false* je nachdem, welche Schaltfläche gedrückt wurde
    - **_result_** - (*boolean*) - gibt an, welche Schaltfläche gedrückt wurde: **true** für "OK", **false** für "Abbrechen".


Für weitere Details zu den verfügbaren Konfigurationsoptionen für confirm Message-Boxen siehe den Artikel ["Popup-Nachrichten und Modale Boxen"](guides/message-boxes.md).

### Related API
- [alert](api/method/alert.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- ["Popup-Nachrichten und Modale Boxen"](guides/message-boxes.md)

### Change log
- hinzugefügt in Version 4.0

