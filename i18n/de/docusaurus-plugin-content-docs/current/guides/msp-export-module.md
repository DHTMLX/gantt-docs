---
title: "Export-Modul für MS Project"
sidebar_label: "Export-Modul für MS Project"
---

# Export-Modul für MS Project

Dieses Exportmodul kann MS-Project- und Primavera-Dateien importieren/exportieren. Es handelt sich um eine .NET Core-Anwendung, die Sie in der dotnet-Umgebung oder im Docker-Image ausführen können.

Es enthält nicht die Import-/Export-Funktionalität für PDF-, PNG-, Excel- und iCal-Dateien. Wenn Sie eine solche Funktionalität benötigen, sollten Sie das [entsprechendes Exportmodul](guides/pdf-export-module.md) oder unseren Online-Server verwenden.

## Installationsanleitung

Sie müssen die [.NET Core 7-Umgebung](https://learn.microsoft.com/en-us/dotnet/core/install/) installieren, bevor Sie die Anwendung ausführen. Sobald Sie bereit sind, können Sie das MSP-Exportmodul im Client-Bereich auf der Registerkarte Downloads herunterladen. Siehe unten das Bild:

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

Das MSP-Exportmodul funktioniert nicht für Methoden außerhalb von gantt.exportToMSProject/exportToPrimaveraP6, d. h. es funktioniert nicht, wenn Sie

~~~
gantt.exportToPDF({server:"gantt-to-msproject-url"});
~~~

aufrufen.

Beachten Sie außerdem, dass wenn Sie `gantt.exportToMSProject()` ohne Parameter aufrufen, es standardmäßig unseren Online-Service unter `export.dhtmlx.com` aufruft.

### Export von MPP-Dateien

Das MSP-Exportmodul und der Export-Server verwenden die MPXJ-Bibliothek zum Importieren und Exportieren von MSP- und Primavera-Dateien. Leider gibt es keine Möglichkeit, MPP-Dateien zu exportieren, aber Sie können [sowohl XML- als auch MPP-Dateien importieren](https://www.mpxj.org/faq/).

### Import großer Dateien

Wenn Sie große Dateien importieren möchten, müssen Sie die Beschränkungen der Anfragen-Größe entfernen. Dazu müssen Sie die Datei `GanttToMSProject/Controllers/MspConversionController.cs` öffnen. Dort müssen Sie `DisableRequestSizeLimit` und die darauf folgende Zeile auskommentieren.

Nach dem Speichern der Änderungen und dem Neustart des Servers sollten Sie in der Lage sein, große Dateien zu importieren. Es wurde getestet, dass das Importieren einer 244Mb-Datei bis zu 4Gb RAM erfordert.

### Verwendung eines Docker-Images

Um ein Docker-Image zu erstellen, führen Sie folgenden Befehl aus:

~~~
docker build -t msp_export_module 
~~~

Um das Docker-Image zu Testzwecken auszuführen, können Sie folgenden Befehl verwenden:

~~~
docker run -p 65163:80 msp_export_module 
~~~

Sie können den Container mit der Tastenkombination Ctrl+C stoppen.

Wenn Sie das Docker-Image im "detached" Modus ausführen, läuft es im Hintergrund:

~~~
docker run -p 65163:80 msp_export_module 
~~~