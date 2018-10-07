import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertCreateObjectAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, createObjectAction: microflows.CreateObjectAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.ICreateObjectAction {
    var commit: _cpnInterface.microflow.CommitEnum = _cpnInterface.microflow.CommitEnum.No;
    if (createObjectAction.commit === microflows.CommitEnum.Yes) {
        commit = _cpnInterface.microflow.CommitEnum.Yes
    }
    else if (createObjectAction.commit === microflows.CommitEnum.YesWithoutEvents) {
        commit = _cpnInterface.microflow.CommitEnum.YesWithoutEvents
    }
    else if (createObjectAction.commit === microflows.CommitEnum.No) {
        commit = _cpnInterface.microflow.CommitEnum.No
    }
    let name = createObjectAction.entityQualifiedName === "" ? "" : createObjectAction.entityQualifiedName.split(".")[1];
    let cpnCreateObjectAction: _cpnInterface.microflow.ICreateObjectAction = {
        geometry: convertGeometry(createObjectAction.containerAsActionActivity.relativeMiddlePoint, createObjectAction.containerAsActionActivity.size, 1 / 2),
        commit: commit,
        refreshInClient: createObjectAction.refreshInClient,
        caption: createObjectAction.containerAsActionActivity.caption,
        returnName: createObjectAction.outputVariableName,
        returnType: name,
        type: _cpnTypeEnum.TypeEnum.CreateObjectAction,
        id: createObjectAction.containerAsActionActivity.id,
        errorHandlingType: createObjectAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point && size) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnCreateObjectAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnCreateObjectAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (createObjectAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnCreateObjectAction.caption = "Create " + name;
        for (var count = 0; count < createObjectAction.items.length; count++) {
            if (createObjectAction.items[count].attributeQualifiedName && createObjectAction.items[count].attributeQualifiedName.includes(".")) {
                if (createObjectAction.items.length === 1) {
                    cpnCreateObjectAction.caption += "(" + createObjectAction.items[count].attributeQualifiedName.split(".")[2] + ")";
                }
                else {
                    if (count === 0) {
                        cpnCreateObjectAction.caption += "(" + createObjectAction.items[count].attributeQualifiedName.split(".")[2] + ", ";
                    }
                    else if (count === createObjectAction.items.length - 1) {
                        cpnCreateObjectAction.caption += createObjectAction.items[count].attributeQualifiedName.split(".")[2] + ")";
                    }
                    else if (count != 0) {
                        cpnCreateObjectAction.caption += createObjectAction.items[count].attributeQualifiedName.split(".")[2] + ", ";
                    }
                }
            }
            else {
                if (createObjectAction.items.length === 1) {
                    cpnCreateObjectAction.caption += "(" + createObjectAction.items[count].associationQualifiedName.split(".")[1] + ")";
                }
                else {
                    if (count === 0) {
                        cpnCreateObjectAction.caption += "(" + createObjectAction.items[count].associationQualifiedName.split(".")[1] + ", ";
                    }
                    else if (count === createObjectAction.items.length - 1) {
                        cpnCreateObjectAction.caption += createObjectAction.items[count].associationQualifiedName.split(".")[1] + ")";
                    }
                    else if (count != 0) {
                        cpnCreateObjectAction.caption += createObjectAction.items[count].associationQualifiedName.split(".")[1] + ", ";
                    }
                }
            }
        }
    }
    if (cpnCreateObjectAction.id) {
        objectInfo[cpnCreateObjectAction.id] = {
            caption: cpnCreateObjectAction.caption,
            returnName: cpnCreateObjectAction.returnName,
            returnType: cpnCreateObjectAction.returnType
        }
    }
    return cpnCreateObjectAction;
}