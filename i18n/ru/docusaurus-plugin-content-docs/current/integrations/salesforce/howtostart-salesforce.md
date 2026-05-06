--- 
title: "dhtmlxGantt с Salesforce LWC"
sidebar_label: "Salesforce"
---

# dhtmlxGantt с Salesforce LWC

Этот учебник описывает, как добавить dhtmlxGantt в [Salesforce Lightning Web Component](https://developer.salesforce.com/docs/platform/lwc/guide).

Проверьте [онлайн-демо](https://dhtmlx-dev-ed.develop.lightning.force.com/) по интеграции компонентов DHTMLX с Salesforce LWC (логин: *user*, пароль: *demo*). 
Исходный код демо-проекта [предоставлен на GitHub](https://github.com/DHTMLX/salesforce-lwc-demo).

Если вы используете другую технологию, ознакомьтесь со списком доступных вариантов интеграции ниже:

- [dhtmlxGantt с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)

Мы будем использовать Salesforce CLI ([Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli)) для создания Lightning Web Component и загрузки его в организацию. 
Вы также можете установить [Salesforce Extension Pack](https://marketplace.visualstudio.com/items?itemName="salesforce.salesforcedx-vscode)" в Visual Studio Code для работы с разработческими организациями. 

:::note
Полный исходный код демо, созданного в этом руководстве, доступен на [GitHub](https://github.com/DHTMLX/salesforce-gantt-demo).
::: 

Вы можете посмотреть видео-руководство, которое показывает, как создать диаграмму Gantt с Salesforce LWC.

<iframe width="704" height="400" src="https://www.youtube.com/embed/1nXl9jfMdto" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Требования

Установите [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli), если он у вас не установлен. См. [эту статью](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm) для инструкций по установке.

## Шаг 1. Создание проекта

[Зарегистрируйтесь](https://developer.salesforce.com/) для бесплатной учетной записи разработчика, если у вас её ещё нет. См. [эту статью](https://webkul.com/blog/create-free-developer-account-in-salesforce/) для инструкций по установке.

Слева в строке поиска найдите и выберите *Dev Hub*:

![sf_devhub](/img/sf_devhub.png)

В новом окне настроек выберите *Enable Dev Hub*:

![sf_enabledh](/img/sf_enabledh.png)

Давайте создадим базовую директорию для проекта Salesforce DX:

~~~js
$ mkdir ~/salesforce
~~~

Создайте проект Salesforce DX через CLI:

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

Перейдите в созданный проект:

~~~js
$ cd gantt-salesforce-app
~~~

## Шаг 2. Авторизация

[Авторизуйте Org](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_web_flow.htm) с использованием Web Server Flow:

~~~js
$ sfdx org login web -d

Successfully authorized ... with org ID ...
~~~

Обновите файл конфигурации проекта (*sfdx-project.json*). Установите параметр "sfdcLoginUrl" равным вашему "My Domain URL". Найти URL вашего домена можно на странице настройки "My Domain". Например:

![sf_mydomain](/img/sf_mydomain.png)


~~~js title="gantt-salesforce-app/sfdx-project.json"
"sfdcLoginUrl" : "https://xbs2-dev-ed.my.salesforce.com"
~~~

Создайте Scratch Org:

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

Чтобы начать использовать библиотеку, её нужно загрузить в Salesforce как Static Resource. Откройте свою scratch org:

~~~js
$ sfdx org open
~~~

Затем откройте вкладку "Static Resources" и нажмите кнопку "New"

![sf_static_resources](/img/sf_static_resources.png)

Дайте значимое имя (мы используем "dhtmlxgantt7111"), выберите ZIP-архив с самой библиотекой (архив должен содержать файлы *dhtmlxgantt.js* и *dhtmlxgantt.css*), и выберите режим кэширования "Public" для повышения производительности. Нажмите кнопку "Save".

![sf_gantt_file](/img/sf_gantt_file.png)

Теперь у нас есть dhtmlxGantt внутри Salesforce.

![sf_gantt_in_sf](/img/sf_gantt_in_sf.png)

## Шаг 4. Создание модели данных

Основные сущности dhtmlxGantt — Tasks и Links. Хороший подход — сохранять все свойства сущностей dhtmlxGantt в виде простого JSON внутри Salesforce. Давайте создадим объекты Tasks и Links. Откройте Object Manager и выберите "Create", затем "Custom Object":

![sf_object_manager](/img/sf_object_manager.png)

### **Объект Task** (Task object)

Укажите имя для объекта задачи, пусть это будет *GanttTask/GanttTasks*.

![sf_task_object](/img/sf_task_object.png)

:::note
Имя записи должно совпадать с именем объекта, например:

Object Name: GanttTask => Record Name: GanttTask Name
::: 

Нажмите кнопку "Save".

После создания объекта откройте вкладку "Fields & Relationships" (Поля и связи). Нажмите кнопку "New".

![sf_fields](/img/sf_fields.png)

- **Duration**

Выберите "Number" в качестве типа данных и нажмите кнопку "Next".

![sf_data_type](/img/sf_data_type.png)

Назовите его "Duration". Он будет хранить свойства задачи в сериализованном JSON-формате. Нажмите "Next" до тех пор, пока кнопка "Save & New" не станет доступной.

![sf_new_field](/img/sf_new_field.png)

Нажмите кнопку "Next" (принимая все значения по умолчанию) до появления кнопки "Save & New".

- **Parent**

Создайте поле "Parent". Выберите "Text" в качестве типа данных.

![sf_parent](/img/sf_parent.png)

Нажмите "Next" (принимая все настройки по умолчанию) до появления кнопки "Save & New".

- **Progress**

Создайте поле "Progress". Выберите "Number" как тип данных.

![sf_progress](/img/sf_progress.png)

Нажмите "Next" до появления кнопки "Save & New" (по умолчанию).

- **Start date**

Создайте поле "Start Date". Выберите "Date/Time" как тип данных.

![sf_start_date](/img/sf_start_date.png)

Нажмите "Next" до появления кнопки "Save".

В конце должно получиться примерно так:

![sf_gantttask](/img/sf_gantttask.png)

### **Link object**

Откройте Object Manager и выберите "Create" затем "Custom Object":

Укажите имя для объекта ссылки, пусть это будет *GanttLink/GanttLinks*.

![sf_link_object](/img/sf_link_object.png)

:::note
Имя записи должно совпадать с именем объекта, например:

Object Name: GanttLink => Record Name: GanttLink Name
:::

Далее создайте необходимые поля.

- **Source**

Создайте поле "Source". Выберите "Text" в качестве типа данных.

![sf_source](/img/sf_source.png)

Нажмите "Next" до появления кнопки "Save & New".

- **Target**

Создайте поле "Target". Выберите "Text" в качестве типа данных.

![sf_target](/img/sf_target.png)

Нажмите "Next" до появления кнопки "Save & New".

- **Type**

Создайте поле "Type". Выберите "Text" в качестве типа данных.

![sf_type](/img/sf_type.png)

Нажмите "Next" до появления кнопки "Save".

В итоге должно выглядеть так:

![sf_ganttlink](/img/sf_ganttlink.png)

## Шаг 5. Создание компонента Lightning Web

Чтобы создать компонент Lightning Web, выполните команду:

~~~js
$ sfdx lightning generate component --type lwc -n gantt -d force-app/main/default/lwc

target dir = 
C:UsersUsersourcesalesforcegantt-salesforce-appforce-appmaindefaultlwc
   create force-appmaindefaultlwcganttgantt.js
   create force-appmaindefaultlwcganttgantt.html
   create force-appmaindefaultlwcganttgantt.js-meta.xml
~~~

Измените определение компонента в *gantt.js-meta.xml*, чтобы сделать его доступным в конструкторе приложения Lightning:

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

Откройте *gantt.html* и добавьте следующий код в него:

~~~html title="force-app/main/default/lwc/gantt/gantt.html"
<template>
    <div class="thegantt" lwc:dom="manual" style='width: 100%;'></div>
</template>
~~~

Откройте *gantt.js* и добавьте следующий код в него:

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

## Шаг 6. Создание Apex-класса

Следующий шаг — создать класс, который обеспечит взаимодействие между компонентом Lighting и нашей моделью данных.

~~~js
$ sfdx apex generate class -n GanttData -d force-app/main/default/classes

target dir = 
C:UsersUsersalesforcegantt-salesforce-appforce-appmaindefaultclasses
   create force-appmaindefaultclassesGanttData.cls
   create force-appmaindefaultclassesGanttData.cls-meta.xml
~~~

После создания откройте *GanttData.cls* и добавьте следующий код:

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

Скопируйте исходники из Scratch Org в ваш проект

~~~js
$ sfdx project retrieve start
~~~

а затем отправьте исходники в Scratch Org

~~~js
$ sfdx project deploy start
~~~

## Шаг 7. Создание страницы Lightning

Откройте «Lightning App Builder», создайте новую страницу Lightning.

![sf_lightning_app](/img/sf_lightning_app.png)

Выберите "App Page", затем имя страницы и макет.

![sf_new_page](/img/sf_new_page.png)

![sf_page_name](/img/sf_page_name.png)

![sf_page_layout](/img/sf_page_layout.png)

Вы должны увидеть доступный на новой странице пользовательский компонент Gantt. Прикрепите его к любой области и сохраните.

![sf_gantt](/img/sf_gantt.png)

Активируйте страницу.

![sf_saved_page](/img/sf_saved_page.png)

Сохраните изменения.

![sf_activate_gantt](/img/sf_activate_gantt.png)

![sf_add_page_to_nm](/img/sf_add_page_to_nm.png)

![sf_gantt_page](/img/sf_gantt_page.png)

Откройте страницу приложения. Она должна быть доступна в лаунчере приложений: просто кликните по ней и введите Gantt.

![sf_app_launcher](/img/sf_app_launcher.png)

Если всё прошло успешно, вы увидите простую демонстрацию Gantt на странице Lightning.

![sf_final_page](/img/sf_final_page.png)


## Безопасность приложения

Gantt не предоставляет механизмов защиты от угроз, таких как SQL-инъекции или XSS и CSRF-атаки. Важно, чтобы ответственность за безопасность приложения легла на разработчика, реализующего приложение. Подробности читайте в соответствующей статье [Guides/app-security.md](guides/app-security.md). Salesforce построен с акцентом на безопасность для защиты ваших данных и приложений. Вы также можете реализовать свою собственную схему безопасности, чтобы отразить структуру и потребности вашей организации. Дополнительную информацию смотрите в [Salesforce Security Guide](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/salesforce_security_guide.htm). [Здесь](https://developer.salesforce.com/docs/atlas.en-us.secure_coding_guide.meta/secure_coding_guide/secure_coding_lightning_security.htm) можно узнать, что нужно для обеспечения безопасности.

## Устранение неполадок

Если вы выполнили вышеуказанные шаги по интеграции Gantt с Salesforce, но Gantt не отрисовывает задачи и связи на странице, обратитесь к статье [Troubleshooting Backend Integration Issues](guides/troubleshooting.md). В ней описаны способы определения корней проблем.

## Что дальше

Теперь у вас полностью функционирующая диаграмма Gantt. Вы можете просмотреть полный код на [GitHub](https://github.com/DHTMLX/salesforce-gantt-demo), склонировать или скачать его и использовать в своих проектах.

Вы также можете ознакомиться с [guides по многочисленным возможностям gantt] или с руководствами по [интеграции Gantt с другими backend-фреймворками].