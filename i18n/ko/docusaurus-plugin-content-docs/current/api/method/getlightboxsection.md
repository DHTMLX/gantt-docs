---
sidebar_label: getLightboxSection
title: getLightboxSection method
description: "라이트박스 섹션의 객체를 반환합니다."
---

# getLightboxSection

### Description

@short: 라이트박스 섹션의 객체를 반환합니다.

@signature: getLightboxSection: (name: string | number) =\> LightboxSectionState

### Parameters

- `name` - (required) *string | number* -    섹션의 이름

### Returns
- ` obj` - (LightboxSectionState) - 섹션 객체

### Example

~~~jsx
const time = gantt.getLightboxSection('time');
const descr = gantt.getLightboxSection('description');
 
//값을 가져옵니다.
const value = time.getValue();
const value1 = descr.getValue();
 
//값을 업데이트합니다.
descr.setValue('New Task'); // 단일 컨트롤이 있는 섹션의 경우
time.setValue(null,{
    start_date:new Date(2020,03,10), 
    end_date:new Date(2022,03,10), 
    duration:5
}); // 여러 컨트롤이 있는 섹션의 경우: 첫 번째 인자는 'null', 두 번째는 데이터 객체입니다.
~~~

### Details

이 섹션 객체는 다음 멤버들을 포함합니다:

## 속성

- **section** - (*object*) - 섹션의 구성 객체
    - **_id_** - (*string*) - 섹션 ID
    - **_name_** - (*string*) - 섹션 이름. 이 이름을 기반으로 gantt는 **locale.labels** 컬렉션에서 섹션의 레이블을 가져옵니다. 예를 들어, 'description' 섹션의 레이블은 **gantt.locale.labels.section_description** 입니다.
    - **_height_** - (*number*) - 섹션의 높이
    - **_map_to_** - (*string*) - 에디터와 연결된 속성 이름
    - **_type_** - (*string*) - 에디터 유형
    - **_focus_** - (*boolean*) - true일 경우, 라이트박스가 열릴 때 해당 필드에 포커스가 맞춰집니다.
- **node** - (*HTMLElement*) - 섹션 본문을 포함하는 div 요소
- **header** - (*HTMLElement*) - 섹션 헤더를 포함하는 div 요소
- **control** - (*HTMLCollection*) - 섹션 내에서 사용되는 컨트롤들의 컬렉션

## 메서드

- **getValue (): any** - 섹션의 데이터 객체를 반환합니다.
- **setValue (value, valueObject): any** - 섹션에 값들을 할당합니다. 섹션에 여러 컨트롤이 포함된 경우, 값 또는 여러 값을 포함하는 객체를 전달할 수 있습니다.
    - **_value_** - (*any*) - 섹션에 설정할 값
    - **_valueObject?_** - (*CustomObject*) - 선택 사항, 추가 속성을 포함하는 객체
