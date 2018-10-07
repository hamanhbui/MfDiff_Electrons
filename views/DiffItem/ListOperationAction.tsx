/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import single = require("../../MfDiff/SingleInterface")
import * as $ from "./"

export const ListOperationItem = (props: { revNos: number[], list: Diff.IBasicDiff<string> | undefined, diff?: Diff.IListOperationDiff | Diff.IBasicDiff<single.IListOperation>, showCommonInfo: boolean }) => {
    if (!props.diff || (!props.diff.isDiff && !props.showCommonInfo)) return <span />
    if (props.diff.typeName === single.ElementType.IBasicDiff) {
        return <div>
            {$.renderPairItem("List", props.list, props.revNos, props.showCommonInfo)}
            <$.PairContainer>
                <SingleListOperation value={(props.diff as Diff.IBasicDiff<single.IListOperation>).member1} />
                <SingleListOperation value={(props.diff as Diff.IBasicDiff<single.IListOperation>).member2} />
            </$.PairContainer>
        </div>
    }
    if (props.diff.typeName === "BinaryListOperationDiff") {
        return <div>
            {$.renderPairItem("Operation", (props.diff as Diff.IBinaryListOperationDiff).type, props.revNos, props.showCommonInfo)}
            {$.renderPairItem("List", props.list, props.revNos, props.showCommonInfo)}
            {$.renderPairItem("List/object", (props.diff as Diff.IBinaryListOperationDiff).secondListOrObjectVariableName, props.revNos, props.showCommonInfo)}
        </div>
    }
    if (props.diff.typeName === "InspectAttributeDiff") {
        return <div>
            {$.renderPairItem("Operation", (props.diff as Diff.IInspectAttributeDiff).type, props.revNos, props.showCommonInfo)}
            {$.renderPairItem("List", props.list, props.revNos, props.showCommonInfo)}
            {$.renderPairItem("Attribute", (props.diff as Diff.IInspectAttributeDiff).attributeName, props.revNos, props.showCommonInfo)}
            {$.renderPairItem("Equals", (props.diff as Diff.IInspectAttributeDiff).expression, props.revNos, props.showCommonInfo)}
        </div>
    }
    if (props.diff.typeName === "SortDiff") {
        return <div>
            <$.SingleItem name="Operation" value="Sort" />
            {$.renderPairItem("List", props.list, props.revNos, props.showCommonInfo)}
            {$.renderArrayItem("Sorting", (props.diff as Diff.ISortDiff).sortItemList, props.revNos, props.showCommonInfo, new $.DisplayArrayItemOption(
                $.ArrayType.Attribute, ["Attribute", "Sort order"]
            ))}
        </div>
    }
    if (props.diff.typeName === "HeadOrTailDiff") {
        return <div>
            {$.renderPairItem("Operation", (props.diff as Diff.IHeadOrTailDiff).type, props.revNos, props.showCommonInfo)}
            {$.renderPairItem("List", props.list, props.revNos, props.showCommonInfo)}
        </div>
    }
    return <span />
}

export const SingleListOperation = (props: { value: single.IListOperation | undefined }) => {
    if (props.value === undefined) return <span />
    if (props.value.typeName === "BinaryListOperation") {
        return <div>
            <$.SingleItem name="Operation" value={(props.value as single.IBinaryListOperation).type} />
            <$.SingleItem name="List/object" value={(props.value as single.IBinaryListOperation).secondListOrObjectVariableName} />
        </div>
    }
    if (props.value.typeName === "InspectAttribute") {
        return <div>
            <$.SingleItem name="Operation" value={(props.value as single.IInspectAttribute).type} />
            <$.SingleItem name="Attribute" value={(props.value as single.IInspectAttribute).attributeName} />
            <$.SingleItem name="Equals" value={(props.value as single.IInspectAttribute).expression} />
        </div>
    }
    if (props.value.typeName === "Sort") {
        return <div>
            <$.SingleItem name="Operation" value="Sort" />
            {$.renderArrayItem("", (props.value as single.ISort).sortItemList, [], true, new $.DisplayArrayItemOption(
                $.ArrayType.Attribute, ["Attribute", "Sort order"]
            ))}
        </div>
    }
    return <div>
        <$.SingleItem name="Operation" value={(props.value as single.IHeadOrTail).type} />
    </div>
}

export const ListOperationActionItem = (props: { diff: Diff.IListOperationActionDiff, revNos: number[], showCommonInfo }) => {
    return <div>
        {$.renderDiffContainer("Action", <div>
            <ListOperationItem diff={props.diff.operation} list={props.diff.listVariableName} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        </div>)}
        {$.renderDiffContainer("Output", <div>
            {$.renderPairItem("Name", props.diff.outputVariableName, props.revNos, props.showCommonInfo)}
        </div>)}
    </div>
}