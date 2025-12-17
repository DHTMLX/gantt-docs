---
sidebar_label: alert
title: alert method
description: "ruft eine Alert-Nachrichtenbox auf"
---

# alert

### Description

@short: Ruft eine Alert-Nachrichtenbox auf

@signature: alert: (config: AlertBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (required) *AlertBoxConfig | string | number* -             kann entweder ein Objekt mit Einstellungen für die Alert-Box oder einfach der anzuzeigende Text sein

### Returns
- ` div` - (HTMLElement) - das div-Element, das die Alert-Box enthält

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

Das Konfigurationsobjekt unterstützt folgende Eigenschaften:

- **id?** - (*number | string*) - optional, die ID der Alert-Box
- **text** - (*number | string*) - der Haupttext innerhalb der Alert-Box
- **title?** - (*number | string*) - optional, Kopfzeilentext
- **ok?** - (*number | string*) - optional, Beschriftung für den "OK"-Button
- **position?** - (*string*) - optional, Position der Alert-Box; aktuell wird nur "top" unterstützt, jeder andere Wert wird auf "center-align" gesetzt
- **width?** - (*string*) - optional, Breite der Alert-Box im CSS-Format [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage), z.B. "100px", "50%"
- **height?** - (*string*) - optional, Höhe der Alert-Box im CSS-Format [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) oder
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage), z.B. "100px", "50%"
- **callback? (result): void** - optional, eine Funktion, die ausgelöst wird, wenn der Button geklickt wird. Der Parameter *result* ist immer *true* (da es nur einen "OK"-Button gibt)
    - **_result_** - (*boolean*) - gibt das Ergebnis des geklickten Buttons an, immer **true**


Für weitere Details zu den Konfigurationsoptionen der Alert-Box siehe den Artikel ["Popup-Nachrichten und Modale Boxen"](guides/message-boxes.md).

### Related API
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- ["Popup-Nachrichten und Modale Boxen"](guides/message-boxes.md)

### Change log
- hinzugefügt in Version 4.0

