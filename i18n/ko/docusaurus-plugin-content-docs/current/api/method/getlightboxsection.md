---
sidebar_label: getLightboxSection
title: getLightboxSection 메서드
description: "라이트박스의 섹션 객체를 반환합니다"
---

# getLightboxSection

### Description

@short: 라이트박스 섹션의 객체를 반환합니다

@signature: getLightboxSection: (name: string | number) =\> LightboxSectionState

### Parameters

- `name` - (required) *string | number* -    섹션의 이름

### Returns
- ` obj` - (LightboxSectionState) - 섹션 객체

### Example

~~~jsx
const time = gantt.getLightboxSection('time');
const descr = gantt.getLightboxSection('description');
 
//gets the value
const value = time.getValue();
const value1 = descr.getValue();
 
//sets the value
descr.setValue('New Task'); //단일 컨트롤을 포함하는 섹션의 경우
time.setValue(null,{
    start_date:new Date(2020,03,10), 
    end_date:new Date(2022,03,10), 
    duration:5
}); //다중 컨트롤 섹션의 경우: 첫 번째 매개변수는 'null', 두 번째는 데이터 객체
~~~

### Details

이 섹션 객체는 다음 멤버들을 포함합니다:

## Properties

- **section** - (*object*) - 섹션의 구성 객체
    - **_id_** - (*string*) - 섹션 ID
    - **_name_** - (*string*) - 섹션 이름. 이름에 따라, gantt는 섹션의 라벨을 **locale.labels** 컬렉션에서 가져옵니다. 예를 들어, 'description' 섹션의 경우 라벨은 **gantt.locale.labels.section_description**로 가져옵니다.
    - **_height_** - (*number*) - 섹션 높이
    - **_map_to_** - (*string*) - 에디터에 매핑된 속성의 이름
    - **_type_** - (*string*) - 에디터 타입
    - **_focus_** - (*boolean*) - 만약 *true*로 설정되면, 라이트박스를 열 때 관련 필드에 포커스가 설정됩니다
- **node** - (*HTMLElement*) - 섹션 본문을 포함하는 div
- **header** - (*HTMLElement*) - 섹션 헤더를 담은 div
- **control** - (*HTMLCollection*) - 섹션에서 사용되는 컨트롤의 컬렉션


  
## Methods

- **getValue (): any** - 섹션의 데이터를 담은 객체를 반환합니다
- **setValue (value, valueObject): any** - 섹션의 값을 설정합니다. 이 메서드는 하나의 값이든, 섹션에 여러 컨트롤이 있는 경우 값들이 담긴 객체를 전달합니다
    - **_value_** - (*any*) - 섹션의 값
    - **_valueObject?_** - (*CustomObject*) - 선택적, 임의의 속성을 가진 객체