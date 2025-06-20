dhtmlxGantt with Salesforce LWC
===============================

This tutorial describes how to add dhtmlxGantt into a [Salesforce Lightning Web Component](https://developer.salesforce.com/docs/platform/lwc/guide).

If you use some other technology, check the list of available integration variants below:

- desktop/howtostart_dotnet_core.md
- desktop/howtostart_dotnet.md
- desktop/howtostart_nodejs.md
- desktop/howtostart_python.md
- desktop/howtostart_php_laravel.md
- desktop/howtostart_php_slim4.md
- desktop/howtostart_ruby.md

We will use [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli) to create Lightning Web Component and upload it to an organization. 
You can also install [Salesforce Extension Pack](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode) to Visual Studio Code for working with development orgs. 

{{note
The complete source code is [available on GitHub](https://github.com/DHTMLX/salesforce-gantt-demo).
}}

You can have a look at the video guide that shows how to create a Gantt chart with Salesforce LWC.

<iframe width="704" height="400" src="https://www.youtube.com/embed/1nXl9jfMdto" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Prerequisites
-------------------

Install [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli) if you don't have it. See [this article](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm) for installation guidance.

Step 1. Creating a project
----------------------------

[Sign up](https://developer.salesforce.com/) for a free developer account if you don't have one. See [this article](https://webkul.com/blog/create-free-developer-account-in-salesforce/) for installation guidance.

On the left in the search bar, find and select *Dev Hub*:

![](desktop/sf_devhub.png)

In the new settings window, select *Enable Dev Hub*:

![](desktop/sf_enabledh.png)

Let's create a base directory for Salesforce DX project:

~~~js
$ mkdir ~/salesforce
~~~

Create a Salesforce DX project via CLI:

~~~
$ cd ~/salesforce
$ sfdx project generate -n gantt-salesforce-app  
    target dir = C:\Users\User\salesforce
        create gantt-salesforce-app\config\project-scratch-def.json
        create gantt-salesforce-app\README.md
        create gantt-salesforce-app\sfdx-project.json
        create gantt-salesforce-app\.husky\pre-commit
        create gantt-salesforce-app\.vscode\extensions.json
        create gantt-salesforce-app\.vscode\launch.json
        create gantt-salesforce-app\.vscode\settings.json
        create gantt-salesforce-app\force-app\main\default\lwc\.eslintrc.json
        create gantt-salesforce-app\force-app\main\default\aura\.eslintrc.json
        create gantt-salesforce-app\scripts\soql\account.soql
        create gantt-salesforce-app\scripts\apex\hello.apex
        create gantt-salesforce-app\.eslintignore
        create gantt-salesforce-app\.forceignore
        create gantt-salesforce-app\.gitignore
        create gantt-salesforce-app\.prettierignore
        create gantt-salesforce-app\.prettierrc
        create gantt-salesforce-app\jest.config.js
        create gantt-salesforce-app\package.json
~~~

Go to the created project:

~~~js
$ cd gantt-salesforce-app
~~~


Step 2. Authorization
----------

[Authorize an Org](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_web_flow.htm) using the Web Server Flow:

~~~js
$ sfdx org login web -d

Successfully authorized ... with org ID ...
~~~

Update your project configuration file (*sfdx-project.json*). Set the "sfdcLoginUrl" parameter to your "My Domain URL". You can find your org’s "My Domain URL" on the "My Domain" setup page. For example:

![](desktop/sf_mydomain.png)

{{snippet gantt-salesforce-app/sfdx-project.json}}
~~~js
"sfdcLoginUrl" : "https://xbs2-dev-ed.my.salesforce.com"
~~~

Create a Scratch Org:

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

Step 3. Adding Gantt to Salesforce
------------

In order to start using the library, we need to upload it inside Salesforce as a Static
Resource. Thus, open your scratch org:

~~~js
$ sfdx org open
~~~

Now, open the "Static Resources" tab and press the "New" button

![](desktop/sf_static_resources.png)

Give it a meaningful name (we use "dhtmlxgantt7111"), choose the ZIP archive with the library itself (the archive must contain the *dhtmlxgantt.js* and *dhtmlxgantt.css* files), and choose the "Public" Cache Control in order to improve the performance. Press the "Save" button.

![](desktop/sf_gantt_file.png)

Now we have dhtmlxGantt inside Salesforce.

![](desktop/sf_gantt_in_sf.png)

Step 4. Creating Data Model
-------------

The core dhtmlxGantt entities are Tasks and Links. A good approach is to store all properties of dhtmlxGantt entities as plain JSON inside Salesforce. Let's create Tasks and Links objects. Open the Object Manager and select "Create" then "Custom Object":

![](desktop/sf_object_manager.png)

### **Task object**

Give the name for the task object, let it be *GanttTask/GanttTasks*.

![](desktop/sf_task_object.png)

{{note
The record name must match the object name, for example:

Object Name: GanttTask => Record Name: GanttTask Name
}}

Press the "Save" button.

After the object is created, open the "Fields & Relationships" tab. Press the "New" button.

![](desktop/sf_fields.png)

- **Duration**

Select "Number" as the Data Type and press the "Next" button. 

![](desktop/sf_data_type.png)

Name it "Duration". It stores the JSON-serialized Task properties. Press the "Next" button until the "Save & New" button is available.

![](desktop/sf_new_field.png)

Press the "Next" button (accepting all default settings) until the "Save & New" button is available.

- **Parent**

Create a "Parent" field. Select "Text" as the Data Type.

![](desktop/sf_parent.png)

Press the "Next" button (accepting all default settings) until the "Save & New" button is available.

- **Progress**

Create a "Progress" field. Select "Number" as the Data Type.

![](desktop/sf_progress.png)

Press the "Next" button (accepting all default settings) until the "Save & New" button is available.


- **Start date**

Create a "Start Date" field. Select "Date/Time" as the Data Type.

![](desktop/sf_start_date.png)

Press the "Next" button (accepting all default settings) until the "Save" button is available.

In the end it should look like this:

![](desktop/sf_gantttask.png)


### **Link object**


Open the Object Manager and select "Create" then "Custom Object":

Give the name for the link object, let it be *GanttLink/GanttLinks*.

![](desktop/sf_link_object.png)

{{note
The record name must match the object name, for example:

Object Name: GanttLink => Record Name: GanttLink Name
}}

Next, create the required fields.

- **Source**

Create a "Source" field. Select "Text" as the Data Type.

![](desktop/sf_source.png)

Press the "Next" button (accepting all default settings) until the "Save & New" button is available.

- **Target**

Create a "Target" field. Select "Text" as the Data Type.

![](desktop/sf_target.png)

Press the "Next" button (accepting all default settings) until the "Save & New" button is available.

- **Type**

Create a "Type" field. Select "Text" as the Data Type.

![](desktop/sf_type.png)

Press the "Next" button (accepting all default settings) until the "Save" button is available.

In the end it should look like this:

![](desktop/sf_ganttlink.png)


Step 5. Creating a Lightning Web Component
---------------------------------------------

To create a Lightning Web Component, run the command:

~~~js
$ sfdx lightning generate component --type lwc -n gantt -d force-app/main/default/lwc

target dir = 
C:\Users\User\source\salesforce\gantt-salesforce-app\force-app\main\default\lwc
   create force-app\main\default\lwc\gantt\gantt.js
   create force-app\main\default\lwc\gantt\gantt.html
   create force-app\main\default\lwc\gantt\gantt.js-meta.xml
~~~

Change the component definition in *gantt.js-meta.xml* to expose it in the Lightning App Builder:

{{snippet force-app/main/default/lwc/gantt/gantt.js-meta.xml}}
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

Open *gantt.html* and add the following code into it:

{{snippet force-app/main/default/lwc/gantt/gantt.html}}
~~~html
<template>
    <div class="thegantt" lwc:dom="manual" style='width: 100%;'></div>
</template>
~~~

Open *gantt.js* and add the following code into it:

{{snippet force-app/main/default/lwc/gantt/gantt.js}}
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

Step 6. Creating an Apex class
----------------------------------

The next step is to create a class that will enable interactions between the Lighting Component and our data model.

~~~js
$ sfdx apex generate class -n GanttData -d force-app/main/default/classes

target dir = 
C:\Users\User\salesforce\gantt-salesforce-app\force-app\main\default\classes
   create force-app\main\default\classes\GanttData.cls
   create force-app\main\default\classes\GanttData.cls-meta.xml
~~~

After creation, open *GanttData.cls* and add the following code into it:

{{snippet force-app/main/default/classes/GanttData.cls}}
~~~js
public with sharing class GanttData {
 
    @RemoteAction
    @AuraEnabled(cacheable=true)
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

Pull Source from the Scratch Org to Your Project

~~~js
$ sfdx project retrieve start
~~~

and then push the sources to the Scratch Org

~~~js
$ sfdx project deploy start
~~~

Step 7. Creating Lightning Page
---------------

Open the "Lightning App Builder", create a new Lightning Page.

![](desktop/sf_lightning_app.png)

Pick “App Page” then page name and layout.

![](desktop/sf_new_page.png)

![](desktop/sf_page_name.png)

![](desktop/sf_page_layout.png)

You should see a Gantt custom component available for the new page. Append it to any region and save.

![](desktop/sf_gantt.png)

Activate the page.

![](desktop/sf_saved_page.png)

Save the changes.

![](desktop/sf_activate_gantt.png)

![](desktop/sf_add_page_to_nm.png)

![](desktop/sf_gantt_page.png)

Open the application page. It should be accessible in the app launcher if you click it and type Gantt.

![](desktop/sf_app_launcher.png)

If everything went well, you should see a simple gantt demo running in the Lightning Page.

![](desktop/sf_final_page.png)


Application security
---------------------

Gantt doesn't provide any means of preventing an application from various threats, such as SQL injections or XSS and CSRF attacks. It is important that responsibility for keeping an application safe is on the developers implementing the application. Read the details [in the corresponding article](desktop/app_security.md). Salesforce is built with security to protect your data and applications. You can also implement your own security scheme to reflect the structure and needs of your organization. For more information, please see the [Salesforce Security Guide](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/salesforce_security_guide.htm). [Here](https://developer.salesforce.com/docs/atlas.en-us.secure_coding_guide.meta/secure_coding_guide/secure_coding_lightning_security.htm) you can find out what do you need to be secure.

Trouble shooting
---------------------

In case you've completed the above steps to implement Gantt integration with Salesforce, but Gantt doesn't render tasks and links on a page, have a look at the [Troubleshooting Backend Integration Issues](desktop/troubleshooting.md) article. It describes the ways of identifying the roots of the problems.



What's next
------------

Now you have a fully functioning gantt. You can view the full code on [GitHub](https://github.com/DHTMLX/salesforce-gantt-demo), clone or download it and use it for your projects.

You can also check [guides on the numerous features of gantt](desktop/guides.md) or tutorials on [integrating Gantt with other backend frameworks](desktop/howtostart_guides.md).