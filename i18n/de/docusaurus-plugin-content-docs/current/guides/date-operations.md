---
title: "Operationen mit Datumsangaben"
sidebar_label: "Operationen mit Datumsangaben"
---

# Operationen mit Datumsangaben


dhtmlxGantt enthält das Objekt [date](api/other/date.md), das verschiedene Methoden zur Datumsformatierung bereitstellt. Diese sind besonders nützlich beim Arbeiten mit Date-Objekten.

Dieser Artikel stellt einige der wichtigsten und am häufigsten verwendeten Methoden vor. Die vollständige Liste aller Methoden finden Sie auf der [Date-Objekt-Seite](api/other/date.md).


## Konvertieren eines Date-Objekts in einen String


Um ein Date-Objekt in einen String umzuwandeln, können Sie die Methode [date_to_str](api/other/date.md) verwenden: 

 
*Diese Methode gibt eine Funktion zurück, die ein Date-Objekt anhand des angegebenen Musters in einen String formatiert:*
~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2013, 05, 29)); // -> "29/06/2013"
~~~


## Konvertieren eines Strings in ein Date-Objekt

Um einen String wieder in ein Date-Objekt umzuwandeln, verwenden Sie die Methode [str_to_date](api/other/date.md): 

 
*Diese Methode gibt eine Funktion zurück, die einen String im angegebenen Format in ein Date-Objekt umwandelt:*


Sie können eine Datums-Parsing-Funktion wie folgt erstellen:

~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2013"); // -> 29 June, 2013 00:00:00
~~~


## Konvertierung in UTC

Um eine lokale Zeit in UTC umzuwandeln, verwenden Sie die Methode [convert_to_utc](api/other/date.md):

~~~js
//29 June, 2013 14:00 (local time) -> 29 June, 2013 12:00 (utc)
var time = gantt.date.convert_to_utc(new Date(2013, 05, 29, 14, 00));
~~~

## Hinzufügen (oder Subtrahieren) eines Zeitintervalls zu (von) einem Datum

Um ein Zeitintervall zu einem bestimmten Datum zu addieren oder davon zu subtrahieren, verwenden Sie die Methode [add](api/other/date.md):

~~~js
//adds 1 year to the specified date: 29 June, 2013 -> 29 June, 2014
var newDate = gantt.date.add(new Date(2013, 05, 29), 1, 'year');
~~~


:::note
Die vollständige Sammlung aller Methoden zur Datumsformatierung finden Sie [hier](api/other/date.md).
:::

