/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"
import { IViewOption } from "../MfDiffList"
export class MfProperty extends React.Component<{ diff: Diff.IMfObjectDiff, revNos: number[], viewOption: IViewOption, label?: string, borderColor: string }, {}> {
    render() {
        if (this.props.diff.typeName.name === "Property") {
            let property = this.props.diff as Diff.IProperty;
            let listAllowedRole1: string = "";
            if (property.allowedModuleRolesQualifiedNames.member1) {
                for (let i = 0; i < property.allowedModuleRolesQualifiedNames.member1.length; i++) {
                    listAllowedRole1 += property.allowedModuleRolesQualifiedNames.member1[i].split(".")[1] + ". "
                }
            }
            let listAllowedRole2: string = "";
            if (property.allowedModuleRolesQualifiedNames.member2) {
                for (let i = 0; i < property.allowedModuleRolesQualifiedNames.member2.length; i++) {
                    listAllowedRole2 += property.allowedModuleRolesQualifiedNames.member2[i].split(".")[1] + ". "
                }
            }
            let allowdRole: Diff.IBasicDiff<string> = {
                isDiff: property.allowedModuleRolesQualifiedNames.isDiff,
                member1: listAllowedRole1,
                member2: listAllowedRole2,
                typeName: property.allowedModuleRolesQualifiedNames.typeName
            }
            return <$.ElementContainer diff={this.props.diff} label={this.props.label} name={this.props.diff.typeName} viewOption={this.props.viewOption} borderColor={this.props.borderColor}>
                {$.renderPairItem("Name", property.name, this.props.revNos, this.props.viewOption.showCommonInfo)}
                {$.renderPairItem("Documentation", property.documentation, this.props.revNos, this.props.viewOption.showCommonInfo)}
                {$.renderPairBooleanItem("Disallow", property.allowConcurrentExecution, this.props.revNos, this.props.viewOption.showCommonInfo)}
                {/*{$.renderPairItem("Error message", property.errorMessage, this.props.revNos, this.props.viewOption.showCommonInfo)}*/}
                {$.renderDiffContainer("Error message", <div>
                    {$.renderPairTextAreaItem("", property.errorMessage, this.props.viewOption.showCommonInfo)}
                </div>)}
                {$.renderPairItem("Error microflow", property.errorMicroflow, this.props.revNos, this.props.viewOption.showCommonInfo)}
                {$.renderPairItem("Return type", property.returnType, this.props.revNos, this.props.viewOption.showCommonInfo)}
                {$.renderPairBooleanItem("Apply entity access", property.applyEntityAccess, this.props.revNos, this.props.viewOption.showCommonInfo)}
                {$.renderPairItem("Allowed role", allowdRole, this.props.revNos, this.props.viewOption.showCommonInfo)}
                {/*{$.renderArrayItem("Allowed role", property.allowedModuleRolesQualifiedNames, this.props.revNos, this.props.viewOption.showCommonInfo,
                    new $.DisplayArrayItemOption(
                        $.ArrayType.Attribute, ["Attribute", "Sort order"]))}*/}
                {$.renderPairBooleanItem("Mark as used", property.markAsUsed, this.props.revNos, this.props.viewOption.showCommonInfo)}
            </$.ElementContainer>
        }
        else return <span />
    }
}