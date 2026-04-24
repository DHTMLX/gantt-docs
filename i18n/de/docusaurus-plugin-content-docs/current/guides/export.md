---
title: "Export nach PDF und PNG"
sidebar_label: "Export nach PDF und PNG"
---

# Export nach PDF und PNG

dhtmlxGantt bietet einen Online-Exportdienst an, der es Ihnen ermöglicht, das Gantt-Diagramm in das [PDF](guides/export.md#export-to-pdf) oder
[PNG](guides/export.md#export-to-png) Format zu exportieren.

:::note
Der Dienst ist kostenlos, aber die exportierte PDF-/PNG-Datei enthält unter der GPL-Lizenz das Wasserzeichen der Bibliothek. 
Wenn Sie eine Lizenz erwerben, ist das Exportergebnis während der gültigen Support-Periode (12 Monate für alle PRO-Lizenzen) wasserzeichenfrei verfügbar.
:::

Es gibt mehrere Exportdienste. Sie können sie lokal auf Ihrem Computer installieren und das Gantt-Diagramm lokal nach PDF oder PNG exportieren.
Beachten Sie, dass Exportdienste nicht im Gantt-Paket enthalten sind;
lesen Sie den [entsprechenden Artikel](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml), um die Nutzungsbedingungen jedes einzelnen Dienstes zu erfahren.

## Einschränkungen des Online-Exportdienstes

:::note
Der Exportdienst unterliegt zeitlichen Beschränkungen sowie Beschränkungen der Anfragedatenmenge.
:::

### Zeitlimits

Wenn der Prozess länger als 20 Sekunden dauert, wird der Export abgebrochen und Folgendes tritt ein:

~~~html
Error: Timeout trigger 20 seconds
~~~

Wenn mehrere Personen das Gantt zum selben Zeitpunkt exportieren, kann der Prozess länger dauern als üblich. Das ist jedoch unproblematisch, da die Zeit, die für die Exportanfrage eines bestimmten Benutzers aufgewendet wird, separat gezählt wird.

### Beschränkungen der Anfragedatenmenge

Es gibt einen gemeinsamen API-Endpunkt `https://export.dhtmlx.com/gantt`, der für alle Exportmethoden (*exportToPDF*, *exportToPNG*, *exportToMSProject*, etc.) dient. **Maximale Anfragedatenmenge: 10 MB**.

Es gibt außerdem einen separaten API-Endpunkt `https://export.dhtmlx.com/gantt/project`, der speziell für die [MSProject](guides/export-msproject.md) und
[Primavera P6](guides/export-primavera.md)
Export/Import-Dienste (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* nur). **Maximale Anfragedatenmenge: 40 MB**.

## Verwendung der Exportmodule

:::note
Wenn Sie große Diagramme exportieren müssen, können Sie ein eigenständiges Exportmodul verwenden. 
Das Exportmodul ist kostenlos, falls Sie Gantt unter einer Commercial-, Enterprise- oder Ultimate-Lizenz erworben haben, oder Sie können das Modul separat erwerben.
:::

[Mehr zur Nutzung des Exportmoduls für PDF lesen](guides/pdf-export-module.md).

## Export nach PDF

Um das Gantt-Diagramm als PDF-Dokument zu exportieren, führen Sie die folgenden Schritte aus:

- Um die Export-/Import-Funktionalität zu verwenden, aktivieren Sie das <b>export_api</b>-Plugin über die [plugins](api/method/plugins.md)-Methode:

~~~js
gantt.plugins({
    export_api: true
});
~~~

Dadurch können Sie entweder den Online-Exportdienst oder ein lokales Exportmodul verwenden.

:::note
Wenn Sie eine Gantt-Version älter als 8.0 verwenden, müssen Sie die Datei `https://export.dhtmlx.com/gantt/api.js` in Ihre Seite einbinden, um die Exportfunktionalität zu aktivieren, z.B.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Rufen Sie die Methode [exportToPDF](api/method/exporttopdf.md) auf, um das Gantt-Diagramm zu exportieren:

~~~html
<input value="Export to PDF" type="button" onclick='gantt.exportToPDF()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


**Zugehöriges Beispiel**: [Export data from Gantt](https://docs.dhtmlx.com/gantt/samples/08_api/06_export.html)


## Export nach PNG

Um das Gantt-Diagramm als PNG-Bild zu exportieren, führen Sie die folgenden Schritte aus:

- Um den Online-Exportdienst zu verwenden, aktivieren Sie das <b>export_api</b>-Plugin über die [plugins](api/method/plugins.md)-Methode:

~~~js
gantt.plugins({
    export_api: true
});
~~~

:::note
Wenn Sie eine Gantt-Version älter als 8.0 verwenden, müssen Sie die Datei `https://export.dhtmlx.com/gantt/api.js` in Ihre Seite einbinden, um den Online-Exportdienst zu aktivieren, z.B.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Rufen Sie die Methode [exportToPNG](api/method/exporttopng.md) auf, um das Gantt-Diagramm zu exportieren:

~~~html
<input value="Export to PNG" type="button" onclick='gantt.exportToPNG()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


**Zugehöriges Beispiel**: [Export data from Gantt](https://docs.dhtmlx.com/gantt/samples/08_api/06_export.html)


## Parameter der Exportmethoden

Die Methoden [exportToPDF](api/method/exporttopdf.md) und [exportToPNG](api/method/exporttopng.md) nehmen als Parameter dasselbe Objekt mit einer Reihe von Eigenschaften (alle Eigenschaften sind optional):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) der Name der Ausgabedatei</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skin</b></td>
  <td>(<i>string</i>) der [Skin](guides/skins.md) des Ausgabegantt-Diagramms</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>locale</b></td>
  <td>(<i>string</i>) legt die Sprache fest, die im Ausgabegantt-Diagramm verwendet wird</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string</i>) legt das Startdatum des Datenbereichs fest, der im Ausgabegantt-Diagramm dargestellt wird. Das Datumsformat wird durch die [date_format](api/config/date_format.md) config festgelegt</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string</i>) legt das Enddatum des Datenbereichs fest, der im Ausgabegantt-Diagramm dargestellt wird. Das Datumsformat wird durch die [date_format](api/config/date_format.md) config festgelegt</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>data</b></td>
  <td>(<i>object</i>) legt eine benutzerdefinierte Datenquelle fest, die im Ausgabegantt-Diagramm dargestellt wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) gibt den Header an, der dem Ausgabebild hinzugefügt wird. Hinweis: Sie können hier beliebiges HTML verwenden</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) gibt den Footer an, der dem Ausgabebild hinzugefügt wird. Hinweis: Sie können hier beliebiges HTML verwenden</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) setzt den API-Endpunkt für die Anfrage. Kann mit der lokalen Installation des Exportdienstes verwendet werden. Der Standardwert ist <strong>https://export.dhtmlx.com/gantt</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>raw</b></td>
  <td>(<i>boolean</i>) definiert, dass alle Gantt-Markups exportiert werden, wie sie sind, mit allen benutzerdefinierten Elementen. <em>false</em> standardmäßig. <a href="#exportingcustommarkupandstyles">Details unten lesen</a></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>callback</b></td>
  <td>(<i>function</i>) Falls Sie eine URL zum Herunterladen einer generierten PDF/PNG-Datei erhalten möchten, kann die callback-Eigenschaft verwendet werden. Sie empfängt ein JSON-Objekt mit der url-Eigenschaft</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) ein Objekt mit zusätzlichen Einstellungen für die <b>exportToPDF()</b>-Methode. Das Objekt kann die folgenden Attribute enthalten: <ul> <li><b>format</b> - (<i>string</i>) das Ausgabeformat der Datei: <i>"A0", "A1", "A2", "A3", "A4", "A5", "A6", "Legal", "Ledger", "Letter", "Tabloid"</i></li> <li><b>landscape</b> - (<i>boolean</i>) Hoch- oder Querformat der Ausgabedatei. Das Attribut funktioniert nur, wenn das Attribut <i>format</i> angegeben ist.</li> <li><b>width</b> - (<i>string | number | "content"</i>) die Breite der Ausgabeseite. Das Attribut wird verwendet, wenn mehrere Seiten exportiert werden.</li> <li><b>height</b> - (<i>string | number | "content"</i>) die Höhe der Ausgabeseite. Das Attribut wird verwendet, wenn mehrere Seiten exportiert werden.</li> <li><b>merge_pages</b> - (<i>boolean</i>) aktiviert den [Multipage-Export](api/method/exporttopdf.md#multi-page-export) in einer Datei; wenn auf <i>false</i> gesetzt, müssen Sie mehrmals exportieren, um alle Gantt-Daten zu erhalten</li> <li><b>fixed_headers</b> - (<i>boolean</i>) aktiviert die Anzeige der Raster- und Zeitachsen-Header auf jeder Seite; standardmäßig <i>false</i>. Funktioniert nur zusammen mit der aktivierten <b>merge_pages</b>-Einstellung</li> <li><b>margins</b> - (<i>object</i>) das Objekt mit den oberen, unteren, linken und rechten Rändern der Ausgabedatei PDF. <a href="#margins-of-the-output-pdf-file">Details unten lesen</a></li> <li><b>header</b> - (<i>string</i>) gibt an, welcher Header jeder Seite der Ausgabedatei PDF hinzugefügt wird. <a href="#headerfooter-of-the-output-file">Details unten lesen</a></li> <li><b>footer</b> - (<i>string</i>) gibt an, welcher Footer jeder Seite der Ausgabedatei PDF hinzugefügt wird. <a href="#headerfooter-of-the-output-file">Details unten lesen</a></li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) ein Objekt mit zusätzlichen Einstellungen für die <b>exportToPNG()</b>-Methode. Das Objekt kann folgende Attribute enthalten: <ul> <li><b>width</b> - (<i>number|string</i>) die Breite der Ausgabeseite</li> <li><b>height</b> - (<i>number|string</i>) die Höhe der Ausgabeseite</li> Die <b>width</b>- und <b>height</b>-Parameter werden ignoriert, wenn <b>slice_archive</b> angegeben ist. <li><b>slice_archive</b> - (<i>boolean|object</i>) ermöglicht das Speichern großer Diagramme in Teilen und das Abrufen dieser Teile aus dem Archiv. Als Objekt übernimmt das Attribut die Optionen <b>width</b> und <b>height</b>. Falls die Stückgröße nicht definiert ist (d.h. <i>slice_archive: true</i>), gelten die Standardgrößen 1000×1000. </li> <li><b>slice_check</b> - (<i>boolean</i>) fügt dem Archiv eine HTML-Seite hinzu. Die Seite ermöglicht zu prüfen, ob alle Stücke korrekt exportiert wurden.</li> </ul></td>
  </tr>
  </tbody>
</table>


~~~js title="Aufruf der Exportmethoden mit optionalen Eigenschaften"
gantt.exportToPDF({
    name: "mygantt.pdf",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    locale: "en",
    start: "01-04-2026",
    end: "11-04-2026",
    skin: "terrace",
    data: {},
    server: "https://myapp.com/myexport/gantt",
    raw: true,
    callback: (res) => {
        alert(res.url);
    }
});

gantt.exportToPNG({
    name: "mygantt.png",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    locale: "en",
    start: "01-04-2026",
    end: "11-04-2026",
    skin: "terrace",
    data: {},
    server: "https://myapp.com/myexport/gantt",
    raw: true,
    callback: (res) => {
        alert(res.url);
    }
});
~~~

## Name der Ausgabedatei

Um einen benutzerdefinierten Namen für die Ausgabedatei festzulegen, verwenden Sie die **name**-Eigenschaft im Parameter der Methoden [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods):

~~~js
gantt.exportToPDF({
    name: "my_beautiful_gantt.pdf"
});
~~~

## Sprache der Ausgabedatei

Standardmäßig wird das Gantt-Diagramm in derselben Sprache exportiert, in der es auf der Seite gezeigt wird.

Um eine benutzerdefinierte Sprache für die Ausgabedatei festzulegen, verwenden Sie die **locale**-Eigenschaft im Parameter der Methoden [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods):

~~~js
gantt.exportToPDF({
    name: "mygantt.pdf",
    locale: "de"
});
~~~

## Daten zum Export

Um die Aufgaben festzulegen, die im Ausgabedokument (PDF oder PNG) angezeigt werden sollen, verwenden Sie eine der folgenden Methoden:

1. <a href="#daterange">Geben Sie den Datumsbereich der Ausgabedaten an.</a>
2. <a href="#customdata">Geben Sie eine benutzerdefinierte Datenquelle für den Export an.</a>

<a id="daterange"></a>

### Angabe des Datumsbereichs der Ausgabedaten

Um den Bereich der Aufgaben festzulegen, der im Ausgabedokument dargestellt wird, verwenden Sie die Eigenschaften **start** und **end** im Parameter der Methoden [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods):

~~~js
gantt.exportToPDF({
    name: "mygantt.pdf",
    start: "01-04-2026",
    end: "11-04-2026"
});
~~~

:::note
Hinweis: Das Datumsformat wird durch die date_format-Konfiguration festgelegt.
:::

### Festlegen einer benutzerdefinierten Datenquelle zum Export {#customdata}

Um das Gantt-Diagramm mit einem benutzerdefinierten Datenbestand zu exportieren (also nicht mit den Daten, die im ursprünglichen Gantt-Diagramm angezeigt werden), verwenden Sie die Eigenschaft **data** im Parameter der
[Methode exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods):

~~~js {2}
gantt.exportToPDF({
    data: {
        tasks: [
            { id: 1, text: "Project #1", start_date: "01-04-2026", duration: 18 },
            { id: 2, text: "Task #1", start_date: "02-04-2026", duration: 8, parent: 1 },
            { id: 3, text: "Task #2", start_date: "11-04-2026", duration: 8, parent: 1 }
        ],
        links: [
            { id: 1, source: 1, target: 2, type: "1" },
            { id: 2, source: 2, target: 3, type: "0" },
            { id: 3, source: 3, target: 4, type: "0" },
            { id: 4, source: 2, target: 5, type: "2" }
        ]
    }
});
~~~

:::note
Hinweis: Sie können keinen URL-Wert für den Parameter **data** angeben, es muss sich um ein Datenobjekt handeln.
:::

## Skin des Ausgabegantt-Diagramms

Standardmäßig wird das Gantt-Diagramm mit dem gleichen Skin exportiert, wie es auf der Seite angezeigt wird.

Um einen anderen Skin für die Ausgabedatei PNG oder PDF festzulegen, verwenden Sie die Eigenschaft **skin** im Parameter der Methoden [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods):

~~~js
gantt.exportToPDF({
    name: "mygantt.pdf",
    skin: "material"
});
~~~

[Checken Sie die vollständige Liste der verfügbaren Gantt-Skins](guides/skins.md).


## Kopf-/Fußzeile der Ausgabedatei

Um eine Kopf-/Fußzeile zur Ausgabedatei (PNG oder PDF) hinzuzufügen, verwenden Sie die Eigenschaften **header**/**footer** im Parameter der Methoden [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods):

:::note
Hinweis: Beim Festlegen der Parameter können Sie beliebiges HTML verwenden. Beim Einbinden von Bildern beachten Sie, dass globale Pfade als Werte des "src"-Attributs gesetzt werden müssen.
:::

~~~js
gantt.exportToPDF({
    name: "mygantt.pdf",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>"
});
~~~

### Header/Footer für jede Seite der Ausgabedatei PDF {#headerfooterforeachpage}

Um eine Kopf-/Fußzeile für jede Seite der Ausgabedatei PDF hinzuzufügen, verwenden Sie die Eigenschaften header/footer im **additional_settings**-Objekt der `exportToPDF`-Methode.

Sie können die Nummer der aktuellen Seite durch das Element mit `class="pageNumber"` und die Gesamtseitenzahl durch das Element mit `class="totalPages"` in den Eigenschaften header/footer angeben:

~~~js
gantt.exportToPDF({
    additional_settings: {
        format: "A4",
        // korrekte Ränder sind zwingend erforderlich, damit Kopf-/Fußzeilen gerendert werden
        margins: {
            top: 10,
            bottom: 10,
            left: 0.1,
            right: 1
        },
        header: "Jede Seitenkopfzeile",
        footer: 'Seite: <span class="pageNumber"></span>/<span class="totalPages"></span>'
    }
});
~~~

Beachten Sie, dass diese Einstellungen nur funktionieren, wenn auch **margins** angegeben sind und genügend Platz vorhanden ist, um Kopf-/Fußzeilen korrekt anzuzeigen. Andernfalls werden Kopfzeilen/Fußzeilen außerhalb des Gantt gerendert. Es wird empfohlen, als Minimalrand 10 zu verwenden, damit lediglich Textzeilen dargestellt werden können.

## Ränder der Ausgabedatei PDF

Um Randabstände zur Ausgabedatei PDF hinzuzufügen, verwenden Sie die Eigenschaft **margins** im **additional_settings**-Objekt der
[Methode exportToPDF](guides/export.md#parameters-of-the-export-methods). Die Eigenschaft margins funktioniert sowohl für den einseitigen Export als auch
[mehrseitiger Export](api/method/exporttopdf.md#multi-page-export).

Die Werte der Rand-Einstellungen werden als Zahlen angegeben:

~~~js
gantt.exportToPDF({
    additional_settings: {
        margins: {
            top: 5,
            bottom: 10,
            left: 2,
            right: 2
        },
    },
});
~~~

Wenn einige der Rand-Einstellungen nicht angegeben sind, werden sie ignoriert.

Die Werte werden standardmäßig in Millimetern angegeben, aber Sie können die Randwerte auch in Zoll festlegen, indem Sie die Eigenschaft <b>unit: "inch"</b> setzen:

~~~js {8}
gantt.exportToPDF({
    additional_settings: {
        margins: {
            top: 5,
            bottom: 10,
            left: 2,
            right: 2,
            unit: "inch"
        },
    },
});
~~~

## Benutzerdefinierter Stil für die Ausgabedatei {#customstylefortheoutputfile}

Um einen benutzerdefinierten Stil für das Gantt zu verwenden, liefern Sie das Stylesheet mit Ihren eigenen CSS-Klassen:

- über einen Link:

~~~js
gantt.exportToPDF({
    name: "calendar.pdf",
    header: '<link rel="stylesheet" href="http://mysite.com/custom.css">'
});
~~~

- oder über das 'style'-Tag:

~~~js
gantt.exportToPDF({
    name: "calendar.pdf",
    header: '<style>... benutzerdefinierte CSS-Klassen hier ...</style>'
});
~~~


Hinweis: Die oben genannte Lösung funktioniert für die globale HTTP-Referenz. Wenn Sie CSS-Klassen in einer Intranet-/Lokalen-Umgebung verwenden, können Sie alle Stile wie folgt einbetten:

~~~js
gantt.exportToPDF({
    header: "<style>.tier1{background: red; color:white;}</style>"
});
~~~

:::note
Für weitere Beispiele lesen Sie den Artikel How to add resource chart or custom styles in the exported PDF file](guides/how-to.md#how-to-add-resource-chart-or-custom-styles-in-the-exported-pdf-file).
:::

### Sammeln aller Stile für die Exportfunktion

Manchmal sind Stile in verschiedenen Dateien definiert, die öffentlich nicht zugänglich sind, und es ist umständlich, Stile von jeder einzelnen Datei einzeln zu importieren. Es gibt eine Möglichkeit, alle Stile für den Export zusammenzufassen.

Alle Stile werden im Objekt **document.styleSheets** auf einer HTML-Seite gespeichert. Wird das gleiche Site-Element (style/link) verwendet, können Sie alle Stile sammeln und dann im **header** angeben. Unten sehen Sie ein Beispiel:

~~~js
const styles = [];

for (const styleSheet of document.styleSheets) {
    try {
        const rules = styleSheet.cssRules;

        for (const rule of rules) {
            styles.push(rule.cssText);
        }
    } catch (error) {
        // Stile, die nicht gelesen werden können, ignorieren
    }
}

gantt.exportToPDF({
    raw: true,
    header: "<style>" + styles.join(" ") + "</style>"
});
~~~

**Zugehöriges Beispiel**: [Export Gantt with custom icons to PDF](https://snippet.dhtmlx.com/osbscj62)


**Zugehöriges Beispiel**: [Export Gantt with resource load diagram to PDF with no need to specify styles](https://snippet.dhtmlx.com/duf5ijuv)

## Exportieren benutzerdefinierter Markups und Stile {#exportingcustommarkupandstyles}

Standardmäßig wird das Gantt-Diagramm basierend auf der angegebenen Konfiguration und den geladenen Daten exportiert, während [custom elements](guides/baselines.md) und einige Vorlagen nicht exportiert werden.
Um die gesamte Gantt-Markup wie es ist zu exportieren, können Sie die Eigenschaft **raw: true** im Parameter der Methoden [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods) setzen.

~~~js
gantt.exportToPDF({
    raw: true
});
~~~

Beachten Sie, dass benutzerdefinierte Elemente das Bereitstellen von [custom styles](guides/export.md#customstylefortheoutputfile) erfordern, damit sie korrekt dargestellt werden.

Beachten Sie, dass die Nutzung dieses Modus die Größe der API-Anfrage erhöht. Große Diagramme können das Limit des Online-Exports von 10 MB überschreiten und möglicherweise auf diesem Weg nicht exportiert werden.
In einem solchen Fall müssen Sie einen [Exportdienst](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) lokal installiert haben und die Anfragedaten erhöhen.

Schauen Sie in den [Systemanforderungen](guides/export-requirements.md) nach, wie Sie Exportdienste lokal installieren.

## Exportieren von HTML-Elementen

Beim Export des Gantt-Diagramms in die Formate PNG und PDF sollten Sie beachten, dass der Export von HTML-Elementen aufgrund potenzieller Sicherheitsrisiken eingeschränkt ist.

Es gibt HTML-Elemente, die nicht vollständig für den Export zulässig sind, wie \<canvas\>, \<svg\>, \<script\> und Bilder mit dem *src*-Attribut, das ein Base64-Bild enthält. Es gibt jedoch sichere Methoden, Bilder im SVG- und Base64-Format zu exportieren:

- Sie können ein \<img\>-Element mit dem *src*-Attribut verwenden, das eine URL des Bildes im SVG-Format enthält (geeignet für PNG- und JPG-Formate, funktioniert nicht mit Base64), z.B.:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- Sie können Stil-Elemente verwenden, wie z.B. *background* oder *background-image*, und das `url`-Attribut mit dem Link zum Bild oder einem Bild im Base64-Format als dessen Wert angeben (geeignet für PNG/JPG/SVG-Formate)

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

**Zugehöriges Beispiel**: [Exporting safe and insecure HTML elements to PDF](https://snippet.dhtmlx.com/hj6w4dk3?text="gantt")

Wenn Sie ein Exportmodul haben und HTML-Elemente exportieren müssen, die von unserem Online-Exportserver nicht unterstützt werden, können Sie eine Support-Anfrage stellen, um Anweisungen zu erhalten, welche Änderungen Sie an Ihrem Modul vornehmen müssen, um Einschränkungen zu entfernen. Beachten Sie jedoch, dass Ihr Server anfällig für XSS-Angriffe sein wird.