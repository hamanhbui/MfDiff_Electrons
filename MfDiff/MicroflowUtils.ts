import when = require("when");
import { microflows as mfs } from "mendixmodelsdk"
import { loadAsPromise } from "mendixplatformsdk";

var MicroflowUtils = class MicroflowUtils {
    static loadAllMicroflows(mf: mfs.IMicroflow[]): when.Promise<microflows.Microflow[]> {
        return when.all<microflows.Microflow[]>(mf.map(loadAsPromise));
    }

    static loadMicroflowById(mfs: (mfs.IMicroflow | undefined)[], mfId: string, mfName: string): when.Promise<mfs.Microflow> {
        console.log("Start loading microflow " + mfName)
        return when.promise<mfs.microflow>((resolve) => {
            let mf = mfs.filter(mf => mf!.id === mfId)[0];
            if (mf) {
                resolve(loadAsPromise(mf))
            }
            else {
                resolve(undefined)
            }

        })
    }

    static compareTwoMfsById(first: mfs.IMicroflow, second: mfs.IMicroflow): number {
        if (first.id > second.id) return 1;
        if (first.id === second.id) return 0;
        return -1;
    }

    static compareTwoMfObjectsById(first: mfs.MicroflowObject, second: mfs.MicroflowObject): number {
        if (first.id > second.id) return 1;
        if (first.id === second.id) return 0;
        return -1;
    }

    static compareTwoMfObjectsByIdAndType(first: mfs.MicroflowObject, second: mfs.MicroflowObject): number {
        if (first.id > second.id || (first.id === second.id && first.structureTypeName > second.structureTypeName)) return 1;
        if (first.id === second.id && first.structureTypeName === second.structureTypeName) {
            if (first instanceof mfs.ActionActivity && second instanceof mfs.ActionActivity) {
                if (first.action === null || second.action === null) return -1
                if (first.action.structureTypeName === second.action.structureTypeName) {
                    return 0
                } else {
                    return -1
                }
            } else {
                return 0
            }
        }
        return -1;
    }

}
export = MicroflowUtils;