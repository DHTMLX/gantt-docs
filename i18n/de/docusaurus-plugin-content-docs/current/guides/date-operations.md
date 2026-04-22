---
title: "Datumsoperationen"
sidebar_label: "Datumsoperationen"
---

# Datumsoperationen

dhtmlxGantt enthält das [date](api/other/date.md)-Objekt, das eine Reihe von Datumsformatierungsfunktionen bereitstellt. Sie können diese Methoden bei der Arbeit mit Date-Objekten verwenden.

In diesem Artikel betrachten wir besonders wichtige und häufig verwendete Methoden. Eine vollständige Liste der Methoden finden Sie auf der [Date-Objekt-Seite](api/other/date.md).

## Umwandlung eines Date-Objekts in einen String

Um ein Date-Objekt in einen String umzuwandeln, verwenden Sie die [date_to_str](api/other/date.md)-Methode:

 
*Die Methode gibt eine Funktion zurück, die ein Date-Objekt in eine Zeichenkette des angegebenen Formats konvertiert:*
~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2013, 05, 29)); // -> "29/06/2013"
~~~

## Umwandlung eines Strings in ein Date-Objekt

Um einen String in ein Date-Objekt umzuwandeln, verwenden Sie die [str_to_date](api/other/date.md)-Methode:

 
*Die Methode gibt eine Funktion zurück, die einen String des angegebenen Formats in ein Date-Objekt konvertiert:*

Sie können eine Datums-Konvertierungsfunktion wie folgt erzeugen:

~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2013"); // -> 29 June, 2013 00:00:00
~~~

## Umwandlung in UTC

Um die lokale Zeit in UTC umzuwandeln, verwenden Sie die [convert_to_utc](api/other/date.md)-Methode:

~~~js
//29 June, 2013 14:00 (local time) -> 29 June, 2013 12:00 (utc)
var time = gantt.date.convert_to_utc(new Date(2013, 05, 29, 14, 00));
~~~

## Hinzufügen (Subtraktion) eines Zeitintervalls zu/von einem Datum

Um ein Zeitintervall zu dem angegebenen Datum hinzuzufügen (bzw. zu subtrahieren), verwenden Sie die [add](api/other/date.md)-Methode:

~~~js
//adds 1 year to the specified date: 29 June, 2013 -> 29 June, 2014
var newDate = gantt.date.add(new Date(2013, 05, 29), 1, 'year');
~~~

:::note
Eine vollständige Liste der Datumsformatierungsfunktionen finden Sie [hier](api/other/date.md).
:::