---
sidebar_label: message
title: message method
description: "ruft eine Nachrichtenbox des angegebenen Typs auf"
---

# message

### Description

@short: Ruft eine Nachrichtenbox des angegebenen Typs auf

@signature: message: MessagePopupObject

### Parameters

- `config` - (required) *object | string | number* - entweder ein Objekt mit der Konfiguration der Nachrichtenbox oder der anzuzeigende Text

### Returns
- ` id` - (string | number) - die ID der Nachrichtenbox

### Example

~~~jsx
let box = gantt.message({ 
    type:"warning", 
    text:"Are you sure you want to do it?"
});

// oder
box = gantt.message("This is the message");
~~~


### Details

Das Konfigurationsobjekt verwendet die folgenden Eigenschaften:

- **id?** - (*number | string*) - optional, die ID der Popup-Nachricht
- **text** - (*number | string*) - der Inhalt der Popup-Nachricht
- **type?** - (*string*) - optional, die Klasse der Popup-Nachricht
- **expire?** - (*number*) - optional, die Zeitspanne, bis die Popup-Nachricht verschwindet. -1 bedeutet, sie verschwindet nicht automatisch


Die **message**-Eigenschaft kann eine Funktion sein, kann aber auch als Konfigurationsobjekt für die Popup-Nachricht verwendet werden. Sie hat die folgenden Eigenschaften:

- **position** - (*string*) - die Position der Popup-Nachricht. Mögliche Werte sind: "top", "bottom", "left", "right"

~~~js
gantt.message.position = "left";
~~~
- **keyboard** - (*boolean*) - gibt an, ob Gantt Tastatur-Ereignisse blockieren soll. Standardwert: true.

~~~js
gantt.message.keyboard = false;
~~~
- **hide (id): any** - Eine Funktion, die die Popup-Nachricht ausblendet. Verwendet **id** als Parameter:
    - **_id_** - (*number | string*) - die ID der Popup-Nachricht
~~~js
gantt.message.hide("popupId");
~~~

Für weitere Details zu unterstützten Konfigurationsoptionen einer Nachrichtenbox siehe den Artikel [Popup-Nachrichten und Modalboxen](guides/message-boxes.md)

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup-Nachrichten und Modalboxen](guides/message-boxes.md)

### Change log
- hinzugefügt in Version 4.0