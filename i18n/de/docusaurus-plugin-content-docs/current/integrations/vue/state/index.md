---
title: "Daten- und Zustandsverwaltung"
description: "Wie man den von Vue verwalteten oder von Gantt verwalteten Datenfluss in Vue Gantt wählt und implementiert."
---

Dieser Abschnitt erläutert, wie Sie die Daten von Vue Gantt mit Ihrer Vue-Benutzeroberfläche, Ihrem Store und dem Backend-Verhalten konsistent halten.

## Erste Schritte

Lesen Sie zuerst [Datenbindung und Grundlagen der Zustandsverwaltung](integrations/vue/state/state-management-basics.md).

Dieser Leitfaden behandelt:

- Vue-Zustand/Store als Quelle der Wahrheit
- Gantt als Quelle der Wahrheit
- `data.save` und `data.batchSave` Callback-Verträge

## Wählen Sie Ihr Modell der Datenhoheit

Verwenden Sie **Vue-Zustand oder Store als Quelle der Wahrheit**, wenn:

- Die umgebende Vue-Benutzeroberfläche den neuesten Diagrammzustand widerspiegeln muss
- Sie bereits Pinia oder einen anderen Store als maßgeblichen Zustand verwenden
- Vorhersehbare unidirektionale Updates wichtiger sind als der rohe Bearbeitungsdurchsatz

Verwenden Sie **Gantt als Quelle der Wahrheit**, wenn:

- Die Seite diagrammzentriert ist
- Das Aktualisierungsvolumen hoch ist
- Sie die Store-Fluktuation bei häufigen Änderungen an der Diagrammseite reduzieren möchten

## Pinia-Anleitung

Verwenden Sie [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md) für eine store-gesteuerte Implementierung mit `batchSave` und optionaler store-level Undo/Redo.

Ein lauffähiges Begleitprojekt finden Sie unter [vue-gantt-pinia-starter auf GitHub](https://github.com/DHTMLX/vue-gantt-pinia-starter).

## Minimaler Starter-Muster

~~~ts
const data = {
  batchSave: changes => ganttStore.applyBatch(changes)
};
~~~

Verwenden Sie dieses Muster, wenn eine Diagramm-Aktion viele Aktualisierungen von Aufgaben/Verknüpfungen erzeugen kann.

## Leistungs-Hinweis

Für Operationen wie die automatische Terminplanung bevorzugen Sie `data.batchSave` gegenüber einzelner Änderung `data.save`, damit Zustandsaktualisierungen in gruppierten Batches erfolgen.

Form und Abwägungen der Callback-Verträge sind in [Batch Save-Vertrag](integrations/vue/state/state-management-basics.md#databatchsave) dokumentiert.