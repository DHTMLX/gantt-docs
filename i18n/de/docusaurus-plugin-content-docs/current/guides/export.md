---
title: "Export nach PDF und PNG"
sidebar_label: "Export nach PDF und PNG"
---

# Export nach PDF und PNG


dhtmlxGantt bietet einen Online-Export-Service, mit dem Sie Ihr Gantt-Diagramm als [PDF](guides/export.md#exporttopdf) oder 
[PNG](guides/export.md#exporttopng) speichern können.

:::note
Dieser Service ist kostenlos nutzbar, aber die exportierten PDF/PNG-Dateien enthalten das Wasserzeichen der Bibliothek unter der GPL-Lizenz.
Wenn Sie eine Lizenz erwerben, sind die Exporte während des aktiven Support-Zeitraums (12 Monate für alle PRO-Lizenzen) wasserzeichenfrei.
:::

Es gibt mehrere Export-Services, die Sie auf Ihrem eigenen Computer einrichten können, um Gantt-Diagramme lokal als PDF oder PNG zu exportieren.
Beachten Sie, dass Export-Services nicht im Gantt-Paket enthalten sind - Details zu den Nutzungsbedingungen der einzelnen Services finden Sie im [zugehörigen Artikel](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml).

## Einschränkungen des Online-Export-Services


:::note
Der Export-Service hat Begrenzungen hinsichtlich der Verarbeitungszeit und der Anfragegröße.
:::

### Zeitlimits {#onlineexportservicerestrictions}

Wenn der Export länger als 20 Sekunden dauert, wird der Vorgang abgebrochen und Sie sehen diesen Fehler:

~~~html
Error: Timeout trigger 20 seconds
~~~

Wenn mehrere Benutzer gleichzeitig Gantt-Diagramme exportieren, kann der Prozess länger dauern, aber die Zeit wird für jede Benutzeranfrage separat gezählt.

### Begrenzungen der Anfragegröße {##usingexportmodules}

Der allgemeine API-Endpunkt **https://export.dhtmlx.com/gantt** verarbeitet alle Exportmethoden (*exportToPDF*, *exportToPNG*, *exportToMSProject*, usw.). Die maximale Anfragegröße beträgt hier **10 MB**.

Es gibt außerdem einen speziellen API-Endpunkt **https://export.dhtmlx.com/gantt/project** für [MSProject](guides/export-msproject.md) und 
[Primavera P6](guides/export-primavera.md) 
Export-/Import-Services (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* nur). Dieser Endpunkt unterstützt Anfragen bis zu **40 MB**.

## Verwendung von Exportmodulen


:::note
Für den Export großer Diagramme können Sie ein [eigenständiges Exportmodul](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) verwenden.
Dieses Modul ist kostenlos, wenn Sie eine [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) oder [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) Lizenz besitzen, oder Sie können es [separat erwerben](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).
:::

[Hier finden Sie weitere Details zur Verwendung des Exportmoduls für PDF](guides/pdf-export-module.md).

## Export nach PDF {#exporttopdf}


Um Ihr Gantt-Diagramm als PDF zu exportieren, gehen Sie wie folgt vor:

- Aktivieren Sie das <b>export_api</b>-Plugin mit der Methode [plugins](api/method/plugins.md):

~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
Wenn Sie eine Gantt-Version älter als 8.0 verwenden, binden Sie **https://export.dhtmlx.com/gantt/api.js** auf Ihrer Seite ein, um den Online-Export-Service zu aktivieren, zum Beispiel:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Rufen Sie dann die [exportToPDF](guides/export.md#parametersoftheexportmethods)-Methode auf, um das Diagramm zu exportieren:

~~~html
<input value="Export to PDF" type="button" onclick='gantt.exportToPDF()'>/*!*/

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


[Export data from Gantt](https://docs.dhtmlx.com/gantt/samples/08_api/06_export.html)


## Export nach PNG {#exporttopng}


Um Ihr Gantt-Diagramm als PNG-Bild zu exportieren, gehen Sie wie folgt vor:

- Aktivieren Sie das <b>export_api</b>-Plugin mit der Methode [plugins](api/method/plugins.md):

~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
Wenn Sie eine Gantt-Version älter als 8.0 verwenden, binden Sie **https://export.dhtmlx.com/gantt/api.js** auf Ihrer Seite ein, um den Online-Export-Service zu aktivieren, zum Beispiel:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Rufen Sie dann die [exportToPNG]([Export to PDF and PNG](guides/export.md#parametersoftheexportmethods))-Methode auf, um das Diagramm zu exportieren:

~~~html
<input value="Export to PNG" type="button" onclick='gantt.exportToPNG()'>/*!*/

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


[Export data from Gantt](https://docs.dhtmlx.com/gantt/samples/08_api/06_export.html)


## Parameter der Exportmethoden {#parametersoftheexportmethods}


Die Methoden [exportToPDF](api/method/exporttopdf.md) und [exportToPNG](api/method/exporttopng.md) akzeptieren ein Objekt mit verschiedenen optionalen Eigenschaften:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) Gibt den Namen der Ausgabedatei an</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skin</b></td>
  <td>(<i>string</i>) Legt das [Skin](guides/skins.md) für das exportierte Gantt-Diagramm fest</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>locale</b></td>
  <td>(<i>string</i>) Definiert die Sprache, die im exportierten Gantt-Diagramm verwendet wird</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string</i>) Startdatum des Datenbereichs, der im Export enthalten sein soll. Das Datumsformat folgt der [date_format](api/config/date_format.md)-Konfiguration</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string</i>) Enddatum des Datenbereichs, der im Export enthalten sein soll. Das Datumsformat folgt der [date_format](api/config/date_format.md)-Konfiguration</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>data</b></td>
  <td>(<i>object</i>) Stellt eine benutzerdefinierte Datenquelle bereit, die im exportierten Gantt-Diagramm angezeigt wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) Fügt dem exportierten PDF-Bild einen Header hinzu. Hier kann beliebiger HTML-Inhalt verwendet werden</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) Fügt dem exportierten PDF-Bild einen Footer hinzu. Hier kann beliebiger HTML-Inhalt verwendet werden</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) Setzt den API-Endpunkt für die Exportanfrage. Nützlich, wenn ein lokaler Export-Service genutzt wird. Standardmäßig <strong>https://export.dhtmlx.com/gantt</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>raw</b></td>
  <td>(<i>boolean</i>) Exportiert das gesamte Gantt-Markup wie es ist, einschließlich benutzerdefinierter Elemente. Standard ist <em>false</em>. [Mehr Details unten](guides/export.md#exportingcustommarkupandstyles)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>callback</b></td>
  <td>(<i>function</i>) Erhält ein JSON-Objekt mit der URL zum Herunterladen der generierten PDF/PNG-Datei</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) Zusätzliche Einstellungen für die <b>exportToPDF()</b>-Methode, darunter: <ul> <li><b>format</b> - (<i>string</i>) Ausgabedateiformat: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li> <li><b>landscape</b> - (<i>boolean</i>) Ausrichtung der Ausgabedatei; gilt nur, wenn "format" gesetzt ist</li> <li><b>width</b> - (<i>string | number | "content"</i>) Seitenbreite für Mehrseiten-Exporte</li> <li><b>height</b> - (<i>string | number | "content"</i>) Seitenhöhe für Mehrseiten-Exporte</li> <li><b>merge_pages</b> - (<i>boolean</i>) Ermöglicht den Mehrseiten-Export in einer einzelnen Datei; wenn <i>false</i>, sind mehrere Exporte erforderlich, um alle Gantt-Daten abzudecken</li> <li><b>fixed_headers</b> - (<i>boolean</i>) Zeigt Grid- und Zeitachsen-Header auf jeder Seite an; Standard ist <i>false</i>. Funktioniert nur, wenn <b>merge_pages</b> aktiviert ist</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) Zusätzliche Einstellungen für die <b>exportToPNG()</b>-Methode, darunter: <ul> <li><b>width</b> - (<i>number|string</i>) Breite des Ausgabebildes</li> <li><b>height</b> - (<i>number|string</i>) Höhe des Ausgabebildes</li> Diese werden ignoriert, wenn <b>slice_archive</b> gesetzt ist. <li><b>slice_archive</b> - (<i>boolean|object</i>) Ermöglicht den Export großer Diagramme in Teilen, die in einem Archiv gespeichert werden. Wenn ein Objekt, können <b>width</b> und <b>height</b> angegeben werden. Bei <i>true</i> Standardwert 1000×1000.</li> <li><b>slice_check</b> - (<i>boolean</i>) Fügt dem Archiv eine HTML-Seite hinzu, um zu überprüfen, ob alle Teile korrekt exportiert wurden.</li> </ul></td>
  </tr>
  </tbody>
