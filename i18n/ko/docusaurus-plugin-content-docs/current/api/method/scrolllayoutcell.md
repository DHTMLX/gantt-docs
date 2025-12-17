---
sidebar_label: scrollLayoutCell
title: scrollLayoutCell method
description: "레이아웃 뷰를 지정된 위치로 이동합니다"
---

# scrollLayoutCell

### Description

@short: 레이아웃 뷰를 지정된 위치로 이동합니다

@signature: scrollLayoutCell: (name: string, x: number | null, y: number | null) =\> void

### Parameters

- `name` - (required) *string* - 레이아웃 뷰의 이름
- `x` - (required) *number | null* -    선택 사항, 가로 스크롤 값 또는 'null' (가로 위치를 변경하지 않으려면)
- `y` - (required) *number | null* -    선택 사항, 세로 스크롤 값 또는 'null' (세로 위치를 변경하지 않으려면)

### Example

~~~jsx
// 레이아웃 뷰를 가로 방향으로만 스크롤합니다
gantt.scrollLayoutCell("resourceTimeline", 50);

// 레이아웃 뷰를 세로 방향으로만 스크롤합니다
gantt.scrollLayoutCell("resourceTimeline", null, 50);

// 레이아웃 뷰를 가로와 세로 방향 모두 스크롤합니다
gantt.scrollLayoutCell("resourceTimeline", 100, 100);
~~~

### Details

:::note

**Related example:** [레이아웃 셀 뷰에 접근하고 그 스크롤을 제어하는 공개 메서드들](https://snippet.dhtmlx.com/0v4mmoxu)

:::

### Related API
- [scrollTo](api/method/scrollto.md)

