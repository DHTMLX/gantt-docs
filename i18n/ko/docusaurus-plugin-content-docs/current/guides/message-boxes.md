---
title: "팝업 메시지 및 모달 박스"
sidebar_label: "팝업 메시지 및 모달 박스"
---

팝업 메시지 및 모달 박스
======================

Gantt 차트의 메시지는 사용자에게 오류를 알리거나, 작업을 확인/취소하거나, 옵션을 선택하는 등 다양한 정보를 제공합니다. 이 메시지들은 [dhtmlxMessage 저장소의 포크](https://github.com/DHTMLX/message)를 기반으로 하므로, dhtmlxMessage의 모든 기능이 dhtmlxGantt 메시지에도 적용됩니다.

주요 메시지 유형은 두 가지입니다: [간단한 팝업 메시지 박스](guides/message-boxes.md#basicpopupmessage)와, 버튼이 있어 애플리케이션과의 상호작용을 차단하는 [모달 메시지 박스](guides/message-boxes.md#modalmessageboxes)입니다.

모달 메시지 박스는 세 가지 종류가 있습니다:

- [알림 메시지 박스](#alert)
- [확인 메시지 박스](#confirm)
- [모달박스](#modal)

## 기본 팝업 메시지

기본 모달 메시지 박스를 표시하려면 [gantt.message](api/method/message.md) 메서드를 사용합니다. 필수 매개변수는 메시지 텍스트입니다:

~~~js
gantt.message("The task is updated");
~~~

세 가지 메시지 박스 스타일이 있습니다:

- 기본 메시지 박스 (**type:"info"**)

![default_message](/img/default_message.png)
    
- 오류 메시지 박스 (**type:"error"**)

![error_message](/img/error_message.png)

- 경고 메시지 박스 (**type:"warning"**)

![warning_message](/img/warning_message.png)

원하는 메시지 박스를 생성하려면 *type* 속성에 적절한 값을 지정하세요: 

~~~js
// 오류 메시지 박스 생성
gantt.message({type:"error", text:"Invalid data format"});
~~~


[Gantt message types](https://docs.dhtmlx.com/gantt/samples/04_customization/20_message_types.html)


메시지 박스의 스타일을 다르게 지정하려면, [여기](guides/message-boxes.md#styling)에서 설명한 대로 type 매개변수를 통해 CSS 클래스를 지정할 수 있습니다.

### 메시지 박스 위치 지정

기본적으로 팝업 메시지 박스는 창의 오른쪽 상단에 나타납니다. [모달 메시지 박스](guides/message-boxes.md#modalmessageboxes)와 달리, 팝업 메시지 박스는 부모 애플리케이션과의 상호작용을 차단하지 않습니다. 위치는 **gantt.message.position** 속성을 설정하여 변경할 수 있습니다:

~~~js
gantt.message.position = 'bottom';
~~~


**Related example:** [Message position](https://snippet.dhtmlx.com/tte3rx78)


사용 가능한 위치 값은 다음과 같습니다:

- **top** - 메시지 박스를 오른쪽 상단에 표시 (기본값)
- **bottom** - 메시지 박스를 오른쪽 하단에 표시
- **left** - Gantt 아래 왼쪽에 메시지 박스 표시
- **right** - Gantt 아래 오른쪽에 메시지 박스 표시

### 만료 시간(Expire Interval)

메시지 박스가 표시되는 시간을 *expire* 매개변수로 조정할 수 있습니다. 이 값은 박스가 사라지기 전까지의 시간(밀리초)입니다. 기본값은 4000밀리초입니다.

이 지속 시간을 변경하거나 자동 만료를 비활성화하려면, expire 값을 다르게 설정하거나 -1로 지정하세요. -1로 설정하면 메시지 박스는 클릭해야만 사라집니다.

~~~js
gantt.message({
    type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

### API로 메시지 박스 숨기기

메시지 박스가 자동으로 사라지기 전에 수동으로 숨기려면, **gantt.message.hide(boxId)** 메서드를 사용하세요. 이 메서드는 다음과 같은 매개변수를 받습니다:

- **boxId** - 메시지 박스 생성 시 지정한 id

~~~js
gantt.message({
    id:"myBox",
    text:"Page is loaded"
});

gantt.message.hide("myBox");
~~~

## 모달 메시지 박스

모달 메시지 박스는 사용자가 버튼을 클릭하여 동작을 완료할 때까지 부모 앱과의 상호작용을 차단합니다. 버튼 클릭 시 닫히며, 콜백 함수가 지정된 경우 실행됩니다.

모달 메시지 박스는 세 가지 유형이 있습니다:

- [알림 메시지 박스](#alert) - 단일 버튼이 있는 알림;
- [확인 메시지 박스](#confirm) - "확인"과 "취소" 버튼이 있는 확인 박스;
- [모달박스](#modal) - 여러 개의 버튼을 가질 수 있는 모달 박스.

공통 속성은 다음과 같습니다:

- **id** - 메시지 박스의 식별자;
- **title** - 헤더 텍스트;
- **type** - 메시지 박스 유형(예: warning, error);
- **text** - 메시지 내용;
- **ok** - "확인" 버튼 텍스트;
- **cancel** - "취소" 버튼 텍스트(확인 박스에서만 사용);
- **callback** - 버튼 클릭 시 호출되는 함수. 클릭된 버튼에 따라 *true* 또는 *false*가 전달됨;
- **position** - 현재는 "top"만 지원; 그 외 값은 박스를 중앙 정렬;
- **width** - CSS [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 또는 [percentage](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 값(예: "100px", "50%")으로 지정;
- **height** - width와 동일하게 지정.

## 알림 메시지 박스 (#alert)

![alert](/img/alert.png)

알림 메시지 박스에는 "확인" 버튼이 포함되어 있습니다. *ok* 매개변수로 버튼 텍스트를 설정할 수 있습니다:

- 간단한 형식(메시지 텍스트만 지정, 나머지는 기본값):

~~~js
gantt.alert("Text");
~~~

- 전체 형식(여러 옵션 지정, 미지정 항목은 기본값 사용):

~~~js
gantt.alert({
    text:"some text",
    title:"Error!",
    ok:"Yes",
    callback:function(){...}
});
~~~

## 확인 메시지 박스 (#confirm)

![confirm](/img/confirm.png)

확인 메시지 박스에는 "확인"과 "취소" 두 개의 버튼이 있습니다. 각각의 텍스트는 해당 속성으로 지정합니다.

- 간단한 형식:

~~~js
gantt.confirm("ConfirmText");
~~~

- 전체 형식:

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

## 모달박스 (#modal)

![modalbox](/img/modalbox.png)

모달박스의 특징은 다음과 같습니다:

- *text*에 임의의 *HTML* 콘텐츠를 포함할 수 있습니다.
- *buttons* 배열에 여러 버튼(레이블)을 정의할 수 있습니다.
- *callback* 함수는 클릭된 버튼의 *index*를 전달받습니다.

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

### 모달박스 버튼 구성 (#configuringmodalboxbuttons)

모달박스 버튼을 구성하는 주요 방법은 두 가지입니다:

- 간단한 형식:

~~~js
gantt.modalbox({
    // 기타 설정
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

이 형식에서는 콜백이 클릭된 버튼의 인덱스("0", "1", "2" 등, 문자열 형태)를 전달받습니다. 각 버튼에는 버튼 이름(소문자 기준)으로 CSS 클래스가 부여됩니다. 예: *gantt_**save**_button*, *gantt_**delete**_button*, *gantt_**cancel**_button*.

이러한 클래스를 사용하여 버튼 스타일을 지정할 수 있습니다:

~~~js
.gantt_delete_button div{
    background:red;
}
~~~

여러 팝업에서 같은 버튼 이름을 사용하지만 다른 스타일이 필요하다면 **type** 설정을 추가할 수 있습니다:

~~~js
gantt.modalbox({
    // 기타 설정
    type:"special_popup",
    buttons:["Save", "Delete", "Cancel"]
});
~~~

**type** 값은 "gantt_"가 접두사로 붙어 팝업 요소의 클래스에 추가됩니다:

~~~js
.gantt_special_popup .gantt_delete_button div{
      background:red;
}
~~~

- 전체 형식:

버튼의 CSS 클래스와 콜백 값을 명시적으로 지정할 수 있습니다:

~~~js
gantt.modalbox({
    // 기타 설정
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

**label**은 필수이며, **css**와 **value**는 선택입니다. 생략 시 간단한 형식과 동일하게 레이블과 버튼 인덱스에서 클래스와 값이 유도됩니다.

**css** 클래스는 "gantt_"가 접두사로 붙어 버튼 요소에 추가됩니다:

~~~js
.gantt_link_delete_btn div{
      background:red;
}
~~~

## 모달 메시지 박스 숨기기

모달 메시지 박스를 수동으로 닫으려면, **gantt.modalbox.hide()** 메서드에 모달박스 컨테이너 요소를 전달하세요:

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

**alert** 및 **confirm** 모달 박스에도 동일하게 **gantt.modalbox.hide()** 메서드를 사용할 수 있습니다:

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

## Gantt와 모달박스 버튼 동작 방식

기본적으로 버튼 이름은 일반 텍스트입니다. 버튼 이름을 HTML 요소(예: 굵은 글씨, 아이콘 등)로 지정하면, 해당 버튼 클릭 시 콜백 함수는 *null*을 반환합니다.

이는 Gantt가 클릭된 요소의 부모에 특정 속성이 있는지 확인하기 때문입니다. 기대하는 속성이 없으면 Gantt는 *null*을 반환합니다. 또한 Gantt는 버튼용으로 지정한 모든 요소를 `<div>` 태그로 감쌉니다.

따라서 텍스트 클릭 시 문자열 요소가 반환되면, 부모는 빈 `<div>`가 되어 결과가 `null`이 됩니다. 반면, 텍스트 외의 버튼 클릭 시 부모 요소에 필요한 속성이 있어 콜백이 정상적으로 값을 반환합니다:

- 확인 박스: *true/false*
- 모달박스:
  - [간단한 형식](#configuringmodalboxbuttons): 배열 내 요소의 인덱스
  - [전체 형식](#configuringmodalboxbuttons): `value` 파라미터 값

HTML 요소를 버튼 이름으로 사용하려면, 두 개의 `<div>` 요소로 감싸고 모두 `data-result` 속성이 있어야 합니다. 예시:

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

다른 요소를 버튼으로 사용하려면, 모든 부모 요소에도 `data-result` 속성이 있어야 합니다. 아래 예시에서는 `<u>` 태그를 버튼 이름으로 사용하며, 두 개의 부모 `<div>`와 함께 모두 `data-result` 속성이 포함되어 있습니다:

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

메시지 박스의 외관은 직접 스타일을 정의하여 자유롭게 커스터마이즈할 수 있습니다. 일반적으로 *type* 파라미터를 통해 CSS 클래스를 지정하며, 원하는 CSS 클래스를 생성한 후 해당 클래스 이름을 이 파라미터에 할당합니다.

'type' 파라미터를 설정할 때 기억해야 할 중요한 사항은 다음과 같습니다:

- alert 및 confirm 박스에 CSS 클래스를 적용하려면, 'window-related' 메서드를 사용하여 박스를 초기화해야 합니다.
- 메시지 박스에 CSS 클래스를 적용하려면, 'common' 메서드를 사용하여 박스를 초기화해야 합니다.
- CSS 클래스 이름은 'gantt-' 접두사로 시작해야 합니다.
- 스타일이 올바르게 적용되도록 하려면, **.gantt-some div**와 같은 셀렉터를 사용하여 gantt 메시지 내부의 요소를 타겟팅하세요.

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


**Related example:** [Styling message boxes](https://snippet.dhtmlx.com/p950vym3)


## 모달 윈도우 및 키보드 상호작용

모달 박스에 대한 키보드 지원은 **gantt.message.keyboard** 속성으로 관리되며, 기본적으로 활성화(*true*)되어 있습니다.

기본적으로 모달 박스는 특정 키를 제외한 페이지의 키보드 이벤트를 차단합니다:

- "space" 및 "enter" 키는 모달 박스의 결과를 *true*로 설정합니다.
- "escape" 키는 모달 박스의 결과를 *false*로 설정합니다.

**gantt.message.keyboard**를 *false*로 설정하면, 더 이상 키보드 이벤트가 차단되지 않으며 위의 키들도 모달 결과를 트리거하지 않습니다:

~~~js
gantt.message.keyboard = false; 
gantt.modalbox({...});
~~~

이렇게 하면 모달 박스 내의 입력 필드에 자유롭게 키보드를 사용할 수 있습니다.

