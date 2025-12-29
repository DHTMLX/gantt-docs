---
title: "Fehlerbehebung bei Backend-Integrationsproblemen"
sidebar_label: "Fehlerbehebung bei Backend-Integrationsproblemen"
---

# Fehlerbehebung bei Backend-Integrationsproblemen

## Symptome

1. Sie versuchen, die Backend-API entweder manuell oder anhand unserer [Anleitungen](integrations/howtostart-guides.md) zu implementieren, aber das Gantt-Diagramm zeigt beim Öffnen der Seite keine Aufgaben oder Verknüpfungen an.

oder

2. Sie haben Schwierigkeiten, Änderungen im Backend zu speichern.

## Gründe

Es gibt verschiedene mögliche Ursachen und Lösungen für fehlerhaftes Verhalten auf unterschiedlichen Plattformen, auf die wir hier nicht im Detail eingehen.

Diese Anleitung soll Sie durch die gängigen Schritte zur Untersuchung solcher Probleme führen. Sobald Sie das Problem identifiziert und verstanden haben, warum die App nicht korrekt funktioniert, ist die Behebung in der Regel unkompliziert.

## Überprüfen Sie Fehlermeldungen auf der Seite

1. Öffnen Sie die Entwicklertools Ihres Browsers und laden Sie die Seite neu. Gibt es Fehlermeldungen in der Browser-Konsole?

![Fehler überprüfen](/img/check_errors.png)

2. Falls Fehler auftreten, bewerten Sie diese und prüfen Sie, ob Sie sie selbst beheben können. Wenn nicht, fahren Sie mit dem nächsten Schritt fort.

## Überprüfen Sie, was der Client anfragt

1. Öffnen Sie das **Netzwerk**-Panel und stellen Sie sicher, dass *XHR*-Anfragen sichtbar sind.

2. Laden Sie die Seite neu und suchen Sie die Anfrage, die für das Laden der Daten aus dem Backend verantwortlich ist. Vergewissern Sie sich, dass sie die korrekte URL anspricht, und überprüfen Sie den Antwortstatus.

![Anfrage überprüfen](/img/request_check.png)

Gibt es Fehler?

Ein 404-Antwortstatus weist entweder auf eine falsche URL, die an die Methode `gantt.init` übergeben wurde, oder auf ein Problem mit den Routing-Einstellungen Ihrer Anwendung hin.

## Überprüfen Sie, was der Server zurückliefert

Wählen Sie die Anfrage aus und prüfen Sie die Vorschau der Antwort oder den Rohinhalt der Antwort.

![Antwort überprüfen](/img/check_response.png)

Entspricht die Antwort dem [erwarteten Datenformat](guides/loading.md#loadingfromserver)?

### Wenn Sie eine Fehlermeldung vom Webserver statt Gantt-Daten sehen

Das bedeutet meist, dass es ein Problem mit dem Backend-Code oder den Datenbankverbindungseinstellungen gibt.

Typischerweise enthält die Fehlerantwort genügend Details, um die Ursache zu identifizieren. Wenn Sie eine allgemeine `500 server error`-Meldung erhalten, müssen Sie eventuell temporär benutzerdefinierte Fehlerseiten auf Ihrem Server deaktivieren, um die tatsächliche Fehlermeldung zu sehen. Dieser Vorgang hängt von der jeweiligen Plattform ab. Falls Sie unsicher sind, suchen Sie nach "disable custom error page in (your server or framework)".

### Wenn die Daten größtenteils korrekt aussehen

Überprüfen Sie die Eigenschaften `id`, `start_date`, `end_date`, `duration` und `parent`.

- `id` - Aufgaben mit identischer id werden zusammengeführt. Wenn z.B. fünf Aufgaben die gleiche id haben, zeigt das Gantt-Diagramm nur eine davon an.

- `parent` - Einträge, bei denen der Wert von `parent` der [`root_id` Konfiguration](api/config/root_id.md) entspricht, erscheinen auf der Wurzelebene des Aufgabenbaums (standardmäßig jeder leere Wert einschließlich null oder 0). Wenn die Eigenschaft `parent` gesetzt ist, aber im Datensatz die entsprechende übergeordnete Aufgabe fehlt, wird dieses Element nicht angezeigt.

- `start_date`, `end_date`, `duration` - Stellen Sie sicher, dass jeder Eintrag mindestens zwei dieser Eigenschaften enthält, z.B. `start_date` plus `duration`. Weitere Details finden Sie im Artikel [Data Loading](guides/loading.md#loadingtaskdates).

Überprüfen Sie außerdem, ob die Formate von `start_date`/`end_date` mit dem in der [date_format](api/config/date_format.md) Konfiguration angegebenen Format übereinstimmen.

### Wenn Ihnen ungewöhnliche Werte bei den Eigenschaften auffallen

Überprüfen Sie die Inhalte Ihrer Datenbank, da das Problem dort seinen Ursprung haben könnte. Stimmen die Datumsformate nicht überein, passen Sie entweder die `date_format` Konfiguration an oder ändern Sie den Code, der die Aufgabendaten vor dem Senden an den Client serialisiert.

## Überprüfen Sie, was ins Gantt geladen wurde

1. Öffnen Sie die Browser-Konsole und führen Sie `gantt.getTaskByTime()` aus.

2. Überprüfen Sie die Ausgabe in der Konsole, die ein Array von Aufgaben sein sollte.

![Daten überprüfen](/img/check_data.png)

Überprüfen Sie erneut die Eigenschaften `start_date`, `end_date` und `parent` der Aufgaben.

### Filter

Wenn hier alles in Ordnung ist, prüfen Sie Ihren Code, da Aufgaben möglicherweise [durch einen Filter ausgeblendet](guides/filtering.md) werden.

## Letzter Ausweg

Sollte keiner der oben genannten Schritte das Problem lösen oder erscheinen weder Aufgaben noch Konsolenfehler, erwägen Sie, [Ihre Frage in unserem Forum zu stellen](https://forum.dhtmlx.com/c/gantt) oder unseren technischen Support zu kontaktieren.

Stellen Sie sicher, dass Sie alle während der Fehlersuche gesammelten Informationen beifügen.

Zusätzlich benötigt unser Team ein minimal reproduzierbares Beispiel: entweder ein eigenständiges Paket mit einer vereinfachten App (die Gantt-Seite, alle benötigten Dateien, ein Datenbank-Dump mit Testdaten oder eine statische JSON-Datei mit den zu ladenden Daten) oder einen Online-Link, unter dem wir das Problem im Browser untersuchen können.

