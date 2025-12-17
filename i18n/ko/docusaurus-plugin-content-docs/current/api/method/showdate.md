---
sidebar_label: showDate
title: showDate method
description: "차트 영역을 스크롤하여 지정된 날짜를 보이도록 합니다."
---

# showDate

### Description

@short: 차트 영역을 스크롤하여 지정된 날짜를 보이도록 합니다.

@signature: showDate: (date: Date) =\> void

### Parameters

- `date` - (required) *Date* - 차트에서 보이도록 할 날짜

### Example

~~~jsx
gantt.showDate(new Date()); // 현재 날짜로 스크롤합니다.
~~~

### Details

기본적으로 [showDate](api/method/showdate.md) 메서드를 호출하면 Gantt가 지정된 날짜로 스크롤됩니다. 
하지만 **autosize** 모드가 활성화된 경우, 스크롤 대신 Gantt가 컨테이너 크기를 확장하여 페이지에 날짜를 표시합니다. 
이 동작을 다루는 자세한 내용은 [숨겨진 요소로 스크롤하기](api/config/autosize.md) 문서를 참고하세요.

### Related API
- [showTask](api/method/showtask.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)

