---
sidebar_label: mixin
title: mixin 메서드
description: "'source' 객체의 속성을 'target' 객체에 추가합니다"
---

# mixin

### Description

@short: source 객체의 속성을 'target' 객체에 추가합니다

@signature: mixin: (target: CustomObject, source: CustomObject, force?: boolean) => void

### Parameters

- `target` - (required) *CustomObject* - 대상 객체
- `source` - (required) *CustomObject* - 소스 객체
- `force` -		(optional)	*boolean*	-	선택적이며, 참일 경우 'source'의 속성이 'target'의 일치하는 속성을 덮어씁니다. 거짓일 경우(기본값) 'target'에 이미 존재하는 속성은 생략됩니다

### Example

~~~jsx
gantt.mixin(target, source, force);
~~~

### Change log
- 버전 4.0에서 추가