--- 
title: "MS Project에서 가져오기 위한 속성"
sidebar_label: "MS Project에서 가져오기 위한 속성"
---

# MS Project에서 가져오기 위한 속성

## 프로젝트 속성

<div class="msp-properties">
| | | | |
|---|---|---|---|
| ActualsInSync | DaysPerMonth | InsertedProjectsLikeSummary | RemoveFileProperties |
| AdminProject | DefaultFinishTime | LastSaved | Revision |
| Author | DefaultFixedCostAccrual | Manager | ScheduleFromStart |
| AutoAddNewResourcesAndTasks | DefaultOvertimeRate | MicrosoftProjectServerURL | SplitsInProgressTasks |
| Autolink | DefaultStandardRate | MinutesPerDay | SpreadActualCost |
| BaselineForEarnedValue | DefaultStartTime | MinutesPerWeek | SpreadPercentComplete |
| CalendarUID | DefaultTaskEVMethod | MoveCompletedEndsBack | StartDate |
| Category | DefaultTaskType | MoveCompletedEndsForward | StatusDate |
| Company | DurationFormat | MoveRemainingStartsBack | Subject |
| CreationDate | EarnedValueMethod | MoveRemainingStartsForward | TaskUpdatesResource |
| CriticalSlackLimit | EditableActualCosts | MultipleCriticalPaths | Title |
| CurrencyCode | ExtendedCreationDate | Name | UID |
| CurrencyDigits | FinishDate | NewTasksEffortDriven | WeekStartDay |
| CurrencySymbol | FiscalYearStart | NewTasksEstimated | WorkFormat |
| CurrencySymbolPosition | FYStartDate | NewTaskStartDate | |
| CurrentDate | HonorConstraints | ProjectExternallyEdited | |
</div>

## 작업 속성

<div class="msp-properties">
| | | | |
|---|---|---|---|
| Active | DurationFormat | LevelingDelay | RemainingOvertimeWork |
| ActualCost | DurationText | LevelingDelayFormat | RemainingWork |
| ActualDuration | EarlyFinish | LinkedFields | ResponsePending |
| ActualFinish | EarlyStart | Manual | Resume |
| ActualOvertimeCost | EarnedValueMethod | ManualDuration | ResumeValid |
| ActualOvertimeWork | EffortDriven | Marked | Rollup |
| ActualStart | Estimated | Milestone | SPI |
| ActualWork | Finish | Name | Start |
| ACWP | FinishSlack | Notes | StartSlack |
| Baseline | FinishText | Objects | StartText |
| BCWP | FinishVariance | OutlineLevel | StartVariance |
| BCWS | FixedCost | OutlineNumber | Stop |
| CalendarUID | FixedCostAccrual | OverAllocated | SubprojectName |
| CompleteThrough | FreeSlack | OvertimeCost | SubprojectReadOnly |
| ConstraintDate | GUID | OvertimeWork | Successors |
| ConstraintType | HideBar | PercentComplete | Summary |
| Contact | Hyperlink | PercentWorkComplete | SV |
| Cost | HyperlinkAddress | PhysicalPercentComplete | SVPercent (internal MSP property that is not added to files) |
| CostVariance | HyperlinkSubAddress | Placeholder | SV% (internal MSP property that is not added to files) |
| CPI | ID (don't include it if it doesn't match the task ID) | Predecessors | TaskMode |
| CreateDate | IgnoreResourceCalendar | Project | TotalSlack |
| Critical | Indicators | Publish | Type |
| CV | IsPublished | Priority | UID |
| CVPercent (internal MSP property that is not added to files) | IsSubproject | Recurring | UpdateNeeded |
| CV%  (internal MSP property that is not added to files)| LateFinish | RegularWork | WBS |
| Deadline | LateStart | RemainingCost | Work |
| Duration | LevelAssignments | RemainingDuration | WorkVariance |
| DurationVariance | LevelingCanSplit | RemainingOvertimeCost | |
</div>


There are also the following supported task properties:

