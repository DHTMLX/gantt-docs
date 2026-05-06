---
title: "dhtmlxGantt mit Salesforce LWC"
sidebar_label: "Salesforce"
---

# dhtmlxGantt mit Salesforce LWC

Dieses Tutorial beschreibt, wie man dhtmlxGantt in eine [Salesforce Lightning Web Component](https://developer.salesforce.com/docs/platform/lwc/guide).

Schauen Sie sich die [Online-Demo](https://dhtmlx-dev-ed.develop.lightning.force.com/) zur Integration von DHTMLX-Komponenten mit Salesforce LWC an (Anmeldung: *user*, Passwort: *demo*).
Der Quellcode der Demo ist [auf GitHub verfügbar](https://github.com/DHTMLX/salesforce-lwc-demo).

Wenn Sie eine andere Technologie verwenden, prüfen Sie die untenstehende Liste der verfügbaren Integrationsvarianten:

- [dhtmlxGantt mit ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt mit ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt mit Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt mit Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt mit PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt mit PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt mit Ruby on Rails](integrations/other/howtostart-ruby.md)

Wir verwenden die Salesforce CLI, um eine Lightning Web Component zu erstellen und sie in einer Organisation hochzuladen. 
Sie können auch das Salesforce Extension Pack installieren [Visual Studio Code], um mit Entwicklungs-Orggos zu arbeiten.

:::note
Der vollständige Quellcode der in diesem Tutorial erstellten Demo ist [auf GitHub verfügbar](https://github.com/DHTMLX/salesforce-gantt-demo).
 :::

Sie können sich die Videoanleitung ansehen, die zeigt, wie man ein Gantt-Diagramm mit Salesforce LWC erstellt.

<iframe width="704" height="400" src="https://www.youtube.com/embed/1nXl9jfMdto" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Voraussetzungen

Installieren Sie die Salesforce CLI, falls Sie sie noch nicht haben. Siehe [diesen Artikel](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm) für Installationsanleitungen.

## Schritt 1. Ein Projekt erstellen

[Registrieren Sie sich](https://developer.salesforce.com/) für ein kostenloses Entwicklerkonto, falls Sie noch keins besitzen. Siehe [diesen Artikel](https://webkul.com/blog/create-free-developer-account-in-salesforce/) für Installationsanleitungen.

Auf der linken Seite im Suchfeld finden Sie *Dev Hub* und wählen Sie es aus:

![sf_devhub](/img/sf_devhub.png)

Im neuen Einstellungsfenster wählen Sie *Dev Hub aktivieren*:

![sf_enabledh](/img/sf_enabledh.png)

Lassen Sie uns ein Basverzeichnis für das Salesforce DX-Projekt erstellen:

~~~js
$ mkdir ~/salesforce
~~~

Erstellen Sie ein Salesforce DX-Projekt über die CLI:

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

Gehen Sie zum erstellten Projekt:

~~~js
$ cd gantt-salesforce-app
~~~

## Schritt 2. Autorisierung

[Organisieren Sie eine Orgnisation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_web_flow.htm) über den Web Server Flow:

~~~js
$ sfdx org login web -d

Successfully authorized ... with org ID ...
~~~

Aktualisieren Sie Ihre Projektkonfigurationsdatei (*sfdx-project.json*). Setzen Sie den Parameter "sfdcLoginUrl" auf Ihre "My Domain URL". Die "My Domain URL" Ihres Organisations finden Sie auf der Seite "My Domain" in der Einrichtung. Zum Beispiel:

![sf_mydomain](/img/sf_mydomain.png)

~~~js title="gantt-salesforce-app/sfdx-project.json"
"sfdcLoginUrl" : "https://xbs2-dev-ed.my.salesforce.com"
~~~

Erstellen Sie eine Scratch Org:

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

## Schritt 3. Gantt zu Salesforce hinzufügen

Um die Bibliothek zu verwenden, müssen wir sie innerhalb von Salesforce als Static Resource hochladen. Öffnen Sie daher Ihre Scratch Org:

~~~js
$ sfdx org open
~~~

Öffnen Sie nun die Registerkarte "Static Resources" und klicken Sie auf die Schaltfläche "New"

![sf_static_resources](/img/sf_static_resources.png)

Geben Sie ihr einen aussagekräftigen Namen (wir verwenden "dhtmlxgantt7111"), wählen Sie das ZIP-Archiv mit der Bibliothek selbst (das Archiv muss die Dateien *dhtmlxgantt.js* und *dhtmlxgantt.css* enthalten) und wählen Sie die Cache-Control-Option "Public" aus, um die Leistung zu verbessern. Drücken Sie die Schaltfläche "Save".

![sf_gantt_file](/img/sf_gantt_file.png)

Jetzt haben wir dhtmlxGantt in Salesforce.

![sf_gantt_in_sf](/img/sf_gantt_in_sf.png)

## Schritt 4. Erstellen des Datenmodells

Die Kernentitäten von dhtmlxGantt sind Tasks (Aufgaben) und Links. Ein sinnvoller Ansatz ist, alle Eigenschaften der dhtmlxGantt-Entitäten als reines JSON in Salesforce zu speichern. Erstellen wir daher die Objekte Tasks und Links. Öffnen Sie den Objekt-Manager und wählen Sie "Create" dann "Custom Object":

![sf_object_manager](/img/sf_object_manager.png)

### **Aufgaben-Objekt**

Geben Sie dem Objekt den Namen, lassen Sie es *GanttTask/GanttTasks* heißen.

![sf_task_object](/img/sf_task_object.png)

:::note
Der Datensatzname muss dem Objektnamen entsprechen, zum Beispiel:

Objektname: GanttTask => Datensatzname: GanttTask Name
:::

Drücken Sie die Schaltfläche "Save".

Nachdem das Objekt erstellt wurde, öffnen Sie die Registerkarte "Fields & Relationships". Drücken Sie die Schaltfläche "New".

![sf_fields](/img/sf_fields.png)

- **Duration**

Wählen Sie "Number" als Datentyp und drücken Sie die Schaltfläche "Next".

![sf_data_type](/img/sf_data_type.png)

Nennen Sie es "Duration". Es speichert die JSON-serialisierten Task-Eigenschaften. Drücken Sie die Schaltfläche "Next" bis die Schaltfläche "Save & New" verfügbar ist.

![sf_new_field](/img/sf_new_field.png)

Drücken Sie erneut "Next" (unter Akzeptieren aller Standardoptionen), bis die Schaltfläche "Save & New" verfügbar ist.

- **Parent**

Erstellen Sie ein Feld "Parent". Wählen Sie "Text" als Datentyp.

![sf_parent](/img/sf_parent.png)

Drücken Sie erneut "Next" (Unter Akzeptieren aller Standardoptionen) bis "Save & New" verfügbar ist.

- **Progress**

Erstellen Sie ein Feld "Progress". Wählen Sie "Number" als Datentyp.

![sf_progress](/img/sf_progress.png)

Drücken Sie erneut "Next" (Unter Akzeptieren aller Standardoptionen) bis "Save & New" verfügbar ist.

- **Startdatum**

Erstellen Sie ein Feld "Start Date". Wählen Sie "Date/Time" als Datentyp.

![sf_start_date](/img/sf_start_date.png)

Drücken Sie erneut "Next" (Unter Akzeptieren aller Standardoptionen) bis "Save" verfügbar ist.

Am Ende sollte es so aussehen:

![sf_gantttask](/img/sf_gantttask.png)

### **Link-Objekt**

Öffnen Sie den Objekt-Manager und wählen Sie "Create" dann "Custom Object":

Geben Sie den Namen für das Link-Objekt an, lassen Sie es *GanttLink/GanttLinks* heißen.

![sf_link_object](/img/sf_link_object.png)

:::note
Der Datensatzname muss dem Objektnamen entsprechen, zum Beispiel:

Objektname: GanttLink => Datensatzname: GanttLink Name
:::

Als Nächstes erstellen Sie die erforderlichen Felder.

- **Source**

Erstellen Sie ein Feld "Source". Wählen Sie "Text" als Datentyp.

![sf_source](/img/sf_source.png)

Drücken Sie erneut "Next" (Unter Akzeptieren aller Standardoptionen), bis "Save & New" verfügbar ist.

- **Target**

Erstellen Sie ein Feld "Target". Wählen Sie "Text" als Datentyp.

![sf_target](/img/sf_target.png)

Drücken Sie erneut "Next" (Unter Akzeptieren aller Standardoptionen), bis "Save & New" verfügbar ist.

- **Type**

Erstellen Sie ein Feld "Type". Wählen Sie "Text" als Datentyp.

![sf_type](/img/sf_type.png)

Drücken Sie erneut "Next" (Unter Akzeptieren aller Standardoptionen) bis "Save" verfügbar ist.

Am Ende sollte es so aussehen:

![sf_ganttlink](/img/sf_ganttlink.png)

## Schritt 5. Erstellen einer Lightning Web Component

Um eine Lightning Web Component zu erstellen, führen Sie den Befehl aus:

~~~js
$ sfdx lightning generate component --type lwc -n gantt -d force-app/main/default/lwc

target dir = 
C:UsersUsersourcesalesforcegantt-salesforce-appforce-appmaindefaultlwc
   create force-appmaindefaultlwcganttgantt.js
   create force-appmaindefaultlwcganttgantt.html
   create force-appmaindefaultlwcganttgantt.js-meta.xml
~~~

Ändern Sie die Komponentendefinition in *gantt.js-meta.xml*, um sie im Lightning App Builder freizugeben:

~~~html title="force-app/main/default/lwc/gantt/gantt.js-meta.xml"
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

Öffnen Sie *gantt.html* und fügen Sie den folgenden Code dort ein:

~~~html title="force-app/main/default/lwc/gantt/gantt.html"
<template>
    <div class="thegantt" lwc:dom="manual" style='width: 100%;'></div>
</template>
~~~

Öffnen Sie *gantt.js* und fügen Sie den folgenden Code dort ein:

~~~js title="force-app/main/default/lwc/gantt/gantt.js"
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
                        title: "Fehler beim Laden von Gantt",
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

## Schritt 6. Eine Apex-Klasse erstellen

Der nächste Schritt besteht darin, eine Klasse zu erstellen, die Interaktionen zwischen der Lightning-Komponente und unserem Datenmodell ermöglicht.

~~~js
$ sfdx apex generate class -n GanttData -d force-app/main/default/classes

target dir = 
C:UsersUsersalesforcegantt-salesforce-appforce-appmaindefaultclasses
   create force-appmaindefaultclassesGanttData.cls
   create force-appmaindefaultclassesGanttData.cls-meta.xml
~~~ 

Nachdem sie erstellt wurde, öffnen Sie *GanttData.cls* und fügen Sie den folgenden Code ein:

~~~js title="force-app/main/default/classes/GanttData.cls"
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

Quellcode aus dem Scratch-Org in Ihr Projekt ziehen

~~~js
$ sfdx project retrieve start
~~~

und dann die Quellen in die Scratch-Org übertragen

~~~js
$ sfdx project deploy start
~~~

## Schritt 7. Eine Lightning-Seite erstellen

Öffnen Sie den "Lightning App Builder", erstellen Sie eine neue Lightning-Seite.

![sf_lightning_app](/img/sf_lightning_app.png)

Wählen Sie "App Page" dann Seitennamen und Layout.

![sf_new_page](/img/sf_new_page.png)

![sf_page_name](/img/sf_page_name.png)

![sf_page_layout](/img/sf_page_layout.png)

Sie sollten eine Gantt-Benutzerkomponente für die neue Seite sehen. Fügen Sie sie in einen Bereich ein und speichern Sie.

![sf_gantt](/img/sf_gantt.png)

Aktivieren Sie die Seite.

![sf_saved_page](/img/sf_saved_page.png)

Speichern Sie die Änderungen.

![sf_activate_gantt](/img/sf_activate_gantt.png)

![sf_add_page_to_nm](/img/sf_add_page_to_nm.png)

![sf_gantt_page](/img/sf_gantt_page.png)

Öffnen Sie die Anwendungsseite. Sie sollte im App-Launcher verfügbar sein, wenn Sie darauf klicken und „Gantt“ eingeben.

![sf_app_launcher](/img/sf_app_launcher.png)

Wenn alles gut gelaufen ist, sehen Sie eine einfache Gantt-Demo, die in der Lightning-Seite läuft.

![sf_final_page](/img/sf_final_page.png)

## Anwendungssicherheit

Gantt bietet keine Mittel, um eine Anwendung vor verschiedenen Bedrohungen zu schützen, wie SQL-Injections oder XSS- und CSRF-Angriffen. Wichtig ist, dass die Verantwortung für die Sicherheit einer Anwendung bei den Entwicklern liegt, die die Anwendung implementieren. Die Details finden Sie [im entsprechenden Artikel](guides/app-security.md). Salesforce ist sicherheitsorientiert gebaut, um Ihre Daten und Anwendungen zu schützen. Sie können auch ein eigenes Sicherheitskonzept implementieren, das der Struktur und den Bedürfnissen Ihrer Organisation entspricht. Für weitere Informationen lesen Sie bitte den [Salesforce Security Guide](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/salesforce_security_guide.htm). [Hier](https://developer.salesforce.com/docs/atlas.en-us.secure_coding_guide.meta/secure_coding_guide/secure_coding_lightning_security.htm) erfahren Sie, was Sie benötigen, um sicher zu arbeiten.

## Fehlerbehebung

Wenn Sie die obigen Schritte zur Integration von Gantt mit Salesforce abgeschlossen haben, Gantt jedoch keine Aufgaben und Verknüpfungen auf einer Seite rendert, schauen Sie sich den Artikel [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) an. Er beschreibt die Möglichkeiten zur Identifizierung der Ursachen der Probleme.

## Was kommt als Nächstes

Jetzt haben Sie ein vollständig funktionsfähiges Gantt. Den vollständigen Code können Sie auf [GitHub](https://github.com/DHTMLX/salesforce-gantt-demo) einsehen, klonen oder herunterladen und für Ihre Projekte verwenden.

Sie können auch [Guides zu den zahlreichen Funktionen von Gantt](guides.md) oder Tutorials zur Integration von Gantt mit anderen Backend-Frameworks ([integrations/howtostart-guides.md](integrations/howtostart-guides.md)) prüfen.