---
title: "날짜 연산"
sidebar_label: "날짜 연산"
---

# 날짜 연산

dhtmlxGantt는 [date](api/other/date.md) 객체를 포함하고 있으며, 이 객체는 날짜 포맷팅 메서드 집합을 제공합니다. 날짜 객체를 다루는 동안 이 메서드들을 사용할 수 있습니다.

이 문서에서는 특히 중요하고 일반적으로 사용되는 메서드들을 살펴봅니다. 전체 메서드 목록은 [date object page](api/other/date.md)에서 확인할 수 있습니다.


## Date 객체를 문자열로 변환

Date 객체를 문자열로 변환하려면 [date_to_str](api/other/date.md) 메서드를 사용합니다: 

 
*해당 메서드는 Date 객체를 지정된 형식의 문자열로 변환하는 함수를 반환합니다:*


~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2013, 05, 29)); // -> "29/06/2013"
~~~


## 문자열을 Date 객체로 변환

문자열을 Date 객체로 변환하려면 [str_to_date](api/other/date.md) 메서드를 사용합니다: 

 
*해당 메서드는 지정된 형식의 문자열을 Date 객체로 변환하는 함수를 반환합니다:*


다음과 같이 날짜 변환 함수를 생성할 수 있습니다:

~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2013"); // -> 29 June, 2013 00:00:00
~~~


## UTC로 변환

로컬 시간을 UTC로 변환하려면 [convert_to_utc](api/other/date.md) 메서드를 사용합니다:

~~~js
//29 June, 2013 14:00 (local time) -> 29 June, 2013 12:00 (utc)
var time = gantt.date.convert_to_utc(new Date(2013, 05, 29, 14, 00));
~~~


## 날짜에 시간 간격을 더하기(빼기)

지정된 날짜에 시간 간격을 더하기(빼기)하려면 [add](api/other/date.md) 메서드를 사용합니다:

~~~js
//adds 1 year to the specified date: 29 June, 2013 -> 29 June, 2014
var newDate = gantt.date.add(new Date(2013, 05, 29), 1, 'year');
~~~


:::note
전체 날짜 형식 지정 메서드 목록은 [여기](api/other/date.md)에서 확인할 수 있습니다.
:::