import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertCreateListAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, createAction: microflows.CreateListAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.ICreateListAction {
    let cpnCreateListActionAction: _cpnInterface.microflow.ICreateListAction = {
        geometry: convertGeometry(createAction.containerAsActionActivity.relativeMiddlePoint, createAction.containerAsActionActivity.size, 1 / 2),
        caption: createAction.containerAsActionActivity.caption,
        initialValue: "List of " + createAction.entityQualifiedName.split(".")[1],
        variableName: createAction.outputVariableName,
        type: _cpnTypeEnum.TypeEnum.CreateListAction,
        id: createAction.containerAsActionActivity.id,
        errorHandlingType: createAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnCreateListActionAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnCreateListActionAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (createAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnCreateListActionAction.caption = "";
        cpnCreateListActionAction.caption = "Create List of " + createAction.entityQualifiedName.split(".")[1];
    }
    if (cpnCreateListActionAction.id) {
        objectInfo[cpnCreateListActionAction.id] = {
            caption: cpnCreateListActionAction.caption,
            returnName: cpnCreateListActionAction.variableName,
            returnType: cpnCreateListActionAction.initialValue
        }
    }
    return cpnCreateListActionAction;
}