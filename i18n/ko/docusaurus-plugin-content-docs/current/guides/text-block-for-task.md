---
title: "작업 내용 표시"
sidebar_label: "작업 내용 표시"
---

작업 내용 표시
====================================
작업 바 옆의 라벨은 작업과 관련된 추가 정보를 표시하는 데 사용할 수 있습니다.  
일반적으로 이 정보에는 담당자, 자원(사람, 자재 등)과 같은 내용이 포함됩니다.

![assigned_text](/img/assigned_text.png)

작업 바 형식 사용자 정의
-------------------------------------------------
작업 바의 기본 모양을 수정하려면 [task_text](api/template/task_text.md) 템플릿을 사용할 수 있습니다:

~~~js
gantt.templates.task_text="function(start,end,task){"
    return "<b>Text:</b> "+task.text+",<b> Holders:</b> "+task.users;
};
~~~

이 템플릿에는 작업 바 내부에 표시하고 싶은 모든 HTML 콘텐츠를 포함할 수 있습니다.


[Styling task bars with events](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)


![task_text](/img/task_text.png)

작업 바 왼쪽에 텍스트 할당
-------------------------------------------------
작업 바의 왼쪽에 텍스트 블록을 추가하려면 [leftside_text](api/template/leftside_text.md) 템플릿을 사용하세요:

~~~js
gantt.templates.leftside_text = function(start, end, task){
    return "<b>Priority: </b>" +task.priority;
};
~~~

[Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)


작업 바 오른쪽에 텍스트 할당
-------------------------------------------------
작업 바의 오른쪽에 텍스트 블록을 추가하려면 [rightside_text](api/template/rightside_text.md) 템플릿을 사용하세요:

~~~js
gantt.templates.rightside_text = function(start, end, task){
    return "<b>Holders: </b>" + task.users;
};
~~~


[Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

