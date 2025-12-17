---
sidebar_label: isLinkAllowed
title: isLinkAllowed method
description: "지정된 링크가 유효한지 확인합니다."
---

# isLinkAllowed

### Description

@short: 지정된 링크가 유효한지 확인합니다.

@signature: isLinkAllowed: (linkOrFrom: string | number | LinkForValidation, from_start?: boolean, to?: string | number | null | undefined, to_start?: boolean) =\> boolean

### Parameters

- `linkOrFrom` - (required) *string | number | LinkForValidation* -         소스(선행) 작업의 ID이거나 다음 속성을 가진 링크 객체일 수 있습니다:
- `from_start` - (optional) *boolean* - 선택 사항이며, 링크가 소스(선행) 작업의 시작(*true*)에서 드래그되고 있는지 아니면 끝(*false*)에서 드래그되고 있는지를 나타냅니다. 첫 번째 매개변수가 객체인 경우 필요하지 않습니다.
- `to` - (optional) *string | number | null | undefined* -         선택 사항이며, 대상(후행) 작업의 ID입니다. 대상 작업이 아직 지정되지 않은 경우 *null* 또는 *undefined*일 수 있습니다. 첫 번째 매개변수가 객체인 경우 필요하지 않습니다.
- `to_start` - (optional) *boolean* - 선택 사항이며, 링크가 대상(후행) 작업의 시작(*true*)으로 드래그되고 있는지 아니면 끝(*false*)으로 드래그되고 있는지를 나타냅니다. 첫 번째 매개변수가 객체인 경우 필요하지 않습니다.

### Returns
- ` value` - (boolean) - <i>true</i> - 링크가 유효한 경우. 그렇지 않으면 <i>false</i>.

### Example

~~~jsx
const link = {
    source:2,
    target:2,
    type:gantt.config.link.start_to_start
};
if(gantt.isLinkAllowed(link))// -> false (source와 target이 같기 때문에)
    gantt.addLink(link);
~~~

### Details

여기서 링크 객체는 [Link](guides/link-properties.md) 객체와 다르며 다음 3가지 속성만 포함합니다:

- **source** - (*string | number*) - 소스(선행) 작업의 ID.
- **target** - (*string | number*) - 대상(후행) 작업의 ID.
- **type** - (*string*) - 링크 타입.

링크가 무효로 간주되는 경우는 다음과 같습니다:

1. 소스 작업의 ID가 대상 작업의 ID와 동일한 경우.
2. 타입이 0, 1, 2, 3 이외의 값으로 설정된 경우.
3. 링크가 유효성 검증에 실패한 경우.
4. 프로젝트 작업에서 그 하위 작업으로 링크가 생성된 경우 (프로젝트 작업의 날짜는 하위 작업에 의존하기 때문).

:::note

이 메서드는 [onLinkValidation](api/event/onlinkvalidation.md) 이벤트를 트리거합니다. 따라서 해당 이벤트가 `false`를 반환하면 링크도 무효로 간주됩니다.
 
:::

<br>

또는, 메서드는 다음과 같이 호출할 수 있습니다:

~~~js
gantt.isLinkAllowed(from, from_start, to, to_start )
~~~

각 인수의 의미는 다음과 같습니다:

- **from** - (*string | number | object*) - 소스(선행) 작업의 ID 또는 다음 속성을 가진 링크 객체.
- **from_start?** - (*boolean*) - 선택 사항이며 링크가 소스 작업의 시작(*true*)에서 드래그되고 있는지, 끝(*false*)에서 드래그되고 있는지를 지정합니다. 첫 번째 매개변수가 객체인 경우 필요하지 않습니다.
- **to?** - (*string | number | null | undefined*) - 선택 사항이며 대상(후행) 작업의 ID입니다. 아직 지정되지 않은 경우 *null* 또는 *undefined*일 수 있습니다. 첫 번째 매개변수가 객체인 경우 필요하지 않습니다.
- **to_start?** - (*boolean*) - 선택 사항이며 링크가 대상 작업의 시작(*true*)으로 드래그되고 있는지, 끝(*false*)으로 드래그되고 있는지를 지정합니다. 첫 번째 매개변수가 객체인 경우 필요하지 않습니다.

예를 들어, 위 예제는 다음과 같이 다시 작성할 수 있습니다:

~~~js
//var link = {
//    source:2,
//    target:2,
//    type:gantt.config.link.start_to_start
//};

if(gantt.isLinkAllowed(2, true, 2, true))// -> false (source와 target이 같기 때문에)
    //무언가 실행
~~~

