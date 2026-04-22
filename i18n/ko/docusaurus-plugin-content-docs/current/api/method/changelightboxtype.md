---
sidebar_label: changeLightboxType
title: changeLightboxType 메서드
description: "작업의 유형에 따라 라이트박스를 다시 렌더링합니다"
---

# changeLightboxType

### Description

@short: 작업의 유형에 따라 라이트박스를 다시 렌더링합니다

@signature: changeLightboxType: (type: string) =\> void

### Parameters

- `type` - (필수) *string* - 작업 유형

### Example

~~~jsx
gantt.changeLightboxType(gantt.config.types.project);
~~~

### Details

이 메서드는 라이트박스를 다시 렌더링하고 가능하다면 모든 입력 값을 저장합니다. 구조를 재구성하기 위해 이 메서드는 지정된 유형에 대한 구성(configuration for the specified type)을 사용합니다.

라이트박스의 유형이 매개변수에 있는 유형과 같으면, 이 메서드는 라이트박스를 다시 렌더링하지 않습니다.

### Related API
- [onLightboxChange](api/event/onlightboxchange.md)