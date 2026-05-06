---
title: "사용자 정의 라이트박스"
sidebar_label: "사용자 정의 라이트박스"
---

# 사용자 정의 라이트박스

## 사용자 정의 라이트박스를 만드는 방법

Gantt용으로 완전히 맞춤형 라이트박스를 만들고 기본 라이트박스를 이것으로 대체할 수 있습니다. 이를 수행하는 방법은 두 가지가 있습니다:

1) [showLightbox](api/method/showlightbox.md) 메서드를 재정의하여 사용하기:

~~~js
gantt.showLightbox = function(id){
    // code of the custom form
}
~~~

- id - (string/number) - 작업 ID

라이트박스 구현에 도움이 되는 [hideLightbox](api/method/hidelightbox.md) 메서드도 있습니다.

다음과 같이 맞춤형 라이트박스를 배치할 HTML 컨테이너 "my-form"를 만들어 보겠습니다:

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


그런 다음 맞춤형 라이트박스를 만들기 위한 구성은 아래와 유사하게 사용할 수 있습니다:

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

2) [onBeforeLightbox](api/event/onbeforelightbox.md) 이벤트를 사용하는 방법. 이 경우 작업 흐름은 다음과 같습니다:

- 라이트박스가 표시되려는 시점을 감지
- 기본 라이트박스를 차단
- 사용자 정의 양식을 표시하고 작업 데이터를 채웁니다.

~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
    var task = gantt.getTask(id);
    if(task.$new){
        dhtmlx.confirm({
            text:"Create task?",
            callback: function(res){
                if(res){
                    //..apply values
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

## 사용자 정의 양식에서의 작업 처리

사용자가 양식을 저장하면, 양식 값을 수동으로 가져와 공개 API인 [addTask](api/method/addtask.md), [updateTask](api/method/updatetask.md) 및 [deleteTask](api/method/deletetask.md)를 사용해 해당 작업을 업데이트해야 합니다.

새 작업으로 인해 라이트박스가 트리거될 때(작업 생성을 되돌리려면 'Cancel'을 클릭해야 하는 경우 삭제되어야 함), 작업 객체에는 '$new' 속성이 설정되어 있다는 점에 유의하십시오.

다음 예시와 같이 라이트박스 닫기를 처리할 수 있습니다. 동작 유형은 'save', 'cancel' 또는 'delete'이며 "action" 매개변수로 전달됩니다:

~~~js
switch(action){
   case "save":
      task.text = '';// 양식에서 값을 적용

      // 새 작업을 추가하거나 이미 존재하는 작업을 업데이트
      if(task.$new){
        delete task.$new;
        gantt.addTask(task,task.parent)
      }else{
        gantt.updateTask(id);
      }

      break;
   case "cancel":
      // 새 작업 생성을 위한 취소 팝업인 경우 삭제하고, 그렇지 않으면 아무 것도 하지 않음
      if(task.$new)
         gantt.deleteTask(id);
      break;
   case "delete":
      gantt.deleteTask(id);
      break;
}
~~~