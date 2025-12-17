---
sidebar_label: keys
title: keys config
description: "определяет горячие клавиши для диаграммы Ганта"
---

# keys

### Description

@short: Определяет горячие клавиши для диаграммы Ганта

@signature: keys: GanttHotkeys

### Example

~~~jsx
gantt.keys.edit_save = 32;
gantt.init("gantt_here");
~~~

### Details

Объект **keys** включает следующие свойства:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  Свойство
  </th>
  <th>
  Описание
  </th>
  <th>
  Значение по умолчанию
  </th>
  <th>
  Применимые виды
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>edit_save</td>
  <td>устанавливает числовой код клавиши клавиатуры, используемой для подтверждения операции редактирования (в качестве альтернативы нажатию кнопки 'Save' в лайтбоксе)</td>
  <td>13 (клавиша 'Enter')</td>
  <td>все виды</td>
  </tr>
  <tr>
  <td>edit_cancel</td>
  <td>устанавливает числовой код клавиши клавиатуры, используемой для отмены операции редактирования (в качестве альтернативы нажатию кнопки 'Cancel' в лайтбоксе)</td>
  <td>27 (клавиша 'Escape')</td>
  <td>все виды</td>
  </tr>
  </tbody>
</table>

:::note

Обратите внимание, что все свойства **keys** используют тип данных 'number'.
 
:::
