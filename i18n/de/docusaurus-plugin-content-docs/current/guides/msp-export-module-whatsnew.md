---
title: "Neuigkeiten im MSP Project Export Module"
sidebar_label: "Neuigkeiten im MSP Project Export Module"
---

Neuigkeiten im MSP Project Export Module
========================================

## 2.3.0.0

- Aktualisierte MPXJ-Bibliothek auf Version 12.10.3.
- Unterstützung für Standardaufgabentypen (Projekt und Meilenstein) direkt verfügbar. Meilensteine in Primavera haben den Typ `FINISH_MILESTONE`.
- Unterstützung für Start- und End-Meilensteine beim Primavera-Export
- Unterstützung für den Export aller 11 Baselines in MSP-Dateien
- Unterstützung für erweiterte Felder mit unterschiedlichen Typen: Number1-20, Flag1-20, Cost1-10, Date1-10, Start1-10, Finish1-10, Duration1-10, OutlineCode1-10
- Unterstützung bei der Verwendung exakter Namen für Text1-30-Eigenschaften. Jetzt funktioniert es, wenn Sie ein Alias ("My custom prop") oder Feldname ("Text1") angeben.
- Erhöhte Liste der unterstützten Aufgaben-Eigenschaften in MSP-Dateien. Jetzt werden sie als Standard-Eigenschaften geladen, nicht als benutzerdefinierte/erweiterte Felder
- Unterstützung für Standardressourcen-Eigenschaften und erweiterte Felder: Number1-20, Flag1-20, Cost1-10, Date1-10, Start1-10, Finish1-10, Duration1-10, OutlineCode1-10
- Eine Möglichkeit hinzugefügt, die meisten Standardressourcen-Eigenschaften mit einer einzigen Eigenschaft zu importieren (damit Sie nicht alle Eigenschaften auflisten müssen)
- Behebung des Ressourcenexports, wenn Zuweisungen keinen Einheitenwert haben
- Verschiedene Fehler behoben, die den Datei-Import und -Export aufgrund bestimmter Werte in den Aufgaben-Eigenschaften verhindert hatten

## 2.2.1.0

- Behebung der Angabe eines 24-Stunden-Werts als Arbeitszeitkonfiguration (z. B. `gantt.setWorkTime({ hours: ["00:00-24:00"] })`)
- Behebung des Projektkalenders, der zurückgegeben wird, wenn die Property `CalendarUID` im Parameter `projectProperties` in den Importfunktionen angegeben wird

## 2.2.0.0

- MPXJ-Bibliothek auf Version 12.0.0 aktualisiert
- Korrektes Importieren der `Start`- und `Finish`-Eigenschaften, die im Parameter `taskProperties` angegeben werden
- Behebung des Imports bei Angabe doppelter Werte im Parameter `taskProperties`
- Behebung des Imports, wenn die Property `CalendarUID` im Parameter `taskProperties` angegeben ist und eine Aufgabe keinen Kalender hat
- Behebung des Exports, wenn `gantt.config.worktimes` ein leeres Array hat
- Behebung des Exports, wenn Arbeitszeiteinstellungen im alten Format angegeben werden

## 2.1.1.0

- Umbenennung der Eigenschaft, die Kalender enthält, von `worktimes` zu `calendars`
- Eine Eigenschaft hinzugefügt, die die ID des globalen Kalenders enthält
- Die `worktime`-Eigenschaft, die die globalen Kalender-Einstellungen für die Abwärtskompatibilität enthält, wiederhergestellt

## 2.1.0.0

- Unterstützung benutzerdefinierter Kalender für die importierten und exportierten MSP- und Primavera-Dateien (einschließlich Ressourcen-Kalender)
- Unterstützung zum Abrufen von Zuweisungswerten der Ressourcen aus Einheiten beim Importieren von Dateien
- Unterstützung zum Festlegen benutzerdefinierter Werte für die Ressourcenzuweisungseinheiten beim Exportieren von Dateien
- Die RemainingDuration-Eigenschaft für den Primavera-Export hinzugefügt, um dasselbe Enddatum für Aufgaben ohne zusätzliche Konfiguration zu erhalten

## 2.0.2.0

- MPXJ-Bibliothek auf Version 11.5.4 aktualisiert
- Unterstützung für benutzerdefinierte Eigenschaften von Summary (WBS) Tasks für Primavera-Import und -Export hinzugefügt. Es funktioniert auch, wenn Eigenschaften denselben Namen haben. Um es für die Summary-Aufgaben beim Export der Daten zu ermöglichen, müssen Sie für die **Summary**-Eigenschaft *true* zurückgeben.
- Behebung des Fehlers, wenn Baseline 0 nicht importiert wurde

## 2.0.0.1

- Verschiedene interne Optimierungen und importiertes Dockerfile

## 2.0.0.0

- Vom ASP.NET MVC zu ASP.NET Core migriert. Dadurch ist es jetzt möglich, das MSP Export Module unter Linux und im Docker-Image auszuführen.