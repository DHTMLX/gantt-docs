---
sidebar_label: license
title: license config
description: "dhtmlxGantt의 license 이름을 반환합니다."
---

# license

### Description

@short: DhtmlxGantt의 license 이름을 반환합니다.

@signature: license: string

### Returns
- ` license` - (string) - license의 이름

### Example

~~~jsx
console.log(gantt.license);
// -> "enterprise"
~~~

### Details

이 메서드는 진단 목적으로 유용한 간단한 license 이름을 제공합니다.

가능한 값은 다음과 같습니다:

- "gpl"
- "evaluation"
- "individual"
- "commercial"
- "enterprise"
- "ultimate"
- "site"

### Change log
- v6.2.2에 추가됨
