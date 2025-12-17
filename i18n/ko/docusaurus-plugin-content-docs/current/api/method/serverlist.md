---
sidebar_label: serverList
title: serverList method
description: "옵션 목록을 반환합니다"
---

# serverList

### Description

@short: 옵션 목록을 반환합니다

@signature: serverList: (list_name: string | number, options?: any[]) =\> any[]

### Parameters

- `list_name` - (required) *string | number* -         목록 이름
- `options` - (optional) *array* - 옵션을 포함하는 배열

### Returns
- ` list` - (array) - 옵션 배열

### Example

~~~jsx
// 'my_list'라는 이름의 옵션 목록을 가져옵니다
var list = gantt.serverList("my_list"); 
...
// 지정된 옵션으로 목록을 생성하고 반환합니다
var list = gantt.serverList("options", [
    {key: 1, label: "John"},
    {key: 2, label: "Adam"},
    {key: 3, label: "Diane"}
]);
~~~

### Details

- 첫 번째 매개변수만 전달하면, 해당 이름과 일치하는 목록이 존재할 경우 그 목록을 반환합니다.
- 두 개의 매개변수로 호출하면, dhtmlxGantt가 지정된 이름과 옵션으로 목록을 생성합니다.
  동일한 이름의 목록이 이미 존재하면, 그 데이터가 업데이트됩니다.
- [Lightbox select 컨트롤](guides/select.md)은 *gantt.serverList*를 사용해 자동으로 채울 수 있습니다.
  두 개의 매개변수로 호출하면, dhtmlxGantt가 목록을 생성하거나 업데이트합니다.

이 방법은 select 옵션과 같은 컬렉션을 이름이 지정된 목록으로 관리하여 편리하게 업데이트할 수 있게 합니다.

~~~js
// 이 설정은 'persons'라는 이름의 목록에서 
// select 요소로 옵션을 로드할 수 있게 합니다
gantt.config.lightbox.sections=[   
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"persons", height:23, type:"select", 
    options:serverList("persons", persons_array), map_to:"section_id" }
]; 
~~~

### Related API
- [updateCollection](api/method/updatecollection.md)

