---
title: "Parent Control"
sidebar_label: "Parent Control"
---

# Parent Control  


이 컨트롤은 작업의 상위 항목을 변경할 수 있는 선택 박스를 제공합니다. 간트 차트에 표시된 모든 작업을 불러오며, 필터링 규칙을 적용하거나 값 표시 방식을 사용자화할 수 있습니다. 이러한 기능 외에는 [Select Control](guides/select.md) 컨트롤과 동일하게 동작합니다.

![parent_control](/img/parent_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)




## 초기화  


**parent** 컨트롤을 라이트박스에 포함하려면 다음과 같이 하세요:

1) 라이트박스 설정에 섹션을 추가합니다:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
       {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"},   /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~
    
2) 해당 섹션에 라벨을 정의합니다:

~~~js
gantt.locale.labels["section_parent"] = "Parent task";
~~~
    

[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)
       


## 속성  


**parent** 컨트롤에서 자주 사용되는 주요 속성은 다음과 같습니다(전체 목록은 [여기](api/config/lightbox.md)에서 확인하세요):

- **name** - (*string*) 섹션의 이름
- **height** - (*number*) 섹션의 높이
- **map_to** - (*string*) 이 섹션에 매핑되는 데이터 속성명
- **type** - (*string*) [섹션 컨트롤의 타입](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) *true*로 설정하면 라이트박스가 열릴 때 해당 섹션에 포커스가 이동함
- **allow_root** - (*boolean*) "true"로 설정하면 루트 레벨을 상위 작업으로 지정할 수 있는 옵션이 목록에 추가됨; **root_label**과 함께 사용
- **root_label** - (*string*) 루트 레벨 상위 작업 옵션의 라벨; **allow_root**와 함께 사용
- **filter** - (*function*) [선택 옵션에 대한 필터링 함수](guides/parent.md#optionsfiltering). 작업 id와 작업 객체를 인자로 받음
- **sort** - (*function*) [선택 옵션에 대한 정렬 함수](guides/parent.md#optionssorting)
- **template** - (*function*) 선택 옵션의 표시 방식을 사용자화하는 템플릿 함수
   

## 옵션 필터링  


**parent** 컨트롤에 표시되는 옵션을 제어하려면 **filter** 속성을 사용하세요:

**Filtering. Displaying only tasks of the 1st level**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent",  filter:function(id, task){ /*!*/
         if(task.$level > 1){         /*!*/
            return false;     /*!*/
        }else{  /*!*/
            return true; /*!*/
        } /*!*/
    }},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

[Parent selector](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)


**filter** 함수는 두 개의 파라미터를 받습니다:

- **id**  - (*string, number*) 작업의 id
- **task** - (*object*) 작업 객체

그리고 다음을 반환합니다:

- *true* : 해당 작업을 옵션 목록에 포함
- *false* : 해당 작업을 옵션 목록에서 제외


## 옵션 정렬  


**parent** 컨트롤의 옵션 순서를 지정하려면 **sort** 속성을 사용하세요:

**Sorting tasks by the title's length**
~~~js
function sortByLength(a,b){
    a = a.text.length();
    b = b.text.length();
    return a>b?1:(a<b?-1:0);
};
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent",  sort:sortByLength}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

**sort** 함수는 인접한 두 항목을 비교하여 다음 값을 반환합니다:

- 1 - 첫 번째 항목이 두 번째 항목 앞에 와야 함
- -1 - 두 번째 항목이 첫 번째 항목 앞에 와야 함
- 0 - 두 항목의 순서는 변경되지 않음

## 옵션 템플릿  


**parent** 컨트롤에서 옵션의 표시 방식을 사용자화하려면 **template** 속성을 사용하세요:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent",  template(start,end,ev){/*!*/
        var title = ev.id+"."+ev.text;/*!*/
        return title;/*!*/
    }}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

**template** 함수는 세 가지 파라미터를 받습니다: 

- **start** - (*Date*) 이벤트의 시작 날짜
- **end** - (*Date*) 이벤트의 종료 날짜
- **ev** - (*object*) 이벤트 객체

그리고 컨트롤에 표시할 포맷된 옵션을 반환합니다.


:::note
'template' 속성이 지정되지 않은 경우, 옵션은 [task_text](api/template/task_text.md) 템플릿에 따라 포맷됩니다.
:::

