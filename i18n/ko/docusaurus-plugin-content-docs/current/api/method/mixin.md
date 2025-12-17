---
sidebar_label: mixin
title: mixin method
description: "'source' 객체의 속성을 'target' 객체에 병합합니다."
---

# mixin

### Description

@short: 'source' 객체의 속성을 'target' 객체에 병합합니다.

@signature: mixin: (target: CustomObject, source: CustomObject, force?: boolean) =\> void

### Parameters

- `target` - (required) *CustomObject* - 새로운 속성을 받을 객체
- `source` - (required) *CustomObject* - 추가할 속성을 제공하는 객체
- `force` - (optional) *boolean* - 선택 사항으로, true일 경우 'source'의 속성이 'target'에 동일한 키가 있을 때 덮어씁니다. 기본값은 false로, 'target'의 기존 속성은 변경되지 않습니다.

### Example

~~~jsx
gantt.mixin(target, source, force);
~~~

### Change log
- 4.0 버전에 추가됨
