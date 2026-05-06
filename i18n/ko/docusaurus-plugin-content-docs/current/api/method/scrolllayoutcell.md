---
sidebar_label: scrollLayoutCell
title: scrollLayoutCell 메서드
description: "레이아웃 뷰를 지정된 위치로 스크롤합니다"
---

# scrollLayoutCell

### Description

@short: 레이아웃 뷰를 지정된 위치로 스크롤합니다

@signature: scrollLayoutCell: (name: string, x: number | null, y: number | null) =\> void

### Parameters

- `name` - (required) *string* - 레이아웃 뷰의 이름
- `x` - (required) *number | null* - 수평 스크롤 값 또는 'null' (스크롤 위치를 변경하지 않으려면 'null')
- `y` - (required) *number | null* - 수직 스크롤 값 또는 'null' (스크롤 위치를 변경하지 않으려면 'null')

### Example

~~~jsx
// 레이아웃 뷰를 수평 방향으로만 스크롤합니다
gantt.scrollLayoutCell("resourceTimeline", 50);

// 레이아웃 뷰를 수직 방향으로만 스크롤합니다
gantt.scrollLayoutCell("resourceTimeline", null, 50);

// 레이아웃 뷰를 수평 방향과 수직 방향으로 모두 스크롤합니다
gantt.scrollLayoutCell("resourceTimeline", 100, 100);
~~~

### Details

:::note
샘플: [Public methods to get the layout cell views and scroll them ](https://snippet.dhtmlx.com/0v4mmoxu)
:::

### Related API
- [scrollTo](api/method/scrollto.md)