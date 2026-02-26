---
title: "Properties for importing from MS Project"
sidebar_label: "Properties for importing from MS Project"
---

# Properties for importing from MS Project

## Project properties

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
| Active | DurationText | LevelingDelayFormat | RemainingOvertimeWork |
| ActualCost | EarlyFinish | LinkedFields | RemainingWork |
| ActualDuration | EarlyStart | Manual | ResponsePending |
| ActualFinish | EarnedValueMethod | ManualDuration | Resume |
| ActualOvertimeCost | EffortDriven | Marked | ResumeValid |
| ActualOvertimeWork | Estimated | Milestone | Rollup |
| ActualStart | Finish | Name | SPI |
| ActualWork | FinishSlack | Notes | Start |
| ACWP | FinishText | Objects | StartSlack |
| Baseline | FinishVariance | OutlineLevel | StartText |
| BCWP | FixedCost | OutlineNumber | StartVariance |
| BCWS | FixedCostAccrual | OverAllocated | Stop |
| CalendarUID | FreeSlack | OvertimeCost | SubprojectName |
| CompleteThrough | GUID | OvertimeWork | SubprojectReadOnly |
| ConstraintDate | HideBar | PercentComplete | Successors |
| ConstraintType | Hyperlink | PercentWorkComplete | Summary |
| Contact | HyperlinkAddress | PhysicalPercentComplete | SV |
| Cost | HyperlinkSubAddress | Placeholder | SVPercent (internal MSP property that is not added to files) |
| CostVariance | ID (don't include it if it doesn't match the task ID) | Predecessors | SV% (internal MSP property that is not added to files) |
| CPI | IgnoreResourceCalendar | Project | TaskMode |
| CreateDate | Indicators | Publish | TotalSlack |
| Critical | IsPublished | Priority | Type |
| CV | IsSubproject | Recurring | UID |
| CVPercent (internal MSP property that is not added to files) | LateFinish | RegularWork | UpdateNeeded |
| CV%  (internal MSP property that is not added to files)| LateStart | RemainingCost | WBS |
| Deadline | LevelAssignments | RemainingDuration | Work |
| Duration | LevelingCanSplit | RemainingOvertimeCost | WorkVariance |
| DurationVariance | LevelingDelay | | |
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

### Important notes

Pay attention that some of the properties are received only from the MPP files, as these properties aren't saved in XML files.
Thus, if you save an MPP file into the XML format, and then open it in MS Project, there won't be the properties in question as well. For example, all the OutlineCode properties work in this way: despite the possibility to select values from the list, the values saved in an MPP file will be empty in an XML file.

Some properties are calculated based on other properties, e.g. CV% and SV%, so files don't have these values. To make it more convenient, we've added calculations on the side of the export module. That's why on importing XML files the mentioned properties will have values, but they may differ from the result of exporting files and opening them in MS Project.

## Resource properties

:::info
Some of the properties can be received only from MPP-files, while others - only from XML-files. 

Some of the properties are calculated based on other properties, so if some of the required properties aren't specified during the import, they will have different values.
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

There are more supported resource properties:


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
| Text11 | Number11 | Flag11 | | | | | | | |
| Text12 | Number12 | Flag12 | | | | | | | |
| Text13 | Number13 | Flag13 | | | | | | | |
| Text14 | Number14 | Flag14 | | | | | | | |
| Text15 | Number15 | Flag15 | | | | | | | |
| Text16 | Number16 | Flag16 | | | | | | | |
| Text17 | Number17 | Flag17 | | | | | | | |
| Text18 | Number18 | Flag18 | | | | | | | |
| Text19 | Number19 | Flag19 | | | | | | | |
| Text20 | Number20 | Flag20 | | | | | | | |
| Text21 | | | | | | | | | |
| Text22 | | | | | | | | | |
| Text23 | | | | | | | | | |
| Text24 | | | | | | | | | |
| Text25 | | | | | | | | | |
| Text26 | | | | | | | | | |
| Text27 | | | | | | | | | |
| Text28 | | | | | | | | | |
| Text29 | | | | | | | | | |
| Text30 | | | | | | | | | |
