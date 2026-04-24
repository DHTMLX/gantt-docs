---
sidebar_label: updateCollection
title: updateCollection 메서드
description: "지정된 컬렉션을 새로운 옵션으로 업데이트합니다"
---

# updateCollection

### Description

@short: 지정된 컬렉션을 새로운 옵션으로 업데이트합니다

@signature: updateCollection: (collection: string | number, options: any[]) =\> boolean

### Parameters

- `collection` - (required) *string | number* -         the name of the collection to update
- `options` - (required) *array* - 컬렉션의 새로운 값들

### Returns
- ` collection` - (boolean) - 업데이트가 성공하면 true; 컬렉션을 찾을 수 없으면 false

### Example

~~~jsx
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", height:22, map_to:"priority", type:"select", /*!*/
        options:gantt.serverList("priorities", values_array)},     /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.updateCollection("priorities", new_values_array); /*!*/
~~~

### Details

- 메서드는 [onOptionsLoad](api/event/onoptionsload.md) 이벤트를 호출하고 라이트박스를 재설정합니다. 
- 컬렉션은 [serverList](api/method/serverlist.md) 메서드로 생성할 수 있습니다.

### Examples

#### Select 컨트롤

다음과 같이 라이트박스를 가지고 있다고 가정해 봅시다:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", map_to:"priority", type:"select", 
        options:gantt.serverList("priorities")},  /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

이와 같은 선언으로 'priorities' 목록을 통해 select 컨트롤의 옵션을 업데이트할 수 있습니다. 
'priorities' 목록을 업데이트하려면 다음을 사용할 수 있습니다:
~~~js
gantt.updateCollection("priorities", new_priorities_array);
~~~

### Related API
- [serverList](api/method/serverlist.md)
- [onOptionsLoad](api/event/onoptionsload.md)