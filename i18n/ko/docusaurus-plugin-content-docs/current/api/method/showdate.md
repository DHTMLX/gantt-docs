---
sidebar_label: showDate
title: showDate method
description: "차트 영역을 스크롤하여 지정된 날짜를 화면에 보이게 합니다"
---

# showDate

### Description

@short: 차트 영역을 스크롤하여 지정된 날짜를 화면에 보이게 합니다

@signature: showDate: (date: Date) =\> void

### Parameters

- `date` - (필수) *Date* - 차트에 표시할 날짜

### Example

~~~jsx
gantt.showDate(new Date()); //현재 날짜를 표시합니다
~~~

### Details

기본 모드에서 Gantt는 [showDate](api/method/showdate.md) 메소드를 사용할 때 자동으로 스크롤합니다.
그러나 **autosize** 모드가 활성화되면 지정된 날짜를 화면에 표시하는 대신 페이지에 보이도록 컨테이너의 크기를 확장합니다.
이 문제를 해결하는 방법은 [Scrolling to hidden elements](api/config/autosize.md) 문서를 참고하십시오.

### Related API
- [showTask](api/method/showtask.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)