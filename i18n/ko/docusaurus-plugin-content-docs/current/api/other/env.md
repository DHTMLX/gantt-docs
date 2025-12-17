---
sidebar_label: env
title: env config
description: "현재 환경을 나타내는 플래그들의 모음"
---

# env

### Description

@short: 현재 환경을 나타내는 플래그들의 모음

@signature: env: any

### Example

~~~jsx
if (gantt.env.isEdge) {
    // your code
}
~~~

### Details

다음은 자주 사용되는 플래그들입니다:

- isChrome    - 브라우저가 Chrome일 때 true
- isSafari    - 브라우저가 Safari일 때 true
- isEdge    - 브라우저가 Edge일 때 true
- isSalesforce - Gantt가 SalesForce 앱 내에서 실행 중일 때 true
- isFF        - 브라우저가 Firefox일 때 true
- isIE        - 브라우저가 Internet Explorer일 때 true
- isOpera    - 브라우저가 Opera일 때 true
- isIPad    - 브라우저가 iPad의 Safari일 때 true

### Change log
- version 4.0에 추가됨
- version 9.0.11에서 업데이트됨
