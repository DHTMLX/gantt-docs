---
sidebar_label: getLayoutView
title: getLayoutView 메서드
description: "레이아웃 뷰의 이름으로 객체를 반환합니다"
---

# getLayoutView

### Description

@short: 레이아웃 뷰의 이름으로 해당 객체를 반환합니다

@signature: getLayoutView: (name: string) =\> any

### Parameters

- `name` - (required) *string* - 레이아웃 뷰의 이름

### Returns
- ` view` - (object) - 레이아웃 뷰의 객체

### Example

~~~jsx
gantt.getLayoutView("resourceTimeline").posFromDate(new Date(2025, 05, 08));
// 반환 값: 210

gantt.getLayoutView("resourceTimeline").dateFromPos(210);
// 반환 값: 2025년 6월 8일
~~~

### Details

메서드는 레이아웃 뷰의 반환된 객체에 몇 가지 메서드를 적용할 수 있게 해줍니다. 메서드는:

- [dateFromPos](api/method/datefrompos.md) - 뷰에서 지정된 수평 위치의 날짜를 얻습니다
- [posFromDate](api/method/posfromdate.md) - 뷰에서 지정된 날짜의 상대적 수평 위치를 얻습니다
- [getScale](api/method/getscale.md) - 뷰의 시간 축 구성을 반환합니다

지정된 위치로 뷰를 스크롤하려면 [scrollLayoutCell](api/method/scrolllayoutcell.md) 메서드를 적용합니다.

:::note
샘플: [레이아웃 셀 뷰를 가져오고 스크롤하는 공개 메서드](https://snippet.dhtmlx.com/0v4mmoxu)
:::

### Related Guides
- [간트 레이아웃](guides/layout-config.md)
- [간트 레이아웃 구성](guides/layout-config.md)