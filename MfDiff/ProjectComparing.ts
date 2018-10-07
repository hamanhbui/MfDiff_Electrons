/// <reference path="../typings/index.d.ts" />
// import when = require("when");
import { microflows as mfs } from "mendixmodelsdk";
import { RevisionUtils } from "./RevisionUtils"
import { SearchingList } from "./SearchingList";
import MicroflowUtils = require("./MicroflowUtils");
import diff = require("./DiffInterface");
import single = require("./SingleInterface")
import loadDiff = require("./LoadDiffInterface/")
import { loadSingleInterface } from "./LoadSingleInterface"
import { loadListMfCpnBasicInfo } from "./loadMfCpnBasicInfo"
export class ProjectComparing {

    static loadAllObjects(objectCollection: mfs.MicroflowObjectCollection | undefined, listMfCpnBasicInfo: single.IMfCpnBasicInfo[], microflow?: mfs.Microflow | undefined): Array<mfs.MicroflowObject | mfs.Flow | single.IProperty> {
        let output: Array<mfs.MicroflowObject | mfs.Flow | single.IProperty> = [];
        objectCollection && objectCollection.objects && objectCollection.objects.forEach(object => {
            output.push(object);
            loadListMfCpnBasicInfo(object, listMfCpnBasicInfo)
            if (object instanceof mfs.LoopedActivity) {
                output = output.concat(ProjectComparing.loadAllObjects(object.objectCollection, listMfCpnBasicInfo))
            }
        })
        if (microflow) {
            let property: single.IProperty = {
                name: microflow.name,
                errorMessage: microflow.concurrencyErrorMessage.translations[0].text,
                id: microflow.id,
                allowConcurrentExecution: microflow.allowConcurrentExecution,
                errorMicroflow: microflow.concurrencyErrorMicroflowQualifiedName,
                applyEntityAccess: microflow.applyEntityAccess,
                documentation: microflow.documentation,
                returnType: microflow.returnType,
                markAsUsed: microflow.markAsUsed,
                typeName: single.ElementType.Property,
                allowedModuleRolesQualifiedNames: microflow.allowedModuleRolesQualifiedNames,
                isSingle: true
            }
            output.push(property)
        }
        return output;
    }

    static compareTwoMfElementBasesByIdAndType(first: single.IMfElementBase, second: single.IMfElementBase): number {
        if (first.typeName.name > second.typeName.name) return 1;
        if (first.typeName.name === second.typeName.name) {
            if ((first.id as string) > (second.id as string)) {
                return 1;
            }
            if ((first.id as string) === (second.id as string)) {
                return 0;
            }
        }
        return -1;
    }

    static compareTwoTestingMicroflows(newMf: Array<single.IMfElementBase>, oldMf: Array<single.IMfElementBase>): diff.IMfDiff {
        let newIMfElementBaseList = new SearchingList<single.IMfElementBase>(newMf,
            ProjectComparing.compareTwoMfElementBasesByIdAndType);

        let oldIMfElementBaseList = new SearchingList<single.IMfElementBase>(oldMf,
            ProjectComparing.compareTwoMfElementBasesByIdAndType);

        let removedMfElements = newIMfElementBaseList.missingList(oldIMfElementBaseList);
        let addedMfElements = oldIMfElementBaseList.missingList(newIMfElementBaseList);

        let editedObjectList: diff.IMfElementDiffBase[] = [];
        newIMfElementBaseList.getList().forEach(mfo1 => {
            let mfo2 = oldIMfElementBaseList.find(mfo1);
            if (mfo2 !== null) {
                let object = loadDiff.loadDiffInterface(mfo1, mfo2);
                object = loadDiff.checkDiffInterface(object) as diff.IMfElementDiffBase
                if (object !== undefined) {
                    object.id = mfo1.id;
                    editedObjectList.push(object);
                }
            }
        })

        return new diff.MfDiff(removedMfElements, addedMfElements, editedObjectList)
    }

