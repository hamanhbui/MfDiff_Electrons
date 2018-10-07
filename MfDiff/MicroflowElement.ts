import { microflows as mfs } from "mendixmodelsdk"

export interface MicroflowElement {
    id: string,
    typeName: string,
    parentObject?: MicroflowElement,
    object?: mfs.MicroflowObject | mfs.Flow
}

export function convertToMicroflowElement(object: mfs.MicroflowObject, parentObject: MicroflowElement): MicroflowElement {
    return {
        id: object.id,
        typeName: (object instanceof mfs.ActionActivity) ? object.action.structureTypeName : object.structureTypeName,
        parentObject: parentObject,
        object: object
    }
}

export function compareTwoMicroflowElements(first: MicroflowElement, second: MicroflowElement): number {
    if (first.id > second.id || (first.id === second.id && first.typeName > second.typeName)) return 1
    if (first.id === second.id && first.typeName === second.typeName) {
        return 0
    }
    return -1;
}

export function loadAllObjects(objectCollection: mfs.MicroflowObjectCollection, parentObject: MicroflowElement): MicroflowElement[] {
    let output: MicroflowElement[] = []
    objectCollection && objectCollection.objects && objectCollection.objects.forEach(object => {
        let element = convertToMicroflowElement(object, parentObject)
        output.push(element)
        if (object instanceof mfs.LoopedActivity) {
            output = output.concat(loadAllObjects(object.objectCollection, element))
        }
    })
    return output
}