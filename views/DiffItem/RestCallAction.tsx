/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const RestCallActionItem = (props: { diff: Diff.IRestCallActionDiff, revNos: number[], showCommonInfo: boolean }) => {
    return <div>
        <$.DiffContainer name="General">
            {props.diff.httpConfiguration ? $.renderDiffContainer("Location", <div>
                {$.renderTemplate((props.diff.httpConfiguration as Diff.IHttpConfigurationDiff).customLocationTemplate, props.revNos, props.showCommonInfo)}
                {$.renderPairItem("HTTP method", (props.diff.httpConfiguration as Diff.IHttpConfigurationDiff).httpMethod, props.revNos, props.showCommonInfo)}
            </div>) : undefined}
            {props.diff.useRequestTimeOut ? $.renderDiffContainer("Timeout", <div>
                {$.renderPairBooleanItem("Use timeout on request", props.diff.useRequestTimeOut, props.revNos, props.showCommonInfo)}
                {$.renderPairItem("Timeout (s)", props.diff.timeOut, props.revNos, props.showCommonInfo)}
            </div>) : undefined}
        </$.DiffContainer>
        <$.DiffContainer name="HTTP Headers">
            {props.diff.httpConfiguration ? $.renderDiffContainer("Authentication", <div>
                {$.renderPairBooleanItem("Use HTTP authentication", props.diff.httpConfiguration.useAuthentication, props.revNos, props.showCommonInfo)}
                {$.renderPairItem("User name", props.diff.httpConfiguration.httpAuthenticationUserName, props.revNos, props.showCommonInfo)}
                {$.renderPairItem("Password", props.diff.httpConfiguration.authenticationPassword, props.revNos, props.showCommonInfo)}
            </div>) : undefined}
            {props.diff.httpConfiguration ? $.renderDiffContainer("Custom HTTP Headers", <div>
                {$.renderArrayItem("", props.diff.httpConfiguration.headerEntries, props.revNos, props.showCommonInfo, new $.DisplayArrayItemOption(
                    $.ArrayType.Attribute, ["Key", "Value"]
                ))}
            </div>) : undefined}
        </$.DiffContainer>
        <$.DiffContainer name="Request">
            {$.renderRequestHandling(props.diff.requestHandling, props.revNos, props.showCommonInfo)}
        </$.DiffContainer>
        <$.DiffContainer name="Response">
            {$.renderResponse(props.diff.resultHandling, props.revNos, props.showCommonInfo)}
        </$.DiffContainer>
    </div>
}