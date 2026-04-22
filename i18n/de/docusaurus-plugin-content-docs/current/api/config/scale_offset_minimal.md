---
sidebar_label: scale_offset_minimal
title: scale_offset_minimal Konfiguration
description: "legt die minimale Skaleneinheit (falls mehrere Skalen verwendet werden) als Intervall des Anfangs- bzw. Endleerraums fest"
---

# scale_offset_minimal

### Description

@short: Legt die minimale Skaleneinheit fest (falls mehrere Skalen verwendet werden) als Intervall des Anfangs- bzw. Endleerraums

@signature: scale_offset_minimal: boolean

### Example

~~~jsx
gantt.config.scale_offset_minimal = false;
~~~

**Standardwert:** true

### Details

Falls das Skalenteil-Intervall nicht explizit festgelegt ist (durch die Optionen [start_date](api/config/start_date.md), [end_date](api/config/end_date.md)), berechnet dhtmlxGantt es anhand der Termine der frühesten und spätesten Aufgaben. 
Außerdem wird am Anfang und am Ende der Skala ein leeres Intervall hinzugefügt. Standardmäßig entspricht dieses 'leere' Intervall der kleinsten Einheit der verwendeten Skalen (falls mehrere Skalen verwendet werden). 

Wenn Sie die Option deaktivieren, fügt dhtmlxGantt ein leeres Intervall hinzu, das dem Wert der **unit**-Eigenschaft der [scales](api/config/scales.md) Option entspricht.