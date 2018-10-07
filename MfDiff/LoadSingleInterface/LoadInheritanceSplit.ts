import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface");

export function loadInheritanceSplit(object: mfs.InheritanceSplit): single.IInheritanceSplit {
    return {
        isSingle: true,
        typeName: single.ElementType.InheritanceSplit,
        caption: object.caption,
        splitVariableName: object.splitVariableName
    }
}