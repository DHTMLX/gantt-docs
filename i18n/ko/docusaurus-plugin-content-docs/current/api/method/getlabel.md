---
sidebar_label: getLabel
title: getLabel 메서드
description: "라이트박스에서 선택 컨트롤의 레이블을 가져옵니다"
---

# getLabel

### Description

@short: 라이트박스의 선택 컨트롤의 레이블을 가져옵니다

@signature: getLabel: (property: string, key: string | number) =\> string

### Parameters

- `property` - (required) *string* - 컨트롤이 매핑된 데이터 속성의 이름
- `key` - (required) *string | number* - 옵션의 id. 이 매개변수는 작업의 데이터 속성과 비교되어 선택 항목을 작업에 할당합니다

### Returns
- ` label` - (string) - 라이트박스의 선택 컨트롤의 레이블

### Example

~~~jsx
gantt.config.lightbox.sections=[
    {name:"custom", type:"select", map_to:"unit_id", options:[
        {key:1, label:"James Smith"}, 
        {key:2, label:"John Williams"}]}
];

const holder2 = gantt.getLabel("unit_id", 2);// →"John Williams"
~~~

### Details

:::note
이 메서드는 라이트박스의 'select' 컨트롤에서 특정 옵션의 레이블을 얻기 위해서만 적용됩니다.
:::