---
title: "내보내기 모듈"
sidebar_label: "내보내기 모듈"
---

# 내보내기 모듈

내보내기 모듈은 `https://export.dhtmlx.com`의 온라인 내보내기 서비스 대신 자체 서버에 설치하는 내보내기 서비스입니다. 내보내기 및 가져오기 요청을 자체 모듈로 보내려면 내보내기 및 가져오기 메서드의 `server` 매개변수를 모듈의 주소로 설정하십시오:

~~~js
gantt.exportToPDF({
    server: "https://myapp.com/myexport/gantt"
});
~~~

대용량 차트를 내보내거나, 온라인 내보내기 서비스의 제한 없이 내보내거나, 프로젝트 데이터를 사내 네트워크에 보관해야 할 때 내보내기 모듈을 사용하십시오. 형식과 메서드의 목록은 [데이터 내보내기 및 가져오기](guides/export-common.md)를 참조하십시오.

## 두 가지 모듈

| 모듈 | 구현 | 형식 | 요구사항 | 설치 | 버전 기록 |
|---|---|---|---|---|---|
| PDF/PNG/Excel 모듈 | Node.js, Docker 이미지로도 제공 | PDF, PNG, Excel(내보내기 및 가져오기), iCal, JSON | [시스템 요구사항](guides/export-requirements.md#pdfpngexcel-service) | [PDF, PNG, Excel 및 iCal용 내보내기 모듈](guides/pdf-export-module.md) | [새로운 기능](guides/pdf-export-module-whatsnew.md) |
| MS Project/P6 모듈 | .NET (C#) | MS Project 및 Primavera P6(내보내기 및 가져오기) | [시스템 요구사항](guides/export-requirements.md#import-and-export-from-ms-project-and-primavera-p6) | [MS Project 및 Primavera P6용 내보내기 모듈](guides/msp-export-module.md) | [새로운 기능](guides/msp-export-module-whatsnew.md) |

두 모듈 모두 [클라이언트 영역](https://dhtmlx.com/clients/)의 다운로드 탭에서 다운로드할 수 있습니다.

## 두 모듈의 상호 작용 방식 {#service-topology}

각 모듈은 자신의 형식만 처리합니다:

- PDF/PNG/Excel 모듈은 PDF, PNG, Excel, iCal 및 JSON 파일을 생성하고 Excel 파일을 가져옵니다. MS Project 및 Primavera P6 파일은 변환할 수 없습니다. MS Project 또는 Primavera P6 요청을 받으면 해당 요청을 MS Project 서비스로 전달합니다.
- MS Project/P6 모듈은 MS Project 및 Primavera P6 요청만 처리합니다. 다른 요청(예: `gantt.exportToPDF({server: "msp-module-url"})`)은 작동하지 않습니다.

| 메서드 | PDF/PNG/Excel 모듈이 요청을 처리하는 방식 |
|---|---|
| `exportToPDF()`, `exportToPNG()`, `exportToExcel()`, `importFromExcel()`, `exportToICal()`, `exportToJSON()` | 직접 처리합니다 |
| `exportToMSProject()`, `importFromMSProject()`, `exportToPrimaveraP6()`, `importFromPrimaveraP6()` | `MSP_SERVICE_ENDPOINT` 환경 변수에 지정된 주소로 전달합니다. 기본 주소는 온라인 서비스 `https://export.dhtmlx.com/msproject`입니다 |

:::warning
기본적으로 서버에 설치된 PDF/PNG/Excel 모듈은 모든 MS Project 및 Primavera P6 데이터를 `https://export.dhtmlx.com/msproject`의 온라인 내보내기 서비스로 보냅니다. 이 데이터를 사내 네트워크에 보관하려면 MS Project/P6 모듈을 설치하고 `MSP_SERVICE_ENDPOINT`를 해당 모듈의 주소로 설정하십시오.
:::

MS Project 및 Primavera P6 요청을 MS Project/P6 모듈로 직접 보낼 수도 있습니다. `exportToMSProject()`, `importFromMSProject()`, `exportToPrimaveraP6()`, `importFromPrimaveraP6()`의 `server` 매개변수를 해당 모듈의 주소로 설정하십시오.

## 모든 데이터를 사내 네트워크 안에 보관하기

1. 사용하는 모든 내보내기 및 가져오기 메서드의 `server` 매개변수를 자체 모듈의 주소로 설정하십시오. `server`가 없는 메서드는 데이터를 온라인 내보내기 서비스로 보냅니다.
2. MS Project 또는 Primavera P6 요청이 PDF/PNG/Excel 모듈을 거치는 경우, 해당 모듈의 `MSP_SERVICE_ENDPOINT` 환경 변수를 MS Project/P6 모듈의 루트 주소로 설정하십시오. 예:

   ~~~
   MSP_SERVICE_ENDPOINT=http://localhost:5128
   ~~~

3. 내보내기가 사내 네트워크 밖의 호스트에 접속하지 않아야 한다면, PDF/PNG/Excel 모듈이 차트를 렌더링하는 동안 로드할 수 있는 외부 리소스를 제한하십시오. `EXPORT_ALLOWED_RESOURCE_HOSTS` 및 `EXPORT_BLOCK_EXTERNAL_RESOURCES` 환경 변수가 이 기능을 제공합니다. 모듈의 README 파일에 자세한 설명이 있습니다.

## 라이선스 및 다운로드

내보내기 모듈은 Gantt 패키지에 포함되어 있지 않습니다. 내보내기 모듈은 Gantt를 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 또는 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 라이선스로 획득한 경우 무료로 제공되며, 모듈을 별도로 [구매할 수도 있습니다](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210). 각 모듈의 이용 조건은 [해당 문서](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)를 읽고 확인하십시오.

라이선스를 받은 후 클라이언트 영역의 다운로드 탭에서 모듈을 다운로드하십시오.
