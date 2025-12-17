---
sidebar_label: changeLightboxType
title: changeLightboxType method
description: "작업의 유형에 따라 라이트박스를 업데이트합니다."
---

# changeLightboxType

### Description

@short: 작업의 유형에 따라 라이트박스를 업데이트합니다.

@signature: changeLightboxType: (type: string) =\> void

### Parameters

- `type` - (required) *string* - 작업 유형

### Example

~~~jsx
gantt.changeLightboxType(gantt.config.types.project);
~~~

### Details

이 메서드는 라이트박스를 새로 고치고, 가능하다면 입력된 데이터를 저장하려고 시도합니다. 지정된 유형에 대한 [설정](guides/default-edit-form.md)을 사용하여 구조를 재구성합니다.

현재 라이트박스 유형이 매개변수로 전달된 유형과 일치하면 업데이트가 수행되지 않습니다.

### Related API
- [onLightboxChange](api/event/onlightboxchange.md)

