import _cpnInterface = require("./interfaces")
import { microflows } from "mendixmodelsdk";
import MfDataConvert = require("./ConvertFunction");
import { common } from "mendixmodelsdk";
import { IPosition } from "./interfaces/baseInterfaces";
import { TypeEnum } from "./interfaces/TypeEnum";
import * as diff from "./../../MfDiff/DiffInterface";
export function checkInstaceAndPush(objectInfo: _cpnInterface.microflow.IObjectDict, mf: microflows.Microflow, mfObj: microflows.MicroflowObject, viewMicroflowObjects: _cpnInterface.microflow.IMicroflowObject[],
    point?: common.IPoint | undefined, size?: common.ISize | undefined) {
    if (mfObj instanceof microflows.StartEvent) {
        let startEvent = mfObj as microflows.StartEvent;
        viewMicroflowObjects.push(MfDataConvert.convertStartEvent(startEvent, point, size));
    }
    if (mfObj instanceof microflows.EndEvent) {
        let endEvent = mfObj as microflows.EndEvent;
        viewMicroflowObjects.push(MfDataConvert.convertEndEvent(objectInfo, endEvent, point, size));
    }
    if (mfObj instanceof microflows.ContinueEvent) {
        let continueEvent = mfObj as microflows.ContinueEvent;
        viewMicroflowObjects.push(MfDataConvert.convertContinueEvent(continueEvent, point, size));
    }
    if (mfObj instanceof microflows.BreakEvent) {
        let breakEvent = mfObj as microflows.BreakEvent;
        viewMicroflowObjects.push(MfDataConvert.convertBreakEvent(breakEvent, point, size));
    }
    if (mfObj instanceof microflows.ErrorEvent) {
        let errorEvent = mfObj as microflows.ErrorEvent;
        viewMicroflowObjects.push(MfDataConvert.convertErrorEvent(errorEvent, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ChangeObjectAction) {
        let changeObjecAction = mfObj.action as microflows.ChangeObjectAction;
        viewMicroflowObjects.push(MfDataConvert.convertChangeObjectAction(objectInfo, mfObj, changeObjecAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.MicroflowCallAction) {
        let microflowCallAction = mfObj.action as microflows.MicroflowCallAction;
        viewMicroflowObjects.push(MfDataConvert.convertMicroflowCallAction(objectInfo, mfObj, microflowCallAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.CloseFormAction) {
        let closeFormAction = mfObj.action as microflows.CloseFormAction;
        viewMicroflowObjects.push(MfDataConvert.convertCloseFormAction(objectInfo, mfObj, closeFormAction, point, size));
    }
    if (mfObj instanceof microflows.ExclusiveSplit) {
        let exclusiveSplit = mfObj as microflows.ExclusiveSplit;
        viewMicroflowObjects.push(MfDataConvert.convertExclusiveSplit(objectInfo, exclusiveSplit, point, size));
    }
    if (mfObj instanceof microflows.InheritanceSplit) {
        let inheritanceSplit = mfObj as microflows.InheritanceSplit;
        viewMicroflowObjects.push(MfDataConvert.convertInheritanceSplit(objectInfo, inheritanceSplit, point, size));
    }
    if (mfObj instanceof microflows.ExclusiveMerge) {
        let exclusiveMerge = mfObj as microflows.ExclusiveMerge;
        viewMicroflowObjects.push(MfDataConvert.convertExclusiveMerge(exclusiveMerge, point, size));
    }
    if (mfObj instanceof microflows.MicroflowParameterObject) {
        let microflowParameter = mfObj as microflows.MicroflowParameterObject;
        viewMicroflowObjects.push(MfDataConvert.convertMicroflowParameter(objectInfo, microflowParameter, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ChangeListAction) {
        let changeListAction = mfObj.action as microflows.ChangeListAction;
        viewMicroflowObjects.push(MfDataConvert.convertChangeListAction(objectInfo, mfObj, changeListAction, point, size));
    }
    if (mfObj instanceof microflows.Annotation) {
        let annotation = mfObj as microflows.Annotation;
        viewMicroflowObjects.push(MfDataConvert.convertAnnotation(objectInfo, annotation, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ShowMessageAction) {
        let showMessageAction = mfObj.action as microflows.ShowMessageAction;
        viewMicroflowObjects.push(MfDataConvert.convertShowMessageAction(objectInfo, mfObj, showMessageAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.DeleteAction) {
        let deleteAction = mfObj.action as microflows.DeleteAction;
        viewMicroflowObjects.push(MfDataConvert.convertDeleteAction(objectInfo, mfObj, deleteAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.CreateObjectAction) {
        let createObjectAction = mfObj.action as microflows.CreateObjectAction;
        viewMicroflowObjects.push(MfDataConvert.convertCreateObjectAction(objectInfo, mfObj, createObjectAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.CommitAction) {
        let commitAction = mfObj.action as microflows.CommitAction;
        viewMicroflowObjects.push(MfDataConvert.convertCommitAction(objectInfo, mfObj, commitAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.RollbackAction) {
        let rollbackAction = mfObj.action as microflows.RollbackAction;
        viewMicroflowObjects.push(MfDataConvert.convertRollbackAction(objectInfo, mfObj, rollbackAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.RetrieveAction) {
        let retrieveAction = mfObj.action as microflows.RetrieveAction;
        viewMicroflowObjects.push(MfDataConvert.convertRetrieveAction(objectInfo, mfObj, retrieveAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.CastAction) {
        let castAction = mfObj.action as microflows.CastAction;
        mf.flows.forEach(mfflow => {
            if (mfflow instanceof microflows.SequenceFlow) {
                if (mfflow.destination.id === castAction.containerAsActionActivity.id) {
                    if (mfflow.caseValue instanceof microflows.InheritanceCase) {
                        viewMicroflowObjects.push(MfDataConvert.convertCastAction(objectInfo, mfObj, castAction, mfflow.caseValue["valueQualifiedName"].split(".")[1], point, size));
                    }
                    else viewMicroflowObjects.push(MfDataConvert.convertCastAction(objectInfo, mfObj, castAction, "(Not set)", point, size));
                }
            }
        })
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.AggregateListAction) {
        let aggregateListAction = mfObj.action as microflows.AggregateListAction;
        viewMicroflowObjects.push(MfDataConvert.convertAggregateListAction(objectInfo, mfObj, aggregateListAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.CreateListAction) {
        let createListAction = mfObj.action as microflows.CreateListAction;
        viewMicroflowObjects.push(MfDataConvert.convertCreateListAction(objectInfo, mfObj, createListAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ListOperationAction) {
        let ListOperationAction = mfObj.action as microflows.ListOperationAction;
        viewMicroflowObjects.push(MfDataConvert.convertListOperationAction(objectInfo, mf, mfObj, ListOperationAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.JavaActionCallAction) {
        let JavaActionCallAction = mfObj.action as microflows.JavaActionCallAction;
        viewMicroflowObjects.push(MfDataConvert.convertJavaActionCallAction(objectInfo, mf, mfObj, JavaActionCallAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ChangeVariableAction) {
        let ChangeVariableAction = mfObj.action as microflows.ChangeVariableAction;
        viewMicroflowObjects.push(MfDataConvert.convertChangeVariableAction(objectInfo, mfObj, ChangeVariableAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.CreateVariableAction) {
        let CreateVariableAction = mfObj.action as microflows.CreateVariableAction;
        viewMicroflowObjects.push(MfDataConvert.convertCreateVariableAction(objectInfo, mfObj, CreateVariableAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.DownloadFileAction) {
        let DownloadFileAction = mfObj.action as microflows.DownloadFileAction;
        viewMicroflowObjects.push(MfDataConvert.convertDownloadFileAction(objectInfo, mfObj, DownloadFileAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ShowHomePageAction) {
        let ShowHomePageAction = mfObj.action as microflows.ShowHomePageAction;
        viewMicroflowObjects.push(MfDataConvert.convertShowHomePageAction(objectInfo, mfObj, ShowHomePageAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ShowPageAction) {
        let ShowPageAction = mfObj.action as microflows.ShowPageAction;
        viewMicroflowObjects.push(MfDataConvert.convertShowPageAction(objectInfo, mfObj, ShowPageAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ValidationFeedbackAction) {
        let ValidationFeedbackAction = mfObj.action as microflows.ValidationFeedbackAction;
        viewMicroflowObjects.push(MfDataConvert.convertValidationFeedbackAction(objectInfo, mfObj, ValidationFeedbackAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.LogMessageAction) {
        let LogMessageAction = mfObj.action as microflows.LogMessageAction;
        viewMicroflowObjects.push(MfDataConvert.convertLogMessageAction(objectInfo, mfObj, LogMessageAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.RestCallAction) {
        let RestCallAction = mfObj.action as microflows.RestCallAction;
        viewMicroflowObjects.push(MfDataConvert.convertRestCallAction(objectInfo, mfObj, RestCallAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.WebServiceCallAction) {
        let WebServiceCallAction = mfObj.action as microflows.WebServiceCallAction;
        viewMicroflowObjects.push(MfDataConvert.convertWebServiceCallAction(objectInfo, mfObj, WebServiceCallAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ExportXmlAction) {
        let ExportXmlAction = mfObj.action as microflows.ExportXmlAction;
        viewMicroflowObjects.push(MfDataConvert.convertExportXmlAction(objectInfo, mfObj, ExportXmlAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ImportXmlAction) {
        let ImportXmlAction = mfObj.action as microflows.ImportXmlAction;
        viewMicroflowObjects.push(MfDataConvert.convertImportXmlAction(objectInfo, mfObj, ImportXmlAction, point, size));
    }
    if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.GenerateDocumentAction) {
        let GenerateDocumentAction = mfObj.action as microflows.GenerateDocumentAction;
        viewMicroflowObjects.push(MfDataConvert.convertGenerateDocumentAction(objectInfo, mfObj, GenerateDocumentAction, point, size));
    }
}
export function checkInstaceAndPushIntoViewMicroflowObject(objectInfo: _cpnInterface.microflow.IObjectDict, mf: microflows.Microflow, mfObjColect: microflows.MicroflowObjectCollection, viewMicroflowObjects: _cpnInterface.microflow.IMicroflowObject[],
    pointOfLooped?: common.IPoint | undefined, sizeOfLooped?: common.ISize | undefined) {
    mfObjColect.objects.forEach(mfObj => {
        if (pointOfLooped && sizeOfLooped) {
            checkInstaceAndPush(objectInfo, mf, mfObj, viewMicroflowObjects, pointOfLooped, sizeOfLooped);
            if (mfObj instanceof microflows.LoopedActivity) {
                let loopInsideActivity = mfObj as microflows.LoopedActivity;
                let afterconvert = MfDataConvert.convertLoopedActivity(loopInsideActivity, pointOfLooped, sizeOfLooped);
                viewMicroflowObjects.push(afterconvert);
                let pointLoopedInside: IPosition = {
                    left: afterconvert.geometry.left,
                    top: afterconvert.geometry.top
                }
                viewMicroflowObjects.push(MfDataConvert.convertLoopedParameter(loopInsideActivity, pointLoopedInside))
                let middlepointLoopedInside: common.IPoint = {
                    x: afterconvert.geometry.left + (1 / 2) * afterconvert.geometry.width,
                    y: afterconvert.geometry.top + (1 / 2) * afterconvert.geometry.height
                }
                checkInstaceAndPushIntoViewMicroflowObject(objectInfo, mf, mfObj.objectCollection, viewMicroflowObjects, middlepointLoopedInside, loopInsideActivity.size);
            }
        }
        else {
            checkInstaceAndPush(objectInfo, mf, mfObj, viewMicroflowObjects);
            if (mfObj instanceof microflows.LoopedActivity) {
                let LoopedActivity = mfObj as microflows.LoopedActivity;
                viewMicroflowObjects.push(MfDataConvert.convertLoopedActivity(LoopedActivity));
                viewMicroflowObjects.push(MfDataConvert.convertLoopedParameter(LoopedActivity));
                checkInstaceAndPushIntoViewMicroflowObject(objectInfo, mf, mfObj.objectCollection, viewMicroflowObjects, LoopedActivity.relativeMiddlePoint, LoopedActivity.size);
            }
        }
    })
}
export function checkInstanceAndGetType(mfObject: microflows.MicroflowObjectCollection, idTypeDict: { [id: string]: TypeEnum }) {
    mfObject.objects
        .forEach(mfObj => {
            if (mfObj instanceof microflows.StartEvent) {
                idTypeDict[mfObj.id] = TypeEnum.Start;
            }
            else if (mfObj instanceof microflows.EndEvent) {
                idTypeDict[mfObj.id] = TypeEnum.End;
            }
            else if (mfObj instanceof microflows.ContinueEvent) {
                idTypeDict[mfObj.id] = TypeEnum.ContinueEvent;
            }
            else if (mfObj instanceof microflows.BreakEvent) {
                idTypeDict[mfObj.id] = TypeEnum.BreakEvent;
            }
            else if (mfObj instanceof microflows.ErrorEvent) {
                idTypeDict[mfObj.id] = TypeEnum.ErrorEvent;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ChangeObjectAction) {
                idTypeDict[mfObj.id] = TypeEnum.ChangeObjectAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.MicroflowCallAction) {
                idTypeDict[mfObj.id] = TypeEnum.MicroflowCallAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.CloseFormAction) {
                idTypeDict[mfObj.id] = TypeEnum.ClosePageAction;
            }
            else if (mfObj instanceof microflows.ExclusiveSplit) {
                idTypeDict[mfObj.id] = TypeEnum.ExclusiveSplit;
            }
            else if (mfObj instanceof microflows.InheritanceSplit) {
                idTypeDict[mfObj.id] = TypeEnum.InheritanceSplit;
            }
            else if (mfObj instanceof microflows.ExclusiveMerge) {
                idTypeDict[mfObj.id] = TypeEnum.ExclusiveMerge;
            }
            else if (mfObj instanceof microflows.MicroflowParameterObject) {
                idTypeDict[mfObj.id] = TypeEnum.Parameter;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ChangeListAction) {
                idTypeDict[mfObj.id] = TypeEnum.ChangeListAction;
            }
            else if (mfObj instanceof microflows.Annotation) {
                idTypeDict[mfObj.id] = TypeEnum.Annotation;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ShowMessageAction) {
                idTypeDict[mfObj.id] = TypeEnum.ShowMessageAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.DeleteAction) {
                idTypeDict[mfObj.id] = TypeEnum.DeleteObjectAction
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.CreateObjectAction) {
                idTypeDict[mfObj.id] = TypeEnum.CreateObjectAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.CommitAction) {
                idTypeDict[mfObj.id] = TypeEnum.CommitAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.RollbackAction) {
                idTypeDict[mfObj.id] = TypeEnum.RollbackAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.RetrieveAction) {
                idTypeDict[mfObj.id] = TypeEnum.RetrieveAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.CastAction) {
                idTypeDict[mfObj.id] = TypeEnum.CastAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.AggregateListAction) {
                idTypeDict[mfObj.id] = TypeEnum.AggregateListAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.CreateListAction) {
                idTypeDict[mfObj.id] = TypeEnum.CreateListAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ListOperationAction) {
                idTypeDict[mfObj.id] = TypeEnum.ListOperation;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.JavaActionCallAction) {
                idTypeDict[mfObj.id] = TypeEnum.JavaAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ChangeVariableAction) {
                idTypeDict[mfObj.id] = TypeEnum.ChangeVariableAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.CreateVariableAction) {
                idTypeDict[mfObj.id] = TypeEnum.CreateVariableAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.DownloadFileAction) {
                idTypeDict[mfObj.id] = TypeEnum.DownloadFileAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ShowHomePageAction) {
                idTypeDict[mfObj.id] = TypeEnum.ShowHomePageAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ShowPageAction) {
                idTypeDict[mfObj.id] = TypeEnum.ShowPageAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ValidationFeedbackAction) {
                idTypeDict[mfObj.id] = TypeEnum.ValidationFeedbackAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.LogMessageAction) {
                idTypeDict[mfObj.id] = TypeEnum.LogMessageAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.RestCallAction) {
                idTypeDict[mfObj.id] = TypeEnum.RestCallAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.WebServiceCallAction) {
                idTypeDict[mfObj.id] = TypeEnum.WebServiceCallAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ExportXmlAction) {
                idTypeDict[mfObj.id] = TypeEnum.ExportXmlAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.ImportXmlAction) {
                idTypeDict[mfObj.id] = TypeEnum.ImportXmlAction;
            }
            else if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.GenerateDocumentAction) {
                idTypeDict[mfObj.id] = TypeEnum.GenerateDocument;
            }
            else if (mfObj instanceof microflows.LoopedActivity) {
                idTypeDict[mfObj.id] = TypeEnum.LoopedAcivity;
                checkInstanceAndGetType(mfObj.objectCollection, idTypeDict);
            }
        })
    return idTypeDict;
}
export function checkInstanceAndGetGeometry(mfObject: microflows.MicroflowObjectCollection, idPosDict: { [id: string]: _cpnInterface.microflow.IGeometry } = {},
    pointOfLooped?: common.IPoint | undefined, sizeOfLooped?: common.ISize | undefined) {
    mfObject.objects.forEach(obj => {
        if (pointOfLooped && sizeOfLooped) {
            if (obj instanceof microflows.LoopedActivity) {
                let loopInsideActivity = obj as microflows.LoopedActivity;
                let afterconvert = MfDataConvert.convertLoopedActivity(loopInsideActivity, pointOfLooped, sizeOfLooped);
                let middlepointLoopedInside: common.IPoint = {
                    x: afterconvert.geometry.left + (1 / 2) * afterconvert.geometry.width,
                    y: afterconvert.geometry.top + (1 / 2) * afterconvert.geometry.height
                }
                checkInstanceAndGetGeometry(obj.objectCollection, idPosDict, middlepointLoopedInside, loopInsideActivity.size);
            }
            else {
                let posDictPoint: common.IPoint = {
                    x: pointOfLooped.x - 1 / 2 * sizeOfLooped.width + obj.relativeMiddlePoint.x,
                    y: pointOfLooped.y - 1 / 2 * sizeOfLooped.height + obj.relativeMiddlePoint.y
                }
                idPosDict[obj.id] = MfDataConvert.convertGeometry(posDictPoint, obj.size, 1 / 2);
            }
        } else {
            if (obj instanceof microflows.LoopedActivity) {
                let LoopedActivity = obj as microflows.LoopedActivity;
                idPosDict[obj.id] = MfDataConvert.convertGeometry(obj.relativeMiddlePoint, obj.size, 1 / 2);
                checkInstanceAndGetGeometry(obj.objectCollection, idPosDict, LoopedActivity.relativeMiddlePoint, LoopedActivity.size);
            }
            else idPosDict[obj.id] = MfDataConvert.convertGeometry(obj.relativeMiddlePoint, obj.size, 1 / 2)
        }
    });
}
export function checkIdAndPushIntoViewHighlightObject(mfDiff: diff.IMfDiff, version: string, viewMicroflowObjects: _cpnInterface.microflow.IMicroflowObject[],
    viewHighLightDeletes: _cpnInterface.microflow.IMicroflowObject[],
    viewHighLightEdits: _cpnInterface.microflow.IMicroflowObject[], viewHighLightNews: _cpnInterface.microflow.IMicroflowObject[]) {
    viewMicroflowObjects.forEach(mfD => {
        mfDiff.deleteElementList && mfDiff.deleteElementList.forEach(mfDelete => {
            if (mfDelete.id === mfD.id) {
                viewHighLightDeletes.push(mfD);
            }
        })
        mfDiff.editElementList && mfDiff.editElementList.forEach(mfEdit => {
            if (mfEdit.isDiff) {
                if (mfEdit.id === mfD.id) {
                    viewHighLightEdits.push(mfD);
                }
            }
        })
        mfDiff.newElementList && mfDiff.newElementList.forEach(mfNew => {
            if (mfNew.id === mfD.id) {
                viewHighLightNews.push(mfD);
            }
        })
    })
    mfDiff.deleteElementList && mfDiff.deleteElementList.forEach(mfDelete => {
        mfDiff.newElementList && mfDiff.newElementList.forEach(mfNew => {
            if (mfNew.id === mfDelete.id && version === "new") {
                for (let count = 0; count < viewHighLightDeletes.length; count++) {
                    if (viewHighLightDeletes[count].id === mfNew.id) {
                        viewHighLightDeletes = viewHighLightDeletes.splice(count, 1)
                    }
                }
            }
            if (mfNew.id === mfDelete.id && version === "older") {
                for (let count = 0; count < viewHighLightNews.length; count++) {
                    if (viewHighLightNews[count].id === mfNew.id) {
                        viewHighLightNews = viewHighLightNews.splice(count, 1)
                    }
                }
            }
        })
    })
}
export function checkInstanceAndPushIntoViewFlow(mf: microflows.Microflow, viewMicroflowObjects: _cpnInterface.microflow.IMicroflowObject[],
    viewFlows: _cpnInterface.microflow.IFlow[], viewEntity: _cpnInterface.microflow.IEntity[], viewErrorHandlers: _cpnInterface.microflow.IErrorHandler[]) {
    mf.flows.forEach(mfflow => {
        if (mfflow instanceof microflows.SequenceFlow) {
            let Flow = mfflow as microflows.SequenceFlow;
            viewMicroflowObjects.forEach(mfObj1 => {
                if (mfflow.origin.id === mfObj1.id) {
                    viewMicroflowObjects.forEach(mfObj2 => {
                        if (mfflow.destination.id === mfObj2.id) {
                            viewFlows.push(MfDataConvert.convertSequenceFlow(Flow, mfObj1.geometry, mfObj2.geometry));
                            if (Flow.isErrorHandler == true) {
                                viewErrorHandlers.push(MfDataConvert.convertErrorHandler(Flow, mfObj1))
                            }
                            if (Flow.caseValue instanceof microflows.InheritanceCase) {
                                viewEntity.push(MfDataConvert.convertCaseValue(Flow, mfObj1.geometry, mfObj2.geometry));
                            }
                            if (Flow.caseValue instanceof microflows.EnumerationCase) {
                                viewEntity.push(MfDataConvert.convertSplitCondition(Flow, mfObj1.geometry, mfObj2.geometry));
                            }
                        }
                    })
                }
            })
        }
        if (mfflow instanceof microflows.AnnotationFlow) {
            let Flow = mfflow as microflows.AnnotationFlow;
            viewMicroflowObjects.forEach(mfObj1 => {
                if (mfflow.origin.id === mfObj1.id) {
                    viewMicroflowObjects.forEach(mfObj2 => {
                        if (mfflow.destination.id === mfObj2.id) {
                            viewFlows.push(MfDataConvert.convertAnnotationFlow(Flow, mfObj1.geometry, mfObj2.geometry));
                        }
                    })
                }
            })
        }
    })
}
export function checkIdAndPushIntoViewLabels(labels: { [id: string]: string }, viewMicroflowObjects: _cpnInterface.microflow.IMicroflowObject[],
    viewLabels: _cpnInterface.microflow.ILabel[]) {
    viewMicroflowObjects.forEach(mfObj => {
        if (mfObj.id) {
            switch (mfObj.type) {
                case TypeEnum.Start:
                case TypeEnum.End:
                case TypeEnum.ContinueEvent:
                case TypeEnum.BreakEvent:
                case TypeEnum.ErrorEvent: {
                    viewLabels.push(MfDataConvert.convertLabels(mfObj.geometry.top, mfObj.geometry.left + mfObj.geometry.width, labels[mfObj.id]))
                    break;
                }
                case TypeEnum.ExclusiveSplit:
                case TypeEnum.InheritanceSplit:
                case TypeEnum.ExclusiveMerge: {
                    viewLabels.push(MfDataConvert.convertLabels(mfObj.geometry.top, mfObj.geometry.left + mfObj.geometry.width / 2, labels[mfObj.id]))
                    break;
                }
                case TypeEnum.Parameter: {
                    viewLabels.push(MfDataConvert.convertLabels(mfObj.geometry.top, mfObj.geometry.left + 15, labels[mfObj.id]))
                    break;
                }
                default: {
                    viewLabels.push(MfDataConvert.convertLabels(mfObj.geometry.top, mfObj.geometry.left + mfObj.geometry.width, labels[mfObj.id]))
                }
            }
        }
    })
}
export function checkIdAndPushIntoViewHidePositionAndSizeHighlightObject(viewHighLightEdits: _cpnInterface.microflow.IMicroflowObject[], mfDiff: diff.IMfDiff
    , viewhidePositionHighLightEdits: _cpnInterface.microflow.IMicroflowObject[]) {
    mfDiff.editElementList.forEach(editObj => {
        if (editObj.isDiff) {
            let checkUndefined: boolean = true;
            for (let prop in editObj) {
                if (prop === "position" || prop === "size") {
                    continue;
                }
                else if (editObj[prop] && editObj[prop].isDiff) {
                    checkUndefined = false;
                    break;
                }
                else if (editObj[prop] instanceof Array) {
                    for (let i in editObj[prop]) {
                        if (editObj[prop][i].isDiff) {
                            checkUndefined = false;
                            break;
                        }
                    } if (checkUndefined === false) break;
                }
            }
            if (checkUndefined === false) {
                viewHighLightEdits.forEach(edit => {
                    if (edit.id === editObj.id) {
                        viewhidePositionHighLightEdits.push(edit);
                    }
                })
            }
        }
    })
}