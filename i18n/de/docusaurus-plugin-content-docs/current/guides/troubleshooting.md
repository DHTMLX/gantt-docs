---
title: "Fehlersuche bei der Backend-Integration"
sidebar_label: "Fehlersuche bei der Backend-Integration"
---

# Fehlersuche bei der Backend-Integration

## Symptome 

1. Sie versuchen, die Backend-API entweder manuell oder gemäß unseren [Tutorials](integrations/howtostart-guides.md) zu implementieren, aber Gantt zeigt beim Öffnen der Seite keine Aufgaben oder Verknüpfungen an.

oder

2. Sie haben Schwierigkeiten, Änderungen am Backend zu speichern.

## Ursachen

Es kann viele Gründe und Lösungen für falsches Verhalten auf verschiedenen Plattformen geben, die wir in diesem Artikel nicht behandeln werden.

Unser Ziel hier ist es, Sie durch die üblichen Schritte zur Untersuchung dieser Art von Problem zu führen. Sobald Sie das Problem lokalisieren und verstehen, warum die App nicht funktioniert, ist die Behebung in der Regel einfach.

## Prüfen Sie die Fehlermeldungen auf der Seite

1. Öffnen Sie die Entwicklertools des Browsers und laden Sie die Seite neu. Sehen Sie Fehlermeldungen in der Browser-Konsole? 

![Fehler prüfen](/img/check_errors.png)

2. Falls vorhanden, bewerten Sie die Fehler und entscheiden Sie, ob Sie diese selbst beheben können. Andernfalls fahren Sie mit dem nächsten Schritt fort. 

## Prüfen, was vom Client angefordert wird

1. Öffnen Sie das **Network**-Panel und stellen Sie sicher, dass *XHR*-Anfragen sichtbar sind. 

2. Laden Sie die Seite neu und suchen Sie eine Anfrage, die Daten vom Backend laden sollte. Stellen Sie sicher, dass sie zur richtigen URL geht und überprüfen Sie den Antwortstatus.

![Anfrage prüfen](/img/request_check.png)

Gibt es Fehler?

Ein 404-Antwortstatus würde bedeuten, dass entweder eine falsche URL an die Methode `gantt.init` übergeben wurde oder ein Problem in den Routing-Einstellungen Ihrer Anwendung besteht. 

## Prüfen, was von dem Server zurückgegeben wird

Wählen Sie die Anfrage aus und prüfen Sie die Antwortvorschau oder den rohen Antwortinhalt.

![Antwort prüfen](/img/check_response.png)

Sieht die Antwort ähnlich dem [erwarteten Datenformat](guides/loading.md#loadingtaskdates) aus? 

### Wenn Sie eine Fehlermeldung des Webservers statt der Gantt-Daten sehen

Sie können sicher sein, dass etwas mit dem Backend-Code oder den Datenbankverbindungs-Einstellungen nicht stimmt. 

In der Regel enthält die Fehlermeldung genügend Informationen, um herauszufinden, was das Problem verursacht. Wenn Sie eine generische `500 server error`-Meldung sehen, müssen Sie möglicherweise vorübergehend benutzerdefinierte Fehlerseiten auf Ihrem Server deaktivieren, um den eigentlichen Fehler zu sehen. Das wird unterschiedlich auf verschiedenen Plattformen umgesetzt. Wenn Sie nicht sicher sind, wo Sie anfangen sollen, googeln Sie einfach "disable custom error page in (your server or framework)". 

### Wenn die Daten mehr oder weniger ok aussehen 

Schauen Sie sich die Eigenschaften `id`, `start_date`, `end_date`, `duration`, `parent` an.

- `id` - Elemente mit derselben `id` werden zusammengeführt. Wenn Sie fünf Aufgaben mit übereinstimmenden IDs haben, zeigt Gantt nur eine davon an.

- `parent` - Einträge, deren `parent`-Wert dem [`root_id`-Konfig](api/config/root_id.md) entspricht, werden auf der Root-Ebene des Aufgabenbaums angezeigt (standardmäßig - jeder leere Wert, einschließlich 0 oder null).
Wenn die `parent`-Eigenschaft nicht leer ist und Ihr Dataset keine passende übergeordnete Aufgabe enthält, wird ein solcher Eintrag überhaupt nicht angezeigt.

- `start_date`, `end_date`, `duration` - Vergewissern Sie sich, dass Ihre Einträge mindestens zwei dieser Eigenschaften enthalten, z. B. `start_date`+`duration`. Weitere Informationen finden Sie im [Datenladen](guides/loading.md#loadingtaskdates)-Artikel.

Stellen Sie sicher, dass die Formate von `start_date`/`end_date` dem in der [date_format](api/config/date_format.md) Konfiguration von gantt angegebenen Format entsprechen.


### Wenn Sie ungewöhnliche Werte in den Eigenschaften finden

Prüfen Sie, was in Ihrer Datenbank gespeichert ist; vermutlich liegt dort das Problem. Falls Datumsformate nicht übereinstimmen, ändern Sie entweder die `date_format`-Konfiguration oder passen Sie den Code an, der die Aufgaben-Daten vor der Ausgabe an den Client serialisiert. 

## Prüfen, was in das Gantt geladen wird

1. Öffnen Sie die Browser-Konsole und führen Sie `gantt.getTaskByTime()` aus.

2. Untersuchen Sie die Konsolenausgabe. Wahrscheinlich sehen Sie ein Array von Aufgaben.

![Daten prüfen](/img/check_data.png)

Auch hier können Sie die Eigenschaften `start_date`, `end_date` und `parent` der Aufgaben prüfen.

### Filter

Wenn Sie dort keine offensichtlichen Probleme sehen, prüfen Sie möglicherweise Ihren Code; wahrscheinlich werden Aufgaben durch Filter versteckt. 

## Letzter Ausweg

Falls keines der oben genannten Schritte hilft, oder wenn Sie weder Aufgaben noch Konsolenfehler sehen, versuchen Sie, Ihre Frage in unserem Forum zu posten: [forum.dhtmlx.com/c/gantt](https://forum.dhtmlx.com/c/gantt) oder wenden Sie sich an unseren technischen Support bezüglich Ihres Problems.

Bitte geben Sie unbedingt alle Informationen an, die Sie bei den obigen Schritten gesammelt haben.

Außerdem benötigt unser Team eine minimale reproduzierbare Demo: entweder ein eigenständiges Paket mit einer vereinfachten App (die Gantt-Seite, alle erforderlichen Dateien, ein Datenbank-Dump mit einigen Testdaten oder eine statische JSON-Datei mit Daten, die Sie laden möchten), oder einen Online-Link, über den wir das Problem im Browser prüfen könnten.