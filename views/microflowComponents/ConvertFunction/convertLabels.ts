import _cpnInterface = require("../interfaces")
export function convertLabels(top: number, left: number, caption: string | undefined): _cpnInterface.microflow.ILabel {
    let geometryLabels: _cpnInterface.microflow.ILabel = {
        top: top - 9,
        left: left,
        caption: caption
    };
    if (caption) {
        geometryLabels.numbercap = caption.split('_')[1];
        geometryLabels.caption = caption.slice(0, caption.indexOf("_"));
    }
    return geometryLabels;
}