---
title: "Exportmodul für PDF"
sidebar_label: "Exportmodul für PDF"
---

# Exportmodul für PDF


Dieses Exportmodul ermöglicht das Exportieren von Daten in PDF-, PNG-, Excel- und iCal-Formate. Es kann auf jeder Plattform entweder als Node.js-Anwendung oder über ein Docker-Image eingerichtet werden.

Bitte beachten Sie, dass kein Import/Export für MS Project- und Primavera-Dateien unterstützt wird. Für diese sollten Sie das [dedizierte Exportmodul](guides/msp-export-module.md) oder unseren Online-Service verwenden.

## Installationsanleitung

Um zu beginnen, laden Sie Node.js herunter und installieren Sie es gemäß den Anweisungen [auf der offiziellen Website](https://nodejs.org/en/).

Das Exportmodul finden Sie im Kundenbereich unter dem Reiter Downloads. Hier ein Beispiel:

![PDF export module download](/img/pdf_export_module_download.png)

Nach dem Herunterladen entpacken Sie die Datei an einen gewünschten Ort. Öffnen Sie dann die Kommandozeile und navigieren Sie in den Ordner des Exportmoduls, zum Beispiel:

~~~
cd C:export_module
~~~

Installieren Sie anschließend die erforderlichen Anwendungsmodule:

~~~
npm install
~~~

Wenn Sie die [Komponenten auf einer Maschine ohne grafische Oberfläche installieren möchten](#usingserverwithoutgraphicalinterface), folgen Sie dem entsprechenden Abschnitt unten.

Um das Exportmodul auf einem Server mit grafischer Oberfläche zu starten, verwenden Sie diesen Befehl:

~~~
npm start
~~~

Um zu überprüfen, ob das Modul läuft, öffnen Sie die URL: [http://localhost:3200/test](http://localhost:3200/test).

Alternativ können Sie die Hauptseite unter [http://localhost:3200](http://localhost:3200) öffnen und auf den Link Test klicken.

## Nutzung des Servers ohne grafische Oberfläche

Für den Betrieb des Exportmoduls auf einem Headless-Server sind zusätzliche Komponenten erforderlich. Auf Debian-basierten Distributionen verwenden Sie diesen Befehl:

~~~
apt-get install -y xvfb libgtk2.0-0 libgtk-3-0 libgbm-dev 
libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth
~~~

Auf RPM-basierten Distributionen führen Sie aus:

~~~
yum install -y xorg-x11-server-Xvfb gtk2-devel gtk3-devel 
libnotify-devel GConf2 nss libXScrnSaver alsa-lib
~~~

Danach starten Sie das Modul mit einem der folgenden Befehle:

~~~
npm run start:docker
~~~

oder

~~~
xvfb-run node index.js
~~~

## Problemlösungen

### Alte Node.js-Version

Das Exportmodul funktioniert mit Node.js Version 12.03 und höher. Wenn Sie eine ältere Version verwenden, installieren Sie eine frühere Electron-Version:

~~~
npm install electron@6.1
~~~

### Export zu PDF endet nie

Auf Windows-Systemen mit benutzerdefinierten DPI-Einstellungen oder Schriftarten gibt es einen bekannten Electron-Bug. Um dies zu beheben, installieren Sie die ältere Electron-Version:

~~~
npm install electron@6.1
~~~

### Export zu PDF/PNG funktioniert nicht auf Mac M1

Die aktuell verwendete Electron-Version unterstützt keine Darwin-ARM64-Builds. Als Workaround versuchen Sie, Electron 11 zu installieren:

~~~
npm install electron@11
~~~

Grundlegende Exportfunktionen sollten funktionieren, jedoch wurden nicht alle Fähigkeiten mit dieser Version getestet.

### Export zu PDF funktioniert nicht

Es gibt mehrere mögliche Ursachen. Überprüfen Sie die Fehlermeldungen sorgfältig.

Wenn Sie Fehler wie diese sehen:

* Failed to get crash dump id

* Electron crashed!

bedeutet dies meist, dass das Exportmodul auf einem Headless-Server läuft. In diesem Fall müssen Sie 
[die erforderlichen Komponenten für den PDF- und PNG-Export installieren](#usingserverwithoutgraphicalinterface) oder ein Docker-Image verwenden.

### Verwendung eines Docker-Images

Erstellen Sie das Docker-Image mit folgendem Befehl:

~~~
docker build -t dhtmlx/scheduler-gantt-export ./
~~~

Starten Sie den Docker-Container mit:

~~~
docker run -d -p 3200:80 dhtmlx/scheduler-gantt-export
~~~

Hierbei ist 3200 der Port, unter dem der Docker-Service erreichbar ist.
