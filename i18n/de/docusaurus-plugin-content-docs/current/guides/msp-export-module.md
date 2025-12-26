---
title: "Exportmodul für MS Project"
sidebar_label: "Exportmodul für MS Project"
---

# Exportmodul für MS Project

Dieses Exportmodul ermöglicht das Importieren und Exportieren von MS Project- und Primavera-Dateien. Es handelt sich um eine .NET Core-Anwendung, die entweder in der dotnet-Umgebung oder in einem Docker-Image ausgeführt werden kann.

Der Import/Export von PDF-, PNG-, Excel- oder iCal-Dateien wird nicht unterstützt. Für diese Formate verwenden Sie bitte das [entsprechende Exportmodul](guides/pdf-export-module.md) oder unseren Online-Server.

## Installationsanleitung

Bevor Sie die Anwendung ausführen, stellen Sie sicher, dass die [.NET Core 7-Umgebung](https://learn.microsoft.com/en-us/dotnet/core/install/) installiert ist. Nach der Einrichtung können Sie das MSP-Exportmodul im Kundenbereich unter dem Tab "Downloads" herunterladen. Hier ein Screenshot zur Orientierung:

![MS export module download](/img/msp_export_module_download.png)

Es gibt zwei Möglichkeiten, den Quellcode auszuführen:

1. Ausführen über Visual Studio (nur Windows)

Diese Methode erfordert Visual Studio 2022, da frühere Versionen .NET Core 7 nicht unterstützen. Nach dem Öffnen der Anwendung klicken Sie mit der rechten Maustaste auf die Solution im rechten Bereich und wählen Sie "Restore NuGet packages". Danach können Sie entweder die `http`- oder `https`-Version ausführen.

2. Ausführen über die Befehlszeile

Diese Methode funktioniert sowohl unter Windows als auch unter Linux. Navigieren Sie in das Stammverzeichnis der Anwendung und führen Sie folgenden Befehl aus, um die Pakete zu installieren:

~~~
dotnet restore
~~~

Wechseln Sie anschließend in den Ordner "GanttToMSProject" und starten Sie die Anwendung mit folgendem Befehl:

~~~
dotnet run
~~~

Um die Anwendung bereitzustellen, verwenden Sie diesen Befehl:

~~~
dotnet publish -c Release -o published
~~~

## Testen des Exportmoduls

Es gibt zwei Möglichkeiten, das Exportmodul zu testen:

1. Über die Testseite:

- Öffnen Sie [https://export.dhtmlx.com/test](https://export.dhtmlx.com/test)
- Suchen Sie die Exportmodul-URL in der Befehlszeilenausgabe. Zum Beispiel:

~~~
Now listening on: http://localhost:5128
~~~

- Klicken Sie auf das erste Dropdown mit der URL und wählen Sie **custom**.
- Fügen Sie die Exportmodul-URL ein.

Nun können Sie Daten über die Buttons exportieren.

2. Über das Snippet:

- Öffnen Sie [https://snippet.dhtmlx.com/kf16k0if](https://snippet.dhtmlx.com/kf16k0if)

- Finden Sie die Exportmodul-URL in der Befehlszeilenausgabe, zum Beispiel:

~~~
Now listening on: http://localhost:5128
~~~

- Fügen Sie diese URL als server-Parameter in die Exportfunktion ein, beispielsweise so:

~~~
gantt.exportToMSProject({
    server: "http://localhost:5128",
});
~~~

Nun funktioniert das Exportieren von Daten über den Button.

## Problemlösung

### Export zu PDF/PNG/Excel funktioniert nicht

Das MSP-Exportmodul unterstützt nur die Methoden `gantt.exportToMSProject` und `exportToPrimaveraP6`. Es funktioniert nicht mit Aufrufen wie:

~~~
gantt.exportToPDF({server:"gantt-to-msproject-url"});
~~~

Wenn Sie außerdem `gantt.exportToMSProject()` ohne Parameter aufrufen, wird standardmäßig unser Online-Service unter `export.dhtmlx.com` verwendet.

### Export von MPP-Dateien

Das MSP-Exportmodul und der Server basieren auf der MPXJ-Bibliothek für den Import und Export von MSP- und Primavera-Dateien. Der Export von MPP-Dateien wird derzeit nicht unterstützt, aber sowohl XML- als auch MPP-Dateien können importiert werden. Weitere Informationen finden Sie [hier](https://www.mpxj.org/faq/).

### Import großer Dateien

Um große Dateien zu importieren, müssen Größenbeschränkungen für Anfragen entfernt werden. Öffnen Sie die Datei `GanttToMSProject/Controllers/MspConversionController.cs` und kommentieren Sie das Attribut `DisableRequestSizeLimit` sowie die folgende Zeile ein.

Nach dem Speichern und Neustarten des Servers sollte der Import großer Dateien funktionieren. Tests zeigen, dass der Import einer 244 MB großen Datei bis zu 4 GB RAM benötigen kann.

### Verwendung eines Docker-Images

Um das Docker-Image zu erstellen, führen Sie folgenden Befehl aus:

~~~
docker build -t msp_export_module 
~~~

Zum Testen starten Sie das Docker-Image mit:

~~~
docker run -p 65163:80 msp_export_module 
~~~

Sie können den Container mit `Ctrl+C` stoppen.

Wenn Sie das Docker-Image im Hintergrund ausführen möchten, verwenden Sie:

~~~
docker run -p 65163:80 msp_export_module 
~~~
