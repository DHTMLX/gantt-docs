---
title: "Application Security"
sidebar_label: "Application Security"
---

# Application Security

DHTMLX Gantt ist eine clientseitige JavaScript-Bibliothek, die entwickelt wurde, um Gantt-Funktionen nahtlos in verschiedene Webanwendungen zu integrieren. 
Wir schränken die Funktionalität von Gantt nicht auf eine Weise ein, die zwar die Sicherheit erhöhen, aber gleichzeitig die Möglichkeiten begrenzen würde. 
Dadurch können Sie die meisten Gantt-Funktionen an die Anforderungen Ihres Projekts anpassen.

Es ist jedoch wichtig zu beachten, dass DHTMLX Gantt selbst keinen Schutz vor Bedrohungen wie SQL-Injection, XSS oder CSRF-Angriffen bietet. 
Die Sicherheit Ihres Projekts hängt davon ab, wie Sie Ihre Anwendung konfigurieren und schützen. 
Dieser Artikel bietet nützliche Einblicke und Empfehlungen zur HTML-Säuberung.

## Grundlegende Sicherheitsmaßnahmen

Cybersicherheit ist ein breites und komplexes Feld, das nicht vollständig mit einer einfachen Checkliste abgedeckt werden kann. 
Es gibt jedoch praktische Schritte, die die wichtigsten Aspekte abdecken und dabei helfen, häufige Risiken zu minimieren.

**1. Verwenden Sie Content Security Policy (CSP) in Ihrer Anwendung**

Das Hinzufügen eines CSP-Headers wie dem folgenden kann verhindern, dass XSS-Skripte in Ihrer App ausgeführt werden:

~~~
Content-Security-Policy: script-src 'self'
~~~

Ihre Anwendung benötigt möglicherweise eine detailliertere Richtlinie, aber das Blockieren der Ausführung von Inline-Skripten kann viele XSS- und CSRF-Angriffe verhindern.

**2. Bereinigen Sie Benutzereingaben im Backend, bevor Sie sie in der Datenbank speichern**

Speichern Sie beim Hinzufügen neuer Einträge keine Benutzereingaben direkt und ungeprüft:

~~~
db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
    + " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent])
~~~

