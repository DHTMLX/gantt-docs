---
title: "Properties for importing from Primavera"
sidebar_label: "Properties for importing from Primavera"
---

# Properties for importing from Primavera

## Project properties

<div class="msp-properties">
| | | | |
|---|---|---|---|
| AMText | CriticalSlackLimit | GUID | PreserveMinimumFloatWhenLeveling |
| ActivityIdIncrement | CurrencyDigits | HonorConstraints | PreserveScheduledEarlyAndLateDates |
| ActivityIdIncrementBasedOnSelectedActivity | CurrencySymbol | HyperlinkBase | ProjectCodeValues |
| ActivityIdPrefix | CurrentDate | IgnoreRelationshipsToAndFromOtherProjects | ProjectExternallyEdited |
| ActivityIdSuffix | CustomProperties | InsertedProjectsLikeSummary | ProjectID |
| ActualCost | DataDateAndPlannedStartSetToProjectForecastStart | LevelAllResources | ProjectIsBaseline |
| ActualDuration | DateFormat | LevelResourcesOnlyWithinActivityTotalFloat | ProjectTitle |
| ActualFinish | DateOrder | LevelingPriorities | ProjectWebsiteUrl |
| ActualStart | DateSeparator | LimitNumberOfFloatPathsToCalculate | RelationshipLagCalendar |
| ActualWork | DaysPerMonth | MakeOpenEndedActivitiesCritical | RemoveFileProperties |
| ActualsInSync | DecimalSeparator | MaxPercentToOverallocateResources | ScheduleFrom |
| AdminProject | DefaultCalendarUniqueID | MaximumNumberOfFloatPathsToCalculate | ScheduledFinish |
| AutoAddNewResourcesAndTasks | DefaultDurationIsFixed | MicrosoftProjectServerURL | SchedulingProgressedActivities |
| AutoFilter | DefaultDurationUnits | MinutesPerDay | ShowProjectSummaryTask |
| Autolink | DefaultEndTime | MinutesPerMonth | SplitInProgressTasks |
| BarTextDateFormat | DefaultFixedCostAccrual | MinutesPerWeek | SpreadActualCost |
| BaselineCalendarName | DefaultOvertimeRate | MinutesPerYear | SpreadPercentComplete |
| BaselineCost | DefaultStandardRate | MoveCompletedEndsBack | StartDate |
| BaselineDate | DefaultStartTime | MoveCompletedEndsForward | StartVariance |
| BaselineDuration | DefaultTaskEarnedValueMethod | MoveRemainingStartsBack | StatusDate |
| BaselineFinish | DefaultTaskType | MoveRemainingStartsForward | SymbolPosition |
| BaselineForEarnedValue | DefaultWorkUnits | MultipleCriticalPaths | ThousandsSeparator |
| BaselineProjectUniqueID | DisplayFloatPathsEndingWithActivityUniqueId | MustFinishBy | TimeFormat |
| BaselineWork | Duration | Name | TimeSeparator |
| CalculateFloatBasedOnFinishDateOfEachProject | EditableActualCosts | NewTaskStartIsProjectStart | TotalSlackCalculationType |
| CalculateMultipleFloatPaths | EditingTime | NewTasksAreManual | UniqueID |
| CalculateMultipleFloatPathsUsingTotalFloat | ExportFlag | NewTasksEffortDriven | UpdatingTaskStatusUpdatesResourceStatus |
| ComputeStartToStartLagFromEarlyStart | FileApplication | NewTasksEstimated | UseExpectedFinishDates |
| ConsiderAssignmentsInOtherProjects | FileType | Notes | WbsCodeSeparator |
| ConsiderAssignmentsInOtherProjectsWithPriorityEqualHigherThan | FinishDate | NotesObject | WeekStartDay |
| Cost | FinishVariance | PMText | Work |
| CreationDate | FiscalYearStart | PercentageComplete | Work2 |
| CriticalActivityType | FiscalYearStartMonth | PlannedStart | |
</div>


:::info
The **CustomProperties** and **ProjectCodeValues** properties can contain other properties. For Primavera files, the **CustomProperties** property contains all the custom properties as well as **ProjectCodeValues**. The **ProjectCodeValues** property can also be used for grouping tasks and projects by categories.
:::

Primavera has codes and values prepared beforehand, as well as custom ones. The built-in ones are:

<div class="msp-properties">
| | | |
|---|---|---|
| Business Process | Location | Risk Rating |
| Business Segment | Priority | Sponsor |
| Capacity Analysis | Product Line | Stage-Gate Gate |
| Current Phase | Project Manager | Stage-Gate Stage |
| Estimated Project Size | Project Status | Strategic Objective |
| Financial Rating | Project Type | Strategic Rating |
| IT Investment Class | Resource Rating | Technology Rating |
</div>

## Tasks properties

<div class="msp-properties">
| | | | |
|---|---|---|---|
| ActivityType | Duration | IsSubprojectReadOnly | RemainingCost |
| ActualCost | DurationFormat | LevelAssignments | RemainingDuration |
| ActualDuration | EffortDriven | LevelingCanSplit | ResumeValid |
| ActualFinish | Estimated | Milestone | Rollup |
| ActualStart | ExternalTask | Name | Start |
| ActualWork | Finish | Notes | StartVariance |
| Baseline | FinishVariance | OutlineLevel | Summary |
| CalendarUID | HideBar | OutlineNumber | TotalSlack |
| ConstraintDate | ID | OverAllocated | Type |
| ConstraintType | IgnoreResourceCalendar | PercentComplete | Work |
| Critical | IsNull | Priority | UID |
| CV | IsSubproject | Recurring | |
</div>

**Related sample**: [Gantt. Import and export Primavera P6 files with additional project, task and resource properties and entities](https://snippet.dhtmlx.com/z1ewe48v)
