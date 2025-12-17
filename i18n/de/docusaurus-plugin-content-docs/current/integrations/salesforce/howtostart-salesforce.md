---
title: "dhtmlxGantt mit Salesforce LWC"
sidebar_label: "Salesforce"
---

dhtmlxGantt mit Salesforce LWC
===============================

Dieses Tutorial erklärt, wie Sie dhtmlxGantt in eine [Salesforce Lightning Web Component](https://developer.salesforce.com/docs/platform/lwc/guide) integrieren.

Wenn Sie mit einer anderen Technologie arbeiten, finden Sie unten weitere Integrationsmöglichkeiten:

- [dhtmlxGantt with ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)

Der Prozess beinhaltet die Verwendung der [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli), um eine Lightning Web Component zu erstellen und in eine Salesforce-Organisation zu deployen. Für eine reibungslosere Entwicklungserfahrung empfiehlt sich die Installation des [Salesforce Extension Pack](https://marketplace.visualstudio.com/items?itemName="salesforce.salesforcedx-vscode)" in Visual Studio Code.

:::note
Der vollständige Quellcode ist auf [GitHub verfügbar](https://github.com/DHTMLX/salesforce-gantt-demo).
:::

Es gibt außerdem ein Video-Tutorial, das zeigt, wie Sie ein Gantt-Diagramm mit Salesforce LWC erstellen.

<iframe width="704" height="400" src="https://www.youtube.com/embed/1nXl9jfMdto" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Voraussetzungen
-------------------

Stellen Sie sicher, dass die [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli) installiert ist, falls dies noch nicht geschehen ist. Eine Anleitung zur Installation finden Sie in [diesem Leitfaden](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm).

Schritt 1. Projekt erstellen
----------------------------

Falls Sie noch keinen Account haben, erstellen Sie ein kostenloses Entwicklerkonto durch [Registrierung](https://developer.salesforce.com/). Hilfe dazu finden Sie in [diesem Leitfaden](https://webkul.com/blog/create-free-developer-account-in-salesforce/).

Suchen Sie in Salesforce über die Suchleiste links nach *Dev Hub* und wählen Sie diesen aus:

![](/img/sf_devhub.png)

Aktivieren Sie auf der sich öffnenden Einstellungsseite die *Dev Hub*-Funktion:

![](/img/sf_enabledh.png)

Erstellen Sie anschließend ein Verzeichnis für Ihr Salesforce DX-Projekt:

~~~js
$ mkdir ~/salesforce
~~~

Generieren Sie mit der CLI ein Salesforce DX-Projekt:

~~~
$ cd ~/salesforce
$ sfdx project generate -n gantt-salesforce-app  
    target dir = C:UsersUsersalesforce
        create gantt-salesforce-appconfigproject-scratch-def.json
        create gantt-salesforce-appREADME.md
        create gantt-salesforce-appsfdx-project.json
        create gantt-salesforce-app.huskypre-commit
        create gantt-salesforce-app.vscodeextensions.json
        create gantt-salesforce-app.vscodelaunch.json
        create gantt-salesforce-app.vscodesettings.json
        create gantt-salesforce-appforce-appmaindefaultlwc.eslintrc.json
        create gantt-salesforce-appforce-appmaindefaultaura.eslintrc.json
        create gantt-salesforce-appscriptssoqlaccount.soql
        create gantt-salesforce-appscriptsapexhello.apex
        create gantt-salesforce-app.eslintignore
        create gantt-salesforce-app.forceignore
        create gantt-salesforce-app.gitignore
        create gantt-salesforce-app.prettierignore
        create gantt-salesforce-app.prettierrc
        create gantt-salesforce-appjest.config.js
        create gantt-salesforce-apppackage.json
~~~

Wechseln Sie in den neu erstellten Projektordner:

~~~js
$ cd gantt-salesforce-app
~~~

Schritt 2. Autorisierung
----------

Verwenden Sie den Web Server Flow, um eine Organisation zu [autorisieren](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_web_flow.htm):

~~~js
$ sfdx org login web -d

Successfully authorized ... with org ID ...
~~~

Aktualisieren Sie anschließend Ihre Projektkonfigurationsdatei (*sfdx-project.json*), indem Sie den Parameter "sfdcLoginUrl" auf die "My Domain URL" Ihrer Organisation setzen. Diese URL finden Sie auf der Seite "My Domain" in den Einstellungen. Zum Beispiel:

![](/img/sf_mydomain.png)

**gantt-salesforce-app/sfdx-project.json**
~~~js
"sfdcLoginUrl" : "https://xbs2-dev-ed.my.salesforce.com"
~~~

Erstellen Sie eine Scratch-Org mit folgendem Befehl:

~~~js
$ sfdx org create scratch -f config/project-scratch-def.json -d

Creating Scratch Org...
RequestId: 2SR5j0000006JhCGAU 
(https://xbsoftware2-dev-ed.my.salesforce.com/2SR5j0000006JhCGAU)
OrgId: 00DH40000000s0D
Username: test-tc0telfqhudt@example.com
✓ Prepare Request
✓ Send Request
✓ Wait For Org
✓ Available
✓ Authenticate
✓ Deploy Settings
Done

Your scratch org is ready.
~~~

Schritt 3. Gantt zu Salesforce hinzufügen
------------

Um die Bibliothek zu verwenden, muss sie als Statische Ressource in Salesforce hochgeladen werden. Öffnen Sie Ihre Scratch-Org:

~~~js
$ sfdx org open
~~~

Navigieren Sie zum Tab "Static Resources" und klicken Sie auf "Neu":

![](/img/sf_static_resources.png)

Vergeben Sie einen aussagekräftigen Namen (z.B. "dhtmlxgantt7111"), laden Sie das ZIP-Archiv mit den Bibliotheksdateien (*dhtmlxgantt.js* und *dhtmlxgantt.css*) hoch und setzen Sie "Cache Control" auf "Public", um die Performance zu verbessern. Speichern Sie anschließend Ihre Änderungen.

![](/img/sf_gantt_file.png)

Nun steht die dhtmlxGantt-Bibliothek innerhalb von Salesforce zur Verfügung.

![](/img/sf_gantt_in_sf.png)

Schritt 4. Datenmodell erstellen
-------------

Die wichtigsten Komponenten von dhtmlxGantt sind Tasks und Links. Eine praktikable Methode zur Verwaltung ist es, deren Eigenschaften als JSON in Salesforce zu speichern. Beginnen Sie mit der Erstellung benutzerdefinierter Objekte für Tasks und Links. Gehen Sie dazu in den Object Manager, wählen Sie "Erstellen" und dann "Custom Object":

![](/img/sf_object_manager.png)

### **Task-Objekt**

Benennen Sie das Task-Objekt, zum Beispiel *GanttTask* oder *GanttTasks*.

![](/img/sf_task_object.png)

:::note
Stellen Sie sicher, dass der Datensatzname dem Objektnamen entspricht, zum Beispiel:

Object Name: GanttTask => Record Name: GanttTask Name
:::

Speichern Sie das neue Objekt.

Öffnen Sie anschließend den Tab "Fields & Relationships" und klicken Sie auf "Neu", um Felder hinzuzufügen:

![](/img/sf_fields.png)

- **Duration**

Wählen Sie als Datentyp "Number" und fahren Sie fort.

![](/img/sf_data_type.png)

Benennen Sie das Feld "Duration". Dieses Feld speichert die als JSON serialisierten Eigenschaften der Aufgabe. Klicken Sie so oft auf "Weiter", bis die Schaltfläche "Speichern & Neu" erscheint.

![](/img/sf_new_field.png)

Übernehmen Sie die Standardeinstellungen, indem Sie auf "Weiter" klicken, bis Sie speichern oder ein neues Feld hinzufügen können.

- **Parent**

Erstellen Sie ein Feld "Parent" mit dem Datentyp "Text".

![](/img/sf_parent.png)

Fahren Sie fort, indem Sie auf "Weiter" klicken, bis die Schaltfläche "Speichern & Neu" verfügbar ist.

- **Progress**

Fügen Sie ein Feld "Progress" hinzu und wählen Sie als Datentyp "Number".

![](/img/sf_progress.png)

Klicken Sie weiterhin auf "Weiter", bis Sie speichern oder ein weiteres Feld hinzufügen können.

- **Start date**

Erstellen Sie ein Feld "Start Date" mit dem Datentyp "Date/Time".

![](/img/sf_start_date.png)

Klicken Sie sich durch die Standardeinstellungen, bis Sie die Schaltfläche "Speichern" erreichen.

Am Ende sollten Ihre Objektfelder wie folgt aussehen:

![](/img/sf_gantttask.png)

### **Link-Objekt**


Öffnen Sie zunächst den Objekt-Manager und wählen Sie „Erstellen" gefolgt von „Benutzerdefiniertes Objekt":

Benennen Sie das Link-Objekt als *GanttLink/GanttLinks*.

![](/img/sf_link_object.png)

:::note
Stellen Sie sicher, dass der Datensatzname dem Objektnamen entspricht, zum Beispiel:

Objektname: GanttLink => Datensatzname: GanttLink Name
:::

Fahren Sie fort und erstellen Sie die benötigten Felder.

- **Source**

Fügen Sie ein Feld „Source" hinzu und wählen Sie als Datentyp „Text".

![](/img/sf_source.png)

Klicken Sie jeweils auf „Weiter" (behalten Sie die Standardeinstellungen bei), bis die Schaltfläche „Speichern & Neu" erscheint.

- **Target**

Fügen Sie ein Feld „Target" hinzu, ebenfalls mit dem Datentyp „Text".

![](/img/sf_target.png)

Klicken Sie jeweils auf „Weiter" (mit den Standardeinstellungen), bis „Speichern & Neu" verfügbar ist.

- **Type**

Fügen Sie ein Feld „Type" hinzu, ebenfalls mit dem Datentyp „Text".

![](/img/sf_type.png)

Klicken Sie jeweils auf „Weiter" (mit den Standardeinstellungen), bis die Schaltfläche „Speichern" angezeigt wird.

Am Ende sollte es wie folgt aussehen:

![](/img/sf_ganttlink.png)


Schritt 5. Erstellen einer Lightning Web-Komponente
-------------------------------------------------------

Um eine Lightning Web-Komponente zu generieren, führen Sie diesen Befehl aus:

~~~js
$ sfdx lightning generate component --type lwc -n gantt -d force-app/main/default/lwc

target dir = 
C:UsersUsersourcesalesforcegantt-salesforce-appforce-appmaindefaultlwc
   create force-appmaindefaultlwcganttgantt.js
   create force-appmaindefaultlwcganttgantt.html
   create force-appmaindefaultlwcganttgantt.js-meta.xml
~~~

Aktualisieren Sie die Komponentendefinition in *gantt.js-meta.xml*, um sie im Lightning App Builder verfügbar zu machen:

**force-app/main/default/lwc/gantt/gantt.js-meta.xml**
~~~html
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>54.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>lightning__AppPage</target>
    </targets>
    <targetConfigs>
        <targetConfig targets="lightning__AppPage">
            <property name="height" label="Height" type="Integer" default="800" />
        </targetConfig>
    </targetConfigs>
</LightningComponentBundle>
~~~

Öffnen Sie *gantt.html* und fügen Sie folgenden Code ein:

**force-app/main/default/lwc/gantt/gantt.html**
~~~html
<template>
    <div class="thegantt" lwc:dom="manual" style='width: 100%;'></div>
</template>
~~~

Fügen Sie in *gantt.js* diesen Code hinzu:

**force-app/main/default/lwc/gantt/gantt.js**
~~~js
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
import { LightningElement, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
import { createRecord, updateRecord, deleteRecord } from "lightning/uiRecordApi";
 
// Static resources
import GanttFiles from "@salesforce/resourceUrl/dhtmlxgantt7111";
 
// Controllers
import getTasks from "@salesforce/apex/GanttData.getTasks";
 
function unwrap(fromSF) {
    const data = fromSF.tasks.map((a) => ({
        id: a.Id,
        text: a.Name,
        start_date: a.Start_Date__c,
        duration: a.Duration__c,
        parent: a.Parent__c,
        progress: a.Progress__c,
        type: a.Task_Type__c,
    }));
    const links = fromSF.links.map((a) => ({
        id: a.Id,
        source: a.Source__c,
        target: a.Target__c,
        type: a.Type__c
    }));
    return { data, links};
}
 
export default class GanttView extends LightningElement {
    static delegatesFocus = true;
 
    @api height;
    ganttInitialized = false;
 
    renderedCallback() {
        if (this.ganttInitialized) {
            return;
        }
        this.ganttInitialized = true;
 
        Promise.all([
            loadScript(this, GanttFiles + "/dhtmlxgantt.js"),
            loadStyle(this, GanttFiles + "/dhtmlxgantt.css")
        ])
            .then(() => {
                this.initializeUI();
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error loading Gantt",
                        message: error.message,
                        variant: "error"
                    })
                );
            });
    }
 
    initializeUI() {
        const root = this.template.querySelector(".thegantt");
        root.style.height = this.height + "px";
 
        //uncomment the following line if you use the Enterprise or Ultimate version
        //const gantt = window.Gantt.getGanttInstance();
        gantt.templates.parse_date = (date) => new Date(date);
        gantt.templates.format_date = (date) => date.toISOString();
 
        gantt.init(root);
        getTasks().then((d) => {
            const chartData = unwrap(d);
            gantt.parse({
                tasks: chartData.data,
                links: chartData.links
            });
        });
 
        ///↓↓↓ saving changes back to SF backend ↓↓↓
        gantt.createDataProcessor({
            task: {
                create: (data) => {
                    console.log("createTask",data);
                    const insert = {
                        apiName: "GanttTask__c",
                        fields: {
                            Name: data.text,
                            Start_Date__c: data.start_date,
                            Duration__c: data.duration,
                            Parent__c: String(data.parent),
                            Progress__c: data.progress
                        }
                    };
                    gantt.config.readonly = true; // suppress changes
                                                  // until saving is complete  
                    return createRecord(insert).then((res) => {
                        gantt.config.readonly = false;
                        return { tid: res.id, ...res };
                    });
                },
                update: (data, id) => {
                    console.log("updateTask",data);
                    const update = {
                        fields: {
                            Id: id,
                            Name: data.text,
                            Start_Date__c: data.start_date,
                            Duration__c: data.duration,
                            Parent__c: String(data.parent),
                            Progress__c: data.progress
                        }
                    };
                    return updateRecord(update).then(() => ({}));
                },
                delete: (id) => {
                    return deleteRecord(id).then(() => ({}));
                }
            },
            link: {
                create: (data) => {
                    const insert = {
                        apiName: "GanttLink__c",
                        fields: {
                            Source__c: data.source,
                            Target__c: data.target,
                            Type__c: data.type
                        }
                    };
                    return createRecord(insert).then((res) => {
                        return { tid: res.id };
                    });
                },
                update: (data, id) => {
                    const update = {
                        apiName: "GanttLink__c",
                        fields: {
                            Id: id,
                            Source__c: data.source,
                            Target__c: data.target,
                            Type__c: data.type
                        }
                    };
                    return updateRecord(update).then(() => ({}));
                },
                delete: (id) => {
                    return deleteRecord(id).then(() => ({}));
                }
            }
        });
    }
}
~~~

Schritt 6. Erstellen einer Apex-Klasse
-----------------------------------------

Erstellen Sie als Nächstes eine Klasse, die die Kommunikation zwischen der Lightning-Komponente und dem Datenmodell übernimmt.

~~~js
$ sfdx apex generate class -n GanttData -d force-app/main/default/classes

target dir = 
C:UsersUsersalesforcegantt-salesforce-appforce-appmaindefaultclasses
   create force-appmaindefaultclassesGanttData.cls
   create force-appmaindefaultclassesGanttData.cls-meta.xml
~~~

Öffnen Sie nach dem Erstellen der Klasse *GanttData.cls* und fügen Sie folgenden Code ein:

**force-app/main/default/classes/GanttData.cls**
~~~js
public with sharing class GanttData {
 
    @RemoteAction
    @AuraEnabled(cacheable="true)"
    public static Map<String, Object> getTasks() {
       
        // fetching the Records via SOQL
        List<GanttTask__c> Tasks = new List<GanttTask__c>();
        Tasks = [SELECT Id, Name, Start_Date__c, Duration__c, 
                    Parent__c FROM GanttTask__c];
 
        List<GanttLink__c> Links = new List<GanttLink__c>();
        Links = [SELECT Id, Type__c, Source__c, Target__c FROM GanttLink__c];
 
        Map<String, Object> result = new Map<String, Object>{
            'tasks' => Tasks, 'links' => Links };
        return result;
   }
}
~~~

Ziehen Sie den Quellcode aus der Scratch-Org in Ihr Projekt:

~~~js
$ sfdx project retrieve start
~~~

Und deployen Sie die Quellen anschließend zurück in die Scratch-Org:

~~~js
$ sfdx project deploy start
~~~

Schritt 7. Erstellen einer Lightning-Seite
-----------------

Starten Sie den „Lightning App Builder" und erstellen Sie eine neue Lightning-Seite.

![](/img/sf_lightning_app.png)

Wählen Sie „App Page" und geben Sie den Namen sowie das Layout der Seite an.

![](/img/sf_new_page.png)

![](/img/sf_page_name.png)

![](/img/sf_page_layout.png)

Die benutzerdefinierte Gantt-Komponente sollte nun für die neue Seite verfügbar sein. Fügen Sie sie einem beliebigen Abschnitt hinzu und speichern Sie.

![](/img/sf_gantt.png)

Aktivieren Sie die Seite.

![](/img/sf_saved_page.png)

Speichern Sie Ihre Änderungen.

![](/img/sf_activate_gantt.png)

![](/img/sf_add_page_to_nm.png)

![](/img/sf_gantt_page.png)

Öffnen Sie die Anwendungsseite. Sie ist über den App-Launcher durch Eingabe von Gantt auffindbar.

![](/img/sf_app_launcher.png)

Wenn alles korrekt eingerichtet ist, erscheint eine einfache Gantt-Demo auf der Lightning-Seite.

![](/img/sf_final_page.png)


Anwendungssicherheit
---------------------

Gantt selbst bietet keinen integrierten Schutz gegen Bedrohungen wie SQL-Injection, XSS oder CSRF-Angriffe. Die Gewährleistung der Anwendungssicherheit liegt in der Verantwortung der Entwickler, die Gantt implementieren. Weitere Details finden Sie [im zugehörigen Artikel](guides/app-security.md). Salesforce bietet leistungsstarke Sicherheitsfunktionen zum Schutz Ihrer Daten und Anwendungen. Sie können Ihre Sicherheitsstrategie auch an die Struktur und Anforderungen Ihrer Organisation anpassen. Weitere Hinweise finden Sie im [Salesforce Security Guide](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/salesforce_security_guide.htm). Zusätzliche Informationen zur Absicherung von Lightning-Komponenten finden Sie [hier](https://developer.salesforce.com/docs/atlas.en-us.secure_coding_guide.meta/secure_coding_guide/secure_coding_lightning_security.htm).

Fehlerbehebung
---------------------

Wenn Sie alle Schritte durchgeführt haben, aber das Gantt-Diagramm keine Aufgaben und Verknüpfungen auf der Seite anzeigt, lesen Sie den Artikel [Fehlerbehebung bei Backend-Integrationsproblemen](guides/troubleshooting.md). Dort finden Sie Methoden zur Diagnose und Behebung häufiger Probleme.


Wie geht es weiter?
--------------------

Mit dem vollständig eingerichteten Gantt können Sie den vollständigen Code auf [GitHub](https://github.com/DHTMLX/salesforce-gantt-demo) einsehen, wo er zum Klonen oder Herunterladen für Ihre Projekte bereitsteht.

Außerdem können Sie [Anleitungen zu verschiedenen Gantt-Funktionen](guides.md) oder Tutorials zur [Integration von Gantt mit anderen Backend-Frameworks](integrations/howtostart-guides.md) erkunden.
