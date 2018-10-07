/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import single = require("../../MfDiff/SingleInterface")
import * as $ from "./"
import { IViewOption } from "../MfDiffList"

export const MfObjectItem = (props: { diff: Diff.IMfObjectDiff, revNos: number[], showCommonInfo: boolean }) => {
    switch (props.diff.typeName) {
        case single.ElementType.ChangeVariableAction: return <$.ChangeVariableActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.CommitAction: return <$.CommitActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.RetrieveAction: return <$.RetrieveActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.CreateVariableAction: return <$.CreateVariableActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.CreateObjectAction: return <$.CreateObjectActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.ListOperationAction: return <$.ListOperationActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.ChangeObjectAction: return <$.ChangeObjectActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.CastAction: return <$.CastActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.DeleteAction: return <$.DeleteAtionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.RollbackAction: return <$.RollbackActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.AggregateListAction: return <$.AggregateListActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.ChangeListAction: return <$.ChangeListActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.CreateListAction: return <$.CreateListActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.CloseAction: return <$.CloseActionItem />
        case single.ElementType.DownloadFileAction: return <$.DownloadFileActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.StartEvent: return <$.StartEventItem />
        case single.ElementType.EndEvent: return <$.EndEventItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.ContinueEvent: return <$.ContinueEventItem />
        case single.ElementType.BreakEvent: return <$.BreakEventItem />
        case single.ElementType.ExclusiveMerge: return <$.ExclusiveMergeItem />
        case single.ElementType.Annotation: return <$.AnnotationItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.MicroflowCallAction: return <$.MicroflowCallActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.ShowHomePageAction: return <$.ShowHomePageActionItem />
        case single.ElementType.ShowMessageAction: return <$.ShowMessageActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.ValidationFeedbackAction: return <$.ValidationFeedbackActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.LogMessageAction: return <$.LogMessageActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.GenerateDocumentAction: return <$.GenerateDocumentActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.WebServiceCallAction: return <$.WebServiceCallActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.RestCallAction: return <$.RestCallActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.ImportXmlAction: return <$.ImportXmlActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.ExportXmlAction: return <$.ExportXmlActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.MicroflowParameterObject: return <$.MicroflowParameterObjectItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.ExclusiveSplit: return <$.ExclusiveSplitItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.InheritanceSplit: return <$.InheritanceSplitItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.JavaActionCallAction: return <$.JavaActionCallActionItem diff={props.diff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.LoopedActivity: return <$.LoopedActivityItem diff={props.diff as Diff.ILoopedActivity} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        case single.ElementType.ShowPageAction: return <$.ShowPageActionItem diff={props.diff as Diff.IShowPageActionDiff} revNos={props.revNos} showCommonInfo={props.showCommonInfo} />
        default: return <span />
    }
}

export class MfObjectContainer extends React.Component<{ diff: Diff.IMfObjectDiff, revNos: number[], viewOption: IViewOption, label?: string, borderColor: string }, {}> {
    render() {
        return <$.ElementContainer diff={this.props.diff} label={this.props.label} name={this.props.diff.typeName} viewOption={this.props.viewOption} borderColor={this.props.borderColor}>
            {$.renderCaption(this.props.diff, this.props.revNos, this.props.viewOption.showCommonInfo)}
            <$.MfObjectItem diff={this.props.diff} revNos={this.props.revNos} showCommonInfo={this.props.viewOption.showCommonInfo} />
            {this.props.viewOption.hidePositionAndSize ? undefined : $.renderPositionItem(this.props.diff.position, this.props.revNos, this.props.viewOption.showCommonInfo)}
            {this.props.viewOption.hidePositionAndSize ? undefined : $.renderSizeItem(this.props.diff.size, this.props.revNos, this.props.viewOption.showCommonInfo)}
            {$.renderParentObject(this.props.diff.parentElement, this.props.revNos, this.props.viewOption.showCommonInfo)}
        </$.ElementContainer>
    }
}