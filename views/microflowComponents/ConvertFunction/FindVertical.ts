import { microflows } from "mendixmodelsdk";
export function findVertical(mf: microflows.Microflow): number {
    // var min=mf.objectCollection.objects[0].relativeMiddlePoint.x;
    var ys: number[] = mf.objectCollection.objects.map(obj => obj).map(obj => obj.relativeMiddlePoint.y);
    let miny = Math.min(...ys);
    mf.objectCollection.objects.forEach(mfObj => {
        if (mfObj.relativeMiddlePoint.y === miny && miny < 0) {
            miny -= mfObj.size.height;
            miny -= 50;
        }
        if (mfObj.relativeMiddlePoint.y === miny && miny > 0) {
            miny += mfObj.size.height;
        }
    })
    if (miny < 0) return -miny;
    else return 50;
}