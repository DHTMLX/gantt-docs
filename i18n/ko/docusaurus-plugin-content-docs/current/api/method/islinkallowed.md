---
sidebar_label: isLinkAllowed
title: isLinkAllowed method
description: "지정된 링크가 올바른지 확인합니다"
---

# isLinkAllowed

### Description

@short: 지정된 링크가 올바른지 확인합니다

@signature: isLinkAllowed: (linkOrFrom: string | number | LinkForValidation, from_start?: boolean, to?: string | number | null | undefined, to_start?: boolean) =\> boolean

### Parameters

- `linkOrFrom` - (required) *string | number | LinkForValidation* - 소스(선행) 작업의 ID 또는 아래 속성을 가진 링크 객체 중 하나:
- `from_start` - (optional) *boolean* - 선택적이며, 링크가 소스(선행) 작업의 시작 부분에서 드래그되는지 여부를 나타냅니다 (*true*) 또는 끝에서인지 여부를 나타냅니다 (*false*). 첫 번째 매개변수가 객체로 지정된 경우에는 필요하지 않습니다
- `to` - (optional) *string | number | null | undefined* - 대상(후임) 작업의 ID. 대상 작업이 아직 지정되지 않은 경우 null 또는 undefined 값을 가질 수 있습니다. 첫 번째 매개변수가 객체로 지정된 경우에는 필요하지 않습니다
- `to_start` - (optional) *boolean* - 선택적이며, 링크가 대상(후임) 작업의 시작으로 드래그되는지 여부를 나타냅니다 (*true*) 또는 끝에서인지 여부를 나타냅니다 (*false*). 첫 번째 매개변수가 객체로 지정된 경우에는 필요하지 않습니다

### Returns
- ` value` - (boolean) - <i>true</i>, 링크가 올바른 경우. 그렇지 않으면 <i>false</i>

### Example

~~~jsx
const link = {
    source:2,
    target:2,
    type:gantt.config.link.start_to_start
};
if(gantt.isLinkAllowed(link))// -> false (소스와 타깃이 같기 때문)
    gantt.addLink(link);
~~~

### Details

링크 객체는 [Link](guides/link-properties.md) 객체와 다르며 오직 3개의 속성만 갖습니다:

- **source** - (*string | number*) - 소스(선행) 작업의 ID.
- **target** - (*string | number*) - 대상(후임) 작업의 ID.
- **type** - (*string*) - 링크 타입.

링크가 잘못된 것으로 간주되는 경우:

1. 소스 작업의 ID가 대상 작업의 ID와 같습니다.
2. 타입이 0, 1, 2, 3이 아닌 값으로 설정된 경우.
3. 링크의 유효성 검사에 실패한 경우.
4. 링크가 프로젝트 작업에서 하위 작업으로 생성된 경우. 프로젝트 작업의 날짜는 하위 작업의 날짜에 의존합니다.

:::note
메서드는 [onLinkValidation](api/event/onlinkvalidation.md) 이벤트를 호출합니다. 따라서 [onLinkValidation](api/event/onlinkvalidation.md) 이벤트가 `false`를 반환하면 링크도 잘못된 것으로 간주됩니다.
 
:::

참고로 메서드를 두 번째 방식으로 호출하는 방법도 있습니다:

~~~js
gantt.isLinkAllowed(from, from_start, to, to_start )
~~~

다음은 인수의 타입 설명입니다:

- **from** - (*string | number | object*) - 소스(선행) 작업의 ID 또는 아래 속성을 가진 링크 객체:
- **from_start?** - (*boolean*) - 선택적이며, 링크가 소스(선행) 작업의 시작 부분에서 드래그되는지 여부를 나타냅니다 (*true*) 또는 끝에서인지 여부를 나타냅니다 (*false*). 첫 번째 매개변수가 객체로 지정된 경우에는 필요하지 않습니다
- **to?** - (*string | number | null | undefined*) - 선택적이며, 대상(후임) 작업의 ID. 대상 작업이 아직 지정되지 않은 경우 null 또는 undefined 값을 가질 수 있습니다. 첫 번째 매개변수가 객체로 지정된 경우에는 필요하지 않습니다
- **to_start?** - (*boolean*) - 선택적이며, 링크가 대상(후임) 작업의 시작으로 드래그되는지 여부를 나타냅니다 (*true*) 또는 끝에서인지 여부를 나타냅니다 (*false*). 첫 번째 매개변수가 객체로 지정된 경우에는 필요하지 않습니다

예를 들어, 위의 코드를 아래와 같이 변경합니다:

~~~js
//var link = {
//    source:2,
//    target:2,
//    type:gantt.config.link.start_to_start
//};

if(gantt.isLinkAllowed(2, true, 2, true))// -> false (소스와 타깃이 같기 때문)
    //무언가를 수행하다
    
~~~