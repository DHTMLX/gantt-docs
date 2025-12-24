---
title: "키보드 내비게이션"
sidebar_label: "키보드 내비게이션"
---

# 키보드 내비게이션


Gantt 차트와 그 요소들은 키 또는 키 조합을 사용하여 접근할 수 있습니다. 이 문서에서는 Gantt에서의 키보드 내비게이션의 기본 사항, 포커스 동작 방식, 내장 단축키 사용법, 그리고 직접 단축키를 만드는 방법을 다룹니다.

## 기능 활성화 {#enablingthefunctionality}

Gantt 차트에서 키보드 내비게이션을 사용하려면, [gantt.plugins](api/method/plugins.md) 메서드를 통해 **keyboard_navigation** 플러그인을 활성화해야 합니다.

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

**gantt.ext.keyboardNavigation** API에 대한 자세한 내용은 [키보드 네비게이션 확장](guides/keynav-ext.md) 문서를 참고하세요.

키보드 내비게이션에는 두 가지 유형이 있습니다:

- 작업 행(row) 별 내비게이션

[keyboard_navigation](api/config/keyboard_navigation.md) 속성을 *true*로 설정하여 활성화할 수 있습니다.

- 작업 셀(cell) 별 내비게이션  

[keyboard_navigation_cells](api/config/keyboard_navigation_cells.md) 속성을 *true*로 설정하여 사용할 수 있습니다.

## 키보드 내비게이션 중 포커스 동작 {#focusbehaviorduringkeyboardnavigation}

### Gantt에 포커스

Tab 키를 누르면 일반적인 요소와 마찬가지로 Gantt에 포커스가 설정됩니다. 포커스가 이동된 후에는 방향키 등으로 Gantt 내에서 이동할 수 있습니다.

Tab 키를 다시 누르면 포커스가 Gantt에서 페이지의 다른 부분으로 이동합니다.

### 모달 창에 포커스

모달 창(예: 라이트박스 또는 확인 창)이 열리면, Gantt에서 모달로 포커스가 이동하며, 일반 폼과 같이 모달 내에서 내비게이션이 이루어집니다. 창을 닫으면 포커스가 다시 Gantt로 돌아옵니다.

Gantt로 포커스를 다시 옮기려면 [focus](api/method/focus.md) 메서드를 사용하세요. Gantt가 포커스를 다시 얻으면, 내부의 활성 요소, 첫 번째 행, 또는 마지막으로 선택된 요소에 포커스가 위치합니다.

모달 창 내 기본 내비게이션 동작은 다음과 같습니다:

- *Enter* - 확인 및 닫기
- *Escape* - 변경 없이 닫기

포커스가 폼 버튼에 있을 때 *Space* 또는 *Enter*를 누르면 모달 동작 대신 해당 버튼이 활성화됩니다.




:::note
포커스가 그리드 셀이나 행에 설정되어 있을 때, Gantt 내부의 커스텀 HTML 요소를 클릭하면 포커스가 다시 그리드 셀이나 행으로 돌아옵니다.

v7.1.13부터, 커스텀 요소에 *'no_keyboard_navigation'* 클래스를 추가하면 포커스가 그리드 셀이나 행으로 돌아가지 않습니다.
:::

## 스코프 {#scopes}

키를 눌렀을 때 발생하는 동작은 컨텍스트(스코프)에 따라 다릅니다. Gantt 차트 내의 다양한 요소(스코프)에 서로 다른 단축키를 할당할 수 있습니다:

- **"gantt"** - 전체 Gantt 차트
- **"taskRow"** - 작업을 나타내는 행
- **"taskCell"** - 작업 행 내의 셀
- **"headerCell"** - 헤더의 셀

동일한 단축키가 여러 스코프에 할당된 경우, 더 구체적인 스코프의 단축키가 우선적으로 실행됩니다. 예를 들어, Gantt와 특정 요소에 동시에 단축키가 할당되어 있으면, 요소의 단축키가 동작합니다.

### 단축키 추가

새로운 키보드 단축키를 추가하려면 [addShortcut](api/method/addshortcut.md) 메서드를 세 개의 파라미터와 함께 사용하세요:

- **shortcut** - (*string*) 단축키 또는 키 조합
- **handler** - (*function*) 단축키가 트리거될 때 호출되는 함수
- **scope** - (*string*) 핸들러의 컨텍스트 요소(선택 사항, 기본값은 "gantt")

~~~js
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},"taskRow");
~~~

### 단축키 제거

스코프에서 단축키를 제거하려면 [removeShortcut](api/method/removeshortcut.md) 메서드를 두 개의 파라미터와 함께 사용하세요:

