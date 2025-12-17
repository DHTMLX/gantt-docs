---
sidebar_label: server_utc
title: server_utc config
description: "позволяет конвертировать серверные даты между UTC и локальными часовыми поясами при обмене данными с сервером"
---

# server_utc

### Description

@short: Позволяет конвертировать серверные даты между UTC и локальными часовыми поясами при обмене данными с сервером

@signature: server_utc: boolean

### Example

~~~jsx
gantt.config.server_utc = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false
