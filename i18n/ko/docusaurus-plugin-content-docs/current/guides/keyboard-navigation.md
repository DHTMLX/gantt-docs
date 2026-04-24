---
title: "키보드 네비게이션"
sidebar_label: "키보드 네비게이션"
---

# 키보드 네비게이션

Gantt 차트와 그 요소에 키나 키 조합을 통해 접근할 수 있습니다. 이 문서는 Gantt의 키보드 네비게이션 특징에 필요한 모든 정보를 제공하며, 포커스 동작, 준비된 단축키의 사용 및 사용자 정의 단축키 생성을 포함합니다.

## 기능 활성화

Gantt 차트에서 키보드 네비게이션을 사용하려면 [gantt.plugins](api/method/plugins.md) 메서드를 이용해 **keyboard_navigation** 플러그인을 활성화해야 합니다.

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

**gantt.ext.keyboardNavigation** 객체의 API는 [Keyboard Navigation Extension](guides/keynav-ext.md) 문서에 제시되어 있습니다.

키보드 네비게이션에는 두 가지 변형이 있습니다:

- 작업 행으로의 탐색

이를 활성화하려면 [keyboard_navigation](api/config/keyboard_navigation.md) 속성을 *true*로 설정합니다.

- 작업 셀 단위의 탐색

이 탐색 유형을 사용하려면 [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md) 속성을 *true*로 설정합니다.

## 키보드 네비게이션 중 포커스 동작

### Gantt에 포커스

Tab 키를 누르면 일반 요소와 동일하게 Gantt에 포커스가 적용됩니다. 그다음 Gantt를 탐색하려면 화살표 키와 다른 키들을 사용할 수 있습니다.

Tab 키를 두 번째로 누르면 포커스가 Gantt를 벗어나 페이지의 다른 위치로 이동합니다.

### 모달 윈도우에 포커스

모달 윈도우(라이트박스, 확인 창)가 열리면 포커스가 Gantt에서 이 창으로 이동하고, 이 창 내부에서 일반 폼처럼 탐색이 이루어집니다. 창이 닫히면 포커스가 다시 Gantt로 돌아갑니다.

포커스를 다시 Gantt로 되돌리려면 [focus](api/method/focus.md) 메서드를 사용해야 합니다. Gantt가 다시 포커스를 얻으면 내부의 활성 요소에 포커스를 두거나, 첫 번째 행 또는 가장 최근에 선택된 요소에 포커스를 배치합니다.

모달 창에서의 기본 탐색 동작은 다음과 같습니다:

- *Enter* - 확인하고 닫기
- *Escape* - 변경 없이 닫기

폼의 특정 버튼에 포커스가 설정된 상태에서 *Space* 또는 *Enter*를 누르면 포커스된 버튼이 눌리며 동작이 실행됩니다.

:::note
그리드 셀/행에 포커스를 지정한 채로 Gantt 내부의 사용자 정의 HTML 요소를 클릭하면 포커스가 그리드 셀/행으로 다시 돌아갑니다.

버전 7.1.13부터는 커스텀 요소에 *'no_keyboard_navigation'* 클래스를 추가하여 포커스가 그리드 셀/행로 복원되지 않도록 할 수 있습니다.
:::

## 스코프

키 클릭 시 호출되는 동작은 컨텍스트에 따라 다릅니다. 즉, 서로 다른 요소(스코프)에 서로 다른 동작을 연결할 수 있습니다. Gantt 차트에는 다음과 같은 컨텍스트 요소(스코프)가 있습니다:

- **"gantt"** - 전체 Gantt
- **"taskRow"** - 작업이 포함된 행
- **"taskCell"** - 작업이 포함된 행의 셀
- **"headerCell"** - 헤더의 셀

동일한 단축키가 여러 스코프에 연결되어 있을 경우, 더 구체적인 단축키가 작동합니다. 즉, 동일한 단축키가 Gantt와 그 요소에 모두 연결되어 있다면, 요소에 연결된 단축키가 먼저 호출됩니다.

### 단축키 추가하기

새로운 키보드 단축키를 만들려면 [addShortcut](api/method/addshortcut.md) 메서드를 사용하고 세 가지 매개변수를 전달해야 합니다:

- **shortcut** - (*string*) 새 단축키 키나 키 조합 이름
- **handler** - (*function*) 단축키 호출 시 실행될 핸들러 함수
- **scope** - (*string*) 선택적; 핸들러 함수를 연결할 컨텍스트 요소의 이름. 기본값은 "gantt"

~~~js
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},"taskRow");
~~~

### 단축키 제거하기

스코프에서 단축키를 제거하려면 [removeShortcut](api/method/removeshortcut.md) 메서드를 사용합니다. 이 메서드는 두 개의 매개변수를 받습니다:

