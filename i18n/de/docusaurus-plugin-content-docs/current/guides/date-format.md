---
title: "Datumsformat-Spezifikation"
sidebar_label: "Datumsformat-Spezifikation"
---

# Datumsformat-Spezifikation


Beim Festlegen von Datumsformaten können Sie die folgenden Zeichen verwenden:

- **%y** - zweistellige Jahreszahl ( _00 bis 99_ );
- **%Y** - vierstellige Jahreszahl ( _1900-9999_ );


- **%m** - Monat als Zahl mit führender Null ( _01 bis 12_ );
- **%n** - Monat als Zahl ohne führende Null ( _1 bis 12_ );
- **%M** - abgekürzter Monatsname ( _Jan bis Dec_ );
- **%F** - vollständiger Monatsname ( _January bis December_ );


- **%W** - ISO-8601 Kalenderwoche des Jahres, wobei die Woche am Montag beginnt;
- **%w** - Kalenderwoche, wobei die Woche je nach [start_on_monday](api/config/start_on_monday.md)-Einstellung am Montag oder Sonntag beginnt;


- **%d** - Tag als Zahl mit führender Null ( _01 bis 31_ );
- **%j** - Tag als Zahl ohne führende Null ( _1 bis 31_ );
- **%D** - abgekürzter Tagesname ( _Sun bis Sat_ );
- **%l** - vollständiger Tagesname ( _Sunday bis Saturday_ );


- **%h** - Stunde auf einer 12-Stunden-Uhr mit führender Null ( _00 bis 11_ );
- **%H** - Stunde auf einer 24-Stunden-Uhr mit führender Null ( _00 bis 23_ );
- **%g** - Stunde auf einer 12-Stunden-Uhr ohne führende Null ( _1 bis 12_ );
- **%G** - Stunde auf einer 24-Stunden-Uhr ohne führende Null ( _0 bis 23_ );


- **%i** - Minuten mit führender Null ( _00 bis 59_ );
- **%s** - Sekunden mit führender Null ( _00 bis 59_ );
- **%a** - zeigt **am** (Mitternacht bis Mittag) oder **pm** (Mittag bis Mitternacht) an;
- **%A** - zeigt **AM** (Mitternacht bis Mittag) oder **PM** (Mittag bis Mitternacht) an.

Zum Beispiel: Um den 1. Juni 2019 als 01/06/2019 anzuzeigen, verwenden Sie das Format "%d/%m/%Y".

