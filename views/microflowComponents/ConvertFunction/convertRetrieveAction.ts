import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertRetrieveAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, retrieveAction: microflows.RetrieveAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IRetrieveAction {
    let cpnRetrieveAction: _cpnInterface.microflow.IRetrieveAction = {
        geometry: convertGeometry(retrieveAction.containerAsActionActivity.relativeMiddlePoint, retrieveAction.containerAsActionActivity.size, 1 / 2),
        caption: retrieveAction.containerAsActionActivity.caption,
        returnName: retrieveAction.outputVariableName,
        returnType: "",
        type: _cpnTypeEnum.TypeEnum.RetrieveAction,
        id: retrieveAction.containerAsActionActivity.id,
        errorHandlingType: retrieveAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (retrieveAction.retrieveSource instanceof microflows.DatabaseRetrieveSource) {
        if (retrieveAction.retrieveSource.range instanceof microflows.ConstantRange) {
            if (retrieveAction.retrieveSource.range["singleObject"] === false) {
                cpnRetrieveAction.returnType = "List of " + retrieveAction.retrieveSource.entityQualifiedName.split(".")[1];
            }
            else {
                cpnRetrieveAction.returnType = retrieveAction.retrieveSource.entityQualifiedName.split(".")[1];
            }
        }
        else {
            cpnRetrieveAction.returnType = "List of " + retrieveAction.retrieveSource.entityQualifiedName.split(".")[1];
        }
    }
    if (retrieveAction.retrieveSource instanceof microflows.AssociationRetrieveSource) {
        cpnRetrieveAction.returnType = retrieveAction.retrieveSource.associationQualifiedName.split("_")[1];
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnRetrieveAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnRetrieveAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (retrieveAction.containerAsActionActivity.autoGenerateCaption === true) {
        if (retrieveAction.retrieveSource instanceof microflows.DatabaseRetrieveSource) {
            if (retrieveAction.retrieveSource.range instanceof microflows.ConstantRange) {
                if (retrieveAction.retrieveSource.range["singleObject"] === false) {
                    cpnRetrieveAction.caption = "Retrieve list of " + retrieveAction.retrieveSource.entityQualifiedName.split(".")[1] + " from Database";
                } else {
                    cpnRetrieveAction.caption = "Retrieve " + retrieveAction.retrieveSource.entityQualifiedName.split(".")[1] + " from Database";
                }
            }
            else {
                cpnRetrieveAction.caption = "Retrieve list of " + retrieveAction.retrieveSource.entityQualifiedName.split(".")[1] + " from Database";
            }
        }
        if (retrieveAction.retrieveSource instanceof microflows.AssociationRetrieveSource) {
            cpnRetrieveAction.caption = "Retrieve " + retrieveAction.retrieveSource.associationQualifiedName.split("_")[1] +
                " by $" + retrieveAction.retrieveSource.startVariableName + "/" + retrieveAction.retrieveSource.associationQualifiedName.split(".")[1];
        }
    }
    if (cpnRetrieveAction.id) {
        objectInfo[cpnRetrieveAction.id] = {
            caption: cpnRetrieveAction.caption,
            returnName: cpnRetrieveAction.returnName,
            returnType: cpnRetrieveAction.returnType
        }
    }
    return cpnRetrieveAction;
}