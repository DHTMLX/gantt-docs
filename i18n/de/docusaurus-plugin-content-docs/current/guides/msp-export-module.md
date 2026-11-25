---
title: "Export-Modul für MS Project und Primavera P6"
sidebar_label: "MS Project/P6-Modul"
---

# Export-Modul für MS Project und Primavera P6

Dieses Exportmodul kann MS-Project- und Primavera-Dateien importieren/exportieren. Es handelt sich um eine .NET Core-Anwendung, die Sie in der dotnet-Umgebung oder im Docker-Image ausführen können.

Es enthält nicht die Import-/Export-Funktionalität für PDF-, PNG-, Excel- und iCal-Dateien. Wenn Sie eine solche Funktionalität benötigen, sollten Sie das [entsprechendes Exportmodul](guides/pdf-export-module.md) oder unseren Online-Server verwenden.

## Installationsanleitung

Sie müssen die [.NET Core 7-Umgebung](https://learn.microsoft.com/en-us/dotnet/core/install/) installieren, bevor Sie die Anwendung ausführen. Sobald Sie bereit sind, können Sie das MS-Project-Exportmodul im Client-Bereich auf der Registerkarte Downloads herunterladen. Siehe unten das Bild:

![MS-Exportmodul herunterladen](/img/msp_export_module_download.png)

Es gibt zwei Möglichkeiten, den Quellcode auszuführen:

1. Ausführen über Visual Studio (Nur Windows)

Für diesen Ansatz benötigen Sie Visual Studio 2022, da frühere Versionen .NET Core 7 nicht unterstützen. Wenn Sie die Anwendung öffnen, müssen Sie im rechten Bereich mit der rechten Maustaste auf die Lösung klicken und auf die Schaltfläche NuGet-Pakete wiederherstellen klicken. Danach können Sie die `http`- oder `https`-Versionen ausführen.

2. Ausführen über die Befehlszeile

Dieser Ansatz funktioniert sowohl unter Windows als auch unter Linux auf die gleiche Weise. Sie müssen zum Stammordner der Anwendung navigieren und den folgenden Befehl ausführen, um die Pakete zu installieren:

~~~
dotnet restore
~~~

Anschließend müssen Sie zum Ordner "GanttToMSProject" navigieren und den folgenden Befehl ausführen, um die Anwendung zu starten:

~~~
dotnet run
~~~

Sie können den folgenden Befehl verwenden, um die Anwendung zu veröffentlichen:

~~~
dotnet publish -c Release -o published
~~~

## Testen des Exportmoduls

Es gibt zwei Möglichkeiten, zu testen, wie das Exportmodul funktioniert.

1. Über die Testseite:

- Öffnen Sie die folgende URL: [https://export.dhtmlx.com/test](https://export.dhtmlx.com/test)
- Finden Sie die URL des Exportmoduls in der Befehlszeilenausgabe. Zum Beispiel:

~~~
Now listening on: http://localhost:5128
~~~

- Wählen Sie im ersten Dropdown mit der URL **custom**.
- Fügen Sie die URL des Exportmoduls ein.

Jetzt können Sie Daten mit den Schaltflächen exportieren.

2. Über das Snippet:

- Öffnen Sie die folgende URL: [https://snippet.dhtmlx.com/kf16k0if](https://snippet.dhtmlx.com/kf16k0if)

- Finden Sie die URL des Exportmoduls in der Befehlszeilenausgabe. Zum Beispiel:

~~~
Now listening on: http://localhost:5128
~~~

- Fügen Sie die URL dem Server-Parameter der Exportfunktion hinzu, zum Beispiel:

~~~
gantt.exportToMSProject({
    server: "http://localhost:5128",
});
~~~

Jetzt können Sie Daten mit der Schaltfläche exportieren.

## Problemlösung

### Export nach PDF/PNG/Excel funktioniert nicht

Das MS-Project-Exportmodul funktioniert nur mit den Methoden gantt.exportToMSProject(), gantt.importFromMSProject(), gantt.exportToPrimaveraP6() und gantt.importFromPrimaveraP6(). Es exportiert nicht nach PDF, PNG, Excel oder iCal, d. h. es funktioniert nicht, wenn Sie

~~~
gantt.exportToPDF({server:"gantt-to-msproject-url"});
~~~

aufrufen.

Beachten Sie außerdem, dass wenn Sie `gantt.exportToMSProject()` ohne Parameter aufrufen, es standardmäßig unseren Online-Service unter `export.dhtmlx.com` aufruft. Siehe [Zusammenspiel der beiden Module](guides/export-modules.md#service-topology).

### Export von MPP-Dateien

Das MS-Project-Exportmodul und der Export-Server verwenden die MPXJ-Bibliothek zum Importieren und Exportieren von MS-Project- und Primavera-Dateien. Leider gibt es keine Möglichkeit, MPP-Dateien zu exportieren, aber Sie können [sowohl XML- als auch MPP-Dateien importieren](https://www.mpxj.org/faq/).

Auch wenn ein direkter Export nach MPP nicht unterstützt wird, können Sie die in Gantt vorgenommenen Änderungen dennoch zurück in MS Project übernehmen. Ein typischer Round-Trip-Workflow sieht so aus:

1. Ein Benutzer erstellt oder bearbeitet ein Projekt in MS Project und speichert die Datei (als MPP oder XML).
2. Die Datei wird [in Gantt importiert](guides/export-msproject.md#import-from-ms-project), wo die Daten angezeigt oder geändert werden können.
3. Die Gantt-Daten werden [in eine XML-Projektdatei exportiert](guides/export-msproject.md#export-to-ms-project).
4. Die resultierende XML-Datei wird zurück in die ursprüngliche Datei in MS Project importiert:
    - Wenn in Gantt keine Aufgaben gelöscht wurden, importieren Sie die XML-Datei mit der Option **Merge** (siehe Screenshot unten). Die vorhandenen Aufgaben werden aktualisiert, die neuen werden hinzugefügt.

    ![MS Project import wizard - Merge option](/img/msp_import_merge.png)

    - Wenn in Gantt einige Aufgaben gelöscht wurden, werden sie beim Import nicht automatisch entfernt, da MS Project beim Zusammenführen Aufgaben nur aktualisiert und hinzufügt. Wählen Sie in diesem Fall zuerst die entsprechenden Aufgaben in MS Project aus und löschen Sie sie manuell, und importieren Sie dann die XML-Datei entweder mit der Option **Append** oder mit der Option **Merge** (die Option **Append** ist unten dargestellt).

    ![MS Project import wizard - Append option](/img/msp_import_append.png)

Standardmäßig importiert und exportiert Gantt nur den Standardsatz von Aufgaben-/Projekteigenschaften. Um zusätzliche Eigenschaften durch den Round-Trip zu übertragen, siehe [Abfragen von Aufgaben-Eigenschaften](guides/export-msproject.md#getting-tasks-properties) für den Import und das Objekt `tasks`, das in den [Export-Einstellungen](guides/export-msproject.md#export-settings) beschrieben ist, für den Export.

### Import großer Dateien {#import-of-large-files}

Wenn Sie große Dateien importieren möchten, müssen Sie die Beschränkungen der Anfragen-Größe entfernen. Dazu müssen Sie die Datei `GanttToMSProject/Controllers/MspConversionController.cs` öffnen. Dort müssen Sie `DisableRequestSizeLimit` und die darauf folgende Zeile auskommentieren.

Nach dem Speichern der Änderungen und dem Neustart des Servers sollten Sie in der Lage sein, große Dateien zu importieren. Es wurde getestet, dass das Importieren einer 244Mb-Datei bis zu 4Gb RAM und das Importieren einer 400Mb-Datei etwa 4,7Gb RAM erfordert.

### Verwendung eines Docker-Images

Um ein Docker-Image zu erstellen, führen Sie folgenden Befehl aus:

~~~
docker build -t msp_export_module .
~~~

Um das Docker-Image zu Testzwecken auszuführen, können Sie folgenden Befehl verwenden:

~~~
docker run -p 8080:8080 msp_export_module 
~~~

Sie können den Container mit der Tastenkombination Ctrl+C stoppen.

Wenn Sie das Docker-Image im "detached" Modus ausführen, läuft es im Hintergrund:

~~~
docker run -d -p 8080:8080 msp_export_module 
~~~