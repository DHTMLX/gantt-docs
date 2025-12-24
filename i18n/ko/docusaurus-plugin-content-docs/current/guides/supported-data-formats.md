---
title: "지원되는 데이터 형식"
sidebar_label: "지원되는 데이터 형식"
---

# 지원되는 데이터 형식


dhtmlxGantt는 여러 가지 데이터 형식으로 데이터를 불러오는 것을 지원합니다:

1. [JSON](guides/supported-data-formats.md#json);
2. [XML (dhtmlxGantt 2.0+)](guides/supported-data-formats.md#xmldhtmlxgantt20).
3. [JSON with Collections](guides/supported-data-formats.md#jsonwithcollections)
4. [XML (dhtmlxGantt < 2.0)](guides/supported-data-formats.md#xmldhtmlxganttlt20)

또한 [Gantt 데이터에 사용자 정의 속성을 포함](guides/supported-data-formats.md#custompropertiesindata)하는 것도 가능합니다.


## JSON {#json}


### 작업 및 링크

~~~js
{
    "tasks":[
        {"id":"1", "text":"Project #2", "start_date":"01-04-2020", "duration":18,
            "progress":0.4, "open": true},
        {"id":"2", "text":"Task #1", "start_date":"02-04-2020", "duration":8,
            "progress":0.6, "parent":"1"},
        {"id":"3", "text":"Task #2", "start_date":"11-04-2020", "duration":8,
            "progress":0.6, "parent":"1"}
      ],
      "links":[
        {"id":"1", "source":"1", "target":"2", "type":"1"},
        {"id":"2", "source":"2", "target":"3", "type":"0"},
        {"id":"3", "source":"3", "target":"4", "type":"0"},
        {"id":"4", "source":"2", "target":"5", "type":"2"}
      ]
}
~~~

### 리소스 및 리소스 할당이 포함된 작업

~~~js
{
    tasks: [
        ...,
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2024 00:00",
            duration: 7,
            parent: "2",
            owner: [
                {
                    resource_id: "6",
                    value: 3,
                    start_date: "03-04-2024 00:00",
                    end_date: "05-04-2024 00:00",
                }
            ]
        },
        ...
    ],
    links: [],
    resources: [
        {id: 6, text: "John", unit: "hours/day" },
        {id: 7, text: "Mike", unit: "hours/day" },
        {id: 8, text: "Anna", unit: "hours/day" },
        {id: 9, text: "Bill", unit: "hours/day" },
        {id: 10, text: "Floe", unit: "hours/day" }
    ]
}
~~~

리소스 할당은 작업과 별도로 제공될 수도 있습니다:

~~~js
{
    tasks: [
        ...,
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2024 00:00",
            duration: 7,
            parent: "2",
            priority: 1
        },
        ...
    ],
    links: [],
    assignments: [
        {
            id: 1, task_id: 5, resource_id: 6, value: 3,
            start_date: "03-04-2024 00:00", 
            end_date: "05-04-2024 00:00"
        }
    ],
    resources: [
        {id: 6, text: "John", unit: "hours/day" },
        {id: 7, text: "Mike", unit: "hours/day" },
        {id: 8, text: "Anna", unit: "hours/day" },
        {id: 9, text: "Bill", unit: "hours/day" },
        {id: 10, text: "Floe", unit: "hours/day" }
    ]
}
~~~

## XML (dhtmlxGantt 2.0+) {#xmldhtmlxgantt20}


~~~xml
<data>
    <task id='1' parent='' start_date='01-04-2020' duration='18' open='true'
            progress='0.4' end_date='19-04-2020'>
        <![CDATA[Project #2]]>
    </task>
    <task id='2' parent='1' start_date='02-04-2020' duration='8' progress='0.6'
            end_date='10-04-2020'>
        <![CDATA[Task #1]]>
    </task>
    <task id='3' parent='1' start_date='11-04-2020' duration='8' progress='0.6'
            end_date='19-04-2020'>
        <![CDATA[Task #2]]>
    </task>
    <coll_options for='links'>
        <item id='1' source='1' target='2' type='1' />
        <item id='2' source='2' target='3' type='0' />
        <item id='3' source='3' target='4' type='0' />
        <item id='4' source='2' target='5' type='2' />
    </coll_options>
</data>
~~~

## 데이터 내 사용자 정의 속성 {#custompropertiesindata}


다음 예제에는 두 가지 사용자 정의 속성이 포함되어 있습니다:

- **priority** - 작업의 우선순위 레벨을 나타냅니다.
- **holder**  - 해당 작업에 할당된 담당자를 명시합니다.

#### JSON

~~~js
{
    "tasks":[
        {"id":"1", "text":"Project #2", "start_date":"01-04-2020", "duration":18,
            "progress":0.4, "open": true, "holder":"Mike", "priority":"High"},
        {"id":"2", "text":"Task #1", "start_date":"02-04-2020", "duration":8,
            "progress":0.6, "parent":1, "holder":"John", "priority":"Medium"},
        {"id":"3", "text":"Task #2", "start_date":"11-04-2020", "duration":8,
            "progress":0.6, "parent":1, "holder":"Alex", "priority":"Low"}
      ],
      "links":[
        {"id":"1", "source":"1", "target":"2", "type":"1"},
        {"id":"2", "source":"2", "target":"3", "type":"0"},
        {"id":"3", "source":"3", "target":"4", "type":"0"},
        {"id":"4", "source":"2", "target":"5", "type":"2"}
    ]
}
~~~

#### XML (dhtmlxGantt 2.0+)

~~~xml
<data>
    <task id='1' parent='' start_date='01-04-2020' duration='18' open='true'
            progress='0.4' end_date='19-04-2020''>
        <holder><![CDATA[Mike]]></holder>
        <priority><![CDATA[High]]></priority>
        <![CDATA[Project #2]]>
    </task>
    <task id='2' parent='1' start_date='02-04-2020' duration='8' progress='0.6'
        end_date='10-04-2020'>
        <holder><![CDATA[John]]></holder>
        <priority><![CDATA[Medium]]></priority>
        <![CDATA[Task #1]]>
    </task>
    <task id='3' parent='1' start_date='11-04-2020' duration='8' progress='0.6'
        end_date='19-04-2020'>
        <holder><![CDATA[Alex]]></holder>
        <priority><![CDATA[Low]]></priority>
        <![CDATA[Task #2]]>
    </task>
    <coll_options for='links'>
        <item id='1' source='1' target='2' type='1' />
        <item id='2' source='2' target='3' type='0' />
        <item id='3' source='3' target='4' type='0' />
        <item id='4' source='2' target='5' type='2' />
    </coll_options>
</data>

~~~


## JSON with Collections {#jsonwithcollections}


JSON 데이터는 *data* 객체의 "collections" 속성 내에 여러 추가 배열을 포함할 수 있습니다.

~~~js
{
    "tasks":[
        {"id":"1", "text":"Project #2", "start_date":"01-04-2020", "duration":18,
            "progress":0.4, "open": true},
        {"id":"2", "text":"Task #1", "start_date":"02-04-2020", "duration":8,
            "progress":0.6, "parent":"1"},
        {"id":"3", "text":"Task #2", "start_date":"11-04-2020", "duration":8,
            "progress":0.6, "parent":"1"}
    ],
    "links":[
        {"id":"1", "source":"1", "target":"2", "type":"1"},
        {"id":"2", "source":"2", "target":"3", "type":"0"},
        {"id":"3", "source":"3", "target":"4", "type":"0"},
        {"id":"4", "source":"2", "target":"5", "type":"2"}
    ],
    "collections": { /*!*/
        "sections":[                            /*!*/
            {"value":"1","label":"Simple"},        /*!*/
            {"value":"2","label":"Complex"},    /*!*/
            {"value":"3","label":"Unknown"}        /*!*/
        ]                                        /*!*/
    }                                            /*!*/
}
~~~

이러한 컬렉션은 [gantt.serverList](api/method/serverlist.md) 메서드를 사용하여 이름으로 접근할 수 있습니다.

## XML (dhtmlxGantt < 2.0) {#xmldhtmlxganttlt20}


~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<projects>
  <project id="1" name="project1" startdate="2006,12,14">
     <task id="1">
      <name>project1 task1</name>
    <est>2006,12,14</est>
    <duration>120</duration>
        <percentcompleted>60</percentcompleted>
    <predecessortasks></predecessortasks>
            <childtasks>
                  <task id="2">
                    <name>project1 task2</name>
                      <est>2006,12,14</est>
                <duration>100</duration>
                    <percentcompleted>20</percentcompleted>
                <predecessortasks></predecessortasks>
                    <childtasks></childtasks>
              </task>
                  <task id="6">
                    <name>project1 task6</name>
                <est>2006,12,15</est>
                    <duration>90</duration>
                <percentcompleted>10</percentcompleted>
                <predecessortasks>2</predecessortasks>
                    <childtasks></childtasks>
                  </task>
            </childtasks>
     </task>
  </project>
  <project id="2" name="project2" startdate="2006,12,20">
     <task id="12">
    <name>project2 task12</name>
    <est>2006,12,20</est>
    <duration>140</duration>
    <percentcompleted>60</percentcompleted>
    <predecessortasks></predecessortasks>
        <childtasks>
            <task id="14">
            <name>project2 task14</name>
               <est>2006,12,20</est>
               <duration>100</duration>
            <percentcompleted>20</percentcompleted>
               <predecessortasks></predecessortasks>
                <childtasks></childtasks>
            </task>
        </childtasks>
     </task>
  </project>
</projects>
~~~

