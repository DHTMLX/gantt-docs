---
sidebar_label: inline_editors_date_processing
title: inline_editors_date_processing config
description: "Behält die Dauer einer Aufgabe bei, wenn deren Start- oder Enddatum bearbeitet wird"
---

# inline_editors_date_processing

### Description

@short: Behält die Dauer einer Aufgabe bei, wenn deren Start- oder Enddatum bearbeitet wird

@signature: inline_editors_date_processing: string | undefined

### Example

~~~jsx
gantt.config.inline_editors_date_processing = "keepDuration";
~~~

**Default value:** undefined

### Details

Steuert, wie inline_editors Änderungen an Start- und Enddaten von Aufgaben verarbeiten.
Wenn die Einstellung undefined ist (Standard):

- Wird das Startdatum einer Aufgabe geändert, bleibt die Dauer gleich, und die gesamte Aufgabe wird auf die neue Startzeit verschoben.
- Wird das Enddatum geändert, bleibt das Startdatum fest, und die Dauer wird entsprechend dem neuen Enddatum angepasst.

Dieses Verhalten unterscheidet sich von Versionen vor 6.2.

Um das Verhalten aus Version 6.1 wiederherzustellen, setzen Sie die Option auf **"keepDuration"**:

~~~js
gantt.config.inline_editors_date_processing = "keepDuration";
~~~

Dies bewirkt:

- Änderung des Startdatums behält die Dauer unverändert bei und verschiebt die Aufgabe entsprechend.
- Änderung des Enddatums behält die Dauer unverändert bei und verschiebt die Aufgabe so, dass sie am neuen Datum endet.

Eine weitere Option ist **"keepDates"**:

~~~js
gantt.config.inline_editors_date_processing = "keepDates";
~~~

Das bedeutet:

- Änderung des Startdatums hält das Enddatum fest und passt die Dauer entsprechend an.
- Änderung des Enddatums hält das Startdatum fest und passt die Dauer entsprechend an.

### Change log
- hinzugefügt in v6.2 zur Kompatibilität mit vorherigen Versionen
