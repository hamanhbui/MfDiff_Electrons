import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertGenerateDocumentAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, generateDocumentAction: microflows.GenerateDocumentAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IGenerateDocumentAction {
    let cpnGenerateDocumentAction: _cpnInterface.microflow.IGenerateDocumentAction = {
        geometry: convertGeometry(generateDocumentAction.containerAsActionActivity.relativeMiddlePoint, generateDocumentAction.containerAsActionActivity.size, 1 / 2),
        caption: generateDocumentAction.containerAsActionActivity.caption,
        type: _cpnTypeEnum.TypeEnum.GenerateDocument,
        id: generateDocumentAction.containerAsActionActivity.id,
        errorHandlingType: generateDocumentAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnGenerateDocumentAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnGenerateDocumentAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (generateDocumentAction.containerAsActionActivity.autoGenerateCaption === true) {
        if (generateDocumentAction.documentType.name === "HTML" || generateDocumentAction.documentType.name === "PDF") {
            cpnGenerateDocumentAction.caption = "Generate " + generateDocumentAction.documentType.name + " (." +
                generateDocumentAction.documentType.name.toLowerCase() + ") document";
            if (generateDocumentAction.documentTemplate) {
                cpnGenerateDocumentAction.caption += " using template '" + generateDocumentAction.documentTemplate.name + "'";
            }
        }
        else if (generateDocumentAction.documentType.name === "DOCX") {
            cpnGenerateDocumentAction.caption = "Generate Word 2007" + " (." +
                generateDocumentAction.documentType.name.toLowerCase() + ") document";
            if (generateDocumentAction.documentTemplate) {
                cpnGenerateDocumentAction.caption += " using template '" + generateDocumentAction.documentTemplate.name + "'";
            }
        }
        else if (generateDocumentAction.documentType.name === "DOC") {
            cpnGenerateDocumentAction.caption = "Generate Word 2003" + " (." +
                generateDocumentAction.documentType.name.toLowerCase() + ") document"
            if (generateDocumentAction.documentTemplate) {
                cpnGenerateDocumentAction.caption += " using template '" + generateDocumentAction.documentTemplate.name + "'";
            }
        }
        else if (generateDocumentAction.documentType.name === "ODT") {
            cpnGenerateDocumentAction.caption = "Generate Open Office" + " (." +
                generateDocumentAction.documentType.name.toLowerCase() + ") document";
            if (generateDocumentAction.documentTemplate) {
                cpnGenerateDocumentAction.caption += " using template '" + generateDocumentAction.documentTemplate.name + "'";
            }
        }
        else if (generateDocumentAction.documentType.name === "RTF") {
            cpnGenerateDocumentAction.caption = "Generate Rich-text format" + " (." +
                generateDocumentAction.documentType.name.toLowerCase() + ") document";
            if (generateDocumentAction.documentTemplate) {
                cpnGenerateDocumentAction.caption += " using template '" + generateDocumentAction.documentTemplate.name + "'";
            }
        }
    }
    if (cpnGenerateDocumentAction.id) {
        objectInfo[cpnGenerateDocumentAction.id] = {
            caption: cpnGenerateDocumentAction.caption,
        }
    }
    return cpnGenerateDocumentAction;
}