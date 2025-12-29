---
title: "日期操作"
sidebar_label: "日期操作"
---

# 日期操作

dhtmlxGantt 提供了 [date](api/other/date.md) 对象，该对象包含多种日期格式化方法。这些方法在处理日期对象时非常实用。

本文介绍了一些主要且常用的方法。完整方法列表可参见 [date object page](api/other/date.md)。

## 将 Date 对象转换为字符串

要将 Date 对象转换为字符串，可以使用 [date_to_str](api/other/date.md) 方法:


*该方法返回一个函数，该函数根据指定的格式将 Date 对象格式化为字符串:*
~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2013, 05, 29)); // -> "29/06/2013"
~~~

## 将字符串转换为 Date 对象

要将字符串转换回 Date 对象，请使用 [str_to_date](api/other/date.md) 方法:


*该方法返回一个函数，可以将指定格式的字符串解析为 Date 对象:*

你可以这样创建一个日期解析函数:

~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2013"); // -> 2013年6月29日 00:00:00
~~~

## 转换为 UTC

要将本地时间转换为 UTC，可以使用 [convert_to_utc](api/other/date.md) 方法:

~~~js
//2013年6月29日 14:00（本地时间） -> 2013年6月29日 12:00（UTC）
var time = gantt.date.convert_to_utc(new Date(2013, 05, 29, 14, 00));
~~~

## 对日期加（减）时间间隔

要在指定日期上加上或减去一个时间间隔，可以使用 [add](api/other/date.md) 方法:

~~~js
//为指定日期加上1年：2013年6月29日 -> 2014年6月29日
var newDate = gantt.date.add(new Date(2013, 05, 29), 1, 'year');
~~~

:::note
完整的日期格式化方法集合，请参见 [这里](api/other/date.md)。
:::

