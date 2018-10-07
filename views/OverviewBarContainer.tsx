/// <ref erence path="./ ../typings/index.d.ts" /> 
import * as React from "react";
import { microflows } from "mendixmodelsdk";
import _cpnInterface = require("./microflowComponents/interfaces")
import { findHorizontal } from "./microflowComponents/ConvertFunction/FindHorizontal";
import {
    checkInstaceAndPushIntoViewMicroflowObject,
    checkIdAndPushIntoViewHighlightObject,
    checkIdAndPushIntoViewHidePositionAndSizeHighlightObject
} from "./microflowComponents/utils";
import * as diff from "./../MfDiff/DiffInterface";
import { diffNewStyle, diffDeleteStyle, diffEditStyle } from "./../config";
import { OverviewBar } from "./microflowComponents/OverviewBar";
/**
 * HighlightedComponent observe the change of HighlightedId and render if necessaary
 */
export default class OverviewBarContainer extends React.Component<{
    offSetWidth: number, hidePositionAndSize: boolean, scrollWidth1: number, scrollWidth2: number, mf1: microflows.Microflow | undefined, version1: string, mfDiff: diff.IMfDiff,
    mf2: microflows.Microflow | undefined, version2: string
},
    {}>{
    render() {
        let { mf1, version1, mfDiff, mf2, version2, scrollWidth1, scrollWidth2, hidePositionAndSize, offSetWidth } = this.props;
        let viewMicroflowObjects1: _cpnInterface.microflow.IMicroflowObject[] = [];
        let viewHighLightDeletes1: _cpnInterface.microflow.IMicroflowObject[] = [];
        let viewHighLightEdits1: _cpnInterface.microflow.IMicroflowObject[] = [];
        let viewHighLightNews1: _cpnInterface.microflow.IMicroflowObject[] = [];
        let viewHidePositionAndSizeHighLightEdits1: _cpnInterface.microflow.IMicroflowObject[] = [];
        let listComponentInfo1 = new _cpnInterface.microflow.IObjectDict();
        let viewMicroflowObjects2: _cpnInterface.microflow.IMicroflowObject[] = [];
        let viewHighLightDeletes2: _cpnInterface.microflow.IMicroflowObject[] = [];
        let viewHighLightEdits2: _cpnInterface.microflow.IMicroflowObject[] = [];
        let viewHighLightNews2: _cpnInterface.microflow.IMicroflowObject[] = [];
        let viewHidePositionAndSizeHighLightEdits2: _cpnInterface.microflow.IMicroflowObject[] = [];
        let listComponentInfo2 = new _cpnInterface.microflow.IObjectDict();
        let propotionWidth1 = (offSetWidth - 10) / scrollWidth1;
        let propotionWidth2 = (offSetWidth - 10) / scrollWidth2;
        let minPropotionWidth = propotionWidth1;
        var ListEditHighlight1: JSX.Element[] = [];
        var ListDeleteHighlight1: JSX.Element[] = [];
        var ListNewHighlight1: JSX.Element[] = [];
        var ListNewHighlight1: JSX.Element[] = [];
        var ListhHidePositionAndSizeEditHighlight1: JSX.Element[] = [];
        var ListEditHighlight2: JSX.Element[] = [];
        var ListDeleteHighlight2: JSX.Element[] = [];
        var ListNewHighlight2: JSX.Element[] = [];
        var ListNewHighlight2: JSX.Element[] = [];
        var ListHidePositionAndSizeEditHighlight2: JSX.Element[] = [];
        if (propotionWidth1 > propotionWidth2) {
            minPropotionWidth = propotionWidth2;
        }
        var left1 = 0, left2 = 0;
        if (mf1) {
            if (minPropotionWidth === Infinity || minPropotionWidth === -Infinity) minPropotionWidth = 0;
            checkInstaceAndPushIntoViewMicroflowObject(listComponentInfo1, mf1, mf1.objectCollection, viewMicroflowObjects1)
            checkIdAndPushIntoViewHighlightObject(mfDiff, version1, viewMicroflowObjects1, viewHighLightDeletes1, viewHighLightEdits1, viewHighLightNews1);
            checkIdAndPushIntoViewHidePositionAndSizeHighlightObject(viewHighLightEdits1, mfDiff, viewHidePositionAndSizeHighLightEdits1);
            ListEditHighlight1 = viewHighLightEdits1.map(item => <OverviewBar propotionWidth={minPropotionWidth} data={item} hightlightStyle={diffEditStyle.fill} version={version1} />);
            ListDeleteHighlight1 = viewHighLightDeletes1.map(item => <OverviewBar propotionWidth={minPropotionWidth} data={item} hightlightStyle={diffDeleteStyle.fill} version={version1} />);
            ListNewHighlight1 = viewHighLightNews1.map(item => <OverviewBar propotionWidth={minPropotionWidth} data={item} hightlightStyle={diffNewStyle.fill} version={version1} />);
            ListhHidePositionAndSizeEditHighlight1 = viewHidePositionAndSizeHighLightEdits1.map(item => <OverviewBar propotionWidth={minPropotionWidth} data={item} hightlightStyle={diffEditStyle.fill} version={version1} />)
            left1 = findHorizontal(mf1) * minPropotionWidth;
        }
        if (mf2) {
            left2 = findHorizontal(mf2) * minPropotionWidth;
            if (minPropotionWidth === Infinity || minPropotionWidth === -Infinity) minPropotionWidth = 0;
            checkInstaceAndPushIntoViewMicroflowObject(listComponentInfo2, mf2, mf2.objectCollection, viewMicroflowObjects2)
            checkIdAndPushIntoViewHighlightObject(mfDiff, version2, viewMicroflowObjects2, viewHighLightDeletes2, viewHighLightEdits2, viewHighLightNews2);
            checkIdAndPushIntoViewHidePositionAndSizeHighlightObject(viewHighLightEdits2, mfDiff, viewHidePositionAndSizeHighLightEdits2);
            ListEditHighlight2 = viewHighLightEdits2.map(item => <OverviewBar propotionWidth={minPropotionWidth} data={item} hightlightStyle={diffEditStyle.fill} version={version2} />);
            ListDeleteHighlight2 = viewHighLightDeletes2.map(item => <OverviewBar propotionWidth={minPropotionWidth} data={item} hightlightStyle={diffDeleteStyle.fill} version={version2} />);
            ListNewHighlight2 = viewHighLightNews2.map(item => <OverviewBar propotionWidth={minPropotionWidth} data={item} hightlightStyle={diffNewStyle.fill} version={version2} />);
            ListHidePositionAndSizeEditHighlight2 = viewHidePositionAndSizeHighLightEdits2.map(item => <OverviewBar propotionWidth={minPropotionWidth} data={item} hightlightStyle={diffEditStyle.fill} version={version2} />)
        }
        return (
            <div style={{ position: "absolute" }}>
                <div>
                    <div id="mx-mf-visualiser" className="mx-mf-visualiser" style={{ left: left1, height: "50%" }}>
                        {hidePositionAndSize === true ? [ListhHidePositionAndSizeEditHighlight1, ListDeleteHighlight1, ListNewHighlight1] :
                            [ListEditHighlight1, ListDeleteHighlight1, ListNewHighlight1]}
                    </div>
                    <div id="mx-mf-visualiser" className="mx-mf-visualiser" style={{ left: left2, height: "100%" }}>
                        {hidePositionAndSize === true ? [ListHidePositionAndSizeEditHighlight2, ListDeleteHighlight2, ListNewHighlight2] :
                            [ListEditHighlight2, ListDeleteHighlight2, ListNewHighlight2]}
                    </div>
                </div>
            </div>
        )
    }
}  