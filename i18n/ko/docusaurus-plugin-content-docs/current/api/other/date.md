---
sidebar_label: date
title: date config
description: "날짜 포맷팅 유틸리티 모음"
---

# date

### Description

@short: 날짜 포맷팅 유틸리티 모음

@signature: date: DateHelpers


### Details

**date** 객체는 날짜를 다루기 위한 다양한 메서드를 제공합니다:

<ul>
  <li>
  <b>add (date, number, unit): Date</b> - 지정된 날짜에 특정 시간 단위를 더하거나 빼서 조정합니다.
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 수정할 날짜 </li>
  <li><b><i>number</i></b> - (<i>number</i>) 더할(양수) 또는 뺄(음수) 단위 수 </li>
  <li><b><i>unit</i></b> - (<i>string</i>) 시간 단위: 'minute', 'hour', 'day', 'week', 'month', 'year'. </li>
~~~js
// 지정한 날짜에 1년을 더함: 2019년 6월 29일 -> 2020년 6월 29일
var newDate = gantt.date.add(new Date(2019, 05, 29), 1, 'year');
~~~
  </ul>
  </li>
  <li>
  <b>add_quarter (date, number): Date</b> - 날짜에 분기(3개월 단위)를 더하거나 뺍니다.
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 조정할 날짜 </li>
  <li><b><i>number</i></b> - (<i>number</i>) 더할(양수) 또는 뺄(음수) 분기 수 </li> 
~~~js
// 지정한 날짜에 1분기(3개월)를 더함: 
// 2019년 6월 29일 -> 2019년 9월 29일
var newDate = gantt.date.add_quarter(new Date(2019, 05, 29), 1);
~~~
  </ul>
  </li>
  <li>
  <b>convert_to_utc (date): Date</b> - 로컬 시간을 UTC 시간으로 변환합니다.
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 변환할 날짜 </li>
~~~js
// 2019년 6월 29일 14:00 (로컬) -> 2019년 6월 29일 12:00 (UTC)
var time = gantt.date.convert_to_utc(new Date(2019, 05, 29, 14, 00));
~~~
  </ul>
  </li>
  <li>
  <b>copy (date): Date</b> - Date 객체의 복사본을 생성합니다.
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 복사할 날짜 </li>
~~~js
var copy = gantt.date.copy(new Date(2019, 05, 29));// -> 2019년 6월 29일
~~~
  </ul>
  </li>
  <li>
  <b>date_part (date): Date</b> - 날짜의 시간 부분을 자정(00:00:00)으로 초기화합니다.
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 조정할 날짜 </li>
~~~js
// 2019년 6월 29일 14:30:10 -> 2019년 6월 29일 00:00:00
var date = gantt.date.date_part(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>date_to_str (format, utc): Function</b> - Date 객체를 지정된 포맷의 문자열로 변환하는 함수를 생성합니다.
  <ul>
  <li><b><i>format</i></b> - (<i>string</i>) 원하는 날짜 포맷 ([날짜 형식 지정](guides/date-format.md) 참고) </li>
  <li><b><i>utc?</i></b> - (<i>boolean</i>) 로컬 시간을 UTC로 변환할지 여부 </li>
~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2019, 05, 29)); // -> "29/06/2019"
~~~
  </ul>
  </li>
  <li>
  <b>day_start (date): Date</b> - 날짜의 시간을 자정으로 설정합니다. <b>date_part</b>와 동일하며, Day 뷰에서 표시 날짜를 결정하는 데 사용되고 커스터마이징 가능합니다.
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 조정할 날짜 </li>
~~~js
// 2019년 6월 29일 14:30:10 -> 2019년 6월 29일 00:00:00
var date = gantt.date.day_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>getISOWeek (date): number</b> - ISO-8601 기준으로, 주가 월요일부터 시작하는 날짜의 주 번호를 반환합니다.
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 평가할 날짜 </li>
~~~js
var week = gantt.date.getISOWeek(new Date(2019, 05, 29));// ->26
~~~
  </ul>
  </li>
  <li>
  <b>getUTCISOWeek (date): number</b> - 로컬 시간을 UTC로 변환한 후, 해당 날짜의 주 번호를 반환합니다.
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 평가할 날짜 </li>
~~~js
var week = gantt.date.getUTCISOWeek(new Date(2019, 05, 29));// ->26
~~~
  </ul>
  </li>
  <li>
  <b>getWeek (date): number</b> - 설정([start_on_monday](api/config/start_on_monday.md))에 따라 주가 월요일 또는 일요일부터 시작하는 날짜의 주 번호를 반환합니다.
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 평가할 날짜 </li>
~~~js
// 주가 일요일부터 시작
gantt.config.start_on_monday = false;

