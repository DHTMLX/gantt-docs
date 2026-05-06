---
sidebar_label: server_utc
title: server_utc config
description: "позволяет преобразовывать даты на стороне сервера из UTC в локальную временную зону (и обратно) при отправке данных на сервер"
---

# server_utc

### Description

@short: Позволяет преобразовывать даты на стороне сервера из UTC в локальную временную зону (и обратно) при отправке данных на сервер

@signature: server_utc: boolean

### Example

~~~jsx
gantt.config.server_utc = true;
 
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** false