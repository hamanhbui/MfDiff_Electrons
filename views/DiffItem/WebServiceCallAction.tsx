/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const WebServiceCallActionItem = (props: { diff: Diff.IWebServiceCallActionDiff, revNos: number[], showCommonInfo: boolean }) => (
    <div>
        <$.DiffContainer name="Operation">
            {$.renderDiffContainer("Operation", <div>
                {$.renderPairItem("Operation", props.diff.operationName, props.revNos, props.showCommonInfo)}
            </div>)}
            {props.diff.httpConfiguration ? $.renderDiffContainer("Location", <div>
                {$.renderPairBooleanItem("Override location", props.diff.httpConfiguration.overrideLocation, props.revNos, props.showCommonInfo)}
                {$.renderPairItem("Location", props.diff.httpConfiguration.customLocation, props.revNos, props.showCommonInfo)}
            </div>) : undefined}
            {$.renderDiffContainer("Timeout", <div>
                {$.renderPairBooleanItem("Use timeout on request", props.diff.useRequestTimeOut, props.revNos, props.showCommonInfo)}
                {$.renderPairItem("Timeout (s)", props.diff.timeOut, props.revNos, props.showCommonInfo)}
            </div>)}
            {$.renderDiffContainer("Validation", <div>
                {$.renderPairBooleanItem("Validation against wsdl", props.diff.isValidationRequired, props.revNos, props.showCommonInfo)}
            </div>)}
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
        <$.DiffContainer name="SOAP Request Headers">
            {$.renderRequestHandling(props.diff.requestHeaderHandling, props.revNos, props.showCommonInfo)}
        </$.DiffContainer>
        <$.DiffContainer name="SOAP Request Body">
            {$.renderRequestHandling(props.diff.requestBodyHandling, props.revNos, props.showCommonInfo)}
        </$.DiffContainer>
        <$.DiffContainer name="SOAP Response">
            {$.renderResponse(props.diff.resultHandling, props.revNos, props.showCommonInfo)}
        </$.DiffContainer>
    </div>
)