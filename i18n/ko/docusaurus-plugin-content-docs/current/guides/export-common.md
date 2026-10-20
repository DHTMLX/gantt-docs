---
title: "데이터 내보내기 및 가져오기"
sidebar_label: "데이터 내보내기 및 가져오기"
---

# 데이터 내보내기 및 가져오기

dhtmlxGantt는 차트를 PDF, PNG, Excel, iCal, MS Project, Primavera P6 및 JSON 파일로 내보내고, Excel, MS Project 및 Primavera P6 파일에서 데이터를 가져올 수 있습니다. 모든 파일 내보내기와 가져오기는 내보내기 서비스를 통해 이루어집니다. 내보내기 서비스는 DHTMLX가 호스팅하는 온라인 내보내기 서비스이거나, 자체 서버에 설치하는 [내보내기 모듈](guides/export-modules.md)입니다.

이 문서에서 사용하는 용어는 다음과 같습니다:

- **내보내기 서비스**는 Gantt 데이터를 파일로, 또는 파일을 Gantt 데이터로 변환하는 소프트웨어입니다;
- **온라인 내보내기 서비스**는 DHTMLX가 `https://export.dhtmlx.com`에서 운영하는 내보내기 서비스 인스턴스입니다;
- **내보내기 모듈**은 직접 설치하여 실행하는 내보내기 서비스입니다.

## 내보내고 가져올 수 있는 항목

| 형식 | 내보내기 | 가져오기 | 메서드 | 내보내기 모듈 | 가이드 |
|---|---|---|---|---|---|
| PDF | 예 | - | [exportToPDF()](api/method/exporttopdf.md) | PDF/PNG/Excel 모듈 | [PDF 및 PNG](guides/export.md) |
| PNG | 예 | - | [exportToPNG()](api/method/exporttopng.md) | PDF/PNG/Excel 모듈 | [PDF 및 PNG](guides/export.md) |
| Excel | 예 | 예 | [exportToExcel()](api/method/exporttoexcel.md), [importFromExcel()](api/method/importfromexcel.md) | PDF/PNG/Excel 모듈 | [Excel](guides/excel.md) |
| iCal | 예 | - | [exportToICal()](api/method/exporttoical.md) | PDF/PNG/Excel 모듈 | [iCal](guides/ical.md) |
| MS Project | 예 | 예 | [exportToMSProject()](api/method/exporttomsproject.md), [importFromMSProject()](api/method/importfrommsproject.md) | MS Project/P6 모듈 | [MS Project](guides/export-msproject.md) |
| Primavera P6 | 예 | 예 | [exportToPrimaveraP6()](api/method/exporttoprimaverap6.md), [importFromPrimaveraP6()](api/method/importfromprimaverap6.md) | MS Project/P6 모듈 | [Primavera P6](guides/export-primavera.md) |
| JSON 파일 | 예 | - | [exportToJSON()](api/method/exporttojson.md) | PDF/PNG/Excel 모듈 | - |
| 페이지 내 JSON 또는 XML | 예 | - | [serialize()](api/method/serialize.md) | 필요 없음, 브라우저에서 실행됨 | [JSON 및 XML](guides/serialization.md) |

서버 측에서 데이터를 내보내고 가져오려면 [Node.js에서 데이터 내보내기 및 가져오기](guides/export-nodejs.md)를 참조하십시오.

## 내보내기 작동 방식

1. [plugins](api/method/plugins.md) 메서드로 `export_api` 플러그인을 활성화하고 내보내기 또는 가져오기 메서드(예: `gantt.exportToPDF()`)를 호출합니다.
2. 메서드가 POST 요청으로 Gantt 데이터를 내보내기 서비스에 보냅니다.
3. 내보내기 서비스가 파일을 생성하거나, 가져온 파일을 읽습니다.
4. 브라우저가 파일을 받습니다. 가져오기의 경우 메서드의 `callback` 함수가 데이터를 받습니다. 내보내기의 경우 `callback` 함수가 대신 생성된 파일의 URL을 받을 수 있습니다.

