--- 
title: "React Gantt"
sidebar_label: React Gantt
description: "Installieren, konfigurieren und DHTMLX Gantt in React mit dem offiziellen Wrapper verwenden."
image: /img/frameworks/react.png
---

React Gantt ist der offizielle React-Wrapper für DHTMLX Gantt. Er ermöglicht es, das Gantt-Diagramm als React-Komponente zu verwenden und gleichzeitig die vollständige Konfigurations-API zu unterstützen.

Wenn Sie eine vollständige Beschreibung wünschen, wie React Gantt funktioniert und welche Funktionen es bietet, beginnen Sie mit der [Übersicht](integrations/react/overview.md).

## Erste Schritte

:::tip KI-gestützte Entwicklung
Wenn Sie einen KI-Codierassistenten verwenden, kann der [DHTMLX React Gantt-Agent-Skill](integrations/ai-tools/agent-skills.md#available-skills) dabei helfen, korrekte Integrationsmuster zu befolgen und häufige Fehler zu vermeiden. Für eine Echtzeit-API-Referenz verbinden Sie den [DHTMLX MCP-Server](integrations/ai-tools/mcp-server.md).
:::

Wenn Sie neu mit dem Wrapper sind, folgen Sie dieser Reihenfolge:

1. [Installation](integrations/react/installation.md) – Wählen Sie die Evaluation (öffentliches npm) oder Professional (privates npm) Version von React Gantt.
2. [Schneller Einstieg](integrations/react/quick-start.md) – Rendern Sie Ihr erstes Diagramm und überprüfen Sie die Einrichtung.
3. [Konfiguration](integrations/react/overview.md) – lernen Sie, wie Sie mit Props, Vorlagen und Ereignishandlern arbeiten.

## Framework-Integrationen

Wenn Ihre Anwendung mit einem Meta-Framework aufgebaut ist, verwenden Sie diese Anleitungen für eine frameworkspezifische Einrichtung:

- [Next.js](integrations/react/nextjs.md) – Einrichtung der Client-Komponenten und gängige SSR-Beschränkungen
- [Remix](integrations/react/remix.md) – routenbasierte Einrichtung und Integrationshinweise

## Wählen Sie ein Datenbindungsmodell

React Gantt unterstützt zwei Ansätze der Datenbindung:

- **Von React verwaltete Daten** (empfohlen für die meisten React-Apps).
  Sie halten Aufgaben/Verknüpfungen in React oder in einem Zustands-Manager, übergeben sie als Props und behandeln Aktualisierungen über die Callback-Funktionen `data.save`/`data.batchSave`.

- **Von Gantt verwaltete Daten** (nützlich in spezialisierten, leistungsintensiven Fällen)
  Sie initialisieren Daten einmal und lassen Gantt (und Ihr Backend) den Lebenszyklus der Daten verwalten. React wendet aktualisierte Props nach jeder Änderung nicht erneut an.

Um beide Ansätze und deren Vor- und Nachteile zu verstehen, lesen Sie die [Datenbindung & Grundlagen der Zustandsverwaltung](integrations/react/state/state-management-basics.md).

## Daten- & Zustandstutorials

Wenn Sie eine Bibliothek zur Zustandsverwaltung verwenden, zeigen die Anleitungen in [Daten- und Zustandsverwaltung](integrations/react/state.md) dasselbe Integrationsmuster, das für jede Bibliothek (Redux Toolkit, Zustand, MobX und mehr) implementiert ist, plus Echtzeit-Synchronisation mit Firebase.

## Beispiele und Evaluationsressourcen

Wenn Sie React Gantt evaluieren, bietet Ihnen die Evaluierungsseite technischen Support während der Evaluierungsphase. Siehe [Installation](integrations/react/installation.md).