---
sidebar_label: keys
title: keys config
description: "задаёт горячие клавиши для диаграммы Ганта"
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

<table class="list">
	<thead>
	<tr>
		<th>
			Property
		</th>
		<th>
			Описание
		</th>
		<th>
			Значение по умолчанию
		</th>
		<th>
			Применяемые представления
		</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>edit_save</td>
		<td>задает числовой код клавиши клавиатуры, который можно использовать для подтверждения операции редактирования (альтернатива нажатию кнопки 'Save' в lightbox)</td>
		<td>13 (клавиша 'Enter')</td>
		<td>во всех представлениях</td>
	</tr>
	<tr>
		<td>edit_cancel</td>
		<td>задает числовой код клавиши клавиатуры, который можно использовать для отмены операции редактирования (альтернатива нажатию кнопки 'Cancel' в lightbox)</td>
		<td>27 (клавиша 'Escape')</td>
		<td>во всех представлениях</td>
	</tr>
	</tbody>
</table>

:::note
Все свойства **keys'** имеют тип данных 'number'.
:::