</table>


**Beispiel für den Aufruf der Exportmethoden mit optionalen Eigenschaften**
~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    locale:"en",
    start:"01-04-2013",
    end:"11-04-2013",
    skin:'terrace',
    data:{ },
    server:"https://myapp.com/myexport/gantt",
    raw:true,
    callback: function(res){
        alert(res.url);
    }
});

gantt.exportToPNG({
    name:"mygantt.png",
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    locale:"en",
    start:"01-04-2013",
    end:"11-04-2013",
    skin:'terrace',
    data:{ },
    server:"https://myapp.com/myexport/gantt",
    raw:true,
    callback: function(res){
        alert(res.url);
    }
});
~~~

## Name der Ausgabedatei {#nameoftheoutputfile}

Um einen eigenen Dateinamen für die exportierte Datei anzugeben, verwenden Sie die **name**-Eigenschaft in den Parametern für [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods):

~~~js
gantt.exportToPDF({
    name:"my_beautiful_gantt.pdf"/*!*/
});
~~~

## Sprache der Ausgabedatei {#languageoftheoutputfile}

Standardmäßig verwendet das exportierte Gantt-Diagramm dieselbe Sprache wie auf der Seite angezeigt.

Um in einer anderen Sprache zu exportieren, setzen Sie die **locale**-Eigenschaft in den Parametern für [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods):

