---
sidebar_label: server_utc
title: server_utc config
description: "서버와 데이터 교환 시 서버 측 날짜를 UTC와 로컬 타임존 간에 변환할 수 있도록 합니다."
---

# server_utc

### Description

@short: 서버와 데이터 교환 시 서버 측 날짜를 UTC와 로컬 타임존 간에 변환할 수 있도록 합니다.

@signature: server_utc: boolean

### Example

~~~jsx
gantt.config.server_utc = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false
