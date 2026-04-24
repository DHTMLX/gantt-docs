--- 
title: "PDF-Exportmodul" 
sidebar_label: "PDF-Exportmodul" 
---

# PDF-Exportmodul

Dieses Exportmodul kann Daten in PDF-, PNG-, Excel- und iCal-Dateien exportieren. Es kann auf jeder Plattform als Node.js-Anwendung oder als Docker-Image installiert werden.

Es enthält keine Import-/Export-Funktionalität für MS Project- und Primavera-Dateien. Falls Sie eine solche Funktionalität benötigen, sollten Sie das entsprechende Exportmodul [das entsprechende Exportmodul](guides/msp-export-module.md) oder unseren Online-Server verwenden.

## Installationsanleitung

Zunächst müssen Sie Node.js herunterladen und installieren. Die Installationsanleitung finden Sie [auf deren Website](https://nodejs.org/en/).

Sie können das Exportmodul im Client-Bereich im Download-Tab herunterladen. Siehe unten das Bild:

![PDF-Exportmodul herunterladen](/img/pdf_export_module_download.png)

Nachdem Sie diese Datei heruntergeladen haben, entpacken Sie sie an einem beliebigen Ort, öffnen Sie dann die Befehlszeile und wechseln Sie zum Ordner des Exportmoduls. Zum Beispiel:

~~~
cd C:export_module
~~~

Dann müssen Sie die Module der Anwendung installieren:

~~~
npm install
~~~

Sie können [die Komponenten auf dem Computer ohne grafische Oberfläche installieren](#using-server-without-graphical-interface).

Um auf einem Server mit grafischer Oberfläche auszuführen, können Sie den folgenden Befehl verwenden, um das Exportmodul zu starten:

~~~
npm start
~~~

Um zu testen, wie es funktioniert, können Sie die folgende URL öffnen: **http://localhost:3200/test**.

Oder öffnen Sie die Hauptseite und klicken Sie auf den Link Test: **http://localhost:3200**.

## Verwendung des Servers ohne grafische Oberfläche

Wenn Sie das Exportmodul auf einem Headless-Server verwenden möchten, müssen Sie zusätzliche Komponenten installieren. Hier ist der Befehl für Debian-basierte Distributionen:

~~~
apt-get install -y xvfb libgtk2.0-0 libgtk-3-0 libgbm-dev 
libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth
~~~

Hier ist der Befehl für RPM-basierte Distributionen:

~~~
yum install -y xorg-x11-server-Xvfb gtk2-devel gtk3-devel 
libnotify-devel GConf2 nss libXScrnSaver alsa-lib
~~~

Dann müssen Sie es mit einem weiteren Befehl ausführen:

~~~
npm run start:docker
~~~

oder

~~~
xvfb-run node index.js
~~~

## Problemlösung

### Alte Node.js-Version

Das Exportmodul ist mit der Node.js-Version 12.03 und neuer kompatibel. Wenn Sie eine ältere Version haben, müssen Sie die ältere Version von Electron installieren:

~~~
npm install electron@6.1
~~~

### Export nach PDF endet nie

Wenn Sie Windows mit benutzerdefinierten DPI-Einstellungen oder Schriftarten verwenden, gibt es einen Fehler in der Electron-Komponente. Um ihn zum Laufen zu bringen, müssen Sie eine frühere Version installieren:

~~~
npm install electron@6.1
~~~

### Export nach PDF/PNG funktioniert nicht auf Mac M1

Die derzeit verwendete Electron-Version hat keine Builds für die Darwin-ARM64-Architektur. Als Workaround können Sie versuchen, Electron 11 zu installieren.

~~~
npm install electron@11
~~~

Die grundlegende Exportfunktionalität sollte funktionieren, aber wir haben nicht geprüft, ob alle Funktionen mit dieser Version korrekt funktionieren:

### Export nach PDF funktioniert nicht

Es kann verschiedene Gründe dafür geben. Prüfen Sie die Fehlermeldungen.

Wenn Sie eine der folgenden Fehlermeldungen erhalten:

* Failed to get crash dump id
* Electron crashed!

wahrscheinlich bedeutet dies, dass das Exportmodul auf einem headless-Server läuft. Sie müssen die notwendigen Komponenten installieren, um PDF- und PNG-Export zu verwenden. Oder Sie können ein Docker-Image erstellen.

### Verwendung eines Docker-Images

Builden Sie das Docker-Image mit dem folgenden Befehl:

~~~
docker build -t dhtmlx/scheduler-gantt-export ./
~~~

Führen Sie das Docker-Image mit dem folgenden Befehl aus:

~~~
docker run -d -p 3200:80 dhtmlx/scheduler-gantt-export
~~~

3200 ist der Port, auf dem der Docker-Dienst läuft.