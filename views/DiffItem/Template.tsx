/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import single = require("../../MfDiff/SingleInterface")
import * as $ from "./"

export const Template = (props: { diff: Diff.ITemplateDiff, revNos: number[], showCommonInfo: boolean }) => (
    <div>
        {$.renderPairTextAreaItem("Text", props.diff.text, props.showCommonInfo)}
        {$.renderArrayItem("Parameters", props.diff.parameters, props.revNos, props.showCommonInfo, new $.DisplayArrayItemOption(
            new $.ArrayType([{ width: "20%", property: "name" }, { width: "80%", property: "value" }]), ["Index", "Expression"]
        ))}
    </div>
)

export function renderTemplate(diff: Diff.ITemplateDiff | undefined, revNos: number[], showCommonInfo: boolean) {
    if (diff) {
        if (!showCommonInfo) return;
        return <Template diff={diff} revNos={revNos} showCommonInfo={showCommonInfo} />
    }
}

export function renderSingleTemplate(diff: single.ITemplate) {
    return <div>
        <$.SingleItem name="Text" value={diff.text} />
        {$.renderArrayItem("", diff.parameters, [], true, new $.DisplayArrayItemOption(
            $.ArrayType.Attribute, ["Index", "Expression"]
        ))}
    </div>
}