var isoWeek = gantt.date.getISOWeek(new Date(2019, 2, 25)); // ->12
var week = gantt.date.getWeek(new Date(2019, 2, 25)); // ->13
~~~
  </ul>
  </li>
  <li>
  <b>month_start (date): Date</b> - 주어진 날짜의 월 첫째 날로 설정된 Date 객체를 반환하며, 시간은 자정으로 초기화됩니다.
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 조정할 날짜 </li>
~~~js
// 2019년 6월 29일 14:30 -> 2019년 6월 1일 00:00
var firstDay = gantt.date.month_start(new Date(2019, 05, 29, 14, 30));
~~~
  </ul>
  </li>
  <li>
  <b>parseDate (date, format): Date</b> - 지정된 포맷의 문자열을 Date 객체로 변환합니다.
  <ul>
  <li><b><i>date</i></b> - (<i>string</i>) 날짜 문자열 </li>
  <li><b><i>format</i></b> - (<i>string</i>) 날짜 문자열 포맷 ([날짜 형식 지정](guides/date-format.md) 참고) </li>
~~~js
var date = gantt.date.parseDate("29/06/2019","%d/%m/%Y");//-> 2019년 6월 29일 00:00:00
~~~
  </ul>
  </li>
  <li>
  <b>str_to_date (format, utc): Function</b> - 지정된 포맷의 문자열을 Date 객체로 변환하는 함수를 생성합니다.
  <ul>
  <li><b><i>format</i></b> - (<i>string</i>) 예상 날짜 포맷 ([날짜 형식 지정](guides/date-format.md) 참고) </li>
  <li><b><i>utc?</i></b> - (<i>boolean</i>) 로컬 시간을 UTC로 변환할지 여부 </li>
~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2019"); // -> 2019년 6월 29일 00:00:00
~~~
  </ul>
  </li>
  <li>
  <b>time_part (date): number</b> - Date 객체의 시간 부분을 자정 이후 초 단위 숫자로 반환합니다.
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 평가할 날짜 </li>
~~~js
var time = gantt.date.time_part(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>to_fixed (num): string</b> - 10 미만의 숫자는 앞에 0을 붙여 문자열로 반환하며, 10 이상은 문자열로 그대로 반환합니다.
  <ul>
  <li><b><i>num</i></b> - (<i>number</i>) 포맷할 숫자 </li>
~~~js
var num1 = gantt.date.to_fixed(2);// ->"02"
var num2 = gantt.date.to_fixed(10);// ->"10"
~~~
  </ul>
  </li>
  <li>
  <b>minute_start (date): Date</b> - 초를 0으로 설정하고 연, 월, 일, 시, 분은 그대로 유지한 날짜를 반환합니다.
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 조정할 날짜 </li>
~~~js
// 2019년 6월 29일 14:30:10 -> 2019년 6월 29일 14:30:00
var date = gantt.date.minute_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>hour_start (date): Date</b> - 분과 초를 0으로 초기화하고 연, 월, 일, 시는 유지한 날짜를 반환합니다.
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 조정할 날짜 </li>
~~~js
// 2019년 6월 29일 14:30:10 -> 2019년 6월 29일 14:00:00
var date = gantt.date.hour_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>week_start (date): Date</b> - 주어진 날짜의 해당 주 첫째 날을 자정으로 설정하여 반환합니다.
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 조정할 날짜 </li>
~~~js
// 2019년 6월 29일 14:30 -> 2019년 6월 24일 00:00
var weekStart = gantt.date.week_start(new Date(2019, 05, 29, 14, 30));
~~~
  </ul>
  </li>
  <li>
  <b>quarter_start (date): Date</b> - 날짜가 속한 분기의 첫 달 첫 날을 자정으로 설정하여 반환합니다.
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 조정할 날짜 </li>
~~~js
// 2019년 6월 29일 14:30:10 -> 2019년 4월 1일 00:00:00
var date = gantt.date.quarter_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>year_start (date): Date</b> - 주어진 날짜가 속한 연도의 첫날을 자정으로 설정하여 반환합니다.
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 조정할 날짜 </li>
~~~js
// 2019년 6월 29일 14:30 -> 2019년 1월 1일 00:00
var yearStart = gantt.date.year_start(new Date(2019, 05, 29, 14, 30));
~~~
  </ul>
  </li>
</ul>

