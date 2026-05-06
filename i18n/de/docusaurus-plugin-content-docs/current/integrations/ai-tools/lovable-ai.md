--- 
title: "Integration mit Lovable AI"
sidebar_label: "Lovable AI"
description: "Anleitung zur Integration von DHTMLX React Gantt in eine von Lovable AI erzeugte Anwendung"
---

# Integration mit Lovable AI

Dieser Artikel beschreibt, wie man DHTMLX React Gantt in ein Lovable-Projekt integriert und präzisen Code generiert.

## Wie Lovable DHTMLX Gantt handhabt

Lovable erzeugt React‑Anwendungen aus natürlichsprachigen Eingaben. Es bewältigt gängige UI‑Muster gut – Layouts, Routen, Standardkomponenten – weil das Modell während des Trainings genügend Beispiele gesehen hat. DHTMLX Gantt ist eine spezialisierte Komponente mit eigener Konfigurations‑API, Eigenschaftsnamen und Datenformaten. Das Modell hat hier weniger Referenzmaterial, daher rät es. Manchmal richtig, oft nicht.

Die Lösung ist Kontext. Drei Mechanismen ermöglichen es, Lovable genaue API-Informationen zu liefern – jeweils auf unterschiedlicher Ebene:

| Methode | Am besten geeignet für | Umfang |
|---|---|---|
| **Inline-Eingaben** | Einmalige Anpassungen, bei denen Sie die genaue Eigenschaft kennen | Einzelner Prompt |
| **Wissensdatenbank** | Wiederverwendbare Regeln über mehrere Eingaben hinweg | Projektebene |
| **MCP** | Vollständige API‑Abdeckung ohne Copy-Paste | Externer Server-Verbindung |

Diese Ansätze schließen sich nicht gegenseitig aus. Wissensdatenbank und MCP arbeiten gut zusammen – verwenden Sie die Wissensdatenbank für projektspezifische Konventionen, MCP für allgemeine API‑Genauigkeit.

Die untenstehenden Abschnitte führen durch den vollständigen Ablauf: eine App scaffolden, Gantt hinzufügen und dann die Ausgabqualität mit jeder Methode verbessern.

## Voraussetzungen

- Ein Lovable‑Konto

Für lokale Entwicklung (optional):

- Node.js 18+
- npm

Für plattform­spezifische Details siehe die Lovable-Dokumentation.

## Generierung einer Basis-App

Beginnen Sie mit einem standardmäßigen Admin‑Layout. Dieser Prompt erzeugt ein Dashboard mit Navigation, KPI‑Karten und einem Chart‑Bereich:

> Erstellen Sie eine Admin-Anwendung.
> Anforderungen:
> - Jedes Navigations-Element öffnet eine eigene Route
> - Das Dashboard enthält KPI‑Karten und einen Hauptinhaltbereich mit einem Umsatz-Diagramm

![Vom Lovable generiertes Admin-Dashboard-Layout](/img/lovable_admin_dashboard_layout.png)

Nach der Generierung können Sie in Lovable weiter bearbeiten oder das Git‑Repository klonen und lokal arbeiten. Änderungen werden in beide Richtungen synchronisiert.

Halten Sie den ersten Prompt auf Struktur und Navigation fokussiert – die komponentenspezifische Konfiguration kommt später.

## Hinzufügen von DHTMLX React Gantt

Verweisen Sie auf das Trial-Paket in einem Prompt:

> Ersetzen Sie das Umsatz-Diagramm durch ein DHTMLX React Gantt-Diagramm mit @dhtmlx/trial-react-gantt.

![DHTMLX Gantt-Diagramm im Lovable-Dashboard](/img/lovable_gantt_dashboard.png)

Lovable erzeugt React‑Apps, daher passt das React‑Wrapper am besten. Die Anleitung verwendet `@dhtmlx/trial-react-gantt` – den Evaluations‑Build von [DHTMLX React Gantt](../../react/overview/). Es ist öffentlich auf npm verfügbar, was bedeutet, dass Lovable es ohne zusätzliche Einrichtung installieren kann.

Der Trial‑Build ist voll funktionsfähig, enthält jedoch ein Evaluationswasserzeichen. Für die Produktion wechseln Sie zu `@dhx/react-gantt`, das eine Authentifizierung mit dem [DHTMLX privaten npm‑Registry](../../react/installation/) erfordert. Alternativ fügen Sie die Paketdateien lokal in Ihr Projekt ein.

Lovable installiert das Paket, erstellt einen Import und rendert einen grundlegenden Gantt mit Beispielaufgaben und einer Timeline. Die Ausgabe stimmt oft nicht exakt mit der API überein – Spaltenkonfiguration, Skaleneinstellungen und Datenformate werden geraten. Die untenstehenden Abschnitte zeigen, wie man diese Diskrepanz verringert.

## Verbesserung der Ausgabe mit Inline‑Eingaben

