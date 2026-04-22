---
sidebar_label: env
title: env 구성
description: "현재 환경을 설명하는 플래그들의 집합"
---

# env

### Description

@short: 현재 환경을 설명하는 플래그들의 집합

@signature: env: any

### Example

~~~jsx
if (gantt.env.isEdge) {
    // 여기에 코드 작성
}
~~~

### Details

The possible flags are:

- isChrome    - Chrome인 경우 true로 설정
- isSafari    - Safari인 경우 true로 설정
- isEdge      - Edge인 경우 true로 설정
- isSalesforce - Gantt가 SalesForce 앱에서 실행 중인 경우 true로 설정
- isFF        - Firefox인 경우 true로 설정
- isIE        - Internet Explorer인 경우 true로 설정
- isOpera     - Opera인 경우 true로 설정
- isIPad      - iPad에서 Safari인 경우 true로 설정

### Change log
- 4.0 버전에 추가
- 9.0.11 버전에 업데이트