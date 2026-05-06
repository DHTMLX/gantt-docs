---
title: "Skala einrichten"
sidebar_label: "Skala einrichten"
---

# Skala einrichten

![gantt_dates](/img/gantt_dates.png)

Die Konfiguration der Skalen wird über die Eigenschaft [scales](api/config/scales.md) festgelegt. Sie können beliebig viele Skalen angeben, indem Sie Skalenobjekte im Array der **scales**-Konfiguration festlegen:

~~~js
// eine einzelne Tagesskalierung
gantt.config.scales = [
	{ unit: "day", step: 1, format: "%j, %D" }
];

// mehrere Skalen gleichzeitig
gantt.config.scales = [
	{ unit: "month", step: 1, format: "%F, %Y" },
	{ unit: "week", step: 1, format: weekScaleTemplate },
	{ unit: "day", step: 1, format: "%D", css: daysStyle }
];
~~~

Es ist möglich, die folgenden Aspekte der Zeitachse (X-Achse) zu konfigurieren:

1. [Unit](#timeunits)
2. [Range](#range)
3. [Step](#timestep)
4. [Height](#height)
5. [Format](#dateformat)
6. [Style](#styling)

Sie können außerdem eine [individuelle Skala](#customtimeunits) hinzufügen.

## Zeiteinheiten {#timeunits}

![month_day_scale_units](/img/month_day_scale_units.png)

Um die Einheit der Skala festzulegen, verwenden Sie die **unit**-Eigenschaft im entsprechenden Skalenobjekt:

Mögliche Werte sind: "minute", "hour", "day" (standardmäßig), "week", "quarter", "month", "year".

~~~js
gantt.config.scales = [
	{ unit: "month", step: 1, format: "%F, %Y" },
	{ unit: "day", step: 1, format: "%j, %D" }
];

gantt.init("gantt_here");
~~~

[Monatsansicht](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)

## Bereich {#range}

![day_scale_unit](/img/day_scale_unit.png)

### Standardbereichseinstellungen

Wenn Sie den Datumsbereich nicht explizit angeben, verwendet Gantt die Daten der geladenen Aufgaben und fügt Verschiebungen vor dem ersten und nach der letzten Aufgabe in die Skala ein. Das Offset wird durch die Einstellungen der Zeitachse definiert.
Je nach Wert von [scale_offset_minimal](api/config/scale_offset_minimal.md) wird es entweder die im Adler der **unit**-Eigenschaft der [scales](api/config/scales.md)-Option definierte Zeiteinheit oder die kleinste der Zeiteinheiten der Skala sein.

Sie können den angezeigten Datumsbereich programmgesteuert mit der Methode [getState](api/method/getstate.md) abrufen.

~~~js
const state = gantt.getState();

console.log(state.min_date);
// -> Mon Jan 01 2025 00:00:00

console.log(state.max_date);
// -> Tue Jan 01 2026 00:00:00
~~~

Der Skalenbereich wird beim [gantt Rendering](api/method/render.md) neu berechnet. Wenn der Benutzer eine Aufgabe außerhalb des angezeigten Zeitraums verschiebt, wird die Aufgabenzeile angezeigt, aber das Balkenelement bleibt erst nach einer vollständigen Neuzeichnung sichtbar.

Um die Skala automatisch anzupassen, verwenden Sie die Konfiguration [fit_tasks](api/config/fit_tasks.md).

~~~js
gantt.config.fit_tasks = true; 
gantt.init("gantt_here");
~~~

[Auto resize scale](https://docs.dhtmlx.com/gantt/samples/03_scales/08_scale_autoconfig.html)

### Datumsbereich explizit festlegen {#explicit_date_range}

Alternativ können Sie den Datumsbereich explizit festlegen, indem Sie die Konfigurationsoptionen [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) verwenden:

~~~js
gantt.config.start_date = new Date(2025, 02, 31);
gantt.config.end_date = new Date(2025, 03, 09);
 
gantt.init("gantt_here");
~~~

Sie können sie auch im [gantt initialization](api/method/init.md)-Aufruf festlegen:

~~~js
gantt.init("gantt_here", new Date(2025, 02, 31), new Date(2025, 03, 09));
~~~

[Define displayed date range](https://docs.dhtmlx.com/gantt/samples/01_initialization/08_explicit_time_range.html)

Die Aufgaben, die in den angegebenen Zeitraum nicht passen, werden im Gantt-Diagramm nicht angezeigt, es sei denn, sie sind [als unscheduldled markiert](guides/unscheduled-tasks.md).

[Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

#### Hinweis {#note}

Wenn sowohl die Optionen **start_date** als auch **end_date** angegeben sind und Sie eine Aufgabe erstellen, die außerhalb des Bereichs liegt, verschwindet die Aufgabe aus dem Diagramm.
[Um die Aufgabe](guides/configuring-time-scale.md#tasksoutsidetimescale) im Diagramm anzuzeigen, verwenden Sie die Konfiguration [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md).

~~~js
gantt.config.start_date = new Date(2025, 02, 31);
gantt.config.end_date = new Date(2025, 03, 09);
gantt.config.show_tasks_outside_timescale = true;

gantt.init("gantt_here");
~~~

Falls Sie diese Konfiguration nicht verwenden, können Sie den Bereich erweitern:

~~~js
gantt.attachEvent("onLightboxSave", (id, task, is_new) => {
	const { start_date: taskStart, end_date: taskEnd } = task;
	const { start_date: scaleStart, end_date: scaleEnd } = gantt.config;

	// falls die Aufgabe außerhalb des aktuellen Timescales liegt
	if (scaleStart > taskEnd || scaleEnd < taskStart) {
		// aktualisieren Sie den Timescale-Bereich
		gantt.config.end_date = new Date(
			Math.max(taskEnd.valueOf(), scaleEnd.valueOf())
		);

		gantt.config.start_date = new Date(
			Math.min(taskStart.valueOf(), scaleStart.valueOf())
		);

		gantt.render();
	}

	return true;
});
~~~

Oder fügen Sie der Lightbox-Kontrolle eine Validierung hinzu:

~~~js
gantt.attachEvent("onLightboxSave", (id, task, is_new) => {
	const { start_date: taskStart, end_date: taskEnd } = task;
	const { start_date: scaleStart, end_date: scaleEnd } = gantt.config;

	// Prüfen, ob die Aufgabe außerhalb des Bereichs liegt
	if (scaleStart > taskEnd || scaleEnd < taskStart) {
		gantt.message({
			type: "warning",
			text: "Warning! The task is outside the date range!",
			expire: 5000
		});

		return false;
	}

	return true;
});
~~~

### Dynamische Änderung des angezeigten Bereichs {#dynamic_scale}

Es gibt mehrere Möglichkeiten, wie Sie den angezeigten Bereich auf der Fly ändern können:

- Sie können den Zeitbereich mit Hilfe der Konfigurationen **start_date / end_date** steuern, dabei diese dynamisch anpassen, um geladene Aufgaben anzuzeigen.

Sie können dies erreichen, indem Sie den Skalenbereich neu berechnen (siehe [getsubtaskdates](api/method/getsubtaskdates.md)) durch Aktualisieren der Konfigurationen **start_date / end_date** bei jeder Neuzeichnung von Gantt:

~~~js
gantt.attachEvent("onBeforeGanttRender", () => {
	const range = gantt.getSubtaskDates();
	const scaleUnit = gantt.getState().scale_unit;

	if (range.start_date && range.end_date) {
		gantt.config.start_date = gantt.calculateEndDate(
			range.start_date, -4, scaleUnit
		);

		gantt.config.end_date = gantt.calculateEndDate(
			range.end_date, 5, scaleUnit
		);
	}
});

gantt.init("gantt_here");
~~~

- Um das erneute Rendern der Skala jedes Mal zu erzwingen, wenn eine Aufgabe nicht in den bestehenden Skalenbereich passt, setzen Sie die Eigenschaft [fit_tasks](api/config/fit_tasks.md) auf *true*:

~~~js
gantt.config.fit_tasks = true; 
gantt.init("gantt_here");
~~~

Falls sowohl die Optionen **start_date** als auch **end_date** angegeben sind, müssen Sie eine der oben beschriebenen Optionen verwenden (siehe Hinweis), damit die Eigenschaft **fit_tasks** korrekt funktioniert.

- Es ist auch möglich, die Skala automatisch zu ändern, während eine Aufgabe gezogen wird, indem die notwendige Logik im Handler des Ereignisses [onTaskDrag](api/event/ontaskdrag.md) festgelegt wird:

~~~js
gantt.attachEvent("onTaskDrag", (id, mode, task, original) => {
	const state = gantt.getState();
	const minDate = state.min_date;
	const maxDate = state.max_date;

	const scaleStep = gantt.date.add(
		new Date(), state.scale_step, state.scale_unit
	) - new Date();

	let showDate;
	let repaint = false;

	if (mode == "resize" || mode == "move") {
		if (Math.abs(task.start_date - minDate) < scaleStep) {
			showDate = task.start_date;
			repaint = true;
		} else if (Math.abs(task.end_date - maxDate) < scaleStep) {
			showDate = task.end_date;
			repaint = true;
		}

		if (repaint) {
			gantt.render();
			gantt.showDate(showDate);
		}
	}
});
~~~

**Related sample** [Re-rendering Scale during Task Dragging](https://snippet.dhtmlx.com/o2bgk6uf)

### Anzeigen von Aufgaben außerhalb des expliziten Datumsbereichs {#tasksoutsidetimescale}

Es ist möglich, Aufgaben, die nicht in den angegebenen Datumsbereich passen, im Gantt-Diagramm anzuzeigen.

![tasks_outside_timescale](/img/tasks_outside_timescale.png)

Dazu müssen Sie den Konfigurationsparameter [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md) auf *true* setzen:

~~~js
const data = {
	tasks: [
		{ id: 1, text: "Project #1", start_date: "01-09-2024", end_date: "02-09-2024" },
		{ id: 2, text: "Project #2", start_date: "01-09-2026", end_date: "02-09-2026" },
		{ id: 3, text: "Task #1", start_date: "03-02-2025", end_date: "05-02-2025" }
	],
	links: []
};

gantt.config.show_tasks_outside_timescale = true;

gantt.init("gantt_here", new Date(2025, 1, 1), new Date(2025, 1, 7));
~~~

[Tasks outside timescale](https://docs.dhtmlx.com/gantt/samples/01_initialization/20_tasks_outside_timescale.html)

In der Folge werden die Aufgaben mit den IDs "1" und "2" als leere Zeilen im Timeline-Bereich angezeigt und mit den im Grid angegebenen Namen und Startdaten direkt sichtbar.

## Zeit-Schritt {#timestep}

![scale_step](/img/scale_step.png)

Um den Schritt der Zeitachse festzulegen, verwenden Sie die **step**-Eigenschaft im entsprechenden Skalenobjekt:

~~~js
const monthScaleTemplate = (date) => {
	const dateToStr = gantt.date.date_to_str("%M");
	const endDate = gantt.date.add(date, 2, "month");

	return `${dateToStr(date)} - ${dateToStr(endDate)}`;
};

gantt.config.scales = [
	{ unit: "year", step: 1, format: "%Y" },
	{ unit: "month", step: 3, format: monthScaleTemplate },
	{ unit: "month", step: 1, format: "%M" }
];

gantt.init("gantt_here");
~~~

[Schritt-Konfiguration für die Quartals-Skala](https://docs.dhtmlx.com/gantt/samples/03_scales/03_full_year.html)

## Höhe

![scale_height](/img/scale_height.png)

Um die Höhe der Skala festzulegen, verwenden Sie die Eigenschaft [scale_height](api/config/scale_height.md):

~~~js
gantt.config.scale_height = 54; /*!*/

gantt.init("gantt_here");
~~~

[Day hours](https://docs.dhtmlx.com/gantt/samples/03_scales/04_days.html)

Wenn Sie mehrere Skalen haben, teilen sie die angegebene Höhe gleichmäßig. Zum Beispiel, wenn **scale_height** 60 Pixel beträgt und Sie 3 Skalen haben, hat jede Skala eine Höhe von 60 / 3 = 20 Pixel.

## Datumformat {#dateformat}

:::note
Siehe den Artikel Date Format Specification, um die verfügbaren Formatzeichen kennenzulernen
:::

Um das Format der Skala festzulegen, verwenden Sie die **format**-Eigenschaft im entsprechenden Skalenobjekt. Das Datumsformat kann als Zeichenkette festgelegt werden:

~~~js
gantt.config.scales = [
	{ unit: "month", step: 1, format: "%F, %Y" },
	{ unit: "week", step: 1, format: weekScaleTemplate },
	{ unit: "day", step: 1, format: "%D", css: daysStyle }
];

gantt.init("gantt_here");
~~~

[Multiple scales](https://docs.dhtmlx.com/gantt/samples/03_scales/01_multiple_scales.html)

![multiple_scales](/img/multiple_scales.png)

Oder als Funktion, die ein Date-Objekt als Parameter nimmt:

~~~js
gantt.config.scales = [
	{ unit: "day", step: 1, format: (date) => {
		return `<strong>Day ${dayNumber(date)}</strong><br/>${dateFormat(date)}`;
	}}
];
~~~

[Custom scales](https://docs.dhtmlx.com/gantt/samples/03_scales/06_custom_scales.html)

![scale_template](/img/scale_template.png)

## Gestaltung {#styling}

![css_styling](/img/css_styling.png)

Um die Zellen der Zeitachse zu gestalten, verwenden Sie das **css**-Attribut im entsprechenden Skalenobjekt.

~~~js
function getWeekOfMonthNumber(date) {
	let adjustedDate = date.getDate() + date.getDay();
	let prefixes = ['0', '1', '2', '3', '4', '5'];
	return (parseInt(prefixes[0 | adjustedDate / 7]) + 1);
}

gantt.config.scales = [
	{ unit: "month", step: 1, format: "%F, %Y" },
	{ unit: "week", step: 1, format: (date) => { 
		return "Week #" + getWeekOfMonthNumber(date); 
	}},
	{ unit: "day", step: 1, format: "%j %D", css: (date) => { 
		if (!gantt.isWorkTime(date)) { 
			return "week-end"; 
		}
	}}
];
~~~

**Related sample** [Styling of cells of the time scale](https://snippet.dhtmlx.com/tadcjjk4)

Für den Fall, dass die **css**-Eigenschaft in der Konfiguration der Skalen nicht festgelegt ist, können Sie die [scale_cell_class](api/template/scale_cell_class.md)-Vorlage definieren, um der ersten Zeitskala im Array der **scales**-Konfiguration die CSS-Klasse zuzuweisen.

~~~js
gantt.config.scales = [
	{ unit: "day", step: 1, format: "%d" },
	{ unit: "day", step: 1, format: "%D" },
	{ unit: "hour", step: 1, format: "%H" }
];

gantt.templates.scale_cell_class = date => gantt.isWorkTime(date) ? "" : "week_end";
~~~

**Related sample** [Styling of the first time scale](https://snippet.dhtmlx.com/vovv2wde)

Um die [scale_cell_class](api/template/scale_cell_class.md)-Vorlage auf alle Skalen der Zeitachse anzuwenden, setzen Sie die Eigenschaft [inherit_scale_class](api/config/inherit_scale_class.md) auf *true*.

~~~js
gantt.config.inherit_scale_class = true; /*!*/
~~~

**Related sample** [Styling of all scales](https://snippet.dhtmlx.com/v6p55wdz)

Beachten Sie, dass Sie bei der Verwendung von [Arbeitszeitberechnungen](guides/working-time.md) [isWorkTime](api/method/isworktime.md) statt festkodierter Werte verwenden können:

~~~js
gantt.config.work_time = true;
gantt.templates.scale_cell_class = date => gantt.isWorkTime(date) ? "" : "week_end";
~~~

Lesen Sie mehr dazu, wie man einen benutzerdefinierten Stil auf den Timeline-Bereich anwendet, im Artikel [Highlighting Time Slots](guides/highlighting-time-slots.md).

## Benutzerdefinierte Zeiteinheiten {#customtimeunits}

dhtmlxGantt ermöglicht es Ihnen, benutzerdefinierte Zeiteinheiten zu definieren und eine Vorlage für die Bezeichnungen in der Skala-Konfiguration festzulegen.

Um eine benutzerdefinierte Einheit zu definieren, müssen Sie zwei Funktionen im [Date-Objekt](api/other/date.md) definieren:

~~~js
Date gantt.date.<unit>_start(Date date);
Date gantt.date.add_<unit>(Date date, Integer increment);
~~~

- Die erste Funktion soll die Startzeit-Einheit für jedes gegebene Datum zurückgeben (z. B. month_start für den 14. Febr. -> 1. Febr.).
- Die zweite Funktion erhöht das Datum um eine gegebene Anzahl von Dauer-Einheiten (z. B. 'Datum minus 2 Tage') 

:::note
Normalerweise hat der Inkrement-Wert einen positiven Wert, da Zellen der Skala von links nach rechts erstellt werden. Die Erstellung der ersten Zelle erfolgt jedoch von rechts nach links, daher verwendet Gantt den negativen Wert des Increments.
:::

### Beispiel 1

Lassen Sie uns eine "fiscal_year"-Einheit erstellen und davon ausgehen, dass ein Geschäftsjahr am 31. Januar endet. So kann die neue Einheit wie folgt angegeben werden:

~~~js
const firstMonth = 1;
const firstDay = 1;

gantt.date.fiscal_year_start = date => {  
	let next = new Date(date);

	if (next.getMonth() < firstMonth || 
		(next.getMonth() === firstMonth && next.getDate() < firstDay)) {
		next = gantt.date.add(next, -1, "year");
	}

	next = gantt.date.year_start(next);
	next.setMonth(firstMonth);
	next.setDate(firstDay);

	return next;
};

gantt.date.add_fiscal_year = (date, inc) => gantt.date.add(date, inc, "year");
~~~

Und verwenden Sie es dann im Code wie folgt:

~~~js
const dateToStr = gantt.date.date_to_str("%Y");

const fiscalYearLabel = date => dateToStr(gantt.date.fiscal_year_start(date));

gantt.config.scales = [
	{ unit: "year", step: 1, format: "Kalenderjahr %Y" },
	{ unit: "fiscal_year", step: 1, format: fiscalYearLabel },
	{ unit: "month", step: 1, format: "%M %Y" },
	{ unit: "day", step: 1, format: "%d %M" }
];
~~~

### Beispiel 2

Sie können jede **day**-Zelle in drei **hour**-Zellen mit Bezeichnungen 00, 08, 16 unterteilen. Die Logik sieht dann so aus:

~~~js
gantt.date.hour_custom_start = date => date;

gantt.date.add_hour_custom = (date, inc) => { // inc hängt vom "step" ab
	const nextDate = new Date(date);

	if (nextDate.getHours() % 8 !== 0) { // die Stundenzahl ist nicht 0, 8 oder 16 /*!*/
		const diff = Math.abs(8 - nextDate.getHours()); /*!*/
		return gantt.date.add(nextDate, diff * inc, "hour"); /*!*/
	} /*!*/

	return gantt.date.add(date, 8 * inc, "hour"); /*!*/
};

gantt.config.scales = [
	{ unit: "day", step: 1, date: "%d %F" },
	{ unit: "hour_custom", step: 1, date: "%H" }
];

gantt.config.date_grid = "%Y-%m-%d %H:%i";
~~~

**Zugezogenes Beispiel** [Custom hours on the scale](https://snippet.dhtmlx.com/zp13jovi)

![custom_scale](/img/custom_scale.png)

Betrachten wir, wie Gantt die erste "hour"-Zelle erzeugt. Wie im Beispiel ersichtlich, beginnt die früheste Aufgabe bei 07:00. Da 7 kein Vielfaches von Acht ist, folgt Gantt der Regel:

~~~js
if (nextDate.getHours() % 8 != 0) {
	const diff = Math.abs(8 - nextDate.getHours());  // 8 - 7 = 1
	return gantt.date.add(nextDate, diff * inc, "hour"); // 7 - 1 = 6
} 
~~~

- Gantt berechnet das Zeitintervall zwischen 08:00 und 07:00: 

*diff = 08:00 - 07:00 = 1 Stunde*

- Dann wird das Produkt aus dem Zeitintervall und dem Inkrement berechnet: 

 *diff * inc = 1 Stunde * (-1) = -1 Stunde* 

 Als Wert des Parameters *inc* verwendet Gantt den negativen Wert des Zeit-Schritts (*-1*).

- Schließlich addiert Gantt den erhaltenen Wert zur Zeit der frühesten Aufgabe: 

 *07:00 + (- 1 Stunde) = 06:00*

Der Wert der ersten Zelle ist somit **06**.

Um die zweite "hour"-Zelle zu erstellen, folgt Gantt derselben Logik, verwendet aber das positive Inkrement

- *diff = 08:00 - 06:00 = 2 Stunden*

- *diff * inc = 2 Stunden * 1 = 2 Stunden*

- *06:00 + 2 Stunden = 08:00*

Der Wert der zweiten Zelle ist **08**

An diesem Punkt sehen wir, dass 8 ein Vielfaches von acht ist; daher wird der Wert der nächsten Zelle als *08:00 + 8 Stunden = **16:00*** berechnet, und so weiter für die übrigen Zellen.

:::note
Diese Logik funktioniert, weil wir das [Datumsbereich explizit](#explicit_date_range) nicht festlegen.
:::

Für weitere Beispiele schauen Sie sich den Artikel [How to add a custom scale](guides/how-to.md#how-to-add-a-custom-scale) an.

## Benutzdefinierte Zeitspannen

In diesem Abschnitt finden Sie Beispiele, wie Sie die Zeitskala anpassen bzw. konfigurieren, damit Nicht-Arbeitszeiten angezeigt oder versteckt werden. Außerdem finden Sie ein Beispiel, wie Zellen mit Nicht-Arbeitsstunden vom Anfang der Skala ausgeblendet werden, auch wenn der Modus **skip_off_time** aktiviert ist.

Nachfolgend sehen Sie ein Beispiel der benutzerdefinierten Skala für die gängigste Variante, bei der Arbeitszeiten von 08:00 bis 12:00 und von 13:00 bis 17:00 gelten.

~~~js
gantt.plugins({
	auto_scheduling: true,
});

gantt.config.work_time = true;
gantt.config.correct_work_time = true;
gantt.config.duration_unit = "minute";
gantt.config.duration_step = 1;
gantt.config.time_step = 1;
gantt.config.round_dnd_dates = false;

gantt.setWorkTime({ hours: ["8:00-12:00", "13:00-17:00"] }); /*!*/

gantt.date.day_custom_start = date => date; /*!*/

gantt.date.add_day_custom = (date, inc) => { /*!*/
	const nextDate = new Date(date); /*!*/

	if (nextDate.getHours() < 8) { /*!*/ // Anweisung 1
		const diff = 8 - nextDate.getHours(); /*!*/
		return gantt.date.add(nextDate, diff * inc, "hour"); /*!*/
	} /*!*/

	if (nextDate.getHours() === 8) { /*!*/ // Anweisung 2
		return gantt.date.add(nextDate, 9 * inc, "hour"); /*!*/
	} /*!*/
	
	if (nextDate.getHours() === 17) { /*!*/ // Anweisung 3
		return gantt.date.add(nextDate, 15 * inc, "hour"); /*!*/
	} /*!*/

	return gantt.date.add(date, 8 * inc, "hour"); /*!*/
}; /*!*/

gantt.config.scales = [
	{ unit: "day_custom", step: 1, date: "%d %H:00" },
];
~~~

**Zugehöriges Beispiel** [Equal offset for custom scales](https://snippet.dhtmlx.com/g8fhwlp4)

So sieht die Skala im Modus aus, wenn Nicht-Arbeitszeiten ausgeblendet sind:

![custom_first_scale_cell](/img/custom_first_scale_cell.png)

Und so sieht sie aus, wenn sie angezeigt werden (gantt.config.skip_off_time ist deaktiviert):

![first_scale_cell_without_skip_off_time](/img/disable_skip_off_time.png)

## Infinite scroll

Sie finden ausführliche Beispiele, wie man einen unendlichen Bildlauf in der Timeline implementiert, im entsprechenden Artikel [related](guides/how-to.md#how-to-have-an-infinite-scroll-in-the-timeline).

## Klebende Beschriftungen

Ab Version 9.0 sind Zeitachsen-Beschriftungen standardmäßig klebend. Das bedeutet, dass eine Beschriftung sichtbar bleibt, wenn Sie durch die Timeline scrollen, solange ihre Zelle breiter als der Beschriftung ist; sie bleibt attached am Ansichtsfenster, bis sie hinausgescrollt wird. Dies erhöht die Sichtbarkeit der Skalenbeschriftungen, insbesondere beim Vergrößern oder Verkleinern.

Um zum alten Verhalten zurückzukehren, bei dem die Beschriftungen zentriert innerhalb ihrer Zellen bleiben und beim Scrollen nicht sichtbar werden, können Sie klebende Beschriftungen deaktivieren, indem Sie die `sticky`-Eigenschaft des Skalenelements auf `false` setzen:

~~~js
gantt.config.scales = [
	{ unit: "year", step: 1, format: "%Y", sticky: false },
	{ unit: "month", step: 1, format: "%F", sticky: false },
	{ unit: "day", step: 1, format: "%j", sticky: false }
];

gantt.init("gantt_here");
~~~

Sie können klebende Beschriftungen auch für eine bestimmte Skala erzwingen, unabhängig von der Zellenbreite, indem Sie `sticky: true` setzen. Dadurch bleiben die Beschriftungen immer klebend, auch wenn die Beschriftungsbreite kleiner als die Zellbreite ist:

~~~js
gantt.config.scales = [
	{ unit: "year", step: 1, format: "%Y", sticky: true },
	{ unit: "month", step: 1, format: "%F", sticky: true },
	{ unit: "day", step: 1, format: "%j", sticky: true }
];

gantt.init("gantt_here");
~~~

## Feste Spaltenbreite

Standardmäßig haben Timeline-Spalten eine flexible Breite. Sie passen sich entweder der Breite des Containers an oder schrumpfen auf den Wert von 
[min_column_width](api/config/min_column_width.md), bis die horizontale Bildlaufleiste erscheint.

Sie können die Breite der **untersten** Skala auf einen festen Wert festlegen, indem Sie die Eigenschaft `column_width` im Objekt der Skala setzen:

~~~js
gantt.config.scales = [
	{ unit: "year", step: 1, format: "%Y" },
	{ unit: "month", step: 1, format: "%F" },
	{ unit: "day", step: 1, format: "%j", column_width: 60 } /*!*/
];

gantt.init("gantt_here");
~~~

[Fixed column width for the Time Scale](https://snippet.dhtmlx.com/gpq46mvq)

Mit dieser Einstellung wird jede Zelle der unteren Skala (im obigen Beispiel der "day") genau *60px* breit, unabhängig von der Anzahl gerenderter Spalten:

- Falls es zu wenige Spalten gibt, um den Container zu füllen, bleibt der restliche Platz rechts leer.
- Falls es zu viele Spalten gibt, erscheint eine horizontale Bildlaufleiste.

:::note
Beachten Sie, dass `column_width` nur auf das unterste Skalen-Item in `gantt.config.scales` angewendet wird; bei höhereren Ebenen hat es keinen Effekt.
:::

Beachten Sie außerdem, dass bei gesetztem `column_width` `gantt.config.min_column_width` nicht auf die unterste Skala angewendet wird.

## Arbeitszeitbewusste Taskbalken-Darstellung in Day/Week-Skalen {#workhourawaretaskbarsrenderingindayweekscales}

Sie können Task-Bars gemäß der **Arbeitszeit** am Rand einer Skalenzelle positionieren und skalieren, statt eines rohen Intervalls von `00:00-24:00` zu verwenden, mithilfe der *Skalenausrichtung (scale projection)*.
Dadurch wird eine Aufgabe, die einen ganzen Arbeitstag umfasst (z. B. `09:00-17:00`), die gesamte Zelle des Tages ausfüllen, was die Lesbarkeit dichter Timelines verbessert.

![Scale projection](/img/scale_projection.png)

Um den Projektion-Modus festzulegen, verwenden Sie die Eigenschaft `projection` des untersten Skalenobjekts:

~~~js
gantt.config.scales = [
	{unit: "month", step: 1, format:"%M %Y"},
	{unit: "week", step: 1, format: function (date) {
		const dateToStr = gantt.date.date_to_str("%d %M");
		const endDate = gantt.date.add(date, 7 - date.getDay(), "day");
		return dateToStr(date) + " - " + dateToStr(endDate);
	}},
	// Anwendung des Projektion-Modus auf die Day-Skala 
	{unit: "day", step: 1, format: "%d", projection: {source: "fixedHours"}} /*!*/
];
~~~

[Beispiel](https://docs.dhtmlx.com/gantt/samples/03_scales/15_scale_projection_modes.html)

Es stehen drei Projektion-Modi zur Verfügung:

- **Standardmodus**

Im Standardmodus wird, falls keine Projektion festgelegt ist, die absolute Zeit (00:00-24:00) für die Positionierung verwendet.

- **Modus mit festen Arbeitsstunden**

In diesem Modus werden feste Arbeitszeiten für alle Aufgaben auf der Zeitskala angewendet. Standardmäßig werden die Stunden aus dem globalen Arbeitskalender entnommen.

~~~js
gantt.config.scales = [
	{
		unit: "day", 
		step: 1, 
		format: "%d", 
		projection: {source: "fixedHours"} /*!*/
	}
];
~~~

Die Projektionsstunden können explizit festgelegt werden:

~~~js
gantt.config.scales = [
	{
		unit: "day", 
		step: 1,
		format: "%d", 
		projection: {source: "fixedHours", hours: ["09:00-18:00"] } /*!*/
	}
];
~~~

- **Aufgaben-Kalender-Modus**

Dieser Modus setzt voraus, dass der Aufgaben-Kalender verwendet wird, um die Arbeitsstunden pro Zelle zu berechnen. Falls eine Zelle keine Arbeitszeit hat, greift die Skala auf eine absolute Positionierung für diese Zelle zurück.

~~~js
gantt.config.scales = [
	{
		unit: "day", 
		step: 1,
		format: "%d", 
		projection: {source: "taskCalendar" } /*!*/
	}
];
~~~

### Details

Beachten Sie, dass Projektion-Modi für Day- und Week-Skalen vorgesehen sind. Andere Einheiten ignorieren Projektion und verwenden absolute Positionierung.

Ziehen und Ablegen folgt der Projektion, aber wenn Auto-Scheduling angewendet wird, hängt die Planungslogik einer Aufgabe trotzdem von solchen Einstellungen wie [correct_work_time](api/config/correct_work_time.md) und den für Aufgaben angewendeten Arbeitszeitkalendern ab.