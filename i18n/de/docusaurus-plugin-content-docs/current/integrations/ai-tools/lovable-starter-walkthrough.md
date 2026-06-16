---
title: "React Gantt Lovable Starter - Schritt-für-Schritt-Anleitung"
sidebar_label: "Lovable Starter - Schritt-für-Schritt-Anleitung"
description: "Reproduzieren Sie den DHTMLX React Gantt-Projektplaner in Lovable mit einer festgelegten Abfolge von Aufforderungen und einem Supabase-Backend"
---

# React Gantt Lovable Starter - Schritt-für-Schritt-Anleitung

Dieser Leitfaden erklärt, wie man den [React Gantt Lovable Starter](https://github.com/DHTMLX/react-gantt-lovable-starter) – einen Mehrprojektplaner mit einem Supabase-Backend – in Ihrem eigenen Lovable-Arbeitsbereich reproduziert. Das veröffentlichte Repository und sein [`docs/`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/docs)-Ordner bilden die Quelle der Wahrheit; diese Seite ist der Einstiegspunkt, der erklärt, wie die Bausteine zusammenpassen.

Für eine generische Lovable + Gantt-Schritt-für-Schritt-Anleitung, die kein Supabase verwendet, siehe den Begleitleitfaden: [Lovable AI](integrations/ai-tools/lovable-ai.md).

## Was Sie am Ende erhalten

Eine funktionsfähige App mit:

- einer gerouteten Shell (Dashboard, Projekte, Berichte, Arbeitsbelastung)
- pro-Projekt-Gantt-Arbeitsbereiche mit CRUD für Aufgaben und Verknüpfungen
- eine dauerhafte Reihenfolge der Aufgaben per Drag-and-Drop
- Rückgängig-/Wiederherstellungs- und Zoom-Steuerungen
- ein funktionsfähiger Kalender mit Hervorhebung der Wochenendtage
- ein Ressourcen-Panel mit Auslastungsabzeichen
- ein rein demonstratives Rollenmodell (viewer / editor / owner)
- ein Supabase-Schema, Demo-Richtlinien und Seed-Daten

Der Starter basiert auf dem standardmäßigen Lovable-Stack: React 18 + TypeScript + Vite + Tailwind + shadcn/ui, ergänzt durch React Query, Redux Toolkit und Supabase.

## Voraussetzungen

- Ein Lovable-Konto
- Ein Supabase-Projekt (Kostenlose Stufe reicht aus)
- Optional: Node.js 18+ und npm, wenn Sie das Ergebnis lokal ausführen möchten

## Zwei Wege, das Rezept zu verwenden

Der [`docs/`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/docs) Ordner bedient zwei Zielgruppen:

1. **Den Build von Grund auf neu reproduzieren.** Senden Sie die Aufforderungen der Reihe nach an Lovable. Sie erhalten dieselbe App-Struktur, dieselbe Gantt-Konfiguration und dasselbe Supabase-Schema. Dies ist der empfohlene Weg, wenn Sie das Muster erlernen möchten.
2. **Das veröffentlichte Repository als Startvorlage verwenden.** Klonen Sie das GitHub-Repository, richten Sie es auf Ihr eigenes Supabase-Projekt aus und überspringen Sie die Lovable-Aufforderungen vollständig. Das ist schneller, wenn Sie einfach einen lauffähigen Starter möchten.

## Den Build in Lovable reproduzieren

Die vollständige Prompt-Sequenz befindet sich in [`docs/00-build-plan.md`](https://github.com/DHTMLX/react-gantt-lovable-starter/blob/main/docs/00-build-plan.md). Der grobe Ablauf:

1. Fügen Sie den Inhalt von [`00-knowledge.md`](https://github.com/DHTMLX/react-gantt-lovable-starter/blob/main/docs/00-knowledge.md) in die Wissensdatenbank Ihres Lovable-Projekts ein, bevor Sie die erste Aufforderung senden. Dadurch werden Paketname, CSS-Import, Containerhöhe und Datumsverarbeitungsregeln festgelegt.
2. Führen Sie die Aufforderung [`01-create-app-shell.md`](https://github.com/DHTMLX/react-gantt-lovable-starter/blob/main/docs/01-create-app-shell.md) aus, um Routen, Navigation und Platzhalterseiten zu erstellen.
3. Entscheiden Sie vor Schritt 03 über Ihr Backend. Der Starter verwendet Supabase. Falls Sie eine Backend-freie Variante wünschen, können Sie die Supabase-Schritte überspringen und nur Mock-Daten verwenden.
4. Führen Sie die verbleibenden Aufforderungen der Reihenfolge von `02` bis `11` aus. Jede Aufforderung deckt einen Funktionsbereich ab (Gantt-Kern, Supabase, CRUD, Berechtigungen, Browser-Überprüfung, Gantt-UX, funktionierender Kalender, Ressourcen, abschließende Verifikation, Dashboard-/Berichts- und Arbeitslast-Seiten).

Ein typischer Durchlauf ergibt eine funktionsfähige App in 11 Prompt-Schritten. Die genauen Prompts und deren Umfang sind im Repository versioniert.

## Manuelle Anpassungen, die Sie möglicherweise benötigen

Generierter Code ist selten beim ersten Versuch perfekt, insbesondere bei React-spezifischen Mustern. Das Repository protokolliert jede manuelle Änderung, die während des ursprünglichen Builds angewendet wurde, in [`docs/00-manual-edits.md`](https://github.com/DHTMLX/react-gantt-lovable-starter/blob/main/docs/00-manual-edits.md). Behandeln Sie diese Datei sowohl als Liste bekannter Probleme als auch als Beispiel, wie Sie Ihr eigenes Lovable-Build-Log führen, wenn der generierte Output vom gewünschten Muster abweicht.

Derzeit aufgezeichnete Fixes decken die Theme-Kontext-Verkettung, die Gantt-Datums-Normalisierung am CRUD-Grenzpunkt, die Aktualität von Redux-Snapshots, die Persistenz von Undo/Redo und eine Diskrepanz bei der Signatur der Wochenendvorlage ab.

## Supabase-Setup

Der Ordner [`supabase/migrations`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/supabase/migrations) des Repositories enthält das Schema, Demo-Richtlinien und Seed-Daten als geordnete SQL-Dateien. Wenden Sie sie der Reihe nach im Supabase SQL-Editor an und tragen Sie dann die drei Vite-Umgebungsvariablen (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`) aus Ihren Projekteinstellungen ein.

Das Schema unterstützt mehrere Projekte, wobei Aufgaben und Verknüpfungen projektbezogen sind, zusätzlich gibt es eine Tabelle `project_members`, die das Demo-Rollenmodell steuert.

## Bereit für die Produktion

Der Starter verwendet das öffentliche Trial-Paket `@dhtmlx/trial-react-gantt`. Wenn der Prototyp für die Produktion freigegeben wird, wechseln Sie zum kommerziellen Paket `@dhx/react-gantt` – der Paketwechsel-Vorgang wird in [Installing React Gantt](integrations/react/installation.md#moving-from-the-trial-package-to-the-commercial-one) beschrieben.

Berechtigungen im Starter sind rein Demo-basiert. Ersetzen Sie den Demo-Identitätsfluss durch eine echte Authentifizierung, bevor Sie die App Endbenutzern zugänglich machen.

## Was als Nächstes gelesen werden kann

- [Lovable AI](integrations/ai-tools/lovable-ai.md) - das generische Lovable + Gantt-Arbeitsablauf ohne Backend
- [DHTMLX MCP Server](integrations/ai-tools/mcp-server.md) - MCP mit Lovable verbinden, um genaue API-Verweise zu erhalten
- [Agent Skills](integrations/ai-tools/agent-skills.md) - dieselbe DHTMLX-Muster anwenden, wenn Sie das geklonte Repository in Cursor oder Claude Code weiter bearbeiten
- [Installing React Gantt](integrations/react/installation.md) - Private-Registry-Einrichtung und der Wechsel vom Trial- zum kommerziellen Paket
- [React Gantt Overview](integrations/react/overview.md) - die zugrunde liegende Komponentenreferenz