import { microflows } from "mendixmodelsdk";
export function findHorizontal(mf: microflows.Microflow): number {
    // var min=mf.objectCollection.objects[0].relativeMiddlePoint.x;
    var xs: number[] = mf.objectCollection.objects.map(obj => obj).map(obj => obj.relativeMiddlePoint.x);
    let minx = Math.min(...xs);
    mf.objectCollection.objects.forEach(mfObj => {
        if (mfObj.relativeMiddlePoint.x === minx && minx < 0) {
            minx -= mfObj.size.width;
            minx -= 50;
        }
        if (mfObj.relativeMiddlePoint.x === minx && minx > 0) {
            minx += mfObj.size.width;
        }
    })
    if (minx < 0) return -minx
    else return 50;
} 