- **shortcut** - (*string*) 단축키의 키 이름이나 조합
- **scope** - (*string*) 단축키가 연결된 컨텍스트 요소의 이름

~~~js
gantt.removeShortcut("shift+w","taskRow");
~~~

### 단축키 핸들러 얻기

키보드 단축키의 핸들러는 [getShortcutHandler](api/method/getshortcuthandler.md) 메서드를 통해 얻을 수 있습니다. 두 개의 매개변수를 받습니다:

- **shortcut** - (*string*) 단축키의 키 이름이나 조합
- **scope** - (*string*) 단축키가 연결된 컨텍스트 요소의 이름

~~~js
var shortcut_handler = gantt.getShortcutHandler("shift+w","taskRow");
~~~

이 메서드는 단축키 호출의 핸들러를 나타내는 함수를 반환합니다.

## 단축키 구문 {#shortcutsyntax}

키보드 단축키는 아래의 키나 키 조합으로 구성될 수 있습니다:

- 수정자 키 + 문자 키 ("ctrl+a");
- 수정자 키 + 비문자 키 ("ctrl+space");
- 문자 키 ("a");
- 비문자 키 ("space")

하나의 동작에 대해 여러 키 조합이 있을 수 있습니다. 이 경우 모든 조합은 쉼표로 구분되어 나열됩니다: "ctrl+a, ctrl+space".

### 단축키에 사용할 수 있는 지원 키 목록

- 수정자 키: **shift**, **alt**, **ctrl**, **meta**;
- 비문자 키: **backspace**, **tab**, **enter**, **esc**, **space**, **up**, **down**, **left**, **right**, **home**, **end**, **pageup**, **pagedown**, **delete**,
**insert**, **plus**, **f1-f12**.

## 기존 단축키들 {#existingshortcuts}

Gantt 차트를 탐색하는 데 미리 준비된 단축키 세트가 있습니다:

### 일반 키보드 단축키:

- **Tab** - Gantt에 포커스 설정
- **Alt+Up/Down** - Gantt를 세로로 스크롤
- **Alt+Left/Right** - Gantt를 가로로 스크롤
- **Ctrl+Enter** - 새 작업 생성
- **Ctrl+Z** - 실행 취소
- **Ctrl+R** - 다시 실행

### 헤더 셀용 단축키

- **Left/Right Arrow Keys** - 헤더 셀 간 탐색
- **Home/End** - 첫 열/마지막 열로 탐색
- **Down** - 작업이 있는 행으로 이동
- **Space/Enter** - 헤더 클릭(예: 정렬)

### 작업 행용 단축키

- **Up/Down** - 행 간 이동
- **PageDown/PageUp** - 첫 번째/마지막 작업으로 이동
- **Space** - 작업 선택
- **Ctrl+Enter** - 새 작업 생성
- **Delete** - 선택된 작업 제거
- **Enter** - 라이트박스 열기
- **Ctrl+Left/Right** - 트리 확장/축소
- **Shift+Left/Right** - 작업 들여쓰기/내어쓰기
- **Shift+Down/Up** - 브랜치 확장/축소

[키보드 네비게이션](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)

:::note
작업 복사/붙여넣기(Ctrl+C/Ctrl+V) 기능 구현 예시는 [관련](guides/how-to.md#how-to-copy-and-paste-tasks) 문서에서 확인하실 수 있습니다.
:::

### 작업 셀용 단축키

- **Up/Down/Left/Right Arrow Keys** - 작업 셀 간 이동
- **PageDown/PageUp** - 열의 첫 번째/마지막 셀로 이동
- **Home/End** - 열의 첫 번째/마지막 셀로 이동
- **Space** - 작업 선택
- **Ctrl+Enter** - 새 작업 생성
- **Delete** - 선택된 작업 제거
- **Enter** - 라이트박스 열기
- **Ctrl+Left/Right** - 트리 확장/축소

[키보드 내비게이션 - 셀로 이동](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

## 수평 타임라인 스크롤링을 위한 빌트인 단축키 {#builtinshortcutforhorizontaltimelinescrolling}

버전 4.2부터 Gantt 차트는 아래 조합으로 타임라인을 수평으로 스크롤할 수 있는 기능을 제공합니다:

- Shift 키 + 마우스 휠 움직임.

버전 6.3부터는 기본 Shift 키 대신 Alt 키 또는 Meta 키를 마우스 휠과 결합하여 사용할 수 있습니다. 이는 [horizontal_scroll_key](api/config/horizontal_scroll_key.md) 속성을 통해 설정합니다:

~~~js
gantt.config.horizontal_scroll_key = "altKey";
~~~

또는 [horizontal_scroll_key](api/config/horizontal_scroll_key.md) 속성을 *false*로 설정하여 수평 스크롤을 비활성화할 수 있습니다:

~~~js
gantt.config.horizontal_scroll_key = false;
~~~