- **shortcut** - (*string*) 제거할 단축키 또는 키 조합
- **scope** - (*string*) 단축키를 제거할 컨텍스트 요소

~~~js
gantt.removeShortcut("shift+w","taskRow");
~~~

### 단축키 핸들러 가져오기

단축키의 핸들러 함수를 가져오려면 [getShortcutHandler](api/method/getshortcuthandler.md) 메서드를 사용하며, 다음과 같은 파라미터가 필요합니다:

- **shortcut** - (*string*) 단축키 또는 키 조합
- **scope** - (*string*) 단축키가 연결된 컨텍스트 요소

~~~js
var shortcut_handler = gantt.getShortcutHandler("shift+w","taskRow");
~~~

이 메서드는 해당 단축키를 처리하는 함수를 반환합니다.

## 단축키 문법 {#shortcutsyntax}

키보드 단축키는 다음과 같이 지정할 수 있습니다:

- 조합키와 문자키 (예: "ctrl+a")
- 조합키와 문자 이외의 키 (예: "ctrl+space")
- 단일 문자키 (예: "a")
- 단일 문자 이외의 키 (예: "space")

하나의 동작에 여러 키 조합을 할당하려면 "ctrl+a, ctrl+space"처럼 콤마로 구분하여 나열하면 됩니다.

### 단축키로 지원되는 키

- 조합키: **shift**, **alt**, **ctrl**, **meta**
- 문자 이외의 키: **backspace**, **tab**, **enter**, **esc**, **space**, **up**, **down**, **left**, **right**, **home**, **end**, **pageup**, **pagedown**, **delete**, **insert**, **plus**, **f1-f12**

## 내장 단축키 {#existingshortcuts}

Gantt 차트 내비게이션을 위한 여러 내장 단축키가 제공됩니다:

### 일반 키보드 단축키:

- **Tab** - Gantt에 포커스 이동
- **Alt+Up/Down** - 수직 스크롤
- **Alt+Left/Right** - 수평 스크롤
- **Ctrl+Enter** - 새 작업 생성
- **Ctrl+Z** - 마지막 작업 실행 취소
- **Ctrl+R** - 실행 취소된 작업 다시 실행

### 헤더 셀 단축키

- **왼쪽/오른쪽 방향키** - 헤더 셀 간 이동
- **Home/End** - 첫 번째/마지막 열로 이동
- **Down** - 작업 행으로 이동
- **Space/Enter** - 헤더 셀 활성화(예: 정렬)

### 작업 행 단축키

- **Up/Down** - 행 간 이동
- **PageDown/PageUp** - 마지막/첫 번째 작업으로 이동
- **Space** - 작업 선택
- **Ctrl+Enter** - 새 작업 생성
- **Delete** - 선택된 작업 삭제
- **Enter** - 라이트박스 열기
- **Ctrl+Left/Right** - 트리 확장/축소
- **Shift+Left/Right** - 작업 들여쓰기/내어쓰기
- **Shift+Down/Up** - 브랜치 확장/축소


[Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)


:::note
**Ctrl+C/Ctrl+V** 단축키를 이용한 작업 복사/붙여넣기 구현 예시는 [관련](guides/how-to.md#howtocopyandpastetasks) 문서에서 확인할 수 있습니다.
:::

### 작업 셀 단축키

- **위/아래/왼쪽/오른쪽 방향키** - 작업 셀 간 이동
- **PageDown/PageUp** - 열의 첫 번째/마지막 셀로 이동
- **Home/End** - 열의 첫 번째/마지막 셀로 이동
- **Space** - 작업 선택
- **Ctrl+Enter** - 새 작업 생성
- **Delete** - 선택된 작업 삭제
- **Enter** - 라이트박스 열기
- **Ctrl+Left/Right** - 트리 확장/축소


[Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)


## 수평 타임라인 스크롤을 위한 내장 단축키 {#builtinshortcutforhorizontaltimelinescrolling}


버전 4.2부터, Gantt 차트는 다음을 이용한 수평 타임라인 스크롤을 지원합니다:

-> **Shift** 키 + **마우스 휠 이동**.

버전 6.3부터는 [horizontal_scroll_key](api/config/horizontal_scroll_key.md) 속성을 사용해 기본 **Shift** 키를 **Alt** 또는 **Meta**로 변경할 수 있습니다:

~~~js
gantt.config.horizontal_scroll_key = "altKey";
~~~

마우스 휠을 통한 수평 스크롤을 비활성화하려면 해당 속성을 *false*로 설정하세요:

~~~js
gantt.config.horizontal_scroll_key = false;
~~~

