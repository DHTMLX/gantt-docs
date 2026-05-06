---
title: "Daten- und Zustandsverwaltung"
description: "Wie man React Gantt an den React-Zustand oder einen Zustandsmanager bindet, Benutzerbearbeitungen behandelt und zwischen React-verwalteten und Gantt-verwalteten Datenmodellen wählt."
---

Dieser Abschnitt erläutert, wie man Gantt-Daten im Gleichschritt mit dem Anwendungszustand hält. Er deckt das empfohlene React-getriebene Modell (React oder ein Store als Quelle der Wahrheit), das leistungsorientierte Gantt-verwaltete Modell und praxisnahe Implementierungen für beliebte Zustandsverwaltungsbibliotheken ab.

## Hier beginnen

Lesen Sie dies zuerst, um die beiden unterstützten Datenmodelle und die gängigen Integrationsmuster zu verstehen:

- [Grundlagen der Datenbindung und Zustandsverwaltung](integrations/react/state/state-management-basics.md)

Es erläutert, wie man `data.save`- und `data.batchSave`-Callback-Funktionen verwendet, wie das Laden in jedes Modell passt und welche Änderungen auftreten, wenn Gantt Daten intern verwaltet.

## Wählen Sie Ihre Zustandsbibliothek

Jede der untenstehenden Anleitungen folgt demselben Kernmuster (State -> Props -> Gantt, Änderungen -> Callback-Funktionen -> State), verwendet jedoch die Idiome der jeweiligen Bibliothek:

- [Redux Toolkit](integrations/react/state/redux-toolkit.md)
- [Zustand](integrations/react/state/zustand.md)
- [MobX](integrations/react/state/mobx.md)
- [XState](integrations/react/state/xstate.md)
- [Jotai](integrations/react/state/jotai.md)
- [Valtio](integrations/react/state/valtio.md)
- [TanStack Query](integrations/react/state/tanstack-query.md)

## Echtzeit-Synchronisation

Wenn Sie Live-Updates benötigen, beginnen Sie hier:

- [Firebase-Integration](integrations/react/firebase-integration.md)

## Leistungshinweise

Wenn Ihre Anwendung große Operationen durchführt (automatisches Scheduling, Massenbearbeitungen, große Datensätze), beachten Sie Folgendes:

- die Verwendung von `data.batchSave`, um den Aktualisierungsaufwand zu reduzieren,
- das **Gantt-verwaltete Datenmodell**, wenn React nicht jede Änderung sofort widerspiegeln muss.

Beide Themen werden in [Grundlagen der Datenbindung und Zustandsverwaltung](integrations/react/state/state-management-basics.md) behandelt.