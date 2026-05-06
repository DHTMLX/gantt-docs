---
sidebar_label: config
title: config config
description: "definiert Konfigurationsoptionen für Daten, Skala, Steuerungen"
---

# config

### Description

@short: Definiert Konfigurationsoptionen für Datumsangaben, Skala und Steuerelemente

@signature: config: GanttConfigOptions

### Example

~~~jsx
//setzt das Format der Zeitachse
gantt.config.date_scale = "%F, %Y";
 
gantt.init("gantt_here");
~~~

### Details

Die Eigenschaften des config-Objekts werden in einem separaten Kapitel der Haupt-API-Seite [Gantt API: Properties](api/overview/properties-overview.md) beschrieben.