Wenn Sie den genauen API‑Aufruf kennen, fügen Sie den Eigenschaftsnamen und einen Codeausschnitt hinzu, damit Lovable nicht rät:

> Aktualisieren Sie die DHTMLX React Gantt‑Konfiguration:
> - Legen Sie die Zeilenhöhe auf `40px` fest über `config.row_height`
> - Übergeben Sie das Config‑Objekt in die ReactGantt‑Komponente
>
> Beispiel:
> ```jsx
> const config = {
>   row_height: 40
> };
>
> <ReactGantt config={config} />
> ```

Funktioniert gut für isolierte Änderungen. Wenn die Konfiguration wächst, wird es unübersichtlich – Sie fügen am Ende dieselben API‑Details in jeden Prompt ein.

## Regeln in der Wissensdatenbank speichern

Die Wissensdatenbank speichert wiederverwendbare Regeln, die auf alle Prompts in einem Projekt anwendbar sind. Definieren Sie API‑Spezifika einmal statt sie zu wiederholen:

> Thema:
> - Gantt unterstützt Theming über die "theme" Prop.
> - Erlaubte Werte: `"terrace"` (hell) und `"dark"` (dunkel).
> - Wenn die App ein globales Theme hat, weisen Sie zu:
>   - light -> `"terrace"`
>   - dark  -> `"dark"`
> - Übergeben Sie den gemappten Wert dem Gantt als `theme={ganttTheme}`.
>
> Rasterzeilenhöhe:
> - Legen Sie die Zeilenhöhe über das Gantt‑Konfigurationsobjekt fest.
> - Verwenden Sie `config.row_height` (Zahl, in Pixeln).
> - Geben Sie das Config‑Objekt in die ReactGantt‑Komponente ein:
>
>   ```jsx
>   const config = { row_height: 40 };
>
>   <ReactGantt config={config} />
>   ```

![Lovable Knowledge Base mit Regeln zur Gantt-Konfiguration](/img/lovable_knowledge_base_gantt_rules.png)

Mit den Regeln können Prompts kurz gehalten werden:

> Verwenden Sie die Projekt‑Wissensdatenbank. Stellen Sie die Gantt‑Rasterzeilenhöhe auf 60 ein.

![Gantt nach Anwendung der Wissensdatenbank-Konfiguration in Lovable](/img/lovable_gantt_after_kb_update.png)

Die Wissensdatenbank hat eine Obergrenze von ca. 100k Zeichen – ausreichend für eine fokussierte Referenz zur Konfiguration, aber nicht für die vollständige [DHTMLX Gantt API](https://github.com/DHTMLX/gantt-docs). Für breitere Abdeckung verbinden Sie MCP.

## Verbindung von MCP für vollen API‑Zugang

MCP (Model Context Protocol) verbindet Lovable mit einem externen Dokumentationsserver. Es ermöglicht Lovable den Zugriff auf die vollständige, aktuelle API ohne manuelles Kopieren und Einfügen.

Verbinden Sie den [DHTMLX MCP Server](../mcp-server/) in Ihren Lovable‑Projekteinstellungen:

![Hinzufügen des DHTMLX MCP‑Servers in Lovable](/img/lovable_mcp_server_setup.png)

Referenzieren Sie ihn dann in Prompts, damit Lovable die relevanten Dokumente vor dem Generieren des Codes abruft:

> Verwenden Sie den DHTMLX MCP‑Server. Stellen Sie die Gantt‑Rasterzeilenhöhe auf 60 Pixel ein.

Lovable ermittelt Eigenschaftsnamen, Datenformate und Konfigurationsmuster aus der tatsächlichen API‑Referenz statt zu raten.

## Praktische Tipps

- **Eine Änderung pro Prompt.** Kleinere Prompts erleichtern es, Probleme zu isolieren, wenn die Ausgabe nicht stimmt.
- **Imports überprüfen.** Lovable importiert manchmal aus dem falschen Paketpfad oder mischt benannte und Standard-Exporte. Überprüfen Sie nach jeder Änderung die Importzeile.
- **Wissensdatenbank und MCP kombinieren.** Wissensdatenbank für projektspezifische Konventionen (Theming‑Zuordnung, Spaltenlayout), MCP für allgemeine API‑Genauigkeit. Sie ergänzen sich.
- **Das Config‑Objekt inspizieren.** Wenn das Gantt nicht wie erwartet gerendert wird, protokollieren Sie das an `<ReactGantt />` übergebene Config‑Objekt und vergleichen Sie es mit der [Configuration Props Reference](../../react/configuration-props/). Die meisten Probleme ergeben sich aus einer fehlenden oder falsch benannten Eigenschaft.

## Was Sie als Nächstes lesen sollten

- [DHTMLX React Gantt overview](../../react/overview/) – API und Funktionen der Komponente
- [Installationsanleitung](../../react/installation/) – Einrichtung des Profi-Pakets
- [DHTMLX MCP Server](../mcp-server/) – MCP mit anderen KI‑Tools verbinden