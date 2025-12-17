---
sidebar_label: getLabel
title: getLabel method
description: "라이트박스 내 select 컨트롤의 라벨을 가져옵니다."
---

# getLabel

### Description

@short: 라이트박스 내 select 컨트롤의 라벨을 가져옵니다.

@signature: getLabel: (property: string, key: string | number) =\> string

### Parameters

- `property` - (required) *string* - 컨트롤이 대응하는 데이터 속성 이름
- `key` - (required) *string | number* -    옵션의 식별자. 이 값은 작업(task)의 데이터 속성과 매칭되어 <br> select 옵션을 작업과 연결합니다.

### Returns
- ` label` - (string) - 라이트박스 내 select 컨트롤에 연결된 라벨

### Example

~~~jsx
gantt.config.lightbox.sections=[
    {name:"custom", type:"select", map_to:"unit_id", options:[
        {key:1, label:"James Smith"}, 
        {key:2, label:"John Williams"}]}
];

const holder2 = gantt.getLabel("unit_id", 2);// ->"John Williams"
~~~

### Details

:::note

이 메서드는 라이트박스 내 'select' 컨트롤에 대해서만 작동하며, 특정 옵션의 라벨을 가져옵니다.
 
:::

<br>
