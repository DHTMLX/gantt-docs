---
title: "支持的数据格式"
sidebar_label: "支持的数据格式"
---

# 支持的数据格式

dhtmlxGantt 可以加载以下数据格式：

1. [JSON](guides/supported-data-formats.md);
2. [XML (dhtmlxGantt 2.0+)](guides/supported-data-formats.md#xmldhtmlxgantt20).
3. [JSON with Collections](guides/supported-data-formats.md#jsonwithcollections)
4. [XML (dhtmlxGantt < 2.0)](guides/supported-data-formats.md#xmldhtmlxganttlt20)

你也可以 [向 Gantt 数据添加任意自定义属性](guides/supported-data-formats.md#custom-properties-in-data)。

## JSON

### 任务与连线

~~~js
{
    "tasks":[
        { "id": "1", "text": "Project #2", "start_date": "01-04-2026", "duration": 18,
            "progress": 0.4, "open": true },
        { "id": "2", "text": "Task #1", "start_date": "02-04-2026", "duration": 8,
            "progress": 0.6, "parent": "1" },
        { "id": "3", "text": "Task #2", "start_date": "11-04-2026", "duration": 8,
            "progress": 0.6, "parent": "1" }
    ],
    "links":[
        { "id": "1", "source": "1", "target": "2", "type": "1" },
        { "id": "2", "source": "2", "target": "3", "type": "0" },
        { "id": "3", "source": "3", "target": "4", "type": "0" },
        { "id": "4", "source": "2", "target": "5", "type": "2" }
    ]
}
~~~



### 含有资源及资源分配的任务

~~~js
{
    tasks: [
        ...,
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2026 00:00",
            duration: 7,
            parent: "2",
            owner: [
                {
                    resource_id: "6",
                    value: 3,
                    start_date: "03-04-2026 00:00",
                    end_date: "05-04-2026 00:00",
                }
            ]
        },
        ...
    ],
    links: [],
    resources: [
        { id: 6, text: "John", unit: "hours/day" },
        { id: 7, text: "Mike", unit: "hours/day" },
        { id: 8, text: "Anna", unit: "hours/day" },
        { id: 9, text: "Bill", unit: "hours/day" },
        { id: 10, text: "Floe", unit: "hours/day" }
    ]
}
~~~

资源分配可以作为独立于任务的参数传入该方法：

~~~js
{
    tasks: [
        ...,
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2026 00:00",
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
            start_date: "03-04-2026 00:00", 
            end_date: "05-04-2026 00:00"
        }
    ],
    resources: [
        { id: 6, text: "John", unit: "hours/day" },
        { id: 7, text: "Mike", unit: "hours/day" },
        { id: 8, text: "Anna", unit: "hours/day" },
        { id: 9, text: "Bill", unit: "hours/day" },
        { id: 10, text: "Floe", unit: "hours/day" }
    ]
}
~~~

## XML (dhtmlxGantt 2.0+) {#xmldhtmlxgantt20}

~~~xml
<data>
    <task id='1' parent='' start_date='01-04-2026' duration='18' open='true'
            progress='0.4' end_date='19-04-2026'>
        <![CDATA[Project #2]]>
    </task>
    <task id='2' parent='1' start_date='02-04-2026' duration='8' progress='0.6'
            end_date='10-04-2026'>
        <![CDATA[Task #1]]>
    </task>
    <task id='3' parent='1' start_date='11-04-2026' duration='8' progress='0.6'
            end_date='19-04-2026'>
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

## 自定义数据属性

让我们以上述示例添加两个自定义属性：

- **priority** - 任务的优先级。
- **holder**  - 指派给任务的人员姓名。

#### JSON

~~~js
{
    "tasks":[
        { "id": "1", "text": "Project #2", "start_date": "01-04-2026", "duration": 18,
            "progress": 0.4, "open": true, "holder": "Mike", "priority": "High" },
        { "id": "2", "text": "Task #1", "start_date": "02-04-2026", "duration": 8,
            "progress": 0.6, "parent": 1, "holder": "John", "priority": "Medium" },
        { "id": "3", "text": "Task #2", "start_date": "11-04-2026", "duration": 8,
            "progress": 0.6, "parent": 1, "holder": "Alex", "priority": "Low" }
      ],
    "links":[
        { "id": "1", "source": "1", "target": "2", "type": "1" },
        { "id": "2", "source": "2", "target": "3", "type": "0" },
        { "id": "3", "source": "3", "target": "4", "type": "0" },
        { "id": "4", "source": "2", "target": "5", "type": "2" }
    ]
}
~~~

#### XML (dhtmlxGantt 2.0+) ?

~~~xml
<data>
    <task id='1' parent='' start_date='01-04-2026' duration='18' open='true'
            progress='0.4' end_date='19-04-2026'>
        <holder><![CDATA[Mike]]></holder>
        <priority><![CDATA[High]]></priority>
        <![CDATA[Project #2]]>
    </task>
    <task id='2' parent='1' start_date='02-04-2026' duration='8' progress='0.6'
        end_date='10-04-2026'>
        <holder><![CDATA[John]]></holder>
        <priority><![CDATA[Medium]]></priority>
        <![CDATA[Task #1]]>
    </task>
    <task id='3' parent='1' start_date='11-04-2026' duration='8' progress='0.6'
        end_date='19-04-2026'>
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

JSON 数据可以在 *data* 对象的 "collections" 属性中包含任意数量的附加数组。

~~~js {16-22}
{
    "tasks":[
        { "id": "1", "text": "Project #2", "start_date": "01-04-2026", "duration": 18,
            "progress": 0.4, "open": true },
        { "id": "2", "text": "Task #1", "start_date": "02-04-2026", "duration": 8,
            "progress": 0.6, "parent": "1" },
        { "id": "3", "text": "Task #2", "start_date": "11-04-2026", "duration": 8,
            "progress": 0.6, "parent": "1" }
    ],
    "links":[
        { "id": "1", "source": "1", "target": "2", "type": "1" },
        { "id": "2", "source": "2", "target": "3", "type": "0" },
        { "id": "3", "source": "3", "target": "4", "type": "0" },
        { "id": "4", "source": "2", "target": "5", "type": "2" }
    ],
    "collections": { 
        "sections":[                            
            { "value":"1","label":"Simple" },        
            { "value":"2","label":"Complex" },   
            { "value":"3","label":"Unknown" }        
        ]                                       
    }                                           
}
~~~

应用的集合可以通过它们的名称在 [gantt.serverList](api/method/serverlist.md) 方法的帮助下访问。

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