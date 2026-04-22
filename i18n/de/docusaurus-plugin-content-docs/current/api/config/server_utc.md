---
sidebar_label: server_utc
title: server_utc Konfiguration
description: "Aktiviert das Umrechnen von serverseitigen Datumsangaben von UTC in eine lokale Zeitzone (und umgekehrt), während Daten an den Server gesendet werden"
---

# server_utc

### Description

@short: Ermöglicht das Umrechnen von serverseitigen Datumsangaben von UTC in eine lokale Zeitzone (und umgekehrt), während Daten an den Server gesendet werden

@signature: server_utc: boolean

### Example

~~~jsx
gantt.config.server_utc = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false