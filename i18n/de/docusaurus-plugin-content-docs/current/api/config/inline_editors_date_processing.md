---
sidebar_label: inline_editors_date_processing
title: inline_editors_date_processing Konfiguration
description: "Behält die Dauer einer Aufgabe unverändert bei der Bearbeitung des Start- und Enddatums"
---

# inline_editors_date_processing

### Description

@short: Behält die Dauer einer Aufgabe unverändert bei der Bearbeitung des Start- und Enddatums

@signature: inline_editors_date_processing: string | undefined

### Example

~~~jsx
gantt.config.inline_editors_date_processing = "keepDuration";
~~~

**Standardwert:** undefined

### Details

Beeinflusst das Verhalten der Inline-Editoren für Start- und Enddaten von Aufgaben.
Wenn die Konfiguration undefiniert ist (Standard):

- Wenn der Benutzer das Startdatum einer Aufgabe ändert, bleibt die Dauer der Aufgabe unverändert und die gesamte Aufgabe wird auf den angegebenen Zeitpunkt neu geplant.
- Wenn der Benutzer das Enddatum einer Aufgabe ändert, bleibt das Startdatum der Aufgabe unverändert, die Dauer wird angepasst, um die Änderung widerzuspiegeln.

Dies unterscheidet sich vom Standardlogik in Versionen vor 6.2.

Um zum Verhalten von v6.1 zurückzukehren, verwenden Sie den Wert **"keepDuration"**:

~~~js
gantt.config.inline_editors_date_processing = "keepDuration";
~~~

Dies führt zu folgenden Auswirkungen:

- Wenn der Benutzer das Startdatum einer Aufgabe ändert, bleibt die Dauer der Aufgabe unverändert und die gesamte Aufgabe wird auf den angegebenen Zeitpunkt neu geplant.
- Wenn der Benutzer das Enddatum einer Aufgabe ändert, bleibt die Dauer der Aufgabe unverändert und die gesamte Aufgabe wird so geplant, dass sie am angegebenen Zeitpunkt endet.

Ein alternatives Wert ist **"keepDates"**:

~~~js
gantt.config.inline_editors_date_processing = "keepDates";
~~~

Es hat folgende Auswirkungen:

- Wenn der Benutzer das Startdatum einer Aufgabe ändert, bleibt end_date unverändert, die Dauer der Aufgabe wird aktualisiert, um die Änderung widerzuspiegeln.
- Wenn der Benutzer das Enddatum einer Aufgabe ändert, bleibt start_date unverändert, die Dauer der Aufgabe wird aktualisiert, um die Änderung widerzuspiegeln.

### Change log
- hinzugefügt in v6.2 zur Kompatibilität mit vorherigen Versionen