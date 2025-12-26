---
title: "FAQ"
sidebar_label: "FAQ"
---

# FAQ

## Wie öffnet man Beispiele

Das Distributionspaket der Komponente enthält eine Demo-Backend-App, mit der Sie Beispiele lokal ausführen können.
Die App benötigt [Node.js](https://nodejs.org/en/) und verwendet einen In-Memory-Speicher für Demos, bei denen die Daten eigentlich im Backend gespeichert werden sollten (d. h. es ist keine Datenbankeinrichtung erforderlich).

### Was Sie tun können, um die Beispiele auszuführen

1) Verwenden Sie die Demo-Backend-App auf Node.js-Basis: 

- Entpacken Sie das Paket in einen beliebigen Ordner
- Öffnen Sie ein Terminal (oder cmd, PowerShell)
- Führen Sie `npm install` aus
- Führen Sie `npm run start` aus
- Öffnen Sie `http://localhost:9200` in Ihrem Browser
- Sie sollten die Indexseite sehen, die identisch mit unseren Online-Beispielen ist: **https://docs.dhtmlx.com/gantt/samples/**

2) Verwenden Sie den Apache-Webserver

- Installieren Sie den Apache-Webserver. Falls Sie nicht wissen, wie das geht, empfehlen wir [XAMPP](https://www.apachefriends.org/index.html).
- Legen Sie die Gantt-Beispiele in das Dokumentenstammverzeichnis von Apache (*xampp/htdocs*, wenn Sie XAMPP installiert haben).
- Wenn Sie den Apache-Webserver starten, können Sie auf die Beispiele über die URL **http://localhost/yourfolder** zugreifen.

3) Verwenden Sie einen in Ihre IDE integrierten Entwicklungs-Webserver

