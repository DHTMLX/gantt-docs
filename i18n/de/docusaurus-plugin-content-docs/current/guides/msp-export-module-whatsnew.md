---
title: "Was ist neu im MSP Project Export Modul"
sidebar_label: "Was ist neu im MSP Project Export Modul"
---

# Was ist neu im MSP Project Export Modul

## 2.1.0.0

* Unterstützung für benutzerdefinierte Kalender wurde sowohl für importierte als auch exportierte MSP- und Primavera-Dateien hinzugefügt, einschließlich Ressourcenkalender.

* Das Modul unterstützt nun das Abrufen von Ressourcenzuweisungswerten basierend auf Einheiten während Dateiimporten.

* Es gibt jetzt eine Option, benutzerdefinierte Werte für Ressourcenzuweisungseinheiten beim Export von Dateien anzugeben.

* Die **RemainingDuration**-Eigenschaft wurde für den Primavera-Export eingeführt, sodass Aufgaben konsistente Enddaten ohne zusätzliche Konfiguration haben können.

## 2.0.2.0

* Die MPXJ-Bibliothek wurde auf Version 11.5.4 aktualisiert.

* Unterstützung für benutzerdefinierte Eigenschaften von Zusammenfassungsaufgaben (WBS) wurde sowohl für den Primavera-Import als auch -Export hinzugefügt. Dies funktioniert auch, wenn Eigenschaften denselben Namen haben. Um dies beim Export für Zusammenfassungsaufgaben zu aktivieren, muss für die **Summary**-Eigenschaft *true* zurückgegeben werden.

* Ein Problem wurde behoben, bei dem Baseline 0 nicht korrekt importiert wurde.

## 2.0.0.1

* Verschiedene interne Optimierungen wurden vorgenommen und ein importiertes Dockerfile wurde hinzugefügt.

## 2.0.0.0

* Das Modul wurde von ASP.NET MVC auf ASP.NET Core migriert, wodurch es auf Linux und in Docker-Containern ausgeführt werden kann.
