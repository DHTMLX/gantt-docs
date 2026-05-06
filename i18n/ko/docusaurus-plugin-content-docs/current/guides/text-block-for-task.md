---
title: "작업 내용 표시"
sidebar_label: "작업 내용 표시"
---

# 작업 내용 표시

작업 바 옆에 있는 텍스트는 작업과 관련된 추가 정보를 표시할 수 있게 해 줍니다. 대부분의 경우 이는 할당된 자원 - 사람, 자재 등 입니다. 

![assigned_text](/img/assigned_text.png)

## 작업 바 형식 맞춤 설정

작업 바의 기본 형식을 변경하려면 [task_text](api/template/task_text.md) 템플릿을 사용할 수 있습니다:

~~~js
gantt.templates.task_text="function(start,end,task){"
    return "<b>Text:</b> "+task.text+",<b> Holders:</b> "+task.users;
};
~~~

작업 바 안에 표시되어야 하는 임의의 HTML 콘텐츠를 포함할 수 있습니다.

[이벤트로 작업 바 스타일링](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)

![task_text](/img/task_text.png)

## 바의 왼쪽에 텍스트 배치하기

바의 왼쪽에 텍스트 블록을 배치하려면 [leftside_text](api/template/leftside_text.md) 템플릿을 사용합니다:

~~~js
gantt.templates.leftside_text = function(start, end, task){
    return "<b>Priority: </b>" +task.priority;
};
~~~

[사이드 콘텐츠 정의](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

## 바의 오른쪽에 텍스트 배치하기

바의 오른쪽에 텍스트 블록을 배치하려면 [rightside_text](api/template/rightside_text.md) 템플릿을 사용합니다:

~~~js
gantt.templates.rightside_text = function(start, end, task){
    return "<b>Holders: </b>" + task.users;
};
~~~

[사이드 콘텐츠 정의](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)