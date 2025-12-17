---
sidebar_label: getLayoutView
title: getLayoutView method
description: "이름으로 레이아웃 뷰 객체를 가져옵니다"
---

# getLayoutView

### Description

@short: 이름으로 레이아웃 뷰 객체를 가져옵니다

@signature: getLayoutView: (name: string) =\> any

### Parameters

- `name` - (required) *string* - 레이아웃 뷰의 이름

### Returns
- ` view` - (object) - 레이아웃 뷰 객체

### Example

~~~jsx
gantt.getLayoutView("resourceTimeline").posFromDate(new Date(2025, 05, 08));
// 결과: 210

gantt.getLayoutView("resourceTimeline").dateFromPos(210);
// 결과: 2025년 6월 8일
~~~

### Details

이 메서드는 레이아웃 뷰 객체에 접근할 수 있게 하여 여러 유용한 메서드를 사용할 수 있도록 합니다. 포함된 메서드는 다음과 같습니다:

- [dateFromPos](api/method/datefrompos.md) - 뷰 내 특정 가로 위치에 해당하는 날짜를 가져옵니다
- [posFromDate](api/method/posfromdate.md) - 주어진 날짜에 대한 뷰 내 상대적인 가로 위치를 찾습니다
- [getScale](api/method/getscale.md) - 뷰의 시간 스케일 구성 정보를 가져옵니다

뷰를 특정 위치로 이동시키려면 [scrollLayoutCell](api/method/scrolllayoutcell.md) 메서드를 사용할 수 있습니다.

:::note

**Related example:** [Public methods to get the layout cell views and scroll them](https://snippet.dhtmlx.com/0v4mmoxu)

:::

### Related Guides
- [간트 레이아웃](guides/layout-config.md)

