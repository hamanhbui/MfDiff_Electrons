/// <ref erence path="./ ../typings/index.d.ts" /> 
import * as React from "react";
import { microflows } from "mendixmodelsdk";
import _cpnInterface = require("./microflowComponents/interfaces")
import { findHorizontal } from "./microflowComponents/ConvertFunction/FindHorizontal";
import { findVertical } from "./microflowComponents/ConvertFunction/FindVertical";
import { findMaxHorizontal } from "./microflowComponents/ConvertFunction/FindMaxHorizontal";
import { findMaxVertical } from "./microflowComponents/ConvertFunction/FindMaxVertical";
import {
    checkInstaceAndPushIntoViewMicroflowObject,
    checkIdAndPushIntoViewHighlightObject,
    checkInstanceAndPushIntoViewFlow,
    checkIdAndPushIntoViewLabels,
    checkIdAndPushIntoViewHidePositionAndSizeHighlightObject,
} from "./microflowComponents/utils";
import { Flow, MicroflowObject, MicroflowObjectDiff, ErrorHandler } from "./microflowComponents"
import { observer } from "mobx-react";
import * as diff from "./../MfDiff/DiffInterface";
import { CaseValue } from "./microflowComponents/CaseValue";
//import { Label } from "./microflowComponents/Label";
import { diffNewStyle, diffDeleteStyle, diffEditStyle } from "./../config";
/**
 * Component to render a microflow
 * @param props a structure of Microflow, MfDiff, onSelectObject
 */
const Microflow = (props: {
    setListComponentInfo1: (listComponentInfo: _cpnInterface.microflow.IObjectDict) => void,
    setListComponentInfo2: (listComponentInfo: _cpnInterface.microflow.IObjectDict) => void,
    mf: microflows.Microflow | undefined, labels: { [id: string]: string }, version: string,
    mfDiff: diff.IMfDiff, onSelectObject: (id: string) => void, hidePositionAndSize: boolean, revNos: number
}) => {
    let { mf, version, mfDiff, onSelectObject } = props;
    let viewMicroflowObjects: _cpnInterface.microflow.IMicroflowObject[] = [];
    let viewFlows: _cpnInterface.microflow.IFlow[] = [];
    let viewHighLightDeletes: _cpnInterface.microflow.IMicroflowObject[] = [];
    let viewHighLightEdits: _cpnInterface.microflow.IMicroflowObject[] = [];
    let viewHighLightNews: _cpnInterface.microflow.IMicroflowObject[] = [];
    let viewCaseValues: _cpnInterface.microflow.IEntity[] = [];
    let viewLabels: _cpnInterface.microflow.ILabel[] = [];
    let viewErrorHandlers: _cpnInterface.microflow.IErrorHandler[] = [];
    let viewHidePositionAndSizeHighLightEdits: _cpnInterface.microflow.IMicroflowObject[] = [];
    let listComponentInfo = new _cpnInterface.microflow.IObjectDict();
    let top = 0, left = 0, width = 0, height = 0;
    var ListObject: JSX.Element[] = [];
    var ListEditHighlight: JSX.Element[] = [];
    var ListHidePositionAnsSizeEditHighlight: JSX.Element[] = [];
    var ListDeleteHighlight: JSX.Element[] = [];
    var ListNewHighlight: JSX.Element[] = [];
    var ListFlow: JSX.Element[] = [];
    var ListCaseValue: JSX.Element[] = [];
    var ListErrorHandler: JSX.Element[] = [];
    if (mf) {
        checkInstaceAndPushIntoViewMicroflowObject(listComponentInfo, mf, mf.objectCollection, viewMicroflowObjects)
        checkIdAndPushIntoViewHighlightObject(mfDiff, version, viewMicroflowObjects, viewHighLightDeletes, viewHighLightEdits, viewHighLightNews);
        checkInstanceAndPushIntoViewFlow(mf, viewMicroflowObjects, viewFlows, viewCaseValues, viewErrorHandlers);
        checkIdAndPushIntoViewLabels(props.labels, viewMicroflowObjects, viewLabels);
        checkIdAndPushIntoViewHidePositionAndSizeHighlightObject(viewHighLightEdits, mfDiff, viewHidePositionAndSizeHighLightEdits);
        ListObject = viewMicroflowObjects.map(item => <MicroflowObject data={item} onSelectObject={onSelectObject} />);
        ListEditHighlight = viewHighLightEdits.map(item => <MicroflowObjectDiff data={item} hightlightStyle={diffEditStyle} />);
        ListHidePositionAnsSizeEditHighlight = viewHidePositionAndSizeHighLightEdits.map(item => <MicroflowObjectDiff data={item} hightlightStyle={diffEditStyle} />);
        ListDeleteHighlight = viewHighLightDeletes.map(item => <MicroflowObjectDiff data={item} hightlightStyle={diffDeleteStyle} />);
        ListNewHighlight = viewHighLightNews.map(item => <MicroflowObjectDiff data={item} hightlightStyle={diffNewStyle} />);
        ListFlow = viewFlows.map(item => <Flow data={item} />);
        ListCaseValue = viewCaseValues.map(item => <CaseValue data={item} />);
        //var ListLabel = viewLabels.map(item => <Label data={item} />);
        ListErrorHandler = viewErrorHandlers.map(item => <ErrorHandler data={item} />);
        top = findVertical(mf);
        left = findHorizontal(mf);
        width = findMaxHorizontal(mf);
        height = findMaxVertical(mf);
    }
    if (props.version === "new") {
        props.setListComponentInfo1(listComponentInfo);
    }
    else if (props.version === "older") {
        props.setListComponentInfo2(listComponentInfo);
    }
    if (props.hidePositionAndSize === false) {
        return (
            <div id="mx-mf-visualiser" className="mx-mf-visualiser" style={{ left: left, top: top, width: width, height: height }}>
                <div className="mx-mf-visualiser-title mx-mf-visualiser-title-embed" style={{ position: "fixed", left: 0 }}>
                    <h5>{props.revNos}</h5>
                </div>
                {[ListFlow, ListObject, ListEditHighlight, ListDeleteHighlight, ListNewHighlight, ListCaseValue, ListErrorHandler]}
            </div>);
    }
    else {
        return (
            <div id="mx-mf-visualiser" className="mx-mf-visualiser" style={{ left: left, top: top, width: width, height: height }}>
                <div className="mx-mf-visualiser-title mx-mf-visualiser-title-embed" style={{ position: "fixed", left: 0 }}>
                    <h5>{props.revNos}</h5>
                </div>
                {[ListFlow, ListObject, ListDeleteHighlight, ListHidePositionAnsSizeEditHighlight, ListNewHighlight, ListCaseValue, ListErrorHandler]}
            </div>);
    }
}
export default observer(Microflow);