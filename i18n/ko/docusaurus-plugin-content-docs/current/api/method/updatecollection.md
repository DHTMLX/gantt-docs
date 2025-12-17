---
sidebar_label: updateCollection
title: updateCollection method
description: "지정된 컬렉션을 새로운 옵션으로 업데이트합니다."
---

# updateCollection

### Description

@short: 지정된 컬렉션을 새로운 옵션으로 업데이트합니다.

@signature: updateCollection: (collection: string | number, options: any[]) =\> boolean

### Parameters

- `collection` - (required) *string | number* -         업데이트할 컬렉션의 이름
- `options` - (required) *array* - 컬렉션의 새로운 값들

### Returns
- ` collection` - (boolean) - 업데이트가 성공했으면 true; 컬렉션을 찾지 못했으면 false

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

- 이 메서드는 [onOptionsLoad](api/event/onoptionsload.md) 이벤트를 트리거하고 lightbox를 새로고침합니다.
- 컬렉션은 처음에 [serverList](api/method/serverlist.md) 메서드를 사용하여 생성할 수 있습니다.

## 예제

## #Select 컨트롤

다음과 같이 설정된 lightbox를 고려해보세요:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", map_to:"priority", type:"select", 
        options:gantt.serverList("priorities")},  /*!*/                                                                  
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

이 설정에서는 'priorities'라는 컬렉션을 통해 select 컨트롤의 옵션을 업데이트할 수 있습니다. <br>
'priorities' 컬렉션을 업데이트하려면, 다음과 같이 호출하면 됩니다:
~~~js
gantt.updateCollection("priorities", new_priorities_array);
~~~

### Related API
- [serverList](api/method/serverlist.md)
- [onOptionsLoad](api/event/onoptionsload.md)

