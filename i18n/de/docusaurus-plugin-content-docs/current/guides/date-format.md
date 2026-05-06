---
title: "Datumsformat-Spezifikation"
sidebar_label: "Datumsformat-Spezifikation"
---

# Datumsformat-Spezifikation

Beim Festlegen des Formats für Datumsangaben können Sie jedes Zeichen aus der folgenden Liste verwenden:

- **%y** - das Jahr als zweistellige Zahl ( _00 bis 99_ );
- **%Y** - das Jahr als vierstellige Zahl ( _1900-9999_ );

- **%m** - der Monat als Zahl mit führender Null ( _01 bis 12_ );
- **%n** - der Monat als Zahl ohne führende Null ( _1 bis 12_ ); 
- **%M** - der Monat als Abkürzung ( _Jan bis Dez_ );
- **%F** - der Monat als voller Name ( _Januar bis Dezember_ );

- **%W** - die ISO-8601-Woche des Jahres. Wochen beginnen am Montag; 
- **%w** - die Wochennummer, Wochen beginnen entweder am Montag oder am Sonntag abhängig vom Wert der [start_on_monday](api/config/start_on_monday.md) Konfigurations-Eigenschaft 


- **%d** - der Tag als Zahl mit führender Null ( _01 bis 31_ );
- **%j** - der Tag als Zahl ohne führende Null ( _1 bis 31_ );
- **%D** - der Tag als Abkürzung ( _So bis Sa_ );
- **%l** - der Tag als vollständiger Name ( _Sonntag bis Samstag_ );

- **%h** - die Stunde im 12-Stunden-Format ( _00 bis 11_ );
- **%H** - die Stunde im 24-Stunden-Format ( _00 bis 23_ );
- **%g** - die Stunde im 12-Stunden-Format ohne führende Null ( _1 bis 12_ );
- **%G** - die Stunde im 24-Stunden-Format ohne führende Null ( _0 bis 23_ );

- **%i** - die Minute als Zahl mit führender Null ( _00 bis 59_ );
- **%s** - die Sekunde als Zahl mit führender Null ( _00 bis 59_ );
- **%a** - zeigt **am** (für Zeiten von Mitternacht bis Mittag) und **pm** (für Zeiten von Mittag bis Mitternacht);
- **%A** - zeigt **AM** (für Zeiten von Mitternacht bis Mittag) und **PM** (für Zeiten von Mittag bis Mitternacht).

Beispielsweise, wenn Sie den 1. Juni 2019 als 01/06/2019 darstellen möchten, sollten Sie "%d/%m/%Y" angeben.