<div class="msp-ext-properties">
| Text | Number | Flag | Cost | Date | Start | Finish | Duration | OutlineCode |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Text1 | Number1 | Flag1 | Cost1 | Date1 | Start1 | Finish1 | Duration1 | OutlineCode1 |
| Text2 | Number2 | Flag2 | Cost2 | Date2 | Start2 | Finish2 | Duration2 | OutlineCode2 |
| Text3 | Number3 | Flag3 | Cost3 | Date3 | Start3 | Finish3 | Duration3 | OutlineCode3 |
| Text4 | Number4 | Flag4 | Cost4 | Date4 | Start4 | Finish4 | Duration4 | OutlineCode4 |
| Text5 | Number5 | Flag5 | Cost5 | Date5 | Start5 | Finish5 | Duration5 | OutlineCode5 |
| Text6 | Number6 | Flag6 | Cost6 | Date6 | Start6 | Finish6 | Duration6 | OutlineCode6 |
| Text7 | Number7 | Flag7 | Cost7 | Date7 | Start7 | Finish7 | Duration7 | OutlineCode7 |
| Text8 | Number8 | Flag8 | Cost8 | Date8 | Start8 | Finish8 | Duration8 | OutlineCode8 |
| Text9 | Number9 | Flag9 | Cost9 | Date9 | Start9 | Finish9 | Duration9 | OutlineCode9 |
| Text10 | Number10 | Flag10 | Cost10 | Date10 | Start10 | Finish10 | Duration10 | OutlineCode10 |
| Text11 | Number11 | Flag11 | | | | | | |
| Text12 | Number12 | Flag12 | | | | | | |
| Text13 | Number13 | Flag13 | | | | | | |
| Text14 | Number14 | Flag14 | | | | | | |
| Text15 | Number15 | Flag15 | | | | | | |
| Text16 | Number16 | Flag16 | | | | | | |
| Text17 | Number17 | Flag17 | | | | | | |
| Text18 | Number18 | Flag18 | | | | | | |
| Text19 | Number19 | Flag19 | | | | | | |
| Text20 | Number20 | Flag20 | | | | | | |
| Text21 | | | | | | | | |
| Text22 | | | | | | | | |
| Text23 | | | | | | | | |
| Text24 | | | | | | | | |
| Text25 | | | | | | | | |
| Text26 | | | | | | | | |
| Text27 | | | | | | | | |
| Text28 | | | | | | | | |
| Text29 | | | | | | | | |
| Text30 | | | | | | | | |
</div>

### 중요한 메모

일부 속성은 MPP 파일에서만 수신될 수 있으며, XML 파일에는 저장되지 않습니다.
따라서 MPP 파일을 XML 형식으로 저장한 다음 MS Project에서 열면, 해당 속성들이 XML 파일에도 존재하지 않습니다. 예를 들어, 모든 OutlineCode 속성은 이 방식으로 작동합니다: 목록에서 값을 선택할 수 있어도, MPP 파일에 저장된 값은 XML 파일에서 비어 있을 것입니다.

일부 속성은 다른 속성에 기반하여 계산되므로 파일에는 이러한 값이 없을 수 있습니다. 편의를 위해 내보내기 모듈 측에서 계산을 추가했습니다. 따라서 XML 파일을 가져올 때 언급된 속성들에는 값이 있을 수 있지만, 이것이 MS Project에서 파일을 내보내고 열었을 때의 결과와 다를 수 있습니다.

## 자원 속성

:::info
일부 속성은 MPP 파일에서만 수신될 수 있고, 다른 속성은 XML 파일에서만 수신될 수 있습니다. 또한 일부 속성은 다른 속성에 기반하여 계산되므로 가져올 때 값이 다를 수 있습니다.
:::

<div class="msp-properties">
| | | | |
|---|---|---|---|
| AccrueAt | Baseline6BudgetWork | CostRateE | OvertimeWork |
| Active | Baseline6Cost | CostVariance | ParentFile |
| ActiveDirectoryGUID | Baseline6Work | Created | ParentResource |
| ActualCost | Baseline7BudgetCost | CreationDate | ParentResourceUniqueID |
| ActualOvertimeCost | Baseline7BudgetWork | CurrentAvailabilityTableEntry | Peak |
| ActualOvertimeWork | Baseline7Cost | CV | PeakUnits |
| ActualOvertimeWorkProtected | Baseline7Work | DefaultUnits | PercentWorkComplete |
| ActualWork | Baseline8BudgetCost | Description | PerDay |
| ActualWorkProtected | Baseline8BudgetWork | EmailAddress | PeriodDur |
| ACWP | Baseline8Cost | Enterprise | Phone |
| Availability | Baseline8Work | ExpensesOnly | Phonetics |
| AvailableFrom | Baseline9BudgetCost | Finish | Pool |
| AvailableTo | Baseline9BudgetWork | Generic | Priority |
| BaseCalendar | Baseline9Cost | Group | Rate |
| Baseline10BudgetCost | Baseline9Work | GUID | RegularWork |
| Baseline10BudgetWork | BaselineBudgetCost | Hyperlink | RemainingCost |
| Baseline10Cost | BaselineBudgetWork | HyperlinkAddress | RemainingOvertimeCost |
| Baseline10Work | BaselineCost | HyperlinkData | RemainingOvertimeWork |
| Baseline1BudgetCost | BaselineWork | HyperlinkScreenTip | RemainingWork |
| Baseline1BudgetWork | BCWP | HyperlinkSubAddress | ResourceID |
| Baseline1Cost | BCWS | ID | Role |
| Baseline1Work | BookingType | Initials | SequenceNumber |
| Baseline2BudgetCost | Budget | IsNull | StandardRate |
| Baseline2BudgetWork | BudgetCost | LinkedFields | StandardRateUnits |
| Baseline2Cost | BudgetWork | Location | Start |
| Baseline2Work | CalculateCostsFromUnits | LocationUniqueID | SubprojectResourceUniqueID |
| Baseline3BudgetCost | Calendar | MaterialLabel | SubprojectUniqueResourceID |
| Baseline3BudgetWork | CalendarGUID | MaxUnits | SupplyReference |
| Baseline3Cost | CalendarUniqueID | ModifyOnIntegrate | SV |
| Baseline3Work | CanLevel | Name | TaskAssignments |
| Baseline4BudgetCost | ChildResources | Notes | Type |
| Baseline4BudgetWork | Code | NotesObject | UniqueID |
| Baseline4Cost | Cost | NtAccount | Unit |
| Baseline4Work | CostCenter | Null | UnitOfMeasure |
| Baseline5BudgetCost | CostPerUse | Objects | UnitofMeasureUniqueID |
| Baseline5BudgetWork | CostRateA | OverAllocated | Work |
| Baseline5Cost | CostRateB | OvertimeCost | Workgroup |
| Baseline5Work | CostRateC | OvertimeRate | WorkVariance |
| Baseline6BudgetCost | CostRateD | OvertimeRateUnits | |
</div>

