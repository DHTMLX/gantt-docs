--- 
title: "从 MS Project 导入的属性"
sidebar_label: "从 MS Project 导入的属性"
---

# 从 MS Project 导入的属性

## 项目属性

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

## Tasks properties

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

<div class="msp-task-properties">
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

### 重要说明

请注意，某些属性仅从 MPP 文件获取，因为这些属性不会保存在 XML 文件中。
因此，将 MPP 文件保存为 XML 格式后，再在 MS Project 打开时，相关属性也不会出现。例如，所有 OutlineCode 属性的工作方式如下：尽管可以从列表中选择值，但保存在 MPP 文件中的值在 XML 文件中将为空。

某些属性是基于其他属性计算的，例如 CV% 和 SV%，因此文件中没有这些值。为提高便利性，我们在导出模块端增加了计算。因此，在导入 XML 文件时，所述属性会具有数值，但它们可能与导出文件并在 MS Project 中打开的结果不同。

## 资源属性

:::info
一些属性只能从 MPP 文件获取，而其他属性只能从 XML 文件获取。

一些属性是基于其他属性计算的，因此如果在导入过程中未指定某些必需的属性，它们将具有不同的值。
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

还有更多受支持的资源属性：

<div class="msp-ext-properties">

| Text | Number | Flag | Cost | Date | Start | Finish | Duration | OutlineCode | OutlineCodeIndex |
|---|---|---|---|---|---|---|---|---|---|
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

