import { microflows as mfs, IList } from "mendixmodelsdk"
import { SearchingList } from "../MfDiff/SearchingList"
// import { IMfDiff, IElement } from "../MfDiff/DiffInterface"

export type Label = { [id: string]: string }



interface SortingObject {
    typeName: string;
    id: string;
    x: number;
    y: number;
    objectCollection?: SortingObject[]
}

const labelTemplate = {
    "RestCallAction": "RC",
    "ChangeVariableAction": "CV",
    "CommitAction": "C",
    "RetrieveAction": "RE",
    "CreateVariableAction": "RV",
    "CreateObjectAction": "RO",
    "ListOperationAction": "LO",
    "ChangeObjectAction": "CO",
    "CastAction": "CA",
    "DeleteAction": "DE",
    "RollbackAction": "RB",
    "AggregateListAction": "AL",
    "ChangeListAction": "CL",
    "CreateListAction": "RL",
    "CloseFormAction": "CF",
    "DownloadFileAction": "DF",
    "StartEvent": "SE",
    "EndEvent": "EE",
    "ContinueEvent": "CE",
    "BreakEvent": "BE",
    "ExclusiveMerge": "EM",
    "Annotation": "A",
    "MicroflowCallAction": "MC",
    "ShowHomePageAction": "SH",
    "ShowMessageAction": "SM",
    "ValidationFeedbackAction": "VF",
    "LogMessageAction": "LM",
    "GenerateDocumentAction": "GD",
    "WebServiceCallAction": "WS",
    "ImportXmlAction": "IX",
    "ExportXmlAction": "EX",
    "MicroflowParameterObject": "MP",
    "ExclusiveSplit": "ES",
    "InheritanceSplit": "IS",
    "JavaActionCallAction": "JA",
    "LoopedActivity": "L",
    "ShowPageAction": "SP",
    "SequenceFlow": "SF"
}

let labelNumber: { [name: string]: number } = {};
let output: Label = {};

function loadToSortingObject(object: mfs.MicroflowObject, positionOfContainer?: { x: number, y: number }): SortingObject {
    return {
        id: object.id,
        x: object.relativeMiddlePoint.x + (positionOfContainer ? positionOfContainer.x : 0),
        y: object.relativeMiddlePoint.y + (positionOfContainer ? positionOfContainer.y : 0),
        typeName: (object instanceof mfs.ActionActivity) ? object.action.structureTypeName.split("$")[1] : object.structureTypeName.split("$")[1],
    }
}

function compareTwoSortingObject(object1: SortingObject, object2: SortingObject): number {
    if (object1.x > object2.x || (object1.x === object2.x && object1.y > object2.y)) return 1;
    if (object1.id === object2.id) return 0;
    return -1;
}

function assignLabelToObject(object: SortingObject) {
    if (object.id) {
        if (!labelNumber[object.typeName]) {
            labelNumber[object.typeName] = 1;
        }
        output[object.id] = labelTemplate[object.typeName] + "_" + labelNumber[object.typeName].toString();
        labelNumber[object.typeName]++
        if (object.typeName === "LoopedActivity" && object.objectCollection) {
            object.objectCollection.forEach(subObject => {
                assignLabelToObject(subObject)
            })
        }
    }
}

function getSortingObjects(objectCollection: IList<mfs.MicroflowObject>, positionOfContainer?: { x: number, y: number }): Array<SortingObject> {
    let arrayOfSortingObject: Array<SortingObject> = [];
    objectCollection.forEach(object => {
        if (object instanceof mfs.ActionActivity && !object.action) return { id: "", x: 0, y: 0, typeName: "" };
        if (object instanceof mfs.LoopedActivity && object.objectCollection.objects) {
            arrayOfSortingObject = arrayOfSortingObject.concat(getSortingObjects(object.objectCollection.objects, object.relativeMiddlePoint))
        }
        arrayOfSortingObject = arrayOfSortingObject.concat(loadToSortingObject(object, positionOfContainer));
    })
    return arrayOfSortingObject
}

export function generateLabel(mf1: mfs.Microflow | undefined, mf2: mfs.Microflow | undefined): Label {
    output = {};
    labelNumber = {}
    if (mf1 && mf2) {
        let arrayOfObject1 = new SearchingList(getSortingObjects(mf1.objectCollection.objects), compareTwoSortingObject);
        arrayOfObject1.getList().forEach(object => {
            assignLabelToObject(object)
        })
        let arrayOfObject2 = new SearchingList(getSortingObjects(mf2.objectCollection.objects), compareTwoSortingObject);
        arrayOfObject2.getList().forEach(object => {
            if (!output[object.id]) {
                assignLabelToObject(object)
            }
        })
    }
    return output;
}
