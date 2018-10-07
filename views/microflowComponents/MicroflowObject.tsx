import * as React from "react";
import _cpnInterface = require("./interfaces")
import _cpnTypeEnum = require("./interfaces/TypeEnum")
import MfComponent = require("./index");
function mapMicroflowObjectToView(a: _cpnInterface.microflow.IMicroflowObject): JSX.Element | undefined {
    switch (a.type) {
        case _cpnTypeEnum.TypeEnum.Start: {
            return <MfComponent.Start data={a} />
        }
        case _cpnTypeEnum.TypeEnum.End: {
            return <MfComponent.End data={a} />
        }
        case _cpnTypeEnum.TypeEnum.ContinueEvent: {
            return <MfComponent.ContinueEvent data={a} />
        }
        case _cpnTypeEnum.TypeEnum.BreakEvent: {
            return <MfComponent.BreakEvent data={a} />
        }
        case _cpnTypeEnum.TypeEnum.ErrorEvent: {
            return <MfComponent.ErrorEvent data={a} />
        }
        case _cpnTypeEnum.TypeEnum.ExclusiveSplit: {
            return <MfComponent.ExclusiveSplit data={a as _cpnInterface.microflow.IExclusiveSplit} />
        }
        case _cpnTypeEnum.TypeEnum.InheritanceSplit: {
            return <MfComponent.InheritanceSplit data={a as _cpnInterface.microflow.IInheritanceSplit} />
        }
        case _cpnTypeEnum.TypeEnum.ExclusiveMerge: {
            return <MfComponent.ExclusiveMerge data={a as _cpnInterface.microflow.IExclusiveMerge} />
        }
        case _cpnTypeEnum.TypeEnum.Parameter: {
            return <MfComponent.Parameter data={a as _cpnInterface.microflow.IMicroflowParameter} />
        }
        case _cpnTypeEnum.TypeEnum.Annotation: {
            return <MfComponent.Annotation data={a as _cpnInterface.microflow.IAnnotation} />
        }
        case _cpnTypeEnum.TypeEnum.ChangeObjectAction: {
            return <MfComponent.ChangeObjectAction data={a as _cpnInterface.microflow.IChangeObjectAction} />
        }
        case _cpnTypeEnum.TypeEnum.MicroflowCallAction: {
            return <MfComponent.MicroflowCallAction data={a as _cpnInterface.microflow.IMicroflowCallAction} />
        }
        case _cpnTypeEnum.TypeEnum.ClosePageAction: {
            return <MfComponent.ClosePageAction data={a as _cpnInterface.microflow.IClosePageAction} />
        }
        case _cpnTypeEnum.TypeEnum.ChangeListAction: {
            return <MfComponent.ChangeListAction data={a as _cpnInterface.microflow.IChangeListAction} />
        }
        case _cpnTypeEnum.TypeEnum.ShowMessageAction: {
            return <MfComponent.ShowMessageAction data={a as _cpnInterface.microflow.IShowMessageAction} />
        }
        case _cpnTypeEnum.TypeEnum.DeleteObjectAction: {
            return <MfComponent.DeleteObjectAction data={a as _cpnInterface.microflow.IDeleteAction} />
        }
        case _cpnTypeEnum.TypeEnum.CreateObjectAction: {
            return <MfComponent.CreateObjectAction data={a as _cpnInterface.microflow.ICreateObjectAction} />
        }
        case _cpnTypeEnum.TypeEnum.CommitAction: {
            return <MfComponent.CommitAction data={a as _cpnInterface.microflow.ICommitAction} />
        }
        case _cpnTypeEnum.TypeEnum.RollbackAction: {
            return <MfComponent.RollbackAction data={a as _cpnInterface.microflow.IRollbackAction} />
        }
        case _cpnTypeEnum.TypeEnum.RetrieveAction: {
            return <MfComponent.RetrieveAction data={a as _cpnInterface.microflow.IRetrieveAction} />
        }
        case _cpnTypeEnum.TypeEnum.CastAction: {
            return <MfComponent.CastAction data={a as _cpnInterface.microflow.ICastAction} />
        }
        case _cpnTypeEnum.TypeEnum.AggregateListAction: {
            return <MfComponent.AggregateListAction data={a as _cpnInterface.microflow.IAggregateListAction} />
        }
        case _cpnTypeEnum.TypeEnum.CreateListAction: {
            return <MfComponent.CreateListAction data={a as _cpnInterface.microflow.ICreateListAction} />
        }
        case _cpnTypeEnum.TypeEnum.CreateListAction: {
            return <MfComponent.CreateListAction data={a as _cpnInterface.microflow.ICreateListAction} />
        }
        case _cpnTypeEnum.TypeEnum.ListOperation: {
            return <MfComponent.ListOperation data={a as _cpnInterface.microflow.IListOperation} />
        }
        case _cpnTypeEnum.TypeEnum.JavaAction: {
            return <MfComponent.JavaAction data={a as _cpnInterface.microflow.IJavaAction} />
        }
        case _cpnTypeEnum.TypeEnum.ChangeVariableAction: {
            return <MfComponent.ChangeVariableAction data={a as _cpnInterface.microflow.IChangeVariableAction} />
        }
        case _cpnTypeEnum.TypeEnum.CreateVariableAction: {
            return <MfComponent.CreateVariableAction data={a as _cpnInterface.microflow.ICreateVariableAction} />
        }
        case _cpnTypeEnum.TypeEnum.DownloadFileAction: {
            return <MfComponent.DownloadFileAction data={a as _cpnInterface.microflow.IDownloadFileAction} />
        }
        case _cpnTypeEnum.TypeEnum.ShowHomePageAction: {
            return <MfComponent.ShowHomePageAction data={a as _cpnInterface.microflow.IShowHomePageAction} />
        }
        case _cpnTypeEnum.TypeEnum.ShowPageAction: {
            return <MfComponent.ShowPageAction data={a as _cpnInterface.microflow.IShowPageAction} />
        }
        case _cpnTypeEnum.TypeEnum.ValidationFeedbackAction: {
            return <MfComponent.ValidationFeedbackAction data={a as _cpnInterface.microflow.IValidationFeedbackAction} />
        }
        case _cpnTypeEnum.TypeEnum.LogMessageAction: {
            return <MfComponent.LogMessageAction data={a as _cpnInterface.microflow.ILogMessageAction} />
        }
        case _cpnTypeEnum.TypeEnum.RestCallAction: {
            return <MfComponent.RestCallAction data={a as _cpnInterface.microflow.IRestCallAction} />
        }
        case _cpnTypeEnum.TypeEnum.WebServiceCallAction: {
            return <MfComponent.WebServiceCallAction data={a as _cpnInterface.microflow.IWebServiceCallAction} />
        }
        case _cpnTypeEnum.TypeEnum.ExportXmlAction: {
            return <MfComponent.ExportXmlAction data={a as _cpnInterface.microflow.IExportXmlAction} />
        }
        case _cpnTypeEnum.TypeEnum.ImportXmlAction: {
            return <MfComponent.ImportXmlAction data={a as _cpnInterface.microflow.IImportXmlAction} />
        }
        case _cpnTypeEnum.TypeEnum.LoopedAcivity: {
            return <MfComponent.Loopedactivity data={a as _cpnInterface.microflow.ILoopedActivity} />
        }
        case _cpnTypeEnum.TypeEnum.LoopedParameter: {
            return <MfComponent.LoopedParameter data={a as _cpnInterface.microflow.ILoopedActivity} point={a.geometry} />
        }
        case _cpnTypeEnum.TypeEnum.GenerateDocument: {
            return <MfComponent.GenerateDocumentAction data={a as _cpnInterface.microflow.IGenerateDocumentAction} />
        }
    }
}
export class MicroflowObject extends React.Component<{ data: _cpnInterface.microflow.IMicroflowObject, onSelectObject: (id: string) => void }, {}>{
    onClick(e: React.MouseEvent) {
        this.props.onSelectObject(this.props.data.id!);
        e.stopPropagation();
    }
    render() {
        return (<div key={this.props.data.id} onClick={this.onClick.bind(this)}>
            {mapMicroflowObjectToView(this.props.data)!}
        </div>
        )
    }

}