---
sidebar_label: server_utc
title: server_utc config
description: "允许在与服务器交换数据时，将服务器端日期在 UTC 和本地时区之间转换"
---

# server_utc

### Description

@short: 允许在与服务器交换数据时，将服务器端日期在 UTC 和本地时区之间转换

@signature: server_utc: boolean

### Example

~~~jsx
gantt.config.server_utc = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false