    /**
     * Compare two microflow by their objectCollection, show the difference
     * @param newMf: new Microflow
     * @param oldMf: old Microflow
     * @return an IMicroflow includes two input Microflows and their changing details
     */
    static compareTwoMicroflows(newMf: mfs.Microflow | undefined, oldMf: mfs.Microflow | undefined): diff.IMicroflow {
        let newMfElementList: Array<mfs.MicroflowObject | mfs.Flow | single.IProperty | undefined> = [];
        let newMfBasicInfo: single.IMfCpnBasicInfo[] = [];
        let oldMfBasicInfo: single.IMfCpnBasicInfo[] = [];
        if (newMf) {
            newMfElementList = ProjectComparing.loadAllObjects(newMf.objectCollection, newMfBasicInfo, newMf);
            newMfElementList = newMfElementList.concat(newMf.flows.map(element => element))
        }
        let oldMfElementList: Array<mfs.MicroflowObject | mfs.Flow | single.IProperty | undefined> = [];
        if (oldMf) {
            oldMfElementList = ProjectComparing.loadAllObjects(oldMf.objectCollection, oldMfBasicInfo, oldMf);
            oldMfElementList = oldMfElementList.concat(oldMf.flows.map(element => element))
        }
        let newIMfElementBaseList = new SearchingList<single.IMfElementBase>(
            newMfElementList.map(element => loadSingleInterface(element!, newMfBasicInfo)),
            ProjectComparing.compareTwoMfElementBasesByIdAndType);

        let oldIMfElementBaseList = new SearchingList<single.IMfElementBase>(
            oldMfElementList.map(element => loadSingleInterface(element!, oldMfBasicInfo)),
            ProjectComparing.compareTwoMfElementBasesByIdAndType);

        let removedMfElements = newIMfElementBaseList.missingList(oldIMfElementBaseList);
        let addedMfElements = oldIMfElementBaseList.missingList(newIMfElementBaseList);

        let editedObjectList: diff.IMfElementDiffBase[] = [];
        newIMfElementBaseList.getList().forEach(mfo1 => {
            let mfo2 = oldIMfElementBaseList.find(mfo1);
            if (mfo2 !== null) {
                let object = loadDiff.loadDiffInterface(mfo1, mfo2);
                object = loadDiff.checkDiffInterface(object) as diff.IMfElementDiffBase
                if (object !== undefined) {
                    object.id = mfo1.id;
                    editedObjectList.push(object);
                }
            }
        })
        // editedObjectList = new SearchingList(editedObjectList, ProjectComparing.compareTwoObjectsByEditedOrNot).getList();

        return {
            microflow1: newMf,
            microflow2: oldMf,
            mfDiff: new diff.MfDiff(removedMfElements, addedMfElements, editedObjectList)
        }
    }

    static compareTwoListOfMfs(twoListOfMicroflows: (mfs.Microflow | undefined)[][] | (mfs.IMicroflow | undefined)[][]) {
        let newMfList = new SearchingList<mfs.IMicroflow>(twoListOfMicroflows[0] ? twoListOfMicroflows[0] : [],
            MicroflowUtils.compareTwoMfsById);
        let oldMfList = new SearchingList<mfs.IMicroflow>(twoListOfMicroflows[1] ? twoListOfMicroflows[1] : [],
            MicroflowUtils.compareTwoMfsById);
        return {
            removedMicroflows: newMfList.missingList(oldMfList),
            addedMicroflows: oldMfList.missingList(newMfList),
            commonMicroflows: newMfList.getList().filter(newMf => oldMfList.find(newMf)).map(newMf => {
                let oldMf = oldMfList.find(newMf);
                return {
                    newMf: newMf,
                    oldMf: oldMf
                }
            })
        }
    }

    static compareRevisions(newRevision: RevisionUtils, oldRevision: RevisionUtils) {
        if (newRevision.getRevNo() < oldRevision.getRevNo()) {
            [newRevision, oldRevision] = [oldRevision, newRevision];
        }
        let newModuleList = new SearchingList(newRevision.allModules(),
            ProjectComparing.compareTwoModulesByName);
        let oldModuleList = new SearchingList(oldRevision.allModules(),
            this.compareTwoModulesByName);
        // removedModules = newModuleList.missingList(oldModuleList);
        // addedModules = oldModuleList.missingList(newModuleList);
        let commonModules = newModuleList.getList().filter(newModule => oldModuleList.find(newModule) !== null)
        return commonModules
    }

    static compareTwoModulesByMfs(revisions: RevisionUtils[], moduleName: string) {
        return ProjectComparing.compareTwoListOfMfs([revisions[0].retrieveMicroflowsFromModule(moduleName), revisions[1].retrieveMicroflowsFromModule(moduleName)]);
    }

    static compareTwoModulesByName(moduleName1: string, moduleName2: string) {
        if (moduleName1 > moduleName2) return 1;
        if (moduleName1 === moduleName2) return 0;
        return -1;
    }
}
