---
sidebar_label: alert
title: alert Methode
description: "ruft ein Alert-Meldungsfenster auf"
---

# alert

### Description

@short: Ruft ein Alert-Meldungsfenster auf

@signature: alert: (config: AlertBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (erforderlich) *AlertBoxConfig | string | number* - entweder ein Objekt mit der Konfiguration des Alert-Fensters oder der anzuzeigende Text

### Returns
- ` div` - (HTMLElement) - der Div-Container des Alert-Fensters

### Example

~~~jsx
var box = gantt.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});

// oder
var box = gantt.alert("This is an alert box");
~~~

### Details

Das Konfigurationsobjekt verwendet die folgenden Eigenschaften:

- **id?** - (*number | string*) - optional, die ID des Alert-Fensters
- **text** - (*number | string*) - der Text des Inhalts des Alert-Fensters
- **title?** - (*number | string*) - optional, der Text der Kopfzeile
- **ok?** - (*number | string*) - optional, der Text der "OK" Schaltfläche
- **position?** - (*string*) - optional, die Position des Alert-Fensters; zurzeit wird nur der Wert 'top' unterstützt, jeder andere Wert führt zu "center-align"
- **width?** - (*string*) - optional, die Breite des Alert-Fensters (festgelegt als CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) Werte, z. B. "100px", "50%")
- **height?** - (*string*) - optional, die Höhe des Alert-Fensters (festgelegt als CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) Werte, z. B. "100px", "50%")
- **callback? (result): void** - optional, die Funktion, die beim Klicken des Buttons aufgerufen wird. Nimmt *true* als Parameter entgegen (abhängig vom geklickten Button)
    - **_result_** - (*boolean*) - das Ergebnis des geklickten Buttons, gibt immer **true** zurück (weil es nur die 'OK'-Schaltfläche gibt)

Für weitere Details zu unterstützten Konfigurationsoptionen eines Alert-Nachrichtenfensters siehe den Artikel [Popup-Meldungen und Modalfenster](guides/message-boxes.md).

### Related API
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup-Meldungen und Modalfenster](guides/message-boxes.md)

### Change log
- Hinzugefügt in Version 4.0