Es ist besser, das Eingabeformat zu überprüfen und schädliche Inhalte zu entfernen. 
In Node.js können Sie zum Beispiel Bibliotheken wie [DOMPurify](https://www.npmjs.com/package/dompurify) verwenden:

~~~
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

...

db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
    + " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent]
        .map((input) => DOMPurify.sanitize(input))
~~~

**3. Maskieren Sie HTML-Entities, bevor Sie Daten anzeigen**

Um zu verhindern, dass HTML-Markup bei der Anzeige von Daten ausgeführt wird, sollten Sie HTML-Zeichen, die von Benutzern eingegeben wurden, maskieren, bevor Sie die Daten an Gantt übergeben. 
So können Sie dies mit der [validator](https://www.npmjs.com/package/validator)-Bibliothek tun:

~~~
const validator = require('validator');
...

// GET /data

Promise.all([
  db.query("SELECT * FROM gantt_tasks"),
  db.query("SELECT * FROM gantt_links")
]).then(results => {
    let tasks = results[0],
        links = results[1];
 
    tasks.forEach((task) => {
        Object.entries(task).forEach(([key, value]) => {
            if(typeof value === "string") {
                task[key] = validator.escape(value); //#!
            }
        });
        task.open = true;
        task.start_date = task.start_date.format("YYYY-MM-DD hh:mm:ss");
    });

    links.forEach((link) => {
        Object.entries(link).forEach(([key, value]) => {
            if(typeof value === "string") {
                link[key] = validator.escape(value); //#!
            }
        });
    });
    
 
    res.send({
        tasks,
        links 
   });
~~~

**4. Wenn Sie mit einer SQL-Datenbank arbeiten, vermeiden Sie das Erstellen von SQL-Abfragen durch das Verketten von Zeichenfolgen. Verwenden Sie stattdessen parametrisierte Abfragen, ORM oder Query Builder**

Dies hilft, SQL-Injection-Angriffe zu verhindern. 
Verwenden Sie niemals ungeprüfte oder nicht maskierte Benutzereingaben direkt in Ihren SQL-Abfragen. 
Wenn Ihr Code dies derzeit tut, sollten Sie auf parametrisierte Abfragen oder die Escape-Funktionen Ihrer SQL-Bibliothek umstellen.

**5. Zu guter Letzt: Konsultieren Sie einen Cybersicherheitsexperten und befolgen Sie die in Ihrem Unternehmen akzeptierten Sicherheitsrichtlinien**

Sicherheit ist ein fortlaufender Prozess. 
Wenn Sie diese Schritte befolgen, die Richtlinien Ihrer Organisation einhalten und Ihre Arbeit von einem Sicherheitsexperten überprüfen lassen, können Sie die meisten gängigen Web-Bedrohungen minimieren.

Nachdem die Grundlagen behandelt sind, betrachten wir einige Gantt-spezifische Aspekte.

## Verwundbare Bereiche von Gantt auf der Client-Seite

Hier sind einige wichtige Punkte, wenn Sie komplexe Features wie Gantt auf der Client-Seite hinzufügen:

- DHTMLX Gantt läuft auf dem Client, daher werden alle vom Server geladenen Daten unverändert verwendet.  
Da die Daten serverseitig gespeichert werden, kommen die größten Risiken meist von dort. Der Schutz des Backends liegt jedoch außerhalb des Geltungsbereichs von DHTMLX Gantt. 
- Angreifer könnten Benutzer dazu verleiten, bösartigen Code über DevTools auszuführen (Self-XSS-Angriffe), wodurch Sicherheitsmaßnahmen umgangen werden können.  
Jeder in den Text einer Aufgabe eingefügte Code verhält sich genauso, als wäre er über die DevTools eingegeben worden. 
- Wenn Angreifer Zugriff auf das Gantt-Instanzobjekt erlangen, können alle Schutzmaßnahmen umgangen werden.  
Sie könnten die Gantt-Konfiguration ändern und die vollständige Kontrolle übernehmen.

Hier sind die verwundbaren Bereiche in DHTMLX Gantt, in denen Sicherheitsprobleme auftreten könnten:

- von Benutzern eingegebene und gespeicherte Daten  
- angezeigte Gantt-Daten (Text und visuelle Elemente)  
- [benutzerdefinierte HTML-Elemente](guides/export.md#exportinghtmlelements), die mit Gantt-Daten interagieren  
- Zugriff auf das Gantt-Objekt selbst

Schauen wir uns diese Aspekte genauer an.

## Isolierung des Zugriffs auf Gantt 

Einer der ersten Schritte zum Schutz von Gantt ist die Isolierung vor unbefugtem Zugriff durch kompromittierte Komponenten oder getäuschte Benutzer (Self-XSS).

:::note
Wenn ein Angreifer Zugriff auf die Konfigurationsdateien der App (einschließlich der Gantt-Konfigurationsdatei) erhält,
können alle ergriffenen Schutzmaßnahmen gegen XSS-Angriffe unwirksam sein, daher betrachten wir dieses Szenario hier nicht.
:::

Sobald die App vollständig geladen ist, können Angreifer, die Zugriff auf das Gantt-Instanzobjekt erhalten, alles ändern und Funktionen überschreiben. 
Daher ist es wichtig, Gantt innerhalb Ihres Projekts zu isolieren.

Erstellen Sie dazu eine separate Gantt-Instanz innerhalb einer Funktion. So ist der Code innerhalb der Funktion von außen nicht zugänglich.

Standardmäßig wird eine neue Gantt-Instanz im *gantt*-Objekt erstellt. 
Deklarieren Sie innerhalb Ihrer Funktion eine neue Variable mit *const* oder *let*, um sie außerhalb des Gültigkeitsbereichs zu verbergen und speichern Sie die Gantt-Instanz dort.

~~~js
function addGantt(){
  const gantt = Gantt.getGanttInstance();
}
addGantt()
~~~

Sie können auch einen anderen Variablennamen verwenden, um Verwechslungen mit dem globalen gantt-Objekt zu vermeiden:

~~~js
function addGantt(){
  const protectedGantt = Gantt.getGanttInstance();
}
addGantt()
~~~

Nachdem Sie Gantt gegen unerwünschten Zugriff geschützt haben, konzentrieren Sie sich darauf, wie Daten in das Gantt-Diagramm eingegeben und angezeigt werden.

## Dateneingabe im Gantt 

Dies ist ein kritischer Bereich, den Angreifer ausnutzen könnten, um die Gantt-Sicherheit Ihrer App zu kompromittieren.

Eingabepunkte sind häufige Ziele für XSS-Angriffe. 
Im Gantt-Komponent können Daten geändert werden durch:

- Lightbox  
- Inline-Editoren  
- Modale Boxen mit benutzerdefinierten Elementen  
- Drittanbieter-Bibliotheken  
- Ressourcenzuweisungen in der Ressourcenlast-Timeline  
- Zusätzliche Layer mit benutzerdefinierten Eingabeelementen  
- Jede benutzerdefinierte Lösung, die die Gantt API nutzt und Dateneingaben ermöglicht (wie Toolbars oder benutzerdefinierte Formular zur Aufgabenbearbeitung)

Das Aufgabenobjekt verfügt über [viele Eigenschaften](guides/task-properties.md), die je nach aktivierten Funktionen verwendet werden. 
Je mehr bearbeitbare Eigenschaften Sie zulassen, desto wichtiger ist eine sorgfältige Eingabebereinigung.

### Beispielbetrachtung

Hier ein Beispiel, das verschiedene Möglichkeiten zeigt, wie Sie den Schutz gegen XSS-Angriffe durch HTML-Säuberung beim Arbeiten mit DHTMLX Gantt erhöhen können.

**Related example:** [Beispiel zum Verhindern von XSS-Angriffen (Sicherheit, CSP)](https://snippet.dhtmlx.com/cdy9p0yl)

In diesem Beispiel können Sie den Aufgabennamen ändern, das Datum und die Dauer anpassen, Ressourcenzuweisungen ändern und Notizen hinzufügen. 
Startdatum und Dauer können nur in der Lightbox und den Inline-Editoren geändert werden. Beide Inline-Editoren geben explizit die Typen **date** und **number** an. 
In der Lightbox kann die Dauer direkt gesetzt werden, das Datum muss aus einer Dropdown-Liste ausgewählt werden.

Keine der Oberflächen erlaubt das Einfügen von Text, der bösartigen Code enthält. 
Falls jemand versucht, Elementtypen per DOM-Inspektor zu verändern, entstehen ungültige Werte für Datum oder Dauer. 
Dies löst einen Fehler aus, der verhindert, dass Gantt weiterarbeitet, bis die Seite neu geladen wird. In der Zwischenzeit werden keine Daten an den Server gesendet, da das Diagramm nicht neu gezeichnet wird.

Da Aufgabennamen jedoch den Typ **string** verwenden, können sie für XSS-Angriffe anfällig sein. 
Deshalb ist eine Eingabebereinigung notwendig. Das Beispiel zeigt eine Art von XSS-Angriff und eine Methode zu dessen Verhinderung.

![preventing_xss_attack](/img/preventing_xss_attack.png)

In realen Projekten ist es wichtig, eine umfassende Datenbereinigung zu implementieren. 
Hier ersetzen wir einfach die Zeichen "\<" und "\>" durch ihre HTML-Entity-Entsprechungen - **`&lt;`** und **`&gt;`** -  
was verhindert, dass HTML-Elemente im Aufgabentext gerendert werden.

Diese Ersetzung erfolgt in der Funktion **sanitizeText()**, wie unten gezeigt:

~~~js
function sanitizeText(text){
    // zum Testen von XSS auskommentieren
    // return text

    // XSS verhindern, indem HTML-Elemente deaktiviert werden
    return text.split("<").join("&lt;").split(">").join("&gt;");
}
~~~

Die Funktion wird in den Event-Handlern **onLightboxSave** für die Lightbox und **onBeforeSave** für Inline-Editoren aufgerufen.

In diesem Beispiel können Sie Notizen zu einer Aufgabe entweder über einen benutzerdefinierten Inline-Editor oder einen benutzerdefinierten Lightbox-Abschnitt hinzufügen. 
Die Bereinigung kann innerhalb der Funktionen dieser benutzerdefinierten Komponenten angewendet werden - bevor Werte gerendert und bevor Änderungen aus DOM-Elementen gelesen werden:

~~~js
// für einen Inline-Editor:
set_value: function(value, id, column, node){
    node.firstChild.value = sanitizeText(value || "");
},
get_value: function(id, column, node){
    return sanitizeText(node.firstChild.value);
},

// für die Lightbox:
set_value: function(node, value, task){
    node.value = sanitizeText(value || "");
},
get_value: function(node, task){
    return sanitizeText(node.value);
},
~~~

Es ist jedoch einfacher, die Bereinigung von Notizen über die Event-Handler **onLightboxSave** und **onBeforeSave** zu steuern:

~~~js
protectedGantt.attachEvent("onLightboxSave", function(id, task, is_new){
    if (task.notes) {
        task.notes = sanitizeText(task.notes);
    }
    return true;
});

protectedGantt.ext.inlineEditors.attachEvent("onBeforeSave", function(state){
    if (state.columnName == "notes") {
        state.newValue = sanitizeText(state.newValue);
    }
    return true;
});
~~~

Auch Ressourcenzuweisungen können in der Lightbox bearbeitet werden. Da Gantt die Werte nicht nur auf den Typ **number** beschränkt, sind auch Zeichenfolgen möglich, was XSS-Angriffe ermöglichen könnte.

Ressourcenwerte werden in einer Eigenschaft der Aufgabe gespeichert, daher durchläuft die Funktion **sanitizeResourceValues()** alle diese Werte und bereinigt jeden mit **sanitizeText()**:

~~~js
function sanitizeResourceValues(task){
    const resources = task[protectedGantt.config.resource_property];
    if (resources && resources.length) {
        resources.forEach(function (resource) {
               if (typeof resource.value == "string") {
                resource.value = sanitizeText(resource.value);
            }
        })
       }
}
~~~

Diese Funktion wird im Event-Handler **onLightboxSave** aufgerufen:

~~~js
protectedGantt.attachEvent("onLightboxSave", function(id, task, is_new) {
    sanitizeResourceValues(task)
    return true;
});
~~~

*Alle anderen String-Parameter in Ihrer Gantt-Konfiguration sollten ebenfalls bereinigt werden.*

In diesem Beispiel werden, wenn Sie versuchen, unerwünschte Inhalte in Ressourcenzuweisungen in der Ressourcen-Timeline einzugeben, nur numerische Werte akzeptiert. Nicht-numerische Eingaben werden nicht gespeichert.

### Dateneingabe über Drittanbieter-Tools

DHTMLX Gantt bietet umfangreiche Anpassungsmöglichkeiten, einschließlich der Bearbeitung von Aufgaben über Drittanbieter-Formulare, Tools oder Bibliotheken. 
Da in diesen Fällen die Gantt-API die Aufgabenoperationen verwaltet, ist eine allgemeingültige Empfehlung zur Datenbereinigung schwierig, da sie davon abhängt, wie die Anpassungen implementiert sind.

Das folgende Beispiel enthält ein benutzerdefiniertes Formular zur Bearbeitung des Aufgabennamens, das zusätzlich die Funktion **sanitizeText()** anwendet, um den Text zu escapen:

~~~js
document.body.querySelector("[name='save']").onclick = function(){
    const newTaskName = document.body.querySelector("[name='text']").value;
    task.text = sanitizeText(newTaskName);
    protectedGantt.updateTask(task.id);
}
~~~

Diese Methoden decken die meisten Möglichkeiten der Dateneingabe ab. Die Bereinigung der Daten beim Eintritt in Gantt filtert sie effektiv heraus, sodass XSS-Angriffe innerhalb des Gantt-Diagramms wirkungslos bleiben und schädliche Daten nicht zum Server gelangen.

## Anzeige von Daten im Gantt

Ein weiterer wichtiger Aspekt ist die Art und Weise, wie Daten im Gantt-Diagramm angezeigt werden. 
Auch wenn die Bereinigung angezeigter Daten nicht so effektiv ist wie die Bereinigung der Eingabe, trägt sie dennoch dazu bei, XSS-Angriffsketten zu stoppen oder zu unterbrechen. 
Zum Beispiel, wenn der Server kompromittiert ist, Gantt selbst aber nicht, verhindert die Bereinigung auf der Client-Seite die Ausführung schädlicher Skripte.

Am sichersten ist es, jede Stelle in Gantt zu bereinigen, an der Daten angezeigt werden. 
Dies umfasst die Verwendung von [Templates in der Konfiguration jeder Grid-Spalte](guides/specifying-columns.md#datamappingandtemplates) und die Anwendung [aller relevanten Templates](api/overview/templates-overview.md), um die Darstellung unsicherer Inhalte zu verhindern.

Eine einfachere Möglichkeit, Anzeige-Risiken zu kontrollieren, besteht darin, die beiden Hauptdatenquellen zu kontrollieren: Benutzereingaben und Serverdaten. 
Durch die Bereinigung eingehender Daten verringern Sie das Risiko, dass schädliche Inhalte im Gantt-Diagramm erscheinen.

Beispielsweise können Sie Aufgaben-Eigenschaften beim Laden vom Server mit dem **onTaskLoading**-Event bereinigen:

~~~js
protectedGantt.attachEvent("onTaskLoading", function (task) {
    task.text = sanitizeText(task.text);
    if (task.notes) {
        task.notes = sanitizeText(task.notes);
    }
    sanitizeResourceValues(task);
    return true;
});
~~~

Es können auch andere Methoden zum Laden von Daten existieren, etwa wenn ein Aufgabenobjekt separat vom Server empfangen und verarbeitet wird, bevor es in Gantt hinzugefügt oder aktualisiert wird. 
In solchen Fällen sollte die Bereinigung innerhalb der Verarbeitungsfunktion erfolgen, bevor die Aufgabe hinzugefügt wird:

~~~js
let newTask = await loadFromServer(23);
sanitizeTaskProperties(newTask);
gantt.addTask(newTask);
~~~

Wenn jemand das Element-Inspektor-Tool des Browsers verwendet, um schädlichen Code direkt in die DOM-Elemente von Gantt einzufügen, lässt sich das nicht verhindern. 
Allerdings gehen solche Änderungen beim nächsten Rendern von Gantt verloren und werden nicht auf dem Server gespeichert.

## Serverseitige Probleme

Beachten Sie, dass die Validierung auf Client-Seite leicht umgangen oder deaktiviert werden kann und daher nicht als Sicherheitsmaßnahme ausreicht. 
Ihr Zweck besteht darin, sofortiges Feedback bei fehlerhafter Eingabe zu geben, ohne auf eine Serverantwort zu warten. 
Die endgültige Validierung und Sicherheitsüberprüfung muss auf dem Server erfolgen.

Das Backend sollte eingehende Daten korrekt validieren, escapen und bereinigen, Benutzerzugriffsregeln durchsetzen usw.

### SQL-Injections

Da dhtmlxGantt vollständig clientseitig ist, liegt die Verhinderung von SQL-Injections in der Verantwortung des Backends.

Zwei Punkte sind zu beachten:

- Die Lightbox enthält keine Standardvalidierung, daher können Benutzer beliebige Werte in editierbare Felder eingeben, sofern dies nicht behandelt wird.
- Backend-APIs können direkt mit PUT/POST-Anfragen mit schädlichen Werten aufgerufen werden, wodurch die Client-Oberfläche umgangen wird.

Daher muss Ihr Backend Schutz vor SQL-Injections implementieren. 
Wenn Sie [dhtmlxConnector](integrations/php/howtostart-connector.md) verwenden und Tabellen wie in der [Dokumentation](https://docs.dhtmlx.com/connector__php__basis.html#loadingfromdatabase) beschrieben konfigurieren, werden Werte automatisch escaped. 
Ansonsten sollten Sie die für Ihre Plattform empfohlenen sicheren CRUD-Praktiken befolgen. Die in den [How-to-Start-Guides](integrations/howtostart-guides.md) gezeigten Implementierungen sind so konzipiert, dass sie gegen SQL-Injections sicher sind.

### CSRF-Angriffe

Lesen Sie [diesen Artikel](guides/server-side.md#customrequestheadersandparameters) für Hinweise zum Hinzufügen von benutzerdefinierten Autorisierungstoken oder Headern zu Anfragen, die von Gantt an Ihr Backend gesendet werden.

## Content Security Policy

Die Bibliothek enthält eine spezielle Konfigurationsoption, mit der Sie Ihre dhtmlxGantt-Anwendung an den Content Security Policy (CSP)-Standard anpassen können. 
Dies verbessert die Sicherheit, indem verschiedene Code-Injection-Angriffe verhindert werden.

[Erfahren Sie mehr über die Anwendung von CSP auf eine dhtmlxGantt-Anwendung](api/config/csp.md).