추가로 지원되는 자원 속성도 있습니다:

<div class="msp-ext-properties">

| Text | Number | Flag | Cost | Date | Start | Finish | Duration | OutlineCode | OutlineCodeIndex |
|---|---|---|---|---|---|---|---|---|
| Text1 | Number1 | Flag1 | Cost1 | Date1 | Start1 | Finish1 | Duration1 | OutlineCode1 | OutlineCode1Index |
| Text2 | Number2 | Flag2 | Cost2 | Date2 | Start2 | Finish2 | Duration2 | OutlineCode2 | OutlineCode2Index |
| Text3 | Number3 | Flag3 | Cost3 | Date3 | Start3 | Finish3 | Duration3 | OutlineCode3 | OutlineCode3Index |
| Text4 | Number4 | Flag4 | Cost4 | Date4 | Start4 | Finish4 | Duration4 | OutlineCode4 | OutlineCode4Index |
| Text5 | Number5 | Flag5 | Cost5 | Date5 | Start5 | Finish5 | Duration5 | OutlineCode5 | OutlineCode5Index |
| Text6 | Number6 | Flag6 | Cost6 | Date6 | Start6 | Finish6 | Duration6 | OutlineCode6 | OutlineCode6Index |
| Text7 | Number7 | Flag7 | Cost7 | Date7 | Start7 | Finish7 | Duration7 | OutlineCode7 | OutlineCode7Index |
| Text8 | Number8 | Flag8 | Cost8 | Date8 | Start8 | Finish8 | Duration8 | OutlineCode8 | OutlineCode8Index |
| Text9 | Number9 | Flag9 | Cost9 | Date9 | Start9 | Finish9 | Duration9 | OutlineCode9 | OutlineCode9Index |
| Text10 | Number10 | Flag10 | Cost10 | Date10 | Start10 | Finish10 | Duration10 | OutlineCode10 | OutlineCode10Index |
| Text11 | Number11 | Flag11 | | | | | | OutlineCode11 | OutlineCode11Index |
| Text12 | Number12 | Flag12 | | | | | | OutlineCode12 | OutlineCode12Index |
| Text13 | Number13 | Flag13 | | | | | | OutlineCode13 | OutlineCode13Index |
| Text14 | Number14 | Flag14 | | | | | | OutlineCode14 | OutlineCode14Index |
| Text15 | Number15 | Flag15 | | | | | | OutlineCode15 | OutlineCode15Index |
| Text16 | Number16 | Flag16 | | | | | | OutlineCode16 | OutlineCode16Index |
| Text17 | Number17 | Flag17 | | | | | | OutlineCode17 | OutlineCode17Index |
| Text18 | Number18 | Flag18 | | | | | | OutlineCode18 | OutlineCode18Index |
| Text19 | Number19 | Flag19 | | | | | | OutlineCode19 | OutlineCode19Index |
| Text20 | Number20 | Flag20 | | | | | | OutlineCode20 | OutlineCode20Index |
| Text21 | | | | | | | | OutlineCode21 | OutlineCode21Index |
| Text22 | | | | | | | | OutlineCode22 | OutlineCode22Index |
| Text23 | | | | | | | | OutlineCode23 | OutlineCode23Index |
| Text24 | | | | | | | | OutlineCode24 | OutlineCode24Index |
| Text25 | | | | | | | | OutlineCode25 | OutlineCode25Index |
| Text26 | | | | | | | | OutlineCode26 | OutlineCode26Index |
| Text27 | | | | | | | | OutlineCode27 | OutlineCode27Index |
| Text28 | | | | | | | | OutlineCode28 | OutlineCode28Index |
| Text29 | | | | | | | | OutlineCode29 | OutlineCode29Index |
| Text30 | | | | | | | | OutlineCode30 | OutlineCode30Index |
</div>
