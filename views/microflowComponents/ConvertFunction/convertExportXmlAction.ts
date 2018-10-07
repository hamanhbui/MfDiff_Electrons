import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import { common } from "mendixmodelsdk";
export function convertExportXmlAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, webExportXmlAction: microflows.ExportXmlAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IExportXmlAction {
    let cpnExportXmlAction: _cpnInterface.microflow.IWebServiceCallAction = {
        geometry: convertGeometry(webExportXmlAction.containerAsActionActivity.relativeMiddlePoint, webExportXmlAction.containerAsActionActivity.size, 1 / 2),
        caption: webExportXmlAction.containerAsActionActivity.caption,
        returnType: "String",
        variableName: webExportXmlAction.outputMethod["outputVariableName"],
        type: _cpnTypeEnum.TypeEnum.ExportXmlAction,
        id: webExportXmlAction.containerAsActionActivity.id,
        errorHandlingType: webExportXmlAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnExportXmlAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnExportXmlAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (webExportXmlAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnExportXmlAction.caption = "Export to XML";
    }
    if (webExportXmlAction.outputMethod instanceof microflows.FileDocumentExport) {
        cpnExportXmlAction.returnType = "";
    }
    if (cpnExportXmlAction.id) {
        objectInfo[cpnExportXmlAction.id] = {
            caption: cpnExportXmlAction.caption,
            returnName: cpnExportXmlAction.variableName,
            returnType: cpnExportXmlAction.returnType
        }
    }
    return cpnExportXmlAction;
}//todo