기본적으로 모든 메서드는 `https://export.dhtmlx.com/gantt`의 온라인 내보내기 서비스로 요청을 보냅니다. 요청을 다른 내보내기 서비스(예: 자체 내보내기 모듈)로 보내려면 메서드의 `server` 매개변수를 설정하십시오:

~~~js
gantt.exportToPDF({
    server: "https://myapp.com/myexport/gantt"
});
~~~

## 온라인 내보내기 서비스 또는 자체 설치

- **워터마크.** 온라인 내보내기 서비스는 무료이지만, 유효한 라이선스가 없으면 서비스가 생성하는 PDF 및 PNG 파일에 워터마크가 포함됩니다. [라이선스 및 워터마크](#license-and-watermark)를 참조하십시오.
- **제한.** 온라인 내보내기 서비스에는 시간 제한과 요청 크기 제한이 있습니다. [온라인 내보내기 서비스 제한](#service-limits)을 참조하십시오. 직접 설치한 내보내기 모듈에는 사용자가 구성한 제한이 적용됩니다.
- **데이터 위치.** 온라인 내보내기 서비스는 DHTMLX 서버에서 데이터를 처리합니다. 내보내기 모듈을 사용하면 데이터를 사내 네트워크에 보관할 수 있습니다. [두 모듈의 상호 작용 방식](guides/export-modules.md#service-topology)을 참조하십시오.
- **설정.** 온라인 내보내기 서비스는 별도의 설정이 필요 없습니다. 내보내기 모듈에는 서버가 필요합니다. PDF/PNG/Excel 모듈에는 Node.js 또는 Docker, MS Project/P6 모듈에는 .NET이 필요합니다. [내보내기 모듈](guides/export-modules.md)을 참조하십시오.

## 온라인 내보내기 서비스 제한 {#service-limits}

:::note
온라인 내보내기 서비스에는 시간 제한과 요청 크기 제한이 있습니다.
:::

### 시간 제한

프로세스가 20초를 초과하면 내보내기가 취소되고 다음과 같은 오류가 발생합니다:

~~~html
Error: Timeout trigger 20 seconds
~~~

동시에 여러 사용자가 Gantt를 내보내면 프로세스가 평소보다 오래 걸릴 수 있습니다. 하지만 특정 사용자의 내보내기 요청에 소요된 시간은 별도로 계산되므로 문제되지 않습니다.

### 요청 크기 제한

모든 내보내기 메서드(*exportToPDF*, *exportToPNG*, *exportToMSProject* 등)에 공용으로 사용되는 API 엔드포인트 `https://export.dhtmlx.com/gantt`가 있습니다. **최대 요청 크기는 10 MB**입니다.

MS Project 및 Primavera P6의 내보내기/가져오기 서비스(*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* 만 해당)에 특화된 별도의 API 엔드포인트 `https://export.dhtmlx.com/gantt/project`도 있습니다. **최대 요청 크기: 40 MB**. 사용 방법은 [MS Project](guides/export-msproject.md#limits-on-request-size-and-import-of-large-files) 및 [Primavera P6](guides/export-primavera.md#limits-on-request-size-and-import-of-large-files)를 참조하십시오.

## 라이선스 및 워터마크 {#license-and-watermark}

:::note
온라인 내보내기 서비스는 무료이지만, 출력되는 PDF 및 PNG 파일에는 라이브러리의 워터마크가 포함됩니다.
워터마크 없이 내보내려면 유효한 라이선스가 필요합니다 - 워터마크 없는 내보내기 결과는 유효한 지원 기간(모든 PRO 라이선스의 경우 12개월) 동안 제공됩니다.
:::

내보내기 모듈은 Gantt 패키지에 포함되어 있지 않습니다. 내보내기 모듈은 Gantt를 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 또는 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 라이선스로 획득한 경우 무료로 제공되며, 모듈을 별도로 [구매할 수도 있습니다](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210). 각 모듈의 이용 조건은 [해당 문서](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)를 읽고 확인하십시오.
