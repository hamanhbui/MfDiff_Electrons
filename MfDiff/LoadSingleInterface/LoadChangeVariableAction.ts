import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface");

/**
 * load two ChangeVariableActions to an IChangeVariableActionDiff
 */
export function loadChangeVariableAction(object: mfs.ChangeVariableAction, listMfCpnBasicInfo: single.IMfCpnBasicInfo[]): single.IChangeVariableAction {
    let changeVariableName: string = object.changeVariableName;
    listMfCpnBasicInfo.forEach(element => {
        if (object.changeVariableName === element.name) {
            changeVariableName += " (" + element.type + ")"
        }
    })
    return {
        isSingle: true,
        typeName: single.ElementType.ChangeVariableAction,
        changeVariableName: changeVariableName,
        value: object.value,
    }
}