~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    locale:"de" /*!*/
});
~~~

## Zu exportierende Daten


Es gibt zwei Möglichkeiten, festzulegen, welche Aufgaben im exportierten PDF oder PNG erscheinen:

1. [Definieren Sie den Datumsbereich für die Ausgabedaten.](#daterange)
2. [Stellen Sie eine eigene Datenquelle für den Export bereit.](#customdata)

<a id="daterange"></a>

### Festlegen des Datumsbereichs der zu exportierenden Aufgaben {#datatoexport}

Um den Bereich der Aufgaben für den Export festzulegen, verwenden Sie die Eigenschaften **start** und **end** in den Parametern für [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods):

~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    start:"01-04-2013",/*!*/
    end:"11-04-2013"/*!*/
});
~~~

:::note
Beachten Sie, dass das Datumsformat durch die [date_format](api/config/date_format.md)-Konfiguration festgelegt wird.
:::

<a id="customdata"></a>

### Festlegen einer eigenen Datenquelle für den Export 

Wenn Sie das Gantt-Diagramm mit einem anderen Datensatz exportieren möchten als dem, der ursprünglich angezeigt wird, können Sie die **data**-Eigenschaft in den Parametern der 
[exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods)-Methoden verwenden:

~~~js
gantt.exportToPDF({
    data:{/*!*/
        data:[
            {id:1, text:"Project #1", start_date:"01-04-2013", duration:18},
            {id:2, text:"Task #1", start_date:"02-04-2013",duration:8, parent:1},
            {id:3, text:"Task #2", start_date:"11-04-2013",duration:8, parent:1}
        ],
        links:[
            {id:1, source:1, target:2, type:"1"},
            {id:2, source:2, target:3, type:"0"},
            {id:3, source:3, target:4, type:"0"},
            {id:4, source:2, target:5, type:"2"}
        ]
    }
});
~~~

:::note
Beachten Sie, dass der **data**-Parameter ein Objekt mit den Daten sein muss; Sie können keinen URL-Wert angeben.
:::

## Skin des exportierten Gantt-Diagramms {#skinoftheoutputganttchart}

Standardmäßig übernimmt das exportierte Gantt-Diagramm dasselbe Skin wie die Seite.

Um ein anderes Skin in der exportierten PNG- oder PDF-Datei zu verwenden, nutzen Sie die **skin**-Eigenschaft in den Parametern der [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods)-Methoden:

~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    skin:"material"/*!*/ 
});
~~~

[Hier finden Sie die vollständige Liste verfügbarer Gantt-Skins](guides/skins.md).

## Kopf-/Fußzeile der Ausgabedatei {#headerfooteroftheoutputfile}

Sie können eine Kopf- oder Fußzeile zur exportierten PNG- oder PDF-Datei hinzufügen, indem Sie die Eigenschaften **header** und **footer** in den Parametern der Methoden [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods) verwenden:

:::note
Sie können beliebiges HTML in diesen Parametern einfügen. Beim Hinzufügen von Bildern stellen Sie sicher, dass Sie globale Pfade für das "src"-Attribut verwenden.
:::

~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    header:"<h1>My company</h1>",/*!*/
    footer:"<h4>Bottom line</h4>"/*!*/
});
~~~


## Benutzerdefinierte Stile für die Ausgabedatei {#customstylefortheoutputfile}

Um das Aussehen des exportierten Gantt-Diagramms anzupassen, können Sie ein Stylesheet mit Ihren CSS-Klassen auf zwei Arten bereitstellen:

- Durch Verlinken eines externen Stylesheets:

