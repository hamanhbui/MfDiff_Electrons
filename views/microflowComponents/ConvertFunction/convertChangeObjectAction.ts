import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertChangeObjectAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, changeObjecAction: microflows.ChangeObjectAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IChangeObjectAction {
    var commit: _cpnInterface.microflow.CommitEnum = _cpnInterface.microflow.CommitEnum.No;
    if (changeObjecAction.commit === microflows.CommitEnum.Yes) {
        commit = _cpnInterface.microflow.CommitEnum.Yes
    }
    else if (changeObjecAction.commit === microflows.CommitEnum.YesWithoutEvents) {
        commit = _cpnInterface.microflow.CommitEnum.YesWithoutEvents
    }
    else if (changeObjecAction.commit === microflows.CommitEnum.No) {
        commit = _cpnInterface.microflow.CommitEnum.No
    }
    let cpnChangeObjecAction: _cpnInterface.microflow.IChangeObjectAction = {
        geometry: convertGeometry(changeObjecAction.containerAsActionActivity.relativeMiddlePoint, changeObjecAction.containerAsActionActivity.size, 1 / 2),
        commit: commit,
        refreshInClient: changeObjecAction.refreshInClient,
        caption: changeObjecAction.containerAsActionActivity.caption,
        type: _cpnTypeEnum.TypeEnum.ChangeObjectAction,
        id: changeObjecAction.containerAsActionActivity.id,
        errorHandlingType: changeObjecAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point && size) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnChangeObjecAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnChangeObjecAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (changeObjecAction.containerAsActionActivity.autoGenerateCaption === true) {
        if (changeObjecAction.changeVariableName === "") {
            cpnChangeObjecAction.caption = "Change";
        }
        else {
            cpnChangeObjecAction.caption = "Change '" + changeObjecAction.changeVariableName + "'";
        }
        for (var count = 0; count < changeObjecAction.items.length; count++) {
            if (changeObjecAction.items[count].attributeQualifiedName.includes(".")) {
                if (changeObjecAction.items.length === 1) {
                    cpnChangeObjecAction.caption += "(" + changeObjecAction.items[count].attributeQualifiedName.split(".")[2] + ")";
                }
                else {
                    if (count === 0) {
                        cpnChangeObjecAction.caption += "(" + changeObjecAction.items[count].attributeQualifiedName.split(".")[2] + ", ";
                    }
                    else if (count === changeObjecAction.items.length - 1) {
                        cpnChangeObjecAction.caption += changeObjecAction.items[count].attributeQualifiedName.split(".")[2] + ")";
                    }
                    else if (count != 0) {
                        cpnChangeObjecAction.caption += changeObjecAction.items[count].attributeQualifiedName.split(".")[2] + ", ";
                    }
                }
            } else {
                if (changeObjecAction.items.length === 1) {
                    cpnChangeObjecAction.caption += "(" + changeObjecAction.items[count].associationQualifiedName.split(".")[1] + ")";
                }
                else {
                    if (count === 0) {
                        cpnChangeObjecAction.caption += "(" + changeObjecAction.items[count].associationQualifiedName.split(".")[1] + ", ";
                    }
                    else if (count === changeObjecAction.items.length - 1) {
                        cpnChangeObjecAction.caption += changeObjecAction.items[count].associationQualifiedName.split(".")[1] + ")";
                    }
                    else if (count != 0) {
                        cpnChangeObjecAction.caption += changeObjecAction.items[count].associationQualifiedName.split(".")[1] + ", ";
                    }
                }
            }
        }
    }
    if (cpnChangeObjecAction.id) {
        objectInfo[cpnChangeObjecAction.id] = {
            caption: cpnChangeObjecAction.caption,
        }
    }
    return cpnChangeObjecAction;
}