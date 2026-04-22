---
sidebar_label: confirm
title: confirm method
description: "zeigt eine Confirm-Message-Box an"
---

# confirm

### Description

@short: Öffnet ein Bestätigungs-Dialogfenster

@signature: confirm: (config: ConfirmBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (required) *ConfirmBoxConfig | string | number* - entweder ein Objekt mit der Konfiguration des Bestätigungsfensters oder der anzuzeigende Text

### Returns
- ` div` - (HTMLElement) - der Div-Container des Bestätigungsfensters

### Example

~~~jsx
var box = gantt.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        if(result){
            gantt.message("Yes!");
        }else{
            gantt.message("No...");
        }
    }
});

// or
var box = gantt.confirm("Do you want to continue?");
~~~

### Details

Das Konfigurationsobjekt enthält die folgenden Eigenschaften:

- **id?** - (*number | string*) - optional, die ID des Bestätigungsfensters
- **text** - (*number | string*) - der Text des Bestätigungsfenster-Inhalts
- **title?** - (*number | string*) - optional, der Text der Kopfzeile
- **ok?** - (*number | string*) - optional, der Text der Schaltfläche „OK“
- **cancel?** - (*number | string*) - optional, der Text der Schaltfläche „Abbrechen“
- **position?** - (*string*) - optional, die Position des Bestätigungsfensters; derzeit wird nur der Wert „top“ unterstützt, jeder andere Wert führt zu „center-align“
- **width?** - (*string*) - optional, die Breite des Bestätigungsfensters (festgelegt als CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) Werte, z. B. „100px“, „50%“)
- **height?** - (*string*) - optional, die Höhe des Bestätigungsfensters (festgelegt als CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) Werte, z. B. „100px“, „50%“)
- **callback? (result): void** - optional, die Funktion, die beim Klicken auf einen Button aufgerufen wird. Nimmt *true* oder *false* als Parameter (je nach gedrücktem Button)
    - **_result_** - (*boolean*) - Ergebnis des gedrückten Buttons: **true** für "OK", **false** für "Abbrechen".

Für weitere Details zu unterstützten Konfigurationsoptionen eines Bestätigungs-Nachrichtenfensters siehe den Artikel [Popup-Nachrichten und Modal-Fenster](guides/message-boxes.md).

### Related API
- [alert](api/method/alert.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/message-boxes.md)

### Change log
- Hinzugefügt in Version 4.0