~~~js
gantt.exportToPDF({
    name:"calendar.pdf",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~

- Oder durch das direkte Einbetten von Styles mittels des 'style'-Tags:

~~~js
gantt.exportToPDF({
    name:"calendar.pdf",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~

Beachten Sie, dass dieser Ansatz mit HTTP-Referenzen funktioniert, die global zugänglich sind. Falls Ihre CSS-Dateien im Intranet oder lokal gehostet werden, können Sie die Stile direkt wie folgt einbetten:

~~~js
gantt.exportToPDF({
    header:"<style>.tier1{background: red; color:white;}</style>"
});
~~~

:::note
Weitere Beispiele finden Sie im Artikel [How to add resource chart or custom styles in the exported PDF file](guides/how-to.md#howtoaddresourcechartorcustomstylesintheexportedpdffile).
:::

### Alle Stile für die Exportfunktion sammeln 

Manchmal sind Stile auf mehrere Dateien verteilt, die nicht öffentlich zugänglich sind, was es umständlich macht, jede einzeln einzubinden. Sie können alle auf der Seite verwendeten Stile sammeln und in den Export-Header einfügen.

Alle Stile sind im Objekt **document.styleSheets** verfügbar. Wenn die Stile aus derselben Domain stammen, können Sie deren CSS-Regeln sammeln und in den **header** einfügen. Hier ein Beispiel:

~~~js
const styles = []
for (el in document.styleSheets) {
    try {
        const rules = (document.styleSheets[el]).cssRules;
        for (rule in rules) {
            styles.push(rules[rule].cssText)
        }
    }
    catch (e) { }
}

gantt.exportToPDF({
    raw: true,
    header: "<style>" + styles.join(" ") + "</style>"
});
~~~ 

**Related example:** [Export Gantt with custom icons to PDF](https://snippet.dhtmlx.com/osbscj62)


**Related example:** [Export Gantt with resource load diagram to PDF with no need to specify styles](https://snippet.dhtmlx.com/duf5ijuv)

## Export von benutzerdefiniertem Markup und Stilen {#exportingcustommarkupandstyles}

Standardmäßig wird das Gantt-Diagramm basierend auf der bereitgestellten Konfiguration und den geladenen Daten exportiert, aber [benutzerdefinierte Elemente](guides/baselines.md) und einige Templates sind nicht enthalten.

Um das gesamte Gantt-Markup so zu exportieren, wie es angezeigt wird, einschließlich aller benutzerdefinierten Elemente, setzen Sie die Eigenschaft **raw:true** in den Parametern der Methoden [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods).

~~~js
gantt.exportToPDF({
    raw:true
});
~~~

Beachten Sie, dass benutzerdefinierte Elemente [benutzerdefinierte Stile](guides/export.md#customstylefortheoutputfile) benötigen, um korrekt angezeigt zu werden.

Außerdem erhöht sich durch diesen Modus die Größe der API-Anfrage. Große Diagramme können das 10MB-Limit des Online-Exportdienstes überschreiten und den Export fehlschlagen lassen. In solchen Fällen muss ein [Exportdienst](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) lokal installiert und die Anfragegröße entsprechend angepasst werden. 


Siehe [Systemanforderungen](guides/export-requirements.md) für die lokale Einrichtung von Exportdiensten.

## Exportieren von HTML-Elementen {#exportinghtmlelements}

Beim Export des Gantt-Diagramms nach PNG oder PDF beachten Sie bitte, dass der Export von HTML-Elementen aufgrund von Sicherheitsbedenken Einschränkungen unterliegt.

Bestimmte HTML-Elemente wie `<canvas>`, `<svg>`, `<script>` und Bilder mit Base64-Daten im *src*-Attribut sind eingeschränkt. Es gibt jedoch sichere Möglichkeiten, Bilder im SVG- und Base64-Format zu exportieren:

- Verwenden Sie ein `<img>`-Element mit dem *src*-Attribut, das auf eine URL eines SVG-Bildes verweist (funktioniert beim Export nach PNG und JPG, aber nicht bei Base64), zum Beispiel:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- Verwenden Sie CSS-Stile wie *background* oder *background-image* mit einem `url`-Wert, der auf eine Bild-URL oder Base64-Daten verweist (funktioniert beim Export nach PNG, JPG und SVG):

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

**Related example:** [Exporting safe and insecure HTML elements to PDF](https://snippet.dhtmlx.com/hj6w4dk3?text="gantt")

Wenn Sie das Exportmodul besitzen und HTML-Elemente exportieren müssen, die vom Online-Exportserver nicht unterstützt werden, können Sie den Support kontaktieren, um Anleitungen zur Anpassung Ihres Moduls zu erhalten, um diese Einschränkungen aufzuheben. Beachten Sie jedoch, dass dadurch Ihr Server für XSS-Schwachstellen anfällig werden kann.

