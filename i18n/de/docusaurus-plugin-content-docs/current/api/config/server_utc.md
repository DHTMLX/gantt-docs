---
sidebar_label: server_utc
title: server_utc config
description: "Ermöglicht die Umrechnung von serverseitigen Datumsangaben zwischen UTC und lokalen Zeitzonen beim Datenaustausch mit dem Server"
---

# server_utc

### Description

@short: Ermöglicht die Umrechnung von serverseitigen Datumsangaben zwischen UTC und lokalen Zeitzonen beim Datenaustausch mit dem Server

@signature: server_utc: boolean

### Example

~~~jsx
gantt.config.server_utc = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false
