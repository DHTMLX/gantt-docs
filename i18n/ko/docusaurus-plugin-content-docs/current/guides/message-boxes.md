---
title: "팝업 메시지와 모달 박스"
sidebar_label: "팝업 메시지와 모달 박스"
---

# 팝업 메시지와 모달 박스

메시지는 간트 차트에서 사용자의 오류를 알리거나, 작업을 확인하거나 거절하거나 옵션 중 하나를 선택하는 등의 용도로 사용됩니다.  
간트 차트 메시지는 [DHTMLX의 message 저장소 포크](https://github.com/DHTMLX/message)를 기반으로 합니다.  
따라서 dhtmlxMessage의 모든 기능이 dhtmlxGantt 메시지에도 적용됩니다.

메시지에는 두 가지 주요 유형이 있습니다: 간단한 팝업 메시지 박스와 버튼이 있는 모달 메시지 박스로, 후자는 애플리케이션의 작업을 차단합니다.

모달 메시지 박스는 세 가지 가능한 유형 중 하나에 속할 수 있습니다:

- [Alert message box](#alert) (경고 메시지 박스)
- [Confirm message box](#confirm) (확인 메시지 박스)
- [Modalbox](#modal) (모달 박스)


## 기본 팝업 메시지 

기본 모달 메시지 박스를 만들려면 [gantt.message](api/method/message.md) 메서드를 사용합니다. 메서드의 필수 매개변수는 메시지의 텍스트입니다:

~~~js
gantt.message("The task is updated");
~~~

메시지 상자에는 세 가지 유형이 있습니다:
  
- 기본 메시지 박스 (**type:"info"**)

![default_message](/img/default_message.png)
  
- 오류 메시지 박스 (**type:"error"**)

![error_message](/img/error_message.png)

- 경고 메시지 박스 (**type:"warning"**)

![warning_message](/img/warning_message.png)

필요한 메시지 박스를 만들려면 해당 값으로 *type* 속성을 정의해야 합니다: 

~~~js
// 오류 메시지 박스 생성
gantt.message({type:"error", text:"Invalid data format"});
~~~


[Gantt message types](https://docs.dhtmlx.com/gantt/samples/04_customization/20_message_types.html)


메시지 박스에 서로 다른 스타일을 적용하려면 type 매개변수를 통해 CSS 클래스를 지정해야 합니다(여기서 [스타일링 방법](guides/message-boxes.md#styling)을 참고)).

### 메시지 박스 위치 지정

기본적으로 팝업 메시지 박스는 창의 오른쪽 상단 모서리에 나타납니다. 부모 애플리케이션의 작업을 차단하는 모달 메시지 박스와 달리 화면을 가리지 않습니다. 메시지 박스의 위치를 변경하려면 **gantt.message.position** 속성을 사용합니다:

~~~js
gantt.message.position = 'bottom';
~~~

**관련 샘플**  [Message position](https://snippet.dhtmlx.com/tte3rx78)

메시지 위치에는 네 가지 가능한 값이 있습니다:

- **top** - 창의 오른쪽 상단 모서리에 메시지 박스를 표시합니다(기본값으로 설정)
- **bottom** - 창의 오른쪽 하단 모서리에 메시지 박스를 표시합니다
- **left** - 간트 차트 아래 창의 왼쪽에 메시지 박스를 표시합니다
- **right** - 간트 차트 아래 창의 오른쪽에 메시지 박스를 표시합니다

### 만료 간격

메시지 박스의 만료 간격을 *expire* 매개변수를 통해 커스터마이즈할 수 있습니다. 이는 메시지 박스가 사라지는 시간 간격(밀리초 단위)입니다. 기본값은 4000밀리초입니다. 

이 값을 변경하거나 만료 기간을 아예 취소하려면 expire 매개변수를 "-1"로 설정하면 됩니다. 이 경우 마우스 클릭 시에만 사라집니다.

~~~js
gantt.message({
    type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

### API로 메시지 박스 숨기기

지정된 메시지 박스를 수동으로 숨기고 자동으로 사라질 때까지 기다리지 않으려면 **gantt.message.hide(boxId)** 메서드를 사용할 수 있습니다. 하나의 매개변수를 받습니다:

- **boxId** - 박스 생성자에 지정된 박스 ID

~~~js
gantt.message({
    id:"myBox",
    text:"Page is loaded"
});

gantt.message.hide("myBox");
~~~

## 모달 메시지 박스

모달 메시지 박스는 필요한 동작이 수행될 때까지(대개 버튼 클릭) 부모 애플리케이션의 작업을 차단합니다. 버튼 클릭과 함께 콜백 함수가 실행됩니다.

모달 메시지 박스에는 세 가지 유형이 있습니다:

- [Alert Message Box](#alert) - 버튼이 있는 경고 박스
- [Confirm Message Box](#confirm) - 두 개의 버튼(확인 또는 취소)으로 구성된 확인 박스
- [Modalbox](#modal) - 무한 개수의 버튼을 가진 모달 메시지 박스

박스의 공통 속성은 다음과 같습니다:

- **id** - 메시지 박스의 ID
- **title** - 헤더의 텍스트
- **type** - 메시지 박스의 유형(경고 또는 오류 등)
- **text** - 메시지 박스 본문의 텍스트
- **ok** - "OK" 버튼의 텍스트
- **cancel** - "Cancel" 버튼의 텍스트(확인 박스용)
- **callback** - 버튼 클릭 시 호출되는 함수. 클릭된 버튼에 따라 매개변수로 *true* 또는 *false*를 받습니다
- **position** - 현재는 하나의 값만 지원 - "top"; 다른 값은 중앙 정렬로 처리
- **width** - 모달 박스의 너비(CSS [length] 또는 [percentage] 값, 예: "100px", "50%")
- **height** - 모달 박스의 높이(CSS [length] 또는 [percentage] 값, 예: "100px", "50%")

## Alert Message Box {#alert}

![alert](/img/alert.png)

Alert 메시지 박스에는 "OK" 버튼이 포함되어 있습니다. "OK" 버튼의 텍스트를 설정하려면 *ok* 매개변수를 해당 값으로 사용합니다:

- 짧은 형식(메시지 텍스트만 포함 - 매개변수 'text'의 암시적 사용. 다른 매개변수는 기본값을 가짐):

~~~js
gantt.alert("Text");
~~~

- 전체 형식(여러 사용 가능한 매개변수를 포함. 명시되지 않은 매개변수는 기본값 사용)

~~~js
gantt.alert({
    text:"some text",
    title:"Error!",
    ok:"Yes",
    callback:function(){...}
});
~~~


## Confirm Message Box {#confirm}

![confirm](/img/confirm.png)

확인 메시지 박스에는 두 개의 버튼이 있습니다: "OK" 버튼과 "Cancel" 버튼. 버튼의 텍스트는 해당 이름으로 속성에 정의되어 있습니다. 

- 짧은 형식

~~~js
gantt.confirm("ConfirmText");
~~~

- 전체 형식

~~~js
gantt.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        gantt.message("Result: "+result);
    }
});
~~~


## Modal Box {#modal}

![modalbox](/img/modalbox.png)

모달박스는 몇 가지 특징을 가집니다:

- *text*에 임의의 HTML 콘텐츠를 포함할 수 있습니다
- *buttons* 배열에 여러 버튼을 지정할 수 있으며, 버튼의 텍스트 값이 포함됩니다
- *callback* 함수는 선택된 버튼의 인덱스를 매개변수로 받습니다

~~~js
gantt.modalbox({
    title:"Settings",
    text: " ... html code here... ",
    buttons:["Save", "Defaults", "Cancel"],
    callback: function(result){
        gantt.alert(result);
    }
});
~~~


### 모달박스 버튼 구성 설정 방법 

모달박스 버튼의 구성을 정의하는 두 가지 주요 방법이 있습니다:

- 짧은 형식: 

~~~js
gantt.modalbox({
    // other settings
    buttons:["Save", "Delete", "Cancel"],
    callback: function(result){
           switch(result){
            case "0":
                //Save
                break;
            case "1":
                //Delete
                break;
            case "2":
                //Cancel
                break;
        }    
    }
});
~~~

콜백 함수의 결과는 배열에서 눌린 버튼의 문자열 인덱스("0", "1", "2",...)와 같습니다. 각 버튼은 레이블을 소문자로 변환한 이름에서 CSS 클래스를 받아갑니다. 예를 들면 *gantt_save_button*, *gantt_delete_button*, *gantt_cancel_button* 와 같습니다. 

이 클래스들은 버튼의 스타일링에 사용할 수 있습니다:

~~~js
.gantt_delete_button div{
    background:red;
}
~~~

동일한 버튼 이름이 여러 팝업에서 서로 다르게 스타일링되어야 하는 경우, **type** 구성을 사용할 수 있습니다:

~~~js
gantt.modalbox({
    // other settings
    type:"special_popup",
    buttons:["Save", "Delete", "Cancel"]
});
~~~

**type**은 "gantt_" 문자열로 접두사가 붙고 팝업 요소의 클래스 이름으로 추가됩니다:

~~~js
.gantt_special_popup .gantt_delete_button div{
      background:red;
}
~~~

- 전체 형식:

버튼의 CSS 클래스와 콜백 값은 더 긴 구성 형식을 사용하여 명시적으로 정의될 수 있습니다:

~~~js
gantt.modalbox({
    // other settings
    buttons: [
        { label:"Save",   css:"link_save_btn",   value:"save" },
        { label:"Cancel", css:"link_cancel_btn", value:"cancel" },
        { label:"Delete", css:"link_delete_btn", value:"delete" }
    ],
    callback: function(result){
        switch(result){
            case "save":
                //Save
                break;
            case "cancel":
                //Cancel
                break;
            case "delete":
                //Delete
                break;
        }
    }
});
~~~

- 라벨 매개변수는 필수이며, CSS와 value 옵션은 생략될 수 있습니다. 누락된 매개변수는 버튼 구성의 짧은 형식과 동일하게 계산됩니다: CSS는 소문자로 변환된 버튼 레이블에서 상속되고 버튼 인덱스는 값으로 사용됩니다.


CSS는 버튼 요소에 클래스 이름으로 추가되며 "gantt_" 접두사를 앞에 붙입니다:

~~~js
.gantt_link_delete_btn div{
      background:red;
}
~~~

## 모달 메시지 박스 숨기기

모달 메시지 박스를 수동으로 숨기려면 **gantt.modalbox.hide()** 메서드를 사용할 수 있습니다. 매개변수로 모달박스의 div 컨테이너를 받습니다:

~~~js
var box = gantt.modalbox({    
    title:"Settings",
    text: " ... html code here... ",
    buttons:["Save", "Defaults", "Cancel"],
    callback: function(result){
        gantt.alert(result);
    }
});

gantt.modalbox.hide(box);
~~~

경고 및 확인 모달 박스의 경우에도 **gantt.modalbox.hide()** 메서드를 사용해야 합니다:

~~~js
var box = gantt.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        gantt.message("Result: "+result);
    }
});

gantt.modalbox.hide(box);
~~~

## Gantt가 모달박스 버튼과 함께 작동하는 방식

기본적으로 버튼의 이름은 텍스트로 설정됩니다. 버튼의 이름이 HTML 요소로 설정된 경우(예: 글꼴을 굵게 만들거나 머티리얼 아이콘을 추가하는 등) 버튼 클릭 시 콜백 함수의 결과는 *null*이 됩니다. 이는 Gantt가 클릭된 요소의 부모에 있는 특정 속성을 감시하기 때문입니다. 기대하는 속성이 없으면 Gantt는 *null*을 반환합니다. 또한 Gantt는 버튼으로 지정한 모든 요소를 `<div>` 태그로 감쌉니다. 

따라서 텍스트를 클릭했을 때 문자열 요소를 반환하면 부모는 비어 있는 `<div>` 요소가 되고 결과는 `null`이 됩니다. 하지만 텍스트 외부를 클릭하여 버튼을 누른 경우 부모는 필요한 속성을 모두 가진 요소가 되므로 더 기대되는 결과를 얻을 수 있습니다:

- 확인 박스의 경우 true/false
- 모달박스의 경우:
    - 배열 내 요소의 인덱스 번호(짧은 형식의 경우)
    - `value` 매개변수의 값(전체 형식의 경우)
  
즉, 버튼 이름으로 HTML 요소를 사용하고 싶다면 모든 요소를 data-result 속성을 가진 두 개의 div로 감싸야 합니다. 예를 들면:

~~~js
gantt.confirm({
    ok:`<div data-result="yes"><div data-result="yes"><i>Yes</i></div></div>`,
    cancel:`<div data-result="no"><div data-result="no"><i>No</i></div></div>`,
});

gantt.modalbox({
  buttons: [
   { label:`<div data-result="yes">
           <div data-result="yes"><i>Yes</i></div>
     </div>`,   
     css:"link_save_btn", value:"yes" },
   { label:`<div data-result="no">
           <div data-result="no"><i>No</i></div>
     </div>`, 
     css:"link_cancel_btn", value:"no" },
   { label:`<div data-result="cancel">
           <div data-result="cancel"><i>Cancel</i></div>
     </div>`, 
     css:"link_cancel_btn", value:"cancel" },
  ],
});
~~~

다른 요소를 버튼으로 사용해야 하는 경우, 모든 상위 요소에도 data-result 속성이 있어야 합니다. 아래 예제에서는 버튼의 이름으로 \<u\> 태그를 사용했습니다. 따라서 다른 두 개의 \<div\> 상위 요소와 동일한 data-result 속성을 가집니다:

~~~js
gantt.confirm({
  ok:`<div data-result="yes">
      <div data-result="yes"><u data-result="yes"><i>Yes</i></u></div>
  </div>`,
  cancel:`<div data-result="no">
      <div data-result="no"><u data-result="no"><i>No</i></u></div>
  </div>`,
});

gantt.modalbox({
  buttons: [
    { label:`<div data-result="yes">
        <div data-result="yes">
            <u data-result="yes"><i>Yes</i></u>
           </div>
      </div>`,   
      css:"link_save_btn",  value:"yes" },
    { label:`<div data-result="no">
        <div data-result="no">
            <u data-result="no"><i>No</i></u>
        </div>
      </div>`, 
      css:"link_cancel_btn", value:"no" },
    { label:`<div data-result="cancel">
        <div data-result="cancel">
            <u data-result="cancel"><i>Cancel</i></u>
        </div>
      </div>`, 
      css:"link_cancel_btn", value:"cancel" },
  ],
});
~~~

## 스타일링

어떤 유형의 메시지 박스이든 원하는 모양을 얻기 위해 커스텀 스타일을 정의할 수 있습니다. 일반적으로 적합한 CSS 클래스는 *type* 매개변수를 통해 지정됩니다: CSS 클래스를 정의하고 매개변수를 그 이름으로 설정합니다.

다음과 같이 주의해야 할 규칙이 있습니다:

- 경고 및 확인 박스의 CSS 클래스를 설정하려면 창(window 관련) 방식으로 상자를 초기화해야 합니다.
- 메시지 박스의 CSS 클래스를 설정하려면 일반(common) 방식으로 상자를 초기화해야 합니다.
- CSS 클래스의 이름은 'gantt-' 접두사를 붙여야 합니다.
- 스타일을 올바르게 적용하려면 .gantt-some div처럼 클래스 이름을 사용해야 합니다. 이는 간트 메시지 안의 요소에 적용되도록 의도된 것임을 명시하기 위함입니다. 

~~~js
<style type="text/css">
.gantt-myCss div{
    font-weight:bold;
    color:wheat;
    background-color:crimson;
}
</style>


gantt.message({ type:"myCss", text:"some text" });
~~~

**관련 샘플** [Styling message boxes](https://snippet.dhtmlx.com/p950vym3)
## 모달 창과 키보드 상호작용

모달 박스의 키보드 기능은 **gantt.message.keyboard** 속성으로 제어됩니다. 초기값은 true로 설정되어 있습니다. 

기본적으로 모달 박스는 페이지의 키보드 이벤트를 차단합니다. 사용할 수 있는 키는 다음과 같습니다:

- "space" 와 "enter" - 모달 박스의 결과를 true로 설정
- "escape" - 모달 박스의 결과를 false로 설정

keyboard 속성을 false로 설정하면 키보드 이벤트를 사용할 수 있게 되며(위에 언급한 키는 비활성화됩니다):

~~~js
gantt.message.keyboard = false; 
gantt.modalbox({...});
~~~

이를 통해 모달 박스 내부의 입력 필드 등에 값을 입력하는 등의 전체 키보드 사용이 가능합니다.