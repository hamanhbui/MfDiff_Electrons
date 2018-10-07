import single = require("../SingleInterface");
import { microflows as mfs } from "mendixmodelsdk"

export function loadCreateListAction(object: mfs.CreateListAction): single.ICreateListAction {
    return {
        isSingle: true,
        typeName: single.ElementType.CreateListAction,
        entityName: object.entityQualifiedName,
        outputVariableName: object.outputVariableName,
    }
}