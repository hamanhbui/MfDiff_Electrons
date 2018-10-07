import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface");

export function loadDownloadFileAction(object: mfs.DownloadFileAction): single.IDownloadFileAction {
    return {
        isSingle: true,
        typeName: single.ElementType.DownloadFileAction,
        fileDocumentVariableName: object.fileDocumentVariableName,
        showFileInBrowser: object.showFileInBrowser
    }
}