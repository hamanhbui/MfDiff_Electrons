/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import single = require("../../MfDiff/SingleInterface")
import * as $ from "./"

export function renderRetrieveSourceItem(diff: Diff.IRetrieveSourceDiff | Diff.IBasicDiff<single.IRetrieveSource> | undefined, revNos: number[], showCommonInfo: boolean) {
    if (!diff || (!diff.isDiff && !showCommonInfo)) return;
    if (diff.typeName === "AssociationRetrieveSourceDiff") {
        return <div>
            {$.renderDiffContainer("Retrieve", <div>
                <$.EnumItem name="Source" values={["By association", "From database"]} checkedValue={"By association"} />
                {$.renderPairItem("Association", (diff as Diff.IAssociationRetrieveSourceDiff).associationName, revNos, showCommonInfo)}
            </div>)}
        </div>
    } else if (diff.typeName === "DatabaseRetrieveSourceDiff") {
        return <div>
            {$.renderDiffContainer("Retrieve", <div>
                <$.EnumItem name="Source" values={["By association", "From database"]} checkedValue={"From database"} />
                {$.renderPairItem("Entity", (diff as Diff.IDatabaseRetrieveSourceDiff).entityName, revNos, showCommonInfo)}
            </div>)}
            {$.renderDiffContainer("Options", <div>
                {$.renderRangeItem((diff as Diff.IDatabaseRetrieveSourceDiff).range, revNos, showCommonInfo)}
            </div>)}
            {$.renderDiffContainer("Sorting", <div>
                {$.renderArrayItem("", (diff as Diff.IDatabaseRetrieveSourceDiff).sortItemList, revNos, showCommonInfo, new $.DisplayArrayItemOption(
                    $.ArrayType.Attribute, ["Attribute", "Sort order"]))}
            </div>
            )}
            {$.renderDiffContainer("XPath constraint", <div>
                {$.renderPairTextAreaItem("", (diff as Diff.IDatabaseRetrieveSourceDiff).xPathConstraint, showCommonInfo)}
            </div>)}
        </div>
    }
    return (
        <$.DiffContainer name="RetrieveSource">
            <$.PairContainer name="Pair Container">
                <SingleRetrieveSource value={(diff as Diff.IBasicDiff<any>).member1} />
                <SingleRetrieveSource value={(diff as Diff.IBasicDiff<any>).member2} />
            </$.PairContainer>
        </$.DiffContainer>
    )
}

export const SingleRetrieveSource = (props: { value: single.IRetrieveSource }) => {
    if (props.value.typeName === "AssociationRetrieveSource") {
        return <div>
            {$.renderDiffContainer("Retrieve", <div>
                <$.EnumItem name="Source" values={["By association", "From database"]} checkedValue={"By association"} />
                <$.SingleItem name="Association" value={(props.value as single.IAssociationRetrieveSource).associationName} />
            </div>)}
        </div>
    }
    return <div>
        {$.renderDiffContainer("Retrieve", <div>
            <$.EnumItem name="Source" values={["By association", "From database"]} checkedValue={"From database"} />
            <$.SingleItem name="Entity" value={(props.value as single.IDatabaseRetrieveSource).entityName} />
        </div>)}
        {$.renderDiffContainer("Options", <div>
            <$.SingleRangeItem value={(props.value as single.IDatabaseRetrieveSource).range} />
        </div>)}
        {$.renderDiffContainer("XPath constraint", <div>
            <$.SingleTextAreaItem name="" value={(props.value as single.IDatabaseRetrieveSource).xPathConstraint as string} />
        </div>)}
        {$.renderDiffContainer("Sorting", <div>
            {$.renderArrayItem("", (props.value as single.IDatabaseRetrieveSource).sortItemList, [], true, new $.DisplayArrayItemOption(
                $.ArrayType.Attribute, ["Attribute", "Sort order"]
            ))}
        </div>)}
    </div>
}

export const RetrieveActionItem = (props: { diff: Diff.IRetrieveActionDiff, revNos: number[], showCommonInfo: boolean }) => {
    return <div>
        {renderRetrieveSourceItem(props.diff.retrieveSource, props.revNos, props.showCommonInfo)}
        {$.renderDiffContainer("Output", <div>{$.renderPairItem("Name", props.diff.outputVariableName, props.revNos, props.showCommonInfo)}</div>)}
    </div>
}