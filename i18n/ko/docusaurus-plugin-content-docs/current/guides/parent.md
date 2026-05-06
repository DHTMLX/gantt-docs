---
title: "부모 컨트롤"
sidebar_label: "부모 컨트롤"
---

# 부모 컨트롤

작업의 상위를 변경하기 위한 선택 상자입니다. 컨트롤은 간트 차트에 표시된 모든 작업을 로드하지만 필터링 규칙과 표시 가능한 값의 템플릿을 설정할 수 있습니다. 그 외의 부분은 [선택 컨트롤](guides/select.md)과 동일합니다.

![parent_control](/img/parent_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"}, /*!*/
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[상위 선택자](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)


## 초기화

다음 단계에 따라 라이트박스에 **parent** 컨트롤을 추가합니다:

1) 라이트박스 구성에 섹션을 추가합니다:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
       {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"},   /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~
  
2) 섹션에 대한 레이블을 설정합니다:

~~~js
gantt.locale.labels["section_parent"] = "상위 작업";
~~~
  

[상위 선택자](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)
  


## 속성

다음 속성은 주로 중요하고 일반적으로 설정되는 속성으로, **parent** 컨트롤에 적용됩니다(전체 목록은 [여기](api/config/lightbox.md)에서 확인하십시오):

- **name** - (*string*) 섹션 이름
- **height** - (*number*) 섹션 높이
- **map_to** - (*string*) 섹션에 매핑될 데이터 속성의 이름
- **type** - (*string*) [섹션 컨트롤의 유형](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) 만약 *true*로 설정되면, 라이트박스가 열릴 때 해당 섹션에 포커스가 적용됩니다
- **allow_root** - (*boolean*) "true"로 설정되면 옵션 목록에 루트 수준을 부모로 선택하게 하는 추가 옵션이 포함됩니다. **root_label** 속성과 함께 사용됩니다
- **root_label** - (*string*) 루트 수준 부모에 대한 레이블을 설정합니다. **allow_root** 속성과 함께 사용됩니다
- **filter** - (*function*) 선택 옵션에 대한 필터링 함수를 설정합니다([options-filtering](guides/parent.md#options-filtering)). 작업 ID와 작업 객체를 매개변수로 받습니다
- **sort** - (*function*) 선택 옵션에 대한 정렬 함수를 설정합니다([options-sorting](guides/parent.md#options-sorting))
- **template** - (*function*) 선택 옵션에 대한 템플릿을 설정합니다
  

## 옵션 필터링

**parent** 컨트롤에 표시되는 옵션을 필터링하려면 **filter** 속성을 사용하세요:

**필터링. 1단계 수준의 태스크만 표시하기**
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

[상위 선택자](https://docs.dhtmlx.com/gantt/samples/05_lightbox/08_parent_selector.html)


**filter** 속성은 2개의 매개변수를 받는 필터링 함수를 설정합니다:

- **id**  - (*string, number*) 작업의 ID
- **task** - (*object*) 작업 객체

그리고 반환 값은:

- *true*, 표시되어야 하는 작업에 대해
- *false*, 목록에서 제거되어야 하는 작업에 대해


## 옵션 정렬

**parent** 컨트롤에 표시되는 옵션을 정렬하려면 **sort** 속성을 사용합니다:

**제목 길이로 작업 정렬하기**
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

**sort** 속성은 인접 값 쌍마다 호출되며 1, -1, 0을 반환하는 정렬 함수를 설정합니다:

- 1 - 쌍의 첫 번째 값이 두 번째 값보다 앞에 와야 함
- -1 - 두 번째 객체가 첫 번째 객체보다 앞에 와야 함
- 0 - 두 객체의 순서가 바뀌지 않음

## 옵션 템플릿

**parent** 컨트롤의 옵션 템플릿을 설정하려면 **template** 속성을 사용합니다:

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

**template** 속성은 3개의 매개변수를 받는 함수를 설정합니다: 

- **start** - (*Date*) 이벤트가 시작될 예정인 날짜
- **end** - (*Date*) 이벤트가 완료될 예정인 날짜
- **ev** - (*object*) 이벤트의 객체

그리고 컨트롤의 옵션 템플릿을 반환합니다.


:::note
If the 'template' property isn't specified, the format of options will be defined by the [task_text](api/template/task_text.md) template.
:::