---
sidebar_label: date
title: date config
description: "一组日期格式化工具集合"
---

# date

### Description

@short: 一组日期格式化工具集合

@signature: date: DateHelpers

### Details

**date** 对象提供了多种操作日期的方法:

<ul>
  <li>
  <b>add (date, number, unit): Date</b> - 通过增加或减少指定时间单位来调整给定的日期
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 需要修改的日期 </li>
  <li><b><i>number</i></b> - (<i>number</i>) 要添加（正数）或减去（负数）的单位数量 </li>
  <li><b><i>unit</i></b> - (<i>string</i>) 时间单位:'minute', 'hour', 'day', 'week', 'month', 'year'。 </li>
~~~js
//给指定日期加1年：2019年6月29日 -> 2020年6月29日
var newDate = gantt.date.add(new Date(2019, 05, 29), 1, 'year');
~~~
</ul>
  </li>
  <li>
  <b>add_quarter (date, number): Date</b> - 给日期添加或减少若干季度（每季度3个月）
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 需要调整的日期 </li>
  <li><b><i>number</i></b> - (<i>number</i>) 要添加（正数）或减去（负数）的季度数 </li> 
~~~js
//给指定日期加1个季度（3个月）：
//2019年6月29日 -> 2019年9月29日
var newDate = gantt.date.add_quarter(new Date(2019, 05, 29), 1);
~~~
  </ul>
  </li>
  <li>
  <b>convert_to_utc (date): Date</b> - 将本地时间转换为UTC时间
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 需要转换的日期 </li>
~~~js
//2019年6月29日14:00（本地时间） -> 2019年6月29日12:00（UTC时间）
var time = gantt.date.convert_to_utc(new Date(2019, 05, 29, 14, 00));
~~~
  </ul>
  </li>
  <li>
  <b>copy (date): Date</b> - 复制一个Date对象的副本
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 需要复制的日期 </li>
~~~js
var copy = gantt.date.copy(new Date(2019, 05, 29));// -> 2019年6月29日
~~~
  </ul>
  </li>
  <li>
  <b>date_part (date): Date</b> - 将日期的时间部分重置为午夜（00:00:00）
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 需要调整的日期 </li>
~~~js
//2019年6月29日14:30:10 -> 2019年6月29日00:00:00
var date = gantt.date.date_part(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>date_to_str (format, utc): Function</b> - 生成一个函数，将Date对象转换为格式化字符串
  <ul>
  <li><b><i>format</i></b> - (<i>string</i>) 期望的日期格式（参见 [日期格式规范](guides/date-format.md)） </li>
  <li><b><i>utc?</i></b> - (<i>boolean</i>) 是否将本地时间转换为UTC </li>
~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2019, 05, 29)); // -> "29/06/2019"
~~~
  </ul>
  </li>
  <li>
  <b>day_start (date): Date</b> - 将日期时间设置为午夜，与 <b>date_part</b> 相同。此方法用于Day视图确定显示日期，且可自定义
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 需要调整的日期 </li>
~~~js
//2019年6月29日14:30:10 -> 2019年6月29日00:00:00
var date = gantt.date.day_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>getISOWeek (date): number</b> - 返回日期对应的ISO-8601周数，周一为一周的第一天
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 需要计算的日期 </li>
~~~js
var week = gantt.date.getISOWeek(new Date(2019, 05, 29));// ->26
~~~
  </ul>
  </li>
  <li>
  <b>getUTCISOWeek (date): number</b> - 将本地时间转换为UTC后，返回该日期的周数
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 需要计算的日期 </li>
~~~js
var week = gantt.date.getUTCISOWeek(new Date(2019, 05, 29));// ->26
~~~
  </ul>
  </li>
  <li>
  <b>getWeek (date): number</b> - 返回日期的周数，周起始日根据 [start_on_monday](api/config/start_on_monday.md) 中配置可为周一或周日
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 需要计算的日期 </li>
~~~js
// 周从周日开始
gantt.config.start_on_monday = false;

var isoWeek = gantt.date.getISOWeek(new Date(2019, 2, 25)); // ->12
var week = gantt.date.getWeek(new Date(2019, 2, 25)); // ->13
~~~
  </ul>
  </li>
  <li>
  <b>month_start (date): Date</b> - 返回给定日期所在月份的第一天，时间重置为午夜
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 需要调整的日期 </li>
~~~js
//2019年6月29日14:30 -> 2019年6月1日00:00
var firstDay = gantt.date.month_start(new Date(2019, 05, 29, 14, 30));
~~~
  </ul>
  </li>
  <li>
  <b>parseDate (date, format): Date</b> - 将指定格式的字符串转换为Date对象
  <ul>
  <li><b><i>date</i></b> - (<i>string</i>) 日期字符串 </li>
  <li><b><i>format</i></b> - (<i>string</i>) 日期字符串的格式（参见 [日期格式规范](guides/date-format.md)） </li>
~~~js
var date = gantt.date.parseDate("29/06/2019","%d/%m/%Y");//-> 2019年6月29日00:00:00
~~~
  </ul>
  </li>
  <li>
  <b>str_to_date (format, utc): Function</b> - 创建一个函数，将指定格式的字符串转换为Date对象
  <ul>
  <li><b><i>format</i></b> - (<i>string</i>) 预期的日期格式（参见 [日期格式规范](guides/date-format.md)） </li>
  <li><b><i>utc?</i></b> - (<i>boolean</i>) 是否将本地时间转换为UTC </li>
~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2019"); // -> 2019年6月29日00:00:00
~~~
  </ul>
  </li>
  <li>
  <b>time_part (date): number</b> - 返回Date对象的时间部分，以午夜起算的秒数表示
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 需要计算的日期 </li>
~~~js
var time = gantt.date.time_part(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>to_fixed (num): string</b> - 格式化小于10的数字，前面补零；10及以上数字保持不变，返回字符串
  <ul>
  <li><b><i>num</i></b> - (<i>number</i>) 需要格式化的数字 </li>
~~~js
var num1 = gantt.date.to_fixed(2);// ->"02"
var num2 = gantt.date.to_fixed(10);// ->10
~~~
  </ul>
  </li>
  <li>
  <b>minute_start (date): Date</b> - 返回秒数置零的日期，保留年、月、日、小时和分钟
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 需要调整的日期 </li>
~~~js
//2019年6月29日14:30:10 -> 2019年6月29日14:30:00
var date = gantt.date.minute_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>hour_start (date): Date</b> - 返回分钟和秒数均置零的日期，保留年、月、日和小时
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 需要调整的日期 </li>
~~~js
//2019年6月29日14:30:10 -> 2019年6月29日14:00:00
var date = gantt.date.hour_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>week_start (date): Date</b> - 返回给定日期所在周的第一天，时间重置为午夜
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 需要调整的日期 </li>
~~~js
//2019年6月29日14:30 -> 2019年6月24日00:00
var weekStart = gantt.date.week_start(new Date(2019, 05, 29, 14, 30));
~~~
  </ul>
  </li>
  <li>
  <b>quarter_start (date): Date</b> - 返回给定日期所在季度的首月，时间重置为午夜
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 需要调整的日期 </li>
~~~js
//2019年6月29日14:30:10 -> 2019年4月1日00:00:00
var date = gantt.date.quarter_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>year_start (date): Date</b> - 返回给定日期所在年的第一天，时间设置为午夜
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) 需要调整的日期 </li>
~~~js
//2019年6月29日14:30 -> 2019年1月1日00:00
var yearStart = gantt.date.year_start(new Date(2019, 05, 29, 14, 30));
~~~
  </ul>
  </li>
</ul>

