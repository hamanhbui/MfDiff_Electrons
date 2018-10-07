import single = require("../SingleInterface")
import { microflows as mfs } from "mendixmodelsdk"
import * as $ from "./"


/**
 * load two LoopedActivity to an ILoopedActivity
 * it's not possible to know if user changes flows in LoopedActivity
 */
export function loadLoopedActivity(object: mfs.LoopedActivity, listMfCpnBasicInfo: single.IMfCpnBasicInfo[]): single.ILoopedActivity {
    return {
        isSingle: true,
        typeName: single.ElementType.LoopedActivity,
        iteratedListVariableName: object.iteratedListVariableName,
        loopVariableName: object.loopVariableName,
        objectCollection: object.objectCollection && object.objectCollection.objects && object.objectCollection.objects.map(object => $.loadMfObject(object, listMfCpnBasicInfo))
    }
}