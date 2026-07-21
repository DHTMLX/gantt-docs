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
| Active | ConstraintType | LongestPath | RemainingEarlyStart |
| ActivityCodeValues | ConstraintName | Milestone | RemainingLateFinish |
| ActivityID | Cost | Name | RemainingLateStart |
| ActivityLevelingPriority | CostVariance | Notes | RemainingWork |
| ActivityPercentComplete | CreateDate | NotesObject | RemainingWorkLabor |
| ActivityStatus | Critical | OutlineLevel | RemainingWorkNonLabor |
| ActivityType | Duration | OutlineNumber | ResponsePending |
| ActualCost | DurationType | OverAllocated | Resume |
| ActualDuration | DurationVariance | OvertimeCost | SecondaryConstraintDate |
| ActualFinish | EarlyFinish | PercentCompleteType | SecondaryConstraintType |
| ActualStart | EarlyStart | PercentageComplete | SequenceNumber |
| ActualWork | EffectiveCalendar | PercentageWorkComplete | Start |
| ActualWorkLabor | Expanded | PhysicalPercentComplete | StartSlack |
| ActualWorkNonlabor | ExpectedFinish | PlannedCost | StartVariance |
| Baseline | ExpenseItems | PlannedDuration | Steps |
| BaselineCost | Finish | PlannedFinish | Successors |
| BaselineDuration | FinishSlack | PlannedStart | Summary |
| BaselineFinish | FinishVariance | PlannedWork | SuspendDate |
| BaselineFixedCost | FixedCost | PlannedWorkLabor | TaskMode |
| BaselineStart | FloatPath | PlannedWorkNonlabor | TotalSlack |
| BaselineWork | FloatPathOrder | Predecessors | Type |
| CalendarUID | FreeSlack | PrimaryConstraint | UniqueID |
| Calendar | GUID | PrimaryResource | UpdateNeeded |
| CalendarUniqueID | HasChildTasks | PrimaryResourceUniqueID | WBS |
| CanonicalActivityID | ID | Priority | Work |
| ChildTasks | IgnoreResourceCalendar | Recurring | WorkVariance |
| CompleteThrough | LateFinish | RemainingCost | |
| Confirmed | LateStart | RemainingDuration | |
| ConstraintDate | LevelingPriority | RemainingEarlyFinish | |
</div>

### Format-specific properties

Different Primavera file formats support different sets of properties. If a property is available in one format, this doesn't mean it's also available in another - these are the limits of the format itself. For example, the following properties are used in the XML files, but absent in the XER files:

<div class="msp-properties">
| | |
|---|---|
| BaselineCost | BaselineStart |
| BaselineDuration | BaselineWork |
| BaselineFinish | CostVariance |
| BaselineFixedCost | DurationVariance |
</div>

Conversely, the following properties are used in the XER files, but absent in the XML files:

<div class="msp-properties">
| | |
|---|---|
| FloatPath | FreeSlack |
| FloatPathOrder | LongestPath |
</div>

### ConstraintName property

The **ConstraintName** property doesn't exist in Primavera files. The **ConstraintType** property is the one actually stored in files, but it returns a number (the constraint's numeric code) rather than a human-readable value, for backward compatibility. **ConstraintName** lets you import constraints using values that are understandable for humans. If **ConstraintName** is set instead of **ConstraintType**, the export module recognizes it and sets the corresponding constraint type.

### Properties containing other properties

Some properties contain other properties inside. When importing files with such properties, objects are received instead of plain values. These properties are:

- **ActivityCodeValues** - includes both codes and values prepared beforehand, as well as custom ones.
- **Baseline** - a baseline is used for the whole project, not a standalone task - it presents a snapshot of the whole project. This means that a task should have not a baseline, but a full project with all the dates. However, Gantt doesn't support such a configuration yet. When importing Primavera files with baselines (which are used only in the XML files), the **Baseline** property contains all the possible baselines.
- **NotesObject** - an array with note objects. Each object has the following properties: *Notes*, *NotesTopic*, *TopicID*, *UniqueID*.
- **ExpenseItems** - a complex object that contains many different properties. It contains 2 other "objects": **Account** and **Category**. The full list of the object's properties: *Account*, *AccountUniqueID*, *AccrueType*, *ActualCost*, *ActualUnits*, *AtCompletionCost*, *AutoComputeActuals*, *Category*, *CategoryUniqueID*, *Description*, *DocumentNumber*, *Name*, *PlannedCost*, *PlannedUnits*, *PricePerUnit*, *RemainingCost*, *RemainingUnits*, *UniqueID*, *UnitOfMeasure*, *Vendor*.

  The **Account** object contains the following properties: *ID*, *Name*, *Notes*, *NotesObject*, *Parent*, *ParentUniqueID*, *SequenceNumber*, *UniqueID*.

  The **Category** object contains the following properties: *Name*, *SequenceNumber*, *UniqueID*.

- **Steps** - presents something like stages of a task execution. Looks like an enumeration in a table that is later used for some calculations. This property is an array with objects, each containing the following properties: *Complete*, *Description*, *Name*, *PercentComplete*, *SequenceNumber*, *UniqueID*, *Weight*.

### WBS-tasks

Primavera P6 also has WBS-tasks (**projects** in Gantt, **Summary Tasks** in MS Project). They have their own particular properties, which aren't related to the properties of usual Activity tasks. However, it is possible to create properties with the same names both for usual Activity tasks and for projects (WBS-tasks). Gantt supports this behavior of Primavera.

**Related sample**: [Gantt. Import and export Primavera P6 files with additional project, task and resource properties and entities](https://snippet.dhtmlx.com/z1ewe48v)
