---
title: "dhtmlxGantt с Salesforce LWC"
sidebar_label: "Salesforce"
---

# dhtmlxGantt с Salesforce LWC


В этом руководстве описывается, как интегрировать dhtmlxGantt в [Salesforce Lightning Web Component](https://developer.salesforce.com/docs/platform/lwc/guide).

Если вы работаете с другой технологией, ниже представлены другие варианты интеграции:

- [dhtmlxGantt с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)

Процесс включает использование [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli) для создания Lightning Web Component и его деплоя в организацию Salesforce. Для более удобной разработки рекомендуется установить [Salesforce Extension Pack](https://marketplace.visualstudio.com/items?itemName="salesforce.salesforcedx-vscode)" в Visual Studio Code.

:::note
Полный исходный код размещён на [GitHub](https://github.com/DHTMLX/salesforce-gantt-demo).
:::

Также доступен видеоурок, демонстрирующий создание диаграммы Gantt с помощью Salesforce LWC.

<iframe width="704" height="400" src="https://www.youtube.com/embed/1nXl9jfMdto" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Требования


Убедитесь, что [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli) установлен. Если нет, воспользуйтесь [этой инструкцией](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm) для установки.

## Шаг 1. Создание проекта


Если у вас ещё нет аккаунта, создайте бесплатную учётную запись разработчика, [зарегистрировавшись](https://developer.salesforce.com/). Подробнее - в [этом руководстве](https://webkul.com/blog/create-free-developer-account-in-salesforce/).

В Salesforce воспользуйтесь строкой поиска слева для поиска и выбора *Dev Hub*:

![](/img/sf_devhub.png)

На открывшейся странице настроек включите функцию *Dev Hub*:

![](/img/sf_enabledh.png)

Затем создайте директорию для вашего проекта Salesforce DX:

~~~js
$ mkdir ~/salesforce
~~~

Сгенерируйте проект Salesforce DX с помощью CLI:

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

Перейдите в только что созданную папку проекта:

~~~js
$ cd gantt-salesforce-app
~~~

## Шаг 2. Авторизация


Используйте Web Server Flow для [авторизации в организации](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_web_flow.htm):

~~~js
$ sfdx org login web -d

Successfully authorized ... with org ID ...
~~~

Далее обновите файл конфигурации проекта (*sfdx-project.json*), установив параметр "sfdcLoginUrl" на "My Domain URL" вашей организации. Найти этот URL можно на странице настроек "My Domain". Например:

![](/img/sf_mydomain.png)

**gantt-salesforce-app/sfdx-project.json**
~~~js
"sfdcLoginUrl" : "https://xbs2-dev-ed.my.salesforce.com"
~~~

Создайте Scratch Org с помощью следующей команды:

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

## Шаг 3. Добавление Gantt в Salesforce


Чтобы использовать библиотеку, её необходимо загрузить в Salesforce как Static Resource. Откройте ваш scratch org:

~~~js
$ sfdx org open
~~~

Перейдите на вкладку "Static Resources" и нажмите кнопку "New":

![](/img/sf_static_resources.png)

Укажите понятное имя (например, "dhtmlxgantt7111"), загрузите ZIP-архив с файлами библиотеки (*dhtmlxgantt.js* и *dhtmlxgantt.css*), и установите Cache Control в значение "Public" для повышения производительности. Затем сохраните изменения.

![](/img/sf_gantt_file.png)

Теперь библиотека dhtmlxGantt доступна внутри Salesforce.

![](/img/sf_gantt_in_sf.png)

## Шаг 4. Создание модели данных


Основные компоненты dhtmlxGantt - это задачи (Tasks) и связи (Links). Практичный способ их хранения - сохранять их свойства в формате JSON в Salesforce. Начните с создания пользовательских объектов для задач и связей. Перейдите в Object Manager, затем выберите "Create" и выберите "Custom Object":

![](/img/sf_object_manager.png)

### **Объект задачи (Task object)**

Назовите объект задачи, например, *GanttTask* или *GanttTasks*.

![](/img/sf_task_object.png)

:::note
Убедитесь, что имя записи соответствует имени объекта, например:

Object Name: GanttTask => Record Name: GanttTask Name
:::

Сохраните новый объект.

Затем откройте вкладку "Fields & Relationships" и нажмите "New" для добавления полей:

![](/img/sf_fields.png)

- **Duration**

Выберите тип данных "Number" и продолжайте.

![](/img/sf_data_type.png)

Назовите поле "Duration". Это поле будет содержать сериализованные в JSON свойства задачи. Нажимайте "Next" до появления кнопки "Save & New".

![](/img/sf_new_field.png)

Примите настройки по умолчанию, нажимая "Next", пока не сможете сохранить или добавить новое поле.

- **Parent**

Создайте поле "Parent" с типом данных "Text".

![](/img/sf_parent.png)

Проходите шаги, нажимая "Next", до появления кнопки "Save & New".

- **Progress**

Добавьте поле "Progress", выбрав тип данных "Number".

![](/img/sf_progress.png)

Продолжайте нажимать "Next", пока не сможете сохранить или добавить следующее поле.

- **Start date**

Создайте поле "Start Date" с типом данных "Date/Time".

![](/img/sf_start_date.png)

Пройдите по умолчанию все шаги до кнопки "Save".

В результате поля вашего объекта должны выглядеть так:

![](/img/sf_gantttask.png)

### **Объект ссылок**

Начните с открытия Object Manager и выберите "Create", затем "Custom Object":

Назовите объект ссылок как *GanttLink/GanttLinks*.

![](/img/sf_link_object.png)

:::note
Убедитесь, что имя записи соответствует имени объекта, например:

Object Name: GanttLink => Record Name: GanttLink Name
:::

Далее создайте необходимые поля.

- **Source**

Добавьте поле "Source" и выберите "Text" в качестве Data Type.

![](/img/sf_source.png)

Нажимайте "Next" (оставляя настройки по умолчанию), пока не появится кнопка "Save & New".

- **Target**

Добавьте поле "Target" с типом данных "Text".

![](/img/sf_target.png)

Нажимайте "Next" (принимая настройки по умолчанию), пока не станет доступна кнопка "Save & New".

- **Type**

Добавьте поле "Type", также с типом данных "Text".

![](/img/sf_type.png)

Нажимайте "Next" (принимая значения по умолчанию), пока не появится кнопка "Save".

В итоге должно получиться следующее:

![](/img/sf_ganttlink.png)


## Шаг 5. Создание Lightning Web Component


Для создания Lightning Web Component выполните следующую команду:

~~~js
$ sfdx lightning generate component --type lwc -n gantt -d force-app/main/default/lwc

target dir = 
C:UsersUsersourcesalesforcegantt-salesforce-appforce-appmaindefaultlwc
   create force-appmaindefaultlwcganttgantt.js
   create force-appmaindefaultlwcganttgantt.html
   create force-appmaindefaultlwcganttgantt.js-meta.xml
~~~

Обновите определение компонента в *gantt.js-meta.xml*, чтобы сделать его доступным в Lightning App Builder:

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

Откройте *gantt.html* и вставьте следующий код:

**force-app/main/default/lwc/gantt/gantt.html**
~~~html
<template>
    <div class="thegantt" lwc:dom="manual" style='width: 100%;'></div>
</template>
~~~

В *gantt.js* добавьте следующий код:

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

## Шаг 6. Создание Apex класса


Далее создайте класс, который будет обеспечивать связь между Lightning компонентом и моделью данных.

~~~js
$ sfdx apex generate class -n GanttData -d force-app/main/default/classes

target dir = 
C:UsersUsersalesforcegantt-salesforce-appforce-appmaindefaultclasses
   create force-appmaindefaultclassesGanttData.cls
   create force-appmaindefaultclassesGanttData.cls-meta.xml
~~~

После создания класса откройте *GanttData.cls* и добавьте следующий код:

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

Выполните команду для получения исходников из Scratch Org в ваш проект:

~~~js
$ sfdx project retrieve start
~~~

Затем задеплойте исходники обратно в Scratch Org:

~~~js
$ sfdx project deploy start
~~~

## Шаг 7. Создание Lightning Page


Откройте "Lightning App Builder" и создайте новую Lightning Page.

![](/img/sf_lightning_app.png)

Выберите "App Page" и укажите имя страницы и макет.

![](/img/sf_new_page.png)

![](/img/sf_page_name.png)

![](/img/sf_page_layout.png)

Кастомный компонент Gantt должен быть доступен для новой страницы. Добавьте его в любой раздел и сохраните.

![](/img/sf_gantt.png)

Активируйте страницу.

![](/img/sf_saved_page.png)

Сохраните изменения.

![](/img/sf_activate_gantt.png)

![](/img/sf_add_page_to_nm.png)

![](/img/sf_gantt_page.png)

Откройте страницу приложения. Она будет доступна через app launcher по поиску Gantt.

![](/img/sf_app_launcher.png)

Если всё настроено верно, на Lightning Page появится простой пример Gantt.

![](/img/sf_final_page.png)


## Безопасность приложения


Сам Gantt не содержит встроенных средств защиты от угроз, таких как SQL-инъекции, XSS или CSRF-атаки. За безопасность приложения отвечают разработчики, внедряющие его. Подробнее см. [в соответствующей статье](guides/app-security.md). Salesforce предоставляет мощные инструменты для защиты ваших данных и приложений. Вы также можете адаптировать подход к безопасности под структуру и требования вашей организации. Дополнительные рекомендации смотрите в [Salesforce Security Guide](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/salesforce_security_guide.htm). Информация по защите Lightning компонентов доступна [здесь](https://developer.salesforce.com/docs/atlas.en-us.secure_coding_guide.meta/secure_coding_guide/secure_coding_lightning_security.htm).

## Устранение неполадок


Если вы выполнили все шаги, но диаграмма Gantt не отображает задачи и связи на странице, обратитесь к статье [Решение проблем с интеграцией бэкенда](guides/troubleshooting.md). В ней описаны методы диагностики и устранения типовых проблем.


## Что дальше


Когда Gantt полностью настроен, вы можете ознакомиться с полным кодом на [GitHub](https://github.com/DHTMLX/salesforce-gantt-demo), где его можно клонировать или скачать для поддержки ваших проектов.

Также рекомендуем изучить [руководства по различным функциям Gantt](guides.md) или туториалы по [интеграции Gantt с другими backend-фреймворками](integrations/howtostart-guides.md).
