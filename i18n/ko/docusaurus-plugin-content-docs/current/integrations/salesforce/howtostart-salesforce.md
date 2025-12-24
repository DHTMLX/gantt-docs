---
title: "dhtmlxGantt와 Salesforce LWC 연동하기"
sidebar_label: "Salesforce"
---

# dhtmlxGantt와 Salesforce LWC 연동하기


이 튜토리얼에서는 dhtmlxGantt를 [Salesforce Lightning Web Component](https://developer.salesforce.com/docs/platform/lwc/guide)에 통합하는 방법을 설명합니다.

다른 기술을 사용하고 있다면, 아래에서 다른 통합 옵션을 확인할 수 있습니다:

- [dhtmlxGantt와 ASP.NET Core 사용하기](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt와 Node.js 연동하기](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt와 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt와 PHP: Laravel 연동](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt와 PHP:Slim 연동하기](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)

이 과정은 [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli)를 사용하여 Lightning Web Component를 생성하고 이를 Salesforce org에 배포하는 것을 포함합니다. 개발을 좀 더 편리하게 진행하려면, Visual Studio Code에서 [Salesforce Extension Pack](https://marketplace.visualstudio.com/items?itemName="salesforce.salesforcedx-vscode)을" 설치하는 것이 좋습니다.

:::note
전체 소스 코드는 [GitHub에 호스팅되어 있습니다](https://github.com/DHTMLX/salesforce-gantt-demo).
:::

또한 Salesforce LWC를 사용하여 Gantt 차트를 만드는 방법을 시연하는 동영상 튜토리얼도 있습니다.

<iframe width="704" height="400" src="https://www.youtube.com/embed/1nXl9jfMdto" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 사전 준비 사항


[Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli)가 설치되어 있지 않다면 반드시 설치해야 합니다. 설치 방법은 [이 가이드](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)를 참고하세요.

## 1단계. 프로젝트 생성


아직 개발자 계정이 없다면 [회원가입](https://developer.salesforce.com/)을 통해 무료 개발자 계정을 생성하세요. 자세한 내용은 [이 가이드](https://webkul.com/blog/create-free-developer-account-in-salesforce/)를 참고할 수 있습니다.

Salesforce에서 왼쪽 검색창을 사용하여 *Dev Hub*를 찾은 후 선택하세요:

![](/img/sf_devhub.png)

설정 페이지가 열리면 *Dev Hub* 기능을 활성화하세요:

![](/img/sf_enabledh.png)

다음으로, Salesforce DX 프로젝트를 위한 디렉터리를 만듭니다:

~~~js
$ mkdir ~/salesforce
~~~

CLI를 사용하여 Salesforce DX 프로젝트를 생성하세요:

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

방금 생성한 프로젝트 폴더로 이동하세요:

~~~js
$ cd gantt-salesforce-app
~~~

## 2단계. 인증


Web Server Flow를 사용하여 [Org 인증](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_web_flow.htm)을 진행하세요:

~~~js
$ sfdx org login web -d

Successfully authorized ... with org ID ...
~~~

그런 다음, 프로젝트 구성 파일(*sfdx-project.json*)의 "sfdcLoginUrl" 파라미터를 org의 "My Domain URL"로 설정하세요. 이 URL은 "My Domain" 설정 페이지에서 확인할 수 있습니다. 예시:

![](/img/sf_mydomain.png)

**gantt-salesforce-app/sfdx-project.json**
~~~js
"sfdcLoginUrl" : "https://xbs2-dev-ed.my.salesforce.com"
~~~

아래 명령어로 Scratch Org를 생성합니다:

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

## 3단계. Salesforce에 Gantt 추가하기


라이브러리를 사용하려면 Salesforce에 Static Resource로 업로드해야 합니다. Scratch org를 엽니다:

~~~js
$ sfdx org open
~~~

"Static Resources" 탭으로 이동하여 "New" 버튼을 클릭하세요:

![](/img/sf_static_resources.png)

명확한 이름(예: "dhtmlxgantt7111")을 입력하고, 라이브러리 파일(*dhtmlxgantt.js* 및 *dhtmlxgantt.css*)이 포함된 ZIP 압축 파일을 업로드하세요. Cache Control을 "Public"으로 설정하여 성능을 향상시킵니다. 변경 사항을 저장하세요.

![](/img/sf_gantt_file.png)

이제 dhtmlxGantt 라이브러리를 Salesforce 내에서 사용할 수 있습니다.

![](/img/sf_gantt_in_sf.png)

## 4단계. 데이터 모델 생성


dhtmlxGantt의 주요 구성 요소는 Tasks와 Links입니다. 이들을 관리하는 실용적인 방법은 Salesforce 내에서 속성을 JSON으로 저장하는 것입니다. 먼저 Tasks와 Links에 대한 커스텀 오브젝트를 생성하세요. Object Manager로 이동하여 "Create"를 선택한 다음 "Custom Object"를 선택합니다:

![](/img/sf_object_manager.png)

### **Task 오브젝트**

Task 오브젝트의 이름을 *GanttTask* 또는 *GanttTasks*와 같이 지정하세요.

![](/img/sf_task_object.png)

:::note
레코드 이름이 오브젝트 이름과 일치하는지 확인하세요. 예:

Object Name: GanttTask => Record Name: GanttTask Name
:::

새 오브젝트를 저장하세요.

이후 "Fields & Relationships" 탭을 열고 "New"를 클릭하여 필드를 추가합니다:

![](/img/sf_fields.png)

- **Duration**

Data Type으로 "Number"를 선택하고 진행하세요.

![](/img/sf_data_type.png)

필드 이름을 "Duration"으로 지정하세요. 이 필드는 JSON 직렬화된 Task 속성을 저장합니다. "Next"를 계속 클릭하여 "Save & New" 버튼이 나타날 때까지 진행하세요.

![](/img/sf_new_field.png)

기본 설정을 그대로 두고 "Next"를 계속 클릭하여 저장 또는 새 필드 추가 화면으로 이동하세요.

- **Parent**

"Text" Data Type으로 "Parent" 필드를 생성하세요.

![](/img/sf_parent.png)

"Next"를 클릭하여 "Save & New" 버튼이 나올 때까지 진행하세요.

- **Progress**

"Number" Data Type으로 "Progress" 필드를 추가하세요.

![](/img/sf_progress.png)

"Next"를 계속 클릭하여 저장 또는 새 필드 추가 화면으로 이동하세요.

- **Start date**

"Date/Time" Data Type으로 "Start Date" 필드를 생성하세요.

![](/img/sf_start_date.png)

기본값을 그대로 두고 "Save" 버튼이 나올 때까지 클릭하세요.

마지막으로, 오브젝트 필드는 아래와 같이 보여야 합니다:

![](/img/sf_gantttask.png)


### **링크 오브젝트(Link object)**

Object Manager(오브젝트 관리자)를 열고 "Create(생성)" → "Custom Object(사용자 지정 오브젝트)"를 선택하세요.

링크 오브젝트의 이름을 *GanttLink/GanttLinks*로 지정합니다.

![](/img/sf_link_object.png)

:::note
레코드 이름이 오브젝트 이름과 일치하는지 확인하세요. 예를 들어:

Object Name: GanttLink => Record Name: GanttLink Name
:::

필요한 필드를 계속 생성합니다.

- **Source**

"Source" 필드를 추가하고 Data Type(데이터 유형)으로 "Text"를 선택합니다.

![](/img/sf_source.png)

"Next"(기본값 유지)를 클릭하여 "Save & New" 버튼이 나타날 때까지 진행합니다.

- **Target**

"Target" 필드를 추가하고 Data Type으로 "Text"를 선택합니다.

![](/img/sf_target.png)

"Next"(기본값 유지)를 클릭하여 "Save & New" 버튼이 나타날 때까지 진행합니다.

- **Type**

"Type" 필드를 추가하고 Data Type으로 "Text"를 선택합니다.

![](/img/sf_type.png)

"Next"(기본값 유지)를 클릭하여 "Save" 버튼이 나타날 때까지 진행합니다.

완료 후 아래와 같이 보여야 합니다:

![](/img/sf_ganttlink.png)

## 5단계. Lightning Web Component 생성


Lightning Web Component를 생성하려면 아래 명령어를 실행하세요:

~~~js
$ sfdx lightning generate component --type lwc -n gantt -d force-app/main/default/lwc

target dir = 
C:UsersUsersourcesalesforcegantt-salesforce-appforce-appmaindefaultlwc
   create force-appmaindefaultlwcganttgantt.js
   create force-appmaindefaultlwcganttgantt.html
   create force-appmaindefaultlwcganttgantt.js-meta.xml
~~~

*gant.js-meta.xml*에서 Lightning App Builder에서 노출되도록 컴포넌트 정의를 업데이트하세요:

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

*gant.html*을 열고 다음 코드를 추가하세요:

**force-app/main/default/lwc/gantt/gantt.html**
~~~html
<template>
    <div class="thegantt" lwc:dom="manual" style='width: 100%;'></div>
</template>
~~~

*gant.js*에 다음 코드를 추가하세요:

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

## 6단계. Apex 클래스 생성


다음으로, Lightning Component와 데이터 모델 간의 통신을 처리하는 클래스를 생성합니다.

~~~js
$ sfdx apex generate class -n GanttData -d force-app/main/default/classes

target dir = 
C:UsersUsersalesforcegantt-salesforce-appforce-appmaindefaultclasses
   create force-appmaindefaultclassesGanttData.cls
   create force-appmaindefaultclassesGanttData.cls-meta.xml
~~~

클래스 생성 후 *GanttData.cls*를 열고 다음 코드를 추가합니다:

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

Scratch Org에서 소스를 프로젝트로 가져옵니다:

~~~js
$ sfdx project retrieve start
~~~

이후 소스를 Scratch Org로 다시 배포합니다:

~~~js
$ sfdx project deploy start
~~~

## 7단계. Lightning 페이지 생성


"Lightning App Builder"를 실행하고 새 Lightning Page를 생성하세요.

![](/img/sf_lightning_app.png)

“App Page”를 선택하고 페이지 이름 및 레이아웃을 지정합니다.

![](/img/sf_new_page.png)

![](/img/sf_page_name.png)

![](/img/sf_page_layout.png)

Gantt 사용자 지정 컴포넌트가 새 페이지에 사용할 수 있습니다. 원하는 섹션에 추가하고 저장하세요.

![](/img/sf_gantt.png)

페이지를 활성화하세요.

![](/img/sf_saved_page.png)

변경 내용을 저장하세요.

![](/img/sf_activate_gantt.png)

![](/img/sf_add_page_to_nm.png)

![](/img/sf_gantt_page.png)

애플리케이션 페이지를 열면, 앱 런처에서 Gantt를 입력하여 접근할 수 있습니다.

![](/img/sf_app_launcher.png)

모든 설정이 올바르게 완료되면, Lightning Page에 간단한 간트 데모가 표시됩니다.

![](/img/sf_final_page.png)

## 애플리케이션 보안


Gantt 자체는 SQL 인젝션, XSS, CSRF 공격과 같은 위협에 대한 내장 보호 기능을 제공하지 않습니다. 애플리케이션 보안은 이를 구현하는 개발자의 책임입니다. 자세한 내용은 [관련 문서](guides/app-security.md)를 참고하세요. Salesforce는 데이터와 애플리케이션을 보호하기 위한 강력한 보안 기능을 제공합니다. 또한 조직의 구조와 요구 사항에 맞게 보안 접근 방식을 맞춤화할 수 있습니다. 자세한 안내는 [Salesforce Security Guide](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/salesforce_security_guide.htm)를 참고하세요. Lightning 컴포넌트 보안에 관한 추가 정보는 [여기](https://developer.salesforce.com/docs/atlas.en-us.secure_coding_guide.meta/secure_coding_guide/secure_coding_lightning_security.htm)에서 확인할 수 있습니다.

## 문제 해결


모든 단계를 완료했음에도 Gantt 차트가 페이지에 작업과 링크를 표시하지 않는 경우, [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) 문서를 참고하세요. 일반적인 문제를 진단하고 해결하는 방법을 제공합니다.

## 다음 단계


Gantt 구성이 완료되었다면, [GitHub](https://github.com/DHTMLX/salesforce-gantt-demo)에서 전체 코드를 확인하고 프로젝트에 복제하거나 다운로드할 수 있습니다.

또한 [다양한 gantt 기능에 대한 가이드](guides.md)나 [다른 백엔드 프레임워크와의 통합 튜토리얼](integrations/howtostart-guides.md)도 참고해 보세요.
