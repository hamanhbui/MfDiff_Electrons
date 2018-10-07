/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import single = require("../../MfDiff/SingleInterface")
import * as $ from "./"
import { IRange } from "../../MfDiff/SingleInterface"

export function getTypeOfConstantRange(diff: Diff.IBasicDiff<boolean>): Diff.IBasicDiff<string> {
    return {
        typeName: single.ElementType.IBasicDiff,
        member1: diff.member1 ? "First" : "All",
        member2: diff.member2 ? "First" : "All",
        isDiff: diff.isDiff
    }
}

export function renderRangeItem(diff: Diff.IRangeDiff | Diff.IBasicDiff<single.IRange> | undefined, revNos: number[], showCommonInfo: boolean) {
    if (!diff || (!diff.isDiff && !showCommonInfo)) return;
    if (diff.typeName === "ConstantRangeDiff") {
        return $.renderEnumItem("Range", getTypeOfConstantRange((diff as Diff.IConstantRangeDiff).singleObject as Diff.IBasicDiff<boolean>), showCommonInfo, ["All", "First", "Custom"])
    } else if (diff.typeName === "CustomRangeDiff") {
        return <div>
            <$.EnumItem name="Range" values={["All", "First", "Custom"]} checkedValue={"Custom"} />
            {$.renderPairItem("Limit", (diff as Diff.ICustomRangeDiff).limitExpression, revNos, showCommonInfo)}
            {$.renderPairItem("Offset", (diff as Diff.ICustomRangeDiff).offsetExpression, revNos, showCommonInfo)}
        </div>
    }
    return (<$.PairContainer>
        <SingleRangeItem value={(diff as Diff.IBasicDiff<IRange>).member1} />
        <SingleRangeItem value={(diff as Diff.IBasicDiff<IRange>).member2} />
    </$.PairContainer>
    )
}

export const SingleRangeItem = (props: { value?: IRange }) => {
    if (props.value === undefined) return <span />
    if (props.value.typeName === "ConstantRange") {
        return (
            (props.value as single.IConstantRange).singleObject ?
                <$.EnumItem name="Range" values={["All", "First", "Custom"]} checkedValue={"First"} /> :
                <$.EnumItem name="Range" values={["All", "First", "Custom"]} checkedValue={"All"} />
        )
    }
    return <div>
        <$.EnumItem name="Range" values={["All", "First", "Custom"]} checkedValue={"Custom"} />
        <$.SingleItem name="Limit" value={(props.value as single.ICustomRange).limitExpression} />
        <$.SingleItem name="Offset" value={(props.value as single.ICustomRange).offsetExpression} />
    </div>
}