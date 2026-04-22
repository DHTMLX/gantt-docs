---
title: "dhtmlxGantt 与 Salesforce LWC"
sidebar_label: "Salesforce"
---

# dhtmlxGantt 与 Salesforce LWC

本教程描述了如何将 dhtmlxGantt 集成到 Salesforce 的 Lightning Web Component 中。

请在以下的在线演示中查看与 Salesforce LWC 集成 DHTMLX 组件的示例：[在线演示]（https://dhtmlx-dev-ed.develop.lightning.force.com/）
演示的源代码在 [GitHub 上提供](https://github.com/DHTMLX/salesforce-lwc-demo)。

如果你使用的是其他技术，请查看下方可用的集成变体列表：

- [dhtmlxGantt 与 ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt 与 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt 与 Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt 与 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt 与 PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt 与 PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt 与 Ruby on Rails](integrations/other/howtostart-ruby.md)

我们将使用 [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli) 来创建 Lightning Web Component 并将其上传到一个组织中。你也可以在 Visual Studio Code 中安装 [Salesforce Extension Pack](https://marketplace.visualstudio.com/items?itemName="salesforce.salesforcedx-vscode)" 以便在开发组织中工作。

:::note
本教程所创建的演示的完整源代码 [可在 GitHub 上获取](https://github.com/DHTMLX/salesforce-gantt-demo)。
:::

你可以观看视频指南，演示如何用 Salesforce LWC 创建甘特图。

<iframe width="704" height="400" src="https://www.youtube.com/embed/1nXl9jfMdto" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 前提条件

如果你还没有安装，请安装 [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli)。安装指南请参阅 [这篇文章](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)。

## 第 1 步：创建一个项目

如果你还没有开发者账户，请 [注册](https://developer.salesforce.com/) 一个免费账户。安装指南请参考 [这篇文章](https://webkul.com/blog/create-free-developer-account-in-salesforce/)。

在左侧的搜索栏中，找到并选择 *Dev Hub*：

![sf_devhub](/img/sf_devhub.png)

在新设置窗口中，选择 *Enable Dev Hub*：

![sf_enabledh](/img/sf_enabledh.png)

让我们为 Salesforce DX 项目创建一个基础目录：

~~~js
$ mkdir ~/salesforce
~~~

通过 CLI 创建一个 Salesforce DX 项目：

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

前往创建的项目：

~~~js
$ cd gantt-salesforce-app
~~~


## 第 2 步：授权

使用 Web 服务器流 [Authorize an Org](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_web_flow.htm)：

~~~js
$ sfdx org login web -d

Successfully authorized ... with org ID ...
~~~

更新你的项目配置文件 (*sfdx-project.json*)。将 "sfdcLoginUrl" 参数设置为你的 “My Domain URL”。你可以在 “My Domain” 设置页面找到组织的“域名”URL。例如：

![sf_mydomain](/img/sf_mydomain.png)


~~~js title="gantt-salesforce-app/sfdx-project.json"
"sfdcLoginUrl" : "https://xbs2-dev-ed.my.salesforce.com"
~~~

创建一个 Scratch Org：

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

## 第 3 步：将甘特组件添加到 Salesforce

为了开始使用该库，我们需要将其上传到 Salesforce 作为一个静态资源（Static Resource）。因此，打开你的 scratch org：

~~~js
$ sfdx org open
~~~

现在，打开 “Static Resources” 标签并点击 “New” 按钮

![sf_static_resources](/img/sf_static_resources.png)

给它起一个有意义的名称（我们使用 "dhtmlxgantt7111"），选择包含库本身的 ZIP 归档（该归档必须包含 *dhtmlxgantt.js* 与 *dhtmlxgantt.css* 文件），并选择 "Public" 缓存控制以提高性能。点击 “Save” 按钮。

![sf_gantt_file](/img/sf_gantt_file.png)

现在我们在 Salesforce 内部拥有 dhtmlxGantt。

![sf_gantt_in_sf](/img/sf_gantt_in_sf.png)

## 第 4 步：创建数据模型

dhtmlxGantt 的核心实体是 Tasks（任务）和 Links（链接）。一个好的做法是将 dhtmlxGantt 实体的所有属性作为纯 JSON 存储在 Salesforce 中。让我们创建 Tasks 与 Links 对象。打开对象管理器并选择 “Create” 然后选择 “Custom Object”：

![sf_object_manager](/img/sf_object_manager.png)

### **Task 对象**

为任务对象命名，设为 *GanttTask/GanttTasks*。

![sf_task_object](/img/sf_task_object.png)

:::note
记录名必须与对象名称匹配，例如：

对象名称: GanttTask => 记录名称: GanttTask Name
:::

点击 “Save” 按钮。

对象创建后，打开 “Fields & Relationships” 选项卡。点击 “New” 按钮。

![sf_fields](/img/sf_fields.png)

- **Duration**

将数据类型选择为 “Number”，然后点击 “Next”。 

![sf_data_type](/img/sf_data_type.png)

将其命名为 “Duration”。它用于存储 JSON 序列化的任务属性。点击直到出现 “Save & New” 按钮。

![sf_new_field](/img/sf_new_field.png)

点击 “Next” 按钮（接受默认设置），直到出现 “Save & New” 按钮。

- **Parent**

创建一个 “Parent” 字段。将数据类型选为 “Text”。

![sf_parent](/img/sf_parent.png)

点击 “Next” 按钮（接受默认设置），直到出现 “Save & New” 按钮。

- **Progress**

创建一个 “Progress” 字段。将数据类型选为 “Number”。

![sf_progress](/img/sf_progress.png)

点击 “Next” 按钮（接受默认设置），直到出现 “Save & New” 按钮。

- **Start date**

创建一个 “Start Date” 字段。将数据类型选为 “Date/Time”。

![sf_start_date](/img/sf_start_date.png)

点击 “Next” 按钮（接受默认设置），直到出现 “Save” 按钮。

最后它应该看起来像这样：

![sf_gantttask](/img/sf_gantttask.png)


### **Link 对象**

打开对象管理器，选择 “Create” 然后 “Custom Object”：

为链接对象命名，设为 *GanttLink/GanttLinks*。
 
![sf_link_object](/img/sf_link_object.png)

:::note
记录名必须与对象名称匹配，例如：

对象名称: GanttLink => 记录名称: GanttLink Name
:::

接下来，创建所需字段。

- **Source**

创建一个 “Source” 字段。将数据类型选择为 “Text”。

![sf_source](/img/sf_source.png)

点击 “Next” 按钮（接受默认设置），直到出现 “Save & New” 按钮。

- **Target**

创建一个 “Target” 字段。将数据类型选择为 “Text”。

![sf_target](/img/sf_target.png)

点击 “Next” 按钮（接受默认设置），直到出现 “Save & New” 按钮。

- **Type**

创建一个 “Type” 字段。将数据类型选择为 “Text”。

![sf_type](/img/sf_type.png)

点击 “Next” 按钮（接受默认设置），直到出现 “Save” 按钮。

最终它应看起来像这样：

![sf_ganttlink](/img/sf_ganttlink.png)


## 第 5 步：创建一个 Lightning Web Component

要创建一个 Lightning Web Component，请运行以下命令：

~~~js
$ sfdx lightning generate component --type lwc -n gantt -d force-app/main/default/lwc

target dir = 
C:UsersUsersourcesalesforcegantt-salesforce-appforce-appmaindefaultlwc
   create force-appmaindefaultlwcganttgantt.js
   create force-appmaindefaultlwcganttgantt.html
   create force-appmaindefaultlwcganttgantt.js-meta.xml
~~~

在 *gantt.js-meta.xml* 中将组件定义修改为在 Lightning App Builder 中进行暴露：


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

打开 *gantt.html*，在其中添加以下代码：


~~~html title="force-app/main/default/lwc/gantt/gantt.html"
<template>
    <div class="thegantt" lwc:dom="manual" style='width: 100%;'></div>
</template>
~~~

打开 *gantt.js*，在其中添加以下代码：


~~~js title="force-app/main/default/lwc/gantt/gantt.js"
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
import { LightningElement, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
import { createRecord, updateRecord, deleteRecord } from "lightning/uiRecordApi";
 
// 静态资源
import GanttFiles from "@salesforce/resourceUrl/dhtmlxgantt7111";
 
// 控制器
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
 
        // 使用 Enterprise 或 Ultimate 版本时，请取消注释以下行
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
 
        ///↓↓↓ 将变更保存回 SF 后端 ↓↓↓
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
                    gantt.config.readonly = true; // 在保存完成前禁止修改
                                                  // 以防修改
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

## 第 6 步：创建 Apex 类

下一步是创建一个类，用于在 Lightning 组件和我们的数据模型之间建立交互。

~~~js
$ sfdx apex generate class -n GanttData -d force-app/main/default/classes

target dir = 
C:UsersUsersalesforcegantt-salesforce-appforce-appmaindefaultclasses
   create force-appmaindefaultclassesGanttData.cls
   create force-appmaindefaultclassesGanttData.cls-meta.xml
~~~

创建后，打开 *GanttData.cls* 并将以下代码加入其中：


~~~js title="force-app/main/default/classes/GanttData.cls"
public with sharing class GanttData {
 
    @RemoteAction
    @AuraEnabled(cacheable="true)"
    public static Map<String, Object> getTasks() {
       
        // using SOQL 获取记录
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

将源代码从 Scratch Org 拉取到你的项目中

~~~js
$ sfdx project retrieve start
~~~

然后将源代码推送到 Scratch Org

~~~js
$ sfdx project deploy start
~~~

## 第 7 步：创建 Lightning 页面

打开 “Lightning App Builder”，创建一个新的 Lightning 页面。

![sf_lightning_app](/img/sf_lightning_app.png)

选择 "App Page"，然后输入页面名称和布局。

![sf_new_page](/img/sf_new_page.png)

![sf_page_name](/img/sf_page_name.png)

![sf_page_layout](/img/sf_page_layout.png)

你应该能在新页面看到一个 Gantt 自定义组件。将其追加到任意区域并保存。

![sf_gantt](/img/sf_gantt.png)

激活该页面。

![sf_saved_page](/img/sf_saved_page.png)

保存更改。

![sf_activate_gantt](/img/sf_activate_gantt.png)

![sf_add_page_to_nm](/img/sf_add_page_to_nm.png)

![sf_gantt_page](/img/sf_gantt_page.png)

打开应用程序页面。如果一切顺利，你应该能在 Lightning 页面中看到一个简单的甘特图示例。

![sf_app_launcher](/img/sf_app_launcher.png)

如果一切顺利，你应该能看到一个简单的甘特演示在 Lightning 页面中运行。

![sf_final_page](/img/sf_final_page.png)


## 应用安全性

Gantt 并未提供任何防止应用程序受到各种威胁（如 SQL 注入、XSS 和 CSRF 攻击）的机制。确保应用安全的责任应由实现该应用的开发人员承担。请在相应文章中阅读详细信息：[相应文章](guides/app-security.md) 。Salesforce 具有内置的安全性来保护你的数据和应用程序。你也可以实现你自己的安全方案，以符合你组织的结构和需求。欲了解更多信息，请参阅 [Salesforce 安全指南](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/salesforce_security_guide.htm)。 [在这里](https://developer.salesforce.com/docs/atlas.en-us.secure_coding_guide.meta/secure_coding_guide/secure_coding_lightning_security.htm) 你可以了解要确保安全需要做什么。

## 故障排除

如果你已经完成上述步骤以实现与 Salesforce 的 Gantt 集成，但 Gantt 页面上不会渲染任务和链接，请查看 [故障排除后端集成问题](guides/troubleshooting.md) 文章。它描述了识别问题根源的方法。


## 下一步

现在你已经拥有一个完整可运行的甘特图。你可以在 [GitHub](https://github.com/DHTMLX/salesforce-gantt-demo) 上查看完整代码，克隆或下载后用于你的项目。

你也可以查看 [关于甘特图众多特性的指南](guides.md) 或 [将 Gantt 与其他后端框架集成的教程](integrations/howtostart-guides.md)。
