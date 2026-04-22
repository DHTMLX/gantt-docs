---
sidebar_label: locale
title: locale config
description: "현재 사용 중인 locale 객체로, 간트 차트에 지역별 맞춤 레이블을 포함합니다."
---

# locale

### Description

@short: Gantt 차트의 현재 로케일 객체(지역별 레이블)

@signature: locale: GanttLocale

### Example

~~~jsx
gantt.i18n.setLocale({
    date: {
        month_full: ["1월", "2월", "3월", "4월", "5월", "6월", 
            "7월", "8월", "9월", "10월", "11월", "12월"],
        month_short: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", 
            "8월", "9월", "10월", "11월", "12월"],
        day_full: ["일요일", "월요일", "화요일", "수요일", "목요일",
             "금요일", "토요일"],
        day_short: ["일", "월", "화", "수", "목", "금", "토"]
    },
    labels: {
        new_task: "새 작업",
        icon_save: "저장",
        icon_cancel: "취소",
        icon_details: "세부 정보",
        icon_edit: "수정",
        icon_delete: "삭제",
        gantt_save_btn: "새 레이블",
          gantt_cancel_btn: "새 레이블",
          gantt_delete_btn: "새 레이블",
        confirm_closing: "",// 변경 사항이 손실됩니다. 계속하시겠습니까?
        confirm_deleting: "작업을 영구적으로 삭제됩니다. 계속하시겠습니까?",
        section_description: "설명",
        section_time: "기간",
        section_type: "유형",

        /* 그리드 열 */
        column_wbs: "WBS",
        column_text: "작업 이름",
        column_start_date: "시작 시간",
        column_duration: "소요 시간",
        column_add: "",

        /* 링크 확인 */
        link: "링크",
        confirm_link_deleting: "삭제될 예정",
        link_start: " (시작)",
        link_end: " (종료)",

        type_task: "작업",
        type_project: "프로젝트",
        type_milestone: "마일스톤",

        minutes: "분",
        hours: "시간",
        days: "일",
        weeks: "주",
        months: "개월",
        years: "년",

        /* 메시지 팝업 */
        message_ok: "확인",
        message_cancel: "취소",

        /* 제약 조건 */
        section_constraint: "제약 조건",
        constraint_type: "제약 유형",
        constraint_date: "제약 날짜",
        asap: "가능한 한 빨리",
        alap: "가능한 한 늦게",
        snet: "시작은 이보다 일찍 시작할 수 없음",
        snlt: "시작은 이보다 늦게 시작할 수 없음",
        fnet: "완료는 이보다 일찍 완료할 수 없음",
        fnlt: "완료는 이보다 늦게 완료할 수 없음",
        mso: "반드시 시작해야 함",
        mfo: "반드시 완료해야 함",

        /* 리소스 제어 */
        resources_filter_placeholder: "필터링할 문자열 입력",
        resources_filter_label: "빈 항목 숨기기"
    }
});

console.log(gantt.locale);
~~~


### Details

현재 locale 설정은 **gantt.locale** 객체에 저장되며, 직접 업데이트할 수 있습니다. 예를 들어:

~~~js
gantt.locale.labels.new_task = "새 작업";
~~~

이는 다음과 동일합니다:

~~~js
gantt.i18n.setLocale({
    labels: {
        new_task: "새 작업"
    }
});    
~~~

두 방법 모두 지원되며 정상 작동합니다. 하지만 [gantt.i18n](api/other/i18n.md) 객체 API를 사용하는 방법이 권장됩니다.

### Related Guides
- [로컬라이제이션](guides/localization.md)

