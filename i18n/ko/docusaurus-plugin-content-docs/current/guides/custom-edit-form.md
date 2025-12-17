---
title: "Custom Lightbox"
sidebar_label: "Custom Lightbox"
---

Custom Lightbox
===============

커스텀 라이트박스 생성 방법
--------------------------

gantt에서 완전히 커스텀한 라이트박스를 만들고 기본 라이트박스를 대체하는 것이 가능합니다. 주요 방식은 두 가지가 있습니다:

1) [showLightbox](api/method/showlightbox.md) 메서드를 오버라이드하는 방법:

~~~js
gantt.showLightbox = function(id){
    // 커스텀 폼 코드
}
~~~

- id - (string/number) - 태스크 id

라이트박스 구현을 도울 수 있도록 [hideLightbox](api/method/hidelightbox.md) 메서드도 사용할 수 있습니다.

커스텀 라이트박스를 담을 HTML 컨테이너 "my-form"을 정의해보겠습니다:

~~~html
<div id="my-form">
 <label for="description">Task text
  <input type="text" name="description" value="" >
 </label>
 


 <input type="button" name="save" value="Save">
 <input type="button" name="close" value="Close">
 <input type="button" name="delete" value="Delete">
</div>
~~~

커스텀 라이트박스를 생성하려면 다음과 같은 구성을 사용할 수 있습니다:


~~~js
var taskId = null;

gantt.showLightbox = function(id) {
    taskId = id;
    var task = gantt.getTask(id);

    var form = getForm();
    var input = form.querySelector("[name='description']");
    input.focus();
    input.value = task.text;

    form.style.display = "block";

    form.querySelector("[name='save']").onclick = save;
    form.querySelector("[name='close']").onclick = cancel;
    form.querySelector("[name='delete']").onclick = remove;
};

gantt.hideLightbox = function(){
    getForm().style.display = "";
    taskId = null;
}


function getForm() {
    return document.getElementById("my-form");
};

function save() {
    var task = gantt.getTask(taskId);

    task.text = getForm().querySelector("[name='description']").value;

    if(task.$new){
        delete task.$new;
        gantt.addTask(task,task.parent);
    }else{
        gantt.updateTask(task.id);
    }

    gantt.hideLightbox();
}

function cancel() {
    var task = gantt.getTask(taskId);

    if(task.$new)
    gantt.deleteTask(task.id);
    gantt.hideLightbox();
}

function remove() {
    gantt.deleteTask(taskId);
    gantt.hideLightbox();
}
~~~

2) [onBeforeLightbox](api/event/onbeforelightbox.md) 이벤트를 사용하는 방법. 이 방식은 다음 단계를 포함합니다:

- 라이트박스가 열리기 직전을 감지
- 기본 라이트박스 표시를 방지
- 커스텀 폼을 띄우고 태스크 데이터를 채우기

~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
    var task = gantt.getTask(id);
    if(task.$new){
        dhtmlx.confirm({
            text:"Create task?",
            callback: function(res){
                if(res){
                    //..값 적용
                    delete task.$new;
                    gantt.addTask(task);
                }else{
                    gantt.deleteTask(task.id);
                }
            }
        });
        return false;
    }
    return true;
});
~~~

커스텀 폼에서의 액션 처리
-----------------------

폼이 저장될 때, 폼 값을 직접 가져와서 [addTask](api/method/addtask.md), [updateTask](api/method/updatetask.md), [deleteTask](api/method/deletetask.md)와 같은 공개 API를 이용해 해당 태스크를 업데이트해야 합니다.

라이트박스가 새 태스크로 인해 열렸고(예: 'plus' 버튼 클릭 등), 사용자가 'Cancel'을 눌러 태스크 생성을 취소한 경우, 해당 태스크 객체에는 '$new' 속성이 설정되어 있음을 유의하세요.

라이트박스 닫기 처리는 아래 예시처럼 할 수 있습니다. 액션의 종류 - 'save', 'cancel', 'delete' -는 "action" 파라미터로 전달됩니다:

~~~js
switch(action){
   case "save":
      task.text = '';// 폼에서 값 적용

      // 새 태스크 추가 또는 기존 태스크 업데이트
      if(task.$new){
        delete task.$new;
        gantt.addTask(task,task.parent)
      }else{
        gantt.updateTask(id);
      }

      break;
   case "cancel":
      // 새 태스크 생성을 취소하는 경우에만 삭제, 그렇지 않으면 아무 작업도 하지 않음
      if(task.$new)
         gantt.deleteTask(id);
      break;
   case "delete":
      gantt.deleteTask(id);
      break;
}
~~~

