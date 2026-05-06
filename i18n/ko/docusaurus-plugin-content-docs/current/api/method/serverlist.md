---
sidebar_label: serverList
title: serverList 메서드
description: "옵션 목록을 반환합니다"
---

# serverList

### Description

@short: 옵션 목록을 반환합니다

@signature: serverList: (list_name: string | number, options?: any[]) =\> any[]

### Parameters

- `list_name` - (required) *string | number* -         리스트의 이름
-  `options` -	(optional) *array*	-	옵션 배열

### Returns
- ` list` - (array) - 옵션 목록

### Example

~~~jsx
// 'my_list'라는 이름의 옵션 목록을 반환합니다
var list = gantt.serverList("my_list"); 
...
// 지정된 목록을 생성하고 반환합니다
var list = gantt.serverList("options", [
    {key: 1, label: "John"},
    {key: 2, label: "Adam"},
    {key: 3, label: "Diane"}
]);
~~~

### Details

- 첫 번째 매개변수만 전달하여 호출하면, 해당 이름의 목록을 반환합니다(존재하는 경우).
- 매개변수 2개로 호출하면, dhtmlxGantt는 지정된 이름과 옵션으로 목록을 생성합니다. 이미 같은 이름의 목록이 존재하면, 그 목록의 데이터를 업데이트합니다.
- [Lightbox select controls](guides/select.md) 은 자동으로 채워질 수 있습니다 *gantt.serverList*를 사용하여.
- 매개변수 2개로 호출하면, dhtmlxGantt는 지정된 이름과 옵션으로 목록을 생성합니다. 이미 같은 이름의 목록이 존재하면, 그 목록의 데이터를 업데이트합니다.

그렇기 때문에 컬렉션(예: select 옵션)을 업데이트해야 할 필요가 있을 때, 이를 옵션의 명명된 목록으로 생성하는 것이 좋습니다.

~~~js
// 이러한 선언으로 옵션을 로드할 수 있습니다
// 'persons'라는 이름의 리스트에서 select 요소로 로드합니다
gantt.config.lightbox.sections=[   
    {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
    {name:"persons", height:23, type:"select", 
    options:serverList("persons", persons_array), map_to:"section_id" }
]; 
~~~

### Related API
- [updateCollection](api/method/updatecollection.md)