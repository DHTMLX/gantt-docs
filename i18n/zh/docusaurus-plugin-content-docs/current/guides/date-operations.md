--- 
title: "日期操作"
sidebar_label: "日期操作"
---

# 日期操作

dhtmlxGantt 包含 [date](api/other/date.md) 对象，提供一组日期格式化方法。在处理 date 对象时，您可以使用这些方法。

在本文中，我们将重点考虑一些特别重要且常用的方法。完整的方法列表，请参见 [date 对象页面](api/other/date.md)。

## 将 Date 对象转换为字符串

要将 Date 对象转换为字符串，请使用 [date_to_str](api/other/date.md) 方法：

*The method returns a function that converts a Date object to a string of the specified format:*

*该方法返回一个将 Date 对象转换为指定格式字符串的函数：*

~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2013, 05, 29)); // -> "29/06/2013"
~~~

## 将字符串转换为 Date 对象

要将字符串转换为 Date 对象，请使用 [str_to_date](api/other/date.md) 方法：

*The method returns a function that converts a string of the specified format to a Date object:*

*该方法返回一个将指定格式的字符串转换为 Date 对象的函数：*

You can generate a date convert function as follows:

~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2013"); // -> 2013年6月29日 00:00:00
~~~


## 转换为 UTC

要将本地时间转换为 UTC，请使用 [convert_to_utc](api/other/date.md) 方法：

~~~js
//2013年6月29日 14:00（本地时间） -> 2013年6月29日 12:00（UTC）
var time = gantt.date.convert_to_utc(new Date(2013, 05, 29, 14, 00));
~~~


## 向（从）指定日期添加（或减去）时间间隔

要向（从）指定日期添加（或减去）时间间隔，请使用 [add](api/other/date.md) 方法：

~~~js
//为指定日期加上1年：2013年6月29日 -> 2014年6月29日
var newDate = gantt.date.add(new Date(2013, 05, 29), 1, 'year');
~~~


:::note
完整的日期格式化方法列表请参见[这里](api/other/date.md)。
:::