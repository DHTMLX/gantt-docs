---
sidebar_label: keys
title: keys config
description: "definiert die Hotkeys für das Gantt-Diagramm"
---

# keys

### Description

@short: Definiert die Hotkeys für das Gantt-Diagramm

@signature: keys: GanttHotkeys

### Example

~~~jsx
gantt.keys.edit_save = 32;
gantt.init("gantt_here");
~~~

### Details

Das **keys**-Objekt hat die folgenden Eigenschaften:
<table class="list" cellspacing="0" cellpadding="5" border="0">
	<thead>
	<tr>
		<th>
			Eigenschaft
		</th>
		<th>
			Beschreibung
		</th>
		<th>
			Standardwert
		</th>
		<th>
			Anwendbare Ansichten
		</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>edit_save</td>
		<td>legt den numerischen Code einer Tastaturtaste fest, die verwendet werden kann, um die Bearbeitung zu bestätigen (Alternative zum Klicken des 'Speichern'-Buttons in der Lightbox)</td>
		<td>13 (die 'Enter'-Taste)</td>
		<td>alle Ansichten</td>
	</tr>
	<tr>
		<td>edit_cancel</td>
		<td>legt den numerischen Code einer Tastaturtaste fest, die verwendet werden kann, um die Bearbeitung abzubrechen (Alternative zum Klicken des 'Abbrechen'-Buttons in der Lightbox)</td>
		<td>27 (die 'Escape'-Taste)</td>
		<td>alle Ansichten</td>
	</tr>
	</tbody>
</table>

:::note
Alle **keys'** Eigenschaften haben den Datentyp 'number'.
:::