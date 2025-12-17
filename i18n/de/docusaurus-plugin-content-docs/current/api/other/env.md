---
sidebar_label: env
title: env config
description: "eine Sammlung von Flags, die die aktuelle Umgebung anzeigen"
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

Hier sind die Flags, auf die du stoßen könntest:

- isChrome    - true, wenn der Browser Chrome ist
- isSafari    - true, wenn der Browser Safari ist
- isEdge    - true, wenn der Browser Edge ist
- isSalesforce - true, wenn Gantt innerhalb einer SalesForce-App läuft
- isFF        - true, wenn der Browser Firefox ist
- isIE        - true, wenn der Browser Internet Explorer ist
- isOpera    - true, wenn der Browser Opera ist
- isIPad    - true, wenn der Browser Safari auf einem iPad ist

### Change log
- hinzugefügt in Version 4.0
- aktualisiert in 9.0.11
