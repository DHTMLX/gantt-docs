---
sidebar_label: message
title: message method
description: "öffnet ein Message-Box des angegebenen Typs"
---

# message

### Description

@short: Öffnet ein Message-Box des angegebenen Typs

@signature: message: MessagePopupObject

### Parameters

- `config` - (required) *object | string | number* -            kann entweder ein Konfigurationsobjekt für das Message-Box sein oder einfach der anzuzeigende Text

### Returns
- ` id` - (string | number) - die Kennung des Message-Box

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

Das Konfigurationsobjekt unterstützt diese Eigenschaften:

- **id?** - (*number | string*) - optional, die ID, die der Popup-Nachricht zugewiesen wird
- **text** - (*number | string*) - der anzuzeigende Nachrichteninhalt im Popup
- **type?** - (*string*) - optional, der CSS-Klassenname, der auf die Popup-Nachricht angewendet wird
- **expire?** - (*number*) - optional, wie lange es dauert, bis die Popup-Nachricht automatisch verschwindet. Ein Wert von -1 bedeutet, dass sie sichtbar bleibt, bis sie manuell geschlossen wird


Die **message**-Eigenschaft kann auch eine Funktion sein oder als Konfigurationsobjekt für die Popup-Nachricht verwendet werden, mit diesen Eigenschaften:

- **position** - (*string*) - wo die Popup-Nachricht erscheint. Optionen sind: "top", "bottom", "left", "right"

~~~js
gantt.message.position = "left";
~~~
- **keyboard** - (*boolean*) - bestimmt, ob Gantt Tastaturereignisse blockiert. Standard ist *true*.

~~~js
gantt.message.keyboard = false;
~~~
- **hide (id): any** - eine Methode, um die Popup-Nachricht auszublenden, wobei **id** als Argument übergeben wird:
    - **_id_** - (*number | string*) - die ID der auszublendenden Popup-Nachricht
~~~js
gantt.message.hide("popupId");
~~~

Weitere Informationen zu den verfügbaren Konfigurationsoptionen für Message-Boxen finden Sie im Artikel ["Popup-Nachrichten und Modale Boxen"](guides/message-boxes.md).

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- ["Popup-Nachrichten und Modale Boxen"](guides/message-boxes.md)

### Change log
- hinzugefügt in Version 4.0

