---
sidebar_label: scale_offset_minimal
title: scale_offset_minimal config
description: "Steuert, ob die minimale Skalen-Einheit (bei Verwendung mehrerer Skalen) als Größe des führenden und abschließenden Leerraums verwendet wird"
---

# scale_offset_minimal

### Description

@short: Steuert, ob die minimale Skalen-Einheit (bei Verwendung mehrerer Skalen) als Größe des führenden und abschließenden Leerraums verwendet wird

@signature: scale_offset_minimal: boolean

### Example

~~~jsx
gantt.config.scale_offset_minimal = false;
~~~

**Default value:** true

### Details

Wenn das Skalenintervall nicht explizit festgelegt ist (mittels der Optionen [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md)), bestimmt dhtmlxGantt es basierend auf den frühesten und spätesten Terminen der Aufgaben. Es wird außerdem ein leerer Intervall am Anfang und Ende der Skala hinzugefügt. Standardmäßig entspricht dieser leere Intervall der kleinsten Einheit unter den verwendeten Skalen (falls mehrere Skalen angewendet werden).

Wenn diese Option deaktiviert ist, fügt dhtmlxGantt einen leeren Intervall basierend auf der **unit**-Eigenschaft hinzu, die in der Option [scales](api/config/scales.md) definiert ist.

