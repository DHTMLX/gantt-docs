---
title: "dhtmlxGantt 与 Salesforce LWC 集成"
sidebar_label: "Salesforce LWC"
---

# dhtmlxGantt 与 Salesforce LWC 集成

本教程将介绍如何将 dhtmlxGantt 集成到 [Salesforce Lightning Web Component](https://developer.salesforce.com/docs/platform/lwc/guide) 中。

如果你使用的是其他技术，可以参考以下集成方案:

- [dhtmlxGantt와 ASP.NET Core 사용하기](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt와 Node.js 연동하기](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt와 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt와 PHP: Laravel 연동](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt와 PHP:Slim 연동하기](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)

集成过程涉及使用 [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli) 创建 Lightning Web Component 并将其部署到 Salesforce 组织。为了获得更流畅的开发体验，建议在 Visual Studio Code 中安装 [Salesforce Extension Pack](https://marketplace.visualstudio.com/items?itemName="salesforce.salesforcedx-vscode)。"

:::note
完整源码已[托管在 GitHub](https://github.com/DHTMLX/salesforce-gantt-demo)。
:::

此外，还提供了视频教程，演示如何使用 Salesforce LWC 构建 Gantt 图表。

<iframe width="704" height="400" src="https://www.youtube.com/embed/1nXl9jfMdto" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 前置条件

请确保已经安装了 [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli)。如未安装，可参考[本指南](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)进行安装。

## 步骤 1. 创建项目

如果还没有开发者账号，可以[注册](https://developer.salesforce.com/)一个免费的开发者账号。具体操作可参考[本指南](https://webkul.com/blog/create-free-developer-account-in-salesforce/)。

在 Salesforce 中，使用左侧搜索栏找到并选择 *Dev Hub*:

![](/img/sf_devhub.png)

在打开的设置页面中，启用 *Dev Hub* 功能:

![](/img/sf_enabledh.png)

接下来，为 Salesforce DX 项目创建一个目录:

~~~js
$ mkdir ~/salesforce
~~~

使用 CLI 生成 Salesforce DX 项目:

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

进入新创建的项目文件夹:

~~~js
$ cd gantt-salesforce-app
~~~

## 步骤 2. 授权

使用 Web Server Flow [授权 Org](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_web_flow.htm):

~~~js
$ sfdx org login web -d

Successfully authorized ... with org ID ...
~~~

然后，在项目的配置文件（*sfdx-project.json*）中，将 "sfdcLoginUrl" 参数设置为组织的 "My Domain URL"。该 URL 可在 "My Domain" 设置页面找到。例如:

![](/img/sf_mydomain.png)

**gantt-salesforce-app/sfdx-project.json**
~~~js
"sfdcLoginUrl" : "https://xbs2-dev-ed.my.salesforce.com"
~~~

使用以下命令创建 Scratch Org:

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

## 步骤 3. 向 Salesforce 添加 Gantt

要使用该库，需要将其作为静态资源上传到 Salesforce。打开你的 scratch org:

~~~js
$ sfdx org open
~~~

进入 "Static Resources" 标签页，点击 "New" 按钮:

![](/img/sf_static_resources.png)

填写清晰的名称（如 "dhtmlxgantt7111"），上传包含库文件（*dhtmlxgantt.js* 和 *dhtmlxgantt.css*）的 ZIP 压缩包，并将 Cache Control 设置为 "Public" 以提升性能。然后保存更改。

![](/img/sf_gantt_file.png)

现在，dhtmlxGantt 库已经可以在 Salesforce 内部使用。

![](/img/sf_gantt_in_sf.png)

## 步骤 4. 创建数据模型

dhtmlxGantt 的主要组件是 Tasks 和 Links。一个实用的处理方式是将它们的属性以 JSON 格式存储在 Salesforce 中。首先为 Tasks 和 Links 创建自定义对象。在 Object Manager 中，选择 "Create"，然后选择 "Custom Object":

![](/img/sf_object_manager.png)

### **任务对象（Task object）**

为任务对象命名，例如 *GanttTask* 或 *GanttTasks*。

![](/img/sf_task_object.png)

:::note
请确保记录名称与对象名称一致，例如:

Object Name: GanttTask => Record Name: GanttTask Name
:::

保存新对象。

随后，打开 "Fields & Relationships" 标签页，点击 "New" 添加字段:

![](/img/sf_fields.png)

- **Duration**

选择 "Number" 作为数据类型，然后继续。

![](/img/sf_data_type.png)

将字段命名为 "Duration"。该字段用于存储 JSON 序列化的 Task 属性。持续点击 "Next" 直到出现 "Save & New" 按钮。

![](/img/sf_new_field.png)

接受默认设置，点击 "Next" 直到可以保存或添加新字段。

- **Parent**

创建 "Parent" 字段，数据类型选择 "Text"。

![](/img/sf_parent.png)

继续点击 "Next" 直到可用 "Save & New" 按钮。

- **Progress**

添加 "Progress" 字段，数据类型选择 "Number"。

![](/img/sf_progress.png)

继续点击 "Next" 直到可以保存或添加新字段。

- **Start date**

创建 "Start Date" 字段，数据类型选择 "Date/Time"。

![](/img/sf_start_date.png)

点击默认选项，直到出现 "Save" 按钮。

最终，你的对象字段应如下所示:

![](/img/sf_gantttask.png)


### **Link 对象**

首先，打开对象管理器，选择"创建"，然后选择"自定义对象":

将该链接对象命名为 *GanttLink/GanttLinks*。

![](/img/sf_link_object.png)

:::note
请确保记录名称与对象名称相对应，例如:

对象名称:GanttLink => 记录名称:GanttLink Name
:::

继续创建所需的字段。

- **Source**

添加一个名为"Source"的字段，并选择"文本"作为数据类型。

![](/img/sf_source.png)

点击"下一步"（保持默认设置），直到出现"保存并新建"按钮。

- **Target**

添加一个名为"Target"的字段，数据类型同样选择"文本"。

![](/img/sf_target.png)

点击"下一步"（接受默认设置），直到可以看到"保存并新建"按钮。

- **Type**

添加一个名为"Type"的字段，数据类型同样选择"文本"。

![](/img/sf_type.png)

点击"下一步"（接受默认设置），直到出现"保存"按钮。

最后，页面应如下所示:

![](/img/sf_ganttlink.png)

## 步骤 5. 创建 Lightning Web 组件

要生成 Lightning Web 组件，运行以下命令:

~~~js
$ sfdx lightning generate component --type lwc -n gantt -d force-app/main/default/lwc

target dir = 
C:UsersUsersourcesalesforcegantt-salesforce-appforce-appmaindefaultlwc
   create force-appmaindefaultlwcganttgantt.js
   create force-appmaindefaultlwcganttgantt.html
   create force-appmaindefaultlwcganttgantt.js-meta.xml
~~~

在 *gantt.js-meta.xml* 中更新组件定义，以便在 Lightning App Builder 中暴露该组件:

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

打开 *gantt.html*，插入以下代码:

**force-app/main/default/lwc/gantt/gantt.html**
~~~html
<template>
    <div class="thegantt" lwc:dom="manual" style='width: 100%;'></div>
</template>
~~~

在 *gantt.js* 中，添加如下代码:

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

## 步骤 6. 创建 Apex 类

接下来，创建一个类，用于处理 Lightning 组件与数据模型之间的通信。

~~~js
$ sfdx apex generate class -n GanttData -d force-app/main/default/classes

target dir = 
C:UsersUsersalesforcegantt-salesforce-appforce-appmaindefaultclasses
   create force-appmaindefaultclassesGanttData.cls
   create force-appmaindefaultclassesGanttData.cls-meta.xml
~~~

创建类后，打开 *GanttData.cls* 并添加以下代码:

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

将源代码从 Scratch Org 拉取到你的项目中:

~~~js
$ sfdx project retrieve start
~~~

然后将源代码重新部署到 Scratch Org:

~~~js
$ sfdx project deploy start
~~~

## 步骤 7. 创建 Lightning 页面

启动"Lightning App Builder"并创建一个新的 Lightning 页面。

![](/img/sf_lightning_app.png)

选择"App Page"，并填写页面名称和布局。

![](/img/sf_new_page.png)

![](/img/sf_page_name.png)

![](/img/sf_page_layout.png)

Gantt 自定义组件现在应可用于新页面。将其添加到任意分区并保存。

![](/img/sf_gantt.png)

激活该页面。

![](/img/sf_saved_page.png)

保存你的更改。

![](/img/sf_activate_gantt.png)

![](/img/sf_add_page_to_nm.png)

![](/img/sf_gantt_page.png)

打开应用页面。你可以通过在应用启动器中输入 Gantt 来访问它。

![](/img/sf_app_launcher.png)

如果一切配置正确，Lightning 页面上将显示一个简单的甘特图演示。

![](/img/sf_final_page.png)

## 应用安全性

Gantt 本身不提供针对 SQL 注入、XSS 或 CSRF 攻击等威胁的内置防护。确保应用安全是开发者的责任。更多详情请参阅[相关文档](guides/app-security.md)。Salesforce 提供了强大的安全功能来保护你的数据和应用。你也可以根据自己组织的结构和需求定制安全策略。如需进一步指导，请查阅 [Salesforce Security Guide](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/salesforce_security_guide.htm)。关于 Lightning 组件安全的更多信息，请参阅[此处](https://developer.salesforce.com/docs/atlas.en-us.secure_coding_guide.meta/secure_coding_guide/secure_coding_lightning_security.htm)。

## 故障排查

如果你已完成所有步骤，但页面上的甘特图未显示任务和链接，请参阅 [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) 文章。该文档提供了诊断和解决常见问题的方法。

## 后续步骤

完成甘特图配置后，你可以在 [GitHub](https://github.com/DHTMLX/salesforce-gantt-demo) 上查看完整代码，支持克隆或下载，用于你的项目。

此外，你还可以查阅[涵盖各种甘特功能的指南](guides.md)或[与其他后端框架集成甘特的教程](integrations/howtostart-guides.md)。
