import { microflows } from "mendixmodelsdk";
export function findMaxVertical(mf: microflows.Microflow): number {
    // var min=mf.objectCollection.objects[0].relativeMiddlePoint.x;
    var ys: number[] = mf.objectCollection.objects.map(obj => obj).map(obj => obj.relativeMiddlePoint.y);
    let maxY = Math.max(...ys);
    let minY = Math.min(...ys);
    mf.objectCollection.objects.forEach(mfObj => {
        if (mfObj.relativeMiddlePoint.y === maxY && maxY < 0) {
            maxY -= mfObj.size.height;
        }
        if (mfObj.relativeMiddlePoint.y === maxY && maxY > 0) {
            maxY += mfObj.size.height;
        }
    })
    if (minY > 0 && minY != Infinity) return maxY + minY + 50;
    else if (minY < 0 && maxY > 0 && minY != -Infinity && maxY != Infinity) {
        return maxY + 50;
    }
    else return 0;
} 