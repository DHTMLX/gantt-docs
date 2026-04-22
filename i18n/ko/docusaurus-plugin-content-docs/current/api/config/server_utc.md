---
sidebar_label: server_utc
title: server_utc 구성
description: "서버 측 날짜를 UTC에서 로컬 시간대로 변환하고(그 반대 방향으로도) 서버로 데이터를 전송하는 동안 이를 활성화합니다"
---

# server_utc

### Description

@short: 서버 측 날짜를 UTC에서 로컬 시간대로 변환하고(그 반대 방향으로도) 서버로 데이터를 전송하는 동안 이를 활성화합니다

@signature: server_utc: boolean

### Example

~~~jsx
gantt.config.server_utc = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false