Einige IDEs bieten einen integrierten Entwicklungs-Webserver, zum Beispiel: 
[https://www.jetbrains.com/help/webstorm/creating-local-server-configuration.html](https://www.jetbrains.com/help/webstorm/creating-local-server-configuration.html).


Sie können nachschlagen, ob Ihre IDE eine ähnliche Funktion entweder standardmäßig oder per Plugin unterstützt.

### Warum Sie das benötigen könnten

Einige Beispiele in unserem Paket laden ihre Daten mittels AJAX (xhr) aus JSON-Dateien. Damit dies funktioniert, muss das Beispiel von einem Webserver aus geöffnet werden.

Wenn Sie ein Beispiel per Doppelklick öffnen, wird es vom Browser als Datei geöffnet. In diesem Modus blockiert der Browser AJAX-Aufrufe und die Komponente kann die Datendateien nicht laden. 
Sie sehen in diesem Fall das Popup *Invalid data* oben rechts auf dem Bildschirm.

Um sicherzustellen, dass dieses Verhalten in Ihrem Fall zutrifft, überprüfen Sie die URL in der Navigationsleiste des Browsers. Wenn das *file:///*-Format in der URL verwendet wird, z. B.: 


**file:///D:/www/gantt-eval/samples/11_resources/09_resource_histogram.html** 

können Sie sicher sein, dass dies der Fall ist. Beispiele, die Daten aus Dateien laden, funktionieren in diesem Modus nicht.

Wenn Sie ein Beispiel von einem Webserver aus öffnen, sieht die URL so aus (*http://* kann entfallen): 


**http://localhost/gantt-eval/samples/11_resources/09_resource_histogram.html**


## Das Gantt-Diagramm wird nicht korrekt angezeigt

Wenn das Gantt-Diagramm nicht korrekt auf der Seite dargestellt wird, überprüfen Sie bitte das CSS-Style für den Container des Diagramms - dieser muss eine gültige Größe in Pixeln oder Prozent haben.


- Wenn die Größe in Prozent definiert ist - stellen Sie sicher, dass auch der übergeordnete Container eine Höhe besitzt.
- Wenn das Gantt-Diagramm direkt im body platziert wurde - fügen Sie folgenden CSS-Style hinzu, um eine prozentbasierte Höhe korrekt zu verwenden:

~~~js
html, body{
    margin:0px;
    padding:0px;
    height:100%; /*obligatorisch*/
    overflow:hidden;
}
~~~


## Das Gantt-Diagramm wird im Internet Explorer nicht korrekt angezeigt

Wenn das Gantt-Diagramm nur im Internet Explorer nicht korrekt dargestellt wird, stellen Sie bitte sicher, dass Ihre Seite eine vollständige DOCTYPE-Deklaration verwendet.
dhtmlxGantt funktioniert korrekt im Standardmodus von IE6, IE7 und IE8, ist jedoch nicht für den Einsatz im Quirks-Modus von IE vorgesehen.

Zum Beispiel, der HTML5 DOCTYPE ist:

~~~html
<!DOCTYPE html>
~~~

## Eine Fehlermeldung erscheint oben rechts

![error_alert](/img/error_alert.png)

Zuerst müssen Sie feststellen, was den Fehler verursacht.

Die Meldungen erscheinen, wenn die Komponente nicht korrekt arbeiten kann.
Sie deuten in der Regel auf ein tatsächliches Problem mit den Daten oder der Anwendungslogik hin. Das bloße Ausblenden der Meldungen kaschiert das Problem nur, das an anderer Stelle erneut auftreten kann.

Sie möchten diese Meldungen jedoch eventuell deaktivieren, bevor Sie Ihre Anwendung an Endnutzer ausliefern. In diesem Fall können Sie die [show_errors](api/config/show_errors.md)-Konfiguration verwenden:

~~~js
gantt.config.show_errors = false;
~~~


## Gantt zeigt nichts an

Es gibt zwei offensichtliche Szenarien:

1. Sie versuchen, die Backend-API entweder manuell oder nach unseren [Anleitungen](integrations/howtostart-guides.md) zu implementieren, aber Gantt zeigt beim Öffnen der Seite keine Aufgaben oder Verknüpfungen an.

oder

2. Sie haben Probleme beim Speichern von Änderungen im Backend.

Lesen Sie den Artikel [Fehlerbehebung bei Backend-Integrationsproblemen](guides/troubleshooting.md), der Anweisungen zur Identifizierung der Ursachen gibt.

## Wie man den letzten Tag einer Aufgabe in die Dauer einbezieht

Sie werden feststellen, dass wenn das Datum in Tagen ohne Stunden-Minuten-Teil angegeben ist und Start- und Enddatum gleich sind, die Dauer der Aufgabe als 0 Tage und nicht als 1 Tag berechnet wird.

Ein weiteres Beispiel: Start- und Enddatum sind "01-12-2021" und "05-12-2021". Man könnte meinen, dass die Aufgabe 5 Tage dauert (vom 1. bis 5. Dezember). Das Gantt-Diagramm berechnet jedoch eine Dauer von 4 Tagen.

~~~js
gantt.parse({ tasks: [
    { 
        id: 1,
        text: "Task 1",
        start_date: "01-12-2021",
        end_date: "05-12-2021"
    }
]}, links:[]);

console.log(gantt.getTask(1).end_date);
// 5 December 2021 00:00:00

console.log(gantt.getTask(1).duration);
// 4
~~~

Standardmäßig wird der letzte Tag der Aufgabe bei der Berechnung der Dauer ausgeschlossen, aber es besteht die Möglichkeit, das Standardverhalten zu ändern und den letzten Tag einzubeziehen. Weitere Details finden Sie im Artikel [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates).

## Fehler zyklischer Referenz

Wenn Sie fehlerhafte Daten an Gantt übergeben, wird die baumartige Struktur zyklisch, was zu einem Fehler durch zyklische Referenz führt.

![cyclic_error](/img/cyclic_error.png)

Zum Beispiel kann dieser Fehler in folgenden Fällen auftreten:

- Wenn die ID des übergeordneten Elements einer Aufgabe mit der ID der Aufgabe übereinstimmt:

![equal_ids](/img/equal_ids.png)

Aufgabe #2 kann nicht ihr eigenes übergeordnetes Element sein.

- Wenn eines der Kinder einer Aufgabe zu ihrem übergeordneten Element wird:

![parent_child_error](/img/parent_child_error.png)

"Task #4" ist als übergeordnetes Element für "Task #1" angegeben. Gleichzeitig ist "Task #4" aber auch ein Kind von "Task #1".

## Evaluierungszeitraum ist abgelaufen

Wenn Sie eine lizenzierte PRO-Version des Gantt-Diagramms installiert haben, aber dennoch die Meldung sehen, dass der Evaluierungszeitraum abgelaufen ist, bedeutet dies, dass sich irgendwo in Ihrer Anwendung noch die Trial-Version befindet. Nur die Trial-Version besitzt die Funktion, das Popup zur abgelaufenen Testphase anzuzeigen.

Stellen Sie daher sicher, dass Sie alle Dateien des Trial-Pakets des Gantt-Diagramms vollständig entfernen, bevor Sie die PRO-Version installieren. Weitere Informationen finden Sie im Abschnitt [Adding PRO Edition into Project](guides/installation.md#addingproeditionintoproject).

**Tipp:** Um zu prüfen, welche Datei eingebunden ist, können Sie *gantt.license* in der Webkonsole eingeben.

