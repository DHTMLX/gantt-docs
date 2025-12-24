---
title: "날짜 작업"
sidebar_label: "날짜 작업"
---

# 날짜 작업


dhtmlxGantt는 다양한 날짜 포매팅 메서드를 제공하는 [date](api/other/date.md) 객체를 기본으로 제공합니다. 이 메서드들은 날짜 객체를 다룰 때 유용하게 사용할 수 있습니다.

이 문서에서는 주요하고 자주 사용되는 메서드들을 소개합니다. 전체 메서드 목록은 [date object page](api/other/date.md)에서 확인하실 수 있습니다.


## Date 객체를 문자열로 변환하기


Date 객체를 문자열로 변환하려면 [date_to_str](api/other/date.md) 메서드를 사용할 수 있습니다: 


*이 메서드는 지정된 패턴에 따라 Date 객체를 문자열로 포매팅하는 함수를 반환합니다:*
~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2013, 05, 29)); // -> "29/06/2013"
~~~


## 문자열을 Date 객체로 변환하기

문자열을 다시 Date 객체로 변환하려면 [str_to_date](api/other/date.md) 메서드를 사용하세요: 


*이 메서드는 지정된 형식의 문자열을 Date 객체로 파싱하는 함수를 반환합니다:*


아래와 같이 날짜 파싱 함수를 만들 수 있습니다:

~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2013"); // -> 2013년 6월 29일 00:00:00
~~~



## UTC로 변환하기

로컬 시간을 UTC로 변환하려면 [convert_to_utc](api/other/date.md) 메서드를 사용하세요:

~~~js
//2013년 6월 29일 14:00 (로컬 시간) -> 2013년 6월 29일 12:00 (UTC)
var time = gantt.date.convert_to_utc(new Date(2013, 05, 29, 14, 00));
~~~

## 날짜에 시간 간격 더하기(빼기)

특정 날짜에 시간 간격을 더하거나 빼려면 [add](api/other/date.md) 메서드를 사용하세요:

~~~js
//지정한 날짜에 1년을 더합니다: 2013년 6월 29일 -> 2014년 6월 29일
var newDate = gantt.date.add(new Date(2013, 05, 29), 1, 'year');
~~~


:::note
날짜 포매팅 메서드 전체 목록은 [여기](api/other/date.md)에서 확인하실 수 있습니다.
:::

