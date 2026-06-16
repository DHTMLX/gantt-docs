---
sidebar_label: license
title: license config
description: "dhtmlxGantt의 license 이름을 반환합니다."
---

# license

### Description

@short: dhtmlxGantt의 라이선스 이름을 반환합니다

@signature: license: string

### Returns
- ` license` - (string) - 라이선스의 이름

### Example

~~~jsx
console.log(gantt.license);
// -> "enterprise"
~~~

### Details

이 메서드는 진단에 사용할 수 있는 짧은 라이선스 이름을 반환합니다. 

가능한 값은:

- "mit" - 무료 Community 에디션(v10 이상)
- "gpl" - 레거시 무료 에디션(v9.x 및 그 이전)
- "evaluation"
- "individual"
- "commercial"
- "enterprise"
- "ultimate"
- "site"

### Change log
- "mit" 값이 v10.0에 추가됨
- v6.2.2에 추가됨