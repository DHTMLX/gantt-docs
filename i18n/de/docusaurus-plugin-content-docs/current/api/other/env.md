---
sidebar_label: env
title: env Konfiguration
description: "eine Reihe von Flags, die die aktuelle Umgebung beschreiben"
---

# env

### Description

@short: Eine Sammlung von Flags, die die aktuelle Umgebung anzeigen

@signature: env: any

### Example

~~~jsx
if (gantt.env.isEdge) {
    // dein Code
}
~~~

### Details

Die möglichen Flags lauten:

- isChrome    - auf true gesetzt, wenn der Browser Chrome ist
- isSafari    - auf true gesetzt, wenn der Browser Safari ist
- isEdge      - auf true gesetzt, wenn der Browser Edge ist
- isSalesforce - auf true gesetzt, wenn Gantt innerhalb einer SalesForce-App läuft
- isFF        - auf true gesetzt, wenn der Browser Firefox ist
- isIE        - auf true gesetzt, wenn der Browser Internet Explorer ist
- isOpera     - auf true gesetzt, wenn der Browser Opera ist
- isIPad      - auf true gesetzt, wenn der Browser Safari auf IPad ist

### Change log
- hinzugefügt in Version 4.0
- aktualisiert in 9.0.11
